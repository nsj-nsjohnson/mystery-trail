import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";

/* ═══════════════════════════════════════════════════
   MYSTERY TRAIL — The Hollowmist Bell
   Gravity Falls aesthetic, dry wit, earned dread.
   One companion: Corvid, a raven who knows things.
   ═══════════════════════════════════════════════════ */

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

/* ═══ THE COMPANION ═══
   Corvid: black raven, dry wit, knows too much,
   affectionate the way cats are — rarely, and pointedly.
   Cocks his head. Preens. Lands on shoulders.
   Pecks at things of interest. Does NOT sniff. */

/* ═══ THE HOLLOWMIST BELL ═══ */
const S = {
start: {
  text: `The bus left you at the edge of Hollowmist just as the sun was bleeding out behind the pines.

You dragged your suitcase down Main Street, wheels rattling over cobblestones that did not all sit flat. Half the shops were shuttered. A lamppost flickered, steadied, flickered again. The wind carried the smell of wet leaves and old pennies, and under that, something you could not name but your shoulders noticed anyway.

Corvid landed on your suitcase with a soft thump of black feathers. Your aunt's raven. She had written to say he would meet you at the station, and here he was, watching you with eyes the color of polished coal. "Right on time," he said, because Corvid spoke when it suited him, which was always. "Disappointing. I was hoping for an excuse to fly back without you."

Great-Aunt Viola's house stood at the top of Thornberry Lane, three stories of crooked gables and too many windows. The garden was thick with plants you did not recognize, and one of them, you would later swear, turned its petals to follow you as you passed. The front door swung open before you could knock. Aunt Viola stood there, small and sharp-eyed, gray hair coming loose from its pins.

"You're late," she said. "Marmalade is missing. The bell rang **thirteen** last night. Come in, wipe your feet, tea is hot."

She vanished down the hall. Corvid **alighted** on the doorframe. "She does that," he said, almost kindly. "Introductions are not a thing she does."`,
  vocab: { thirteen:"In Hollowmist, the number that means something is wrong.", alighted:"Landed gently, the way a bird settles on a branch" },
  companion: `A word of advice. When your aunt says the bell rang thirteen, she does not mean she miscounted.`,
  question: null,
  choices: [
    { text: "Follow Aunt Viola into the kitchen", icon: "🍵", next: "kitchen" },
    { text: "Ask Corvid what thirteen means", icon: "🔔", next: "corvid_thirteen" },
  ],
},

corvid_thirteen: {
  text: `Corvid **regarded** you for a long moment. Ravens can do this. They can look at you the way a teacher looks at a student who has asked a question with an obvious answer, and you suddenly wish you had asked a better one.

"The bell," he said, "rings twelve at midnight. That is the arrangement. It has been the arrangement for four hundred years. Twelve means the night will pass as nights do: you will wake in your bed, the milk will not sour, the cat will come home for breakfast."

He cocked his head, first to one side, then the other, black eye catching the light. "Thirteen is what rings when something has been moved. A door is a door because it is closed. A thirteenth chime means a door was opened."

From the kitchen, Aunt Viola shouted, "CORVID. Are you **editorializing** out there?"

"Yes," Corvid called back, without looking away from you. "Extensively." He lifted off your suitcase in one clean motion and flew down the hall, and you followed, because there was nothing else to do and you were beginning to suspect there was no going back.

The kitchen smelled of something green and something burnt and something your grandmother used to make. Aunt Viola was standing at a table buried in open books, a teacup in one hand, a magnifying glass in the other. "Sit down," she said, without looking up. "We have until midnight tomorrow, and I am going to need your help."`,
  vocab: { regarded:"Looked at someone carefully and thoughtfully", editorializing:"Adding your own opinions to something that was supposed to be just the facts" },
  companion: `She will explain the rest. Try not to look rattled. It encourages her.`,
  question: null,
  choices: [
    { text: "Sit down and ask what she needs", icon: "🪑", next: "kitchen" },
  ],
},

kitchen: {
  text: `Aunt Viola finally looked up at you. Her eyes were pale and very alert, the kind that missed nothing. She set down the magnifying glass.

"Marmalade is my cat," she said. "Except she is not a cat. She is what keeps the shape of a cat because that is easier for everyone. Marmalade did not come home for breakfast. Marmalade has come home for breakfast every morning for nineteen years, whether or not I set the food down, whether or not I am awake, whether or not the weather permitted it. When I tell you Marmalade did not come home this morning, I am telling you that something ate the morning."

She pushed a leather-bound notebook across the table toward you. The cover was worn smooth. Small symbols were pressed into the leather, shapes that looked familiar for reasons you could not place.

"This is the **Field Journal**," Aunt Viola said. "Forty years of notes. My aunt started it. I continued it. It contains everything I know about this town, which is a great deal, and everything I do not know, which is also a great deal. You are going to help me figure out what happened last night, because Corvid told me you were a **reliable** sort, and because I am running out of time and Keepers with sense."

Corvid, from the windowsill, clicked his beak once. It might have been agreement. It might have been a cough.

"Now," Aunt Viola said. "I have three places you could go first, and three things you could learn at each. Listen carefully."`,
  vocab: { field:"The notebook a researcher uses in the actual place they're studying, not at a desk", reliable:"Someone you can count on to do what they say" },
  companion: `She means it about being reliable. I told her. Try to live up to it.`,
  question: null,
  choices: [
    { text: "The bell tower, where the thirteen was struck", icon: "🔔", next: "tower" },
    { text: "The Field Journal itself, starting with the newest pages", icon: "📓", next: "journal_first" },
    { text: "Into town, to see who noticed the thirteen", icon: "🏘️", next: "town" },
  ],
},

tower: {
  text: `The bell tower stood at the center of Hollowmist, a crooked finger of dark stone pointing at a sky that had gone the color of **slate**. You had the strong impression, walking toward it, that the tower was the oldest thing in the town, and that the town had been built around it because the tower insisted.

The door at the base was shut. Corvid landed on the handle and looked at you meaningfully. You pushed. The door swung open on hinges that did not creak, which felt wrong.

Inside: a spiral staircase, stone, winding up into dark. The walls were covered in tally marks. You stopped to look. Not graffiti. These were organized, dated, in different handwritings across different eras. Some marks were centuries old. Someone had been counting here for a very long time, and whatever they were counting had not stopped.

At the top: the bell chamber. A single iron bell the size of a dinner table hung from thick chains. Beside it, on a wooden **lectern**, lay a ledger, open. Rows of neat pencil entries, one per night. 12. 12. 12. 12. Sometimes a date was circled. Those nights, a note was pinned to the page: a news clipping, a pressed leaf, a feather. Keeping count of something.

Then: last night's entry. "13." Written in a different ink. Not black. Rust-colored. Thin.

"That is not ink," Corvid said, **alighting** beside it. He studied the entry with the professional calm of someone who had seen bad things and had opinions about them. "That is blood. I cannot tell you whose."`,
  vocab: { slate:"A dark gray color, like the stone used for old chalkboards", lectern:"A tall stand you put a book on to read from", alighting:"Landing gently" },
  companion: `Whoever wrote this did it AFTER ringing the bell. Not from injury. From intent. That is a message.`,
  question: `If last night's entry was written in blood instead of ink, what might that tell you about whoever rang the bell?`,
  choices: [
    { text: "Search the chamber for what else they left", icon: "🔍", next: "tower_feather" },
    { text: "Check the ledger for other thirteens", icon: "📖", next: "tower_ledger" },
  ],
},

tower_feather: {
  text: `You crouched and began to work through the chamber methodically. Aunt Viola's voice came back to you: \`A good search is slow. A fast search finds nothing worth having.\`

Corvid watched you work, which was a feeling like being graded.

In the far corner, where the stone floor met the wall at an awkward angle, something caught the gray light coming through the slit window. You picked it up carefully. It was a feather, long and narrow, the deep black of wet coal. It did not **glint**. It seemed, if anything, to drink the light. And it was cold. Not cool. Cold, like it had been sitting in an icebox all morning.

Corvid went very still. This was, you realized, a raven's equivalent of a gasp.

"Put that down," he said softly. "Carefully. Not dropping it. Setting it down."

You set it down on the lectern.

"That is not a feather from any bird I know," Corvid said, which was a remarkable admission from a raven. "And I know most of them. It's cold because it is not fully here. Part of it is somewhere else, and the part that is somewhere else is cold because that somewhere else is a place you do not want to visit."

He hopped a careful distance from it. "We are going to wrap that in cloth and bring it to your aunt. We are going to do so without touching it again with our bare hands. And then we are going to find out, very quickly, what manner of creature **sheds** such a thing."`,
  vocab: { glint:"Shine with a brief, sharp flash of light", sheds:"Loses naturally, the way a dog loses fur or a tree loses leaves" },
  companion: `I was hoping to be wrong. I am rarely hoping to be wrong. We are, as your human generation says, in it.`,
  question: null,
  choices: [
    { text: "Bring the feather to Aunt Viola", icon: "🪶", next: "feather_home" },
    { text: "Search the ledger first for matching nights", icon: "📖", next: "tower_ledger" },
  ],
},

tower_ledger: {
  text: `You flipped back through the ledger, page by careful page. Not casually. Methodically. Corvid stood on the edge of the lectern and watched, and every so often tapped the paper once with his beak when you were about to turn past something he wanted you to see.

Most nights were 12. Most nights, for years. But every so often, buried in the decades, there it was: 13. And every thirteen had a note pinned beside it.

The one from 1962 was a dried violet and a single word: **Thornwick**.

The one from 1987 was a news clipping about a barn fire three towns over, and the note said: "Wrong house. Recovered."

The one from 2004 was a polaroid of a child, smiling. The note said: "Edwin. Twelve years old. Seen again on the thirteenth of the following month. Uninjured. Could not recall a single day of the missing time."

You counted back. Every thirteen was years apart. And you were looking at a pattern.

"Your aunt knows about all of these," Corvid said. "She will tell you what they are if you ask. But I will spoil the **premise**, because we do not have time for **dramatic** reveals. Something in this town tries to open a door, every few decades, and your aunt and the Keepers before her have closed it every time. Last night, it tried again. We are inside the window in which she has to close it."

He turned his head and fixed you with one black, **depthless** eye. "And Marmalade is the door."`,
  vocab: { premise:"The main idea or starting point of a story", dramatic:"Full of big emotion or suspense, like theater", depthless:"So deep you cannot see the bottom" },
  companion: `I promised your aunt I would not over-explain. I am breaking that promise. You needed context. You may thank me later.`,
  question: null,
  choices: [
    { text: "Go home and find Aunt Viola immediately", icon: "🏠", next: "feather_home" },
  ],
},

feather_home: {
  text: `You wrapped the cold feather in a clean handkerchief from your pocket and walked home with it held carefully in both hands. The mist in the streets moved strangely, the way water moves in a bathtub when someone steps in across the room.

Aunt Viola was at the kitchen table when you pushed through the door. She looked at your face, looked at the bundled handkerchief, and set down her teacup slowly, as if a sudden movement might make the news change.

"Show me," she said.

You unwrapped the feather on the table. Aunt Viola did not touch it. She studied it for a long moment through her magnifying glass, tilting her head to one side, then the other, and at the end of the study she did something you had not expected. She closed her eyes. It was, you realized, a small act of **grief**.

"Blackthorn," she said finally. "He is back. Or a cousin of his. The feathers are always cold. They always will be."

She opened the Field Journal to a specific page without having to look at the index. A sketch filled the page: a tall thin figure in a black coat, sharp-featured, standing too straight. A name was written underneath in her neat **copperplate** hand: **The Walker in the Mist**. "I met one when I was your age. He took my great-aunt Helena. Helena was a Keeper. He did not get the door open. She stopped him. She did not come back from stopping him."

She looked at you. Her eyes were dry. She was not going to pretend, with you, that this was small.

"If you want to go home, I will understand. I will put you on a bus tonight and your mother will never know there was a choice to make. But I am asking, **formally**, if you will help me."`,
  vocab: { grief:"The sadness of losing someone or something important", copperplate:"A very neat, old-fashioned way of writing, with careful curves", formally:"In an official or serious way, not casually" },
  companion: `She will not ask twice. I have known her for thirty years. She will not ask twice.`,
  question: null,
  choices: [
    { text: "Yes. Help her.", icon: "🤝", next: "agree" },
  ],
},

agree: {
  text: `"Yes," you said.

Aunt Viola nodded once, a small, professional nod, the kind you give someone who has just become a colleague.

"Good," she said. "Then we have work. Corvid, I need you in the air before dark. Watch the south road and the old cemetery. He will move between them. Report back by six."

Corvid dipped his head. "On the wing." He was out the window before she finished the sentence.

"You," Aunt Viola said to you, "are going to go into town and find three specific people. Old Wiggins at the bell tower. He rang the bell last night, and I want to know what he saw before he went home. Miss Lune the clockmaker. She **maintains** the bell mechanism, and if the bell rang thirteen it means something was **tampered** with, and she will know what. And Mr. Pips the postman. He delivers to everyone. If someone new has been in town, asking the wrong sorts of questions, Pips will have noticed."

She tapped the Field Journal. "You are not trying to solve the whole thing today. You are trying to **gather**. Bring me pieces. I will assemble. We have until midnight tomorrow, which is when he will try for the second Warden."

"The second Warden?" you asked.

"Marmalade was the first. There are three. If he takes all three, the door is no longer a door. It is an **opening**. And what is on the other side comes through." She smiled, a small grim smile. "But we will not allow that. Because you and I are going to stop him. **Go**."`,
  vocab: { maintains:"Keeps something in good working order", tampered:"Messed with on purpose, usually to cause harm", gather:"Collect things bit by bit", opening:"A gap or hole that things can move through" },
  companion: null,
  question: `Three people to visit. Which one do you want to start with?`,
  choices: [
    { text: "Old Wiggins at the bell tower", icon: "🔔", next: "wiggins" },
    { text: "Miss Lune the clockmaker", icon: "⏰", next: "lune" },
    { text: "Mr. Pips the postman", icon: "📮", next: "pips" },
  ],
},

wiggins: {
  text: `You climbed the spiral staircase for the second time that day. Corvid was not with you; he had work of his own. Your footsteps echoed off the stone walls in a way that made you feel watched, though you could not say by what.

Old Wiggins was in the bell chamber, working a cloth over the great iron bell with slow, steady strokes. He was bent with age, his white hair in unruly tufts, his coat three sizes too big for him. He did not look up as you approached. He had heard your footsteps coming up the stairs, and he had decided, apparently, not to be surprised.

"Viola's niece," he said, and it was a statement, not a question. "She's finally got herself one, then. I was beginning to wonder."

"Mr. Wiggins, I need to ask you about last night."

He stopped polishing. He looked at you for the first time, and his eyes were pale blue and disturbingly clear for a man who looked old enough to remember the town being built.

"I rang it twelve," he said. "I always ring it twelve. I have rung it twelve every night for fifty-three years, including the night my wife died and the night my son was born and the night the **deluge** took out the eastern road. Twelve, child. I did not ring thirteen. I went home at ten past midnight. The door was locked behind me. I heard the thirteenth chime from my front porch as I was taking off my boots, and I sat down on the step and I cried, because I knew what it meant, and I knew I would have to tell your aunt in the morning."

He set down his cloth. "Whoever rang that bell came in AFTER I locked up. And there are only two keys. Mine." He patted his coat pocket. "And the **spare** in the Mayor's office, which I have not seen moved in forty years."`,
  vocab: { deluge:"A huge flood or downpour of rain", spare:"An extra one of something, kept in case you need it" },
  companion: null,
  question: `If only two keys exist, and Wiggins's was with him all night, what does that tell you?`,
  choices: [
    { text: "Check the Mayor's office about the spare key", icon: "🗝️", next: "mayor_key" },
    { text: "Ask Wiggins what he saw just before the thirteenth chime", icon: "👁️", next: "wiggins_saw" },
  ],
},

wiggins_saw: {
  text: `"Think back," you said. "Between twelve and thirteen. Did you hear anything? See anything?"

Old Wiggins closed his eyes. He was quiet for a long time. Long enough that you began to wonder if he had fallen asleep standing up, which Aunt Viola had warned you he sometimes did. Then, without opening his eyes, he spoke.

"A bird," he said. "A big one. I heard wings. I thought it was Corvid at first, that nosy bird your aunt **associates** with, so I didn't think anything of it. But Corvid's wings make a particular sound when he's close. These were quieter. Slower. Wrong, somehow, though I couldn't say why at the time."

He opened his eyes. "And a smell. Like **brimstone** but thinner. Like a match that had been struck but not lit. I thought it was the wind off the old smelter. But there hasn't been a smelter in Hollowmist in eighty years."

He shook his head slowly. "I walked past the tower door on my way home. I remember looking at it. It was locked. I know because I tried the handle myself, which I always do, because I am a man who double-checks things. Whoever rang that bell did not come through the door. I can tell you that for a **certainty**."

You stood there, working through it. Wings in the dark. A thin sulphur smell. A locked door that had stayed locked.

"He didn't use the door," you said slowly.

"No, child. He did not use the door." Old Wiggins's pale eyes were bright and hard. "And that is the thing that has me most afraid. Because if he did not need a door, I do not know what he did use."`,
  vocab: { associates:"Spends time with, or is connected to", brimstone:"An old word for sulfur — it has a sharp, burnt-match smell", certainty:"Complete confidence that something is true" },
  companion: null,
  question: null,
  choices: [
    { text: "Go to Miss Lune the clockmaker", icon: "⏰", next: "lune" },
    { text: "Go to Mr. Pips the postman", icon: "📮", next: "pips" },
    { text: "Go home and tell Aunt Viola", icon: "📓", next: "report_home" },
  ],
},

mayor_key: {
  text: `The Mayor of Hollowmist was a badger named Felix Pemberton. He had held the office for twelve years on the strength of being **relentlessly** inoffensive and a willingness to approve whatever the Town Council voted on.

He was also, it turned out, surprisingly helpful.

"The spare key to the bell tower?" he said, blinking at you from behind a desk stacked with unopened mail. "Of course. It's in the, ah." He rummaged in a drawer. Rummaged in another. Checked a hook on the wall, frowning. His expression changed slowly, the way a man's expression changes when he realizes he has left the stove on.

"It's not where I keep it," he said.

"When did you last see it, Mayor?"

"A month ago. Maybe six weeks. Someone came in asking about the history of the tower. Said they were writing a book. Tall fellow. Black coat. I walked him over to the tower myself to show him the mechanism. He asked if I had a key. I showed him the spare, here, in this drawer." He looked up, and his pleasant badger face had gone the color of old milk. "Oh no. Oh, dear. Oh, child, I think I have made a **terrible** mistake."

You did not rush him. You waited, the way Aunt Viola waited. After a moment, Mayor Pemberton sat down heavily and put his head in his paws.

"I think I showed a thief where I kept the key."`,
  vocab: { relentlessly:"Without ever stopping", terrible:"Extremely bad, causing great harm or fear" },
  companion: null,
  question: null,
  choices: [
    { text: "Ask the Mayor for details about the visitor", icon: "👤", next: "mayor_details" },
    { text: "Go straight home with this information", icon: "🏠", next: "report_home" },
  ],
},

mayor_details: {
  text: `"Everything you remember, Mayor. Please."

Felix Pemberton took a long breath. "He was tall. Thin. Very formal. He wore a black coat that was, how do I put this, slightly **too** black. Do you know what I mean? The way a shadow has more black in it than a shirt does. His coat was like the shadow kind."

He paused, remembering.

"His voice was pleasant. Pleasant is the word I kept coming back to. He was never anything but pleasant, and I could not stop feeling nervous the entire time he was in this office. He asked good questions. He asked about the bell. He asked about the old mining days. He asked about, ah, he asked about **Thornwick**."

You went still. So did he. Neither of you spoke for a moment.

"I should have known," the Mayor said quietly. "The only people who ask about Thornwick are people who should not be asking about Thornwick. There is a reason the rest of us do not talk about it. But he had this way of making questions sound like he already knew the answer and was just checking your **sources**."

He reached into his desk and took out a small card. A calling card, thick cream paper. He passed it across the desk to you.

It read, in black ink: **E. BLACKTHORN. Antiquarian. By appointment.**

"I don't know where he's staying," the Mayor said. "I don't even know if the card is real. But that is what he gave me, and that is all I have."`,
  vocab: { too:"More than is needed or wanted", sources:"The places information comes from" },
  companion: null,
  question: null,
  choices: [
    { text: "Take the card and go home to Aunt Viola", icon: "🏠", next: "report_home" },
    { text: "Visit Miss Lune before heading back", icon: "⏰", next: "lune" },
  ],
},

lune: {
  text: `Miss Lune's clockmaker shop sat between the bakery and the haberdasher's, a narrow storefront with a window full of pocket watches, none of which agreed with each other about the time.

Inside was a low, organized **cacophony**. Grandfather clocks ticking slightly out of sync. Cuckoo clocks waiting, patient as cats, for their appointed hour. A workbench under a green-shaded lamp where tiny gears were laid out on black velvet like jewelry in a display case.

Miss Lune was tall and thin, her dark hair in a severe braid, a watchmaker's loupe pushed up on her forehead. She looked up when you entered, saw your face, and crossed to lock the door behind you.

"Viola told me you might come," she said. "She sent a bird. I appreciate when she sends a bird. Sit. Tea?"

You sat. You declined the tea. Miss Lune seemed to approve of this.

"The bell," she said, without preamble. "Can't ring thirteen. The mechanism allows twelve strikes. On the twelfth, a reset lever engages and the striker is locked out until midnight the following night. You could jump up and down on the mechanism and you would not get a thirteenth strike. The bell rang thirteen last night, which means that someone reached up and struck it by hand, after Wiggins went home. That part you already know. Here is the part you do not."

She reached under her workbench and set a small object on the velvet. It was a bronze **cog**, no larger than a thumbnail, with teeth so fine they looked drawn rather than cut.

"This was wedged into the striker assembly. It does not belong to the bell. It belongs to a thing called a Stillwatch. A Stillwatch is a device for **suspending** a single second of time. It can be held open for as long as its owner breathes. Whoever used this in the bell mechanism was slowing the reset lever, one second, over and over, until they had rung the bell a thirteenth time. It is **extraordinarily** advanced work. There are perhaps four clockmakers in the world who could build one, and three of them have the decency to be dead."`,
  vocab: { cacophony:"A mess of loud noises all happening at once", cog:"A gear wheel, with teeth that fit into another gear", suspending:"Pausing or holding something still", extraordinarily:"Extremely, unusually so" },
  companion: null,
  question: null,
  choices: [
    { text: "Ask who the fourth clockmaker is", icon: "❓", next: "lune_fourth" },
    { text: "Take the cog and go home", icon: "🏠", next: "report_home" },
  ],
},

lune_fourth: {
  text: `Miss Lune smiled. It was not a warm smile. It was the smile of a person who had just been asked the question they had been waiting for.

"His name is Erasmus Blackthorn. He calls himself an antiquarian, which is the word **people** use when they do not want to say what they really do. He has been coming through towns like ours for a very long time. Every fifty years or so, something odd happens in a small town and then the town is not there anymore, and the few of us who keep track of such things find a dropped cog, or a scrap of black feather, or a smell like struck matches. It is always him. It has been him for longer than I want to guess."

She picked up the cog and turned it slowly in the lamplight.

"I have never seen him. I have seen his work, which is a different kind of knowing. I could identify his **craftsmanship** out of a pile of ten thousand broken watches. This cog is his. I would stake my shop on it."

She set the cog down and pushed it toward you across the velvet.

"Take it to Viola. Tell her I said he is already building something bigger. A Stillwatch used once, in a bell tower, is a small thing. But he had to grind that cog to use in the bell, which means he has a Stillwatch somewhere that is now missing its smallest tooth. When he replaces the tooth, the Stillwatch will work again. And he will use it for whatever the **larger** plan is."

She walked you to the door. Before she unlocked it, she put one long, careful hand on your shoulder.

"Be clever, child. He has played this game longer than any of us have been alive. The only Keepers who ever stopped him were the ones who refused to play it his way."`,
  vocab: { people:"Everyone in general, as in 'people say'", craftsmanship:"The skill of someone who makes things carefully by hand", larger:"Bigger" },
  companion: null,
  question: `Miss Lune says 'refuse to play it his way.' What might that mean? What IS his way?`,
  choices: [
    { text: "Go to Mr. Pips before heading home", icon: "📮", next: "pips" },
    { text: "Go home to Aunt Viola", icon: "🏠", next: "report_home" },
  ],
},

pips: {
  text: `The Hollowmist post office was a single narrow room with a counter, a sorting rack, and a squirrel in a green uniform three sizes too big. Mr. Pips had been the postman for eleven years, and his nervous energy had not **diminished** in that time. He talked with his whole body. He talked with both paws. He sometimes talked while sorting mail and arranged all the letters in the wrong order and had to start over.

"Viola's niece! I heard. Word travels. Word travels like water in a gutter in this town, you would not believe. What can I do for you?"

"I need to know if anyone new has been in Hollowmist in the last month or two. Someone who asked questions. Someone who made you notice them."

Mr. Pips stopped sorting. His whiskers twitched.

"Yes," he said, and his voice went lower. "Yes. There is a man. A gentleman. He does not receive mail, which is the first thing I noticed, because I know who receives mail in this town. Every person. Every box. He has not sent a letter and he has not received one, and he is apparently staying at the Hollowmist Inn, which means he pays his bill in cash, because no one has wired him any money, which I would know."

He leaned across the counter.

"He has asked me three separate times, on three separate days, if I deliver mail to your aunt. And each time he has tried to ask it **casually**, like it was small talk, and each time he has failed. I lied to him. I told him I didn't know your aunt. He knew I was lying. I knew he knew. We both smiled at each other. It was the worst three conversations I have had in my life."

Mr. Pips's paws were trembling. He clasped them together to stop it.

"He is watching your aunt's house, child. I am sure of it. I see him on the edge of the lane in the evenings, pretending to look at the garden. I would have told her myself, but I was afraid he would know I had told her, and I would be next. I am not proud of this. I am telling you now because you can bring this news faster than I can, and I am hoping, very much, that she already knows."`,
  vocab: { diminished:"Gotten smaller or less intense", casually:"In a relaxed, not-important way" },
  companion: null,
  question: null,
  choices: [
    { text: "Thank Mr. Pips and hurry home", icon: "🏠", next: "report_home" },
  ],
},

report_home: {
  text: `You spread everything on the kitchen table in front of Aunt Viola. The bronze cog from Miss Lune. The calling card from the Mayor. The cold feather from the tower, still in its handkerchief. Your notes on Wiggins and the wings and the brimstone smell. Mr. Pips and the man watching the house.

Corvid was already back, perched on the kitchen lamp, preening one wing with the focused attention of someone pointedly not listening so that he could listen better.

Aunt Viola assembled the evidence the way she drank tea: slowly, attentively, without wasted motion. She looked at the cog. She looked at the card. She spent a long time looking at the feather. When she was done, she sat back in her chair and closed her eyes for a count of three.

"Erasmus Blackthorn," she said. "He's aged. I suppose we all do. Corvid, he's watching the house."

"I noticed on my rounds," Corvid said, without looking up from his feathers. "He was behind the hawthorn hedge at fourteen minutes past five. He thought he was clever. He was not. I circled at a height of thirty feet, which is well above his line of sight, and watched him watch nothing happen for eleven minutes before he left."

Aunt Viola nodded slowly. "Good. Then we have until tomorrow night, and we know his pattern. He took Marmalade using the Stillwatch and the feather. He is preparing something bigger for the second Warden." She looked up at you, and her eyes were bright with something you could not immediately name, something between fear and satisfaction.

"You did well today," she said. "Better than I hoped. I am going to tell you things now. Old things. Because you have **earned** them, and because you cannot help me with tomorrow night unless you know what we are actually fighting."`,
  vocab: { earned:"Got something because of what you did, rather than because it was given to you" },
  companion: `She has been waiting, I think, for someone to earn this conversation. Listen carefully. She does not repeat herself.`,
  question: null,
  choices: [
    { text: "Listen.", icon: "👂", next: "lore" },
  ],
},

lore: {
  text: `Aunt Viola spread the Field Journal open to its middle, where a double page had been filled, decades ago, with a hand-drawn map of Hollowmist. Except the map had a second layer, inked in silver. You had to tilt the page in the lamplight to see it: a net of fine silver lines crisscrossing the town, meeting at three specific points.

"Hollowmist is a **seal**," she said. "The town sits on top of a thin place, a seam where our world does not quite meet the world behind it. The thin place has been here longer than the town, longer than the language we are speaking in. The people who founded Hollowmist knew about it. They built the town on top of it on purpose. They made a bargain."

She tapped the three silver points.

"Three Wardens. Three ancient creatures who agreed to hold the seam shut, in exchange for being allowed to live quietly in this world. Each of them wears a **mundane** shape to walk among us. A cat named Marmalade. An owl that lives in the oldest pine on Hunter's Ridge. A crow who nests in the chimney of the old schoolhouse. As long as all three are in Hollowmist, the seam holds. Remove one, and the seam weakens. Remove two, and the seam **strains**. Remove three, and the seam opens. And what is on the other side, child, does not politely wait its turn."

She let that sit.

"Blackthorn has taken one. He will try for the second tomorrow at midnight. The pattern is his pattern, fifty years running. The owl is next, because the owl is closest to the edge of town, and Blackthorn works in order of **accessibility**. He will not come to the house. He will go to Hunter's Ridge. That is where we will be waiting."

Corvid shifted on the lamp. "I have scouted Hunter's Ridge. There is a flat stone in a clearing where he will have to do the ritual. I recommend we set up there. I also recommend we do not die."

"Noted," said Aunt Viola.`,
  vocab: { seal:"Something that keeps a door closed or a secret kept", mundane:"Ordinary, normal, everyday", strains:"Is stretched almost to the point of breaking", accessibility:"How easy something is to reach" },
  companion: `The owl's name, by the way, is Silvia. She hates being called 'The Owl.' She will correct you. Try to remember.`,
  question: `The crow is the third Warden. If we stop Blackthorn at the owl, the crow stays safe. What happens if we don't?`,
  choices: [
    { text: "Ask what the ritual actually is", icon: "🔣", next: "ritual" },
    { text: "Ask how to stop Blackthorn specifically", icon: "⚔️", next: "weakness" },
  ],
},

ritual: {
  text: `"He has a **vessel**," Aunt Viola said. "Think of it like a jar. It is made of a glass that does not exist in this world, and it holds one piece of the seam at a time. When he draws a Warden into the vessel, he is not hurting them, exactly. He is moving them somewhere they cannot return from without his permission. And then he carries the vessel out of Hollowmist, and the thin place tears a little further."

She turned a page. A sketch of a small glass bottle, the size of a fist, with what looked like smoke or light trapped inside.

"The ritual takes time. It takes seven minutes and twenty seconds from start to finish, which is not an **arbitrary** number. It is the length of time the seam can be held ajar safely. If he is interrupted before he finishes, the Warden is not taken. If he is interrupted after he finishes but before he leaves Hollowmist with the vessel, the Warden is not taken. The vessel must leave the town boundary for the seal to weaken. This is good news for us."

She tapped the sketch of the vessel.

"The vessel is his only **conduit**. It is the whole game. If we break the vessel while he is in the middle of the ritual, the Warden snaps back to her body, he is cut off from the seam, and he is **banished** back across. The vessel is the thing we are going after. Not him. The vessel."

Corvid made a sound that might have been a laugh. "She is describing a plan. The plan is: **throw a rock at a bottle**."

Aunt Viola gave him a long, patient look. "The plan is: throw the correct object, at the correct moment, at a bottle that only stays in one place for seven minutes and twenty seconds a night. The object in question must be iron. Iron grounds the thing he is. It breaks the vessel and **severs** him at the same time."`,
  vocab: { vessel:"A container, usually for holding liquids", arbitrary:"Chosen without a real reason", conduit:"A channel that lets something pass through", banished:"Forced to leave a place and not allowed to come back", severs:"Cuts in two, separates completely" },
  companion: `Iron. Rock. Bottle. Seven minutes twenty seconds. I have heard worse plans. Once.`,
  question: null,
  choices: [
    { text: "Ask how to make sure we succeed", icon: "🎯", next: "plan" },
    { text: "Ask what happens if we fail", icon: "⚠️", next: "weakness" },
  ],
},

weakness: {
  text: `"Blackthorn is not invincible," Aunt Viola said. "If he were, none of us would be here. Keepers have stopped him eight times in the last four hundred years. His weakness is the vessel. Break the vessel while he is using it, and he is **undone**."

"How do we break it?" you asked.

"Iron," she said. "Ordinary cold iron. The metal of plows and horseshoes and nails. Anything forged from iron ore by someone who meant to make a useful thing will do. He cannot abide iron. A single iron nail, thrown with intent, will shatter his vessel the way a hammer shatters a wineglass."

She reached into a drawer and pulled out a long, rust-brown nail, heavy for its size. She set it on the table between you.

"This was my great-aunt Helena's. She had it with her the night she **confronted** him. She did not get the chance to use it." Aunt Viola's voice was flat, the way a very still lake is flat. "I want you to have it. Because I am going to be on Hunter's Ridge tomorrow night, and I am going to be as close to Blackthorn as the Keeper has to be, and you are going to be hidden in the trees with Corvid, and when the moment comes, you are going to throw this at the vessel, and you are not going to miss."

You picked up the nail. It was colder than the room. It was heavier than something its size should be.

"What happens if I miss?" you asked.

"Then he takes the owl," Aunt Viola said. "And we try again tomorrow, for the crow, with one fewer Warden holding the seam. And I will have to do something I have spent my life avoiding."

Corvid was watching you both. He did not speak. His silence felt **deliberate**.`,
  vocab: { undone:"Taken apart, defeated, no longer whole", confronted:"Faced someone directly, especially in a challenge", deliberate:"On purpose" },
  companion: `Do not miss. I say this with affection.`,
  question: null,
  choices: [
    { text: "Let's make the plan.", icon: "📋", next: "plan" },
  ],
},

plan: {
  text: `You spent the rest of the evening in the kitchen, working through it.

Corvid sketched the Hunter's Ridge clearing on the back of an old envelope. A rough oval. A flat stone in the center. Trees around the edges. He marked three spots: one where Aunt Viola would stand, visible, to draw Blackthorn's attention. One where you would hide, low behind a fallen log, iron nail in hand. One where Corvid would perch, high in the pines, as lookout.

"When he begins the ritual," Aunt Viola said, "he will face the flat stone and open the vessel. You will be behind him. You will have a clear line to the vessel. The ritual takes seven minutes and twenty seconds. You will throw at the six-minute mark, because that is when he is most committed and least able to react. If you throw too early, he will step aside. If you throw too late, the Warden is gone."

She drew a small clock face on the envelope and marked the six-minute point.

"I will say a word when it is time," she said. "The word is **hawthorn**. When you hear it, you throw. Not before. Not after. The moment the word leaves my mouth, the nail leaves your hand."

"What if something goes wrong?" you asked.

"Everything will go a little wrong," she said. "That is what **reality** does. You adjust. You do not freeze. You are going to be afraid, because fear is sensible in this situation, and your job is to be afraid AND throw the nail anyway. That is what bravery is. Not the absence of fear. The nail, leaving the hand."

She stood up. The planning was done. It was nearly eleven. Outside, the mist had settled thick around the house, pressing at the windows.

"Sleep if you can," she said. "Tomorrow we walk to Hunter's Ridge at dusk. Tomorrow we end this."`,
  vocab: { hawthorn:"A small tree with white flowers, sometimes used in old magic", reality:"The way things actually are, not how we wish they were" },
  companion: `I will not tell you not to be afraid. I will tell you that I will be there. Both of those are true.`,
  question: null,
  choices: [
    { text: "Try to sleep.", icon: "🌙", next: "confront" },
  ],
},

confront: {
  text: `The next night came the way all hard nights come: too slowly in the early hours, and then all at once.

Hunter's Ridge was a clearing on the edge of the Old Pines, half a mile outside the town boundary. You walked up in the failing light. Aunt Viola was ahead of you on the trail, her gray coat disappearing into the dusk. Corvid rode your shoulder in **silence**. You had never heard him be silent for so long. You were grateful for it.

The clearing was exactly as Corvid had drawn it. An oval of wet grass. A flat gray stone at the center, weathered almost smooth. Pines around the edges, close enough to hide in. Aunt Viola went to her marked spot without speaking. Corvid lifted off your shoulder and found his perch. You crouched behind the fallen log Corvid had chosen, and you gripped the iron nail, and you waited, and you tried to make your breathing slow the way Aunt Viola had shown you.

The stars came out. The mist came up from the grass like slow smoke.

And then Blackthorn was there.

He did not walk into the clearing. He simply was not there, and then he was, at the edge of the trees, tall and thin and wearing the black coat Mr. Pemberton had described. Against his chest he cradled a small glass vessel, pale light swirling inside it. His face, you could see clearly even at this distance, was the face of a man who was not worried.

Aunt Viola stepped out of the shadow of the pines. She did not speak. He did not speak. They simply looked at each other across the clearing, and a tremendous weight of old **grievance** passed between them that you could feel in your teeth.

Then Blackthorn smiled, and he walked forward, and he set the vessel on the flat stone, and he began to sing in a voice that did not come from his mouth.`,
  vocab: { silence:"The absence of all sound", grievance:"A complaint or grudge held for a long time" },
  companion: `Six minutes. Clock starts now. Breathe. I am watching the sky. Your aunt is watching him. You are watching the vessel. We all have a job.`,
  question: null,
  choices: [
    { text: "Wait for the word. Throw when she says it.", icon: "⏳", next: "climax" },
  ],
},

climax: {
  text: `You counted, because Aunt Viola had told you to count, because counting gives a frightened body something to do.

**Thirty seconds**. Blackthorn's song was rising. A second light joined the first inside the vessel, silver this time, thin as a thread. Silvia. The owl.

**One minute**. Aunt Viola took a step into the clearing, hands open, eyes on Blackthorn. He glanced at her. Smiled. Kept singing.

**Two minutes**. The silver thread inside the vessel thickened. You could see, if you squinted, the outline of a great gray owl inside the glass. The iron nail in your hand was so cold your fingers were going numb. You shifted your grip.

**Three minutes**. Corvid, high above, gave a single short call. A signal only for you. It meant: *he has not noticed you. You are safe where you are.*

**Four minutes**. Your hand began to tremble. You pressed it against the log to steady it.

**Five minutes**. Aunt Viola had moved closer. She was speaking, now, in a low voice, words you could not hear. Blackthorn's singing wavered, just slightly. She was arguing with him. Keeping him occupied. Buying you time.

**Six minutes**.

Her head turned. Her eyes found the log where you were hidden, though she could not possibly see you.

"**HAWTHORN**," she said.

The nail left your hand.

It arced through the clear cold air of the clearing, turning once, end over end, and it struck the vessel.

The glass, which did not exist in this world, shattered in a way that did not belong to this world. The sound was like a bell being un-rung. Light flooded the clearing, silver and gold and something between. Blackthorn screamed, a sound that was not a sound, and his coat unraveled. His face unraveled. He thinned and thinned and was pulled, fighting and **furious**, toward the place the broken vessel had gone, and then he was not there.

A great gray owl stood on the flat stone, blinking in the sudden quiet. She looked directly at you. "You have a strong arm," she said. "And excellent timing."

A small orange cat sat next to her, tail curled neatly, expression **insulted**.

"I was in that BOTTLE," said Marmalade. "For a day and a night. I have opinions about this."`,
  vocab: { furious:"Extremely angry", insulted:"Feeling that someone has been rude or disrespectful" },
  companion: `You threw. It hit. Seven words I have waited all day to say.`,
  question: null,
  choices: [
    { text: "Walk into the clearing. The night is over.", icon: "🌕", next: "ending" },
  ],
},

ending: {
  text: `You stepped out from behind the log. Your legs were shaking so hard you had to hold the log for a moment before you could walk.

Aunt Viola crossed the clearing and put both hands on your shoulders. She did not say anything. She did not have to. Her eyes were very bright, and she looked at you the way you had seen her look at the Field Journal, which is to say: the way she looked at the things she loved most.

Corvid landed on your other shoulder. He did not say anything either, which was, from him, the loudest thing he had ever said.

Silvia the owl flew up to a low branch and settled there with the dignity of an old professor. "Thank you," she said. "For the return. The **accommodations** were not what I am used to."

Marmalade rubbed once against Aunt Viola's ankle, purred briefly, and then stalked off toward the treeline with her tail high. Cats do not linger on gratitude.

"She is going to find the field mice who got **bold** while she was away," Aunt Viola said, watching her go. "She will be **insufferable** about it for a week."

You walked home together in the dark. The mist in the streets of Hollowmist had thinned. It moved like mist should move, slow and indifferent. Lights were on in windows. Mrs. Puddleford waved from her doorway. The town did not know what had nearly happened to it. That was, you realized, the point. Keepers kept. No one knew to thank them, and that was how Keepers preferred it.

At the kitchen table, Aunt Viola opened the Field Journal to a blank page. She dipped her pen. She wrote a single line, and then she turned the journal toward you, and handed you the pen.

"Write your name," she said. "Below mine. If you want to. No one will make you. But if you want to, write it now."`,
  vocab: { accommodations:"The place where you stay, usually when traveling", bold:"Confident and not cautious, sometimes in a way that takes chances", insufferable:"Too annoying or pleased with themselves to be around" },
  companion: `Whatever you decide, I will be at this house, and you will be welcome here. That is not a small thing. I do not say it to many people. I am saying it to you.`,
  question: null,
  ending: true,
  endTitle: "The Keeper's Apprentice",
  endEmoji: "📓",
  endMessage: "You threw the iron nail at exactly the right moment and sent Erasmus Blackthorn back to the place he came from. Marmalade is home. Silvia is safe. The old crow, whom you have not met yet, is apparently looking forward to it. Aunt Viola has invited you back for every holiday for the rest of her life. There is a blank page in the Field Journal waiting for your first entry. 📓⚡🌫️",
},
};

/* ═══ AI bridge ═══ */
async function aiBridge(txt,act,lv){try{const r=await fetch("/api/bridge",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sceneText:txt,action:act,companionName:"Corvid",level:lv})});if(!r.ok)return null;const d=await r.json();return d.text||null;}catch(e){return null;}}

/* ═══ Components ═══ */
function PText({text,onVT}){return<>{text.split(/(\*\*[^*]+\*\*)/).map((s,i)=>{const m=s.match(/^\*\*(.+)\*\*$/);return m?<span key={i} onClick={e=>{e.stopPropagation();onVT?.(m[1]);}} style={{color:C.gold,fontWeight:700,cursor:"pointer",borderBottom:`1.5px dashed ${C.goldDim}`,transition:"color 0.2s"}}>{m[1]}</span>:<span key={i}>{s}</span>;})}</>;}

function VPop({word,def,onClose}){if(!word)return null;return<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.5)",padding:20}}><div onClick={e=>e.stopPropagation()} style={{background:C.paper,borderRadius:8,padding:"24px",maxWidth:320,border:`2px solid ${C.goldDim}`,boxShadow:`0 0 30px rgba(212,168,71,0.15)`,animation:"popIn .2s ease"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:6,height:6,borderRadius:3,background:C.gold}}/><h3 style={{margin:0,fontFamily:"'Alegreya',serif",fontSize:"1.3rem",color:C.text,fontStyle:"italic"}}>{word}</h3></div><p style={{margin:0,fontSize:".95rem",lineHeight:1.7,color:C.textMid,fontFamily:"'Alegreya',serif"}}>{def||"Keep reading to discover what this means..."}</p><div style={{marginTop:14,fontSize:".75rem",color:C.goldDim,fontWeight:700,fontFamily:"'Nunito',sans-serif"}}>✦ Added to your journal</div></div></div>;}

function NB({open,onClose,words}){if(!open)return null;return<div style={{position:"fixed",inset:0,zIndex:150,display:"flex",justifyContent:"flex-end"}}><div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.4)"}}/><div style={{position:"relative",width:"min(340px,86vw)",height:"100%",background:C.paper,display:"flex",flexDirection:"column",animation:"slideIn .3s ease",borderLeft:`3px solid ${C.goldDim}`}}><div style={{padding:"20px",borderBottom:`1px solid ${C.paperEdge}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{margin:0,fontFamily:"'Alegreya',serif",fontSize:"1.1rem",color:C.text,fontStyle:"italic"}}>Words Collected</h2><button onClick={onClose} style={{background:"none",border:"none",fontSize:"1.1rem",cursor:"pointer",color:C.textLight}}>✕</button></div><div style={{flex:1,overflow:"auto",padding:"16px 20px"}}>{words.length===0?<p style={{color:C.textLight,fontFamily:"'Alegreya',serif",fontSize:".95rem",fontStyle:"italic",textAlign:"center",padding:"30px 0"}}>Tap the gold words in the story to collect them here.</p>:words.map((w,i)=><div key={i} style={{padding:"10px 0",borderBottom:`1px solid ${C.paperEdge}`}}><div style={{fontFamily:"'Alegreya',serif",fontWeight:700,fontSize:".95rem",color:C.gold}}>{w.word}</div>{w.def&&<div style={{fontFamily:"'Alegreya',serif",fontSize:".88rem",color:C.textMid,lineHeight:1.5,marginTop:2}}>{w.def}</div>}</div>)}</div></div></div>;}

let aOk=false,sC,sR,sV;async function iA(){if(aOk)return;await Tone.start();sC=new Tone.Synth({oscillator:{type:"triangle"},envelope:{attack:.01,decay:.1,sustain:0,release:.08},volume:-18}).toDestination();sR=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"sine"},envelope:{attack:.04,decay:.3,sustain:.08,release:.4},volume:-16}).toDestination();sV=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"triangle"},envelope:{attack:.04,decay:.25,sustain:.15,release:.7},volume:-14}).toDestination();aOk=true;}

export default function App(){
  const[scr,setScr]=useState("home");
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

  const sc=S[sid];
  const lv=LEVELS[lvl];
  const gt=s=>s?.text?.replace(/\{C\}/g,"Corvid")||"";
  const pages=(gt(sc)||"").split("\n\n").filter(Boolean);
  const totalPages=pages.length;
  const isLastPage=page>=totalPages-1;
  const currentPageText=pages[page]||"";

  useEffect(()=>{try{const v=localStorage.getItem("mt10");if(v){const s=JSON.parse(v);setLvl(s.l??1);}}catch(e){}},[]);
  const save=useCallback((d)=>{try{localStorage.setItem("mt10",JSON.stringify({l:lvl,...d}));}catch(e){}},[lvl]);

  const goTo=n=>{snd(pCl);setTr(true);setBridge(null);setTimeout(()=>{setHist(h=>[...h,sid]);setSid(n);setPage(0);setShowCh(false);setTr(false);save({s:n,h:[...hist,sid]});if(contentRef.current)contentRef.current.scrollTop=0;},300);};
  const goBack=()=>{if(!hist.length)return;snd(pCl);setTr(true);setBridge(null);setTimeout(()=>{setSid(hist.at(-1));setHist(h=>h.slice(0,-1));setPage(0);setShowCh(false);setTr(false);},300);};
  const nextPage=()=>{if(!isLastPage){snd(pCl);setPage(p=>p+1);if(contentRef.current)contentRef.current.scrollTop=0;}else{setShowCh(true);if(sc.ending)snd(pVi);else snd(pRv);}};
  const hvt=w=>{const d=sc?.vocab?.[w]||sc?.vocab?.[w.toLowerCase()]||null;setVP({word:w,def:d});setWords(p=>{if(p.find(x=>x.word.toLowerCase()===w.toLowerCase()))return p;return[...p,{word:w,def:d}];});setNbB(true);snd(pCl);};
  const hCA=async()=>{if(!cAct.trim()||!sc)return;setBLoad(true);const r=await aiBridge(gt(sc),cAct.trim(),lvl);setBridge(r||`Corvid tilts his head. "Interesting idea. Let's focus on what's in front of us, though."`);setCAct("");setBLoad(false);};
  const start=()=>{snd(pRv);setSid("start");setHist([]);setPage(0);setWords([]);setNbB(false);setBridge(null);setShowCh(false);setScr("play");save({s:"start",h:[]});};

  if(scr==="home")return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Nunito',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/><style>{CSS}</style>
      <div style={{maxWidth:420,width:"100%"}}>
        <div style={{background:C.paper,borderRadius:4,padding:"40px 32px",position:"relative",boxShadow:`0 4px 24px rgba(0,0,0,.4), inset 0 0 60px rgba(139,115,85,.15)`,border:`2px solid ${C.paperEdge}`,marginBottom:24}}>
          <div style={{position:"absolute",top:10,left:10,width:20,height:20,borderTop:`2px solid ${C.gold}`,borderLeft:`2px solid ${C.gold}`,opacity:.5}}/><div style={{position:"absolute",top:10,right:10,width:20,height:20,borderTop:`2px solid ${C.gold}`,borderRight:`2px solid ${C.gold}`,opacity:.5}}/><div style={{position:"absolute",bottom:10,left:10,width:20,height:20,borderBottom:`2px solid ${C.gold}`,borderLeft:`2px solid ${C.gold}`,opacity:.5}}/><div style={{position:"absolute",bottom:10,right:10,width:20,height:20,borderBottom:`2px solid ${C.gold}`,borderRight:`2px solid ${C.gold}`,opacity:.5}}/>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:12,letterSpacing:4,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:16}}>Case File No. 1</div>
            <h1 style={{fontFamily:"'Alegreya',serif",fontSize:"clamp(1.6rem,5vw,2.2rem)",color:C.text,margin:"0 0 4px",lineHeight:1.2,fontWeight:700}}>The Hollowmist Bell</h1>
            <div style={{width:60,height:2,background:C.gold,margin:"12px auto",borderRadius:1}}/>
            <p style={{fontFamily:"'Alegreya',serif",color:C.textMid,fontSize:".95rem",fontStyle:"italic",margin:0}}>Some bells ring thirteen for a reason</p>
          </div>
        </div>

        <div style={{marginBottom:20,padding:"14px 16px",background:C.bgMid,borderRadius:8,border:`1px solid ${C.bgLight}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
            <span style={{fontSize:20}}>🐦‍⬛</span>
            <span style={{fontFamily:"'Alegreya',serif",fontSize:"1rem",color:C.goldBright,fontWeight:700}}>Corvid</span>
          </div>
          <p style={{margin:0,fontSize:".78rem",color:C.goldDim,fontStyle:"italic",fontFamily:"'Alegreya',serif",lineHeight:1.5}}>A raven who serves as your aunt's associate. Dry, observant, occasionally helpful.</p>
        </div>

        <div style={{display:"flex",gap:8,marginBottom:20}}>
          <div style={{flex:1}}>
            <div style={{fontSize:".7rem",letterSpacing:3,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:8}}>Level</div>
            <div style={{display:"flex",gap:4}}>{LEVELS.map((l,i)=>(<button key={i} onClick={()=>{setLvl(i);snd(pCl);}} style={{flex:1,padding:"8px",borderRadius:6,border:"none",cursor:"pointer",background:lvl===i?C.gold:C.bgLight,color:lvl===i?C.bg:C.goldDim,fontWeight:800,fontSize:".75rem",transition:"all .2s",fontFamily:"'Nunito',sans-serif"}}>{l.label}</button>))}</div>
          </div>
          <div>
            <div style={{fontSize:".7rem",letterSpacing:3,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:8}}>Sound</div>
            <button onClick={()=>setSOn(!sOn)} style={{padding:"8px 16px",borderRadius:6,border:"none",cursor:"pointer",background:sOn?C.teal:C.bgLight,color:sOn?"#fff":C.goldDim,fontWeight:800,fontSize:".75rem",fontFamily:"'Nunito',sans-serif"}}>{sOn?"On":"Off"}</button>
          </div>
        </div>

        <button onClick={start} style={{width:"100%",padding:"16px",borderRadius:8,border:`2px solid ${C.gold}`,background:"transparent",cursor:"pointer",color:C.goldBright,fontWeight:800,fontSize:"1rem",letterSpacing:2,fontFamily:"'Nunito',sans-serif",transition:"all .2s",textTransform:"uppercase"}}>Open the Case</button>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Nunito',sans-serif",display:"flex",flexDirection:"column"}}>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet"/><style>{CSS}</style>
      <VPop word={vP?.word} def={vP?.def} onClose={()=>setVP(null)}/>
      <NB open={nbO} onClose={()=>{setNbO(false);setNbB(false);}} words={words}/>

      <div style={{padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <button onClick={()=>setScr("home")} style={tBtn}>←</button>
        <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>🐦‍⬛</span><span style={{fontSize:".75rem",color:C.goldDim,fontWeight:700}}>Corvid</span></div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>setSOn(!sOn)} style={tBtn}>{sOn?"♪":"♪̶"}</button>
          <button onClick={()=>{setNbO(true);setNbB(false);}} style={{...tBtn,position:"relative"}}>📖{nbB&&<span style={{position:"absolute",top:-2,right:-2,width:8,height:8,borderRadius:4,background:C.red}}/>}</button>
        </div>
      </div>

      <div style={{flex:1,display:"flex",flexDirection:"column",padding:"0 16px 20px",maxWidth:600,width:"100%",margin:"0 auto"}} ref={contentRef}>
        <div style={{opacity:tr?0:1,transform:tr?"translateY(10px)":"none",transition:"all .3s ease",flex:1,display:"flex",flexDirection:"column"}}>

          <div style={{flex:1,background:C.paper,borderRadius:4,position:"relative",display:"flex",flexDirection:"column",boxShadow:`0 2px 16px rgba(0,0,0,.3), inset 0 0 40px rgba(139,115,85,.1)`,border:`1px solid ${C.paperEdge}`,overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,opacity:.03,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,pointerEvents:"none"}}/>
            <div style={{padding:"12px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:1}}>
              <span style={{fontSize:".65rem",color:C.textLight,fontFamily:"'Alegreya',serif",fontStyle:"italic"}}>{sc.ending?"Final Page":`Page ${page+1} of ${totalPages}`}</span>
              <span style={{fontSize:".65rem",color:C.textLight,fontFamily:"'Alegreya',serif",fontStyle:"italic"}}>{hist.length>0?`Scene ${hist.length+1}`:""}</span>
            </div>
            <div style={{flex:1,padding:"12px 24px 16px",position:"relative",zIndex:1,overflow:"auto"}}>
              <div style={{fontFamily:"'Alegreya',serif",fontSize:lv.fs,lineHeight:lv.lh,color:C.text,whiteSpace:"pre-line"}} key={`${sid}-${page}`}>
                <PText text={currentPageText} onVT={hvt}/>
              </div>
            </div>
            {!showCh&&<div style={{padding:"8px 20px 16px",position:"relative",zIndex:1,textAlign:"right"}}>
              <button onClick={nextPage} style={{background:"none",border:"none",cursor:"pointer",color:C.gold,fontFamily:"'Alegreya',serif",fontSize:".9rem",fontWeight:700,fontStyle:"italic",padding:"8px 0",transition:"opacity .2s"}}>{isLastPage?"Continue →":"Turn page →"}</button>
            </div>}
          </div>

          {showCh&&<div style={{marginTop:12}}>
            {sc.companion&&<div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10,animation:"fadeUp .3s ease"}}><span style={{fontSize:20,flexShrink:0,marginTop:2}}>🐦‍⬛</span><p style={{margin:0,fontSize:".85rem",lineHeight:1.6,color:C.goldDim,fontStyle:"italic",fontFamily:"'Alegreya',serif"}}>"{sc.companion}"</p></div>}
            {sc.question&&<div style={{padding:"10px 14px",marginBottom:10,borderLeft:`3px solid ${C.gold}`,animation:"fadeUp .3s ease"}}><p style={{margin:0,fontSize:".82rem",color:C.goldBright,fontWeight:700,lineHeight:1.5,fontFamily:"'Alegreya',serif",fontStyle:"italic"}}>🤔 {sc.question}</p></div>}
            {bridge&&<div style={{padding:"10px 14px",marginBottom:10,borderLeft:`3px solid ${C.teal}`,animation:"fadeUp .3s ease"}}><p style={{margin:0,fontSize:".85rem",color:C.goldDim,fontStyle:"italic",lineHeight:1.6,fontFamily:"'Alegreya',serif"}}>{bridge}</p></div>}

            {sc.ending?(
              <div style={{animation:"fadeUp .3s ease"}}>
                <div style={{textAlign:"center",padding:"16px",background:C.bgLight,borderRadius:8,marginBottom:12,border:`1px solid ${C.gold}22`}}>
                  <div style={{fontSize:36,marginBottom:8}}>{sc.endEmoji}</div>
                  <h2 style={{margin:"0 0 6px",fontFamily:"'Alegreya',serif",fontSize:"1.2rem",color:C.goldBright}}>{sc.endTitle}</h2>
                  <p style={{margin:0,color:C.goldDim,fontSize:".88rem",lineHeight:1.6}}>{sc.endMessage}</p>
                </div>
                {words.length>0&&<button onClick={()=>setNbO(true)} style={{...cBtn,width:"100%",justifyContent:"center",marginBottom:8,borderColor:C.gold,color:C.goldBright}}>📖 Review {words.length} collected word{words.length>1?"s":""}</button>}
                <div style={{display:"flex",gap:8}}><button onClick={start} style={{...cBtn,flex:1,justifyContent:"center",background:C.gold,color:C.bg,borderColor:C.gold}}>Play Again</button><button onClick={()=>setScr("home")} style={{...cBtn,flex:1,justifyContent:"center"}}>Home</button></div>
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
