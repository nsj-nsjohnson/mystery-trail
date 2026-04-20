import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as Tone from "tone";
import { CASES, getCaseById } from "./cases/index.js";

const C = {
  bg:"#0B1622",bgMid:"#12202F",bgLight:"#1A2D40",
  paper:"#F4E8D1",paperEdge:"#D4BF97",
  text:"#2C1810",textMid:"#5C4033",textLight:"#8B7355",
  gold:"#D4A847",goldBright:"#F0C75E",goldDim:"#A68432",
  red:"#C0392B",teal:"#2E8B7A",white:"#FFF8EE",
};

/* Single reading level: 3rd-4th grade */
const TEXT_STYLE = { fs:"1.08rem", lh:1.9 };

async function aiBridge(txt,act){try{const r=await fetch("/api/bridge",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sceneText:txt,action:act,companionName:"Hemlock",level:1})});if(!r.ok)return null;const d=await r.json();return d.text||null;}catch(e){return null;}}

/* ═══ SMART PAGINATION ═══ */
function paginate(text, hasIllustration) {
  const paras = text.split("\n\n").filter(Boolean);
  const pages = [];
  let current = [];
  let currentWords = 0;
  const firstPageTarget = hasIllustration ? 100 : 160;
  const normalTarget = 160;
  for (let i = 0; i < paras.length; i++) {
    const paraWords = paras[i].split(/\s+/).length;
    const target = pages.length === 0 ? firstPageTarget : normalTarget;
    current.push(paras[i]);
    currentWords += paraWords;
    const nextParaWords = i + 1 < paras.length ? paras[i + 1].split(/\s+/).length : 0;
    if (currentWords >= 80 && (currentWords >= target || (currentWords >= target * 0.7 && currentWords + nextParaWords > target * 1.4))) {
      pages.push(current.join("\n\n"));
      current = [];
      currentWords = 0;
    }
  }
  if (current.length > 0) {
    const leftoverWords = current.join(" ").split(/\s+/).length;
    if (pages.length > 0 && leftoverWords < 80) {
      pages[pages.length - 1] += "\n\n" + current.join("\n\n");
    } else {
      pages.push(current.join("\n\n"));
    }
  }
  return pages.length > 0 ? pages : [text];
}

/* ═══ BADGE SYSTEM ═══ */
const RANKS = [
  { title:"Junior Detective", min:0, icon:"🔍" },
  { title:"Detective", min:4, icon:"🔎" },
  { title:"Senior Detective", min:8, icon:"🏅" },
  { title:"Keeper", min:12, icon:"📓" },
];
const BADGE_TYPES = [
  { id:"closed", label:"Case Closed", desc:"Completed the case", icon:"✅" },
  { id:"sharpEye", label:"Sharp Eye", desc:"Found 80%+ of clues", icon:"🔍" },
  { id:"wordCollector", label:"Word Collector", desc:"Tapped 80%+ of vocab words", icon:"📖" },
  { id:"pathFinder", label:"Path Finder", desc:"Found a different path through the case", icon:"🔀" },
];

function loadBadges(){try{return JSON.parse(localStorage.getItem("mt-badges"))||{};}catch(e){return{};}}
function saveBadges(b){try{localStorage.setItem("mt-badges",JSON.stringify(b));}catch(e){}}
function loadPaths(){try{return JSON.parse(localStorage.getItem("mt-paths"))||{};}catch(e){return{};}}
function savePaths(p){try{localStorage.setItem("mt-paths",JSON.stringify(p));}catch(e){}}

function countTotalBadges(badges){
  let n=0;
  for(const caseId in badges){
    for(const bId in badges[caseId]){
      if(badges[caseId][bId])n++;
    }
  }
  return n;
}
function getRank(badges){
  const n=countTotalBadges(badges);
  let rank=RANKS[0];
  for(const r of RANKS){if(n>=r.min)rank=r;}
  return rank;
}

/* Count available clues and vocab in a case's scenes */
function countCaseTotals(scenes){
  let clues=0,vocab=0;
  for(const id in scenes){
    const sc=scenes[id];
    if(sc.newClues)clues+=sc.newClues.length;
    if(sc.vocab)vocab+=Object.keys(sc.vocab).length;
  }
  return{clues,vocab};
}

/* Evaluate badges at end of case */
function evaluateBadges(caseId,scenes,cluesFound,wordsFound,currentPath,allBadges,allPaths){
  const totals=countCaseTotals(scenes);
  const b=allBadges[caseId]||{};
  const prevPaths=allPaths[caseId]||[];

  // Case Closed
  b.closed=true;

  // Sharp Eye (80%+ clues)
  if(totals.clues>0 && cluesFound/totals.clues>=0.8) b.sharpEye=true;

  // Word Collector (80%+ vocab)
  if(totals.vocab>0 && wordsFound/totals.vocab>=0.8) b.wordCollector=true;

  // Path Finder: compare key choices with previous playthroughs
  const pathKey=currentPath.sort().join(",");
  if(prevPaths.length>0){
    const isDifferent=prevPaths.every(p=>p!==pathKey);
    if(isDifferent) b.pathFinder=true;
  }
  const updatedPaths=[...prevPaths];
  if(!updatedPaths.includes(pathKey))updatedPaths.push(pathKey);

  return{badges:{...allBadges,[caseId]:b},paths:{...allPaths,[caseId]:updatedPaths}};
}

/* ═══ TEXT WITH VOCAB HIGHLIGHTS + REINFORCEMENT ═══ */
function PText({text,onVT,knownWords}){
  const segments = text.split(/(\*\*[^*]+\*\*)/);
  return<>{segments.map((s,i)=>{
    const boldMatch=s.match(/^\*\*(.+)\*\*$/);
    if(boldMatch){
      return<span key={i} onClick={e=>{e.stopPropagation();onVT?.(boldMatch[1]);}} style={{color:C.gold,fontWeight:700,cursor:"pointer",borderBottom:`1.5px dashed ${C.goldDim}`,transition:"color 0.2s"}}>{boldMatch[1]}</span>;
    }
    if(!knownWords||knownWords.length===0)return<span key={i}>{s}</span>;
    const escaped=knownWords.map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
    const re=new RegExp(`\\b(${escaped.join('|')})\\b`,'gi');
    const parts=s.split(re);
    if(parts.length<=1)return<span key={i}>{s}</span>;
    return<span key={i}>{parts.map((p,j)=>{
      const isMatch=knownWords.some(w=>w.toLowerCase()===p.toLowerCase());
      return isMatch?<span key={j} style={{color:C.textMid,fontWeight:600}} title="You learned this word!">{p}</span>:<span key={j}>{p}</span>;
    })}</span>;
  })}</>
}

function VPop({word,def,onClose}){if(!word)return null;return<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.5)",padding:20}}><div onClick={e=>e.stopPropagation()} style={{background:C.paper,borderRadius:8,padding:"24px",maxWidth:320,border:`2px solid ${C.goldDim}`,boxShadow:`0 0 30px rgba(212,168,71,0.15)`,animation:"popIn .2s ease"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:6,height:6,borderRadius:3,background:C.gold}}/><h3 style={{margin:0,fontFamily:"'Alegreya',serif",fontSize:"1.3rem",color:C.text,fontStyle:"italic"}}>{word}</h3></div><p style={{margin:0,fontSize:".95rem",lineHeight:1.7,color:C.textMid,fontFamily:"'Alegreya',serif"}}>{def||"Keep reading to find out..."}</p><div style={{marginTop:14,fontSize:".75rem",color:C.goldDim,fontWeight:700,fontFamily:"'Nunito',sans-serif"}}>✦ Added to your journal</div></div></div>;}

/* ═══ FIELD JOURNAL ═══ */
function Journal({open,onClose,clues,people,places,words}){
  const[tab,setTab]=useState("clues");
  if(!open)return null;
  const tabs=[
    {id:"clues",label:"Clues",icon:"🔍",items:clues,empty:"No clues yet. Keep investigating."},
    {id:"people",label:"People",icon:"👤",items:people,empty:"You haven't met anyone yet."},
    {id:"places",label:"Places",icon:"📍",items:places,empty:"No locations discovered."},
    {id:"words",label:"Words",icon:"📖",items:words.map(w=>`${w.word}${w.def?` — ${w.def}`:""}`),empty:"Tap gold words in the story to collect them."},
  ];
  const active=tabs.find(t=>t.id===tab)||tabs[0];
  return<div style={{position:"fixed",inset:0,zIndex:150,display:"flex",justifyContent:"flex-end"}}><div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.4)"}}/><div style={{position:"relative",width:"min(360px,88vw)",height:"100%",background:C.paper,display:"flex",flexDirection:"column",animation:"slideIn .3s ease",borderLeft:`3px solid ${C.goldDim}`}}>
    <div style={{padding:"16px 20px 0",borderBottom:`1px solid ${C.paperEdge}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><h2 style={{margin:0,fontFamily:"'Alegreya',serif",fontSize:"1.1rem",color:C.text,fontStyle:"italic"}}>Field Journal</h2><button onClick={onClose} style={{background:"none",border:"none",fontSize:"1.1rem",cursor:"pointer",color:C.textLight,minHeight:44,minWidth:44}}>✕</button></div>
      <div style={{display:"flex",gap:2}}>{tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"8px 4px",border:"none",borderBottom:tab===t.id?`3px solid ${C.gold}`:"3px solid transparent",background:"transparent",cursor:"pointer",fontSize:".7rem",fontWeight:700,color:tab===t.id?C.text:C.textLight,fontFamily:"'Nunito',sans-serif",textAlign:"center"}}><span style={{display:"block",fontSize:14,marginBottom:2}}>{t.icon}</span>{t.label}{t.items.length>0&&<span style={{marginLeft:3,fontSize:".6rem",color:C.gold}}>({t.items.length})</span>}</button>)}</div>
    </div>
    <div style={{flex:1,overflow:"auto",padding:"16px 20px"}}>{active.items.length===0?<p style={{color:C.textLight,fontFamily:"'Alegreya',serif",fontSize:".95rem",fontStyle:"italic",textAlign:"center",padding:"30px 0"}}>{active.empty}</p>:active.items.map((item,i)=><div key={i} style={{padding:"10px 0",borderBottom:`1px solid ${C.paperEdge}`,fontFamily:"'Alegreya',serif",fontSize:".9rem",color:C.text,lineHeight:1.6}}>{tab==="clues"&&<span style={{color:C.gold,marginRight:6}}>•</span>}{tab==="people"&&<span style={{marginRight:6}}>👤</span>}{tab==="places"&&<span style={{marginRight:6}}>📍</span>}{tab==="words"&&<span style={{color:C.gold,marginRight:6}}>✦</span>}{item}</div>)}</div>
  </div></div>;
}

/* ═══ POST-GAME SUMMARY ═══ */
function Summary({path,scenes}){
  if(!path||path.length===0)return null;
  return<div style={{background:C.bgMid,borderRadius:8,padding:"16px 18px",marginBottom:12,border:`1px solid ${C.bgLight}`}}>
    <h3 style={{margin:"0 0 10px",fontFamily:"'Alegreya',serif",fontSize:".95rem",color:C.goldBright,fontStyle:"italic"}}>Your Path</h3>
    <div style={{display:"flex",flexDirection:"column",gap:4}}>
      {path.map((sid,i)=>{const sc=scenes[sid];if(!sc)return null;const cc=(sc.choices||[]).length;
        return<div key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:".75rem",color:C.goldDim}}>
          <span style={{color:C.gold,flexShrink:0}}>{i+1}.</span>
          <span style={{fontFamily:"'Alegreya',serif"}}>{sid.replace(/_/g,' ')}</span>
          {cc>1&&<span style={{fontSize:".6rem",color:C.teal,fontWeight:700}}>⟡ chose</span>}
        </div>;})}
    </div>
  </div>;
}

/* ═══ BADGE DISPLAY FOR ENDING ═══ */
function BadgeReveal({badges,isNew}){
  if(!badges||Object.keys(badges).length===0)return null;
  const earned=BADGE_TYPES.filter(b=>badges[b.id]);
  const missed=BADGE_TYPES.filter(b=>!badges[b.id]);
  return<div style={{background:C.bgMid,borderRadius:8,padding:"16px 18px",marginBottom:12,border:`1px solid ${C.bgLight}`}}>
    <h3 style={{margin:"0 0 10px",fontFamily:"'Alegreya',serif",fontSize:".95rem",color:C.goldBright,fontStyle:"italic"}}>Badges Earned</h3>
    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:missed.length?10:0}}>
      {earned.map(b=><div key={b.id} style={{background:C.bgLight,borderRadius:6,padding:"8px 12px",border:`1.5px solid ${C.gold}`,display:"flex",alignItems:"center",gap:6,animation:"popIn .3s ease"}}>
        <span style={{fontSize:16}}>{b.icon}</span>
        <div><div style={{fontSize:".72rem",fontWeight:700,color:C.goldBright}}>{b.label}</div><div style={{fontSize:".6rem",color:C.goldDim}}>{b.desc}</div></div>
      </div>)}
    </div>
    {missed.length>0&&<div style={{fontSize:".7rem",color:C.textLight,fontStyle:"italic"}}>
      Still to earn: {missed.map(b=>b.label).join(", ")}
    </div>}
  </div>;
}

/* ═══ AUDIO ═══ */
let aOk=false,sClick,sReveal,sVictory;
let ambientSynth=null,ambientGain=null,currentMood=null;
async function initAudio(){if(aOk)return;await Tone.start();sClick=new Tone.Synth({oscillator:{type:"triangle"},envelope:{attack:.01,decay:.1,sustain:0,release:.08},volume:-18}).toDestination();sReveal=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"sine"},envelope:{attack:.04,decay:.3,sustain:.08,release:.4},volume:-16}).toDestination();sVictory=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"triangle"},envelope:{attack:.04,decay:.25,sustain:.15,release:.7},volume:-14}).toDestination();ambientGain=new Tone.Gain(0).toDestination();ambientSynth=new Tone.Synth({oscillator:{type:"sine"},envelope:{attack:3,decay:1,sustain:1,release:3},volume:-30}).connect(ambientGain);aOk=true;}
const MOOD_NOTES={warm:"C2",eerie:"Eb3",dark:null,tense:"A2",forest:"D2",relief:"G2",neutral:"C2"};
function setAmbientMood(mood,sOn){if(!aOk||!sOn)return;const note=MOOD_NOTES[mood||"neutral"];if(mood===currentMood)return;currentMood=mood;ambientGain.gain.rampTo(0,1.5);if(!note)return;setTimeout(()=>{try{ambientSynth.triggerAttack(note);ambientGain.gain.rampTo(0.12,2);}catch(e){}},1600);}

/* ═══ SAVE/RESUME ═══ */
function saveGame(data){try{localStorage.setItem("mt-save-"+data.caseId,JSON.stringify(data));}catch(e){}}
function loadGame(caseId){try{const v=localStorage.getItem("mt-save-"+caseId);return v?JSON.parse(v):null;}catch(e){return null;}}
function clearSave(caseId){try{localStorage.removeItem("mt-save-"+caseId);}catch(e){}}

/* ═══ MAIN APP ═══ */
export default function App(){
  const[scr,setScr]=useState("picker");
  const[caseId,setCaseId]=useState(null);
  const[playerName,setPlayerName]=useState("");
  const[nameInput,setNameInput]=useState("");
  const[sOn,setSOn]=useState(true);
  const[sid,setSid]=useState(null);
  const[hist,setHist]=useState([]);
  const[page,setPage]=useState(0);
  const[pageFade,setPageFade]=useState(false);
  const[showCh,setShowCh]=useState(false);
  const[tr,setTr]=useState(false);
  const[cAct,setCAct]=useState("");
  const[bridge,setBridge]=useState(null);
  const[bLoad,setBLoad]=useState(false);
  const[jrnlO,setJrnlO]=useState(false);
  const[clues,setClues]=useState([]);
  const[people,setPeople]=useState([]);
  const[places,setPlaces]=useState([]);
  const[words,setWords]=useState([]);
  const[jrnlB,setJrnlB]=useState(false);
  const[vP,setVP]=useState(null);
  const[flags,setFlags]=useState({});
  const[showSummary,setShowSummary]=useState(false);
  const[savedGame,setSavedGame]=useState(null);
  const[allBadges,setAllBadges]=useState(loadBadges());
  const[endBadges,setEndBadges]=useState(null);
  const cRef=useRef(null);

  const snd=async fn=>{if(!sOn)return;try{await initAudio();fn();}catch(e){}};
  const pCl=()=>{if(!aOk)return;sClick.triggerAttackRelease("G5","16n");};
  const pRv=()=>{if(!aOk)return;const t=Tone.now();sReveal.triggerAttackRelease("E4","8n",t);sReveal.triggerAttackRelease("G4","8n",t+.08);sReveal.triggerAttackRelease("B4","8n",t+.16);};
  const pVi=()=>{if(!aOk)return;const t=Tone.now();["C4","E4","G4","C5","E5"].forEach((n,i)=>sVictory.triggerAttackRelease(n,"4n",t+i*.12));};

  const activeCase=caseId?getCaseById(caseId):null;
  const scenes=activeCase?.scenes||{};
  const sc=sid?scenes[sid]:null;
  const name=playerName||"Detective";
  const gt=s=>(s?.text||"").replace(/\{C\}/g,"Hemlock").replace(/\{NAME\}/g,name);

  const hasIll=sc&&(sc.illustrationImg||sc.illustration);
  const pages=useMemo(()=>sc?paginate(gt(sc),!!hasIll):[], [sid,playerName]);
  const totalPages=pages.length;
  const isLastPage=page>=totalPages-1;
  const curPage=pages[page]||"";

  const getCompanion=()=>{if(!sc)return"";if(sc.companionIfFlag){for(const[flag,altText]of Object.entries(sc.companionIfFlag)){if(flags[flag])return altText.replace(/\{NAME\}/g,name);}}return(sc.companion||"").replace(/\{NAME\}/g,name);};
  const compText=getCompanion();

  // Load prefs
  useEffect(()=>{try{const v=localStorage.getItem("mt-prefs");if(v){const s=JSON.parse(v);setSOn(s.sOn??true);if(s.name){setPlayerName(s.name);setNameInput(s.name);}}}catch(e){}},[]);
  const savePrefs=useCallback((patch)=>{try{localStorage.setItem("mt-prefs",JSON.stringify({sOn,name:playerName,...patch}));}catch(e){}},[sOn,playerName]);

  const collectScene=(scene)=>{if(!scene)return;let ch=false;
    const add=(arr,set)=>{arr?.forEach(x=>{set(p=>{if(p.includes(x))return p;ch=true;return[...p,x];});});};
    add(scene.newClues,setClues);add(scene.newPeople,setPeople);add(scene.newPlaces,setPlaces);
    if(ch)setJrnlB(true);};

  useEffect(()=>{if(!sc||!sid)return;collectScene(sc);if(sOn)snd(()=>setAmbientMood(sc.mood||"neutral",sOn));},[sid]);
  useEffect(()=>{if(!caseId||!sid||scr!=="play")return;const timer=setTimeout(()=>{saveGame({caseId,sid,hist,clues,people,places,words:words.map(w=>({word:w.word,def:w.def})),playerName,flags,page:0});},300);return()=>clearTimeout(timer);},[sid,hist,clues,people,places,words,flags,caseId,playerName,scr]);

  const turnPage=(newPage)=>{setPageFade(true);setTimeout(()=>{setPage(newPage);setPageFade(false);if(cRef.current)cRef.current.scrollTop=0;},200);};

  const goTo=(n,choiceFlags)=>{snd(pCl);setTr(true);setBridge(null);if(choiceFlags)setFlags(f=>({...f,...choiceFlags}));setTimeout(()=>{setHist(h=>[...h,sid]);setSid(n);setPage(0);setShowCh(false);setTr(false);setPageFade(false);if(cRef.current)cRef.current.scrollTop=0;},300);};
  const goBack=()=>{if(!hist.length)return;snd(pCl);setTr(true);setBridge(null);setTimeout(()=>{setSid(hist.at(-1));setHist(h=>h.slice(0,-1));setPage(0);setShowCh(false);setTr(false);},300);};
  const nextPage=()=>{
    if(!isLastPage){snd(pCl);turnPage(page+1);}
    else{
      setShowCh(true);
      if(sc.ending){
        snd(pVi);
        // Award badges
        const currentPath=[...hist,sid];
        const keyChoices=currentPath.filter(s=>scenes[s]&&(scenes[s].choices||[]).length>1);
        const result=evaluateBadges(caseId,scenes,clues.length,words.length,keyChoices,allBadges,loadPaths());
        setAllBadges(result.badges);saveBadges(result.badges);savePaths(result.paths);
        setEndBadges(result.badges[caseId]||{});
        clearSave(caseId);
      }else snd(pRv);
    }
  };
  const hvt=w=>{const d=sc?.vocab?.[w]||sc?.vocab?.[w.toLowerCase()]||null;setVP({word:w,def:d});setWords(p=>{if(p.find(x=>x.word.toLowerCase()===w.toLowerCase()))return p;return[...p,{word:w,def:d}];});setJrnlB(true);snd(pCl);};
  const hCA=async()=>{if(!cAct.trim()||!sc)return;setBLoad(true);const r=await aiBridge(gt(sc),cAct.trim());setBridge(r||`Hemlock tilts his head. "Interesting. But let's focus on what's in front of us."`);setCAct("");setBLoad(false);};

  const selectCase=(id)=>{const c=getCaseById(id);if(!c||!c.meta.available)return;snd(pCl);setCaseId(id);const saved=loadGame(id);setSavedGame(saved);setScr("setup");};
  const startCase=(resume)=>{if(!activeCase)return;const n=nameInput.trim()||"Detective";setPlayerName(n);savePrefs({name:n});snd(pRv);
    if(resume&&savedGame){setSid(savedGame.sid);setHist(savedGame.hist||[]);setClues(savedGame.clues||[]);setPeople(savedGame.people||[]);setPlaces(savedGame.places||[]);setWords((savedGame.words||[]).map(w=>({word:w.word,def:w.def})));setFlags(savedGame.flags||{});}
    else{setSid(activeCase.meta.startScene);setHist([]);setClues([]);setPeople([]);setPlaces([]);setWords([]);setFlags({});clearSave(caseId);}
    setPage(0);setJrnlB(false);setBridge(null);setShowCh(false);setShowSummary(false);setEndBadges(null);setScr("play");};
  const backToPicker=()=>{setScr("picker");setCaseId(null);setSid(null);setSavedGame(null);if(aOk&&ambientGain){ambientGain.gain.rampTo(0,1);currentMood=null;}};
  const totalJ=clues.length+people.length+places.length+words.length;
  const fullPath=useMemo(()=>[...hist,sid].filter(Boolean),[hist,sid]);

  const rank=getRank(allBadges);
  const totalBadgeCount=countTotalBadges(allBadges);

  /* ═══ PICKER ═══ */
  if(scr==="picker")return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Nunito',sans-serif",padding:"40px 20px"}}>
      <style>{CSS}</style>
      <div style={{maxWidth:440,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:".7rem",letterSpacing:5,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:10}}>The Field Journal of</div>
          <h1 style={{fontFamily:"'Alegreya',serif",fontSize:"clamp(1.8rem,6vw,2.4rem)",color:C.goldBright,margin:0,fontWeight:700,lineHeight:1.1}}>Mystery Trail</h1>
          <div style={{width:80,height:2,background:C.gold,margin:"14px auto 8px",borderRadius:1}}/>
          {/* Rank display */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:10}}>
            <span style={{fontSize:18}}>{rank.icon}</span>
            <span style={{fontFamily:"'Alegreya',serif",color:C.goldDim,fontSize:".85rem",fontWeight:700}}>{rank.title}</span>
            <span style={{fontSize:".65rem",color:C.goldDim,opacity:.7}}>({totalBadgeCount} badge{totalBadgeCount!==1?"s":""})</span>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:24}}>
          {CASES.map(c=>{const a=c.meta.available;const hasSave=!!loadGame(c.meta.id);const caseBadges=allBadges[c.meta.id]||{};const earnedCount=Object.values(caseBadges).filter(Boolean).length;
          return(
            <button key={c.meta.id} onClick={()=>selectCase(c.meta.id)} disabled={!a} style={{background:a?C.paper:C.bgMid,border:`2px solid ${a?C.paperEdge:C.bgLight}`,borderRadius:4,padding:"18px 20px",textAlign:"left",cursor:a?"pointer":"not-allowed",opacity:a?1:.55,boxShadow:a?`0 2px 12px rgba(0,0,0,.3)`:"none",transition:"all .2s",position:"relative",fontFamily:"'Nunito',sans-serif"}}>
              {a&&<><div style={{position:"absolute",top:6,left:6,width:14,height:14,borderTop:`1.5px solid ${C.gold}`,borderLeft:`1.5px solid ${C.gold}`,opacity:.6}}/><div style={{position:"absolute",top:6,right:6,width:14,height:14,borderTop:`1.5px solid ${C.gold}`,borderRight:`1.5px solid ${C.gold}`,opacity:.6}}/><div style={{position:"absolute",bottom:6,left:6,width:14,height:14,borderBottom:`1.5px solid ${C.gold}`,borderLeft:`1.5px solid ${C.gold}`,opacity:.6}}/><div style={{position:"absolute",bottom:6,right:6,width:14,height:14,borderBottom:`1.5px solid ${C.gold}`,borderRight:`1.5px solid ${C.gold}`,opacity:.6}}/></>}
              {/* Completion seal */}
              {caseBadges.closed&&<div style={{position:"absolute",top:12,right:14,width:36,height:36,borderRadius:18,border:`2px solid ${C.gold}`,display:"flex",alignItems:"center",justifyContent:"center",background:`${C.gold}15`}}>
                <span style={{fontSize:16}}>✅</span>
              </div>}
              <div style={{fontSize:".65rem",letterSpacing:3,color:a?C.goldDim:C.textLight,fontWeight:800,textTransform:"uppercase",marginBottom:6}}>Case File No. {c.meta.number}</div>
              <div style={{fontFamily:"'Alegreya',serif",fontSize:"1.25rem",color:a?C.text:C.goldDim,fontWeight:700,lineHeight:1.2,marginBottom:4,paddingRight:caseBadges.closed?40:0}}>{c.meta.title}</div>
              <div style={{fontFamily:"'Alegreya',serif",fontSize:".88rem",color:a?C.textMid:C.textLight,fontStyle:"italic"}}>{c.meta.subtitle}</div>
              <div style={{marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                {a?<span style={{fontSize:".7rem",color:C.goldDim,fontWeight:700}}>~{c.meta.estimatedMinutes} min</span>:<span style={{fontSize:".7rem",color:C.textLight,fontStyle:"italic"}}>Sealed. Check back soon.</span>}
                <div style={{display:"flex",gap:4,alignItems:"center"}}>
                  {a&&hasSave&&<span style={{fontSize:".65rem",color:C.teal,fontWeight:700}}>⟡ saved</span>}
                  {a&&earnedCount>0&&<span style={{fontSize:".65rem",color:C.gold,fontWeight:700}}>{earnedCount}/4 badges</span>}
                </div>
              </div>
            </button>);})}
        </div>
        {/* Sound toggle */}
        <div style={{display:"flex",justifyContent:"center"}}>
          <button onClick={()=>{const v=!sOn;setSOn(v);savePrefs({sOn:v});if(!v&&ambientGain){ambientGain.gain.rampTo(0,.5);currentMood=null;}}} style={{padding:"10px 20px",borderRadius:6,border:"none",cursor:"pointer",background:sOn?C.teal:C.bgLight,color:sOn?"#fff":C.goldDim,fontWeight:800,fontSize:".75rem",fontFamily:"'Nunito',sans-serif"}}>Sound: {sOn?"On":"Off"}</button>
        </div>
      </div>
    </div>
  );

  /* ═══ SETUP ═══ */
  if(scr==="setup"&&activeCase){const m=activeCase.meta;return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Nunito',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{CSS}</style>
      <div style={{maxWidth:420,width:"100%"}}>
        <button onClick={backToPicker} style={{...tBtn,marginBottom:16}}>← All Cases</button>
        <div style={{background:C.paper,borderRadius:4,padding:"40px 32px",position:"relative",boxShadow:`0 4px 24px rgba(0,0,0,.4), inset 0 0 60px rgba(139,115,85,.15)`,border:`2px solid ${C.paperEdge}`,marginBottom:20}}>
          <div style={{position:"absolute",top:10,left:10,width:20,height:20,borderTop:`2px solid ${C.gold}`,borderLeft:`2px solid ${C.gold}`,opacity:.5}}/><div style={{position:"absolute",top:10,right:10,width:20,height:20,borderTop:`2px solid ${C.gold}`,borderRight:`2px solid ${C.gold}`,opacity:.5}}/><div style={{position:"absolute",bottom:10,left:10,width:20,height:20,borderBottom:`2px solid ${C.gold}`,borderLeft:`2px solid ${C.gold}`,opacity:.5}}/><div style={{position:"absolute",bottom:10,right:10,width:20,height:20,borderBottom:`2px solid ${C.gold}`,borderRight:`2px solid ${C.gold}`,opacity:.5}}/>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:12,letterSpacing:4,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:16}}>Case File No. {m.number}</div>
            <h1 style={{fontFamily:"'Alegreya',serif",fontSize:"clamp(1.6rem,5vw,2.2rem)",color:C.text,margin:"0 0 4px",lineHeight:1.2,fontWeight:700}}>{m.title}</h1>
            <div style={{width:60,height:2,background:C.gold,margin:"12px auto",borderRadius:1}}/>
            <p style={{fontFamily:"'Alegreya',serif",color:C.textMid,fontSize:".95rem",fontStyle:"italic",margin:0}}>{m.subtitle}</p>
          </div>
        </div>
        <div style={{marginBottom:16,padding:"16px 20px",background:C.bgMid,borderRadius:8,border:`1px solid ${C.bgLight}`}}>
          <div style={{fontSize:".7rem",letterSpacing:3,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:10}}>Your Name, Detective</div>
          <input value={nameInput} onChange={e=>setNameInput(e.target.value)} placeholder="Enter your name..." maxLength={20}
            style={{width:"100%",padding:"12px 16px",borderRadius:8,fontSize:"1rem",fontFamily:"'Alegreya',serif",border:`2px solid ${C.bgLight}`,background:C.bg,color:C.goldBright,outline:"none",fontWeight:700,letterSpacing:.5,textAlign:"center"}}/>
        </div>
        <div style={{marginBottom:20,padding:"14px 16px",background:C.bgMid,borderRadius:8,border:`1px solid ${C.bgLight}`,overflow:"hidden"}}>
          <img src="/illustrations/hemlock_portrait.jpg" alt="" style={{width:"100%",borderRadius:6,marginBottom:10,opacity:.9}} onError={e=>{e.target.style.display='none'}}/>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}><span style={{fontSize:20}}>🐦‍⬛</span><span style={{fontFamily:"'Alegreya',serif",fontSize:"1rem",color:C.goldBright,fontWeight:700}}>Hemlock</span></div>
          <p style={{margin:0,fontSize:".78rem",color:C.goldDim,fontStyle:"italic",fontFamily:"'Alegreya',serif",lineHeight:1.5}}>Your aunt's raven. Sharp tongue, sharper eyes. Named after something poisonous, which he considers a compliment.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <button onClick={()=>startCase(false)} disabled={!nameInput.trim()} style={{width:"100%",padding:"16px",borderRadius:8,border:`2px solid ${C.gold}`,background:"transparent",cursor:nameInput.trim()?"pointer":"not-allowed",color:nameInput.trim()?C.goldBright:C.goldDim,fontWeight:800,fontSize:"1rem",letterSpacing:2,fontFamily:"'Nunito',sans-serif",textTransform:"uppercase",opacity:nameInput.trim()?1:.4,minHeight:52}}>
            {savedGame?"Start Fresh":"Open the Case"}
          </button>
          {savedGame&&<button onClick={()=>startCase(true)} style={{width:"100%",padding:"14px",borderRadius:8,border:`1.5px solid ${C.teal}`,background:"transparent",cursor:"pointer",color:C.teal,fontWeight:700,fontSize:".9rem",fontFamily:"'Nunito',sans-serif",minHeight:48}}>
            Continue Where You Left Off
          </button>}
        </div>
      </div>
    </div>
  );}

  /* ═══ PLAY ═══ */
  if(!sc)return null;
  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Nunito',sans-serif",display:"flex",flexDirection:"column"}}>
      <style>{CSS}</style>
      <VPop word={vP?.word} def={vP?.def} onClose={()=>setVP(null)}/>
      <Journal open={jrnlO} onClose={()=>{setJrnlO(false);setJrnlB(false);}} clues={clues} people={people} places={places} words={words}/>

      <div style={{padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <button onClick={backToPicker} style={tBtn}>←</button>
        <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>🐦‍⬛</span><span style={{fontSize:".75rem",color:C.goldDim,fontWeight:700}}>Hemlock</span></div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>{const v=!sOn;setSOn(v);savePrefs({sOn:v});if(!v&&ambientGain){ambientGain.gain.rampTo(0,.5);currentMood=null;}}} style={tBtn}>{sOn?"♪":"♪̶"}</button>
          <button onClick={()=>{setJrnlO(true);setJrnlB(false);}} style={{...tBtn,position:"relative"}}>📓{totalJ>0&&<span style={{position:"absolute",top:-4,right:-4,minWidth:16,height:16,borderRadius:8,background:jrnlB?C.red:C.gold,fontSize:".55rem",fontWeight:800,color:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px"}}>{totalJ}</span>}</button>
        </div>
      </div>

      <div style={{flex:1,display:"flex",flexDirection:"column",padding:"0 16px 20px",maxWidth:600,width:"100%",margin:"0 auto"}} ref={cRef}>
        <div style={{opacity:tr?0:1,transform:tr?"translateY(10px)":"none",transition:"all .3s ease",flex:1,display:"flex",flexDirection:"column"}}>
          <div style={{flex:1,background:C.paper,borderRadius:4,position:"relative",display:"flex",flexDirection:"column",boxShadow:`0 2px 16px rgba(0,0,0,.3), inset 0 0 40px rgba(139,115,85,.1)`,border:`1px solid ${C.paperEdge}`,overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,opacity:.03,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,pointerEvents:"none"}}/>
            <div style={{padding:"12px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:1}}>
              <span style={{fontSize:".65rem",color:C.textLight,fontFamily:"'Alegreya',serif",fontStyle:"italic"}}>{sc.ending?"Final Page":`Page ${page+1} of ${totalPages}`}</span>
              <span style={{fontSize:".65rem",color:C.textLight,fontFamily:"'Alegreya',serif",fontStyle:"italic"}}>{hist.length>0?`Scene ${hist.length+1}`:""}</span>
            </div>
            <div style={{flex:1,padding:"12px 24px 16px",position:"relative",zIndex:1,overflow:"auto"}}>
              {page===0&&(sc.illustrationImg||sc.illustration)&&<div style={{textAlign:"center",padding:"8px 0 14px"}}>
                {sc.illustrationImg
                  ?<img src={sc.illustrationImg} alt="" style={{maxWidth:"100%",width:"100%",borderRadius:3,opacity:.92}}/>
                  :<div style={{opacity:.85}} dangerouslySetInnerHTML={{__html:sc.illustration}}/>
                }
              </div>}
              <div style={{fontFamily:"'Alegreya',serif",fontSize:TEXT_STYLE.fs,lineHeight:TEXT_STYLE.lh,color:C.text,whiteSpace:"pre-line",opacity:pageFade?0:1,transition:"opacity 0.2s ease"}} key={`${sid}-${page}`}>
                <PText text={curPage} onVT={hvt} knownWords={words.map(w=>w.word)}/>
              </div>
            </div>
            {!showCh&&<div style={{padding:"8px 20px 16px",position:"relative",zIndex:1,textAlign:"right"}}>
              <button onClick={nextPage} style={{background:"none",border:"none",cursor:"pointer",color:C.gold,fontFamily:"'Alegreya',serif",fontSize:"1rem",fontWeight:700,fontStyle:"italic",padding:"14px 8px",minHeight:48}}>{isLastPage?"Continue →":"Turn page →"}</button>
            </div>}
          </div>

          {showCh&&<div style={{marginTop:12}}>
            {compText&&<div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10,animation:"fadeUp .3s ease"}}><span style={{fontSize:20,flexShrink:0,marginTop:2}}>🐦‍⬛</span><p style={{margin:0,fontSize:".85rem",lineHeight:1.6,color:C.goldDim,fontStyle:"italic",fontFamily:"'Alegreya',serif"}}>"{compText}"</p></div>}
            {sc.question&&<div style={{padding:"10px 14px",marginBottom:10,borderLeft:`3px solid ${C.gold}`,animation:"fadeUp .3s ease"}}><p style={{margin:0,fontSize:".82rem",color:C.goldBright,fontWeight:700,lineHeight:1.5,fontFamily:"'Alegreya',serif",fontStyle:"italic"}}>🤔 {sc.question.replace(/\{NAME\}/g,name)}</p></div>}
            {bridge&&<div style={{padding:"10px 14px",marginBottom:10,borderLeft:`3px solid ${C.teal}`,animation:"fadeUp .3s ease"}}><p style={{margin:0,fontSize:".85rem",color:C.goldDim,fontStyle:"italic",lineHeight:1.6,fontFamily:"'Alegreya',serif"}}>{bridge}</p></div>}
            {sc.ending?(
              <div style={{animation:"fadeUp .3s ease"}}>
                <div style={{textAlign:"center",padding:"16px",background:C.bgLight,borderRadius:8,marginBottom:12,border:`1px solid ${C.gold}22`}}>
                  <div style={{fontSize:36,marginBottom:8}}>{sc.endEmoji}</div>
                  <h2 style={{margin:"0 0 6px",fontFamily:"'Alegreya',serif",fontSize:"1.2rem",color:C.goldBright}}>{sc.endTitle}</h2>
                  <p style={{margin:0,color:C.goldDim,fontSize:".88rem",lineHeight:1.6}}>{(sc.endMessage||"").replace(/\{NAME\}/g,name)}</p>
                </div>
                {endBadges&&<BadgeReveal badges={endBadges}/>}
                {totalJ>0&&<button onClick={()=>setJrnlO(true)} style={{...cBtn,width:"100%",justifyContent:"center",marginBottom:8,borderColor:C.gold,color:C.goldBright}}>📓 Review your journal ({totalJ} entries)</button>}
                <button onClick={()=>setShowSummary(s=>!s)} style={{...cBtn,width:"100%",justifyContent:"center",marginBottom:8,color:C.goldDim,fontSize:".82rem"}}>{showSummary?"Hide":"Show"} your path</button>
                {showSummary&&<Summary path={fullPath} scenes={scenes}/>}
                <div style={{display:"flex",gap:8}}><button onClick={()=>{startCase(false);}} style={{...cBtn,flex:1,justifyContent:"center",background:C.gold,color:C.bg,borderColor:C.gold}}>Play Again</button><button onClick={backToPicker} style={{...cBtn,flex:1,justifyContent:"center"}}>All Cases</button></div>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:8,animation:"fadeUp .3s ease"}}>
                {(sc.choices||[]).map((c,i)=>{const isHigh=c.highStakes;
                  return<button key={i} onClick={()=>goTo(c.next,c.flags)} style={{...cBtn,...(isHigh?{borderColor:C.gold,boxShadow:`0 0 12px ${C.gold}20`,background:C.bgLight}:{})}}>
                    <span style={{fontSize:16,flexShrink:0}}>{c.icon}</span><span>{c.text}</span>
                  </button>;})}
                {hist.length>0&&<button onClick={goBack} style={{...cBtn,opacity:.5,fontSize:".82rem"}}>⬅️ Go back</button>}
                <div style={{display:"flex",gap:6,marginTop:4}}>
                  <input value={cAct} onChange={e=>setCAct(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")hCA();}} placeholder="Type your own idea..." disabled={bLoad} style={{flex:1,padding:"10px 14px",borderRadius:8,fontSize:".85rem",fontFamily:"'Alegreya',serif",border:`1px solid ${C.bgLight}`,background:C.bgMid,color:C.white,outline:"none",fontStyle:"italic"}}/>
                  <button onClick={hCA} disabled={bLoad||!cAct.trim()} style={{...tBtn,padding:"10px 14px",opacity:cAct.trim()?1:.3,fontSize:"1rem"}}>➤</button>
                </div>
                {bLoad&&<p style={{color:C.goldDim,textAlign:"center",fontSize:".78rem",margin:0,fontStyle:"italic"}}>Hemlock is watching...</p>}
              </div>
            )}
          </div>}
        </div>
      </div>
    </div>
  );
}

const cBtn={display:"flex",alignItems:"center",gap:10,background:C.bgMid,border:`1.5px solid ${C.bgLight}`,borderRadius:8,padding:"12px 16px",fontSize:".9rem",fontFamily:"'Nunito',sans-serif",fontWeight:700,color:C.white,cursor:"pointer",textAlign:"left",transition:"all .15s",lineHeight:1.4,minHeight:48};
const tBtn={background:C.bgMid,border:`1px solid ${C.bgLight}`,borderRadius:8,padding:"10px 14px",cursor:"pointer",fontSize:".9rem",color:C.goldDim,fontFamily:"'Nunito',sans-serif",fontWeight:700,minHeight:44};
const CSS=`
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes popIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
button:hover{opacity:.85}button:active{transform:scale(.98)!important}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}body{margin:0}
input:focus{border-color:${C.gold}!important}input::placeholder{color:${C.goldDim}55}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${C.paperEdge};border-radius:2px}
`;
