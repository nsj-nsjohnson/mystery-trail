import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import { CASES, getCaseById } from "./cases/index.js";

const C = {
  bg:"#0B1622",bgMid:"#12202F",bgLight:"#1A2D40",
  paper:"#F4E8D1",paperEdge:"#D4BF97",
  text:"#2C1810",textMid:"#5C4033",textLight:"#8B7355",
  gold:"#D4A847",goldBright:"#F0C75E",goldDim:"#A68432",
  red:"#C0392B",teal:"#2E8B7A",white:"#FFF8EE",
};

const LEVELS = [
  { label:"Beginner", fs:"1.18rem", lh:2.0 },
  { label:"Growing", fs:"1.06rem", lh:1.85 },
  { label:"Explorer", fs:"0.96rem", lh:1.75 },
];

async function aiBridge(txt,act,lv){try{const r=await fetch("/api/bridge",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sceneText:txt,action:act,companionName:"Corvid",level:lv})});if(!r.ok)return null;const d=await r.json();return d.text||null;}catch(e){return null;}}

function paginate(text) {
  const paras = text.split("\n\n").filter(Boolean);
  const pages = [];
  let i = 0;
  while (i < paras.length) {
    let take = 2;
    if (i + 2 < paras.length && paras[i + 2].length < 100) take = 3;
    if (i + take > paras.length) take = paras.length - i;
    pages.push(paras.slice(i, i + take).join("\n\n"));
    i += take;
  }
  return pages;
}

function PText({text,onVT}){return<>{text.split(/(\*\*[^*]+\*\*)/).map((s,i)=>{const m=s.match(/^\*\*(.+)\*\*$/);return m?<span key={i} onClick={e=>{e.stopPropagation();onVT?.(m[1]);}} style={{color:C.gold,fontWeight:700,cursor:"pointer",borderBottom:`1.5px dashed ${C.goldDim}`,transition:"color 0.2s"}}>{m[1]}</span>:<span key={i}>{s}</span>;})}</>;}

function VPop({word,def,onClose}){if(!word)return null;return<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.5)",padding:20}}><div onClick={e=>e.stopPropagation()} style={{background:C.paper,borderRadius:8,padding:"24px",maxWidth:320,border:`2px solid ${C.goldDim}`,boxShadow:`0 0 30px rgba(212,168,71,0.15)`,animation:"popIn .2s ease"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:6,height:6,borderRadius:3,background:C.gold}}/><h3 style={{margin:0,fontFamily:"'Alegreya',serif",fontSize:"1.3rem",color:C.text,fontStyle:"italic"}}>{word}</h3></div><p style={{margin:0,fontSize:".95rem",lineHeight:1.7,color:C.textMid,fontFamily:"'Alegreya',serif"}}>{def||"Keep reading to find out..."}</p><div style={{marginTop:14,fontSize:".75rem",color:C.goldDim,fontWeight:700,fontFamily:"'Nunito',sans-serif"}}>✦ Added to your journal</div></div></div>;}

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
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><h2 style={{margin:0,fontFamily:"'Alegreya',serif",fontSize:"1.1rem",color:C.text,fontStyle:"italic"}}>Field Journal</h2><button onClick={onClose} style={{background:"none",border:"none",fontSize:"1.1rem",cursor:"pointer",color:C.textLight}}>✕</button></div>
      <div style={{display:"flex",gap:2}}>{tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"8px 4px",border:"none",borderBottom:tab===t.id?`3px solid ${C.gold}`:"3px solid transparent",background:"transparent",cursor:"pointer",fontSize:".7rem",fontWeight:700,color:tab===t.id?C.text:C.textLight,fontFamily:"'Nunito',sans-serif",transition:"all .15s",textAlign:"center"}}><span style={{display:"block",fontSize:14,marginBottom:2}}>{t.icon}</span>{t.label}{t.items.length>0&&<span style={{marginLeft:3,fontSize:".6rem",color:C.gold}}>({t.items.length})</span>}</button>)}</div>
    </div>
    <div style={{flex:1,overflow:"auto",padding:"16px 20px"}}>{active.items.length===0?<p style={{color:C.textLight,fontFamily:"'Alegreya',serif",fontSize:".95rem",fontStyle:"italic",textAlign:"center",padding:"30px 0"}}>{active.empty}</p>:active.items.map((item,i)=><div key={i} style={{padding:"10px 0",borderBottom:`1px solid ${C.paperEdge}`,fontFamily:"'Alegreya',serif",fontSize:".9rem",color:C.text,lineHeight:1.6}}>{tab==="clues"&&<span style={{color:C.gold,marginRight:6}}>•</span>}{tab==="people"&&<span style={{marginRight:6}}>👤</span>}{tab==="places"&&<span style={{marginRight:6}}>📍</span>}{tab==="words"&&<span style={{color:C.gold,marginRight:6}}>✦</span>}{item}</div>)}</div>
  </div></div>;
}

let aOk=false,sC,sR,sV;async function iA(){if(aOk)return;await Tone.start();sC=new Tone.Synth({oscillator:{type:"triangle"},envelope:{attack:.01,decay:.1,sustain:0,release:.08},volume:-18}).toDestination();sR=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"sine"},envelope:{attack:.04,decay:.3,sustain:.08,release:.4},volume:-16}).toDestination();sV=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"triangle"},envelope:{attack:.04,decay:.25,sustain:.15,release:.7},volume:-14}).toDestination();aOk=true;}

export default function App(){
  const[scr,setScr]=useState("picker");
  const[caseId,setCaseId]=useState(null);
  const[playerName,setPlayerName]=useState("");
  const[nameInput,setNameInput]=useState("");
  const[lvl,setLvl]=useState(1);
  const[sOn,setSOn]=useState(true);
  const[sid,setSid]=useState(null);
  const[hist,setHist]=useState([]);
  const[page,setPage]=useState(0);
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
  const cRef=useRef(null);

  const snd=async fn=>{if(!sOn)return;try{await iA();fn();}catch(e){}};
  const pCl=()=>{if(!aOk)return;sC.triggerAttackRelease("G5","16n");};
  const pRv=()=>{if(!aOk)return;const t=Tone.now();sR.triggerAttackRelease("E4","8n",t);sR.triggerAttackRelease("G4","8n",t+.08);sR.triggerAttackRelease("B4","8n",t+.16);};
  const pVi=()=>{if(!aOk)return;const t=Tone.now();["C4","E4","G4","C5","E5"].forEach((n,i)=>sV.triggerAttackRelease(n,"4n",t+i*.12));};

  const activeCase=caseId?getCaseById(caseId):null;
  const scenes=activeCase?.scenes||{};
  const sc=sid?scenes[sid]:null;
  const lv=LEVELS[lvl];
  const name=playerName||"Detective";
  const gt=s=>(s?.text||"").replace(/\{C\}/g,"Corvid").replace(/\{NAME\}/g,name);
  const pages=sc?paginate(gt(sc)):[];
  const totalPages=pages.length;
  const isLastPage=page>=totalPages-1;
  const curPage=pages[page]||"";

  useEffect(()=>{try{const v=localStorage.getItem("mt-prefs");if(v){const s=JSON.parse(v);setLvl(s.l??1);setSOn(s.sOn??true);if(s.name)setPlayerName(s.name);if(s.name)setNameInput(s.name);}}catch(e){}},[]);
  const savePrefs=useCallback((patch)=>{try{localStorage.setItem("mt-prefs",JSON.stringify({l:lvl,sOn,name:playerName,...patch}));}catch(e){}},[lvl,sOn,playerName]);

  const collectScene=(scene)=>{if(!scene)return;let ch=false;
    const add=(arr,set)=>{arr?.forEach(x=>{set(p=>{if(p.includes(x))return p;ch=true;return[...p,x];});});};
    add(scene.newClues,setClues);add(scene.newPeople,setPeople);add(scene.newPlaces,setPlaces);
    if(ch)setJrnlB(true);};
  useEffect(()=>{if(sc)collectScene(sc);},[sid]);

  const goTo=n=>{snd(pCl);setTr(true);setBridge(null);setTimeout(()=>{setHist(h=>[...h,sid]);setSid(n);setPage(0);setShowCh(false);setTr(false);if(cRef.current)cRef.current.scrollTop=0;},300);};
  const goBack=()=>{if(!hist.length)return;snd(pCl);setTr(true);setBridge(null);setTimeout(()=>{setSid(hist.at(-1));setHist(h=>h.slice(0,-1));setPage(0);setShowCh(false);setTr(false);},300);};
  const nextPage=()=>{if(!isLastPage){snd(pCl);setPage(p=>p+1);if(cRef.current)cRef.current.scrollTop=0;}else{setShowCh(true);if(sc.ending)snd(pVi);else snd(pRv);}};
  const hvt=w=>{const d=sc?.vocab?.[w]||sc?.vocab?.[w.toLowerCase()]||null;setVP({word:w,def:d});setWords(p=>{if(p.find(x=>x.word.toLowerCase()===w.toLowerCase()))return p;return[...p,{word:w,def:d}];});setJrnlB(true);snd(pCl);};
  const hCA=async()=>{if(!cAct.trim()||!sc)return;setBLoad(true);const r=await aiBridge(gt(sc),cAct.trim(),lvl);setBridge(r||`Corvid tilts his head. "Interesting. But let's focus on what's in front of us."`);setCAct("");setBLoad(false);};

  const selectCase=(id)=>{const c=getCaseById(id);if(!c||!c.meta.available)return;snd(pCl);setCaseId(id);setScr("setup");};
  const startCase=()=>{if(!activeCase)return;const n=nameInput.trim()||"Detective";setPlayerName(n);savePrefs({name:n});snd(pRv);setSid(activeCase.meta.startScene);setHist([]);setPage(0);setClues([]);setPeople([]);setPlaces([]);setWords([]);setJrnlB(false);setBridge(null);setShowCh(false);setScr("play");};
  const backToPicker=()=>{setScr("picker");setCaseId(null);setSid(null);};
  const totalJ=clues.length+people.length+places.length+words.length;
  const compText=sc?.companion?.replace(/\{NAME\}/g,name)||"";

  /* ═══ PICKER ═══ */
  if(scr==="picker")return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Nunito',sans-serif",padding:"40px 20px"}}>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/><style>{CSS}</style>
      <div style={{maxWidth:440,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:".7rem",letterSpacing:5,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:10}}>The Field Journal of</div>
          <h1 style={{fontFamily:"'Alegreya',serif",fontSize:"clamp(1.8rem,6vw,2.4rem)",color:C.goldBright,margin:0,fontWeight:700,lineHeight:1.1}}>Mystery Trail</h1>
          <div style={{width:80,height:2,background:C.gold,margin:"14px auto 8px",borderRadius:1}}/>
          <p style={{fontFamily:"'Alegreya',serif",color:C.goldDim,fontSize:".9rem",fontStyle:"italic",margin:0}}>Select a case to investigate</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:24}}>
          {CASES.map(c=>{const a=c.meta.available;return(
            <button key={c.meta.id} onClick={()=>selectCase(c.meta.id)} disabled={!a} style={{background:a?C.paper:C.bgMid,border:`2px solid ${a?C.paperEdge:C.bgLight}`,borderRadius:4,padding:"18px 20px",textAlign:"left",cursor:a?"pointer":"not-allowed",opacity:a?1:.55,boxShadow:a?`0 2px 12px rgba(0,0,0,.3)`:"none",transition:"all .2s",position:"relative",fontFamily:"'Nunito',sans-serif"}}>
              {a&&<><div style={{position:"absolute",top:6,left:6,width:14,height:14,borderTop:`1.5px solid ${C.gold}`,borderLeft:`1.5px solid ${C.gold}`,opacity:.6}}/><div style={{position:"absolute",top:6,right:6,width:14,height:14,borderTop:`1.5px solid ${C.gold}`,borderRight:`1.5px solid ${C.gold}`,opacity:.6}}/><div style={{position:"absolute",bottom:6,left:6,width:14,height:14,borderBottom:`1.5px solid ${C.gold}`,borderLeft:`1.5px solid ${C.gold}`,opacity:.6}}/><div style={{position:"absolute",bottom:6,right:6,width:14,height:14,borderBottom:`1.5px solid ${C.gold}`,borderRight:`1.5px solid ${C.gold}`,opacity:.6}}/></>}
              <div style={{fontSize:".65rem",letterSpacing:3,color:a?C.goldDim:C.textLight,fontWeight:800,textTransform:"uppercase",marginBottom:6}}>Case File No. {c.meta.number}</div>
              <div style={{fontFamily:"'Alegreya',serif",fontSize:"1.25rem",color:a?C.text:C.goldDim,fontWeight:700,lineHeight:1.2,marginBottom:4}}>{c.meta.title}</div>
              <div style={{fontFamily:"'Alegreya',serif",fontSize:".88rem",color:a?C.textMid:C.textLight,fontStyle:"italic"}}>{c.meta.subtitle}</div>
              {a?<div style={{marginTop:10,fontSize:".7rem",color:C.goldDim,fontWeight:700}}>~{c.meta.estimatedMinutes} min</div>:<div style={{marginTop:10,fontSize:".7rem",color:C.textLight,fontStyle:"italic"}}>Sealed. Check back soon.</div>}
            </button>);})}
        </div>
        <div style={{display:"flex",gap:8}}>
          <div style={{flex:1}}><div style={{fontSize:".7rem",letterSpacing:3,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:8}}>Reading Level</div><div style={{display:"flex",gap:4}}>{LEVELS.map((l,i)=>(<button key={i} onClick={()=>{setLvl(i);snd(pCl);savePrefs({l:i});}} style={{flex:1,padding:"8px",borderRadius:6,border:"none",cursor:"pointer",background:lvl===i?C.gold:C.bgLight,color:lvl===i?C.bg:C.goldDim,fontWeight:800,fontSize:".75rem",transition:"all .2s",fontFamily:"'Nunito',sans-serif"}}>{l.label}</button>))}</div></div>
          <div><div style={{fontSize:".7rem",letterSpacing:3,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:8}}>Sound</div><button onClick={()=>{setSOn(!sOn);savePrefs({sOn:!sOn});}} style={{padding:"8px 16px",borderRadius:6,border:"none",cursor:"pointer",background:sOn?C.teal:C.bgLight,color:sOn?"#fff":C.goldDim,fontWeight:800,fontSize:".75rem",fontFamily:"'Nunito',sans-serif"}}>{sOn?"On":"Off"}</button></div>
        </div>
      </div>
    </div>
  );

  /* ═══ SETUP (name + case cover) ═══ */
  if(scr==="setup"&&activeCase){const m=activeCase.meta;return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Nunito',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/><style>{CSS}</style>
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

        {/* Name input */}
        <div style={{marginBottom:16,padding:"16px 20px",background:C.bgMid,borderRadius:8,border:`1px solid ${C.bgLight}`}}>
          <div style={{fontSize:".7rem",letterSpacing:3,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:10}}>Your Name, Detective</div>
          <input value={nameInput} onChange={e=>setNameInput(e.target.value)} placeholder="Enter your name..." maxLength={20}
            style={{width:"100%",padding:"12px 16px",borderRadius:8,fontSize:"1rem",fontFamily:"'Alegreya',serif",border:`2px solid ${C.bgLight}`,background:C.bg,color:C.goldBright,outline:"none",fontWeight:700,letterSpacing:.5,textAlign:"center"}}/>
          <p style={{margin:"8px 0 0",fontSize:".72rem",color:C.goldDim,fontStyle:"italic",textAlign:"center",fontFamily:"'Alegreya',serif"}}>Characters in the story will use your name.</p>
        </div>

        {/* Corvid intro */}
        <div style={{marginBottom:20,padding:"14px 16px",background:C.bgMid,borderRadius:8,border:`1px solid ${C.bgLight}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}><span style={{fontSize:20}}>🐦‍⬛</span><span style={{fontFamily:"'Alegreya',serif",fontSize:"1rem",color:C.goldBright,fontWeight:700}}>Corvid</span></div>
          <p style={{margin:0,fontSize:".78rem",color:C.goldDim,fontStyle:"italic",fontFamily:"'Alegreya',serif",lineHeight:1.5}}>Your aunt's raven. Dry, observant, occasionally helpful. Will judge your decisions.</p>
        </div>

        <button onClick={startCase} disabled={!nameInput.trim()} style={{width:"100%",padding:"16px",borderRadius:8,border:`2px solid ${C.gold}`,background:"transparent",cursor:nameInput.trim()?"pointer":"not-allowed",color:nameInput.trim()?C.goldBright:C.goldDim,fontWeight:800,fontSize:"1rem",letterSpacing:2,fontFamily:"'Nunito',sans-serif",transition:"all .2s",textTransform:"uppercase",opacity:nameInput.trim()?1:.4}}>Open the Case</button>
      </div>
    </div>
  );}

  /* ═══ PLAY ═══ */
  if(!sc)return null;
  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Nunito',sans-serif",display:"flex",flexDirection:"column"}}>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/><style>{CSS}</style>
      <VPop word={vP?.word} def={vP?.def} onClose={()=>setVP(null)}/>
      <Journal open={jrnlO} onClose={()=>{setJrnlO(false);setJrnlB(false);}} clues={clues} people={people} places={places} words={words}/>

      <div style={{padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <button onClick={backToPicker} style={tBtn}>←</button>
        <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>🐦‍⬛</span><span style={{fontSize:".75rem",color:C.goldDim,fontWeight:700}}>Corvid</span></div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>{setSOn(!sOn);savePrefs({sOn:!sOn});}} style={tBtn}>{sOn?"♪":"♪̶"}</button>
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
              <div style={{fontFamily:"'Alegreya',serif",fontSize:lv.fs,lineHeight:lv.lh,color:C.text,whiteSpace:"pre-line"}} key={`${sid}-${page}`}>
                <PText text={curPage} onVT={hvt}/>
              </div>
            </div>
            {!showCh&&<div style={{padding:"8px 20px 16px",position:"relative",zIndex:1,textAlign:"right"}}>
              <button onClick={nextPage} style={{background:"none",border:"none",cursor:"pointer",color:C.gold,fontFamily:"'Alegreya',serif",fontSize:".9rem",fontWeight:700,fontStyle:"italic",padding:"8px 0"}}>{isLastPage?"Continue →":"Turn page →"}</button>
            </div>}
          </div>

          {showCh&&<div style={{marginTop:12}}>
            {compText&&<div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10,animation:"fadeUp .3s ease"}}><span style={{fontSize:20,flexShrink:0,marginTop:2}}>🐦‍⬛</span><p style={{margin:0,fontSize:".85rem",lineHeight:1.6,color:C.goldDim,fontStyle:"italic",fontFamily:"'Alegreya',serif"}}>"{compText}"</p></div>}
            {sc.question&&<div style={{padding:"10px 14px",marginBottom:10,borderLeft:`3px solid ${C.gold}`,animation:"fadeUp .3s ease"}}><p style={{margin:0,fontSize:".82rem",color:C.goldBright,fontWeight:700,lineHeight:1.5,fontFamily:"'Alegreya',serif",fontStyle:"italic"}}>🤔 {sc.question}</p></div>}
            {bridge&&<div style={{padding:"10px 14px",marginBottom:10,borderLeft:`3px solid ${C.teal}`,animation:"fadeUp .3s ease"}}><p style={{margin:0,fontSize:".85rem",color:C.goldDim,fontStyle:"italic",lineHeight:1.6,fontFamily:"'Alegreya',serif"}}>{bridge}</p></div>}
            {sc.ending?(
              <div style={{animation:"fadeUp .3s ease"}}>
                <div style={{textAlign:"center",padding:"16px",background:C.bgLight,borderRadius:8,marginBottom:12,border:`1px solid ${C.gold}22`}}>
                  <div style={{fontSize:36,marginBottom:8}}>{sc.endEmoji}</div>
                  <h2 style={{margin:"0 0 6px",fontFamily:"'Alegreya',serif",fontSize:"1.2rem",color:C.goldBright}}>{sc.endTitle}</h2>
                  <p style={{margin:0,color:C.goldDim,fontSize:".88rem",lineHeight:1.6}}>{(sc.endMessage||"").replace(/\{NAME\}/g,name)}</p>
                </div>
                {totalJ>0&&<button onClick={()=>setJrnlO(true)} style={{...cBtn,width:"100%",justifyContent:"center",marginBottom:8,borderColor:C.gold,color:C.goldBright}}>📓 Review your journal ({totalJ} entries)</button>}
                <div style={{display:"flex",gap:8}}><button onClick={startCase} style={{...cBtn,flex:1,justifyContent:"center",background:C.gold,color:C.bg,borderColor:C.gold}}>Play Again</button><button onClick={backToPicker} style={{...cBtn,flex:1,justifyContent:"center"}}>All Cases</button></div>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:8,animation:"fadeUp .3s ease"}}>
                {(sc.choices||[]).map((c,i)=>(<button key={i} onClick={()=>goTo(c.next)} style={cBtn}><span style={{fontSize:16,flexShrink:0}}>{c.icon}</span><span>{c.text}</span></button>))}
                {hist.length>0&&<button onClick={goBack} style={{...cBtn,opacity:.5,fontSize:".82rem"}}>⬅️ Go back</button>}
                <div style={{display:"flex",gap:6,marginTop:4}}>
                  <input value={cAct} onChange={e=>setCAct(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")hCA();}} placeholder="Type your own idea..." disabled={bLoad} style={{flex:1,padding:"10px 14px",borderRadius:8,fontSize:".85rem",fontFamily:"'Alegreya',serif",border:`1px solid ${C.bgLight}`,background:C.bgMid,color:C.white,outline:"none",fontStyle:"italic"}}/>
                  <button onClick={hCA} disabled={bLoad||!cAct.trim()} style={{...tBtn,padding:"10px 14px",opacity:cAct.trim()?1:.3,fontSize:"1rem"}}>➤</button>
                </div>
                {bLoad&&<p style={{color:C.goldDim,textAlign:"center",fontSize:".78rem",margin:0,fontStyle:"italic"}}>Corvid is watching...</p>}
              </div>
            )}
          </div>}
        </div>
      </div>
    </div>
  );
}

const cBtn={display:"flex",alignItems:"center",gap:10,background:C.bgMid,border:`1.5px solid ${C.bgLight}`,borderRadius:8,padding:"12px 16px",fontSize:".9rem",fontFamily:"'Nunito',sans-serif",fontWeight:700,color:C.white,cursor:"pointer",textAlign:"left",transition:"all .15s",lineHeight:1.4};
const tBtn={background:C.bgMid,border:`1px solid ${C.bgLight}`,borderRadius:8,padding:"6px 10px",cursor:"pointer",fontSize:".85rem",color:C.goldDim,fontFamily:"'Nunito',sans-serif",fontWeight:700};
const CSS=`
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes popIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
button:hover{opacity:.85}button:active{transform:scale(.98)!important}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}body{margin:0}
input:focus{border-color:${C.gold}!important}input::placeholder{color:${C.goldDim}55}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${C.paperEdge};border-radius:2px}
`;
