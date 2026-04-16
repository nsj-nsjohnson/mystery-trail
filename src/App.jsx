import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";

/* ═══════════════════════════════════════════════════
   MYSTERY TRAIL — The Hollowmist Bell
   Gravity Falls-style: supernatural mystery, journal
   lore, hidden codes, eccentric characters, real stakes
   ═══════════════════════════════════════════════════ */

const C = {
  bg: "#0B1622", bgMid: "#12202F", bgLight: "#1A2D40",
  paper: "#F4E8D1", paperDark: "#E8D5B5", paperEdge: "#D4BF97",
  text: "#2C1810", textMid: "#5C4033", textLight: "#8B7355",
  gold: "#D4A847", goldBright: "#F0C75E", goldDim: "#A68432",
  red: "#C0392B", teal: "#2E8B7A", white: "#FFF8EE",
};

const LEVELS = [
  { label: "Beginner", fs: "1.18rem", lh: 2.0 },
  { label: "Growing", fs: "1.06rem", lh: 1.85 },
  { label: "Explorer", fs: "0.96rem", lh: 1.75 },
];

const COMPANIONS = [
  { id:"fox",name:"Sage",emoji:"🦊",color:"#D4772C",desc:"Clever fox, nose for clues" },
  { id:"owl",name:"Luna",emoji:"🦉",color:"#7C6BEE",desc:"Wise owl, sees in the dark" },
  { id:"cat",name:"Shadow",emoji:"🐈‍⬛",color:"#2E8B7A",desc:"Sleek cat, sneaks anywhere" },
  { id:"dog",name:"Scout",emoji:"🐕",color:"#C0392B",desc:"Loyal hound, senses danger" },
];

/* ═══ THE HOLLOWMIST BELL ═══ */
const S = {
start: {
  text: `The bus dropped you off at the edge of Hollowmist just as the sun was sinking behind the pine-covered hills. You pulled your suitcase through the cobblestone streets, past shuttered shops and crooked lampposts that flickered like they couldn't quite decide whether to work. {C} padded alongside you, tail low, nose twitching. There was something strange about the air here. It smelled like wet leaves and old copper and something else you couldn't name.\n\nGreat-Aunt Viola's house sat at the top of Thornberry Lane, a narrow, three-story thing with too many windows and a roof that looked like it had grown there. The front garden was full of plants you didn't recognize, some of them still glowing faintly in the deepening twilight. Before you could knock, the door flew open and Aunt Viola stood there, short and wild-haired, with glasses pushed up on her forehead. "You're late," she said, "and the bell rang **thirteen** last night, so I hope you brought your thinking cap." She grabbed your suitcase and vanished into the house. "Tea's on. Marmalade's missing. We have **work** to do."\n\nYou barely had time to take off your boots before Aunt Viola was pushing a mug of something steaming into your hands and pacing the kitchen like a storm. "Twelve rings means the night is **ordinary**," she said, as if this were a completely normal thing to say. "Thirteen rings means something has changed. Something has been taken, moved, or let out." She stopped and fixed you with a sharp look. "This morning, my cat Marmalade did not come home for breakfast. Marmalade ALWAYS comes home for breakfast. And that means whoever or whatever rang that bell last night did it for a reason, and the reason has something to do with **her**."\n\nShe swept a stack of old books off the kitchen table and slammed down a small, leather-bound notebook with a brass clasp. The cover was worn soft. Strange symbols were stamped into the leather. "This," Aunt Viola said, tapping it with one finger, "is my Field Journal. Forty years of notes on every **anomaly** in this town. You're going to help me find Marmalade. And I suspect you're going to learn some things about Hollowmist that most people are happier not knowing."`,
  vocab: { thirteen:"One more than twelve. In Hollowmist, a number that means trouble.", work:"A job that needs to be done seriously", ordinary:"Normal, not special, nothing strange", her:"The word used to refer to a female person or animal", anomaly:"Something strange or unusual that doesn't fit the pattern" },
  companion: `This place feels wrong. Not scary exactly. Just... awake. Like it's watching us.`,
  question: null,
  choices: [
    { text: "Go to the bell tower first", icon: "🔔", next: "tower" },
    { text: "Read the Field Journal with Aunt Viola", icon: "📓", next: "journal" },
    { text: "Head into town and ask around", icon: "🏘️", next: "town" },
  ],
},

tower: {
  text: `The Hollowmist bell tower stood at the center of town like a crooked finger pointing at the sky. It was taller than it looked from a distance and older than most of the houses around it. {C} sniffed the stone foundation and made a low sound in the back of their throat. "Careful," Aunt Viola had told you before you left. "The tower doesn't like visitors. It never has."\n\nThe door was unlocked, which was its own kind of strange. Inside, a spiral staircase wound up and up into the dark. The walls were covered in chalk marks, tally marks, scratches, dates going back a hundred years. Someone had been counting things here for a very long time. Near the top of the stairs, you found what you were looking for: the bell chamber. The great iron bell hung silent in the center of the room, and beside it, a thick wooden ledger lay open on a reading stand. Every night was **meticulously** recorded. "12. 12. 12. 12. 12." Then last night: "13." The entry was written in a different color ink, rusty and thin. Almost like it had been written with something other than ink.\n\n{C} was already investigating the corner of the chamber. "Look at this," they whispered. On the floor, barely visible in the dust, was a single feather. But it wasn't from any bird you recognized. It was long, thin, and a deep **sooty** black, and it seemed to absorb the light around it rather than reflect it. You picked it up. It was cold. Not cool. **Cold**, like it had been kept in a freezer. "That's not right," {C} said quietly. "Birds don't drop feathers that feel like that."\n\nA sound from below made you both freeze. Footsteps on the stairs. Slow, **deliberate** ones. Someone else was in the tower.`,
  vocab: { meticulously:"Very carefully and with attention to every detail", sooty:"Black and dusty, like the inside of a chimney", cold:"Much colder than expected, in a way that feels wrong", deliberate:"Done carefully and on purpose" },
  companion: `Someone rang that bell thirteen times on purpose. And whoever's climbing those stairs right now might be the one who did it.`,
  question: `Why would the entry for last night be written in a different color ink?`,
  choices: [
    { text: "Hide and see who it is", icon: "👁️", next: "wiggins" },
    { text: "Take the feather back to Aunt Viola", icon: "🪶", next: "journal" },
  ],
},

wiggins: {
  text: `You pressed yourself against the wall behind the bell, heart thudding. {C} crouched low, eyes fixed on the stairwell. The footsteps reached the top, and a man stepped into the chamber. He was old, **hunched**, and wore a coat three sizes too big for him. His hair stuck out in white tufts, and he muttered to himself as he moved, like someone having a conversation you weren't invited to.\n\nIt was Old Wiggins, the bell ringer. Everyone in Hollowmist knew about Old Wiggins. He had been the bell ringer for fifty years, and before that, his father had been the bell ringer, and before THAT his grandfather. Old Wiggins shuffled to the ledger, read the entry for last night, and made a small, pained sound. Then, to your complete surprise, he said out loud: "I didn't ring it. I swear to the Old Pines, I did NOT ring it." He wasn't talking to himself. He was talking to the bell.\n\n{C} nudged your leg. You stepped out from behind the bell. Old Wiggins nearly fell over. "By the MISTS!" he shouted, clutching his chest. "A child! In my tower! With a, a, what even IS that?" He pointed a shaking finger at {C}. You explained, quickly, who you were. Old Wiggins's eyes narrowed when you mentioned Aunt Viola. "Viola's niece, eh? Then you'll **believe** me when I say I didn't ring it. I rang twelve. I always ring twelve. But someone else came up here AFTER me and rang it again. I found the door open when I came this morning. I was going to tell Viola myself, but I was afraid."\n\nHe pulled something from his pocket: a small brass key, worn smooth. "There are only two keys to this tower. Mine, and the **duplicate** kept in the Mayor's office. If someone rang the bell after me, they had to have a key. And mine was in my pocket all night." He looked at the feather in your hand. His face went **ashen**. "Oh no. Oh no, no, no. That's a Mistwalker feather. That means something has gotten THROUGH."`,
  vocab: { hunched:"Bent forward, with a curved back", believe:"To accept that something is true", duplicate:"An exact copy of something", ashen:"Pale and gray, like ashes, from shock or fear" },
  companion: `A feather that shouldn't exist, a bell that rang without being rung, and a bell ringer who's scared of something called a Mistwalker. We need to talk to Aunt Viola. Now.`,
  question: null,
  choices: [
    { text: "Take everything back to Aunt Viola", icon: "📓", next: "journal" },
    { text: "Ask Old Wiggins what a Mistwalker is", icon: "❓", next: "mistwardens" },
  ],
},

town: {
  text: `The main street of Hollowmist ran crooked, like the person who designed it had changed their mind halfway through. Shops leaned against each other for support. Lampposts stood at strange angles. A cat, not Marmalade, watched you from a doorway with far too much interest. The townspeople were friendly in the way that people are friendly when they don't want to be asked questions, and everywhere you went, someone wanted to know if you were Viola's niece, and wasn't it **wonderful** that you were visiting, and oh, had you tried the blueberry buns at the bakery?\n\nMrs. Puddleford at the general store knew everything about everyone, but she knew it the way gossip is known, which is to say, **enthusiastically** and not always correctly. "Marmalade? Oh, that cat is always getting into things. She'll turn up. But speaking of strange, there's a new gentleman in town. Arrived two weeks ago. Calls himself Mr. Blackthorn. Buys nothing but black tea and candles. BLACK candles. Now, I'm not one to judge, but..." She was absolutely one to judge.\n\nThe postman, a nervous squirrel named Mr. Pips, confirmed it. "He came in on the night bus. No luggage. Not a single bag. Said he was an **antiquities** dealer, but who comes to Hollowmist to buy antiques? We don't have any antiques. We have old things, but those are just things. And he keeps asking about the bell tower. About the history. About who has keys." Mr. Pips dropped his voice. "I told him to ask the Mayor, which, Old Pines forgive me, I probably shouldn't have done."\n\nAs you left the post office, you spotted Miss Lune through the window of her clockmaker's shop, bent over a disassembled pocket watch. She looked up, saw you, and her face went still. She beckoned you in with one **urgent** wave. "Come in, come in. Close the door. We need to talk. That bell is broken, and I think I know who broke it."`,
  vocab: { wonderful:"Very good, pleasant, or delightful", enthusiastically:"With lots of excited energy", antiquities:"Very old and valuable objects, usually from ancient times", urgent:"Needing immediate attention, not able to wait" },
  companion: `Everyone's polite. Everyone's friendly. And everyone's keeping secrets. This whole town feels like it's holding its breath.`,
  question: `Two people now have mentioned Mr. Blackthorn. Why would a new arrival be asking questions about the bell tower?`,
  choices: [
    { text: "Visit Miss Lune the clockmaker", icon: "⏰", next: "clockmaker" },
    { text: "Find and confront Mr. Blackthorn", icon: "🕴️", next: "blackthorn" },
  ],
},

clockmaker: {
  text: `Miss Lune's shop smelled like oil and old wood and the faint metallic **tang** of tiny moving parts. Clocks covered every wall. Grandfather clocks, cuckoo clocks, pocket watches hanging on velvet, even a clock made from a beehive. All of them were ticking, but not one of them was ticking in time with another. The effect made you feel slightly dizzy, like the whole room was gently disagreeing with itself.\n\nMiss Lune herself was tall, thin, and had the kind of eyes that looked like they had seen every second of the last thirty years passing by. She locked the door behind you. "The bell is mine," she said, without preamble. "I **maintain** it. I wind it. I am the only person in this town who understands how it works, and I am telling you right now: it is not supposed to ring thirteen. It CAN'T ring thirteen. The mechanism only allows twelve strikes. For the bell to ring a thirteenth time, someone would have to strike it by hand, AFTER the mechanism finished. After Wiggins went home."\n\nShe pulled out a small, beautifully drawn diagram of the bell mechanism and tapped it with a long finger. "And the person who rang that bell knew enough about its workings to know they had to wait for the mechanism to reset, or it would have jammed. That's not something you'd know by accident. That's **expertise**." She looked at you meaningfully. "There are three people in Hollowmist who could have known that. Old Wiggins. Myself. And, most recently, a very curious new arrival who came into my shop last week and asked me to **explain** the bell's mechanism in detail. For his 'research.'"\n\nShe reached into a drawer and pulled out a sketch. It was a portrait of a man with sharp features and dark hair. Mr. Blackthorn. "I drew this from memory," Miss Lune said. "Because I have a feeling, young detective, that the person in this drawing is not a person at all."`,
  vocab: { tang:"A strong, sharp taste or smell", maintain:"To keep something working properly", expertise:"Deep knowledge or skill in something", explain:"To make something clear by giving details" },
  companion: `Miss Lune doesn't seem like someone who spooks easily. And she just said Blackthorn might not be a person. That's not something you say lightly.`,
  question: null,
  choices: [
    { text: "Go find Mr. Blackthorn", icon: "🕴️", next: "blackthorn" },
    { text: "Go back and read the Journal with Aunt Viola", icon: "📓", next: "journal" },
  ],
},

blackthorn: {
  text: `Mr. Blackthorn was staying at the Hollowmist Inn, in the room at the very top. The innkeeper, a tired-looking owl, rolled her eyes when you asked about him. "He's there. He's always there, except when he isn't. Don't ask me to **explain** it. I just keep the linens clean."\n\nYou climbed the narrow stairs. {C} stayed close to your ankles, every hair on their back standing up. At the top landing, you paused outside a plain wooden door. Before you could knock, a voice from inside said: "Please come in. Both of you." The voice was warm, pleasant, and somehow made the back of your neck cold.\n\nMr. Blackthorn was sitting in a chair by the window. He did not look up when you entered. He was tall, thin, and wore a plain black coat that seemed to swallow the light around it. The room smelled of cold pine and something **metallic**. A cup of untouched tea sat on the table. There was no luggage anywhere, no personal items, no sign that anyone actually lived in this room. Just him, the chair, and the cup. "You're Viola's niece," he said, finally turning toward you. His eyes were the color of **smoke**. "You have her look. Stubborn. **Observant**. She was the same at your age."\n\n"How do you know how old my aunt was when she was my age?" you asked.\n\nMr. Blackthorn smiled. It was a small, careful smile, the kind someone makes when they want you to think they're being friendly. "I know many things," he said. "For example, I know that a certain small cat has gone missing. And I know that you've been looking for her. I also know," he leaned forward slightly, "that she is somewhere she cannot be retrieved from. Not by a child. Not by an old woman with a journal. Not by anyone. Some things, once taken, are simply gone."`,
  vocab: { explain:"To make something clear by giving details", metallic:"Tasting or smelling like metal", smoke:"The gray cloud that rises from a fire", observant:"Good at noticing things, paying close attention" },
  companion: `He knew we were coming. He knew about Marmalade. And he just basically admitted he was involved. But his eyes... there's something off. Something not human.`,
  question: `Mr. Blackthorn has no luggage, no belongings, and the innkeeper says he 'isn't there' sometimes. What kind of person travels like that?`,
  choices: [
    { text: "Leave quietly and tell Aunt Viola everything", icon: "🚪", next: "journal" },
    { text: "Stand your ground and demand answers", icon: "✊", next: "blackthorn_confront" },
  ],
},

blackthorn_confront: {
  text: `"You know where Marmalade is," you said, keeping your voice steady. Your knees were shaking but your voice was not. "Tell me where she is."\n\nMr. Blackthorn tilted his head like a bird studying an interesting bug. His smile didn't move. "You have **courage**. I'll give you that. Your aunt had it too, before the town taught her to be afraid." He stood up, and it seemed like he kept standing up for longer than he should have. He was very tall. "Let me tell you a small piece of what your aunt has not told you yet, little detective. Hollowmist is not a town. It is a **seal**. A locked door between two places. And what your aunt calls 'Marmalade' is one of the locks holding that door shut."\n\nHe walked slowly toward the window. {C} let out a low growl. "There are three Mistwardens in Hollowmist," Blackthorn continued. "Marmalade is one. There are two others. If all three were to leave, the door would open, and the town would fill with what lies on the other side. I am merely... **ushering** the first one out. I would recommend, for your own safety, that you go home. Enjoy your summer. Forget this conversation." He turned back and his eyes were different now. Not gray. **White**, like fog.\n\n"Marmalade will not be harmed," he added, and for the first time his voice was soft. "She will simply be... elsewhere. You will be less safe. But you will not be sad. Because you will not **remember** this. Any of it." He smiled again, and this time you saw that his teeth were very, very straight.\n\n{C} grabbed the back of your jacket with their teeth and pulled. Hard. "Run," they whispered. "RUN NOW." You ran.`,
  vocab: { courage:"The ability to do something brave even when scared", seal:"Something that keeps a door closed or secret", ushering:"Guiding or leading someone", remember:"To keep something in your mind, to not forget" },
  companion: `We need to get to Aunt Viola. Right now. That man is NOT a man, and we need to know what he actually is before we face him again.`,
  question: null,
  choices: [
    { text: "Sprint back to Aunt Viola's", icon: "🏃", next: "journal" },
  ],
},

journal: {
  text: `Aunt Viola was waiting for you at the kitchen table when you burst through the door, pages of the Field Journal spread out in front of her like playing cards. She took one look at your face, sighed heavily, and said: "You've met him, haven't you? The one in the black coat."\n\nYou told her everything. The feather in the bell tower. Old Wiggins. Miss Lune's **warning**. Mr. Blackthorn and his white eyes. When you finished, Aunt Viola was very still for a long moment. Then she stood up and walked to the window and looked out at the pine-covered hills. "I had hoped," she said quietly, "that he would not come in my lifetime. I had hoped I could leave this to the next keeper. But the Old Pines do not care what we hope."\n\nShe turned back to you and gestured at the journal. "Sit down. I have to tell you some things, and I am going to tell them to you quickly, because we don't have much time." She opened the journal to a page you hadn't seen yet. It was covered in strange symbols: spirals, crossed lines, a drawing of a three-legged cat with eyes where paws should be. "Hollowmist is not a normal town. It was built, **deliberately**, on top of a place where the edges of two worlds are thin. On one side: ours. On the other: something older. Something that wants very badly to come through. The **founders** of this town made a bargain with three ancient creatures to keep the door shut. Those three creatures have taken many forms over the centuries. Right now, the forms are: a cat, an owl, and an old crow."\n\nShe pointed at the drawing of the three-legged cat. "Marmalade. Not a cat. The cat is just the **shape** she wears to walk among us. If Blackthorn removes all three wardens from Hollowmist, the door opens. If the door opens, the thing on the other side comes through. And what comes through does not like us very much."`,
  vocab: { warning:"A message telling someone about a possible danger", deliberately:"On purpose, with careful thought", founders:"The first people who started or built something", shape:"The form or outline of something" },
  companion: `So Marmalade is an ancient guardian wearing a cat costume. That... actually explains a lot about cats in general.`,
  question: null,
  choices: [
    { text: "Ask what a Mistwalker is", icon: "👁️", next: "mistwardens" },
    { text: "Look at the coded symbols in the journal", icon: "🔣", next: "cipher" },
  ],
},

mistwardens: {
  text: `"A Mistwalker," Aunt Viola said, tapping the drawing in her journal, "is what comes through when the door opens. They look like people. They sound like people. They even remember how to be people, a little. But they are not people. They are **hunger** with a face. They don't eat food. They eat... well. It's complicated. They eat memories. They eat places. They eat small things first. Cats. Songs. Rainstorms. Then bigger things. People. Houses. Streets. Until a place is gone, and no one can remember it was ever there."\n\nShe flipped to another page. This one showed a drawing of Hollowmist as it looked today, but next to it, an older drawing of a different town. "Forty years ago, before I took over as Keeper, there was a town on the other side of the mountain called **Thornwick**. You have never heard of Thornwick. No one has. Thornwick was eaten. A Mistwalker got through, and by the time we realized what was happening, the town was gone. Not destroyed. Gone. The road still exists. The sign still stands. But where Thornwick used to be, there is only mist. And if you walk into that mist, you do not come out."\n\nAunt Viola's voice got very quiet. "I watched it happen. I was not yet the Keeper, but my aunt was, and she tried to stop it, and she **failed**, and she is the reason I know what a Mistwalker can do, and she is the reason I have been keeping this journal for forty years." She pointed at Mr. Blackthorn's rough sketch, which you had slid across the table. "If that thing gets Marmalade out of Hollowmist, and then the owl, and then the crow, Hollowmist is Thornwick. And the next town over is next. And then the one after that."\n\n"We have," Aunt Viola said, looking at the **grandfather** clock in the corner, "approximately six hours until midnight, when the bell will ring next. He will try for the owl tonight. I believe this because I have been reading the patterns in the journal for thirty years, and the patterns say so. We have to find the owl before he does. And we have to decide, very carefully, how we're going to stop him."`,
  vocab: { hunger:"A strong need or want, usually for food", failed:"Did not succeed at something you tried to do", grandfather:"The father of your mother or father, or a large old clock" },
  companion: `A place that was eaten by mist. A creature that devours entire towns. And we have six hours. Okay. Okay. We can do this.`,
  question: `If Blackthorn took Marmalade and will take the owl tonight, what's his pattern? When might he come for the crow?`,
  choices: [
    { text: "Go find the owl before Blackthorn does", icon: "🦉", next: "mist_edge" },
    { text: "Check the journal for a way to STOP a Mistwalker", icon: "📖", next: "cipher" },
  ],
},

mist_edge: {
  text: `Aunt Viola pulled on a long gray coat with too many pockets and handed you one just like it. "We're going to the Old Pines," she said. "The owl lives there. The owl has always lived there. But the Old Pines are in the deep part of the forest, and the deep part of the forest is where the Fernfolk are. And the Fernfolk are not, strictly speaking, **friendly**."\n\nThe walk took longer than it should have. Hollowmist Forest played tricks on you. Paths that had been there a moment ago disappeared. Trees seemed to shift position when you weren't looking directly at them. Aunt Viola walked with complete **confidence**, one hand trailing along the trunks. "You have to know the forest," she murmured. "It doesn't respect strangers. But if you've walked it enough, it lets you through."\n\nYou reached the edge of a clearing filled with ferns taller than your head. The mist here was thicker, moving slowly even though there was no wind. {C} stopped walking and would not go any further. "The Fernfolk live here," Aunt Viola whispered. "They are very small and very old and very easily **insulted**. Say nothing sharp. Show no teeth when you smile. And above all, if they offer you food, do not eat it."\n\nShe stepped into the ferns. "HELLO," she called in a voice that was loud but gentle. "IT IS VIOLA. I HAVE BUSINESS." For a long moment, nothing happened. Then, one by one, tiny lights appeared in the ferns. Not lightning bugs. Lights with faces. Dozens of them. A hundred. The Fernfolk had come out to see who was disturbing them, and their expressions, as far as you could tell from three feet above, ranged from mildly curious to openly **hostile**.`,
  vocab: { friendly:"Kind and pleasant to be with", confidence:"The feeling of being sure about something", insulted:"Upset because someone said something rude or unkind", hostile:"Unfriendly and ready to fight" },
  companion: `These are not fairies from a picture book. Keep your hands visible. Don't look surprised. And whatever you do, don't laugh.`,
  question: null,
  choices: [
    { text: "Follow Aunt Viola's lead and stay respectful", icon: "🙏", next: "fernfolk" },
  ],
},

fernfolk: {
  text: `The oldest of the Fernfolk, a tiny figure with a beard that reached her toes and a pair of spectacles made from beetle wings, stepped forward on a lily pad held up by two attendants. She looked at Aunt Viola for a very long moment. "Viola the Younger. You have brought a child. You have not brought us a **gift**."\n\nAunt Viola bowed slightly. "Mother Clover. I come with news and need, not with **gifts**, but I will return with gifts before the next full moon. I swear it by the Old Pines." The old Fernfolk nodded slowly, as if this were an acceptable answer. "A Mistwalker has entered Hollowmist," Aunt Viola continued. "He has taken the cat. We believe he comes for the owl tonight."\n\nA ripple of alarm went through the assembled Fernfolk. Mother Clover raised one tiny hand and they went quiet. "We know of the one you speak. He walked through our forest three nights ago. We did not stop him because he was not, at that moment, doing harm. He carried a small glass **bottle**. When he walked past us, the ferns nearest him wilted. This is how we knew what he was." She paused. "We cannot fight him for you. The old agreement forbids it. But I can tell you this: a Mistwalker's form is held together by a **token**. A small thing he carries. If you take the token from him, he cannot remain in this world. He will go back where he came from."\n\nShe pointed one bent finger at you. "The cat is not lost. She is inside the bottle. The bottle is the token. Break the bottle, and she returns. And the Mistwalker is banished." The Fernfolk began to fade back into the ferns, their lights dimming. Mother Clover was the last to leave. "Go to the Old Pines, child. The owl is waiting. The owl knows more than even your aunt does. Tell the owl that Clover sent you."`,
  vocab: { gift:"Something given to someone, a present", bottle:"A container for liquid, usually made of glass", token:"A small object that represents something bigger" },
  companion: `A glass bottle. That's what we have to break. And inside it, somehow, is an ancient guardian disguised as a cat. I love this job. I hate this job. I don't know.`,
  question: null,
  choices: [
    { text: "Keep going to find the owl", icon: "🦉", next: "owl" },
    { text: "Turn back and plan with Aunt Viola", icon: "📋", next: "plan" },
  ],
},

owl: {
  text: `The Old Pines were so tall they seemed to hold up the sky. You and Aunt Viola walked between them in a silence that felt **sacred**, like talking would disturb something that had been sleeping for a very long time. {C} stayed pressed against your leg. At the center of the grove stood the largest pine of all, and in its highest branches, visible only because you knew to look, sat a great gray owl. She opened her eyes as you approached. They were enormous and yellow, and they reminded you, very much, of Aunt Viola's.\n\n"You're late, Viola," the owl said. Her voice was soft and rich, like old velvet. "I have been expecting your niece for some time." Aunt Viola bowed her head. "We came as soon as we could, Mistress Owl. A Mistwalker walks in Hollowmist. He has taken the cat. Clover said you would know what to do."\n\nThe owl was quiet for a long moment. When she spoke, she spoke to you directly. "The Mistwalker's name is **Blackthorn**, yes. But that is only the name he uses here. On the other side, he is called something much older, and much more difficult to say. He is a **scavenger**. He takes what is not guarded, and he is clever, and he has come for me next." She ruffled her feathers. "I have a plan. It is risky. It involves him trying to take me and succeeding, briefly."\n\nShe fixed her great yellow eyes on you. "Listen carefully, child. Here is what we are going to do. Tonight, Blackthorn will come for me. I will let him take me, or appear to. When he puts me in his bottle, your job is to break it. Not smash it. **Break** it, carefully, with the point of an iron nail. Iron is what traps a Mistwalker. When the bottle breaks, the cat is freed, I am freed, and Blackthorn loses his **anchor**. He will be pulled back. But you must do it at the moment he completes the taking, not before. If you break the bottle too early, he will run, and try again another night. This is your one chance." Her eyes softened. "Do you understand what I am asking of you?"`,
  vocab: { sacred:"Deeply important, deserving respect", scavenger:"A creature that takes things other creatures don't want or can't protect", break:"To cause something to come apart into pieces", anchor:"Something that holds another thing in place" },
  companion: `Let the Mistwalker capture the owl on purpose, then break the bottle at exactly the right moment. This plan is bananas. But it might just work.`,
  question: `Why iron? Why does the owl say an iron nail specifically?`,
  choices: [
    { text: "Accept the plan and prepare the trap", icon: "⚒️", next: "plan" },
    { text: "Ask if there's a safer way", icon: "❓", next: "cipher" },
  ],
},

cipher: {
  text: `The symbols on this page of the journal were dense and complicated. Little spirals. Crossed lines. Drawings of leaves, keys, bells. Aunt Viola sat down beside you and pulled a lamp closer. "I've been working on this page for **decades**," she admitted. "It was written by my aunt, the previous Keeper. She wrote it in code because she was afraid a Mistwalker would steal the journal. It's a **cipher**. Each symbol stands for a letter. And it tells you, in her handwriting, how to banish a Mistwalker."\n\nShe showed you the key at the bottom of the page. The little spiral meant M. The crossed lines meant I. The leaf meant S. You worked through it together, symbol by symbol. A word emerged: MISTWALKER. Then another: IRON. Then a whole sentence: IRON BREAKS THE TOKEN. ASK AT THE WORD.\n\n"Ask at the Word," Aunt Viola read, frowning. "The Word. That's what the owl is called by the Fernfolk. The Word Who Sees. My aunt is telling us to ask the owl. The owl will know the rest." She looked at you with something new in her eyes. Not just fear now. **Determination**. "My aunt was a Keeper for forty years. She watched Thornwick fall. And she wrote this to whoever came after her, because she knew, one day, another Mistwalker would come, and whoever was Keeper then would need to know."\n\nShe closed the journal gently. "We have our answer. We need iron, and we need the owl. Everything else is just timing and **nerve**." She looked at you, and you saw, for the first time since you'd arrived, a small smile on her face. "You know, child, most nine-year-olds are home right now watching television. You've had a much more interesting day."`,
  vocab: { decades:"Periods of ten years each", cipher:"A secret code used to hide messages", determination:"Firm decision to keep trying no matter what", nerve:"Courage when you need it most" },
  companion: `Iron, timing, nerve. We've got iron. We've got a plan. Nerve, we'll figure out when we need it.`,
  question: null,
  choices: [
    { text: "Go to the Old Pines to meet the owl", icon: "🦉", next: "owl" },
    { text: "Start setting up the trap", icon: "⚒️", next: "plan" },
  ],
},

plan: {
  text: `You and Aunt Viola sat at the kitchen table with every iron object in the house spread in front of you. Old horseshoes. Rusty nails. A wrought-iron letter opener. A candle snuffer shaped like a fox. {C} watched from the windowsill, tail flicking. "The question," Aunt Viola said, "is where we catch him. He will come for the owl. The owl will let him, so the bottle is in hand. And we need to be there, invisible, ready to break the glass at the right second."\n\n"The bell tower," you said suddenly. Both Aunt Viola and {C} turned to look at you. "He likes the bell tower. He rang the bell to take Marmalade. He studied the tower with Miss Lune. He'll use the tower again because that's his... his method. His **pattern**."\n\nAunt Viola stared at you for a moment. Then she laughed, short and surprised. "You know, I think you might be right. He's a **creature** of habit. Mistwalkers always are. They don't improvise well. They follow their own rules." She stood up. "Right. The bell tower. I'll talk to Old Wiggins. He'll leave the door unlocked for us. We hide in the belfry. When Blackthorn brings the owl up to put her in the bottle, we strike."\n\nShe picked up an iron nail, long and heavy, and pressed it into your hand. "This is yours. When the moment comes, you will know. Don't think. Act. And {C}," she looked at the fox/owl/cat/dog, "you make sure our young detective **survives** the night, yes?" {C} dipped their head. "Good. Then we have a plan. We have a trap. We have a chance." She looked at the clock. "And we have three hours."`,
  vocab: { pattern:"Something that repeats in a recognizable way", creature:"A living being, usually an animal or imaginary being", survives:"Stays alive through something dangerous" },
  companion: `Three hours. One iron nail. One very, very weird plan. Let's go save a town.`,
  question: null,
  choices: [
    { text: "Head to the bell tower and wait", icon: "🔔", next: "confront" },
  ],
},

confront: {
  text: `You hid in the shadow of the great bell, your breath shallow, the iron nail cold in your hand. Aunt Viola crouched opposite you, barely visible behind the bell's supporting beam. {C} was a patch of even deeper darkness at your feet. The tower was quiet. The town below was quiet. Only the mist moved, rolling through the streets like something **alive**.\n\nAt exactly eleven minutes to midnight, the door at the bottom of the tower creaked open. Footsteps on the stairs. Slow. Careful. And then another sound: soft wings. Blackthorn was carrying the owl in a cloth. The owl was not struggling. The owl had promised you she would not struggle. You had to trust her.\n\nBlackthorn stepped into the bell chamber. He did not see you. He set the cloth down on the reading stand and opened it. The owl sat there, motionless, her great yellow eyes **gleaming**. "The Word Who Sees," Blackthorn said, with something like reverence. "You come willingly. That is unusual." He reached into his black coat and pulled out a small glass bottle. Inside, a tiny orange light was **pulsing** softly. Marmalade. The owl looked at the bottle. The owl looked at you, hidden in the shadow. The owl winked one yellow eye.\n\nBlackthorn held up the bottle. Began to whisper words you did not understand. The owl began to glow, a soft silver, and slowly, impossibly, her form began to unravel into **threads** of light that flowed, one by one, into the bottle. Your heart was hammering. Not yet. Not yet. Wait until she's all the way in. Wait for the last thread. Blackthorn's hand was steady. The last thread of silver light entered the bottle. He smiled, and reached to seal the cork. Now.`,
  vocab: { alive:"Living, not dead, having energy", gleaming:"Shining brightly", pulsing:"Moving in a rhythm like a heartbeat", threads:"Long, thin pieces of something" },
  companion: `This is it. He's distracted. The moment is NOW.`,
  question: `This is your one chance. How do you want to break the bottle?`,
  choices: [
    { text: "Leap out and smash the bottle directly", icon: "⚡", next: "ending_warden" },
    { text: "Throw the nail, aim for the bottle from hiding", icon: "🎯", next: "ending_inheritor" },
    { text: "Step out calmly and offer him a trade", icon: "🤝", next: "ending_deal" },
  ],
},

ending_warden: {
  text: `You **exploded** out of the shadows like a cannonball, iron nail raised. Blackthorn turned, his eyes going wide, but you were already swinging. The nail connected with the bottle. Glass shattered. Light **erupted** in every direction, and the bell chamber filled with a sound that wasn't a sound, a feeling of a door slamming in a very far-off place.\n\nBlackthorn screamed, and it was not a human scream. His coat unraveled. His face unraveled. His body became mist, and the mist was pulled, fighting the whole way, toward the broken bottle, and then through it, and then away, into somewhere you could not see and did not want to. Gone. Just gone. The owl reformed in a flash of silver light, ruffled her feathers, and gave you the proudest look you had ever received from any living creature. And on the floor, a small orange cat was blinking confused eyes and meowing loudly.\n\nAunt Viola crossed the chamber in three strides and scooped Marmalade up. "Oh, you foolish, marvelous creature," she murmured, kissing the cat's forehead. "Never do that again." Marmalade complained loudly about being held. The owl hopped onto the windowsill and looked at you with those ancient yellow eyes. "Well done, Keeper's child. You did not hesitate. In some **circumstances**, that is the greatest gift one can give."\n\nThe bell began to ring midnight. Twelve times. Just twelve. And somehow, impossibly, it sounded like relief. Aunt Viola put her free arm around your shoulders. "You saved the town tonight. You saved many towns, probably. And," she smiled, "you **earned** the right to know everything about this journal, this house, and this very strange family of ours. If you want to know." The owl flew off into the night. Marmalade purred like an engine. {C} leaned against your leg, warm and solid and real. The mist moved through the streets below. But it moved like mist. Not like anything else.`,
  vocab: { exploded:"Burst out with sudden energy", erupted:"Burst out suddenly and strongly", circumstances:"The conditions or situation at a particular time", earned:"Deserved because of what you did" },
  companion: `We did it. We actually did it. I am never going to be normal again. Neither are you. I think we can both live with that.`,
  ending: true, endTitle: "The Mistwarden", endEmoji: "⚡",
  endMessage: "You faced a creature older than the town itself and didn't flinch. Aunt Viola has declared you her official successor-in-training. Marmalade never leaves your side. And Hollowmist sleeps, for now, beneath a mist that obeys its boundaries. 🔔⚡🌫️",
},

ending_inheritor: {
  text: `You stayed hidden. You breathed out, slow and even. And you threw the iron nail the way Aunt Viola had shown you in the garden that afternoon, spin and wrist and follow-through. The nail flew, silent, and struck the bottle at exactly the right angle. Glass cracked. Then shattered. The bell chamber filled with silver light.\n\nBlackthorn's bottle fell from his hand. He spun, trying to find where the strike had come from, but the damage was done. The threads of silver light unwound from the broken glass. The owl reformed. Marmalade, a very small orange cat, rolled across the floor and immediately began washing her tail, **unbothered**, as if she had merely taken a short nap. Blackthorn began to **dissolve**. His face thinned. His hands became mist. "Clever," he whispered, looking toward your hiding place. "You are... Viola's true heir. Pity. We could have had such interesting conversations." He smiled one last time, and then he was gone.\n\nAunt Viola rose from her hiding place, crossed the chamber, and looked at the broken bottle, at the owl, at the cat, and finally at you. She did not say anything for a very long moment. Then, very quietly: "You could have leapt out. You could have tried to smash it yourself. But you **trusted** the plan. You stayed patient. You threw from the shadows, exactly as we discussed. That is not just bravery. That is wisdom." She bent down and picked up Marmalade, who meowed indignantly. "And wisdom, my young detective, is the rarest thing in this whole strange world."\n\nThe owl flew to the windowsill and bowed her great feathered head. "The Word Who Sees thanks you, child. You will be a Keeper. Perhaps a greater one than those who came before." Outside, the bell began to ring midnight. Twelve chimes. Clean and clear. The mist moved in the streets below. Just mist. The door was closed again. The town was whole. And somewhere, in a room you had not yet entered in Aunt Viola's house, there was a journal waiting for you, empty pages ready for your handwriting.`,
  vocab: { unbothered:"Not worried or upset", dissolve:"To melt away, to slowly disappear", trusted:"Believed in something or someone completely" },
  companion: `You didn't just win. You won the RIGHT way. There's a difference, and Aunt Viola just saw it. I think your summer just got a lot more interesting.`,
  ending: true, endTitle: "The Inheritor", endEmoji: "📓",
  endMessage: "You solved it using patience, planning, and the Journal's wisdom. Aunt Viola has offered to train you as her successor. The owl calls you 'Keeper's Child,' which the Fernfolk say is the highest honor you can earn here. Your summer in Hollowmist is only just beginning. 🦉📓✨",
},

ending_deal: {
  text: `You stepped out of the shadow. Aunt Viola hissed your name, but you held up a hand. Blackthorn whirled to face you, the bottle half-sealed. "A child, in MY tower?" he said, but there was something amused in his voice now. "You are very brave. Or very foolish. Often the same thing, in someone your age."\n\n"I want to make a trade," you said. Your voice was steady. You could not believe how steady it was. "You take the owl and the cat, and you take me instead. A keeper's child. Do you know how much information is in my head? My aunt's stories. The map of this town. The **locations** of the other keepers she knows. You would never have to come back here. You could go find easier towns. Richer ones. With better guardians." You held out your hand. "But give me the bottle first. I want to see what I'm trading for."\n\nBlackthorn studied you for a long moment. You could see the calculation in his smoky eyes. A human child was a much rarer catch than a cat. You were right, and he knew you were right. Slowly, slowly, he extended the bottle toward you. The glass was warm. The silver threads inside shimmered. And the moment your hand closed on the bottle, you twisted your wrist and slammed it, hard, against the iron base of the great bell.\n\nBlackthorn's face changed. The **amusement** vanished. "You LIED," he whispered, as his coat began to unravel. "You small, clever, LYING child." You grinned at him. You could not help it. "I'm a detective's niece," you said. "Lying is basically in the contract." The owl reformed. Marmalade, a furious orange cat, was already hissing at the space where Blackthorn had been standing. And Blackthorn himself thinned, and dissolved, and vanished into the far-off place where all Mistwalkers end up when they lose. Aunt Viola was staring at you like she had never seen you before. Then she started to laugh. Not a small laugh. A roar of a laugh. "Oh," she said, wiping her eyes, "oh, you **magnificent** thing. You are EXACTLY the right person to be my successor. Exactly."`,
  vocab: { locations:"Places where things can be found", amusement:"A feeling of being entertained or mildly interested", magnificent:"Extremely impressive, wonderful" },
  companion: `You tricked a creature older than dirt. Using words. I will tell this story at every dinner party for the rest of my life.`,
  ending: true, endTitle: "The Bargainer", endEmoji: "🤝",
  endMessage: "You didn't fight a Mistwalker. You OUTSMARTED one. Aunt Viola tells everyone the story. The Fernfolk now refer to you as 'the Small Liar Who Wins,' which is apparently a very high compliment. Marmalade follows you everywhere. And the Journal has a new name written in it: yours. 🤝📖⭐",
},
};

/* ═══ AI bridge ═══ */
async function aiBridge(txt,act,cn,lv){try{const r=await fetch("/api/bridge",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sceneText:txt,action:act,companionName:cn,level:lv})});if(!r.ok)return null;const d=await r.json();return d.text||null;}catch(e){return null;}}

/* ═══ Parser ═══ */
function PText({text,onVT}){return<>{text.split(/(\*\*[^*]+\*\*)/).map((s,i)=>{const m=s.match(/^\*\*(.+)\*\*$/);return m?<span key={i} onClick={e=>{e.stopPropagation();onVT?.(m[1]);}} style={{color:C.gold,fontWeight:700,cursor:"pointer",borderBottom:`1.5px dashed ${C.goldDim}`,transition:"color 0.2s"}}>{m[1]}</span>:<span key={i}>{s}</span>;})}</>;}

function VPop({word,def,onClose}){if(!word)return null;return<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.5)",padding:20}}><div onClick={e=>e.stopPropagation()} style={{background:C.paper,borderRadius:8,padding:"24px",maxWidth:320,border:`2px solid ${C.goldDim}`,boxShadow:`0 0 30px rgba(212,168,71,0.15)`,animation:"popIn .2s ease"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:6,height:6,borderRadius:3,background:C.gold}}/><h3 style={{margin:0,fontFamily:"'Alegreya',serif",fontSize:"1.3rem",color:C.text,fontStyle:"italic"}}>{word}</h3></div><p style={{margin:0,fontSize:".95rem",lineHeight:1.7,color:C.textMid,fontFamily:"'Alegreya',serif"}}>{def||"Keep reading to discover what this means..."}</p><div style={{marginTop:14,fontSize:".75rem",color:C.goldDim,fontWeight:700,fontFamily:"'Nunito',sans-serif"}}>✦ Added to your journal</div></div></div>;}

function NB({open,onClose,words}){if(!open)return null;return<div style={{position:"fixed",inset:0,zIndex:150,display:"flex",justifyContent:"flex-end"}}><div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.4)"}}/><div style={{position:"relative",width:"min(340px,86vw)",height:"100%",background:C.paper,display:"flex",flexDirection:"column",animation:"slideIn .3s ease",borderLeft:`3px solid ${C.goldDim}`}}><div style={{padding:"20px",borderBottom:`1px solid ${C.paperEdge}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{margin:0,fontFamily:"'Alegreya',serif",fontSize:"1.1rem",color:C.text,fontStyle:"italic"}}>Words Collected</h2><button onClick={onClose} style={{background:"none",border:"none",fontSize:"1.1rem",cursor:"pointer",color:C.textLight}}>✕</button></div><div style={{flex:1,overflow:"auto",padding:"16px 20px"}}>{words.length===0?<p style={{color:C.textLight,fontFamily:"'Alegreya',serif",fontSize:".95rem",fontStyle:"italic",textAlign:"center",padding:"30px 0"}}>Tap the gold words in the story to collect them here.</p>:words.map((w,i)=><div key={i} style={{padding:"10px 0",borderBottom:`1px solid ${C.paperEdge}`}}><div style={{fontFamily:"'Alegreya',serif",fontWeight:700,fontSize:".95rem",color:C.gold}}>{w.word}</div>{w.def&&<div style={{fontFamily:"'Alegreya',serif",fontSize:".88rem",color:C.textMid,lineHeight:1.5,marginTop:2}}>{w.def}</div>}</div>)}</div></div></div>;}

let aOk=false,sC,sR,sV;async function iA(){if(aOk)return;await Tone.start();sC=new Tone.Synth({oscillator:{type:"triangle"},envelope:{attack:.01,decay:.1,sustain:0,release:.08},volume:-18}).toDestination();sR=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"sine"},envelope:{attack:.04,decay:.3,sustain:.08,release:.4},volume:-16}).toDestination();sV=new Tone.PolySynth(Tone.Synth,{oscillator:{type:"triangle"},envelope:{attack:.04,decay:.25,sustain:.15,release:.7},volume:-14}).toDestination();aOk=true;}

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
  const pages=(gt(sc)||"").split("\n\n").filter(Boolean);
  const totalPages=pages.length;
  const isLastPage=page>=totalPages-1;
  const currentPageText=pages[page]||"";

  useEffect(()=>{try{const v=localStorage.getItem("mt9");if(v){const s=JSON.parse(v);setComp(s.c||"fox");setLvl(s.l??1);}}catch(e){}},[]);
  const save=useCallback((d)=>{try{localStorage.setItem("mt9",JSON.stringify({c:comp,l:lvl,...d}));}catch(e){}},[comp,lvl]);

  const goTo=n=>{snd(pCl);setTr(true);setBridge(null);setTimeout(()=>{setHist(h=>[...h,sid]);setSid(n);setPage(0);setShowCh(false);setTr(false);save({s:n,h:[...hist,sid]});if(contentRef.current)contentRef.current.scrollTop=0;},300);};
  const goBack=()=>{if(!hist.length)return;snd(pCl);setTr(true);setBridge(null);setTimeout(()=>{setSid(hist.at(-1));setHist(h=>h.slice(0,-1));setPage(0);setShowCh(false);setTr(false);},300);};
  const nextPage=()=>{if(!isLastPage){snd(pCl);setPage(p=>p+1);if(contentRef.current)contentRef.current.scrollTop=0;}else{setShowCh(true);if(sc.ending)snd(pVi);else snd(pRv);}};
  const hvt=w=>{const d=sc?.vocab?.[w]||sc?.vocab?.[w.toLowerCase()]||null;setVP({word:w,def:d});setWords(p=>{if(p.find(x=>x.word.toLowerCase()===w.toLowerCase()))return p;return[...p,{word:w,def:d}];});setNbB(true);snd(pCl);};
  const hCA=async()=>{if(!cAct.trim()||!sc)return;setBLoad(true);const r=await aiBridge(gt(sc),cAct.trim(),cd.name,lvl);setBridge(r||`${cd.name} thinks for a moment. "Interesting idea. Let's keep focused on what's in front of us, though."`);setCAct("");setBLoad(false);};
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

        <div style={{marginBottom:16}}>
          <div style={{fontSize:".7rem",letterSpacing:3,color:C.goldDim,fontWeight:800,textTransform:"uppercase",marginBottom:8}}>Your Partner</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {COMPANIONS.map(c=>(<button key={c.id} onClick={()=>{setComp(c.id);snd(pCl);}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:8,cursor:"pointer",border:comp===c.id?`2px solid ${C.gold}`:`2px solid ${C.bgLight}`,background:comp===c.id?C.bgLight:C.bgMid,transition:"all .2s",textAlign:"left"}}><span style={{fontSize:24}}>{c.emoji}</span><div><div style={{fontWeight:800,fontSize:".85rem",color:comp===c.id?C.goldBright:C.white}}>{c.name}</div><div style={{fontSize:".65rem",color:C.goldDim,lineHeight:1.3}}>{c.desc}</div></div></button>))}
          </div>
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
        <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>{cd.emoji}</span><span style={{fontSize:".75rem",color:C.goldDim,fontWeight:700}}>{cd.name}</span></div>
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
              <span style={{fontSize:".65rem",color:C.textLight,fontFamily:"'Alegreya',serif",fontStyle:"italic"}}>{hist.length>0?`Clue ${hist.length+1}`:""}</span>
            </div>
            <div style={{flex:1,padding:"12px 24px 16px",position:"relative",zIndex:1,overflow:"auto"}}>
              <div style={{fontFamily:"'Alegreya',serif",fontSize:lv.fs,lineHeight:lv.lh,color:C.text}} key={`${sid}-${page}`}>
                <PText text={currentPageText} onVT={hvt}/>
              </div>
            </div>
            {!showCh&&<div style={{padding:"8px 20px 16px",position:"relative",zIndex:1,textAlign:"right"}}>
              <button onClick={nextPage} style={{background:"none",border:"none",cursor:"pointer",color:C.gold,fontFamily:"'Alegreya',serif",fontSize:".9rem",fontWeight:700,fontStyle:"italic",padding:"8px 0",transition:"opacity .2s"}}>{isLastPage?"Continue →":"Turn page →"}</button>
            </div>}
          </div>

          {showCh&&<div style={{marginTop:12}}>
            {sc.companion&&<div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10,animation:"fadeUp .3s ease"}}><span style={{fontSize:20,flexShrink:0,marginTop:2}}>{cd.emoji}</span><p style={{margin:0,fontSize:".85rem",lineHeight:1.6,color:C.goldDim,fontStyle:"italic",fontFamily:"'Alegreya',serif"}}>"{sc.companion.replace(/\{C\}/g,cd.name)}"</p></div>}
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
