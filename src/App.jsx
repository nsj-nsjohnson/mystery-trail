import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";

/* ═══════════════════════════════════════════════════
   MYSTERY TRAIL — Journal Edition
   Gravity Falls aesthetic: dark forest, aged journal,
   gold accents, paginated text, cool not cute
   ═══════════════════════════════════════════════════ */

const C = {
  bg: "#0B1622",
  bgMid: "#12202F",
  bgLight: "#1A2D40",
  paper: "#F4E8D1",
  paperDark: "#E8D5B5",
  paperEdge: "#D4BF97",
  text: "#2C1810",
  textMid: "#5C4033",
  textLight: "#8B7355",
  gold: "#D4A847",
  goldBright: "#F0C75E",
  goldDim: "#A68432",
  red: "#C0392B",
  teal: "#2E8B7A",
  greenDark: "#1B4332",
  white: "#FFF8EE",
};

const LEVELS = [
  { label: "Beginner", fs: "1.18rem", lh: 2.0 },
  { label: "Growing", fs: "1.06rem", lh: 1.85 },
  { label: "Explorer", fs: "0.96rem", lh: 1.75 },
];

const COMPANIONS = [
  { id:"fox",name:"Sage",emoji:"🦊",color:"#D4772C",desc:"Clever fox, nose for clues" },
  { id:"owl",name:"Luna",emoji:"🦉",color:"#7C6BEE",desc:"Wise owl, sees everything" },
  { id:"cat",name:"Shadow",emoji:"🐈‍⬛",color:"#2E8B7A",desc:"Sleek cat, sneaks anywhere" },
  { id:"dog",name:"Scout",emoji:"🐕",color:"#C0392B",desc:"Loyal hound, best ears in town" },
];

/* ═══ STORY (same content, same quality) ═══ */
const S={start:{mood:"v",text:`You and {C} had only been in Fernwood Hollow for one day when everything went sideways.\n\nYou were exploring the town square, admiring the little shops and the big oak tree in the center, when Mayor Badger came **barreling** out of the Oyster Shell Museum like his tail was on fire. "ATTENTION, CITIZENS!" he shouted, waving his arms so hard his monocle flew off and landed in Mrs. Chipmunk's lemonade. "We have been BURGLED! BURGLARIZED! BURGLAR-ATED!"\n\nHe fished out his monocle, put it on upside down, and kept going. "The Moonstone has been STOLEN from its display case!"\n\nThe crowd gasped. You'd heard about the Moonstone, a gem that glowed like a captured piece of the moon. Every night it lit up the whole town square so everyone could have picnics and play games after dark. Without it, Fernwood Hollow would go **pitch-dark** at sunset.\n\n{C} tugged your sleeve. "We should check this out." You pushed through the crowd to the display case. The glass lid was open. Inside, the velvet cushion held two clues: a muddy **pawprint** pressed deep into the fabric, and a torn scrap of bright blue cloth caught on the latch.\n\nMayor Badger appeared behind you, blowing his nose into an enormous handkerchief. "Will SOMEONE please **invistigate**? Er, investigate? My nerves are absolutely SPLATTERED."`,vocab:{barreling:"Running fast and out of control","pitch-dark":"So dark you can't see anything",pawprint:"A mark left by an animal's foot",invistigate:"Mayor Badger's way of saying 'investigate' (he gets words wrong!)"},companion:`Two clues already. A pawprint and a piece of cloth. Not bad for our first day in town.`,question:null,choices:[{text:"Examine the pawprint up close",icon:"🔍",next:"pawprint"},{text:"Take the cloth to the tailor",icon:"🧵",next:"cloth"},{text:"Ask Mayor Badger who had keys",icon:"🔑",next:"keys"}]},
pawprint:{mood:"v",text:`You crouched beside the case and studied the pawprint. Four toes, each with a small curved claw mark, sunk deep into the velvet like the thief had been carrying something heavy. {C} leaned in close and took a long, careful sniff.\n\n"That's not garden dirt," {C} said, eyes narrowing. "It's river clay. The red, **sticky** kind that only comes from down by Willow Creek bridge. I'd know that smell anywhere."\n\nOld Mr. Turtle, who had been watching from behind his **spectacles**, nodded so slowly you could have made a sandwich while waiting. "Correct. That particular clay **stains** everything it touches. Whoever left this print walked through the shallows before coming here."\n\nA little mouse in the crowd raised his hand. "Maybe the Moonstone just got bored and walked away on its own!"\n\nEveryone turned to stare at him.\n\n"What?" he said **defensively**. "Stranger things have happened."\n\n{C} was already moving toward the square's south exit. "If the thief came from Willow Creek, there'll be more prints. That clay doesn't wash off easy."`,vocab:{sticky:"Stays on things and is hard to remove",spectacles:"Glasses for seeing better",stains:"Leaves a mark that's hard to clean",defensively:"In a way that shows you think people are judging you"},companion:`River mud. That means our thief came from the south side of town.`,question:`The thief was carrying something heavy enough to press deep into velvet. What does that tell us?`,choices:[{text:"Follow the trail to Willow Creek bridge",icon:"🌉",next:"bridge"},{text:"Find out who lives near the river",icon:"🏘️",next:"riverfolk"}]},
cloth:{mood:"m",text:`You took the scrap of blue cloth to Rabbit the Tailor's shop in the market. Rabbit was a fluffy gray bunny with seven pins stuck in her apron, a tape measure draped around her neck, and the **uncanny** ability to talk faster than most animals could think.\n\n"Oh my GOODNESS!" She snatched the fabric from your hand and held it up to the window light, squinting at it from three different angles. "I KNOW this cloth! I made a scarf from this exact bolt of **indigo** silk just last week!" She was already flipping through her enormous order book, licking her thumb between pages. "Now, I'm not one to gossip, BUT..."\n\nShe lowered her voice to a whisper so loud it was basically just talking. "This was a **custom** order from Raven. You know Raven? The collector who lives in that enormous pine tree on Ridgeline Road? House full of **antiques** and crystals and rare feathers? Not that I'm SAYING she stole the Moonstone, but she does love shiny things, and the Moonstone is VERY shiny, and she once told me, right here in this shop, that the Moonstone **deserved** to be in a REAL collection and not just sitting in a public museum where..."\n\nShe caught herself mid-sentence and straightened up. "But I'm not one to gossip."\n\n{C} looked at you with raised eyebrows.`,vocab:{uncanny:"Strange or remarkable in a way that's hard to explain",indigo:"A deep blue-purple color",custom:"Made specially for one person",antiques:"Very old and valuable objects",deserved:"Earned, should have"},companion:`Rabbit says the cloth belongs to Raven. But Rabbit also says a LOT of things.`,question:null,choices:[{text:"Go visit Raven in the tall pine tree",icon:"🌲",next:"raven"},{text:"Ask other animals about Raven first",icon:"🗣️",next:"ask_raven"}]},
keys:{mood:"i",text:`Mayor Badger led you into his office, a cluttered room that smelled like old paper and peppermint tea. He sank into his enormous leather chair and pulled out a **monogrammed** handkerchief.\n\n"Only three animals have keys to that case," he said, holding up three pudgy fingers. "Myself, Sergeant Otter the night guard, and Mole the cleaner. All **trustworthy** citizens. Well, Mole once ate an entire cake meant for the town picnic, but that's a separate issue."\n\nHe held up his key ring with a **flourish**. "And MY key never leaves my side! Safe as houses!"\n\nBut when you leaned in to look, something caught your eye. Fresh scratches on the brass ring, fine and **deliberate**, like someone had pried it open recently. And there, in the grooves of the key itself, you spotted a tiny smear of gray, waxy stuff.\n\n"Mayor Badger," you said carefully, "has anyone else handled your keys?"\n\nHis magnificent mustache trembled. The monocle slipped. "Well, I do occasionally leave them on my desk. When I take my afternoon nap. Which is... most afternoons." He tugged his collar. "But nobody would DARE tamper with the mayor's personal property! This is an outrage of the highest **magnitude**!"`,vocab:{monogrammed:"Having someone's initials sewn or printed on it",trustworthy:"Can be trusted, reliable",flourish:"A big, dramatic movement to show something off",deliberate:"Done carefully and on purpose",magnitude:"How big or important something is"},companion:`Fresh scratches and gray wax on a key ring. Someone made a copy of that key.`,question:`If someone copied the key while the mayor napped, who could get into his office without raising suspicion?`,choices:[{text:"Talk to Sergeant Otter",icon:"🦦",next:"otter"},{text:"Figure out where the wax came from",icon:"🔎",next:"key_scratch"}]},
bridge:{mood:"r",text:`The trail of red clay led you and {C} through a stretch of birch trees and down a slippery bank to Willow Creek bridge. The old wooden bridge groaned and **creaked** under your feet like it was complaining about having visitors.\n\n"More prints!" {C} pointed at the planks. The same four-toed tracks, **crusted** with red mud, led off the far side of the bridge and down to the waterline, where a huge hollow log lay wedged between the roots of an ancient willow tree.\n\nYou got on your hands and knees and crawled inside. It was dark, damp, and smelled like wet bark and something metallic. But someone had been here recently. A small brass lantern sat in the corner, and when you touched the glass, it was still warm. A half-eaten walnut sat next to it.\n\n"Over here!" {C} was digging at something stuck in a crack in the bark. Out came a tiny brass gear, no bigger than a shirt button, with perfect little teeth around its edge. It caught the light and gleamed.\n\n"This isn't just any gear," {C} said, holding it up and squinting. "This is **precision** work. Handmade. Somebody brought serious **equipment** down here and lost a piece of it."`,vocab:{creaked:"Made a squeaky, stretchy sound",crusted:"Covered with a hard, dried layer",precision:"Made very exactly and carefully",equipment:"Tools and machines used for a job"},companion:`A warm lantern and a lost gear. Our thief was here recently, working on something mechanical.`,question:null,choices:[{text:"Follow the prints past the log",icon:"🐾",next:"den"},{text:"Take the gear to the clockmaker",icon:"⚙️",next:"clockmaker"}]},
riverfolk:{mood:"r",text:`Three families lived along Willow Creek: the Otters, the Beavers, and a **newcomer**.\n\nThe Beaver family was DELIGHTED to have visitors. Mrs. Beaver pulled you inside before you could finish your first question, sat you down at her kitchen table, and pushed a plate of acorn cookies toward you so fast they nearly slid off the edge.\n\n"Oh, we heard EVERYTHING last night," she said, leaning forward with the **intensity** of someone who had been waiting all day to tell this story. "First there was splashing. LOUD splashing, around midnight. Then this weird clicking sound, like tiny metal parts going tick-tick-tick. My Harold wanted to investigate, but I said, 'Harold Beaver, you are NOT going out there at midnight in your **pajamas**!' And that was that."\n\nMr. Beaver, a large brown beaver in a plaid vest, nodded **mournfully** from his armchair.\n\n"There's also a new neighbor," Mrs. Beaver continued, dropping her voice. "A raccoon. Calls himself Fingers. Moved in about a month ago. Keeps to himself. Always **tinkering** with things in his little den down by the water. Comes and goes at odd hours." She paused. "Not that I'm watching. I just... notice things."`,vocab:{newcomer:"Someone who has recently arrived",intensity:"Deep, focused energy",pajamas:"Clothes you wear to bed",mournfully:"In a sad, gloomy way",tinkering:"Working on something in a casual, experimental way"},companion:`Midnight splashing, metallic clicking, and a mysterious new raccoon. That's a lot of suspicious activity.`,question:`Mrs. Beaver heard clicking like tiny metal parts. What kind of tools make that sound?`,choices:[{text:"Visit this Fingers character",icon:"🦝",next:"den"},{text:"Search the riverbank for clues",icon:"🌉",next:"bridge"}]},
raven:{mood:"i",text:`Raven's home sat at the very top of the tallest pine tree on Ridgeline Road, and stepping inside was like entering a museum run by someone with **magnificent** taste and zero interest in empty wall space.\n\nEvery surface held something beautiful: oil paintings in gold frames, shelves of **gleaming** crystals arranged by color, glass cases protecting rare feathers and ancient coins. The place even smelled expensive.\n\nRaven herself was a large, sleek black bird with an enormous vocabulary and a flair for drama that could put a soap opera to shame.\n\nWhen you held up the blue cloth, she gasped so hard she nearly fell off her perch. "My SCARF!" She pressed one wing to her chest. "My beautiful, one-of-a-kind indigo silk scarf! But that's IMPOSSIBLE! It was STOLEN from this very room two days ago!"\n\nShe swept across the room and pointed at her window. A perfect circle, smooth as a dinner plate, had been cut right through the glass. Not cracked. Not smashed. CUT, by someone with a **specialized** tool and a very steady hand.\n\n"Do you SEE?" Raven said, turning back to you with eyes blazing. "Someone broke in, stole my scarf, and used it to frame me for the Moonstone theft! This is a FRAME JOB! A **conspiracy** against the most refined bird in Fernwood Hollow!" She placed the back of her wing against her forehead. "I may need to sit down."`,vocab:{magnificent:"Extremely beautiful and impressive",gleaming:"Shining brightly",specialized:"Designed for one particular job",conspiracy:"A secret plan to do something harmful"},companion:`That window was cut with a professional tool. If her scarf was stolen BEFORE the heist, someone planned this carefully.`,question:`Raven says she's being framed. What kind of thief plans that far ahead?`,choices:[{text:"Examine the cut window",icon:"🪟",next:"window_clue"},{text:"Ask who would frame Raven",icon:"🤔",next:"frame"}]},
ask_raven:{mood:"m",text:`Before heading to Raven's tree, you decided to gather some **intelligence** at the market. The animals of Fernwood Hollow, it turned out, had VERY strong opinions.\n\n"Raven is obviously guilty," declared Mouse, standing on an apple crate to make himself taller. "She LOVES gems. She practically **drools** over them. The Moonstone would be the crown jewel of her collection!"\n\nBut Squirrel dropped from a nearby branch and landed between you. "That's **ridiculous**, Mouse. Raven already owns crystals worth ten times the Moonstone. Why would she risk everything to steal something worth less than what's already in her living room?"\n\nMouse opened his mouth, closed it, and climbed down from his crate.\n\nThen Chipmunk appeared at your elbow. He was small, **jittery**, and had the look of someone carrying a secret that was physically too heavy for him. "Forget Raven," he whispered. "There's a new animal in town. A raccoon. Showed up about a month ago. He's been going around asking WEIRD questions. Like what time the guard changes shifts. What kind of lock is on the Moonstone case. How thick the glass is." He looked over both shoulders. "That's not normal **curiosity**."`,vocab:{intelligence:"Information gathered to solve a problem",drools:"Gets so excited you can barely control yourself",ridiculous:"So silly it doesn't make sense",jittery:"Nervous and jumpy",curiosity:"Wanting to know about something"},companion:`Two leads in different directions. The raccoon asking about security is suspicious.`,question:null,choices:[{text:"Find this raccoon. Now.",icon:"🦝",next:"den"},{text:"Hear Raven's side of the story",icon:"🪶",next:"raven"}]},
otter:{mood:"r",text:`Sergeant Otter was at his guard post by the river, doing one-armed push-ups when you arrived, which he was clearly doing for your benefit.\n\n"WELCOME!" He sprang to his feet and **saluted** so hard he almost smacked himself. "Sergeant Otter, Head of Moonstone Security! I was on duty ALL night! Nobody gets past THESE!" He flexed both arms and kissed each bicep individually. {C} looked away to keep from laughing.\n\nBut when you pressed for details, the flexing stopped. His broad shoulders **slumped**.\n\n"Okay. Fine," he muttered, studying his feet. "I MIGHT have... fallen asleep. For about an hour. Around midnight." He tugged his collar. "And here's the weird part. When I woke up, my key was in my LEFT pocket. But I ALWAYS keep it in my right pocket. Always. I'm very **particular** about my pocket system."\n\nHe looked at you with big, worried eyes. "Someone took that key while I was sleeping, didn't they? Someone **borrowed** it and put it back." His lower lip trembled. Then he flexed again, but it was the saddest flex you'd ever seen. "I bench-press river rocks, you know. This shouldn't have happened to someone who bench-presses river rocks."`,vocab:{saluted:"Made a formal military greeting",slumped:"Drooped downward in a sad or tired way",particular:"Very careful about exactly how things should be",borrowed:"Took something planning to return it"},companion:`Someone moved his key while he slept. Did he fall asleep on his own, or did someone MAKE him?`,question:null,choices:[{text:"Ask what made him so sleepy",icon:"🍵",next:"sleepy"},{text:"Check for footprints nearby",icon:"👣",next:"bridge"}]},
key_scratch:{mood:"i",text:`You carefully scraped the gray **residue** from the key and brought it to Hedgehog's Candle and Wax Shop, a store so small you had to duck through the door.\n\nHedgehog herself was tiny, even by hedgehog standards, and wore glasses so enormous they made her eyes look like dinner plates. She took the wax sample, held it under a magnifying lamp, and gasped.\n\n"Casting wax!" she squeaked. "Gray, Grade-A casting wax! You know what this is for? You press a key into it to make a perfect **impression**. Then you pour metal into the mold and BOOM, duplicate key." She was already flipping through her sales ledger. "Here it is! Sold one block of gray casting wax last Tuesday. To a raccoon. Never seen him before. He was **fidgety**, paid in exact change, and scurried out of here like his tail was on fire."\n\nShe looked up at you over those giant glasses. "I thought it was weird at the time, but you know. Wax is wax. A girl's gotta make a living."`,vocab:{residue:"A tiny amount of something left behind",impression:"A mark made by pressing into something soft",fidgety:"Nervous and unable to keep still"},companion:`Gray wax, a mystery raccoon, and a copied key. Every lead points toward the river.`,question:null,choices:[{text:"Find this raccoon",icon:"🦝",next:"den"},{text:"Set a trap using a fake gem",icon:"🪤",next:"trap"}]},
clockmaker:{mood:"i",text:`Beetle's Clockwork Shop was a **wonderland** of ticking. Clocks covered every wall, filled every shelf, and hung from the ceiling on chains. Somewhere in the middle of it all, Beetle himself sat on a high stool, a beetle so small he needed a step ladder to reach his own workbench, wearing magnifying goggles so powerful his eyes looked like two shiny hubcaps.\n\nThe moment you produced the gear, something extraordinary happened. Beetle stopped mid-sentence. His antennae stood straight up. His goggles fogged over.\n\n"Is... is that..." He leaped off his stool, scuttled across the workbench at **alarming** speed, and plucked the gear from your fingers like it was made of diamonds. "A GRADE-SEVEN DOUBLE-CUT BRASS GEAR WITH BEVELED TEETH?!"\n\nHe held it up to his desk lamp, rotating it with the **tenderness** of someone holding a baby bird. For a solid thirty seconds, he forgot you existed. {C} cleared their throat. Twice.\n\n"Oh! Right. The crime. Yes." Beetle set down the gear with visible **reluctance**. "This component is from a portable lock-picking device. Very advanced, very expensive, very illegal." He tapped his chin. "A raccoon visited my shop last month. Asked extremely specific questions about lock mechanisms. Said he was 'writing a book.'" Beetle looked at you over his enormous goggles. "Nobody who asks that many questions about the inside of locks is writing a book."`,vocab:{wonderland:"A place full of amazing things",alarming:"Surprisingly fast in a worrying way",tenderness:"Gentle, careful kindness",reluctance:"Not wanting to do something"},companion:`That gear is from a lockpick. And a mystery raccoon has been studying locks.`,question:null,choices:[{text:"Find this raccoon NOW",icon:"🦝",next:"den"},{text:"Ask Beetle to help set a trap",icon:"🪤",next:"trap"}]},
window_clue:{mood:"i",text:`You examined the hole in Raven's window with {C}. The cut was a perfect circle, smooth as a plate, with no cracks or rough edges. This wasn't done with a rock or an elbow. Somebody used a diamond-tipped glass cutter, the kind that costs more than most animals earn in a month.\n\nBut the real evidence was outside. On the windowsill, you found a smudge of red river clay, the exact same **distinctive** mud from the Moonstone crime scene. And on the pine branch just below the window, pressed clearly into the sticky sap: small, five-fingered pawprints. **Unmistakably** raccoon.\n\n{C} looked at you, eyes bright. "Same mud. Same precision tools. Same careful planning. This isn't two crimes, it's one crime with two **stages**. Our thief robbed Raven FIRST to get the scarf, then used it to frame her while stealing the Moonstone."\n\nRaven, who had been watching from her fainting couch, sat bolt upright. "I TOLD you! I'm being **persecuted**!"`,vocab:{distinctive:"Easy to recognize because it is unique",unmistakably:"In a way that cannot be confused",stages:"Steps in a plan",persecuted:"Treated unfairly on purpose"},companion:`Every clue points toward the river. A raccoon with professional tools and a plan complicated enough to frame an innocent bird.`,question:null,choices:[{text:"Follow the raccoon tracks",icon:"🐾",next:"den"},{text:"Bring all evidence to Mayor Badger",icon:"📋",next:"ending_smart"}]},
frame:{mood:"i",text:`Raven paced her perch like a detective in a crime movie, one wing behind her back. "Who would TARGET me? Who would have the **audacity**?"\n\nSuddenly she stopped dead. Her eyes went wide. "FINGERS."\n\n"Who?" you and {C} said together.\n\n"A raccoon! Three weeks ago, we were both bidding on a rare quartz crystal at the Bramblewood Auction. **Magnificent** piece, pink with gold veins. The bidding went back and forth, back and forth. I won." She smiled briefly at the memory, then the smile vanished. "He was LIVID. His paws were shaking. He pointed right at me and said, 'You'll **regret** this, Raven. Mark my words.'"\n\nShe turned to you. "I thought he was just a sore loser. But what if this is his revenge? Steal the Moonstone, frame ME for it using my own scarf, and sit back while I take the **blame**?"`,vocab:{audacity:"Bold, shocking rudeness or nerve",magnificent:"Extremely beautiful and impressive",regret:"To feel sorry about something",blame:"Being held responsible for something bad"},companion:`Revenge plus profit. This raccoon planned everything: steal her scarf, steal the Moonstone, frame her for both.`,question:null,choices:[{text:"Go find Fingers",icon:"🦝",next:"den"},{text:"Set a trap he can't resist",icon:"🪤",next:"trap"}]},
sleepy:{mood:"r",text:`Something flickered behind Otter's eyes. "WAIT. I just remembered." He snapped his fingers. "There was TEA! A cup of chamomile tea sitting on my guard post when I started my shift. Little note that said 'From the Mayor's office.' I thought it was a nice **gesture**."\n\n"Did it taste normal?" you asked.\n\nOtter **winced**. "Now that you mention it... no. It was more bitter than usual. Kind of **metallic**. But it was free tea, and I'm not the type to turn down free tea, so I drank the whole thing." He looked at his feet. "Within twenty minutes, I could barely keep my eyes open. It was like someone pulled a plug in my brain."\n\n{C} was already putting the pieces together. "Someone left **drugged** tea at your post. They knew your shift schedule. They knew you'd drink free tea. This thief has been watching you, Otter. For a while."\n\nOtter's eyes went wide. Then he flexed one arm, but it was more of a nervous habit than a display. "That's... really **creepy**, actually."`,vocab:{gesture:"A kind action to show how you feel",winced:"Made a face showing discomfort",metallic:"Tasting like metal",drugged:"Had something added to make you sleepy",creepy:"Making you feel nervous or scared"},companion:`Drugged tea, a fake note, someone who's been watching. This thief doesn't leave anything to chance.`,question:`The thief knew Otter would drink the tea. What does that tell you about how long they've been planning?`,choices:[{text:"Head for the river. This ends now.",icon:"🕵️",next:"den"},{text:"Look for clues along the creek",icon:"🌉",next:"bridge"}]},
den:{mood:"c",text:`The trail of evidence led to a tidy den built into the riverbank, half-hidden behind trailing willow branches. A cheerful wooden sign over the door read "WELCOME, FRIENDS!" in painted cursive. It was the kind of sign that made you want to trust whoever lived here, which, {C} pointed out, was **suspicious** all by itself.\n\n{C} knocked. The door swung open to reveal a raccoon with bright, clever eyes and the kind of wide, warm smile that could sell you a bridge. "Oh! Visitors! How absolutely **delightful**!" He bowed with a little flourish. "I'm Fingers. Please, please, come in. Make yourselves comfortable. Can I offer you acorn tea? Walnut cookies? I just baked them this morning."\n\nThe den looked perfectly **innocent**. Cozy armchairs, shelves of books, a crackling fire, and the smell of fresh baking. Fingers chatted cheerfully about the weather, the lovely river views, and the new bridge the beavers were building.\n\nBut while he was pouring tea with his back turned, {C} slipped behind a heavy curtain at the back of the room. A moment later, {C} caught your eye from behind the fabric. The expression on {C}'s face could only be described as "jackpot."\n\nYou peeked behind the curtain while Fingers stirred sugar into his tea. Your heart nearly stopped.\n\nA complete secret workbench filled the hidden room. Lockpicking tools laid out by size, like surgical instruments. Gray wax molds holding the perfect **impression** of a brass key. And pinned to the wall, a hand-drawn map of the town square with the Moonstone display case circled three times in bright red ink. Someone had written "TARGET" underneath with an arrow.\n\nFingers appeared at the curtain, still holding his teapot. His smile hadn't changed even slightly.\n\n"Oh," he said pleasantly. "You found my hobby room."`,vocab:{suspicious:"Making you think something is wrong",delightful:"Very pleasant and enjoyable",innocent:"Not guilty, not harmful",impression:"A mark made by pressing into something soft"},companion:`Lockpicks. Key molds. A map with the Moonstone circled in red. And this guy offered us cookies.`,question:`We have all the evidence. But Fingers is right here. Do we handle this ourselves, or get backup?`,choices:[{text:"Confront him right now",icon:"😤",next:"confront"},{text:"Get out and bring Mayor Badger",icon:"🏃",next:"ending_smart"}]},
trap:{mood:"v",text:`The plan was brilliant, if you said so yourself. With Mayor Badger's help, you spread a rumor through town: a SECOND gem, even more valuable than the Moonstone, called the "Sunstone," would be placed on **temporary** display tonight and tonight only.\n\nOf course, there was no Sunstone. But the thief didn't know that.\n\nAs darkness fell, half of Fernwood Hollow's citizens **concealed** themselves behind barrels, bushes, and market stalls around the town square. Mayor Badger, hidden behind an incredibly thin tree, kept whispering at full volume: "Is he COMING? Can anyone SEE anything?" Mrs. Beaver shushed him so many times she pulled a muscle. Beetle accidentally knocked over a stack of flower pots and had to be sat on by Otter.\n\nThen, at exactly midnight, a shadow **materialized** at the edge of the square. It moved low and fast, hugging the walls. As it stepped into the faint moonlight, you saw him clearly: a raccoon, face covered by a mask made from a very familiar indigo silk scarf, carrying a set of lockpicking tools in both paws.\n\nHe reached the display case. His tools touched the lock.\n\n"NOW!" Mayor Badger bellowed so loudly that several concealed citizens screamed.`,vocab:{temporary:"Only lasting for a short time",concealed:"Hidden from view",materialized:"Appeared suddenly"},companion:`The whole town working together. Mayor Badger whispering like a foghorn. Beetle getting sat on. Legendary.`,question:null,choices:[{text:"SPRING THE TRAP!",icon:"🪤",next:"ending_trap"}]},
confront:{mood:"c",text:`"We know everything, Fingers," you said, keeping your voice steady. "The wax molds. The lockpicks. The map. You stole Raven's scarf to frame her, drugged Otter's tea, and took the Moonstone."\n\nFor the first time since you'd met him, the raccoon's legendary smile **faltered**. Just for a second, the mask slipped, and you saw something real underneath: a calculating mind that was very quickly running out of options.\n\nHe set down the teapot with deliberate slowness. "Well. That's... **comprehensive**." He glanced at the door. {C} was already standing in front of it, arms crossed.\n\n"I don't suppose we could discuss this over cookies?"\n\n"No," said {C}.\n\nFingers sighed. Then he bolted for the window. What happened next took about three seconds: he leaped, caught his foot on his own lockpicking kit, **pirouetted** into the map wall (which collapsed), and landed face-first in a pile of wax molds with a sad, crunchy SPLAT.\n\n{C} looked down at him. "That went well for you."\n\nFingers rolled over, covered in broken wax, and raised both paws. "Fine. You got me. The Moonstone is under the third flat rock east of the bridge. You can't miss it." He paused. "It's the one that's glowing."`,vocab:{faltered:"Became less strong or sure",comprehensive:"Complete, covering everything",pirouetted:"Spun around like a dancer (but less gracefully)"},companion:`Tripped over his own lockpicks. There's a kind of poetry in that.`,question:null,choices:[{text:"Recover the Moonstone!",icon:"💎",next:"ending_hero"}]},
ending_hero:{mood:"x",text:`The Moonstone was exactly where Fingers said it would be: nestled under the third flat rock east of the bridge, glowing softly in its little hiding place like a nightlight that missed its home.\n\nYou lifted it carefully with both hands. It was warm, and up close, the glow shifted through colors you didn't have names for.\n\nWhen you carried it back to the town square, the reaction was **pandemonium**. Animals poured from every doorway, cheering, clapping, and in the Beaver family's case, crying. Mayor Badger attempted a speech but was so overwhelmed he kept losing his words even worse than usual. "You have rescued this town from... from OBSCURITY! No, wait. DARKNESS! Both the literal and the... the METAPHORICAL kind!" He blew his nose so loudly a nearby bird startled out of a tree, then placed the Golden Acorn Medal around your neck and {C}'s with shaking paws.\n\nRaven swooped in wearing her finest cape, officially cleared of all suspicion, and shook your hand so many times your arm went numb. "I will compose an OPERA about this investigation!"\n\nBeetle was discovered in the corner, examining Fingers' confiscated lockpick with tears of **admiration** in his enormous goggle-eyes. Sergeant Otter stood at attention nearby, flexing quietly, his honor restored.\n\nAs for Fingers, Mayor Badger sentenced him to six months of community service: going door to door and installing better, stronger locks on everything he'd proved he could pick. The raccoon accepted the **verdict** with a sigh, but as he hoisted his toolbox and headed toward the museum, you caught something: a small, genuine smile. Not the charming, calculated one. A real one.\n\nThat night, the Moonstone was restored to its case, and the town square blazed with light for the biggest celebration Fernwood Hollow had ever seen. There were acorn cakes and Rabbit told the story so many times she lost her voice.\n\n{C} bumped your shoulder as fireflies danced in the warm air above the square. "You know what? Not bad for our first week in town. Not bad at all."`,vocab:{pandemonium:"Wild chaos and noise",admiration:"Feeling impressed and respectful",verdict:"The final decision about someone's consequence"},companion:`The Moonstone is home. The town is glowing. Case closed.`,ending:true,endTitle:"The Hero Detective",endEmoji:"🏅",endMessage:"You cracked the case and saved Fernwood Hollow! Fingers now installs the best locks in town. Raven composed a three-hour opera (attendance is mandatory). The Moonstone has never shone brighter. 🌟🏅"},
ending_smart:{mood:"x",text:`You made the hardest choice a detective can make: you walked away from the suspect.\n\nYou slipped out with {C} close behind, quiet as shadows, and ran straight to Mayor Badger's office. There, you laid out everything. The river mud. The copied key. The drugged tea. Raven's stolen scarf. The lockpicks, the wax molds, the map with the Moonstone circled in red. Every piece of the puzzle, assembled in **logical** order.\n\nMayor Badger listened with his monocle slowly sliding down his nose. When you finished, he sat in silence for three full seconds, which was a personal record.\n\nThen he stood up. "SERGEANT OTTER! Assemble an official search team!"\n\nOtter was beside himself with **relief**. He practically sprinted to the den, leading a team of guards. They found the Moonstone behind a cleverly constructed false wall, along with detailed plans for robberies in three neighboring towns. Fingers didn't even try to run. He looked at the guards, looked at his exposed workshop, and said, "I'm going to need a bigger teapot."\n\nAt the ceremony that evening, Mayor Badger managed a speech without a single word fumble (a Fernwood Hollow first). "This young detective showed us something **remarkable** today. Being brave doesn't always mean charging in. Sometimes the most **courageous** act is gathering evidence, building a case, and trusting the process. That's not just detective work. That's wisdom."\n\nRaven, officially cleared, gave you a genuine antique magnifying glass from her personal collection. "You have excellent instincts, detective. And even better **judgment**."\n\n{C} watched you turn the magnifying glass over in your hands. "You know what? That looks good on you. Very professional."\n\nThe Moonstone went back to its case, glowing like it had never left. Fingers got six months of lock-installation duty. And Fernwood Hollow slept peacefully that night for the first time in a week.`,vocab:{logical:"In an order that makes sense",relief:"The feeling when something stressful is over",remarkable:"Worth noticing because it is impressive",courageous:"Very brave",judgment:"The ability to make good choices"},companion:`Proof over glory. That's what separates a good detective from a great one.`,ending:true,endTitle:"The Wise Investigator",endEmoji:"🔍",endMessage:"Your careful detective work saved Fernwood Hollow the right way. Raven's magnifying glass sits on your desk. Mayor Badger tells everyone: 'That kid taught ME something about wisdom.' 📋🔍✨"},
ending_trap:{mood:"x",text:`Every lantern in the square **ignited** at once, flooding the cobblestones with golden light. Fingers stood frozen in the middle of it all, blinking, a lockpick in one hand and a look of absolute shock on his masked face.\n\nHe was surrounded. Completely, thoroughly surrounded by every animal in Fernwood Hollow.\n\n"Oh," he said, very quietly. "This is... not ideal."\n\nHis tools clattered to the ground. In his backpack, Sergeant Otter found the Moonstone (still glowing) and Raven's stolen indigo scarf (slightly wrinkled).\n\nMayor Badger stepped forward from behind his hilariously thin tree, grinning from ear to ear. "You have been OUTSMARTED, my friend! Out-WITTED! Out-FOXED!" He glanced sideways. "No offense to foxes."\n\nFingers slowly pulled off the scarf mask. He looked at the crowd. He looked at the fake display case. He looked at you and {C}. And then, to everyone's surprise, he started to laugh. A real, genuine, can't-help-it laugh.\n\n"Okay," he said, wiping his eyes. "I have to admit it. That was a REALLY good trap. The fake Sunstone rumor? **Brilliant**. Who thought of that?" You raised your hand. He nodded with something that looked a lot like **respect**. "Well played, detective. Well played."\n\nHe held out his paws, and Sergeant Otter cuffed him with the most **magnificent** flex of his entire career.\n\nThat night, the Moonstone returned to its case and the square blazed with light for the biggest party in Fernwood Hollow's history. Beetle organized fireworks (he went slightly overboard; several ended up in the next county). Mrs. Beaver produced four kinds of pie. And Rabbit told the story so many times that by the eighth version, the trap also involved a catapult.\n\n{C} found you at the edge of the crowd, watching the Moonstone glow. "You know what the best part is? Even the bad guy admitted it was a good plan."\n\nYou grinned. "Not bad for our first week."`,vocab:{ignited:"Burst into light",brilliant:"Extremely clever",respect:"A feeling of admiration",magnificent:"Extremely impressive"},companion:`A trap so good the thief applauded. Beetle's fireworks in the next county. Legendary.`,ending:true,endTitle:"The Master Strategist",endEmoji:"🪤",endMessage:"Your trap became LEGENDARY. Fingers now installs locks and admits yours was the best plan he ever fell for. Beetle's fireworks are still being found in neighboring towns. Every year the town reenacts the Great Moonstone Trap. Mayor Badger still whispers too loud. 🪤🎆🏆"},
};

/* ═══ AI bridge ═══ */
async function aiBridge(txt,act,cn,lv){try{const r=await fetch("/api/bridge",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sceneText:txt,action:act,companionName:cn,level:lv})});if(!r.ok)return null;const d=await r.json();return d.text||null;}catch(e){return null;}}

/* ═══ Text parser (vocab highlights) ═══ */
function PText({text,onVT}){return<>{text.split(/(\*\*[^*]+\*\*)/).map((s,i)=>{const m=s.match(/^\*\*(.+)\*\*$/);return m?<span key={i} onClick={e=>{e.stopPropagation();onVT?.(m[1]);}} style={{color:C.gold,fontWeight:700,cursor:"pointer",borderBottom:`1.5px dashed ${C.goldDim}`,transition:"color 0.2s"}}>{m[1]}</span>:<span key={i}>{s}</span>;})}</>;}

/* ═══ Vocab popup ═══ */
function VPop({word,def,onClose}){if(!word)return null;return<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.5)",padding:20}}><div onClick={e=>e.stopPropagation()} style={{background:C.paper,borderRadius:8,padding:"24px",maxWidth:320,border:`2px solid ${C.goldDim}`,boxShadow:`0 0 30px rgba(212,168,71,0.15)`,animation:"popIn .2s ease"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:6,height:6,borderRadius:3,background:C.gold}}/><h3 style={{margin:0,fontFamily:"'Alegreya',serif",fontSize:"1.3rem",color:C.text,fontStyle:"italic"}}>{word}</h3></div><p style={{margin:0,fontSize:".95rem",lineHeight:1.7,color:C.textMid,fontFamily:"'Alegreya',serif"}}>{def||"Keep reading to discover what this means..."}</p><div style={{marginTop:14,fontSize:".75rem",color:C.goldDim,fontWeight:700,fontFamily:"'Nunito',sans-serif"}}>✦ Added to your journal</div></div></div>;}

/* ═══ Notebook ═══ */
function NB({open,onClose,words}){if(!open)return null;return<div style={{position:"fixed",inset:0,zIndex:150,display:"flex",justifyContent:"flex-end"}}><div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.4)"}}/><div style={{position:"relative",width:"min(340px,86vw)",height:"100%",background:C.paper,display:"flex",flexDirection:"column",animation:"slideIn .3s ease",borderLeft:`3px solid ${C.goldDim}`}}><div style={{padding:"20px",borderBottom:`1px solid ${C.paperEdge}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{margin:0,fontFamily:"'Alegreya',serif",fontSize:"1.1rem",color:C.text,fontStyle:"italic"}}>Words Collected</h2><button onClick={onClose} style={{background:"none",border:"none",fontSize:"1.1rem",cursor:"pointer",color:C.textLight}}>✕</button></div><div style={{flex:1,overflow:"auto",padding:"16px 20px"}}>{words.length===0?<p style={{color:C.textLight,fontFamily:"'Alegreya',serif",fontSize:".95rem",fontStyle:"italic",textAlign:"center",padding:"30px 0"}}>Tap the gold words in the story to collect them here.</p>:words.map((w,i)=><div key={i} style={{padding:"10px 0",borderBottom:`1px solid ${C.paperEdge}`}}><div style={{fontFamily:"'Alegreya',serif",fontWeight:700,fontSize:".95rem",color:C.gold}}>{w.word}</div>{w.def&&<div style={{fontFamily:"'Alegreya',serif",fontSize:".88rem",color:C.textMid,lineHeight:1.5,marginTop:2}}>{w.def}</div>}</div>)}</div></div></div>;}

/* ═══ Audio ═══ */
let aOk=false,sC,sR,sV;async function iA(){if(aOk)return;await Tone.start();sC=new Tone.Synth({oscillator:{type:"triangle"},envelope:{attack:.01,decay:.1,sustain:0,release:.08},volume:-18}).toDestination();sR=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"sine"},envelope:{attack:.04,decay:.3,sustain:.08,release:.4},volume:-16}).toDestination();sV=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"triangle"},envelope:{attack:.04,decay:.25,sustain:.15,release:.7},volume:-14}).toDestination();aOk=true;}

/* ═══ MAIN APP ═══ */
export default function App(){
  const[scr,setScr]=useState("home");
  const[comp,setComp]=useState("fox");
  const[lvl,setLvl]=useState(1);
  const[sOn,setSOn]=useState(true);
  const[sid,setSid]=useState("start");
  const[hist,setHist]=useState([]);
  const[page,setPage]=useState(0);
  const[showCh,setShowCh]=useState(false);
  const[tr,setTr]=useState(false);
  const[cAct,setCAct]=useState("");
  const[bridge,setBridge]=useState(null);
  const[bLoad,setBLoad]=useState(false);
  const[nbO,setNbO]=useState(false);
  const[words,setWords]=useState([]);
  const[nbB,setNbB]=useState(false);
  const[vP,setVP]=useState(null);
  const contentRef=useRef(null);

  const snd=async fn=>{if(!sOn)return;try{await iA();fn();}catch(e){}};
  const pCl=()=>{if(!aOk)return;sC.triggerAttackRelease("G5","16n");};
  const pRv=()=>{if(!aOk)return;const t=Tone.now();sR.triggerAttackRelease("E4","8n",t);sR.triggerAttackRelease("G4","8n",t+.08);sR.triggerAttackRelease("B4","8n",t+.16);};
  const pVi=()=>{if(!aOk)return;const t=Tone.now();["C4","E4","G4","C5","E5"].forEach((n,i)=>sV.triggerAttackRelease(n,"4n",t+i*.12));};

  const cd=COMPANIONS.find(c=>c.id===comp);
  const sc=S[sid];
  const lv=LEVELS[lvl];
  const gt=s=>s?.text?.replace(/\{C\}/g,cd.name)||"";

  // Paginate: split on double newline
  const pages=(gt(sc)||"").split("\n\n").filter(Boolean);
  const totalPages=pages.length;
  const isLastPage=page>=totalPages-1;
  const currentPageText=pages[page]||"";

  useEffect(()=>{try{const v=localStorage.getItem("mt8");if(v){const s=JSON.parse(v);setComp(s.c||"fox");setLvl(s.l??1);}}catch(e){}},[]);
  const save=useCallback((d)=>{try{localStorage.setItem("mt8",JSON.stringify({c:comp,l:lvl,...d}));}catch(e){}},[comp,lvl]);

  const goTo=n=>{snd(pCl);setTr(true);setBridge(null);setTimeout(()=>{setHist(h=>[...h,sid]);setSid(n);setPage(0);setShowCh(false);setTr(false);save({s:n,h:[...hist,sid]});if(contentRef.current)contentRef.current.scrollTop=0;},300);};
  const goBack=()=>{if(!hist.length)return;snd(pCl);setTr(true);setBridge(null);setTimeout(()=>{setSid(hist.at(-1));setHist(h=>h.slice(0,-1));setPage(0);setShowCh(false);setTr(false);},300);};
  const nextPage=()=>{if(!isLastPage){snd(pCl);setPage(p=>p+1);}else{setShowCh(true);if(sc.ending)snd(pVi);else snd(pRv);}};
  const hvt=w=>{const d=sc?.vocab?.[w]||sc?.vocab?.[w.toLowerCase()]||null;setVP({word:w,def:d});setWords(p=>{if(p.find(x=>x.word.toLowerCase()===w.toLowerCase()))return p;return[...p,{word:w,def:d}];});setNbB(true);snd(pCl);};
  const hCA=async()=>{if(!cAct.trim()||!sc)return;setBLoad(true);const r=await aiBridge(gt(sc),cAct.trim(),cd.name,lvl);setBridge(r||`${cd.name} thinks about that. "Interesting idea! Let's stay focused on the clues though."`);setCAct("");setBLoad(false);};
  const start=()=>{snd(pRv);setSid("start");setHist([]);setPage(0);setWords([]);setNbB(false);setBridge(null);setShowCh(false);setScr("play");save({s:"start",h:[]});};

  /* ═══ HOME ═══ */
  if(scr==="home")return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Nunito',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/><style>{CSS}</style>

      <div style={{maxWidth:420,width:"100%"}}>
        {/* Journal cover */}
        <div style={{background:C.paper,borderRadius:4,padding:"40px 32px",position:"relative",boxShadow:`0 4px 24px rgba(0,0,0,.4), inset 0 0 60px rgba(139,115,85,.15)`,border:`2px solid ${C.paperEdge}`,marginBottom:24}}>
          {/* Corner decorations */}
          <div style={{position:"absolute",top:10,left:10,width:20,height:20,borderTop:`2px solid ${C.gold}`,borderLeft:`2px solid ${C.gold}`,opacity:.5}}/><div style={{position:"absolute",top:10,right:10,width:20,height:20,borderTop:`2px solid ${C.gold}`,borderRight:`2px solid ${C.gold}`,opacity:.5}}/><div style={{position:"absolute",bottom:10,left:10,width:20,height:20,borderBottom:`2px solid ${C.gold}`,borderLeft:`2px solid ${C.gold}`,opacity:.5}}/><div style={{position:"absolute",bottom:10,right:10,width:20,height:20,borderBottom:`2px solid ${C.gold}`,borderRight:`2px solid ${C.gold}`,opacity:.5}}/>

          <div style={{textAlign:"center"}}>
            <div style={{fontSize:12,letterSpacing:4,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:16}}>Case File No. 1</div>
            <h1 style={{fontFamily:"'Alegreya',serif",fontSize:"clamp(1.6rem,5vw,2.2rem)",color:C.text,margin:"0 0 4px",lineHeight:1.2,fontWeight:700}}>The Missing Moonstone</h1>
            <div style={{width:60,height:2,background:C.gold,margin:"12px auto",borderRadius:1}}/>
            <p style={{fontFamily:"'Alegreya',serif",color:C.textMid,fontSize:".95rem",fontStyle:"italic",margin:0}}>A Mystery in Fernwood Hollow</p>
          </div>
        </div>

        {/* Companion picker */}
        <div style={{marginBottom:16}}>
          <div style={{fontSize:".7rem",letterSpacing:3,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:8}}>Your Partner</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {COMPANIONS.map(c=>(
              <button key={c.id} onClick={()=>{setComp(c.id);snd(pCl);}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:8,cursor:"pointer",border:comp===c.id?`2px solid ${C.gold}`:`2px solid ${C.bgLight}`,background:comp===c.id?C.bgLight:C.bgMid,transition:"all .2s",textAlign:"left"}}>
                <span style={{fontSize:24}}>{c.emoji}</span>
                <div><div style={{fontWeight:800,fontSize:".85rem",color:comp===c.id?C.goldBright:C.white}}>{c.name}</div><div style={{fontSize:".65rem",color:C.goldDim,lineHeight:1.3}}>{c.desc}</div></div>
              </button>
            ))}
          </div>
        </div>

        {/* Level + Sound */}
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          <div style={{flex:1}}>
            <div style={{fontSize:".7rem",letterSpacing:3,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:8}}>Level</div>
            <div style={{display:"flex",gap:4}}>{LEVELS.map((l,i)=>(
              <button key={i} onClick={()=>{setLvl(i);snd(pCl);}} style={{flex:1,padding:"8px",borderRadius:6,border:"none",cursor:"pointer",background:lvl===i?C.gold:C.bgLight,color:lvl===i?C.bg:C.goldDim,fontWeight:800,fontSize:".75rem",transition:"all .2s",fontFamily:"'Nunito',sans-serif"}}>{l.label}</button>
            ))}</div>
          </div>
          <div>
            <div style={{fontSize:".7rem",letterSpacing:3,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:8}}>Sound</div>
            <button onClick={()=>setSOn(!sOn)} style={{padding:"8px 16px",borderRadius:6,border:"none",cursor:"pointer",background:sOn?C.teal:C.bgLight,color:sOn?"#fff":C.goldDim,fontWeight:800,fontSize:".75rem",fontFamily:"'Nunito',sans-serif"}}>{sOn?"On":"Off"}</button>
          </div>
        </div>

        {/* Start */}
        <button onClick={start} style={{width:"100%",padding:"16px",borderRadius:8,border:`2px solid ${C.gold}`,background:"transparent",cursor:"pointer",color:C.goldBright,fontWeight:800,fontSize:"1rem",letterSpacing:2,fontFamily:"'Nunito',sans-serif",transition:"all .2s",textTransform:"uppercase"}}>Open the Case</button>
      </div>
    </div>
  );

  /* ═══ PLAY ═══ */
  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Nunito',sans-serif",display:"flex",flexDirection:"column"}}>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/><style>{CSS}</style>
      <VPop word={vP?.word} def={vP?.def} onClose={()=>setVP(null)}/>
      <NB open={nbO} onClose={()=>{setNbO(false);setNbB(false);}} words={words}/>

      {/* Top bar */}
      <div style={{padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <button onClick={()=>setScr("home")} style={tBtn}>←</button>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:14}}>{cd.emoji}</span>
          <span style={{fontSize:".75rem",color:C.goldDim,fontWeight:700}}>{cd.name}</span>
        </div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>setSOn(!sOn)} style={tBtn}>{sOn?"♪":"♪̶"}</button>
          <button onClick={()=>{setNbO(true);setNbB(false);}} style={{...tBtn,position:"relative"}}>📖{nbB&&<span style={{position:"absolute",top:-2,right:-2,width:8,height:8,borderRadius:4,background:C.red}}/>}</button>
        </div>
      </div>

      {/* Journal page */}
      <div style={{flex:1,display:"flex",flexDirection:"column",padding:"0 16px 20px",maxWidth:600,width:"100%",margin:"0 auto"}} ref={contentRef}>
        <div style={{opacity:tr?0:1,transform:tr?"translateY(10px)":"none",transition:"all .3s ease",flex:1,display:"flex",flexDirection:"column"}}>

          {/* The page */}
          <div style={{flex:1,background:C.paper,borderRadius:4,position:"relative",display:"flex",flexDirection:"column",boxShadow:`0 2px 16px rgba(0,0,0,.3), inset 0 0 40px rgba(139,115,85,.1)`,border:`1px solid ${C.paperEdge}`,overflow:"hidden"}}>

            {/* Paper texture overlay */}
            <div style={{position:"absolute",inset:0,opacity:.03,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,pointerEvents:"none"}}/>

            {/* Page number */}
            <div style={{padding:"12px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:1}}>
              <span style={{fontSize:".65rem",color:C.textLight,fontFamily:"'Alegreya',serif",fontStyle:"italic"}}>{sc.ending?"Final Page":`Page ${page+1} of ${totalPages}`}</span>
              <span style={{fontSize:".65rem",color:C.textLight,fontFamily:"'Alegreya',serif",fontStyle:"italic"}}>{hist.length>0?`Clue ${hist.length+1}`:""}</span>
            </div>

            {/* Text content */}
            <div style={{flex:1,padding:"12px 24px 16px",position:"relative",zIndex:1,overflow:"auto"}}>
              <div style={{fontFamily:"'Alegreya',serif",fontSize:lv.fs,lineHeight:lv.lh,color:C.text}} key={`${sid}-${page}`}>
                <PText text={currentPageText} onVT={hvt}/>
              </div>
            </div>

            {/* Page turn / Continue button */}
            {!showCh&&<div style={{padding:"8px 20px 16px",position:"relative",zIndex:1,textAlign:"right"}}>
              <button onClick={nextPage} style={{background:"none",border:"none",cursor:"pointer",color:C.gold,fontFamily:"'Alegreya',serif",fontSize:".9rem",fontWeight:700,fontStyle:"italic",padding:"8px 0",transition:"opacity .2s"}}>
                {isLastPage?"Continue →":"Turn page →"}
              </button>
            </div>}
          </div>

          {/* Below the journal page */}
          {showCh&&<div style={{marginTop:12}}>

            {/* Companion note */}
            {sc.companion&&<div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10,animation:"fadeUp .3s ease"}}>
              <span style={{fontSize:20,flexShrink:0,marginTop:2}}>{cd.emoji}</span>
              <p style={{margin:0,fontSize:".85rem",lineHeight:1.6,color:C.goldDim,fontStyle:"italic",fontFamily:"'Alegreya',serif"}}>"{sc.companion.replace(/\{C\}/g,cd.name)}"</p>
            </div>}

            {/* Comprehension question */}
            {sc.question&&<div style={{padding:"10px 14px",marginBottom:10,borderLeft:`3px solid ${C.gold}`,animation:"fadeUp .3s ease"}}><p style={{margin:0,fontSize:".82rem",color:C.goldBright,fontWeight:700,lineHeight:1.5,fontFamily:"'Alegreya',serif",fontStyle:"italic"}}>🤔 {sc.question}</p></div>}

            {/* AI bridge */}
            {bridge&&<div style={{padding:"10px 14px",marginBottom:10,borderLeft:`3px solid ${C.teal}`,animation:"fadeUp .3s ease"}}><p style={{margin:0,fontSize:".85rem",color:C.goldDim,fontStyle:"italic",lineHeight:1.6,fontFamily:"'Alegreya',serif"}}>{bridge}</p></div>}

            {/* Choices or ending */}
            {sc.ending?(
              <div style={{animation:"fadeUp .3s ease"}}>
                <div style={{textAlign:"center",padding:"16px",background:C.bgLight,borderRadius:8,marginBottom:12,border:`1px solid ${C.gold}22`}}>
                  <div style={{fontSize:36,marginBottom:8}}>{sc.endEmoji}</div>
                  <h2 style={{margin:"0 0 6px",fontFamily:"'Alegreya',serif",fontSize:"1.2rem",color:C.goldBright}}>{sc.endTitle}</h2>
                  <p style={{margin:0,color:C.goldDim,fontSize:".88rem",lineHeight:1.6}}>{sc.endMessage}</p>
                </div>
                {words.length>0&&<button onClick={()=>setNbO(true)} style={{...cBtn,width:"100%",justifyContent:"center",marginBottom:8,borderColor:C.gold,color:C.goldBright}}>📖 Review {words.length} collected word{words.length>1?"s":""}</button>}
                <div style={{display:"flex",gap:8}}>
                  <button onClick={start} style={{...cBtn,flex:1,justifyContent:"center",background:C.gold,color:C.bg,borderColor:C.gold}}>Play Again</button>
                  <button onClick={()=>setScr("home")} style={{...cBtn,flex:1,justifyContent:"center"}}>Home</button>
                </div>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:8,animation:"fadeUp .3s ease"}}>
                {(sc.choices||[]).map((c,i)=>(
                  <button key={i} onClick={()=>goTo(c.next)} style={cBtn}>
                    <span style={{fontSize:16,flexShrink:0}}>{c.icon}</span>
                    <span>{c.text}</span>
                  </button>
                ))}
                {hist.length>0&&<button onClick={goBack} style={{...cBtn,opacity:.5,fontSize:".82rem"}}>⬅️ Go back</button>}
                <div style={{display:"flex",gap:6,marginTop:4}}>
                  <input value={cAct} onChange={e=>setCAct(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")hCA();}} placeholder="Type your own idea..." disabled={bLoad} style={{flex:1,padding:"10px 14px",borderRadius:8,fontSize:".85rem",fontFamily:"'Alegreya',serif",border:`1px solid ${C.bgLight}`,background:C.bgMid,color:C.white,outline:"none",fontStyle:"italic"}}/>
                  <button onClick={hCA} disabled={bLoad||!cAct.trim()} style={{...tBtn,padding:"10px 14px",opacity:cAct.trim()?1:.3,fontSize:"1rem"}}>➤</button>
                </div>
                {bLoad&&<p style={{color:C.goldDim,textAlign:"center",fontSize:".78rem",margin:0,fontStyle:"italic"}}>{cd.name} is thinking...</p>}
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
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes popIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
button:hover{opacity:.85}
button:active{transform:scale(.98)!important}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{margin:0}
input:focus{border-color:${C.gold}!important}
input::placeholder{color:${C.goldDim}55}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-thumb{background:${C.paperEdge};border-radius:2px}
`;
