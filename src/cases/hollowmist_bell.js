/* ═══════════════════════════════════════════════════
   Case File No. 1 — The Hollowmist Bell
   Kid-driven: curiosity → mistake → consequences →
   scramble → mentor → bigger stakes → final stand
   {NAME} = player's name, {C} = Corvid
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
  ],
},

sneak_journal: {
  text: `You opened it.

The first page: **Helena Ashford, Keeper of Hollowmist. This Journal records all anomalies. If found, return to Thornberry Lane. Do not speak of what you have seen.** The handwriting was old and careful. Not Viola's.

You turned pages fast. Sketches of creatures you didn't recognize. Maps of the town with silver lines drawn over them. Dates circled in red, decades apart: 1962, 1987, 2004. Each one labeled with a single word: **Thirteen**. And next to each, a note. A dried violet with "Thornwick" written beside it. A polaroid of a smiling boy. A news clipping about a fire.

Then: last night's date, written in Viola's handwriting. Fresh ink. **"Thirteen. Marmalade gone. He is back."** Three words underlined twice: **THE BELL TOWER**.

You looked at the back door. The bell tower was visible from the kitchen window, a dark stone finger pointing at a gray sky. You could be there in ten minutes. Viola was still on the phone.

Corvid landed on the windowsill. He looked at the journal, open in your hands. He looked at the back door. He looked at you. "This," he said, "is a spectacularly bad idea." He paused. "I'm coming."`,
  vocab: {},
  companion: `For the record: bad idea. For the record: I said so. For the record: I am coming anyway because someone has to keep you alive.`,
  newPeople: ["Helena Ashford: previous Keeper, wrote the journal"],
  newClues: ["Dates circled in red, decades apart: 1962, 1987, 2004, each labeled 'Thirteen'", "Last night's entry in Viola's hand: 'Thirteen. Marmalade gone. He is back.'", "THE BELL TOWER underlined twice"],
  choices: [
    { text: "Sneak out the back door to the bell tower", icon: "🚪", next: "sneak_out" },
  ],
},

sneak_out: {
  text: `You slipped out the back door while Viola's voice rose and fell on the phone. The evening air was cool and wet and smelled like pine needles and pennies.

Corvid flew ahead, a black shape against the darkening sky. He didn't speak. You walked fast, cutting through the alley behind the bakery, past the shuttered post office, past a bench where an old badger sat reading a newspaper and pretending, very hard, not to notice you.

The mist was coming in. Not normal fog. This mist moved in slow, deliberate **tendrils**, curling around lampposts and pooling in doorways like something testing the edges of where it was allowed to go. A streetlight flickered. Steadied. Flickered again. Went out.

"Faster," said Corvid, from somewhere above you. You walked faster.

The bell tower loomed at the center of town, and looming was exactly the right word. It was tall and dark and crooked, made of stone so old it looked like it had grown out of the ground rather than been built. The door at the base was heavy oak, banded with iron. You pushed it. It swung open on silent hinges. That felt wrong. Old doors should creak. These hinges had been **oiled** recently.

Inside: a spiral staircase winding up into the dark. The walls were covered in tally marks, scratched into the stone in different handwritings across different centuries. Someone had been counting things here for a very long time. You started climbing.`,
  vocab: { tendrils:"Long, thin, curling shapes, like the reaching fingers of a vine", oiled:"Made slippery and quiet with oil, on purpose" },
  companion: `Those hinges were oiled. Someone has been here recently, and they didn't want anyone to hear the door. Keep your eyes open.`,
  newPlaces: ["The Bell Tower: oldest building in town, covered in centuries of tally marks"],
  newClues: ["The mist moves like something alive, testing boundaries", "The tower door hinges have been oiled recently"],
  choices: [
    { text: "Keep climbing", icon: "⬆️", next: "tower_alone" },
  ],
},

tower_alone: {
  text: `At the top: the bell chamber. A single iron bell the size of a dinner table hung from chains thick as your arm. Beside it, on a wooden stand, a ledger lay open. Rows of pencil entries, one per night. 12. 12. 12. 12. For years.

Then last night. "13." Not written in pencil. Written in something rust-colored and thin that was not ink and was not something you wanted to think about too hard.

Corvid landed on the ledger stand. He studied the entry with professional calm. "That is blood," he said. "I cannot tell you whose. But it was left on purpose. That is a signature, not an accident."

You looked around the chamber. In the far corner, where stone met stone at an awkward angle, something caught the gray light from the slit window. A **feather**. Long, thin, and a deep black that was wrong, somehow. Not shiny-black like Corvid's feathers. Matte-black. The kind of black that drinks light instead of bouncing it back. You crouched beside it. Even from a few inches away, you could feel the cold coming off it, like opening a freezer door.

"Don't touch that," Corvid said sharply.

But you already had. Your fingers closed around the feather and the world went sideways. Just for a second. Your vision went white, then dark, and in that dark you saw: a pair of eyes the color of smoke, a glass bottle with something orange and glowing trapped inside, and a thin smile that was too wide for the face it was on. Then it was over. You were back in the bell chamber, feather in your hand, heart slamming against your ribs.

Corvid was staring at you. Every feather on his body was standing on end. "Oh no," he whispered. "Oh no, no, no. {NAME}. He knows you're here now."

From the bottom of the tower: the sound of a door opening on oiled hinges.`,
  vocab: { feather:"A light, flat growth from a bird's body, used for flight" },
  companion: `When I said don't touch it, that was not a suggestion. That was me trying to prevent EXACTLY THIS.`,
  newClues: ["The '13' was written in blood, on purpose, like a signature", "A cold black feather that absorbs light, not from any normal bird", "Touching the feather triggered a vision: smoke-colored eyes, a glass bottle, something orange trapped inside", "He knows you're here now"],
  choices: [
    { text: "Hide behind the bell", icon: "🔔", next: "blackthorn_appears" },
    { text: "Run for the stairs", icon: "🏃", next: "blackthorn_appears" },
  ],
},

blackthorn_appears: {
  text: `Too late for either. The footsteps reached the top and a man stepped into the chamber.

He was tall. Very tall. He wore a plain black coat that seemed to have more darkness in it than fabric should hold. His hair was dark, his features sharp, and his eyes were exactly what you had seen in the vision: the color of smoke on a cold morning. He looked at you the way someone looks at an interesting insect that has landed on their lunch.

"Ah," he said. His voice was warm and pleasant and made the back of your neck go cold. "A child. In my tower. Holding my feather." He smiled. It was the kind of smile that wanted you to trust it, and everything in your body was screaming not to. "You must be Viola's. She has the same look. Stubborn. **Observant**." He tilted his head. "Helena had it too, once."

He knew your aunt's name. He knew Helena's name. He knew things he should not know.

Corvid had gone completely still on the ledger stand. You had never seen a raven try to be invisible before. It was not working.

"I'm going to give you a choice, {NAME}," said Mr. Blackthorn, and the fact that he knew your name was the worst thing that had happened so far today, which was saying something. "You can leave this tower. Walk home. Enjoy your summer. Forget this conversation, forget the feather, forget what you saw when you touched it. Children do this very well. Forgetting." He paused. "Or you can stay, and learn what happens to curious people in Hollowmist. Your great-great-aunt Helena was curious. Would you like to know what happened to her?"`,
  vocab: { observant:"Good at noticing things other people miss" },
  companion: `He is trying to scare you. It is working on me. Do not let him see that it is working on you.`,
  newPeople: ["Mr. Blackthorn: tall, black coat, smoke-colored eyes, knows names he shouldn't"],
  newClues: ["Blackthorn knew your name without being told", "He called the tower 'my tower'", "He knew Helena personally, somehow"],
  choices: [
    { text: "Pretend to be just a dumb tourist kid", icon: "😶", next: "bluff" },
    { text: "Look him in the eye and say nothing", icon: "👁️", next: "staredown" },
  ],
},

bluff: {
  text: `"I'm just, um, visiting," you said. "My aunt said the tower had a nice view. Of the, uh. Town." You held the feather behind your back. Casual. Very casual.

Blackthorn studied you. The smoke in his eyes shifted. For a long, terrible moment, you thought he was going to laugh. Instead, he smiled again, wider this time, and you noticed his teeth were very straight and very white and there were slightly too many of them.

"A tourist," he said. "How **delightful**." He did not believe you for a single second. But he stepped aside. He gestured toward the stairs with one long arm, like a doorman at a very expensive and very haunted hotel. "Then by all means, enjoy your visit. Do give Viola my regards."

He turned his back on you and walked toward the bell. Dismissing you. You were halfway down the stairs, Corvid on your shoulder gripping hard enough to leave marks, when you heard it: a long, slow BONG from above. The bell. He was ringing it. In the middle of the evening. For no reason you could think of except to show you he could.

"Move," Corvid hissed in your ear. "**Move**."`,
  vocab: { delightful:"Very pleasant (but when Blackthorn says it, it means the opposite)" },
  companion: `He let us go. That is not kindness. That is him not being worried. That is much, much worse than kindness.`,
  newClues: ["Blackthorn did not believe the tourist act but let you go anyway", "He rang the bell while you were still in the tower, just to show he could"],
  choices: [
    { text: "Run", icon: "🏃", next: "escape" },
  ],
},

staredown: {
  text: `You didn't speak. You looked at Mr. Blackthorn and you did not blink and you did not look away. You were scared enough that your hands were shaking, but you held them still, and you held his gaze, and you waited.

Something changed in his face. The pleasant mask **flickered**. Just for a second, you saw what was under it: not a face, exactly, but the shape of where a face should be, like a mask over empty air. Then it was back. The human expression. The polite smile.

"Interesting," he said quietly. "You are not afraid."

"I am," you said. "But I'm staying anyway."

The silence that followed was the loudest silence you had ever heard. Corvid's claws tightened on the ledger stand. Blackthorn looked at you for a long moment, and when he spoke again, his voice was different. Colder. Thinner. Like wind through a crack.

"Then you will regret it," he said. "Not today. But soon. I will see you again, {NAME}." He turned and walked toward the bell. You did not wait to see what he did next. You were down those stairs so fast your feet barely touched stone, Corvid flying ahead of you, wings hammering the air.

Behind you, from the top of the tower: BONG. The bell. One long, deliberate strike. A **reminder**.`,
  vocab: { flickered:"Went on and off quickly, like a light with a loose connection", reminder:"Something meant to make sure you don't forget" },
  companion: `You looked a Mistwalker in the eye and did not flinch. I am impressed. I am also TERRIFIED. Both things are true. Run.`,
  newClues: ["Blackthorn's face flickered: underneath the human mask, something empty", "He called you by name again and said 'I will see you again'"],
  choices: [
    { text: "Run home", icon: "🏃", next: "escape" },
  ],
},

escape: {
  text: `You ran.

Hollowmist at dusk was wrong. The mist had thickened while you were in the tower, filling the streets like slow water. You sprinted through it, Corvid overhead, and things were different. Small things. The kind of things you notice when your brain is running at full speed and everything looks sharper than it should.

The bench where the old badger had been reading was empty. The newspaper was still there, open to a page that was now **blank**. Every word on it gone. Just white paper.

A street sign you had passed on the way to the tower was still standing, but the name of the street had vanished. The metal plate where it should have said "Hemlock Row" was smooth and featureless, like it had never been engraved.

A mailbox was missing entirely. Not knocked over. There was no hole where it had been. The sidewalk was smooth. As if the mailbox had never existed.

"Don't stop," Corvid called from above, his voice tight. "Don't look. Keep moving." You kept moving. Past the bakery, where the window display was empty and the baker was standing behind the counter staring at his hands as if he couldn't remember what they were for. Past the general store, where Mrs. Puddleford was in the doorway, gripping the frame, looking at the mist with an expression you recognized: the face of someone who is watching something they have seen before and hoped they would never see again.

You made it to Thornberry Lane. You made it through the gate. You made it through the front door. You slammed it behind you and stood in the hallway, chest heaving, feather still clutched in your hand like a weapon.

Aunt Viola was standing at the end of the hallway. Arms crossed. Face like a storm.`,
  companion: `Home. Alive. Those are the main things. Everything else can be discussed.`,
  newPlaces: ["Hemlock Row: a street whose name has vanished from its sign"],
  newClues: ["Small things are disappearing: words on paper, street names, a mailbox", "The disappearances are happening silently, as if the missing things never existed", "Mrs. Puddleford recognized what was happening and looked afraid"],
  choices: [
    { text: "Tell her everything", icon: "🗣️", next: "home_angry" },
  ],
},

home_angry: {
  text: `"You took the journal," Aunt Viola said. Not a question. "You went to the tower. Alone. At dusk. Without telling me. And you touched something you should not have touched." Her voice was flat and controlled, which was scarier than shouting.

You held out the feather. Her face changed. The anger drained out of it, replaced by something worse. She took a step back. Actually stepped back from it, the way you step back from a snake.

"Where did you find this?" she whispered.

You told her everything. The journal, the tower, the blood-ink entry, the feather and the vision, Blackthorn and his smoke-colored eyes, the bell ringing as you ran, the street sign with no name, the blank newspaper, the missing mailbox. All of it, fast, in one long rush.

Viola listened without interrupting. When you finished, she was quiet for a ten-count. Then she pinched the bridge of her nose and said: "You are either the bravest child I have ever met or the most **reckless**, and I cannot decide which, and it doesn't matter right now because you have done something useful and something very dangerous at the same time."

She looked at the feather in your hand. She looked at you.

"He saw you through that feather when you touched it. Which means he knows what you look like. Which means he knows you are with me. Which means," she said, "we no longer have the luxury of time." She turned and walked toward the back of the house, past the kitchen, past a door you had not noticed before. She pulled a key from around her neck.

"Come with me. I need to show you what we're sitting on top of."`,
  vocab: { reckless:"Doing something dangerous without thinking about what might go wrong" },
  companion: `She's not angry. She's afraid. She's afraid FOR you. There's a difference. Pay attention to the difference.`,
  newClues: ["Touching the feather let Blackthorn see you, which means he now knows you're with Viola", "They no longer have time to plan slowly"],
  choices: [
    { text: "Follow her", icon: "🚪", next: "basement" },
  ],
},

basement: {
  text: `The stairs went down. Below the kitchen, below the house, into stone.

The basement was not a basement. It was a **chamber**, round-walled, carved from the bedrock Hollowmist was built on. Shelves of jars and books lined the walls. A long wooden table held instruments you did not recognize. And on the floor, in the exact center of the room, drawn in silver that caught the lamplight: a circle of symbols. Inside the circle, the air was different. You could see it. A faint shimmer, like heat rising from summer pavement, except it was cold. Your breath came out white when you stepped close.

"Don't step inside the circle," Viola said. She set the lamp on the table and turned to face you. "That is the thin place. The seam. The reason Hollowmist was built here four hundred years ago. On one side: us. On the other side: something older. Something hungry. The circle holds it shut."

She pointed to three symbols spaced evenly around the circle's edge. "Three Wardens keep the seal. Three creatures who agreed, centuries ago, to hold this door closed. They take ordinary shapes. A cat." Marmalade. "An owl who lives in the oldest pine on Hunter's Ridge. And a crow who nests in the schoolhouse chimney."

She was not lecturing. She was showing you. You could SEE it. The shimmer. The cold. The faint sound, if you listened very hard, of something on the other side, breathing.

"Blackthorn has already taken one," Viola said. "Marmalade is gone. When the seal lost her, it weakened. That's why things are disappearing on the streets. Street names. Mailboxes. Small things, for now." She met your eyes. "If he takes the owl, the small things become big things. If he takes the crow, the door opens. And what comes through, {NAME}, does not go back."

She reached into a wooden box on the table and pulled out an iron nail, long and heavy and rust-brown. She held it out to you.

"This belonged to Helena. She carried it the night she faced the last one. She never got to use it." One sentence. No story. No lecture. Just: "Iron breaks his bottle. You are going to be the one who throws it. And you are not going to miss."`,
  vocab: { chamber:"A large, enclosed room, usually underground or inside something" },
  companion: `I have been in that room once before. I did not enjoy it then. I do not enjoy it now. But you needed to see it with your own eyes. Hearing about it is not the same.`,
  newPlaces: ["The chamber beneath the house: the thin place, the seal, the shimmer"],
  newPeople: ["Helena Ashford: previous Keeper who carried the iron nail and didn't come back"],
  newClues: ["Three Wardens hold the seal: Marmalade (cat, taken), an owl on Hunter's Ridge, a crow in the schoolhouse chimney", "One Warden gone means small things vanish. Two means big things. Three means the door opens.", "Iron breaks Blackthorn's glass bottle", "Helena's iron nail, the one she never got to use"],
  choices: [
    { text: "Ask how to find Blackthorn before he takes the owl", icon: "🔍", next: "find_workshop" },
    { text: "Visit Miss Lune the clockmaker for information", icon: "⏰", next: "visit_lune" },
  ],
},

visit_lune: {
  text: `Miss Lune's shop was a low, narrow room where every surface ticked. Grandfather clocks, pocket watches, a clock made from what appeared to be a beehive. None of them agreed with each other about the time. The effect made you feel like the room was having an argument with itself.

Miss Lune was tall, sharp, and wasted absolutely no time. She locked the door behind you, set a bronze object on the counter, and said: "This was wedged in the bell's striker assembly. It shouldn't exist."

It was a **cog**, no larger than a thumbnail, with teeth so fine they looked drawn. "It's from a Stillwatch," she said. "A device that suspends a single second of time. Someone used it to slow the bell's reset mechanism and ring a thirteenth strike. Building a Stillwatch requires the kind of expertise maybe four people in the world possess. Three of them are dead."

"The fourth?" you asked.

"Goes by the name Blackthorn. Calls himself an **antiquarian**. Visits towns like this every few decades. The towns he visits have a way of not being there afterward." She pushed the cog toward you. "Take this. It means he's built a Stillwatch and it's now missing a tooth. He'll need to replace it, which means he has a workshop somewhere in Hollowmist. Find the workshop, find the Stillwatch, and you know where he's working from."

At the door, she put one careful hand on your shoulder. "Be clever, {NAME}. He's been doing this longer than Hollowmist has been standing."`,
  vocab: { cog:"A small gear wheel with teeth that fit into another gear", antiquarian:"Someone who studies old things, or so they claim" },
  companion: `A workshop. He needs tools and a workspace and he can't do this from a hotel room. Corvid has eyes. Corvid has wings. Corvid will find it.`,
  newPeople: ["Miss Lune: clockmaker, precise, understands the bell mechanism"],
  newPlaces: ["The Clockmaker's Shop: every clock ticking at a different time"],
  newClues: ["A bronze cog from a Stillwatch was used to force the 13th bell strike", "Blackthorn has a workshop somewhere in Hollowmist", "He has been doing this for longer than the town has existed"],
  choices: [
    { text: "Find the workshop", icon: "🔍", next: "find_workshop" },
  ],
},

find_workshop: {
  text: `Corvid found it. Of course he did. Ravens see everything from above, and Corvid had been watching the town for thirty years.

"Old root cellar," he reported, landing on the garden wall with a look of grim satisfaction. "Behind the abandoned dairy on Cutter's Lane. There's a chimney that shouldn't be producing smoke, and a door that's been opened recently enough to leave tracks in the mud."

You went at first light, while Viola kept watch from the house. The root cellar was exactly where Corvid said: a low stone door set into a hillside behind a building that hadn't been a dairy in decades. The lock was rusted. The door, when you pushed it, was not. More oiled hinges.

Inside: a workbench. And on it, the kind of organized chaos that made Corvid mutter "even the evil ones **alphabetize**."

A half-built Stillwatch, small as a pocket watch, missing one cog tooth. Sketches of three animals pinned to the wall: a cat, an owl, a crow. Each one had measurements next to it and a date. The cat's date was two days ago. Crossed off. The owl's date was **tonight**.

And in the center of the bench, sitting in a nest of black velvet: a glass bottle. Small as a fist. Faintly warm. Inside it, a tiny light pulsed orange. You knew, without anyone telling you, what that was.

"Marmalade," you whispered.

Corvid was very quiet. Then: "Don't touch the bottle. If you break it here without the ritual in progress, she's freed but he runs. We need him to be MID-RITUAL when it breaks. That's the only way to send him back."

You looked at the date on the owl sketch. Tonight. He was going for the owl tonight.

"We need to go home," you said. "We need to tell Viola. Right now."`,
  vocab: { alphabetize:"To put things in order from A to Z" },
  companion: `Tonight. Not tomorrow. Not next week. Tonight. That orange light in the bottle is Marmalade and she has been in there for two days and I am going to personally ensure she gets out. Let's move.`,
  newPlaces: ["The root cellar on Cutter's Lane: Blackthorn's workshop"],
  newClues: ["Sketches of all three Wardens with dates: cat crossed off, owl marked TONIGHT", "The glass bottle holds Marmalade, pulsing orange inside", "Must break the bottle during the ritual, not before, or Blackthorn escapes"],
  choices: [
    { text: "Run home and tell Viola", icon: "🏠", next: "plan" },
  ],
},

plan: {
  text: `Viola listened to everything you'd found. She looked at the cog from Miss Lune. She looked at the dirt on your shoes from the root cellar. She closed her eyes for three seconds. Then she stood up.

"Tonight," she said. "All right. Change of plans. I was hoping for more time but hoping is not a strategy." She grabbed the old envelope Corvid had been using as a napkin and started drawing. "The owl lives at Hunter's Ridge, in the tallest pine. That's where he'll do the ritual. There's a flat stone in a clearing, perfect for his purposes. He's a creature of **habit**. Mistwalkers always are."

She marked three positions on the envelope. "I stand here, visible, to hold his attention. You hide here, behind the fallen log, iron nail in your hand. Corvid is in the air, watching for anything we don't expect."

"How long does the ritual take?" you asked.

"Seven minutes and twenty seconds. He'll open the bottle, sing in a voice that doesn't come from his mouth, and the owl will be drawn in as threads of silver light. At the six-minute mark, when he's most committed and least able to react, I will say a word. The word is **hawthorn**. When you hear it, you throw. Not a second before. Not a second after."

"What if I miss?"

"Then we lose the owl and we try again for the crow. And I will have to do something I have spent forty years avoiding." She did not explain what that meant. She set down the pen. "We leave at dusk. Eat something. Rest if you can."

Corvid landed on the table. "I have one question," he said. "Actually, I have dozens of questions. But I will limit myself to one. {NAME}, have you ever thrown anything accurately in your life?"

"I won a stuffed bear at a carnival last summer," you said. "Throwing baseballs at bottles."

Corvid looked at Viola. "Bottles," he said. "Well. That's **thematically** appropriate."`,
  vocab: { habit:"A pattern of behavior someone does the same way every time", thematically:"Related to the main idea or theme of something" },
  companion: `Bottles at a carnival. I was hoping for javelin training or possibly military experience, but bottles at a carnival will have to do.`,
  newPlaces: ["Hunter's Ridge: the clearing where the ritual will happen tonight"],
  newClues: ["The ritual takes 7 minutes 20 seconds", "The codeword is 'hawthorn': when Viola says it, throw", "Must hit the glass bottle at the six-minute mark"],
  choices: [
    { text: "Head to Hunter's Ridge at dusk", icon: "🌅", next: "rush_ridge" },
  ],
},

rush_ridge: {
  text: `The walk to Hunter's Ridge took twenty minutes and felt like two hours.

The mist was worse now. On Main Street, a shop window that had displayed pastries that morning was dark and empty, and the sign above it was gone. Not fallen off. The wall was smooth where it had been. Corvid flew ahead, circling back to report. "Hemlock Row has lost two houses," he said, landing on your shoulder. "Not destroyed. Absent. There are **gaps** in the street like missing teeth."

Viola walked fast and did not look at the gaps. You looked. You couldn't help it. Where a house had been, there was a rectangle of nothing. Not rubble. Not an empty lot. Just flat, featureless ground and a faint shimmer in the air above it. The mist pooled in these empty spaces like water filling a footprint.

The forest was dark. The pines were old and enormous and the canopy blocked what was left of the evening light. Viola navigated without hesitation. You tried not to trip on roots. You failed twice. Corvid, unhelpfully, said "tree root" both times, approximately one second too late.

The clearing appeared between the pines like a held breath. An oval of wet grass. A flat gray stone in the center, weathered smooth. This was the place. Viola pointed to the fallen log on the north side. You crouched behind it, iron nail cold in your fist. She moved to her position at the tree line. Corvid lifted off your shoulder and vanished into the canopy without a sound.

The stars came out. The mist came up from the grass. The waiting began.`,
  vocab: { gaps:"Empty spaces where something should be" },
  companion: `Quiet now. He is coming. I can feel it in the air. Breathe slow. Grip steady. I will call if something changes. You will hear me.`,
  newClues: ["The disappearances are accelerating: houses now missing, not just small things", "The empty spaces shimmer, like the thin place in the basement"],
  choices: [
    { text: "Wait", icon: "⏳", next: "clearing" },
  ],
},

clearing: {
  text: `Eleven minutes to midnight. The air changed.

Blackthorn did not walk into the clearing. He was simply not there, and then he was, at the tree line, tall and dark, holding the glass bottle against his chest. The small orange light pulsed inside it. Marmalade.

He walked to the flat stone. Set the bottle down. Removed his coat. Beneath it, he was thinner than a person should be. His arms were too long. His fingers had too many joints. He had stopped pretending.

He began to sing. The song was not in any language you knew. It was not in any language anyone knew. It came from somewhere behind his teeth, a vibration more than a voice, and the air around the bottle began to ripple.

From the tallest pine, a shape detached. The owl. Great and gray and ancient, with yellow eyes the size of pocket watches. She glided down to the flat stone, and you understood: she was letting him take her. She was the bait. She had agreed to this.

Silver threads began to unspool from the owl's body and flow, one by one, into the bottle.

You counted. Because counting gives a frightened body something to do.

One minute. Two minutes. The silver threads thickened. You could see the owl's **outline** fading.

Three minutes. Four minutes. Your hand was shaking. You pressed it against the log.

Five minutes. Viola had moved closer, speaking to Blackthorn in a low voice, arguing, buying time. His singing **wavered**, just slightly.

Six minutes. Viola's head turned. Her eyes found the log. She could not possibly see you in the dark, but her eyes found you anyway.

"**HAWTHORN**," she said.`,
  vocab: { outline:"The outer edge or shape of something", wavered:"Became unsteady, lost strength for a moment" },
  companion: null,
  choices: [
    { text: "THROW", icon: "⚡", next: "throw_nail" },
  ],
},

throw_nail: {
  text: `The nail left your hand.

It was not a perfect throw. It was not a carnival throw. It was a throw made by a kid crouching behind a log in the dark with a shaking arm and a hammering heart. It wobbled. It dipped. It caught the moonlight for one spinning second.

It hit the bottle.

The glass, which was not glass from this world, broke in a way that did not belong to this world. The sound was a bell being un-rung: a long, clean note played backward. Light flooded the clearing, silver and gold and something between, and the night became very bright and very strange.

Blackthorn **screamed**. Not a human sound. The coat on the ground unraveled. His body thinned. His face peeled back to show the nothing underneath, and the nothing was pulled, fighting and furious, toward the place the bottle had been. For one terrible second, his smoke-colored eyes found yours across the clearing, and in them you saw surprise. Real surprise. He had not expected a kid with a carnival arm to be the thing that ended him.

Then he was gone. Like a candle going out. Like a word you forgot mid-sentence. The clearing was dark and quiet and the mist was just mist.

A great gray owl stood on the flat stone, ruffling her feathers. "Well thrown," she said. "A bit wobbly. But well thrown."

A small orange cat sat next to her, tail twitching, wearing the expression of someone who has been stuck in a bottle for two days and has a LOT of opinions about it. "I was in that THING," Marmalade said, because of course the cat talked too. "For TWO DAYS. Do you know what it's like in there? It's BORING. There's no mice. There's no sun. There's no breakfast. I have COMPLAINTS."

Corvid descended from the canopy and landed on the flat stone between them. He looked at the owl. He looked at the cat. He looked at you.

"Not bad," he said. "For a first day."`,
  vocab: { screamed:"Made a loud, sharp sound of pain or fear" },
  companion: `Not bad. For a first day.`,
  newClues: ["The nail hit the bottle. Blackthorn was pulled back through the broken seal.", "Marmalade and the owl are both free."],
  choices: [
    { text: "Walk into the clearing", icon: "🌕", next: "ending" },
  ],
},

ending: {
  text: `You stepped out from behind the log. Your legs were shaking so hard you had to hold the bark for a moment before you could stand.

Aunt Viola crossed the clearing and put both hands on your shoulders. She didn't say anything. She didn't need to. Her eyes were very bright, and she looked at you the way you had seen her look at the Field Journal: the way she looked at the things she loved most.

Marmalade rubbed once against Viola's ankle, purred briefly, and stalked off toward the treeline with her tail high. "She's going to find the field mice who got **bold** while she was away," Viola said, watching her go. "She will be impossible to live with for a week."

The owl, who introduced herself as Silvia, bowed her great feathered head. "Thank you," she said. "The accommodations were not what I am accustomed to." She turned her yellow eyes to you. "You will make a good Keeper, {NAME}. You have the two things that matter: you are curious, and you do not give up when you are scared."

You walked home together in the dark. The mist had thinned. Lights were on in windows. On Hemlock Row, the houses were back. The street sign had its name again. The mailbox was where it had always been, as if it had never left.

At the kitchen table, Viola opened the Field Journal to a blank page. She wrote a single line in her sharp, fast hand: **{NAME}. Keeper's Apprentice. First Case: The Hollowmist Bell. Successfully resolved.** Then she turned the journal toward you and held out the pen.

"Write your name," she said. "Below mine. If you want to. No one will make you."

Corvid landed on the back of the chair beside you. He did not say anything, which was, from him, the loudest thing he had ever said.

You picked up the pen.`,
  vocab: { bold:"Confident enough to take risks, sometimes more than is wise" },
  companion: `Whatever you decide, I will be at this house, and you will be welcome. I do not say that to many people.`,
  ending: true,
  endTitle: "The Keeper's Apprentice",
  endEmoji: "📓",
  endMessage: "You snuck out, touched what you shouldn't have, faced a creature older than the town, and threw an iron nail in the dark with a shaking hand. It hit. Marmalade is home and furious about the lack of breakfast. Silvia is safe and will never let you forget the wobbly throw. Corvid says 'not bad,' which from him is practically a love letter. And in the Field Journal, in your own handwriting, your name. 📓⚡🌫️",
},

};
