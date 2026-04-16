import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";

const P = {
  bg:"#1C1C2E",bgD:"#141422",w:"#FEFCF6",cr:"#F5F0E8",
  ink:"#1a1a2e",inkS:"#3a3a5a",inkF:"#7a7a9a",
  yel:"#FFD60A",yelS:"#FFF3B0",cor:"#FF6B6B",
  teal:"#2EC4B6",vio:"#7B68EE",grn:"#2D6A4F",
  ora:"#FF8C42",bdr:"#1a1a2e",
};
const LEVELS = [
  { label:"Beginner", fs:"1.2rem", lh:2.05 },
  { label:"Growing", fs:"1.08rem", lh:1.85 },
  { label:"Explorer", fs:"0.98rem", lh:1.75 },
];
const COMPANIONS = [
  { id:"fox",name:"Sage",emoji:"🦊",color:P.ora,desc:"Clever fox, nose for clues" },
  { id:"owl",name:"Luna",emoji:"🦉",color:P.vio,desc:"Wise owl, sees everything" },
  { id:"cat",name:"Shadow",emoji:"🐈‍⬛",color:P.teal,desc:"Sleek cat, sneaks anywhere" },
  { id:"dog",name:"Scout",emoji:"🐕",color:P.cor,desc:"Loyal hound, best ears in town" },
];
const MOODS = {
  village:{a:P.ora,bg:"#FFF3E0",i:"🏘️"},forest:{a:P.grn,bg:"#E8F5E9",i:"🌲"},
  river:{a:P.teal,bg:"#E0F7FA",i:"🌊"},indoor:{a:"#8D6E63",bg:"#EFEBE9",i:"🏠"},
  cave:{a:P.vio,bg:"#EDE7F6",i:"🕳️"},celeb:{a:P.yel,bg:"#FFFDE7",i:"🎉"},
  market:{a:"#E65100",bg:"#FFF8E1",i:"🧺"},
};

/* ═══ THE MISSING MOONSTONE ═══ */
const S = {
start: {
  mood:"village",
  text:`You and {C} had only been in Fernwood Hollow for one day when everything went sideways.

You were exploring the town square, admiring the little shops and the big oak tree in the center, when Mayor Badger came **barreling** out of the Oyster Shell Museum like his tail was on fire. "ATTENTION, CITIZENS!" he shouted, waving his arms so hard his monocle flew off and landed in Mrs. Chipmunk's lemonade. "We have been BURGLED! BURGLARIZED! BURGLAR-ATED!"

He fished out his monocle, put it on upside down, and kept going. "The Moonstone has been STOLEN from its display case!"

The crowd gasped. You'd heard about the Moonstone, a gem that glowed like a captured piece of the moon. Every night it lit up the whole town square so everyone could have picnics and play games after dark. Without it, Fernwood Hollow would go **pitch-dark** at sunset.

{C} tugged your sleeve. "We should check this out." You pushed through the crowd to the display case. The glass lid was open. Inside, the velvet cushion held two clues: a muddy **pawprint** pressed deep into the fabric, and a torn scrap of bright blue cloth caught on the latch.

Mayor Badger appeared behind you, blowing his nose into an enormous handkerchief. "Will SOMEONE please **invistigate**? Er, investigate? My nerves are absolutely SPLATTERED."`,
  vocab:{ barreling:"Running fast and out of control", "pitch-dark":"So dark you can't see anything", pawprint:"A mark left by an animal's foot", invistigate:"Mayor Badger's way of saying 'investigate' (he gets words wrong!)" },
  companion:`Two clues already. A pawprint and a piece of cloth. Not bad for our first day in town, huh?`,
  question:null,
  choices:[
    { text:"🔍 Examine the pawprint up close", next:"pawprint" },
    { text:"🧵 Take the cloth to the tailor", next:"cloth" },
    { text:"🔑 Ask Mayor Badger who had keys to the case", next:"keys" },
  ],
},

pawprint: {
  mood:"village",
  text:`You crouched beside the case and studied the pawprint. Four toes, each with a small curved claw mark, sunk deep into the velvet like the thief had been carrying something heavy. {C} leaned in close and took a long, careful sniff.

"That's not garden dirt," {C} said, eyes narrowing. "It's river clay. The red, **sticky** kind that only comes from down by Willow Creek bridge. I'd know that smell anywhere."

Old Mr. Turtle, who had been watching from behind his **spectacles**, nodded so slowly you could have made a sandwich while waiting. "Correct. That particular clay **stains** everything it touches. Whoever left this print walked through the shallows before coming here."

A little mouse in the crowd raised his hand. "Maybe the Moonstone just got bored and walked away on its own!"

Everyone turned to stare at him.

"What?" he said **defensively**. "Stranger things have happened."

{C} was already moving toward the square's south exit. "If the thief came from Willow Creek, there'll be more prints. That clay doesn't wash off easy."`,
  vocab:{ sticky:"Stays on things and is hard to remove", spectacles:"Glasses for seeing better", stains:"Leaves a mark that's hard to clean", defensively:"In a way that shows you think people are judging you" },
  companion:`River mud. That means our thief came from the south side of town. Not many animals live down that way.`,
  question:`The thief was carrying something heavy enough to press deep into velvet. What does that tell us about how they planned this?`,
  choices:[
    { text:"🌉 Follow the trail to Willow Creek bridge", next:"bridge" },
    { text:"🏘️ Find out who lives near the river", next:"riverfolk" },
  ],
},

cloth: {
  mood:"market",
  text:`You took the scrap of blue cloth to Rabbit the Tailor's shop in the market. Rabbit was a fluffy gray bunny with seven pins stuck in her apron, a tape measure draped around her neck, and the **uncanny** ability to talk faster than most animals could think.

"Oh my GOODNESS!" She snatched the fabric from your hand and held it up to the window light, squinting at it from three different angles. "I KNOW this cloth! I made a scarf from this exact bolt of **indigo** silk just last week!" She was already flipping through her enormous order book, licking her thumb between pages. "Now, I'm not one to gossip, BUT..."

She lowered her voice to a whisper so loud it was basically just talking. "This was a **custom** order from Raven. You know Raven? The collector who lives in that enormous pine tree on Ridgeline Road? House full of **antiques** and crystals and rare feathers? Not that I'm SAYING she stole the Moonstone, but she does love shiny things, and the Moonstone is VERY shiny, and she once told me, right here in this shop, that the Moonstone **deserved** to be in a REAL collection and not just sitting in a public museum where..."

She caught herself mid-sentence and straightened up. "But I'm not one to gossip."

{C} looked at you with raised eyebrows.`,
  vocab:{ uncanny:"Strange or remarkable in a way that's hard to explain", indigo:"A deep blue-purple color", custom:"Made specially for one person", antiques:"Very old and valuable objects", deserved:"Earned, should have" },
  companion:`Rabbit says the cloth belongs to Raven. But Rabbit also says a LOT of things. Should we hear Raven's side of this?`,
  question:null,
  choices:[
    { text:"🌲 Go visit Raven in the tall pine tree", next:"raven" },
    { text:"🗣️ Ask other animals about Raven first", next:"ask_raven" },
  ],
},

keys: {
  mood:"indoor",
  text:`Mayor Badger led you into his office, a cluttered room that smelled like old paper and peppermint tea. He sank into his enormous leather chair and pulled out a **monogrammed** handkerchief.

"Only three animals have keys to that case," he said, holding up three pudgy fingers. "Myself, Sergeant Otter the night guard, and Mole the cleaner. All **trustworthy** citizens. Well, Mole once ate an entire cake meant for the town picnic, but that's a separate issue."

He held up his key ring with a **flourish**. "And MY key never leaves my side! Safe as houses!"

But when you leaned in to look, something caught your eye. Fresh scratches on the brass ring, fine and **deliberate**, like someone had pried it open recently. And there, in the grooves of the key itself, you spotted a tiny smear of gray, waxy stuff.

"Mayor Badger," you said carefully, "has anyone else handled your keys?"

His magnificent mustache trembled. The monocle slipped. "Well, I do occasionally leave them on my desk. When I take my afternoon nap. Which is... most afternoons." He tugged his collar. "But nobody would DARE tamper with the mayor's personal property! This is an outrage of the highest **magnitude**!"`,
  vocab:{ monogrammed:"Having someone's initials sewn or printed on it", trustworthy:"Can be trusted, reliable", flourish:"A big, dramatic movement to show something off", deliberate:"Done carefully and on purpose", magnitude:"How big or important something is" },
  companion:`Fresh scratches and gray wax on a key ring. Someone made a copy of that key. And Mayor Badger sleeps every afternoon with the keys on his desk. Convenient.`,
  question:`If someone copied the key while the mayor napped, they'd need access to his office. Who could get in without raising suspicion?`,
  choices:[
    { text:"🦦 Talk to Sergeant Otter, the night guard", next:"otter" },
    { text:"🔎 Figure out where the gray wax came from", next:"key_scratch" },
  ],
},

bridge: {
  mood:"river",
  text:`The trail of red clay led you and {C} through a stretch of birch trees and down a slippery bank to Willow Creek bridge. The old wooden bridge groaned and **creaked** under your feet like it was complaining about having visitors.

"More prints!" {C} pointed at the planks. The same four-toed tracks, **crusted** with red mud, led off the far side of the bridge and down to the waterline, where a huge hollow log lay wedged between the roots of an ancient willow tree.

You got on your hands and knees and crawled inside. It was dark, damp, and smelled like wet bark and something metallic. But someone had been here recently. A small brass lantern sat in the corner, and when you touched the glass, it was still warm. A half-eaten walnut sat next to it.

"Over here!" {C} was digging at something stuck in a crack in the bark. Out came a tiny brass gear, no bigger than a shirt button, with perfect little teeth around its edge. It caught the light and gleamed.

"This isn't just any gear," {C} said, holding it up and squinting. "This is **precision** work. Handmade. Somebody brought serious **equipment** down here and lost a piece of it."`,
  vocab:{ creaked:"Made a squeaky, stretchy sound", crusted:"Covered with a hard, dried layer", precision:"Made very exactly and carefully", equipment:"Tools and machines used for a job" },
  companion:`A warm lantern and a lost gear. Our thief was here recently, working on something mechanical. This was no quick grab. This was planned.`,
  question:null,
  choices:[
    { text:"🐾 Follow the prints past the log", next:"den" },
    { text:"⚙️ Take the gear to the clockmaker in town", next:"clockmaker" },
  ],
},

riverfolk: {
  mood:"river",
  text:`Three families lived along Willow Creek: the Otters, the Beavers, and a **newcomer**.

The Beaver family was DELIGHTED to have visitors. Mrs. Beaver pulled you inside before you could finish your first question, sat you down at her kitchen table, and pushed a plate of acorn cookies toward you so fast they nearly slid off the edge.

"Oh, we heard EVERYTHING last night," she said, leaning forward with the **intensity** of someone who had been waiting all day to tell this story. "First there was splashing. LOUD splashing, around midnight. Then this weird clicking sound, like tiny metal parts going tick-tick-tick. My Harold wanted to investigate, but I said, 'Harold Beaver, you are NOT going out there at midnight in your **pajamas**!' And that was that."

Mr. Beaver, a large brown beaver in a plaid vest, nodded **mournfully** from his armchair.

"There's also a new neighbor," Mrs. Beaver continued, dropping her voice. "A raccoon. Calls himself Fingers. Moved in about a month ago. Keeps to himself. Always **tinkering** with things in his little den down by the water. Comes and goes at odd hours." She paused. "Not that I'm watching. I just... notice things."`,
  vocab:{ newcomer:"Someone who has recently arrived", intensity:"Deep, focused energy", pajamas:"Clothes you wear to bed", mournfully:"In a sad, gloomy way", tinkering:"Working on something in a casual, experimental way" },
  companion:`Midnight splashing, metallic clicking, and a mysterious new raccoon who tinkers with things. That's a LOT of suspicious activity for one quiet creek.`,
  question:`Mrs. Beaver heard clicking like tiny metal parts. What kind of tools make that sound?`,
  choices:[
    { text:"🦝 Pay a visit to this Fingers character", next:"den" },
    { text:"🌉 Search the riverbank for clues first", next:"bridge" },
  ],
},

raven: {
  mood:"indoor",
  text:`Raven's home sat at the very top of the tallest pine tree on Ridgeline Road, and stepping inside was like entering a museum run by someone with **magnificent** taste and zero interest in empty wall space.

Every surface held something beautiful: oil paintings in gold frames, shelves of **gleaming** crystals arranged by color, glass cases protecting rare feathers and ancient coins. The place even smelled expensive.

Raven herself was a large, sleek black bird with an enormous vocabulary and a flair for drama that could put a soap opera to shame.

When you held up the blue cloth, she gasped so hard she nearly fell off her perch. "My SCARF!" She pressed one wing to her chest. "My beautiful, one-of-a-kind indigo silk scarf! But that's IMPOSSIBLE! It was STOLEN from this very room two days ago!"

She swept across the room and pointed at her window. A perfect circle, smooth as a dinner plate, had been cut right through the glass. Not cracked. Not smashed. CUT, by someone with a **specialized** tool and a very steady hand.

"Do you SEE?" Raven said, turning back to you with eyes blazing. "Someone broke in, stole my scarf, and used it to frame me for the Moonstone theft! This is a FRAME JOB! A **conspiracy** against the most refined bird in Fernwood Hollow!" She placed the back of her wing against her forehead. "I may need to sit down."`,
  vocab:{ magnificent:"Extremely beautiful and impressive", gleaming:"Shining brightly", specialized:"Designed for one particular job", conspiracy:"A secret plan to do something harmful" },
  companion:`That window was cut with a professional tool, not smashed by an amateur. And if her scarf really was stolen BEFORE the Moonstone heist, someone planned this carefully.`,
  question:`Raven says she's being framed. If that's true, someone stole her scarf JUST to leave it at the crime scene. What kind of thief plans that far ahead?`,
  choices:[
    { text:"🪟 Examine the cut window more closely", next:"window_clue" },
    { text:"🤔 Ask Raven who would want to frame her", next:"frame" },
  ],
},

ask_raven: {
  mood:"market",
  text:`Before heading to Raven's tree, you decided to gather some **intelligence** at the market. The animals of Fernwood Hollow, it turned out, had VERY strong opinions.

"Raven is obviously guilty," declared Mouse, standing on an apple crate to make himself taller. "She LOVES gems. She practically **drools** over them. The Moonstone would be the crown jewel of her collection!"

But Squirrel dropped from a nearby branch and landed between you. "That's **ridiculous**, Mouse. Raven already owns crystals worth ten times the Moonstone. Why would she risk everything to steal something worth less than what's already in her living room?"

Mouse opened his mouth, closed it, and climbed down from his crate.

Then Chipmunk appeared at your elbow. He was small, **jittery**, and had the look of someone carrying a secret that was physically too heavy for him. "Forget Raven," he whispered. "There's a new animal in town. A raccoon. Showed up about a month ago. He's been going around asking WEIRD questions. Like what time the guard changes shifts. What kind of lock is on the Moonstone case. How thick the glass is." He looked over both shoulders. "That's not normal **curiosity**."`,
  vocab:{ intelligence:"Information gathered to solve a problem", drools:"Gets so excited you can barely control yourself", ridiculous:"So silly it doesn't make sense", jittery:"Nervous and jumpy", curiosity:"Wanting to know about something" },
  companion:`Two leads in different directions. Raven has the motive, but this mystery raccoon has been doing homework on the Moonstone's security. That's not casual interest.`,
  question:null,
  choices:[
    { text:"🦝 Find this raccoon. Now.", next:"den" },
    { text:"🪶 Let's hear Raven's side of the story", next:"raven" },
  ],
},

otter: {
  mood:"river",
  text:`Sergeant Otter was at his guard post by the river, doing one-armed push-ups when you arrived, which he was clearly doing for your benefit.

"WELCOME!" He sprang to his feet and **saluted** so hard he almost smacked himself. "Sergeant Otter, Head of Moonstone Security! I was on duty ALL night! Nobody gets past THESE!" He flexed both arms and kissed each bicep individually. {C} looked away to keep from laughing.

But when you pressed for details, the flexing stopped. His broad shoulders **slumped**.

"Okay. Fine," he muttered, studying his feet. "I MIGHT have... fallen asleep. For about an hour. Around midnight." He tugged his collar. "And here's the weird part. When I woke up, my key was in my LEFT pocket. But I ALWAYS keep it in my right pocket. Always. I'm very **particular** about my pocket system."

He looked at you with big, worried eyes. "Someone took that key while I was sleeping, didn't they? Someone **borrowed** it and put it back." His lower lip trembled. Then he flexed again, but it was the saddest flex you'd ever seen. "I bench-press river rocks, you know. This shouldn't have happened to someone who bench-presses river rocks."`,
  vocab:{ saluted:"Made a formal military greeting", slumped:"Drooped downward in a sad or tired way", particular:"Very careful about exactly how things should be", borrowed:"Took something planning to return it" },
  companion:`Someone moved his key while he slept. The question is, did he just fall asleep on his own, or did someone MAKE him fall asleep?`,
  question:null,
  choices:[
    { text:"🍵 Ask what could have made him so sleepy", next:"sleepy" },
    { text:"👣 Check for footprints around the guard post", next:"bridge" },
  ],
},

key_scratch: {
  mood:"indoor",
  text:`You carefully scraped the gray **residue** from the key and brought it to Hedgehog's Candle and Wax Shop, a store so small you had to duck through the door.

Hedgehog herself was tiny, even by hedgehog standards, and wore glasses so enormous they made her eyes look like dinner plates. She took the wax sample, held it under a magnifying lamp, and gasped.

"Casting wax!" she squeaked. "Gray, Grade-A casting wax! You know what this is for? You press a key into it to make a perfect **impression**. Then you pour metal into the mold and BOOM, duplicate key." She was already flipping through her sales ledger. "Here it is! Sold one block of gray casting wax last Tuesday. To a raccoon. Never seen him before. He was **fidgety**, paid in exact change, and scurried out of here like his tail was on fire."

She looked up at you over those giant glasses. "I thought it was weird at the time, but you know. Wax is wax. A girl's gotta make a living."`,
  vocab:{ residue:"A tiny amount of something left behind", impression:"A mark made by pressing into something soft", fidgety:"Nervous and unable to keep still" },
  companion:`Gray wax, a mystery raccoon, and now we know someone made a copy of the key. Every lead keeps pointing toward the river.`,
  question:null,
  choices:[
    { text:"🦝 Find this raccoon", next:"den" },
    { text:"🪤 Set a trap using a fake gem", next:"trap" },
  ],
},

clockmaker: {
  mood:"indoor",
  text:`Beetle's Clockwork Shop was a **wonderland** of ticking. Clocks covered every wall, filled every shelf, and hung from the ceiling on chains. Somewhere in the middle of it all, Beetle himself sat on a high stool, a beetle so small he needed a step ladder to reach his own workbench, wearing magnifying goggles so powerful his eyes looked like two shiny hubcaps.

The moment you produced the gear, something extraordinary happened. Beetle stopped mid-sentence. His antennae stood straight up. His goggles fogged over.

"Is... is that..." He leaped off his stool, scuttled across the workbench at **alarming** speed, and plucked the gear from your fingers like it was made of diamonds. "A GRADE-SEVEN DOUBLE-CUT BRASS GEAR WITH BEVELED TEETH?!"

He held it up to his desk lamp, rotating it with the **tenderness** of someone holding a baby bird. For a solid thirty seconds, he forgot you existed. {C} cleared their throat. Twice.

"Oh! Right. The crime. Yes." Beetle set down the gear with visible **reluctance**. "This component is from a portable lock-picking device. Very advanced, very expensive, very illegal." He tapped his chin. "A raccoon visited my shop last month. Asked extremely specific questions about lock mechanisms. Said he was 'writing a book.'" Beetle looked at you over his enormous goggles. "Nobody who asks that many questions about the inside of locks is writing a book."`,
  vocab:{ wonderland:"A place full of amazing things", alarming:"Surprisingly fast in a worrying way", tenderness:"Gentle, careful kindness", reluctance:"Not wanting to do something" },
  companion:`Beetle confirmed it. That gear is from a lockpick built by someone who knows what they're doing. And a mystery raccoon has been studying locks.`,
  question:null,
  choices:[
    { text:"🦝 Find this raccoon NOW", next:"den" },
    { text:"🪤 Ask Beetle to help set a trap", next:"trap" },
  ],
},

window_clue: {
  mood:"indoor",
  text:`You examined the hole in Raven's window with {C}. The cut was a perfect circle, smooth as a plate, with no cracks or rough edges. This wasn't done with a rock or an elbow. Somebody used a diamond-tipped glass cutter, the kind that costs more than most animals earn in a month.

But the real evidence was outside. On the windowsill, you found a smudge of red river clay, the exact same **distinctive** mud from the Moonstone crime scene. And on the pine branch just below the window, pressed clearly into the sticky sap: small, five-fingered pawprints. **Unmistakably** raccoon.

{C} looked at you, eyes bright. "Same mud. Same precision tools. Same careful planning. This isn't two crimes, it's one crime with two **stages**. Our thief robbed Raven FIRST to get the scarf, then used it to frame her while stealing the Moonstone."

Raven, who had been watching from her fainting couch, sat bolt upright. "I TOLD you! I'm being **persecuted**!"`,
  vocab:{ distinctive:"Easy to recognize because it is unique", unmistakably:"In a way that cannot be confused", stages:"Steps in a plan", persecuted:"Treated unfairly on purpose" },
  companion:`Every clue points the same direction: the river. A raccoon with professional tools, river mud on his feet, and a plan complicated enough to frame an innocent bird.`,
  question:null,
  choices:[
    { text:"🐾 Follow the raccoon tracks toward the river", next:"den" },
    { text:"📋 Bring all this evidence to Mayor Badger", next:"ending_smart" },
  ],
},

frame: {
  mood:"indoor",
  text:`Raven paced her perch like a detective in a crime movie, one wing behind her back. "Who would TARGET me? Who would have the **audacity**?"

Suddenly she stopped dead. Her eyes went wide. "FINGERS."

"Who?" you and {C} said together.

"A raccoon! Three weeks ago, we were both bidding on a rare quartz crystal at the Bramblewood Auction. **Magnificent** piece, pink with gold veins. The bidding went back and forth, back and forth. I won." She smiled briefly at the memory, then the smile vanished. "He was LIVID. His paws were shaking. He pointed right at me and said, 'You'll **regret** this, Raven. Mark my words.'"

She turned to you. "I thought he was just a sore loser. But what if this is his revenge? Steal the Moonstone, frame ME for it using my own scarf, and sit back while I take the **blame**?"`,
  vocab:{ audacity:"Bold, shocking rudeness or nerve", magnificent:"Extremely beautiful and impressive", regret:"To feel sorry about something", blame:"Being held responsible for something bad" },
  companion:`Revenge plus profit. If Raven is right, this raccoon planned the whole thing: steal her scarf, steal the Moonstone, and frame her for both.`,
  question:null,
  choices:[
    { text:"🦝 Go find this Fingers character", next:"den" },
    { text:"🪤 Set a trap he can't resist", next:"trap" },
  ],
},

sleepy: {
  mood:"river",
  text:`Something flickered behind Otter's eyes. "WAIT. I just remembered." He snapped his fingers. "There was TEA! A cup of chamomile tea sitting on my guard post when I started my shift. Little note that said 'From the Mayor's office.' I thought it was a nice **gesture**."

"Did it taste normal?" you asked.

Otter **winced**. "Now that you mention it... no. It was more bitter than usual. Kind of **metallic**. But it was free tea, and I'm not the type to turn down free tea, so I drank the whole thing." He looked at his feet. "Within twenty minutes, I could barely keep my eyes open. It was like someone pulled a plug in my brain."

{C} was already putting the pieces together. "Someone left **drugged** tea at your post. They knew your shift schedule. They knew you'd drink free tea. This thief has been watching you, Otter. For a while."

Otter's eyes went wide. Then he flexed one arm, but it was more of a nervous habit than a display. "That's... really **creepy**, actually."`,
  vocab:{ gesture:"A kind action to show how you feel", winced:"Made a face showing discomfort", metallic:"Tasting like metal", drugged:"Had something added to make you sleepy", creepy:"Making you feel nervous or scared" },
  companion:`Drugged tea, a fake note, and someone who's been watching the guard's habits. This thief doesn't leave anything to chance.`,
  question:`The thief knew Otter would drink the tea. What does that tell you about how long they've been planning this?`,
  choices:[
    { text:"🕵️ Head for the river. This ends now.", next:"den" },
    { text:"🌉 Look for clues along the creek first", next:"bridge" },
  ],
},

den: {
  mood:"cave",
  text:`The trail of evidence led to a tidy den built into the riverbank, half-hidden behind trailing willow branches. A cheerful wooden sign over the door read "WELCOME, FRIENDS!" in painted cursive. It was the kind of sign that made you want to trust whoever lived here, which, {C} pointed out, was **suspicious** all by itself.

{C} knocked. The door swung open to reveal a raccoon with bright, clever eyes and the kind of wide, warm smile that could sell you a bridge. "Oh! Visitors! How absolutely **delightful**!" He bowed with a little flourish. "I'm Fingers. Please, please, come in. Make yourselves comfortable. Can I offer you acorn tea? Walnut cookies? I just baked them this morning."

The den looked perfectly **innocent**. Cozy armchairs, shelves of books, a crackling fire, and the smell of fresh baking. Fingers chatted cheerfully about the weather, the lovely river views, and the new bridge the beavers were building.

But while he was pouring tea with his back turned, {C} slipped behind a heavy curtain at the back of the room. A moment later, {C} caught your eye from behind the fabric. The expression on {C}'s face could only be described as "jackpot."

You peeked behind the curtain while Fingers stirred sugar into his tea. Your heart nearly stopped.

A complete secret workbench filled the hidden room. Lockpicking tools laid out by size, like surgical instruments. Gray wax molds holding the perfect **impression** of a brass key. And pinned to the wall, a hand-drawn map of the town square with the Moonstone display case circled three times in bright red ink. Someone had written "TARGET" underneath with an arrow.

Fingers appeared at the curtain, still holding his teapot. His smile hadn't changed even slightly.

"Oh," he said pleasantly. "You found my hobby room."`,
  vocab:{ suspicious:"Making you think something is wrong", delightful:"Very pleasant and enjoyable", innocent:"Not guilty, not harmful", impression:"A mark made by pressing into something soft" },
  companion:`Lockpicks. Key molds. A map with the Moonstone circled in red. And this guy just offered us cookies. We've got him.`,
  question:`We have all the evidence. But Fingers is right here, and he knows we know. Do we handle this ourselves, or get backup?`,
  choices:[
    { text:"😤 Confront him right here, right now", next:"confront" },
    { text:"🏃 Get out quietly and bring Mayor Badger", next:"ending_smart" },
  ],
},

trap: {
  mood:"village",
  text:`The plan was brilliant, if you said so yourself. With Mayor Badger's help, you spread a rumor through town: a SECOND gem, even more valuable than the Moonstone, called the "Sunstone," would be placed on **temporary** display tonight and tonight only.

Of course, there was no Sunstone. But the thief didn't know that.

As darkness fell, half of Fernwood Hollow's citizens **concealed** themselves behind barrels, bushes, and market stalls around the town square. Mayor Badger, hidden behind an incredibly thin tree, kept whispering at full volume: "Is he COMING? Can anyone SEE anything?" Mrs. Beaver shushed him so many times she pulled a muscle. Beetle accidentally knocked over a stack of flower pots and had to be sat on by Otter.

Then, at exactly midnight, a shadow **materialized** at the edge of the square. It moved low and fast, hugging the walls. As it stepped into the faint moonlight, you saw him clearly: a raccoon, face covered by a mask made from a very familiar indigo silk scarf, carrying a set of lockpicking tools in both paws.

He reached the display case. His tools touched the lock.

"NOW!" Mayor Badger bellowed so loudly that several concealed citizens screamed.`,
  vocab:{ temporary:"Only lasting for a short time", concealed:"Hidden from view", materialized:"Appeared suddenly" },
  companion:`The whole town working together. Mayor Badger whispering like a foghorn. Beetle getting sat on. This might be the greatest trap in Fernwood Hollow history.`,
  question:null,
  choices:[{ text:"🪤 SPRING THE TRAP!", next:"ending_trap" }],
},

confront: {
  mood:"cave",
  text:`"We know everything, Fingers," you said, keeping your voice steady. "The wax molds. The lockpicks. The map. You stole Raven's scarf to frame her, drugged Otter's tea, and took the Moonstone."

For the first time since you'd met him, the raccoon's legendary smile **faltered**. Just for a second, the mask slipped, and you saw something real underneath: a calculating mind that was very quickly running out of options.

He set down the teapot with deliberate slowness. "Well. That's... **comprehensive**." He glanced at the door. {C} was already standing in front of it, arms crossed.

"I don't suppose we could discuss this over cookies?"

"No," said {C}.

Fingers sighed. Then he bolted for the window. What happened next took about three seconds: he leaped, caught his foot on his own lockpicking kit, **pirouetted** into the map wall (which collapsed), and landed face-first in a pile of wax molds with a sad, crunchy SPLAT.

{C} looked down at him. "That went well for you."

Fingers rolled over, covered in broken wax, and raised both paws. "Fine. You got me. The Moonstone is under the third flat rock east of the bridge. You can't miss it." He paused. "It's the one that's glowing."`,
  vocab:{ faltered:"Became less strong or sure", comprehensive:"Complete, covering everything", pirouetted:"Spun around like a dancer (but less gracefully)" },
  companion:`Tripped over his own lockpicks. There's a kind of poetry in that. Come on, let's go get the Moonstone!`,
  question:null,
  choices:[{ text:"💎 Recover the Moonstone!", next:"ending_hero" }],
},

ending_hero: {
  mood:"celeb",
  text:`The Moonstone was exactly where Fingers said it would be: nestled under the third flat rock east of the bridge, glowing softly in its little hiding place like a nightlight that missed its home.

You lifted it carefully with both hands. It was warm, and up close, the glow shifted through colors you didn't have names for.

When you carried it back to the town square, the reaction was **pandemonium**. Animals poured from every doorway, cheering, clapping, and in the Beaver family's case, crying. Mayor Badger attempted a speech but was so overwhelmed he kept losing his words even worse than usual. "You have rescued this town from... from OBSCURITY! No, wait. DARKNESS! Both the literal and the... the METAPHORICAL kind!" He blew his nose so loudly a nearby bird startled out of a tree, then placed the Golden Acorn Medal around your neck and {C}'s with shaking paws.

Raven swooped in wearing her finest cape, officially cleared of all suspicion, and shook your hand so many times your arm went numb. "I will compose an OPERA about this investigation!"

Beetle was discovered in the corner, examining Fingers' confiscated lockpick with tears of **admiration** in his enormous goggle-eyes. Sergeant Otter stood at attention nearby, flexing quietly, his honor restored.

As for Fingers, Mayor Badger sentenced him to six months of community service: going door to door and installing better, stronger locks on everything he'd proved he could pick. The raccoon accepted the **verdict** with a sigh, but as he hoisted his toolbox and headed toward the museum, you caught something: a small, genuine smile. Not the charming, calculated one. A real one.

That night, the Moonstone was restored to its case, and the town square blazed with light for the biggest celebration Fernwood Hollow had ever seen. There were acorn cakes and Rabbit told the story so many times she lost her voice.

{C} bumped your shoulder as fireflies danced in the warm air above the square. "You know what? Not bad for our first week in town. Not bad at all."`,
  vocab:{ pandemonium:"Wild chaos and noise", admiration:"Feeling impressed and respectful", verdict:"The final decision about someone's consequence" },
  companion:`The Moonstone is home. The town is glowing. And somewhere out there, a raccoon is installing better locks. Case closed.`,
  ending:true, endTitle:"The Hero Detective", endEmoji:"🏅",
  endMessage:"You cracked the case and saved Fernwood Hollow! Fingers now installs the best locks in town. Raven composed a three-hour opera about your adventure (attendance is mandatory). And the Moonstone has never shone brighter. 🌟🏅",
},

ending_smart: {
  mood:"celeb",
  text:`You made the hardest choice a detective can make: you walked away from the suspect.

You slipped out with {C} close behind, quiet as shadows, and ran straight to Mayor Badger's office. There, you laid out everything. The river mud. The copied key. The drugged tea. Raven's stolen scarf. The lockpicks, the wax molds, the map with the Moonstone circled in red. Every piece of the puzzle, assembled in **logical** order.

Mayor Badger listened with his monocle slowly sliding down his nose. When you finished, he sat in silence for three full seconds, which was a personal record.

Then he stood up. "SERGEANT OTTER! Assemble an official search team!"

Otter was beside himself with **relief**. He practically sprinted to the den, leading a team of guards. They found the Moonstone behind a cleverly constructed false wall, along with detailed plans for robberies in three neighboring towns. Fingers didn't even try to run. He looked at the guards, looked at his exposed workshop, and said, "I'm going to need a bigger teapot."

At the ceremony that evening, Mayor Badger managed a speech without a single word fumble (a Fernwood Hollow first). "This young detective showed us something **remarkable** today. Being brave doesn't always mean charging in. Sometimes the most **courageous** act is gathering evidence, building a case, and trusting the process. That's not just detective work. That's wisdom."

Raven, officially cleared, gave you a genuine antique magnifying glass from her personal collection. "You have excellent instincts, detective. And even better **judgment**."

{C} watched you turn the magnifying glass over in your hands. "You know what? That looks good on you. Very professional."

The Moonstone went back to its case, glowing like it had never left. Fingers got six months of lock-installation duty. And Fernwood Hollow slept peacefully that night for the first time in a week.`,
  vocab:{ logical:"In an order that makes sense", relief:"The feeling when something stressful is over", remarkable:"Worth noticing because it is impressive", courageous:"Very brave", judgment:"The ability to make good choices" },
  companion:`Proof over glory. Evidence over impulse. That's what separates a good detective from a great one. And you are a great one.`,
  ending:true, endTitle:"The Wise Investigator", endEmoji:"🔍",
  endMessage:"Your careful detective work saved Fernwood Hollow the right way. Raven's magnifying glass sits on your desk. Fingers now installs the best locks in town. And Mayor Badger tells everyone: 'That kid taught ME something about wisdom.' 📋🔍✨",
},

ending_trap: {
  mood:"celeb",
  text:`Every lantern in the square **ignited** at once, flooding the cobblestones with golden light. Fingers stood frozen in the middle of it all, blinking, a lockpick in one hand and a look of absolute shock on his masked face.

He was surrounded. Completely, thoroughly surrounded by every animal in Fernwood Hollow.

"Oh," he said, very quietly. "This is... not ideal."

His tools clattered to the ground. In his backpack, Sergeant Otter found the Moonstone (still glowing) and Raven's stolen indigo scarf (slightly wrinkled).

Mayor Badger stepped forward from behind his hilariously thin tree, grinning from ear to ear. "You have been OUTSMARTED, my friend! Out-WITTED! Out-FOXED!" He glanced sideways. "No offense to foxes."

Fingers slowly pulled off the scarf mask. He looked at the crowd. He looked at the fake display case. He looked at you and {C}. And then, to everyone's surprise, he started to laugh. A real, genuine, can't-help-it laugh.

"Okay," he said, wiping his eyes. "I have to admit it. That was a REALLY good trap. The fake Sunstone rumor? **Brilliant**. Who thought of that?" You raised your hand. He nodded with something that looked a lot like **respect**. "Well played, detective. Well played."

He held out his paws, and Sergeant Otter cuffed him with the most **magnificent** flex of his entire career.

That night, the Moonstone returned to its case and the square blazed with light for the biggest party in Fernwood Hollow's history. Beetle organized fireworks (he went slightly overboard; several ended up in the next county). Mrs. Beaver produced four kinds of pie. And Rabbit told the story so many times that by the eighth version, the trap also involved a catapult.

{C} found you at the edge of the crowd, watching the Moonstone glow. "You know what the best part is? Even the bad guy admitted it was a good plan."

You grinned. "Not bad for our first week."`,
  vocab:{ ignited:"Burst into light", brilliant:"Extremely clever", respect:"A feeling of admiration", magnificent:"Extremely impressive" },
  companion:`A trap so good the thief applauded. Beetle's fireworks in the next county. Mrs. Beaver's four pies. This is what solving a mystery feels like.`,
  ending:true, endTitle:"The Master Strategist", endEmoji:"🪤",
  endMessage:"Your trap became LEGENDARY. Fingers now installs locks and grudgingly admits yours was the best plan he ever fell for. Beetle's fireworks are still being found in neighboring towns. And every year, the whole town reenacts the Great Moonstone Trap, with Mayor Badger playing himself. He still whispers too loud. 🪤🎆🏆",
},
};

/* ═══ AI bridge for free-text ═══ */
async function aiBridge(txt,act,cn,lv){try{const r=await fetch("/api/bridge",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sceneText:txt,action:act,companionName:cn,level:lv})});if(!r.ok)return null;const d=await r.json();return d.text||null;}catch(e){return null;}}

/* ═══ COMPONENTS ═══ */
function TW({text,speed=14,onDone,onVT}){const[p,sP]=useState(0);const d=useRef(false);useEffect(()=>{sP(0);d.current=false;},[text]);useEffect(()=>{if(p<text.length){const t=setTimeout(()=>sP(x=>x+1),speed);return()=>clearTimeout(t);}else if(!d.current){d.current=true;onDone?.();}},[p,text,speed]);return<span onClick={()=>sP(text.length)} style={{cursor:p<text.length?"pointer":"default"}}>{pV(text.slice(0,p),onVT)}{p<text.length&&<span style={{opacity:.3,animation:"blink .8s infinite"}}>|</span>}</span>;}
function pV(t,f){if(!t)return[t];return t.split(/(\*\*[^*]+\*\*)/).map((s,i)=>{const m=s.match(/^\*\*(.+)\*\*$/);return m?<span key={i} onClick={e=>{e.stopPropagation();f?.(m[1]);}} style={{color:P.ink,background:P.yelS,borderBottom:`2px solid ${P.yel}`,padding:"0 3px",borderRadius:3,cursor:"pointer",fontWeight:700}}>{m[1]}</span>:<span key={i}>{s}</span>;});}
function Pnl({mood,children,style:s={}}){const m=MOODS[mood]||MOODS.village;return<div style={{background:m.bg,border:`3px solid ${P.bdr}`,borderRadius:6,position:"relative",overflow:"hidden",...s}}><div style={{position:"absolute",inset:0,opacity:.035,pointerEvents:"none",backgroundImage:`radial-gradient(${P.bdr} 1px,transparent 1px)`,backgroundSize:"8px 8px"}}/><div style={{position:"relative",zIndex:1}}>{children}</div></div>;}
function SH({mood,title}){const m=MOODS[mood]||MOODS.village;return<div style={{background:m.a,padding:"9px 16px",display:"flex",alignItems:"center",gap:8,borderBottom:`3px solid ${P.bdr}`}}><span style={{fontSize:20}}>{m.i}</span><h2 style={{margin:0,fontFamily:"'Bangers',cursive",color:P.w,fontSize:"clamp(1rem,3.5vw,1.3rem)",letterSpacing:1.5,textShadow:`2px 2px 0 ${P.bdr}`}}>{title}</h2></div>;}
function SBub({children}){return<div style={{position:"relative",background:P.w,border:`3px solid ${P.bdr}`,borderRadius:16,padding:"10px 14px",boxShadow:`3px 3px 0 ${P.bdr}`}}>{children}<div style={{position:"absolute",bottom:-10,left:18,width:0,height:0,borderLeft:"10px solid transparent",borderRight:"10px solid transparent",borderTop:`10px solid ${P.bdr}`}}/><div style={{position:"absolute",bottom:-7,left:20,width:0,height:0,borderLeft:"8px solid transparent",borderRight:"8px solid transparent",borderTop:`8px solid ${P.w}`}}/></div>;}
function VPop({word,def,onClose}){if(!word)return null;return<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.4)",padding:20}}><div onClick={e=>e.stopPropagation()} style={{background:P.w,border:`3px solid ${P.bdr}`,borderRadius:14,padding:"18px 22px",maxWidth:320,boxShadow:`5px 5px 0 ${P.bdr}`,animation:"popIn .2s ease"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",mb:8,marginBottom:8}}><span style={{fontFamily:"'Bangers',cursive",fontSize:"1.3rem",color:P.ink,letterSpacing:1}}>{word}</span><span>📖</span></div><p style={{margin:0,fontSize:".93rem",lineHeight:1.6,color:P.inkS,fontFamily:"'Nunito',sans-serif"}}>{def||"Keep reading to find out!"}</p><span style={{display:"inline-block",marginTop:10,fontSize:".72rem",background:P.yelS,color:P.ink,padding:"3px 10px",borderRadius:8,fontWeight:700}}>Added to Word Collection!</span></div></div>;}
function NBk({open,onClose,words}){return<div style={{position:"fixed",top:0,right:0,bottom:0,width:"min(320px,85vw)",background:P.cr,zIndex:150,transform:open?"translateX(0)":"translateX(100%)",transition:"transform .3s",border:`3px solid ${P.bdr}`,borderRight:"none",display:"flex",flexDirection:"column",fontFamily:"'Nunito',sans-serif"}}>{open&&<div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.35)",zIndex:-1}}/>}<div style={{padding:"14px 16px",borderBottom:`3px solid ${P.bdr}`,background:P.yel,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:"'Bangers',cursive",fontSize:"1.1rem",color:P.ink,letterSpacing:1}}>📖 Word Collection ({words.length})</span><button onClick={onClose} style={{background:"none",border:"none",fontSize:"1.2rem",cursor:"pointer"}}>✕</button></div><div style={{flex:1,overflow:"auto",padding:"12px 16px"}}>{words.length===0?<p style={{color:P.inkF,fontSize:".85rem",fontStyle:"italic",textAlign:"center",padding:"20px 0"}}>Tap highlighted words in the story to collect them here!</p>:words.map((w,i)=><div key={i} style={{padding:"8px 10px",marginBottom:6,borderRadius:8,background:P.yelS,border:`2px solid ${P.yel}`}}><strong style={{color:P.ink,fontSize:".9rem"}}>{w.word}</strong>{w.def&&<p style={{margin:"3px 0 0",color:P.inkS,fontSize:".8rem",lineHeight:1.4}}>{w.def}</p>}</div>)}</div></div>;}

/* ═══ AUDIO ═══ */
let aOk=false,sC,sR,sV;
async function iA(){if(aOk)return;await Tone.start();sC=new Tone.Synth({oscillator:{type:"triangle"},envelope:{attack:.01,decay:.1,sustain:0,release:.08},volume:-18}).toDestination();sR=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"sine"},envelope:{attack:.04,decay:.3,sustain:.08,release:.4},volume:-16}).toDestination();sV=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"triangle"},envelope:{attack:.04,decay:.25,sustain:.15,release:.7},volume:-14}).toDestination();aOk=true;}

/* ═══ MAIN ═══ */
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

  useEffect(()=>{try{const v=localStorage.getItem("mt6");if(v){const s=JSON.parse(v);setComp(s.c||"fox");setLvl(s.l??1);}}catch(e){}},[]);
  const save=useCallback((d)=>{try{localStorage.setItem("mt6",JSON.stringify({c:comp,l:lvl,...d}));}catch(e){}},[comp,lvl]);

  const goTo=n=>{snd(pCl);setTr(true);setBridge(null);setTimeout(()=>{setHist(h=>[...h,sid]);setSid(n);setShowCh(false);setShowCo(false);setTr(false);save({s:n,h:[...hist,sid]});},280);};
  const goBack=()=>{if(!hist.length)return;snd(pCl);setTr(true);setBridge(null);setTimeout(()=>{setSid(hist.at(-1));setHist(h=>h.slice(0,-1));setShowCh(false);setShowCo(false);setTr(false);},280);};
  const hvt=w=>{const d=sc?.vocab?.[w]||sc?.vocab?.[w.toLowerCase()]||null;setVP({word:w,def:d});setWords(p=>{if(p.find(x=>x.word.toLowerCase()===w.toLowerCase()))return p;return[...p,{word:w,def:d}];});setNbB(true);snd(pCl);};
  const hCA=async()=>{if(!cAct.trim()||!sc)return;setBLoad(true);const r=await aiBridge(gt(sc),cAct.trim(),cd.name,lvl);setBridge(r||`${cd.name} thinks about that. "Interesting idea! Let's stay focused on the clues though."`);setCAct("");setBLoad(false);};
  const start=()=>{snd(pRv);setSid("start");setHist([]);setWords([]);setNbB(false);setBridge(null);setShowCh(false);setShowCo(false);setScr("play");save({s:"start",h:[]});};

  if(scr==="home")return(
    <div style={{minHeight:"100vh",background:P.bg,fontFamily:"'Nunito',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet"/><style>{CSS}</style>
      <div style={{maxWidth:520,margin:"0 auto",padding:"28px 16px"}}>
        <Pnl mood="village" style={{marginBottom:18}}><div style={{padding:"24px 20px",textAlign:"center"}}>
          <h1 style={{fontFamily:"'Bangers',cursive",fontSize:"clamp(2rem,7vw,2.8rem)",color:P.ink,margin:0,letterSpacing:3,textShadow:`3px 3px 0 ${P.yel}`}}>MYSTERY TRAIL</h1>
          <p style={{color:P.inkS,fontSize:".95rem",margin:"6px 0 0",fontWeight:700}}>The Missing Moonstone</p>
          <p style={{color:P.inkF,fontSize:".78rem",margin:"4px 0 0"}}>A mystery in Fernwood Hollow with 3 endings to discover</p>
        </div></Pnl>
        <Pnl mood="forest" style={{marginBottom:10}}><div style={{padding:14}}>
          <h2 style={{fontFamily:"'Bangers',cursive",color:P.ink,fontSize:"1rem",margin:"0 0 8px",letterSpacing:1}}>Your Companion</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {COMPANIONS.map(c=><button key={c.id} onClick={()=>{setComp(c.id);snd(pCl);}} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 10px",borderRadius:8,cursor:"pointer",border:comp===c.id?`3px solid ${c.color}`:`3px solid ${P.bdr}`,background:comp===c.id?`${c.color}15`:P.w,boxShadow:comp===c.id?`3px 3px 0 ${P.bdr}`:"none",transition:"all .15s",textAlign:"left"}}><span style={{fontSize:24}}>{c.emoji}</span><div><strong style={{fontFamily:"'Bangers',cursive",color:P.ink,fontSize:".88rem"}}>{c.name}</strong><div style={{fontSize:".65rem",color:P.inkS}}>{c.desc}</div></div></button>)}
          </div>
        </div></Pnl>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <Pnl mood="river" style={{flex:1}}><div style={{padding:"10px 12px"}}><h2 style={{fontFamily:"'Bangers',cursive",color:P.ink,fontSize:".9rem",margin:"0 0 6px"}}>Reading Level</h2><div style={{display:"flex",gap:4}}>{LEVELS.map((l,i)=><button key={i} onClick={()=>{setLvl(i);snd(pCl);}} style={{flex:1,padding:"6px 4px",borderRadius:6,cursor:"pointer",border:lvl===i?`2px solid ${P.teal}`:`2px solid ${P.bdr}`,background:lvl===i?`${P.teal}22`:P.w,fontSize:".72rem",fontWeight:700,color:P.ink,fontFamily:"'Nunito',sans-serif"}}>{l.label}</button>)}</div></div></Pnl>
          <button onClick={()=>setSndOn(!sndOn)} style={{background:sndOn?"#95D5B2":P.w,border:`3px solid ${P.bdr}`,borderRadius:6,padding:"8px 14px",cursor:"pointer",fontFamily:"'Bangers',cursive",color:P.ink,fontSize:".85rem",letterSpacing:1,whiteSpace:"nowrap"}}>{sndOn?"🔊 On":"🔇 Off"}</button>
        </div>
        <button onClick={start} style={{width:"100%",padding:"18px",borderRadius:8,border:`3px solid ${P.bdr}`,background:P.yel,cursor:"pointer",boxShadow:`5px 5px 0 ${P.bdr}`,fontFamily:"'Bangers',cursive",fontSize:"1.15rem",color:P.ink,letterSpacing:2,transition:"all .12s"}}>🔍 START INVESTIGATING</button>
        <p style={{color:P.inkF,textAlign:"center",fontSize:".65rem",marginTop:16,fontWeight:600}}>Tap story text to skip typing. Tap highlighted words to collect them.</p>
      </div>
    </div>
  );

  const mood=sc?.mood||"village";
  return(
    <div style={{minHeight:"100vh",background:P.bg,fontFamily:"'Nunito',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet"/><style>{CSS}</style>
      <VPop word={vP?.word} def={vP?.def} onClose={()=>setVP(null)}/>
      <NBk open={nbO} onClose={()=>{setNbO(false);setNbB(false);}} words={words}/>
      <div style={{maxWidth:600,margin:"0 auto",padding:"10px 12px 36px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,gap:6}}>
          <button onClick={()=>setScr("home")} style={tB}>← Home</button>
          <div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:16}}>{cd.emoji}</span><span style={{fontFamily:"'Bangers',cursive",color:P.w,fontSize:".85rem",letterSpacing:1}}>{cd.name}</span></div>
          <div style={{display:"flex",gap:4}}>
            <button onClick={()=>setSndOn(!sndOn)} style={tB}>{sndOn?"🔊":"🔇"}</button>
            <button onClick={()=>{setNbO(true);setNbB(false);}} style={{...tB,position:"relative"}}>📖{nbB&&<span style={{position:"absolute",top:-3,right:-3,width:9,height:9,borderRadius:"50%",background:P.cor,border:`2px solid ${P.bg}`}}/>}</button>
          </div>
        </div>
        {sc&&<div style={{opacity:tr?0:1,transform:tr?"translateY(8px)":"none",transition:"all .3s ease"}}>
          <Pnl mood={mood} style={{boxShadow:`5px 5px 0 ${P.bdr}`,marginBottom:12}}>
            <SH mood={mood} title={sc.ending?(sc.endTitle||"The End!"):sid==="start"?"The Case Begins":"The Investigation"}/>
            <div style={{padding:"clamp(12px,3vw,20px)"}}>
              <div style={{fontSize:lv.fs,lineHeight:lv.lh,color:P.ink,whiteSpace:"pre-line"}}>
                <TW key={sid} text={gt(sc)} speed={14} onVT={hvt} onDone={()=>{setShowCo(true);setTimeout(()=>setShowCh(true),400);if(sc.ending)snd(pVi);else snd(pRv);}}/>
              </div>
            </div>
          </Pnl>
          {bridge&&<div style={{marginBottom:10,animation:"sU .3s ease"}}><Pnl mood={mood} style={{padding:"12px 16px",borderLeft:`4px solid ${cd.color}`}}><p style={{margin:0,fontSize:".9rem",lineHeight:1.6,color:P.inkS,fontStyle:"italic"}}>{bridge}</p></Pnl></div>}
          {showCo&&sc.companion&&<div style={{display:"flex",gap:8,alignItems:"flex-end",marginBottom:10,animation:"sU .3s ease"}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:cd.color,border:`3px solid ${P.bdr}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,boxShadow:`2px 2px 0 ${P.bdr}`}}>{cd.emoji}</div>
            <SBub><p style={{margin:0,fontSize:".88rem",lineHeight:1.5,color:P.inkS}}><strong style={{color:cd.color,fontFamily:"'Bangers',cursive",letterSpacing:.5}}>{cd.name}: </strong>"{sc.companion.replace(/\{C\}/g,cd.name)}"</p></SBub>
          </div>}
          {showCo&&sc.question&&<div style={{marginBottom:10,animation:"sU .3s ease"}}><Pnl mood={mood} style={{padding:"10px 14px",borderLeft:`4px solid ${cd.color}`}}><p style={{margin:0,fontSize:".85rem",color:P.ink,fontWeight:700,lineHeight:1.4}}>🤔 <em>{sc.question}</em></p></Pnl></div>}
          <div style={{opacity:showCh?1:0,transform:showCh?"translateY(0)":"translateY(8px)",transition:"all .4s ease",pointerEvents:showCh?"auto":"none"}}>
            {sc.ending?<div>
              <Pnl mood="celeb" style={{padding:16,textAlign:"center",marginBottom:10,boxShadow:`4px 4px 0 ${P.bdr}`}}>
                <p style={{fontFamily:"'Bangers',cursive",color:P.ink,fontSize:"1.15rem",margin:"0 0 6px",letterSpacing:1}}>🎉 {sc.endTitle} 🎉</p>
                <p style={{color:P.inkS,fontSize:".93rem",margin:0,lineHeight:1.5}}>{sc.endMessage}</p>
              </Pnl>
              {words.length>0&&<button onClick={()=>setNbO(true)} style={{...cB,textAlign:"center",background:P.yelS,marginBottom:8,width:"100%"}}>📖 Review your {words.length} word{words.length>1?"s":""}!</button>}
              <div style={{display:"flex",gap:8}}><button onClick={start} style={{...cB,flex:1,textAlign:"center"}}>🔄 Play Again</button><button onClick={()=>setScr("home")} style={{...cB,flex:1,textAlign:"center",background:P.cr}}>← Home</button></div>
            </div>:<div style={{display:"flex",flexDirection:"column",gap:7}}>
              {(sc.choices||[]).map((c,i)=><button key={i} onClick={()=>goTo(c.next)} style={{...cB,animationDelay:`${i*.06}s`}}>{c.text}</button>)}
              {hist.length>0&&<button onClick={goBack} style={{...cB,background:P.cr,fontSize:".85rem",boxShadow:"none",border:`2px solid ${P.bdr}30`}}>⬅️ Go back</button>}
              <div style={{display:"flex",gap:6,marginTop:2}}>
                <input value={cAct} onChange={e=>setCAct(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")hCA();}} placeholder="Or type your own action..." disabled={bLoad} style={{flex:1,padding:"9px 12px",borderRadius:8,fontSize:".88rem",fontFamily:"'Nunito',sans-serif",border:`2px solid ${P.bdr}25`,background:P.bgD,color:P.w,outline:"none",fontWeight:600}}/>
                <button onClick={hCA} disabled={bLoad||!cAct.trim()} style={{...tB,padding:"9px 13px",opacity:cAct.trim()?1:.3,fontSize:"1rem"}}>➤</button>
              </div>
              {bLoad&&<p style={{color:P.inkF,textAlign:"center",fontSize:".78rem",margin:"2px 0"}}>{cd.name} is thinking... ✨</p>}
            </div>}
          </div>
        </div>}
      </div>
    </div>
  );
}
const cB={background:P.w,border:`3px solid ${P.bdr}`,borderRadius:8,padding:"11px 14px",fontSize:"clamp(.84rem,2.4vw,.96rem)",fontFamily:"'Nunito',sans-serif",fontWeight:700,color:P.ink,cursor:"pointer",textAlign:"left",boxShadow:`3px 3px 0 ${P.bdr}`,transition:"all .12s",lineHeight:1.5,animation:"sU .3s ease both"};
const tB={background:P.bgD,border:`2px solid ${P.bdr}55`,borderRadius:8,padding:"4px 9px",color:P.w,fontFamily:"'Bangers',cursive",fontSize:".8rem",cursor:"pointer",letterSpacing:.5};
const CSS=`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes sU{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes popIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}button:hover{transform:translateY(-1px)}button:active{transform:translateY(2px)!important;box-shadow:1px 1px 0 ${P.bdr}!important}*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}body{margin:0}input::placeholder{color:rgba(255,255,255,.3)}`;
