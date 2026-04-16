import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";

/* ═══════════════════════════════════════════════════
   MYSTERY TRAIL — Polished Kids App Edition
   Design: Duolingo warmth + Headspace calm
   Bright, rounded, generous whitespace, real product
   ═══════════════════════════════════════════════════ */

/* ═══ PALETTE ═══ */
const C = {
  bg: "#FFF8F0",       // warm cream
  bgSoft: "#FFF1E6",   // slightly deeper cream
  card: "#FFFFFF",
  text: "#2D3436",     // near-black, warm
  textMid: "#636E72",
  textLight: "#B2BEC3",
  green: "#00B894",     // primary action
  greenSoft: "#DFFFF7",
  greenDark: "#00997A",
  coral: "#FF7675",
  coralSoft: "#FFE0DF",
  yellow: "#FDCB6E",
  yellowSoft: "#FFF4D2",
  violet: "#A29BFE",
  violetSoft: "#EDE9FF",
  blue: "#74B9FF",
  blueSoft: "#E3F2FD",
  shadow: "0 2px 12px rgba(0,0,0,0.06)",
  shadowMd: "0 4px 20px rgba(0,0,0,0.08)",
  shadowLg: "0 8px 32px rgba(0,0,0,0.1)",
};

const LEVELS = [
  { label:"Beginner", fs:"1.2rem", lh:2.05 },
  { label:"Growing", fs:"1.08rem", lh:1.85 },
  { label:"Explorer", fs:"0.98rem", lh:1.75 },
];

const COMPANIONS = [
  { id:"fox",name:"Sage",emoji:"🦊",color:"#FF8C42",bg:"#FFF0E0",desc:"Clever fox with a nose for clues" },
  { id:"owl",name:"Luna",emoji:"🦉",color:"#7C6BEE",bg:"#EDE9FF",desc:"Wise owl who sees everything" },
  { id:"cat",name:"Shadow",emoji:"🐈‍⬛",color:"#00B894",bg:"#DFFFF7",desc:"Sleek cat who sneaks anywhere" },
  { id:"dog",name:"Scout",emoji:"🐕",color:"#FF7675",bg:"#FFE0DF",desc:"Loyal hound with the best ears" },
];

const MOOD_COLORS = {
  village: C.yellow, forest: C.green, river: C.blue,
  indoor: "#DFB88C", cave: C.violet, celeb: C.yellow, market: "#FF8C42",
};

/* ═══ STORY DATA ═══ */
const S = {
start:{mood:"village",text:`You and {C} had only been in Fernwood Hollow for one day when everything went sideways.\n\nYou were exploring the town square, admiring the little shops and the big oak tree in the center, when Mayor Badger came **barreling** out of the Oyster Shell Museum like his tail was on fire. "ATTENTION, CITIZENS!" he shouted, waving his arms so hard his monocle flew off and landed in Mrs. Chipmunk's lemonade. "We have been BURGLED! BURGLARIZED! BURGLAR-ATED!"\n\nHe fished out his monocle, put it on upside down, and kept going. "The Moonstone has been STOLEN from its display case!"\n\nThe crowd gasped. You'd heard about the Moonstone, a gem that glowed like a captured piece of the moon. Every night it lit up the whole town square so everyone could have picnics and play games after dark. Without it, Fernwood Hollow would go **pitch-dark** at sunset.\n\n{C} tugged your sleeve. "We should check this out." You pushed through the crowd to the display case. The glass lid was open. Inside, the velvet cushion held two clues: a muddy **pawprint** pressed deep into the fabric, and a torn scrap of bright blue cloth caught on the latch.\n\nMayor Badger appeared behind you, blowing his nose into an enormous handkerchief. "Will SOMEONE please **invistigate**? Er, investigate? My nerves are absolutely SPLATTERED."`,vocab:{barreling:"Running fast and out of control","pitch-dark":"So dark you can't see anything",pawprint:"A mark left by an animal's foot",invistigate:"Mayor Badger's way of saying 'investigate' (he gets words wrong!)"},companion:`Two clues already. A pawprint and a piece of cloth. Not bad for our first day in town, huh?`,question:null,choices:[{text:"🔍 Examine the pawprint up close",next:"pawprint"},{text:"🧵 Take the cloth to the tailor",next:"cloth"},{text:"🔑 Ask Mayor Badger who had keys",next:"keys"}]},
pawprint:{mood:"village",text:`You crouched beside the case and studied the pawprint. Four toes, each with a small curved claw mark, sunk deep into the velvet like the thief had been carrying something heavy. {C} leaned in close and took a long, careful sniff.\n\n"That's not garden dirt," {C} said, eyes narrowing. "It's river clay. The red, **sticky** kind that only comes from down by Willow Creek bridge. I'd know that smell anywhere."\n\nOld Mr. Turtle, who had been watching from behind his **spectacles**, nodded so slowly you could have made a sandwich while waiting. "Correct. That particular clay **stains** everything it touches. Whoever left this print walked through the shallows before coming here."\n\nA little mouse in the crowd raised his hand. "Maybe the Moonstone just got bored and walked away on its own!"\n\nEveryone turned to stare at him.\n\n"What?" he said **defensively**. "Stranger things have happened."\n\n{C} was already moving toward the square's south exit. "If the thief came from Willow Creek, there'll be more prints. That clay doesn't wash off easy."`,vocab:{sticky:"Stays on things and is hard to remove",spectacles:"Glasses for seeing better",stains:"Leaves a mark that's hard to clean",defensively:"In a way that shows you think people are judging you"},companion:`River mud. That means our thief came from the south side of town. Not many animals live down that way.`,question:`The thief was carrying something heavy enough to press deep into velvet. What does that tell us about how they planned this?`,choices:[{text:"🌉 Follow the trail to Willow Creek bridge",next:"bridge"},{text:"🏘️ Find out who lives near the river",next:"riverfolk"}]},
cloth:{mood:"market",text:`You took the scrap of blue cloth to Rabbit the Tailor's shop in the market. Rabbit was a fluffy gray bunny with seven pins stuck in her apron, a tape measure draped around her neck, and the **uncanny** ability to talk faster than most animals could think.\n\n"Oh my GOODNESS!" She snatched the fabric from your hand and held it up to the window light, squinting at it from three different angles. "I KNOW this cloth! I made a scarf from this exact bolt of **indigo** silk just last week!" She was already flipping through her enormous order book, licking her thumb between pages. "Now, I'm not one to gossip, BUT..."\n\nShe lowered her voice to a whisper so loud it was basically just talking. "This was a **custom** order from Raven. You know Raven? The collector who lives in that enormous pine tree on Ridgeline Road? House full of **antiques** and crystals and rare feathers? Not that I'm SAYING she stole the Moonstone, but she does love shiny things, and the Moonstone is VERY shiny, and she once told me, right here in this shop, that the Moonstone **deserved** to be in a REAL collection and not just sitting in a public museum where..."\n\nShe caught herself mid-sentence and straightened up. "But I'm not one to gossip."\n\n{C} looked at you with raised eyebrows.`,vocab:{uncanny:"Strange or remarkable in a way that's hard to explain",indigo:"A deep blue-purple color",custom:"Made specially for one person",antiques:"Very old and valuable objects",deserved:"Earned, should have"},companion:`Rabbit says the cloth belongs to Raven. But Rabbit also says a LOT of things. Should we hear Raven's side of this?`,question:null,choices:[{text:"🌲 Go visit Raven in the tall pine tree",next:"raven"},{text:"🗣️ Ask other animals about Raven first",next:"ask_raven"}]},
keys:{mood:"indoor",text:`Mayor Badger led you into his office, a cluttered room that smelled like old paper and peppermint tea. He sank into his enormous leather chair and pulled out a **monogrammed** handkerchief.\n\n"Only three animals have keys to that case," he said, holding up three pudgy fingers. "Myself, Sergeant Otter the night guard, and Mole the cleaner. All **trustworthy** citizens. Well, Mole once ate an entire cake meant for the town picnic, but that's a separate issue."\n\nHe held up his key ring with a **flourish**. "And MY key never leaves my side! Safe as houses!"\n\nBut when you leaned in to look, something caught your eye. Fresh scratches on the brass ring, fine and **deliberate**, like someone had pried it open recently. And there, in the grooves of the key itself, you spotted a tiny smear of gray, waxy stuff.\n\n"Mayor Badger," you said carefully, "has anyone else handled your keys?"\n\nHis magnificent mustache trembled. The monocle slipped. "Well, I do occasionally leave them on my desk. When I take my afternoon nap. Which is... most afternoons." He tugged his collar. "But nobody would DARE tamper with the mayor's personal property! This is an outrage of the highest **magnitude**!"`,vocab:{monogrammed:"Having someone's initials sewn or printed on it",trustworthy:"Can be trusted, reliable",flourish:"A big, dramatic movement to show something off",deliberate:"Done carefully and on purpose",magnitude:"How big or important something is"},companion:`Fresh scratches and gray wax on a key ring. Someone made a copy of that key. And Mayor Badger sleeps every afternoon with the keys on his desk. Convenient.`,question:`If someone copied the key while the mayor napped, they'd need access to his office. Who could get in without raising suspicion?`,choices:[{text:"🦦 Talk to Sergeant Otter, the night guard",next:"otter"},{text:"🔎 Figure out where the gray wax came from",next:"key_scratch"}]},
bridge:{mood:"river",text:`The trail of red clay led you and {C} through a stretch of birch trees and down a slippery bank to Willow Creek bridge. The old wooden bridge groaned and **creaked** under your feet like it was complaining about having visitors.\n\n"More prints!" {C} pointed at the planks. The same four-toed tracks, **crusted** with red mud, led off the far side of the bridge and down to the waterline, where a huge hollow log lay wedged between the roots of an ancient willow tree.\n\nYou got on your hands and knees and crawled inside. It was dark, damp, and smelled like wet bark and something metallic. But someone had been here recently. A small brass lantern sat in the corner, and when you touched the glass, it was still warm. A half-eaten walnut sat next to it.\n\n"Over here!" {C} was digging at something stuck in a crack in the bark. Out came a tiny brass gear, no bigger than a shirt button, with perfect little teeth around its edge. It caught the light and gleamed.\n\n"This isn't just any gear," {C} said, holding it up and squinting. "This is **precision** work. Handmade. Somebody brought serious **equipment** down here and lost a piece of it."`,vocab:{creaked:"Made a squeaky, stretchy sound",crusted:"Covered with a hard, dried layer",precision:"Made very exactly and carefully",equipment:"Tools and machines used for a job"},companion:`A warm lantern and a lost gear. Our thief was here recently, working on something mechanical. This was no quick grab. This was planned.`,question:null,choices:[{text:"🐾 Follow the prints past the log",next:"den"},{text:"⚙️ Take the gear to the clockmaker in town",next:"clockmaker"}]},
riverfolk:{mood:"river",text:`Three families lived along Willow Creek: the Otters, the Beavers, and a **newcomer**.\n\nThe Beaver family was DELIGHTED to have visitors. Mrs. Beaver pulled you inside before you could finish your first question, sat you down at her kitchen table, and pushed a plate of acorn cookies toward you so fast they nearly slid off the edge.\n\n"Oh, we heard EVERYTHING last night," she said, leaning forward with the **intensity** of someone who had been waiting all day to tell this story. "First there was splashing. LOUD splashing, around midnight. Then this weird clicking sound, like tiny metal parts going tick-tick-tick. My Harold wanted to investigate, but I said, 'Harold Beaver, you are NOT going out there at midnight in your **pajamas**!' And that was that."\n\nMr. Beaver, a large brown beaver in a plaid vest, nodded **mournfully** from his armchair.\n\n"There's also a new neighbor," Mrs. Beaver continued, dropping her voice. "A raccoon. Calls himself Fingers. Moved in about a month ago. Keeps to himself. Always **tinkering** with things in his little den down by the water. Comes and goes at odd hours." She paused. "Not that I'm watching. I just... notice things."`,vocab:{newcomer:"Someone who has recently arrived",intensity:"Deep, focused energy",pajamas:"Clothes you wear to bed",mournfully:"In a sad, gloomy way",tinkering:"Working on something in a casual, experimental way"},companion:`Midnight splashing, metallic clicking, and a mysterious new raccoon who tinkers with things. That's a LOT of suspicious activity for one quiet creek.`,question:`Mrs. Beaver heard clicking like tiny metal parts. What kind of tools make that sound?`,choices:[{text:"🦝 Pay a visit to this Fingers character",next:"den"},{text:"🌉 Search the riverbank for clues first",next:"bridge"}]},
raven:{mood:"indoor",text:`Raven's home sat at the very top of the tallest pine tree on Ridgeline Road, and stepping inside was like entering a museum run by someone with **magnificent** taste and zero interest in empty wall space.\n\nEvery surface held something beautiful: oil paintings in gold frames, shelves of **gleaming** crystals arranged by color, glass cases protecting rare feathers and ancient coins. The place even smelled expensive.\n\nRaven herself was a large, sleek black bird with an enormous vocabulary and a flair for drama that could put a soap opera to shame.\n\nWhen you held up the blue cloth, she gasped so hard she nearly fell off her perch. "My SCARF!" She pressed one wing to her chest. "My beautiful, one-of-a-kind indigo silk scarf! But that's IMPOSSIBLE! It was STOLEN from this very room two days ago!"\n\nShe swept across the room and pointed at her window. A perfect circle, smooth as a dinner plate, had been cut right through the glass. Not cracked. Not smashed. CUT, by someone with a **specialized** tool and a very steady hand.\n\n"Do you SEE?" Raven said, turning back to you with eyes blazing. "Someone broke in, stole my scarf, and used it to frame me for the Moonstone theft! This is a FRAME JOB! A **conspiracy** against the most refined bird in Fernwood Hollow!" She placed the back of her wing against her forehead. "I may need to sit down."`,vocab:{magnificent:"Extremely beautiful and impressive",gleaming:"Shining brightly",specialized:"Designed for one particular job",conspiracy:"A secret plan to do something harmful"},companion:`That window was cut with a professional tool, not smashed by an amateur. And if her scarf really was stolen BEFORE the Moonstone heist, someone planned this carefully.`,question:`Raven says she's being framed. If that's true, someone stole her scarf JUST to leave it at the crime scene. What kind of thief plans that far ahead?`,choices:[{text:"🪟 Examine the cut window more closely",next:"window_clue"},{text:"🤔 Ask Raven who would want to frame her",next:"frame"}]},
ask_raven:{mood:"market",text:`Before heading to Raven's tree, you decided to gather some **intelligence** at the market. The animals of Fernwood Hollow, it turned out, had VERY strong opinions.\n\n"Raven is obviously guilty," declared Mouse, standing on an apple crate to make himself taller. "She LOVES gems. She practically **drools** over them. The Moonstone would be the crown jewel of her collection!"\n\nBut Squirrel dropped from a nearby branch and landed between you. "That's **ridiculous**, Mouse. Raven already owns crystals worth ten times the Moonstone. Why would she risk everything to steal something worth less than what's already in her living room?"\n\nMouse opened his mouth, closed it, and climbed down from his crate.\n\nThen Chipmunk appeared at your elbow. He was small, **jittery**, and had the look of someone carrying a secret that was physically too heavy for him. "Forget Raven," he whispered. "There's a new animal in town. A raccoon. Showed up about a month ago. He's been going around asking WEIRD questions. Like what time the guard changes shifts. What kind of lock is on the Moonstone case. How thick the glass is." He looked over both shoulders. "That's not normal **curiosity**."`,vocab:{intelligence:"Information gathered to solve a problem",drools:"Gets so excited you can barely control yourself",ridiculous:"So silly it doesn't make sense",jittery:"Nervous and jumpy",curiosity:"Wanting to know about something"},companion:`Two leads in different directions. Raven has the motive, but this mystery raccoon has been doing homework on the Moonstone's security. That's not casual interest.`,question:null,choices:[{text:"🦝 Find this raccoon. Now.",next:"den"},{text:"🪶 Let's hear Raven's side of the story",next:"raven"}]},
otter:{mood:"river",text:`Sergeant Otter was at his guard post by the river, doing one-armed push-ups when you arrived, which he was clearly doing for your benefit.\n\n"WELCOME!" He sprang to his feet and **saluted** so hard he almost smacked himself. "Sergeant Otter, Head of Moonstone Security! I was on duty ALL night! Nobody gets past THESE!" He flexed both arms and kissed each bicep individually. {C} looked away to keep from laughing.\n\nBut when you pressed for details, the flexing stopped. His broad shoulders **slumped**.\n\n"Okay. Fine," he muttered, studying his feet. "I MIGHT have... fallen asleep. For about an hour. Around midnight." He tugged his collar. "And here's the weird part. When I woke up, my key was in my LEFT pocket. But I ALWAYS keep it in my right pocket. Always. I'm very **particular** about my pocket system."\n\nHe looked at you with big, worried eyes. "Someone took that key while I was sleeping, didn't they? Someone **borrowed** it and put it back." His lower lip trembled. Then he flexed again, but it was the saddest flex you'd ever seen. "I bench-press river rocks, you know. This shouldn't have happened to someone who bench-presses river rocks."`,vocab:{saluted:"Made a formal military greeting",slumped:"Drooped downward in a sad or tired way",particular:"Very careful about exactly how things should be",borrowed:"Took something planning to return it"},companion:`Someone moved his key while he slept. The question is, did he just fall asleep on his own, or did someone MAKE him fall asleep?`,question:null,choices:[{text:"🍵 Ask what could have made him so sleepy",next:"sleepy"},{text:"👣 Check for footprints around the guard post",next:"bridge"}]},
key_scratch:{mood:"indoor",text:`You carefully scraped the gray **residue** from the key and brought it to Hedgehog's Candle and Wax Shop, a store so small you had to duck through the door.\n\nHedgehog herself was tiny, even by hedgehog standards, and wore glasses so enormous they made her eyes look like dinner plates. She took the wax sample, held it under a magnifying lamp, and gasped.\n\n"Casting wax!" she squeaked. "Gray, Grade-A casting wax! You know what this is for? You press a key into it to make a perfect **impression**. Then you pour metal into the mold and BOOM, duplicate key." She was already flipping through her sales ledger. "Here it is! Sold one block of gray casting wax last Tuesday. To a raccoon. Never seen him before. He was **fidgety**, paid in exact change, and scurried out of here like his tail was on fire."\n\nShe looked up at you over those giant glasses. "I thought it was weird at the time, but you know. Wax is wax. A girl's gotta make a living."`,vocab:{residue:"A tiny amount of something left behind",impression:"A mark made by pressing into something soft",fidgety:"Nervous and unable to keep still"},companion:`Gray wax, a mystery raccoon, and now we know someone made a copy of the key. Every lead keeps pointing toward the river.`,question:null,choices:[{text:"🦝 Find this raccoon",next:"den"},{text:"🪤 Set a trap using a fake gem",next:"trap"}]},
clockmaker:{mood:"indoor",text:`Beetle's Clockwork Shop was a **wonderland** of ticking. Clocks covered every wall, filled every shelf, and hung from the ceiling on chains. Somewhere in the middle of it all, Beetle himself sat on a high stool, a beetle so small he needed a step ladder to reach his own workbench, wearing magnifying goggles so powerful his eyes looked like two shiny hubcaps.\n\nThe moment you produced the gear, something extraordinary happened. Beetle stopped mid-sentence. His antennae stood straight up. His goggles fogged over.\n\n"Is... is that..." He leaped off his stool, scuttled across the workbench at **alarming** speed, and plucked the gear from your fingers like it was made of diamonds. "A GRADE-SEVEN DOUBLE-CUT BRASS GEAR WITH BEVELED TEETH?!"\n\nHe held it up to his desk lamp, rotating it with the **tenderness** of someone holding a baby bird. For a solid thirty seconds, he forgot you existed. {C} cleared their throat. Twice.\n\n"Oh! Right. The crime. Yes." Beetle set down the gear with visible **reluctance**. "This component is from a portable lock-picking device. Very advanced, very expensive, very illegal." He tapped his chin. "A raccoon visited my shop last month. Asked extremely specific questions about lock mechanisms. Said he was 'writing a book.'" Beetle looked at you over his enormous goggles. "Nobody who asks that many questions about the inside of locks is writing a book."`,vocab:{wonderland:"A place full of amazing things",alarming:"Surprisingly fast in a worrying way",tenderness:"Gentle, careful kindness",reluctance:"Not wanting to do something"},companion:`Beetle confirmed it. That gear is from a lockpick built by someone who knows what they're doing. And a mystery raccoon has been studying locks.`,question:null,choices:[{text:"🦝 Find this raccoon NOW",next:"den"},{text:"🪤 Ask Beetle to help set a trap",next:"trap"}]},
window_clue:{mood:"indoor",text:`You examined the hole in Raven's window with {C}. The cut was a perfect circle, smooth as a plate, with no cracks or rough edges. This wasn't done with a rock or an elbow. Somebody used a diamond-tipped glass cutter, the kind that costs more than most animals earn in a month.\n\nBut the real evidence was outside. On the windowsill, you found a smudge of red river clay, the exact same **distinctive** mud from the Moonstone crime scene. And on the pine branch just below the window, pressed clearly into the sticky sap: small, five-fingered pawprints. **Unmistakably** raccoon.\n\n{C} looked at you, eyes bright. "Same mud. Same precision tools. Same careful planning. This isn't two crimes, it's one crime with two **stages**. Our thief robbed Raven FIRST to get the scarf, then used it to frame her while stealing the Moonstone."\n\nRaven, who had been watching from her fainting couch, sat bolt upright. "I TOLD you! I'm being **persecuted**!"`,vocab:{distinctive:"Easy to recognize because it is unique",unmistakably:"In a way that cannot be confused",stages:"Steps in a plan",persecuted:"Treated unfairly on purpose"},companion:`Every clue points the same direction: the river. A raccoon with professional tools, river mud on his feet, and a plan complicated enough to frame an innocent bird.`,question:null,choices:[{text:"🐾 Follow the raccoon tracks toward the river",next:"den"},{text:"📋 Bring all this evidence to Mayor Badger",next:"ending_smart"}]},
frame:{mood:"indoor",text:`Raven paced her perch like a detective in a crime movie, one wing behind her back. "Who would TARGET me? Who would have the **audacity**?"\n\nSuddenly she stopped dead. Her eyes went wide. "FINGERS."\n\n"Who?" you and {C} said together.\n\n"A raccoon! Three weeks ago, we were both bidding on a rare quartz crystal at the Bramblewood Auction. **Magnificent** piece, pink with gold veins. The bidding went back and forth, back and forth. I won." She smiled briefly at the memory, then the smile vanished. "He was LIVID. His paws were shaking. He pointed right at me and said, 'You'll **regret** this, Raven. Mark my words.'"\n\nShe turned to you. "I thought he was just a sore loser. But what if this is his revenge? Steal the Moonstone, frame ME for it using my own scarf, and sit back while I take the **blame**?"`,vocab:{audacity:"Bold, shocking rudeness or nerve",magnificent:"Extremely beautiful and impressive",regret:"To feel sorry about something",blame:"Being held responsible for something bad"},companion:`Revenge plus profit. If Raven is right, this raccoon planned the whole thing: steal her scarf, steal the Moonstone, and frame her for both.`,question:null,choices:[{text:"🦝 Go find this Fingers character",next:"den"},{text:"🪤 Set a trap he can't resist",next:"trap"}]},
sleepy:{mood:"river",text:`Something flickered behind Otter's eyes. "WAIT. I just remembered." He snapped his fingers. "There was TEA! A cup of chamomile tea sitting on my guard post when I started my shift. Little note that said 'From the Mayor's office.' I thought it was a nice **gesture**."\n\n"Did it taste normal?" you asked.\n\nOtter **winced**. "Now that you mention it... no. It was more bitter than usual. Kind of **metallic**. But it was free tea, and I'm not the type to turn down free tea, so I drank the whole thing." He looked at his feet. "Within twenty minutes, I could barely keep my eyes open. It was like someone pulled a plug in my brain."\n\n{C} was already putting the pieces together. "Someone left **drugged** tea at your post. They knew your shift schedule. They knew you'd drink free tea. This thief has been watching you, Otter. For a while."\n\nOtter's eyes went wide. Then he flexed one arm, but it was more of a nervous habit than a display. "That's... really **creepy**, actually."`,vocab:{gesture:"A kind action to show how you feel",winced:"Made a face showing discomfort",metallic:"Tasting like metal",drugged:"Had something added to make you sleepy",creepy:"Making you feel nervous or scared"},companion:`Drugged tea, a fake note, and someone who's been watching the guard's habits. This thief doesn't leave anything to chance.`,question:`The thief knew Otter would drink the tea. What does that tell you about how long they've been planning this?`,choices:[{text:"🕵️ Head for the river. This ends now.",next:"den"},{text:"🌉 Look for clues along the creek first",next:"bridge"}]},
den:{mood:"cave",text:`The trail of evidence led to a tidy den built into the riverbank, half-hidden behind trailing willow branches. A cheerful wooden sign over the door read "WELCOME, FRIENDS!" in painted cursive. It was the kind of sign that made you want to trust whoever lived here, which, {C} pointed out, was **suspicious** all by itself.\n\n{C} knocked. The door swung open to reveal a raccoon with bright, clever eyes and the kind of wide, warm smile that could sell you a bridge. "Oh! Visitors! How absolutely **delightful**!" He bowed with a little flourish. "I'm Fingers. Please, please, come in. Make yourselves comfortable. Can I offer you acorn tea? Walnut cookies? I just baked them this morning."\n\nThe den looked perfectly **innocent**. Cozy armchairs, shelves of books, a crackling fire, and the smell of fresh baking. Fingers chatted cheerfully about the weather, the lovely river views, and the new bridge the beavers were building.\n\nBut while he was pouring tea with his back turned, {C} slipped behind a heavy curtain at the back of the room. A moment later, {C} caught your eye from behind the fabric. The expression on {C}'s face could only be described as "jackpot."\n\nYou peeked behind the curtain while Fingers stirred sugar into his tea. Your heart nearly stopped.\n\nA complete secret workbench filled the hidden room. Lockpicking tools laid out by size, like surgical instruments. Gray wax molds holding the perfect **impression** of a brass key. And pinned to the wall, a hand-drawn map of the town square with the Moonstone display case circled three times in bright red ink. Someone had written "TARGET" underneath with an arrow.\n\nFingers appeared at the curtain, still holding his teapot. His smile hadn't changed even slightly.\n\n"Oh," he said pleasantly. "You found my hobby room."`,vocab:{suspicious:"Making you think something is wrong",delightful:"Very pleasant and enjoyable",innocent:"Not guilty, not harmful",impression:"A mark made by pressing into something soft"},companion:`Lockpicks. Key molds. A map with the Moonstone circled in red. And this guy just offered us cookies. We've got him.`,question:`We have all the evidence. But Fingers is right here, and he knows we know. Do we handle this ourselves, or get backup?`,choices:[{text:"😤 Confront him right here, right now",next:"confront"},{text:"🏃 Get out quietly and bring Mayor Badger",next:"ending_smart"}]},
trap:{mood:"village",text:`The plan was brilliant, if you said so yourself. With Mayor Badger's help, you spread a rumor through town: a SECOND gem, even more valuable than the Moonstone, called the "Sunstone," would be placed on **temporary** display tonight and tonight only.\n\nOf course, there was no Sunstone. But the thief didn't know that.\n\nAs darkness fell, half of Fernwood Hollow's citizens **concealed** themselves behind barrels, bushes, and market stalls around the town square. Mayor Badger, hidden behind an incredibly thin tree, kept whispering at full volume: "Is he COMING? Can anyone SEE anything?" Mrs. Beaver shushed him so many times she pulled a muscle. Beetle accidentally knocked over a stack of flower pots and had to be sat on by Otter.\n\nThen, at exactly midnight, a shadow **materialized** at the edge of the square. It moved low and fast, hugging the walls. As it stepped into the faint moonlight, you saw him clearly: a raccoon, face covered by a mask made from a very familiar indigo silk scarf, carrying a set of lockpicking tools in both paws.\n\nHe reached the display case. His tools touched the lock.\n\n"NOW!" Mayor Badger bellowed so loudly that several concealed citizens screamed.`,vocab:{temporary:"Only lasting for a short time",concealed:"Hidden from view",materialized:"Appeared suddenly"},companion:`The whole town working together. Mayor Badger whispering like a foghorn. Beetle getting sat on. This might be the greatest trap in Fernwood Hollow history.`,question:null,choices:[{text:"🪤 SPRING THE TRAP!",next:"ending_trap"}]},
confront:{mood:"cave",text:`"We know everything, Fingers," you said, keeping your voice steady. "The wax molds. The lockpicks. The map. You stole Raven's scarf to frame her, drugged Otter's tea, and took the Moonstone."\n\nFor the first time since you'd met him, the raccoon's legendary smile **faltered**. Just for a second, the mask slipped, and you saw something real underneath: a calculating mind that was very quickly running out of options.\n\nHe set down the teapot with deliberate slowness. "Well. That's... **comprehensive**." He glanced at the door. {C} was already standing in front of it, arms crossed.\n\n"I don't suppose we could discuss this over cookies?"\n\n"No," said {C}.\n\nFingers sighed. Then he bolted for the window. What happened next took about three seconds: he leaped, caught his foot on his own lockpicking kit, **pirouetted** into the map wall (which collapsed), and landed face-first in a pile of wax molds with a sad, crunchy SPLAT.\n\n{C} looked down at him. "That went well for you."\n\nFingers rolled over, covered in broken wax, and raised both paws. "Fine. You got me. The Moonstone is under the third flat rock east of the bridge. You can't miss it." He paused. "It's the one that's glowing."`,vocab:{faltered:"Became less strong or sure",comprehensive:"Complete, covering everything",pirouetted:"Spun around like a dancer (but less gracefully)"},companion:`Tripped over his own lockpicks. There's a kind of poetry in that. Come on, let's go get the Moonstone!`,question:null,choices:[{text:"💎 Recover the Moonstone!",next:"ending_hero"}]},
ending_hero:{mood:"celeb",text:`The Moonstone was exactly where Fingers said it would be: nestled under the third flat rock east of the bridge, glowing softly in its little hiding place like a nightlight that missed its home.\n\nYou lifted it carefully with both hands. It was warm, and up close, the glow shifted through colors you didn't have names for.\n\nWhen you carried it back to the town square, the reaction was **pandemonium**. Animals poured from every doorway, cheering, clapping, and in the Beaver family's case, crying. Mayor Badger attempted a speech but was so overwhelmed he kept losing his words even worse than usual. "You have rescued this town from... from OBSCURITY! No, wait. DARKNESS! Both the literal and the... the METAPHORICAL kind!" He blew his nose so loudly a nearby bird startled out of a tree, then placed the Golden Acorn Medal around your neck and {C}'s with shaking paws.\n\nRaven swooped in wearing her finest cape, officially cleared of all suspicion, and shook your hand so many times your arm went numb. "I will compose an OPERA about this investigation!"\n\nBeetle was discovered in the corner, examining Fingers' confiscated lockpick with tears of **admiration** in his enormous goggle-eyes. Sergeant Otter stood at attention nearby, flexing quietly, his honor restored.\n\nAs for Fingers, Mayor Badger sentenced him to six months of community service: going door to door and installing better, stronger locks on everything he'd proved he could pick. The raccoon accepted the **verdict** with a sigh, but as he hoisted his toolbox and headed toward the museum, you caught something: a small, genuine smile. Not the charming, calculated one. A real one.\n\nThat night, the Moonstone was restored to its case, and the town square blazed with light for the biggest celebration Fernwood Hollow had ever seen. There were acorn cakes and Rabbit told the story so many times she lost her voice.\n\n{C} bumped your shoulder as fireflies danced in the warm air above the square. "You know what? Not bad for our first week in town. Not bad at all."`,vocab:{pandemonium:"Wild chaos and noise",admiration:"Feeling impressed and respectful",verdict:"The final decision about someone's consequence"},companion:`The Moonstone is home. The town is glowing. And somewhere out there, a raccoon is installing better locks. Case closed.`,ending:true,endTitle:"The Hero Detective",endEmoji:"🏅",endMessage:"You cracked the case and saved Fernwood Hollow! Fingers now installs the best locks in town. Raven composed a three-hour opera about your adventure (attendance is mandatory). And the Moonstone has never shone brighter. 🌟🏅"},
ending_smart:{mood:"celeb",text:`You made the hardest choice a detective can make: you walked away from the suspect.\n\nYou slipped out with {C} close behind, quiet as shadows, and ran straight to Mayor Badger's office. There, you laid out everything. The river mud. The copied key. The drugged tea. Raven's stolen scarf. The lockpicks, the wax molds, the map with the Moonstone circled in red. Every piece of the puzzle, assembled in **logical** order.\n\nMayor Badger listened with his monocle slowly sliding down his nose. When you finished, he sat in silence for three full seconds, which was a personal record.\n\nThen he stood up. "SERGEANT OTTER! Assemble an official search team!"\n\nOtter was beside himself with **relief**. He practically sprinted to the den, leading a team of guards. They found the Moonstone behind a cleverly constructed false wall, along with detailed plans for robberies in three neighboring towns. Fingers didn't even try to run. He looked at the guards, looked at his exposed workshop, and said, "I'm going to need a bigger teapot."\n\nAt the ceremony that evening, Mayor Badger managed a speech without a single word fumble (a Fernwood Hollow first). "This young detective showed us something **remarkable** today. Being brave doesn't always mean charging in. Sometimes the most **courageous** act is gathering evidence, building a case, and trusting the process. That's not just detective work. That's wisdom."\n\nRaven, officially cleared, gave you a genuine antique magnifying glass from her personal collection. "You have excellent instincts, detective. And even better **judgment**."\n\n{C} watched you turn the magnifying glass over in your hands. "You know what? That looks good on you. Very professional."\n\nThe Moonstone went back to its case, glowing like it had never left. Fingers got six months of lock-installation duty. And Fernwood Hollow slept peacefully that night for the first time in a week.`,vocab:{logical:"In an order that makes sense",relief:"The feeling when something stressful is over",remarkable:"Worth noticing because it is impressive",courageous:"Very brave",judgment:"The ability to make good choices"},companion:`Proof over glory. Evidence over impulse. That's what separates a good detective from a great one. And you are a great one.`,ending:true,endTitle:"The Wise Investigator",endEmoji:"🔍",endMessage:"Your careful detective work saved Fernwood Hollow the right way. Raven's magnifying glass sits on your desk. Fingers now installs the best locks in town. And Mayor Badger tells everyone: 'That kid taught ME something about wisdom.' 📋🔍✨"},
ending_trap:{mood:"celeb",text:`Every lantern in the square **ignited** at once, flooding the cobblestones with golden light. Fingers stood frozen in the middle of it all, blinking, a lockpick in one hand and a look of absolute shock on his masked face.\n\nHe was surrounded. Completely, thoroughly surrounded by every animal in Fernwood Hollow.\n\n"Oh," he said, very quietly. "This is... not ideal."\n\nHis tools clattered to the ground. In his backpack, Sergeant Otter found the Moonstone (still glowing) and Raven's stolen indigo scarf (slightly wrinkled).\n\nMayor Badger stepped forward from behind his hilariously thin tree, grinning from ear to ear. "You have been OUTSMARTED, my friend! Out-WITTED! Out-FOXED!" He glanced sideways. "No offense to foxes."\n\nFingers slowly pulled off the scarf mask. He looked at the crowd. He looked at the fake display case. He looked at you and {C}. And then, to everyone's surprise, he started to laugh. A real, genuine, can't-help-it laugh.\n\n"Okay," he said, wiping his eyes. "I have to admit it. That was a REALLY good trap. The fake Sunstone rumor? **Brilliant**. Who thought of that?" You raised your hand. He nodded with something that looked a lot like **respect**. "Well played, detective. Well played."\n\nHe held out his paws, and Sergeant Otter cuffed him with the most **magnificent** flex of his entire career.\n\nThat night, the Moonstone returned to its case and the square blazed with light for the biggest party in Fernwood Hollow's history. Beetle organized fireworks (he went slightly overboard; several ended up in the next county). Mrs. Beaver produced four kinds of pie. And Rabbit told the story so many times that by the eighth version, the trap also involved a catapult.\n\n{C} found you at the edge of the crowd, watching the Moonstone glow. "You know what the best part is? Even the bad guy admitted it was a good plan."\n\nYou grinned. "Not bad for our first week."`,vocab:{ignited:"Burst into light",brilliant:"Extremely clever",respect:"A feeling of admiration",magnificent:"Extremely impressive"},companion:`A trap so good the thief applauded. Beetle's fireworks in the next county. Mrs. Beaver's four pies. This is what solving a mystery feels like.`,ending:true,endTitle:"The Master Strategist",endEmoji:"🪤",endMessage:"Your trap became LEGENDARY. Fingers now installs locks and grudgingly admits yours was the best plan he ever fell for. Beetle's fireworks are still being found in neighboring towns. And every year, the whole town reenacts the Great Moonstone Trap, with Mayor Badger playing himself. He still whispers too loud. 🪤🎆🏆"},
};

/* ═══ AI bridge ═══ */
async function aiBridge(txt,act,cn,lv){try{const r=await fetch("/api/bridge",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sceneText:txt,action:act,companionName:cn,level:lv})});if(!r.ok)return null;const d=await r.json();return d.text||null;}catch(e){return null;}}

/* ═══ COMPONENTS ═══ */
function TW({text,speed=14,onDone,onVT}){const[p,sP]=useState(0);const d=useRef(false);useEffect(()=>{sP(0);d.current=false;},[text]);useEffect(()=>{if(p<text.length){const t=setTimeout(()=>sP(x=>x+1),speed);return()=>clearTimeout(t);}else if(!d.current){d.current=true;onDone?.();}},[p,text,speed]);return<span onClick={()=>sP(text.length)} style={{cursor:p<text.length?"pointer":"default"}}>{pV(text.slice(0,p),onVT)}{p<text.length&&<span style={{opacity:.3,animation:"blink .8s infinite"}}>|</span>}</span>;}

function pV(t,f){if(!t)return[t];return t.split(/(\*\*[^*]+\*\*)/).map((s,i)=>{const m=s.match(/^\*\*(.+)\*\*$/);return m?<span key={i} onClick={e=>{e.stopPropagation();f?.(m[1]);}} style={{background:C.yellowSoft,borderBottom:`2px solid ${C.yellow}`,padding:"1px 4px",borderRadius:4,cursor:"pointer",fontWeight:700,color:C.text,transition:"background 0.2s"}}>{m[1]}</span>:<span key={i}>{s}</span>;});}

function VPop({word,def,onClose}){if(!word)return null;return<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.3)",padding:20}}><div onClick={e=>e.stopPropagation()} style={{background:C.card,borderRadius:24,padding:"24px 28px",maxWidth:340,boxShadow:C.shadowLg,animation:"popIn .25s ease"}}><div style={{width:48,height:48,borderRadius:16,background:C.yellowSoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:12}}>📖</div><h3 style={{margin:"0 0 8px",fontSize:"1.2rem",color:C.text,fontWeight:800}}>{word}</h3><p style={{margin:0,fontSize:".95rem",lineHeight:1.7,color:C.textMid}}>{def||"Keep reading to discover what this means!"}</p><div style={{marginTop:14,padding:"6px 14px",borderRadius:20,background:C.greenSoft,display:"inline-block",fontSize:".78rem",fontWeight:700,color:C.greenDark}}>✓ Added to Word Collection</div></div></div>;}

function Notebook({open,onClose,words}){if(!open)return null;return<div style={{position:"fixed",inset:0,zIndex:150,display:"flex",justifyContent:"flex-end"}}><div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.25)"}}/><div style={{position:"relative",width:"min(360px,88vw)",height:"100%",background:C.card,boxShadow:"-8px 0 30px rgba(0,0,0,.1)",display:"flex",flexDirection:"column",animation:"slideIn .3s ease"}}><div style={{padding:"20px 22px",borderBottom:`1px solid ${C.bgSoft}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{margin:0,fontSize:"1.1rem",fontWeight:800,color:C.text}}>📖 Word Collection</h2><button onClick={onClose} style={{background:C.bgSoft,border:"none",width:32,height:32,borderRadius:10,cursor:"pointer",fontSize:"1rem",color:C.textMid,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button></div><div style={{flex:1,overflow:"auto",padding:"16px 22px"}}>{words.length===0?<div style={{textAlign:"center",padding:"40px 20px"}}><div style={{fontSize:40,marginBottom:12}}>📚</div><p style={{color:C.textLight,fontSize:".9rem",lineHeight:1.6}}>Tap the highlighted words in the story to collect them here!</p></div>:words.map((w,i)=><div key={i} style={{padding:"14px 16px",marginBottom:10,borderRadius:16,background:C.yellowSoft,transition:"all 0.2s"}}><div style={{fontWeight:800,color:C.text,fontSize:".95rem",marginBottom:4}}>{w.word}</div>{w.def&&<div style={{color:C.textMid,fontSize:".85rem",lineHeight:1.5}}>{w.def}</div>}</div>)}</div></div></div>;}

/* ═══ AUDIO ═══ */
let aOk=false,sC,sR,sV;
async function iA(){if(aOk)return;await Tone.start();sC=new Tone.Synth({oscillator:{type:"triangle"},envelope:{attack:.01,decay:.1,sustain:0,release:.08},volume:-18}).toDestination();sR=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"sine"},envelope:{attack:.04,decay:.3,sustain:.08,release:.4},volume:-16}).toDestination();sV=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"triangle"},envelope:{attack:.04,decay:.25,sustain:.15,release:.7},volume:-14}).toDestination();aOk=true;}

/* ═══ MAIN APP ═══ */
export default function App(){
  const[scr,setScr]=useState("home");
  const[comp,setComp]=useState("fox");
  const[lvl,setLvl]=useState(1);
  const[sndOn,setSndOn]=useState(true);
  const[sid,setSid]=useState("start");
  const[hist,setHist]=useState([]);
  const[showCh,setShowCh]=useState(false);
  const[showCo,setShowCo]=useState(false);
  const[tr,setTr]=useState(false);
  const[cAct,setCAct]=useState("");
  const[bridge,setBridge]=useState(null);
  const[bLoad,setBLoad]=useState(false);
  const[nbO,setNbO]=useState(false);
  const[words,setWords]=useState([]);
  const[nbB,setNbB]=useState(false);
  const[vP,setVP]=useState(null);

  const snd=async fn=>{if(!sndOn)return;try{await iA();fn();}catch(e){}};
  const pCl=()=>{if(!aOk)return;sC.triggerAttackRelease("G5","16n");};
  const pRv=()=>{if(!aOk)return;const t=Tone.now();sR.triggerAttackRelease("E4","8n",t);sR.triggerAttackRelease("G4","8n",t+.08);sR.triggerAttackRelease("B4","8n",t+.16);};
  const pVi=()=>{if(!aOk)return;const t=Tone.now();["C4","E4","G4","C5","E5"].forEach((n,i)=>sV.triggerAttackRelease(n,"4n",t+i*.12));};

  const cd=COMPANIONS.find(c=>c.id===comp);
  const sc=S[sid];
  const lv=LEVELS[lvl];
  const gt=s=>s?.text?.replace(/\{C\}/g,cd.name)||"";
  const sceneCount=Object.keys(S).length;
  const progress=Math.round((hist.length/(sceneCount*0.35))*100);

  useEffect(()=>{try{const v=localStorage.getItem("mt7");if(v){const s=JSON.parse(v);setComp(s.c||"fox");setLvl(s.l??1);}}catch(e){}},[]);
  const save=useCallback((d)=>{try{localStorage.setItem("mt7",JSON.stringify({c:comp,l:lvl,...d}));}catch(e){}},[comp,lvl]);

  const goTo=n=>{snd(pCl);setTr(true);setBridge(null);setTimeout(()=>{setHist(h=>[...h,sid]);setSid(n);setShowCh(false);setShowCo(false);setTr(false);save({s:n,h:[...hist,sid]});},300);};
  const goBack=()=>{if(!hist.length)return;snd(pCl);setTr(true);setBridge(null);setTimeout(()=>{setSid(hist.at(-1));setHist(h=>h.slice(0,-1));setShowCh(false);setShowCo(false);setTr(false);},300);};
  const hvt=w=>{const d=sc?.vocab?.[w]||sc?.vocab?.[w.toLowerCase()]||null;setVP({word:w,def:d});setWords(p=>{if(p.find(x=>x.word.toLowerCase()===w.toLowerCase()))return p;return[...p,{word:w,def:d}];});setNbB(true);snd(pCl);};
  const hCA=async()=>{if(!cAct.trim()||!sc)return;setBLoad(true);const r=await aiBridge(gt(sc),cAct.trim(),cd.name,lvl);setBridge(r||`${cd.name} thinks about that. "Interesting idea! Let's stay focused on the clues though."`);setCAct("");setBLoad(false);};
  const start=()=>{snd(pRv);setSid("start");setHist([]);setWords([]);setNbB(false);setBridge(null);setShowCh(false);setShowCo(false);setScr("play");save({s:"start",h:[]});};

  const moodColor = MOOD_COLORS[sc?.mood] || C.green;

  /* ═══ HOME ═══ */
  if(scr==="home")return(
    <div style={{minHeight:"100vh",background:`linear-gradient(180deg, ${C.greenSoft} 0%, ${C.bg} 40%)`,fontFamily:"'Nunito',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/><style>{CSS}</style>
      <div style={{maxWidth:480,margin:"0 auto",padding:"40px 20px 32px"}}>

        {/* Hero */}
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{width:80,height:80,borderRadius:24,background:C.card,boxShadow:C.shadowMd,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:40,marginBottom:16}}>🔍</div>
          <h1 style={{margin:0,fontSize:"clamp(1.8rem,6vw,2.4rem)",fontWeight:900,color:C.text,lineHeight:1.2}}>Mystery Trail</h1>
          <p style={{margin:"8px 0 0",color:C.textMid,fontSize:"1rem",fontWeight:600}}>The Missing Moonstone</p>
          <p style={{margin:"4px 0 0",color:C.textLight,fontSize:".85rem"}}>A mystery in Fernwood Hollow with 3 endings to discover</p>
        </div>

        {/* Companion picker */}
        <div style={{background:C.card,borderRadius:24,padding:"20px",boxShadow:C.shadow,marginBottom:16}}>
          <h2 style={{margin:"0 0 12px",fontSize:".9rem",fontWeight:800,color:C.textMid,textTransform:"uppercase",letterSpacing:1}}>Choose your companion</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {COMPANIONS.map(c=>(
              <button key={c.id} onClick={()=>{setComp(c.id);snd(pCl);}} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:16,cursor:"pointer",border:comp===c.id?`2px solid ${c.color}`:"2px solid transparent",background:comp===c.id?c.bg:C.bgSoft,transition:"all .2s",textAlign:"left",boxShadow:comp===c.id?C.shadow:"none"}}>
                <span style={{fontSize:28}}>{c.emoji}</span>
                <div><div style={{fontWeight:800,fontSize:".9rem",color:C.text}}>{c.name}</div><div style={{fontSize:".72rem",color:C.textMid,lineHeight:1.3}}>{c.desc}</div></div>
              </button>
            ))}
          </div>
        </div>

        {/* Reading level */}
        <div style={{background:C.card,borderRadius:24,padding:"16px 20px",boxShadow:C.shadow,marginBottom:16}}>
          <h2 style={{margin:"0 0 10px",fontSize:".9rem",fontWeight:800,color:C.textMid,textTransform:"uppercase",letterSpacing:1}}>Reading level</h2>
          <div style={{display:"flex",gap:8}}>
            {LEVELS.map((l,i)=>(
              <button key={i} onClick={()=>{setLvl(i);snd(pCl);}} style={{flex:1,padding:"10px 8px",borderRadius:14,cursor:"pointer",border:"none",background:lvl===i?C.green:C.bgSoft,color:lvl===i?"#fff":C.textMid,fontWeight:800,fontSize:".82rem",transition:"all .2s",boxShadow:lvl===i?"0 2px 8px rgba(0,184,148,0.3)":"none"}}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sound toggle */}
        <div style={{background:C.card,borderRadius:24,padding:"14px 20px",boxShadow:C.shadow,marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontWeight:700,color:C.text,fontSize:".9rem"}}>Sound effects</span>
          <button onClick={()=>setSndOn(!sndOn)} style={{background:sndOn?C.green:C.bgSoft,border:"none",borderRadius:20,padding:"8px 18px",cursor:"pointer",color:sndOn?"#fff":C.textMid,fontWeight:800,fontSize:".82rem",transition:"all .2s"}}>
            {sndOn?"🔊 On":"🔇 Off"}
          </button>
        </div>

        {/* Start button */}
        <button onClick={start} style={{width:"100%",padding:"18px",borderRadius:20,border:"none",background:C.green,cursor:"pointer",boxShadow:"0 4px 16px rgba(0,184,148,0.3)",fontSize:"1.1rem",fontWeight:900,color:"#fff",transition:"all .15s",letterSpacing:.5}}>
          Start Investigating
        </button>

        <p style={{textAlign:"center",color:C.textLight,fontSize:".73rem",marginTop:20,fontWeight:600}}>Tap story text to skip typing · Tap highlighted words to learn them</p>
      </div>
    </div>
  );

  /* ═══ PLAY ═══ */
  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Nunito',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/><style>{CSS}</style>
      <VPop word={vP?.word} def={vP?.def} onClose={()=>setVP(null)}/>
      <Notebook open={nbO} onClose={()=>{setNbO(false);setNbB(false);}} words={words}/>

      <div style={{maxWidth:600,margin:"0 auto",padding:"12px 16px 40px"}}>
        {/* Top bar */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <button onClick={()=>setScr("home")} style={topBtn}>←</button>
          <div style={{flex:1,margin:"0 12px"}}>
            <div style={{height:6,borderRadius:3,background:C.bgSoft,overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:3,background:C.green,width:`${Math.min(progress,100)}%`,transition:"width .5s ease"}}/>
            </div>
          </div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={()=>setSndOn(!sndOn)} style={topBtn}>{sndOn?"🔊":"🔇"}</button>
            <button onClick={()=>{setNbO(true);setNbB(false);}} style={{...topBtn,position:"relative"}}>
              📖{nbB&&<span style={{position:"absolute",top:-2,right:-2,width:10,height:10,borderRadius:"50%",background:C.coral,border:`2px solid ${C.bg}`}}/>}
            </button>
          </div>
        </div>

        {sc&&<div style={{opacity:tr?0:1,transform:tr?"translateY(12px)":"none",transition:"all .35s ease"}}>

          {/* Scene mood indicator */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <div style={{width:8,height:8,borderRadius:4,background:moodColor}}/>
            <span style={{fontSize:".78rem",fontWeight:700,color:C.textLight,textTransform:"uppercase",letterSpacing:1}}>
              {sc.ending?"The End":sid==="start"?"The Case Begins":"Investigating..."}
            </span>
          </div>

          {/* Story card */}
          <div style={{background:C.card,borderRadius:24,padding:"clamp(20px,4vw,28px)",boxShadow:C.shadowMd,marginBottom:16,borderTop:`4px solid ${moodColor}`}}>
            <div style={{fontSize:lv.fs,lineHeight:lv.lh,color:C.text,whiteSpace:"pre-line"}}>
              <TW key={sid} text={gt(sc)} speed={14} onVT={hvt} onDone={()=>{setShowCo(true);setTimeout(()=>setShowCh(true),400);if(sc.ending)snd(pVi);else snd(pRv);}}/>
            </div>
          </div>

          {/* AI bridge text */}
          {bridge&&<div style={{background:C.violetSoft,borderRadius:20,padding:"14px 18px",marginBottom:12,animation:"fadeUp .3s ease"}}><p style={{margin:0,fontSize:".92rem",lineHeight:1.6,color:C.textMid,fontStyle:"italic"}}>{bridge}</p></div>}

          {/* Companion bubble */}
          {showCo&&sc.companion&&(
            <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12,animation:"fadeUp .3s ease"}}>
              <div style={{width:48,height:48,borderRadius:16,background:cd.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0,boxShadow:C.shadow}}>{cd.emoji}</div>
              <div style={{flex:1,background:C.card,borderRadius:20,padding:"14px 16px",boxShadow:C.shadow}}>
                <div style={{fontSize:".75rem",fontWeight:800,color:cd.color,marginBottom:4,textTransform:"uppercase",letterSpacing:.5}}>{cd.name}</div>
                <p style={{margin:0,fontSize:".9rem",lineHeight:1.6,color:C.textMid}}>"{sc.companion.replace(/\{C\}/g,cd.name)}"</p>
              </div>
            </div>
          )}

          {/* Comprehension question */}
          {showCo&&sc.question&&(
            <div style={{background:C.blueSoft,borderRadius:20,padding:"14px 18px",marginBottom:12,animation:"fadeUp .3s ease",display:"flex",gap:10,alignItems:"flex-start"}}>
              <span style={{fontSize:20,flexShrink:0}}>🤔</span>
              <p style={{margin:0,fontSize:".88rem",color:C.text,fontWeight:700,lineHeight:1.5,fontStyle:"italic"}}>{sc.question}</p>
            </div>
          )}

          {/* Choices / Ending */}
          <div style={{opacity:showCh?1:0,transform:showCh?"translateY(0)":"translateY(10px)",transition:"all .4s ease",pointerEvents:showCh?"auto":"none"}}>
            {sc.ending?(
              <div>
                <div style={{background:C.yellowSoft,borderRadius:24,padding:"24px",textAlign:"center",marginBottom:14,boxShadow:C.shadow}}>
                  <div style={{fontSize:48,marginBottom:8}}>{sc.endEmoji}</div>
                  <h2 style={{margin:"0 0 8px",fontSize:"1.3rem",fontWeight:900,color:C.text}}>{sc.endTitle}</h2>
                  <p style={{margin:0,color:C.textMid,fontSize:".93rem",lineHeight:1.6}}>{sc.endMessage}</p>
                </div>
                {words.length>0&&<button onClick={()=>setNbO(true)} style={{...choiceBtn,textAlign:"center",background:C.yellowSoft,marginBottom:8,width:"100%",justifyContent:"center"}}>📖 Review your {words.length} word{words.length>1?"s":""}!</button>}
                <div style={{display:"flex",gap:10}}>
                  <button onClick={start} style={{...choiceBtn,flex:1,justifyContent:"center",background:C.green,color:"#fff"}}>🔄 Play Again</button>
                  <button onClick={()=>setScr("home")} style={{...choiceBtn,flex:1,justifyContent:"center"}}>← Home</button>
                </div>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {(sc.choices||[]).map((c,i)=>(
                  <button key={i} onClick={()=>goTo(c.next)} style={{...choiceBtn,animationDelay:`${i*.06}s`}}>{c.text}</button>
                ))}
                {hist.length>0&&<button onClick={goBack} style={{...choiceBtn,background:C.bgSoft,color:C.textMid,boxShadow:"none",fontSize:".88rem"}}>⬅️ Go back</button>}

                <div style={{display:"flex",gap:8,marginTop:4}}>
                  <input value={cAct} onChange={e=>setCAct(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")hCA();}} placeholder="Or type your own idea..." disabled={bLoad}
                    style={{flex:1,padding:"12px 16px",borderRadius:16,fontSize:".9rem",fontFamily:"'Nunito',sans-serif",border:`2px solid ${C.bgSoft}`,background:C.card,color:C.text,outline:"none",fontWeight:600,transition:"border .2s"}}/>
                  <button onClick={hCA} disabled={bLoad||!cAct.trim()} style={{...topBtn,padding:"12px 16px",opacity:cAct.trim()?1:.35,fontSize:"1.1rem",background:C.green,color:"#fff",border:"none"}}>➤</button>
                </div>
                {bLoad&&<p style={{color:C.textLight,textAlign:"center",fontSize:".82rem",margin:"4px 0"}}>{cd.name} is thinking...</p>}
              </div>
            )}
          </div>
        </div>}
      </div>
    </div>
  );
}

const choiceBtn={display:"flex",alignItems:"center",gap:8,background:C.card,border:"none",borderRadius:18,padding:"14px 18px",fontSize:"clamp(.88rem,2.4vw,1rem)",fontFamily:"'Nunito',sans-serif",fontWeight:700,color:C.text,cursor:"pointer",textAlign:"left",boxShadow:C.shadow,transition:"all .15s",lineHeight:1.5,animation:"fadeUp .3s ease both"};
const topBtn={background:C.card,border:"none",borderRadius:14,padding:"8px 12px",cursor:"pointer",fontSize:".9rem",color:C.textMid,boxShadow:C.shadow,fontWeight:700,fontFamily:"'Nunito',sans-serif"};
const CSS=`
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes popIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
button:hover{transform:translateY(-1px)}
button:active{transform:translateY(1px)!important}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{margin:0}
input:focus{border-color:${C.green}!important}
input::placeholder{color:${C.textLight}}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-thumb{background:#ddd;border-radius:3px}
`;
