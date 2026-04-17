/* ═══════════════════════════════════════════════════
   Case File No. 1 — The Hollowmist Bell
   Full branching: choices matter, paths diverge,
   consequences follow. 26 scenes, 3 climax variants.
   ═══════════════════════════════════════════════════ */

export const meta = {
  id: "hollowmist_bell",
  number: 1,
  title: "The Hollowmist Bell",
  subtitle: "Some bells ring thirteen for a reason",
  available: true,
  startScene: "start",
  estimatedMinutes: 20,
};

export const scenes = {

start: {
  text: `The bus left you at the edge of Hollowmist just as the sun was bleeding out behind the pines. You dragged your suitcase down Main Street, wheels rattling over cobblestones that did not all sit flat, and tried to remember why you'd agreed to spend the summer with a great-aunt you had met exactly once, at a funeral, when you were four.

A raven landed on your suitcase. He was large and black and looked at you the way a substitute teacher looks at the class on the first day: sizing things up and already regretting everything. "You're late," he said. Because in Hollowmist, apparently, ravens talked. "I'm Corvid. Your aunt sent me. She's busy. Something about a missing cat and a bell that has opinions." He lifted off the suitcase, circled once, and landed on the gate of a narrow, three-story house at the top of the lane.

The front garden was thick with plants you didn't recognize. One of them, you would swear later, turned its **petals** to watch you walk past. The front door was open. Inside: the sound of someone talking very fast, the smell of something burning on the stove, and a stack of books taller than you blocking the hallway.

Great-Aunt Viola appeared around the corner, short and sharp-eyed, gray hair escaping from its pins. She looked at you, looked at her watch, looked at you again. "Good. Kitchen. Don't touch the notebook on the table. Tea's almost ready. It might also be on fire." She vanished.

On the kitchen table, in the middle of a mess of maps and old photographs, sat a leather-bound notebook with a brass clasp. Strange symbols were pressed into the cover. It practically **hummed**. Don't touch the notebook, she'd said.`,
  vocab: { petals:"The colored parts of a flower, usually soft and thin", hummed:"Vibrated with quiet energy, like something alive" },
  companion: `She said don't touch it. I am not telling you what to do. I am simply noting that she said don't touch it.`,
  newPeople: ["Great-Aunt Viola: sharp-eyed, distracted, something burning on the stove"],
  newPlaces: ["Thornberry Lane: Viola's crooked three-story house"],
  newClues: ["A notebook Viola said not to touch", "A missing cat and a bell with 'opinions'"],
  choices: [
    { text: "Open the notebook", icon: "📓", next: "sneak_journal" },
    { text: "Explore the house while she's busy", icon: "🏠", next: "explore_house" },
  ],
},

explore_house: {
  text: `You left the notebook alone. For now.

The house was three stories of organized chaos. The first floor was books, maps, and things in jars you chose not to examine. The second floor had bedrooms. Yours was small and clean with a window overlooking the garden. From this height, the garden was even stranger. The plants were arranged in a **spiral**, and at the center was a stone birdbath filled with water that was not quite the right color.

Corvid followed you at a distance, perching on doorframes, saying nothing, watching everything. You got the feeling he was grading your curiosity.

On the third floor landing, you found a door that was locked. Not unusual, except the air around it was ten degrees colder than the rest of the house. You pressed your hand to the wood. Your breath came out white. In the middle of July. "Don't," said Corvid, from the bannister. Just the one word, and the most serious you'd heard him.

From downstairs, Viola called: "TEA. NOW. And stop sniffing around the third floor, I can hear you breathing up there." You heard her mutter: "Exactly like Helena." Back in the kitchen, the tea was rescued. The notebook was still on the table. Still humming. Viola was on the phone, her back to you, speaking fast and low. You caught fragments: "...thirteen last night... yes, I KNOW... Marmalade hasn't come home..." The notebook was right there. She wasn't looking.`,
  vocab: { spiral:"A curve that winds outward from a center, like a snail shell" },
  companion: `I notice you are looking at the notebook again. I notice your aunt is not looking at you. I am merely observing these facts.`,
  newClues: ["A locked door on the third floor that radiates cold in July", "Garden plants in a spiral around a birdbath of odd-colored water", "Viola on the phone: the bell rang 13 last night"],
  choices: [
    { text: "Open the notebook while she's on the phone", icon: "📓", next: "sneak_journal" },
    { text: "Try the cold door on the third floor", icon: "🚪", next: "cold_door" },
  ],
},

cold_door: {
  text: `You crept back up to the third floor. The cold was stronger now, pressing through the wood like winter leaking from a crack. You tried the handle. Locked. But the lock was old, and the keyhole was wide, and when you pressed your eye to it, you could see through to the other side.

The room beyond was not a room. It was stone. Rough, carved-out stone, lit by a faint silver glow that had no source. The floor was marked with a circle of symbols, and inside that circle, the air **shimmered**. Like heat off a summer road, except this shimmer was cold, and it moved in slow pulses, like something breathing.

You pulled your eye away. Your cheek was numb from the cold.

"I told you," Corvid said. He was on the bannister behind you, feathers puffed against the chill. "That is not a room you visit without your aunt's permission. That is a room that visits YOU if you are not careful."

From below, a crash. Viola had dropped something. Her voice carried up: "{NAME}! Where ARE you? Come DOWN here, I need to talk to you, and bring that BIRD with you!"

Corvid sighed. "We have been summoned. But now you have seen it through the keyhole, and you cannot unsee it. That changes things." He flew downstairs. You took one last look at the cold door and followed.

In the kitchen, Viola was holding the notebook and staring at you with the expression of someone who has just realized their summer is going to be more complicated than planned. "Sit," she said. "We need to talk about this town. But first, I need you to go to the bell tower for me. Something was left there last night, and I need to know what it is."`,
  vocab: { shimmered:"Flickered with a soft, unsteady light" },
  companion: `You saw the thin place through a keyhole. Most people live their whole lives without seeing it at all. I am not sure if that makes you lucky or the opposite.`,
  newClues: ["Behind the cold door: a stone chamber with a glowing circle of symbols", "The air inside the circle shimmers and pulses like breathing", "Viola now wants you to go to the bell tower"],
  newPlaces: ["The chamber behind the cold door: stone walls, silver glow, a circle"],
  choices: [
    { text: "Go to the bell tower", icon: "🔔", next: "sneak_out" },
  ],
},

sneak_journal: {
  text: `You opened it.

The first page: **Helena Ashford, Keeper of Hollowmist. This Journal records all anomalies. If found, return to Thornberry Lane. Do not speak of what you have seen.** The handwriting was old and careful. Not Viola's.

You turned pages fast. Sketches of creatures you didn't recognize. Maps of the town with silver lines drawn over them. Dates circled in red, decades apart: 1962, 1987, 2004. Each one labeled with a single word: **Thirteen**. And next to each, a note. A dried violet with "Thornwick" written beside it. A polaroid of a smiling boy. A news clipping about a fire.

Then: last night's date, written in Viola's handwriting. Fresh ink. **"Thirteen. Marmalade gone. He is back."** Three words underlined twice: **THE BELL TOWER**.

You looked at the back door. The bell tower was visible from the kitchen window, a dark stone finger pointing at a gray sky. You could be there in ten minutes. Viola was still on the phone.

Corvid landed on the windowsill. He looked at the journal, open in your hands. He looked at the back door. He looked at you. "This," he said, "is a spectacularly bad idea." He paused. "I'm coming."`,
  companion: `For the record: bad idea. For the record: I said so. For the record: I am coming anyway because someone has to keep you alive.`,
  newPeople: ["Helena Ashford: previous Keeper, wrote the journal"],
  newClues: ["Dates circled in red decades apart, each labeled 'Thirteen'", "Last night's entry: 'Thirteen. Marmalade gone. He is back.'", "THE BELL TOWER underlined twice"],
  choices: [
    { text: "Sneak out to the bell tower", icon: "🚪", next: "sneak_out" },
    { text: "Wait for Viola and ask about the journal", icon: "🙋", next: "ask_viola" },
  ],
},

ask_viola: {
  text: `Viola hung up the phone, turned around, and found you sitting at the table with the journal open in front of you. Her face went through approximately four emotions in two seconds: surprise, anger, resignation, and something that looked almost like relief.

"You read it," she said.

"You told me not to touch it."

"Yes. And you touched it. Because you are apparently EXACTLY like every other Ashford woman going back four hundred years." She sat down across from you, took the journal, closed it gently, and folded her hands on top of it. "Fine. Ask your questions. You get three, because that is all we have time for, and then you are going to the bell tower for me."

"What's Thornwick?" you asked.

Viola's expression tightened. "A town that used to be on the other side of the mountain. It is no longer there. Not destroyed. **Erased**. The road exists. The sign exists. Where the town was, there is mist, and the mist does not let you through."

"What rang thirteen?"

"Something that should not be in Hollowmist. Something that comes back every few decades to try the same trick. He has a name. You will learn it soon enough."

"What happened to Helena?"

Viola was quiet for a long time. "She stopped him. The last time he came. She succeeded and she did not come back from succeeding." She stood up. "That's three. Go to the bell tower. Something was left there last night and I need to know what it is. Take Corvid. Be **careful**. And {NAME}? Come home before dark."`,
  vocab: { erased:"Completely removed, as if it never existed", careful:"Making sure to avoid danger or mistakes" },
  companion: `Three questions. Three answers that each deserve a hundred more questions. But she said go, so we go. Tower. Now.`,
  newClues: ["Thornwick: a town erased from existence, replaced by impassable mist", "Something comes back every few decades to try the same trick", "Helena stopped it last time but didn't come back"],
  choices: [
    { text: "Head to the bell tower", icon: "🔔", next: "sneak_out" },
  ],
},

sneak_out: {
  text: `The evening air was cool and wet and smelled like pine needles and pennies. Corvid flew ahead, a black shape against the darkening sky.

The mist was coming in. Not normal fog. This mist moved in slow, deliberate **tendrils**, curling around lampposts and pooling in doorways like something testing the edges of where it was allowed to go. A streetlight flickered. Steadied. Flickered again. Went out.

"Faster," said Corvid, from somewhere above you.

The bell tower loomed at the center of town, and looming was exactly the right word. It was tall and dark and crooked, made of stone so old it looked like it had grown out of the ground rather than been built. The door at the base was heavy oak, banded with iron. You pushed it. It swung open on silent hinges. That felt wrong. Old doors should creak. These hinges had been **oiled** recently.

Inside: a spiral staircase winding up into the dark. The walls were covered in tally marks, scratched into the stone in different handwritings across different centuries. Someone had been counting things here for a very long time. You started climbing.`,
  vocab: { tendrils:"Long, thin, curling shapes, like the reaching fingers of a vine", oiled:"Made slippery and quiet with oil, on purpose" },
  companion: `Those hinges were oiled. Someone has been here recently, and they didn't want anyone to hear the door.`,
  newPlaces: ["The Bell Tower: oldest building in town, centuries of tally marks"],
  newClues: ["The mist moves like something alive, testing boundaries", "The tower door hinges have been oiled recently"],
  choices: [
    { text: "Keep climbing", icon: "⬆️", next: "tower_alone" },
  ],
},

tower_alone: {
  text: `At the top: the bell chamber. A single iron bell the size of a dinner table hung from thick chains. Beside it, on a wooden stand, a ledger lay open. Rows of pencil entries, one per night. 12. 12. 12. 12. For years. Then last night. "13." Written in something rust-colored and thin. Not pencil. Not ink.

"That is blood," Corvid said, landing beside it. "Left on purpose. That is a **signature**, not an accident."

You searched the chamber. In the far corner, where stone met stone at an awkward angle, something caught the gray light. A feather. Long, thin, and a deep matte black that seemed to drink light rather than reflect it. Even from a few inches away, you could feel the cold coming off it like an open freezer.

Corvid went rigid. "Do NOT touch that with bare hands. That feather is a **conduit**. If you touch it, whatever left it here will know you exist. It will see you. It will know where you are."

He looked around the chamber, then back at you. "There's a rag on the ledger stand. Wrap it. We take it to your aunt. Carefully."

You looked at the feather. You looked at the rag. The feather was RIGHT there.`,
  vocab: { signature:"A mark left to show who was responsible", conduit:"A channel that connects two things, letting something pass between them" },
  companion: `I cannot stress this enough. Do not touch it with your hands. I realize I have the credibility problem of having also told you not to go to the tower and here we are. But THIS time I mean it.`,
  newClues: ["The '13' was written in blood, like a signature", "A cold black feather that absorbs light", "Corvid says touching it will alert whatever left it"],
  choices: [
    { text: "Touch it anyway", icon: "✋", next: "touch_feather" },
    { text: "Wrap it in the rag like Corvid said", icon: "🧤", next: "wrap_feather" },
  ],
},

touch_feather: {
  text: `You touched it.

The world went sideways. Your vision whited out, then went dark, and in that dark you saw: a pair of eyes the color of smoke, a glass bottle with something orange and glowing trapped inside, and a thin smile that was too wide for the face it was on. The smile spoke. "I see you, {NAME}." Then it was over. You were on the bell chamber floor, feather in your hand, heart slamming.

Corvid was staring at you. Every feather on his body was standing on end. "Oh no," he whispered. "{NAME}. He knows you're here now. He saw your face. He heard your name."

"How does he know my name?"

"Because the feather is a piece of HIM, and when you touched it, he touched YOU. Everything you are. Name, face, memories, all of it, for one second, open like a book." Corvid's voice was tight with something you had never heard from him before: fear.

From the bottom of the tower: the sound of a door opening on oiled hinges. Footsteps on the stairs. Slow. **Deliberate**.`,
  vocab: { deliberate:"Done slowly and on purpose" },
  companion: `He is coming. He knows your name. He knows your face. And I TOLD you not to touch it.`,
  newClues: ["Touching the feather triggered a vision: smoke eyes, a glass bottle, a smile", "Blackthorn now knows your name and face", "The feather is a piece of him"],
  choices: [
    { text: "Hide behind the bell", icon: "🔔", next: "blackthorn_knows" },
    { text: "Run for the stairs", icon: "🏃", next: "blackthorn_knows" },
  ],
},

wrap_feather: {
  text: `You grabbed the rag from the ledger stand, wrapped it around your hand, and picked up the feather. No vision. No white flash. Just a feather in a cloth, cold enough to feel through the fabric, but contained.

Corvid exhaled. You didn't know ravens could sigh with relief, but this one did. "Good. Smart. That rag is cotton and cotton doesn't **conduct**. He didn't feel you. We have the feather and he doesn't know we have it."

You tucked the bundle into your jacket pocket. The cold seeped through, but it was bearable. You had evidence now. Real evidence.

Then, from the bottom of the tower: the sound of a door opening on oiled hinges.

Corvid's head snapped toward the stairwell. "Someone's coming," he hissed. "And they are not in a hurry, which means they are **confident**, which means they are dangerous." He looked around the chamber. Behind the bell, there was a narrow gap between the iron and the wall, just wide enough for a kid. "Hide," he said. "NOW. I'll perch high and stay still. He won't notice me. Probably."`,
  vocab: { conduct:"To pass something through, like heat or electricity or magic", confident:"Sure of yourself, not worried" },
  companion: `You listened to me. For once. We have the feather and he doesn't know it. That is an advantage. Do not waste it by getting caught.`,
  newClues: ["The feather is wrapped safely, Blackthorn doesn't know you have it", "Someone is coming up the tower stairs"],
  choices: [
    { text: "Hide behind the bell and watch", icon: "👁️", next: "blackthorn_unknown" },
  ],
},

blackthorn_knows: {
  text: `Too late for either. The footsteps reached the top and a man stepped into the chamber.

He was tall. Very tall. He wore a plain black coat that seemed to have more darkness in it than fabric should hold. His features were sharp, his eyes the color of smoke. He looked at you the way someone looks at an interesting insect on their lunch.

"Ah," he said. His voice was warm and pleasant and made the back of your neck go cold. "{NAME}." He said your name like he was tasting it. "Viola's niece. Holding my feather. Uninvited."

He knew everything. He knew it because you had touched the feather and given it to him.

"I'm going to give you a choice," he said. "Walk out. Enjoy your summer. Forget this. Children are good at forgetting." He smiled, and you noticed his teeth were very straight and very white and there were too many of them. "Or stay, and learn what happens to curious people in this town. Your great-great-aunt Helena was curious. She is no longer anything at all."

Corvid was frozen on the ledger stand. You were alone in this conversation.`,
  newPeople: ["Mr. Blackthorn: tall, black coat, smoke eyes, knows your name"],
  newClues: ["Blackthorn called the tower 'my tower'", "He knew Helena and implies she is dead or gone"],
  choices: [
    { text: "Pretend to be a dumb tourist kid", icon: "😶", next: "bluff" },
    { text: "Look him in the eye and say nothing", icon: "👁️", next: "staredown" },
  ],
},

blackthorn_unknown: {
  text: `You pressed yourself behind the bell, heart hammering. Corvid was a shadow among shadows in the rafters. The footsteps reached the top.

The man who entered was tall. Very tall. Black coat. Sharp features. Eyes like smoke in a cold room. He walked to the ledger stand, checked last night's entry, and nodded once, satisfied. He did not know you were there. He walked to the corner where the feather had been. He crouched. He looked at the empty floor. His hand hovered over the spot where the feather had lain.

He stood up slowly. Something in his posture changed. The **casualness** dropped away. He turned in a slow circle, scanning the chamber, and you pressed yourself flatter against the wall and did not breathe.

"Someone has been here," he said softly, to no one. "Someone has taken my marker." His voice was still pleasant. That made it worse. "Interesting. Perhaps Viola has found a new set of hands."

He stood very still for a long moment. Then he turned and walked back down the stairs. Unhurried. You did not move for a full minute after the footsteps faded.

Corvid dropped from the rafters. "He doesn't know it was you," he whispered. "He knows SOMEONE took the feather. He suspects Viola. He does not know about YOU. That, {NAME}, is the most **valuable** thing we have right now."`,
  vocab: { casualness:"A relaxed, not-worried attitude", valuable:"Worth a lot, important to protect" },
  newPeople: ["Mr. Blackthorn: tall, black coat, smoke eyes, did not see you"],
  newClues: ["Blackthorn knows the feather was taken but not by whom", "He suspects Viola but doesn't know about you", "Your anonymity is an advantage"],
  choices: [
    { text: "Sneak out and run home", icon: "🏃", next: "escape_safe" },
  ],
},

bluff: {
  text: `"I'm just, um, visiting," you said. "My aunt said the tower had a nice view."

Blackthorn studied you. The smoke in his eyes shifted. Then he smiled wider, and you noticed too many teeth.

"A tourist," he said. "How **delightful**." He did not believe you. But he stepped aside and gestured toward the stairs like a doorman at a haunted hotel. "By all means. Do give Viola my regards."

You were halfway down the stairs when you heard it: BONG. The bell. He was ringing it, in the middle of the evening, for no reason except to show you he could.

"Move," Corvid hissed. "**Move**."`,
  vocab: { delightful:"Very pleasant (but when Blackthorn says it, he means the opposite)" },
  companion: `He let us go. That is not kindness. That is him not being worried. Much worse than kindness.`,
  newClues: ["Blackthorn let you go but rang the bell as you left, a show of power"],
  choices: [
    { text: "Run home", icon: "🏃", next: "escape" },
  ],
},

staredown: {
  text: `You didn't speak. You looked at Blackthorn and did not blink. Your hands were shaking but you held them still.

Something changed in his face. The pleasant mask **flickered**. For one second, you saw what was under it: not a face exactly, but the shape of where a face should be, like a mask over empty air. Then it was back.

"You are not afraid," he said.

"I am," you said. "But I'm staying anyway."

Silence. Then: "Then you will regret it. Not today. But soon. I will see you again, {NAME}." He turned and walked toward the bell. You did not wait. You were down those stairs so fast your feet barely touched stone.

Behind you: BONG. A **reminder**.`,
  vocab: { flickered:"Went on and off quickly, like a light with a loose connection", reminder:"Something meant to make sure you don't forget" },
  companion: `You looked a Mistwalker in the eye and did not flinch. I am impressed. I am also terrified. Both things are true.`,
  newClues: ["Blackthorn's face flickered: underneath the mask, something empty"],
  choices: [
    { text: "Run home", icon: "🏃", next: "escape" },
  ],
},

escape: {
  text: `You ran. Hollowmist at dusk was wrong. The mist had thickened, filling streets like slow water. Things were different. Small things.

The bench where an old badger had been reading was empty. The newspaper was still there, open to a page that was now **blank**. Every word gone. A street sign that should have said "Hemlock Row" was smooth and featureless. A mailbox was missing entirely. The sidewalk where it had been was smooth, as if it had never existed.

Past the bakery, where the window display was empty and the baker was staring at his hands like he'd forgotten what they were for. Past the general store, where Mrs. Puddleford was gripping her doorframe, staring at the mist.

"Child," she called out. "Child, WAIT."`,
  companion: `Things are disappearing. Not broken. Erased. Like they were never there.`,
  newClues: ["Words vanishing from paper, street names gone, a mailbox erased", "The disappearances are silent, as if the things never existed"],
  newPlaces: ["Hemlock Row: a street whose name is vanishing"],
  choices: [
    { text: "Stop and talk to Mrs. Puddleford", icon: "🗣️", next: "puddleford" },
    { text: "Keep running, get home", icon: "🏃", next: "home_angry" },
  ],
},

escape_safe: {
  text: `You crept down the stairs, one step at a time, listening. Silence. Corvid flew ahead, checking each landing. At the bottom, the door was ajar. The street was empty. Blackthorn was gone.

You walked fast. Not running. Running attracts attention. Corvid rode your shoulder, claws tight, scanning the mist. Because mist there was, thick and slow and wrong, curling around lampposts and pooling in doorways.

Things were different. You noticed because your brain was running hot. A newspaper on a bench, open to a page that was **blank**. A street sign with no name on it. A gap in a row of houses where there should not be a gap.

"Don't look," Corvid said. "Keep walking."

Mrs. Puddleford was in the doorway of the general store, gripping the frame. She saw you and called out: "Child! You, Viola's niece! Come here, quickly."`,
  vocab: { blank:"Completely empty, with nothing written or printed" },
  companion: `Things are disappearing. That means the seal is weakening. That means he has already done something tonight. Move.`,
  newClues: ["Words vanishing from paper, street names gone, houses missing", "The seal is weakening because Marmalade is gone"],
  newPlaces: ["Hemlock Row: a street losing its name"],
  choices: [
    { text: "Stop and talk to Mrs. Puddleford", icon: "🗣️", next: "puddleford" },
    { text: "Keep going, get home", icon: "🏃", next: "home_angry" },
  ],
},

puddleford: {
  text: `Mrs. Puddleford pulled you into the shop and shut the door. She was a large marmot with flour on her apron and the look of someone who had been brave all day and was running out.

"I know what's happening," she said, without preamble. "I was here the last time. 1987. I was a girl. Younger than you." She gripped the counter. "Things disappeared then, too. The name of my street. My mother's handwriting in a recipe book. A tree in our garden that had been there for a hundred years. Just gone. And then Viola's aunt stopped it, and everything came back, and we all agreed to never speak of it."

She pressed a paper bag into your hands. Shortbread. "Take this to Viola. And tell her: the man in the black coat has been watching her house. Every evening. Behind the **hawthorn** hedge. I have seen him four times this week."

She held the door open. "Go home, child. Tell your aunt everything. And be braver than I was." Her eyes were wet. "I hid, in '87. I hid and let Helena do it alone. I have regretted it for forty years."`,
  vocab: { hawthorn:"A small tree with white flowers and sharp thorns" },
  companion: `She just gave us two things: the knowledge that the disappearances are reversible if we stop him, and a tactical detail about his position. Both matter.`,
  newPeople: ["Mrs. Puddleford: general store owner, survived the 1987 event as a girl"],
  newClues: ["Disappearances are reversible if the Mistwalker is stopped", "Blackthorn watches Viola's house nightly from behind the hawthorn hedge", "Mrs. Puddleford hid in 1987 and regrets it"],
  choices: [
    { text: "Run home to Viola", icon: "🏠", next: "home_angry" },
  ],
},

home_angry: {
  text: `You slammed through the front door and stood in the hallway, chest heaving. Aunt Viola was at the end of the hall. Arms crossed. Face like a storm.

"You went to the tower," she said. Not a question. "Without telling me."

You told her everything. The journal. The tower. The blood-ink entry. The feather. Blackthorn. The disappearing street names. All of it, fast.

Viola listened without interrupting. When you finished, she pinched the bridge of her nose. "You are either the bravest child I have ever met or the most **reckless**, and it doesn't matter right now because you have done something useful and something dangerous at the same time."

She looked at you. Really looked. "Come with me. I need to show you what we're sitting on top of."

She pulled a key from around her neck and walked toward the back of the house, past a door you hadn't noticed before.`,
  vocab: { reckless:"Doing something dangerous without thinking about what might go wrong" },
  companion: `She's not angry. She's afraid for you. There's a difference. Pay attention to the difference.`,
  choices: [
    { text: "Follow her", icon: "🚪", next: "basement" },
  ],
},

basement: {
  text: `The stairs went down into stone.

The room was not a basement. It was a **chamber**, round-walled, carved from bedrock. And on the floor, in the exact center, drawn in silver that caught the lamplight: a circle of symbols. Inside the circle, the air shimmered. You could see it. A faint ripple, like heat off pavement, except it was cold. Your breath came out white.

"That is the thin place," Viola said. "The seam between our world and what's behind it. Three creatures hold it shut. A cat. An owl. A crow. Marmalade was the cat. She's gone. That's why things are disappearing upstairs."

She reached into a wooden box and pulled out an iron nail, long and heavy. She held it out to you.

"This belonged to Helena. She never got to use it. Iron breaks his bottle. The bottle is how he captures the Wardens." One sentence. No story. "You're going to throw it when the time comes. You're not going to miss."

She set the nail in your hand. It was colder than the room and heavier than it should be.

"Now. He's going for the owl tonight. I'm sure of it. But we need to know where he's working from, because if we know that, we know his timing. We have two options."`,
  companion: `The nail is yours now. Do not lose it. Do not put it down. It belonged to someone who carried it into the dark and did not come back. Carry it better than she did.`,
  newPlaces: ["The chamber beneath the house: the thin place, the seal"],
  newPeople: ["Helena Ashford: previous Keeper, carried this nail, didn't return"],
  newClues: ["Three Wardens hold the seal: cat (taken), owl, crow", "Iron breaks Blackthorn's glass bottle", "He's going for the owl tonight"],
  choices: [
    { text: "Find Blackthorn's workshop", icon: "🔍", next: "find_workshop" },
    { text: "Visit Miss Lune the clockmaker for information", icon: "⏰", next: "visit_lune" },
  ],
},

visit_lune: {
  text: `Miss Lune's shop was a narrow room where every surface ticked. Grandfather clocks, pocket watches, a clock made from a beehive. None of them agreed about the time.

Miss Lune was tall, sharp, and wasted no time. She locked the door behind you and set a bronze **cog** on the counter. "This was wedged in the bell's striker assembly. It's from a Stillwatch, a device that suspends a single second of time. Someone used it to force a thirteenth strike."

"Who could build one?"

"Four people in the world. Three are dead. The fourth calls himself Blackthorn." She pushed the cog toward you. "He's built a Stillwatch and it's now missing this tooth. He'll need to replace it, which means he has a workshop somewhere in Hollowmist. Find the workshop, find the timing."

At the door, she put one hand on your shoulder. "Be clever, {NAME}. He's been doing this longer than this town has been standing."`,
  vocab: { cog:"A small gear wheel with teeth that fit into another gear" },
  companion: `A workshop. He needs a workspace. Corvid has eyes and wings. Corvid will find it.`,
  newPeople: ["Miss Lune: clockmaker, precise, understands the bell's mechanism"],
  newPlaces: ["The Clockmaker's Shop: every clock ticking out of sync"],
  newClues: ["A bronze cog from a Stillwatch forced the 13th strike", "Blackthorn has a workshop somewhere in town"],
  choices: [
    { text: "Find the workshop", icon: "🔍", next: "find_workshop" },
  ],
},

find_workshop: {
  text: `Corvid found it. Of course he did.

"Old root cellar," he reported. "Behind the abandoned dairy on Cutter's Lane. Chimney producing smoke that shouldn't be there. Door opened recently."

The root cellar was exactly where Corvid said. Oiled hinges again. Inside: a workbench with organized chaos. A half-built Stillwatch, small as a pocket watch, missing one cog. Sketches of three animals pinned to the wall: a cat, an owl, a crow. Each with measurements and a date. The cat's date was two days ago. Crossed off. The owl's date was **tonight**.

And in the center of the bench, on black velvet: a glass bottle. Small as a fist. Faintly warm. Inside, a tiny light pulsed orange.

"Marmalade," you whispered.

Corvid was very quiet. Then: "Don't touch the bottle. If you break it here, she's freed but he escapes. He has to be mid-ritual when it breaks. That's the only way to send him back and free her at the same time."

You looked at the date on the owl sketch. Tonight. You looked at the bottle with the orange glow.`,
  companion: `Tonight. Not tomorrow. That light is Marmalade and she has been in there for two days. Let's move.`,
  newPlaces: ["Root cellar on Cutter's Lane: Blackthorn's workshop"],
  newClues: ["Sketches of all three Wardens: cat crossed off, owl marked TONIGHT", "The glass bottle holds Marmalade, pulsing orange", "Must break bottle during ritual or Blackthorn escapes"],
  choices: [
    { text: "Go home and make a plan with Viola", icon: "📋", next: "plan" },
    { text: "Smash the bottle right now and free Marmalade", icon: "💥", next: "smash_early" },
  ],
},

smash_early: {
  text: `You grabbed the nail and swung.

Corvid screamed "NO!" but the nail was already in motion. It hit the glass. The bottle cracked. Orange light burst out like a sunrise in a cellar. The light swirled, condensed, and a very small, very angry orange cat materialized on the workbench, fur standing on end, hissing at everything.

"BREAKFAST," Marmalade yowled. "I was promised BREAKFAST two days ago and I am OWED."

But Corvid was not celebrating. He was staring at the shattered bottle, feathers flat with dread. "You freed her," he said. "That's good. But the bottle broke without the ritual in progress. He wasn't connected to it. He felt it shatter and now he KNOWS, and he is going to move on the owl immediately, tonight, right now, and he is going to be **furious**."

The workshop door banged open. Wind that smelled like struck matches blasted through. In the distance, toward Hunter's Ridge, you heard something that was not thunder and was not a bell and was not anything that should exist.

"He's going for the owl NOW," Corvid said. "Right now. Not at midnight. Now. Because we took his prize and he is going to take the next one before we can stop him." He looked at you. "Run. HUNTER'S RIDGE. We do not have time for a plan. We have time for running."

Marmalade jumped off the bench and streaked out the door ahead of you, ears flat. Apparently she understood exactly what was happening.`,
  vocab: { furious:"Extremely angry, beyond normal anger" },
  companion: `You freed the cat. You broke the plan. Both of those things happened at the same time. Now RUN.`,
  newClues: ["Marmalade is free but Blackthorn felt the bottle break", "He's going for the owl right now, no time for a plan"],
  choices: [
    { text: "Sprint to Hunter's Ridge", icon: "🏃", next: "rush_ridge" },
  ],
},

plan: {
  text: `Viola drew on the back of an old envelope. An oval clearing. A flat stone. Trees. Three positions: Viola visible at the treeline. You hidden behind a fallen log. Corvid in the air.

"The ritual takes seven minutes and twenty seconds," she said. "He opens the bottle, sings in a voice that doesn't come from his mouth, and the owl is drawn in as threads of silver light. At the six-minute mark, I say a word. The word is **hawthorn**. When you hear it, you throw. Not before. Not after."

"What if I miss?"

"Then we lose the owl and we try again for the crow. And I will have to do something I've spent forty years avoiding." She did not explain.

Corvid landed on the table. "I have one question. {NAME}, have you ever thrown anything accurately?"

"I won a stuffed bear at a carnival," you said. "Throwing baseballs at bottles."

Corvid looked at Viola. "Bottles," he said. "Well. That's **thematically** appropriate."`,
  vocab: { hawthorn:"A small tree with white flowers, used as the codeword", thematically:"Related to the main idea or theme of something" },
  companion: `Bottles at a carnival. I was hoping for military experience, but carnival bottles will have to do.`,
  newPlaces: ["Hunter's Ridge: the clearing where the ritual happens"],
  newClues: ["Ritual takes 7:20. Codeword is 'hawthorn' at the six-minute mark."],
  choices: [
    { text: "Head to Hunter's Ridge", icon: "🌅", next: "rush_ridge" },
  ],
},

rush_ridge: {
  text: `The walk to Hunter's Ridge took twenty minutes and felt like two hours. The mist was worse. On Main Street, a shop that had displayed pastries that morning was dark and empty. Its sign was gone. The wall was smooth.

Corvid reported from above: "Hemlock Row has lost two houses. Not destroyed. **Absent**. Gaps in the street like missing teeth."

The forest was dark. The pines were old and enormous. Viola navigated without hesitation. You tripped on roots twice. Corvid, unhelpfully, said "tree root" both times, approximately one second too late.

The clearing appeared like a held breath. An oval of wet grass. A flat stone in the center. Viola pointed to the fallen log. You crouched behind it, iron nail cold in your fist. She moved to the treeline. Corvid vanished into the canopy.

The stars came out. The mist came up. The waiting began.`,
  vocab: { absent:"Not there, missing, as if it was never there" },
  companion: `Quiet now. He is coming. Breathe slow. Grip steady.`,
  newClues: ["Houses disappearing now, not just small things"],
  choices: [
    { text: "Wait for him", icon: "⏳", next: "clearing" },
  ],
},

clearing: {
  text: `Eleven minutes to midnight. The air changed.

Blackthorn did not walk into the clearing. He was simply not there, and then he was. Tall and dark, holding the glass bottle against his chest. The orange light pulsed inside it. Marmalade.

He walked to the flat stone. Set the bottle down. Removed his coat. Beneath it, he was thinner than a person should be. His arms were too long. His fingers had too many joints. He had stopped pretending.

He began to sing. Not in any language. A vibration more than a voice. The air around the bottle rippled. From the tallest pine, a shape detached. The owl. Great and gray and ancient. She glided to the flat stone. She was letting him take her.

Silver threads began to unspool from the owl and flow into the bottle.

**One minute. Two minutes.** The threads thickened. The owl's outline faded.

**Three minutes. Four.** Your hand shook. You pressed it against the log.

**Five minutes.** Viola moved closer, speaking low, arguing with him. His singing **wavered**.

Corvid, high above, gave a short call. A signal: he hasn't noticed you.

**Six minutes** was approaching. Viola's head would turn. She would say the word. But you could feel the moment building. The air was tightening. The threads were almost fully drawn. You had a clear line to the bottle.`,
  vocab: { wavered:"Became unsteady, lost strength for a moment" },
  companion: null,
  choices: [
    { text: "Throw NOW, before the word", icon: "⚡", next: "throw_early" },
    { text: "Wait for 'hawthorn'", icon: "⏳", next: "throw_ontime" },
    { text: "Wait longer, make absolutely sure", icon: "🎯", next: "throw_late" },
  ],
},

throw_early: {
  text: `You threw.

The nail arced through the dark. Blackthorn caught the movement. His head snapped toward you. His singing broke. He MOVED, faster than something that size should move, and the nail clipped the bottle instead of hitting it square. A crack spider-webbed across the glass. Light leaked from the fracture but the bottle held.

"THAT," Blackthorn snarled, and his voice was not pleasant anymore, "was a MISTAKE."

He reached for the bottle. Viola shouted. Corvid dove from the canopy like a black **missile**, talons out, and raked across Blackthorn's hand. He screamed, a sound that was not from any throat, and the bottle slipped from his fingers and hit the flat stone.

The crack widened. More light. The owl, half-drawn into the bottle, was fighting now, silver threads snapping back. Blackthorn lunged for the bottle. Viola stepped between them.

"THE STONE!" she shouted at you. "{NAME}, THE STONE! HIT IT WITH ANYTHING IRON!"

You scrambled over the log, grabbed the nail from where it had landed in the grass, and swung it down onto the cracked bottle with everything you had.

The glass shattered. The sound was a bell being un-rung. Light flooded the clearing. Blackthorn screamed, thinned, and was pulled, fighting and **furious**, into the nothing where the bottle had been.

The owl stood on the stone, ruffling her feathers. "Messy," she said. "But effective."

A small orange cat sat beside her, tail twitching. "I was in that THING for TWO DAYS. There were no MICE."`,
  vocab: { missile:"Something that flies very fast through the air toward a target", furious:"Extremely angry" },
  companion: `You threw early. He moved. Corvid intervened. Your aunt blocked. You hit it on the second try. This was NOT the plan. It worked anyway. I need to lie down.`,
  choices: [
    { text: "It's over. Walk into the clearing.", icon: "🌕", next: "ending" },
  ],
},

throw_ontime: {
  text: `**Six minutes.** Viola's head turned. Her eyes found the log. She could not possibly see you in the dark, but her eyes found you anyway.

"**HAWTHORN**," she said.

The nail left your hand. It was not a perfect throw. It wobbled. It dipped. It caught the moonlight for one spinning second.

It hit the bottle.

The glass broke in a way that didn't belong to this world. The sound was a bell being un-rung. Light flooded the clearing, silver and gold and something between. Blackthorn screamed, not a human sound, and his coat unraveled. His face peeled back to show the nothing underneath, and the nothing was pulled, fighting and **furious**, toward the place the bottle had been.

For one second his smoke-colored eyes found yours and you saw surprise. Real surprise. He had not expected a kid with a carnival arm.

Then he was gone. Like a candle going out.

A great gray owl stood on the flat stone. "Well thrown," she said. "A bit wobbly. But well thrown."

A small orange cat sat beside her. "I was in that THING," Marmalade said. "For TWO DAYS. Do you know what it's like in there? No mice. No sun. No breakfast. I have COMPLAINTS."

Corvid descended from the canopy. He looked at you. "Not bad," he said. "For a first day."`,
  vocab: { furious:"Extremely angry, beyond reason" },
  companion: `Not bad. For a first day.`,
  choices: [
    { text: "Walk into the clearing. It's over.", icon: "🌕", next: "ending" },
  ],
},

throw_late: {
  text: `You waited. One more second. Two. You wanted to be SURE.

"HAWTHORN!" Viola shouted. Then: "{NAME}, NOW! **NOW!**"

You threw. But the last thread of silver was already inside the bottle. Blackthorn's hand was already closing around the cork. The nail hit the bottle a fraction of a second after he sealed it.

The glass exploded. But the seal had been **completed** for one heartbeat, and that heartbeat cost something. The light that erupted was not clean. It was fractured, silver and orange fighting each other, and the owl that reformed on the stone was flickering, like a TV signal struggling to hold. Marmalade was there too, solid and furious, but the owl was fading in and out.

"SILVIA!" Viola ran to the stone. "Hold on. HOLD ON."

"I am... trying," the owl said, and her voice was thin. "The seal caught me. For one second. One second was enough to..." She flickered again.

Corvid landed on the stone beside her. He pressed his shoulder against her wing. He did not speak. He just held her steady.

Slowly, one feather at a time, Silvia solidified. The flickering stopped. She stood firm on the stone, blinking her great yellow eyes. "That," she said quietly, "was close. One second later and I would not have come back at all."

Blackthorn was gone. Pulled through the broken bottle into whatever place Mistwalkers go. But the victory did not feel clean. It felt like a **lesson**.

Marmalade, apparently unfazed, was already grooming one paw. "I was in a BOTTLE," she said. "For TWO DAYS. Can we discuss MY experience?"`,
  vocab: { completed:"Finished, done, over", lesson:"Something learned the hard way" },
  companion: `One second late. The owl almost didn't come back. You waited too long, and waiting too long has a price. Remember that. Please.`,
  choices: [
    { text: "Walk into the clearing.", icon: "🌕", next: "ending" },
  ],
},

ending: {
  text: `You stepped out from behind the log. Your legs were shaking.

Aunt Viola crossed the clearing and put both hands on your shoulders. She didn't speak. Her eyes were very bright, and she looked at you the way she looked at the Field Journal: the way she looked at the things she loved most.

Marmalade rubbed against Viola's ankle, purred once, and stalked off toward the treeline. "She's going after the field mice who got **bold** while she was away," Viola said. "She'll be impossible for a week."

Silvia the owl bowed her feathered head. "Thank you, {NAME}. You have the two things that matter in a Keeper: you are curious, and you do not stop when you are scared."

You walked home together in the dark. The mist had thinned. On Hemlock Row, the houses were back. The street sign had its name. The mailbox was where it had always been.

At the kitchen table, Viola opened the Field Journal to a blank page. She wrote in her sharp hand: **{NAME}. Keeper's Apprentice. First Case: The Hollowmist Bell. Successfully resolved.**

She turned the journal toward you and held out the pen.

"Write your name," she said. "Below mine. If you want to."

Corvid landed on the chair beside you. He said nothing, which was, from him, the loudest thing he had ever said.

You picked up the pen.`,
  vocab: { bold:"Confident enough to take risks" },
  companion: `Whatever you decide, I will be at this house, and you will be welcome. I do not say that to many people.`,
  ending: true,
  endTitle: "The Keeper's Apprentice",
  endEmoji: "📓",
  endMessage: "You snuck out, touched what you shouldn't have, faced a creature older than the town, and threw an iron nail in the dark with a shaking hand. Marmalade is home and furious about breakfast. Silvia is safe. Corvid says 'not bad,' which from him is basically a love letter. And in the Field Journal, in your own handwriting: your name. 📓⚡🌫️",
},

};
