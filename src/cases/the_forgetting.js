/* ═══════════════════════════════════════════════════
   Case File No. 3 — The Forgetting
   Something is leaking through the seal, eating
   memories from the inside. The trail leads to
   a lonely child on the other side.
   ═══════════════════════════════════════════════════ */

export const meta = {
  id: "the_forgetting",
  number: 3,
  title: "The Forgetting",
  subtitle: "Some things are taken so quietly you never notice",
  available: true,
  startScene: "start",
  estimatedMinutes: 25,
};

export const scenes = {

start: {
  mood: "warm",
  text: `Five weeks into summer, and you had started thinking of Hollowmist as home. Not your real home. Your other home. The home where the plants watched you walk to the mailbox and the postman vibrated.

You were eating breakfast when it happened. Aunt Viola was at the stove making eggs, and she stopped. Not a normal stop. A freeze. Her hand held the spatula in the air and her eyes went somewhere far away, the way they do when you're trying to remember a word that's sitting right on the edge of your brain.

"Viola?" you said.

She blinked. "What's the name of the spice," she said. "The one I always put in the eggs. The yellow one. I use it every morning. I've used it every morning for thirty years." She stared at the spice rack. She reached for a jar, pulled her hand back, reached again. "{NAME}, what's the yellow spice called?"

"Turmeric," you said.

"Turmeric," she repeated, and the word landed like she was hearing it for the first time. "Yes. Of course. Turmeric." She sprinkled it on the eggs and did not say anything else about it. But her hand was shaking.

Hemlock, on the windowsill, had stopped eating his toast. He was looking at Viola the way he looked at things that worried him: very still, very quiet, with both eyes open.`,
  vocab: {},
  companion: `She forgot turmeric. She has put turmeric in those eggs every morning since before I was hatched. That is not a lapse. That is a symptom.`,
  question: `People forget things all the time. What makes this different from ordinary forgetfulness?`,
  newPeople: ["Aunt Viola: sharp as always, but something just slipped"],
  newClues: ["Viola forgot the word 'turmeric' after 30 years of daily use", "It wasn't normal forgetfulness. She froze."],
  choices: [
    { text: "Ask Viola if she's okay", icon: "🗣️", next: "ask_viola" },
    { text: "Check the Field Journal for anything about forgetting", icon: "📓", next: "check_journal" },
  ],
},

ask_viola: {
  mood: "warm",
  text: `"Are you okay?" you asked.

Viola set down the spatula. She turned to face you and she did that thing she did when she was deciding how much to tell you: she looked at the ceiling, counted to three silently, and then looked back at you.

"I am fine," she said. "It was a word. People forget words." But her voice had the careful tone it got when she was lying and knew you knew she was lying.

"You don't forget words," you said. "You're the Keeper."

Something shifted in her face. The careful expression cracked, just a little, and underneath it was something you hadn't seen on Aunt Viola before: she was **rattled**. Not scared exactly. Unsettled. Like a person who has just noticed a crack in a wall they thought was solid.

"No," she said quietly. "I don't forget words. And that is exactly why you are going into town this morning and asking people questions. Carefully. Without making anyone nervous." She pulled a small notebook from the kitchen drawer and set it in front of you. "Write down who has forgotten what. Bring it back by lunch."

Hemlock landed on your shoulder. "Field work," he said. "My favorite. Let's go make people uncomfortable."`,
  vocab: { rattled:"Shaken, unsettled, not as calm as usual" },
  companion: `She is scared and she is hiding it. The last time she hid something from you, it involved a Mistwalker. Let's see what the town has to say.`,
  newClues: ["Viola doesn't forget words. Something is wrong.", "She wants you to survey the town and report back."],
  choices: [
    { text: "Head into town", icon: "🏘️", next: "town_survey" },
  ],
},

check_journal: {
  mood: "warm",
  text: `You pulled the Field Journal off its shelf and flipped to the index. Under "M" for memory, you found two entries. The first, from Helena's era, was brief: **"1959. Mrs. Aldridge could not recall her daughter's middle name. Duration: three days. Self-resolved. Noted as isolated."**

The second was longer and in Viola's hand, dated twelve years ago: **"Memory loss cluster. Four residents. Duration: two weeks. Pattern: recent memories first, then older ones, like peeling layers off an onion. Ceased when the Wardens reinforced the seal. Cause: hairline crack in the eastern arc. Repaired."**

Repaired. Twelve years ago. You looked at the seal diagram in the journal. The eastern arc was the section nearest to Marmalade's position. Marmalade had been taken and returned in Case 1. Was the repair still holding?

Hemlock read over your shoulder. "Twelve years ago, the crack was small enough that the Wardens could fix it themselves. If it has opened again, after what happened with Blackthorn..." He didn't finish the sentence. He didn't need to.

"Go into town," Viola said from the doorway. She had been watching you read. "Find out how far it's spread."`,
  vocab: {},
  companion: `Helena noted one person forgetting one thing. Viola noted four people over two weeks. If this is a pattern, the question is: how many people, and how fast?`,
  newClues: ["Helena documented a single memory loss event in 1959", "Viola documented a cluster of four cases twelve years ago, caused by a crack in the seal", "The crack was in the eastern arc, near Marmalade's position", "It may have reopened after the Blackthorn incident"],
  choices: [
    { text: "Head into town", icon: "🏘️", next: "town_survey" },
  ],
},

town_survey: {
  question: "Four people forgot routine things on the same morning. Is that a coincidence, or is something connecting them?",
  mood: "warm",
  text: `Main Street was normal. Shops open, people moving, the smell of bread from the bakery. But normal, you had learned, was a disguise that Hollowmist wore over whatever was actually happening.

Mrs. Puddleford was your first stop. She was behind the counter, rearranging jars of **preserves** with a frown.

"I had a system," she said when you asked if anything was odd. "I've had a system for twenty-three years. The jams go here, the marmalades go there, the chutneys go in the back. This morning I came in and I could not, for the life of me, remember whether the strawberry goes before or after the raspberry. They're RIGHT NEXT TO EACH OTHER. I've put them in order every single morning." She looked at her hands. "I just stood here staring at the jars for ten minutes."

At the bakery, Mr. Finch was worse. He was standing behind the counter with flour on his arms and a blank expression. "The sourdough," he said. "I've been making it for forty years. I got halfway through the recipe and I couldn't remember whether the salt goes in before or after the first rise. I KNOW this. I've done it ten thousand times. But this morning it was just... gone. Like a page torn out of a book."

Hemlock was keeping count. By the time you reached the post office, you had four names.`,
  vocab: { preserves:"Fruit cooked with sugar and stored in jars, like jam" },
  companion: null,
  newPeople: ["Mrs. Puddleford: forgot her jar arrangement after 23 years", "Mr. Finch the baker: forgot his sourdough recipe mid-bake"],
  newClues: ["Four townspeople have lost small, routine memories this morning", "The pattern: things they've done thousands of times, suddenly blank"],
  choices: [
    { text: "Talk to Mr. Pips at the post office", icon: "📮", next: "pips_scared" },
    { text: "Visit the schoolhouse to check on Agnes", icon: "🐦", next: "agnes_check" },
  ],
},

pips_scared: {
  question: "Forgetting a recipe is annoying. Forgetting your own name is terrifying. What does it mean that the forgetting is getting deeper?",
  mood: "eerie",
  text: `Mr. Pips was not behind the counter. He was sitting on the floor behind it, knees drawn up, paws pressed against his temples. He looked up when the bell over the door rang and his face went through relief, then fear, then a kind of desperate hope.

"Oh good," he said. "You. Viola's niece. Good. Please tell me something." He stood up slowly. "What is my first name?"

You stared at him.

"I am not joking," Pips said. His voice was shaking. "I woke up this morning and I knew I was Mr. Pips. I knew I was the postman. I knew this was my shop. But my first name is GONE. Not on the tip of my tongue. Not fuzzy. Gone. Like it was never there. I checked my mail. I checked my **license**. I checked every piece of paper in this building. Nothing has my first name on it. Nothing. It is as if I never had one."

Hemlock, on the counter, was very still. "That is not the same as forgetting a spice or a recipe," he said quietly. "That is a piece of identity. That is deeper."

Pips looked at you with wide, terrified eyes. "{NAME}, is something happening to us?"`,
  vocab: { license:"An official document that proves who you are or gives you permission to do something" },
  companion: `Spices. Recipes. Jar arrangements. Those are routine memories, muscle memory, habits. A first name is WHO YOU ARE. The forgetting is getting deeper. And faster.`,
  newPeople: ["Mr. Pips: has forgotten his own first name entirely"],
  newClues: ["The forgetting is escalating from routine memories to personal identity", "Pips checked every document. His first name is gone from all of them.", "This is deeper than what happened twelve years ago"],
  choices: [
    { text: "Go check on Agnes at the schoolhouse", icon: "🐦", next: "agnes_check" },
    { text: "Run home and tell Viola now", icon: "🏠", next: "report_viola" },
  ],
},

agnes_check: {
  mood: "eerie",
  text: `The old schoolhouse was quiet. Too quiet. Agnes was always audible from a block away, muttering complaints about the weather, the state of modern chimney construction, or the personal failings of everyone she had ever met. Today: silence.

You found her on the chimney top, hunched. Not her usual posture. Agnes stood tall and **imperious**, like a judge on a very high bench. Today she was small. Pulled in. Her feathers were dull.

"Agnes?" you called up.

One yellow eye opened. She looked down at you. "The Ashford child," she said. "Good. Come closer. I need to tell you something and I would rather not shout." You climbed the ivy-covered wall to the roof ledge. Agnes shuffled toward you. Up close, she looked old. Not her usual ancient-and-proud old. Tired old.

"I felt it," she said. "Last night. A pull. From the other side of the seal. Not a break. Not a crack. A... sipping. Something on the other side is drinking. Small sips. Very careful. Through the thinnest possible gap. It is taking memories the way you might drink through a straw: one at a time, from the bottom, so nobody notices until the glass is half empty."

She turned both eyes on you. "The Wardens can feel what moves through the seal. Marmalade felt it too, and Silvia. We held a meeting. We do not do this often. The last time was 1962." She paused. "We are frightened, {NAME}. And crows are not easily frightened."`,
  vocab: { imperious:"Commanding, proud, expecting to be obeyed" },
  companion: `Agnes said 'frightened.' I have known her for thirty years. She has never used that word. Not once.`,
  newPeople: ["Agnes: third Warden, felt the pulling last night, visibly scared"],
  newClues: ["Something on the other side is 'sipping' memories through the seal", "It's not a crack or break. It's a deliberate, careful draw.", "All three Wardens felt it. They held a meeting for the first time since 1962."],
  choices: [
    { text: "Ask Agnes what's doing the sipping", icon: "❓", next: "agnes_what" },
    { text: "Go home and tell Viola everything", icon: "🏠", next: "report_viola" },
  ],
},

agnes_what: {
  mood: "eerie",
  text: `"What is it?" you asked. "What's on the other side?"

Agnes was quiet for longer than you'd ever heard her be quiet. "I do not know," she said, and those four words from Agnes the All-Knowing were more unsettling than anything else she could have said.

"What I can tell you," she continued, "is what it feels like through the seal. It feels like a child. Not a creature. Not a Mistwalker. Something smaller. Something that is hungry but does not know it is causing harm. It is reaching through the gap the way a child reaches through a fence to pet a dog on the other side. Not to hurt. To touch."

She ruffled her feathers. "That makes it more dangerous, not less. A creature you can fight. A child who doesn't know they're hurting you? That requires something **harder** than fighting. That requires understanding."

From below, a sound carried up. Mrs. Puddleford's voice, from the general store, high and cracking: "Does anyone remember the name of this STREET? I'm standing ON it and I can't remember what it's CALLED."

Agnes closed her eyes. "Go, {NAME}. Tell your aunt. The glass is emptying faster now."`,
  vocab: { harder:"More difficult, requiring more effort and thought" },
  companion: `A child on the other side. Reaching through to touch. Not a monster. Not evil. Hungry. That changes everything about how we stop this.`,
  newClues: ["Agnes says it feels like a child, not a creature", "It's reaching through the seal gap to touch, not to attack", "The forgetting is accelerating. Street names are going now."],
  choices: [
    { text: "Run home to Viola", icon: "🏠", next: "report_viola" },
  ],
},

report_viola: {
  mood: "warm",
  text: `You spread the notebook on the kitchen table. The list of names. The things forgotten. Turmeric. Jar systems. A sourdough recipe. A first name. A street name. Viola read it twice.

"It's accelerating," she said. "Small things first, then bigger things, then foundational things. That's the pattern from twelve years ago, but faster. Much faster." She looked at you. "Did you talk to Agnes?"

You told her what Agnes said. A child. Something on the other side that felt like a child, reaching through the gap.

Viola sat down. She took off her glasses. She cleaned them. She put them back on. She cleaned them again. This was Viola's version of pacing.

"When Blackthorn forced the thirteenth ring," she said, "the seal held, but it flexed. Like bending a piece of metal. The metal doesn't break, but it develops a thin spot. And if something on the other side discovers that thin spot..." She trailed off.

"It drinks through it," Hemlock said from the windowsill. "Like a straw."

"Like a straw," Viola agreed. She looked at you. "We need to go below. I need to see the seal. And I need you to see something I have never shown anyone, because we may need to do something I have never done."`,
  companion: `Below. The chamber. The last time we went down there, you got an iron nail and a mission. This time I think the mission will be stranger.`,
  newClues: ["The 13th bell ring weakened the seal like bending metal", "A thin spot developed where something can drink through", "Viola needs to show you something new in the chamber"],
  choices: [
    { text: "Go to the chamber", icon: "⬇️", next: "chamber" },
  ],
},

chamber: {
  question: "The thread pulses like a heartbeat. Each pulse takes a memory. If you could see the thread, would you cut it immediately, or try to understand it first?",
  mood: "eerie",
  text: `The seal circle looked the same. Silver on stone. Three Warden marks at the edges. The shimmer in the center, cold and pulsing. But when you looked closely, you saw it: a dark thread. Hair-thin, almost invisible, running from the center of the circle to the eastern edge. The thread pulsed in a slow rhythm, like a heartbeat, and each pulse was followed by a tiny flicker in the shimmer.

"There," Viola said. "That thread is the thin spot. It's been there since Blackthorn. I've been monitoring it. It was stable until two days ago." She crouched beside the circle. "Watch."

You watched. The thread pulsed. And with each pulse, the shimmer dimmed, just slightly, as if something was being drawn through. Something invisible. Something small.

"Each pulse is a memory," Viola said. "Turmeric. A jar system. A sourdough recipe. A first name. Pulled through the thread. Consumed." She stood up. "Whatever is on the other side is feeding on the memories of this town. And the more it feeds, the wider the thread gets, and the more it can take."

She walked to the far wall of the chamber where an old wooden cabinet stood. She opened it. Inside, on a shelf, sat a single object: a small silver bell, no bigger than a thimble.

"This is a **resonance** bell," she said. "It was Helena's. When you ring it inside the seal circle, it creates a window. Not a door. A window. You can see the other side. You can speak to what's there. You cannot touch it, and it cannot touch you. The window lasts ninety seconds."`,
  vocab: { resonance:"A deep, continuing vibration that connects things at the same frequency" },
  companion: `A window, not a door. Ninety seconds. Enough to see. Enough to understand. Not enough to be grabbed.`,
  newClues: ["A dark thread runs through the seal, pulsing with each stolen memory", "Each pulse takes one memory from the town", "Helena's resonance bell creates a 90-second window to see the other side"],
  choices: [
    { text: "Ring the bell and look through", icon: "🔔", next: "window_look" },
    { text: "Wait, shouldn't we prepare first?", icon: "⏸️", next: "prepare_first" },
  ],
},

prepare_first: {
  mood: "warm",
  text: `"Shouldn't we prepare?" you said. "Figure out what we're going to say? What if it's dangerous?"

Viola nodded slowly. "That is exactly what Helena would have said. And she would have been right." She set the bell down on the table and sat across from you.

"Here is what we know. It feels like a child to the Wardens. It is feeding on memories. It is careful, not violent. If it were a Mistwalker, the seal would be screaming. It's not. The seal is... **permitting** this. The thin spot exists because the seal was stressed, but the thread is stable. Whatever is drinking isn't forcing anything open. It's sipping what leaks through."

Hemlock tilted his head. "Which means the seal recognizes it as something that belongs partially on this side. Not an invader. Something in between."

"Something that was once here," Viola said. "Or something connected to someone who was."

That thought sat in the room like a held breath. Something connected to someone who was once in Hollowmist. Something that remembered what memories tasted like.

"Ninety seconds," Viola said. "We look. We listen. We do not make promises. We do not open doors. Agreed?"

"Agreed," you said.`,
  vocab: { permitting:"Allowing, letting something happen without fighting it" },
  companion: `Preparation is good. Walking into the unknown without a plan is how you get Blackthorned. We have had quite enough of being Blackthorned.`,
  newClues: ["The seal is permitting the leaking, not fighting it", "Whatever is sipping may have a connection to Hollowmist", "Rule: look and listen for 90 seconds, no promises, no opened doors"],
  choices: [
    { text: "Ring the bell", icon: "🔔", next: "window_look" },
  ],
},

window_look: {
  mood: "dark",
  text: `Viola stepped to the edge of the seal circle. You stood beside her. Hemlock landed on her shoulder. She held the resonance bell over the center of the circle and rang it once.

The sound was not a sound. It was a vibration that started in the silver bell and moved outward in a wave, through the floor, through your shoes, through the bones of your feet, up through your body and into the back of your skull. The shimmer in the center of the circle changed. It flattened. It cleared. And through it, like looking through a frosted window that had just been wiped, you saw the other side.

It was dark. Not black. A gray, swimming dark, the color of mist seen from inside. And sitting in the middle of that gray dark, cross-legged on nothing, was a child.

Small. Maybe six or seven years old. You couldn't tell if it was a boy or a girl. Its edges were **blurred**, as if it was a drawing someone had smudged with their thumb. It was holding something in its cupped hands. A tiny golden light. And it was whispering to the light, the way a child whispers to a firefly.

It looked up. It saw you. Its eyes were enormous and dark and full of something that you recognized immediately, because you had felt it yourself, every time your parents dropped you somewhere new and drove away.

It was lonely. It was so lonely it hurt to look at.

"Hello," it said. Its voice was thin and far away, like a radio signal from the bottom of the ocean. "Are you real? I can never tell anymore."`,
  vocab: { blurred:"Unclear, with soft edges, not sharp or focused" },
  companion: null,
  newClues: ["The other side is gray and swimming, like mist seen from inside", "A child sits there, blurred at the edges, holding a tiny golden light", "The child asked 'Are you real?' as if it isn't sure"],
  choices: [
    { text: "Say yes, you're real", icon: "🗣️", next: "talk_to_child" },
    { text: "Ask Viola what to do", icon: "👀", next: "viola_guidance" },
  ],
},

viola_guidance: {
  mood: "dark",
  text: `You looked at Viola. She was staring at the child with an expression you had never seen on her face. It was not fear. It was not anger. It was grief. Pure, deep grief, the kind that comes from recognizing something you wish you didn't recognize.

"That child," she whispered, "has been alone in there for a very long time."

"Who is it?" you asked.

"I don't know. But whatever it is, it has been surviving on the memories it pulls through the thread. That golden light in its hands is someone's memory. Mrs. Puddleford's jar system, or Mr. Finch's sourdough, or Pips's first name. To us, those are lost memories. To that child, they are food. **Warmth**. The only proof that the world on this side still exists."

The window flickered. Thirty seconds left.

"Talk to it, {NAME}," Viola said. "Quickly. But remember: it is taking something that doesn't belong to it. Even if it doesn't know that. Even if it's scared and alone and hungry. It is still taking."

The child was watching you through the window with those enormous dark eyes. Waiting.`,
  vocab: { warmth:"Heat, comfort, the feeling of being close to something alive" },
  companion: `Sixty seconds left. Your aunt is right. The child is taking. The child is also suffering. Both things are true. Talk. Now.`,
  choices: [
    { text: "Talk to the child", icon: "🗣️", next: "talk_to_child" },
  ],
},

talk_to_child: {
  question: "The child said the warm pieces were floating and lost. It didn't know it was stealing. Does that change what you should do?",
  mood: "dark",
  text: `"Yes," you said. "I'm real. My name is {NAME}. I live in the town on the other side of this... window."

The child's face changed. Not a smile exactly. More like the memory of what smiling felt like. Its edges sharpened, just slightly, as if hearing your name had made it more solid.

"A name," it said. "I like names. They taste warm." It held up the golden light in its hands. "This one is warm too. I found it leaking through the crack. There are more. Little pieces of warm. I collect them." It looked at the light the way a child looks at a **captured** firefly: with wonder and no understanding that the firefly needs to go free.

"Those warm pieces are people's memories," you said. "When you take them, the people here forget things. Important things. Their recipes. Their names."

The child went still. The blurred edges wavered. "I'm taking?" it said. "I didn't know I was taking. I thought they were floating. I thought they were lost."

The window flickered again. Twenty seconds.

"What's your name?" you asked quickly.

The child looked down at its hands. The golden light pulsed. "I don't remember," it said. "I used to have one. I think. It was warm. Like these." It looked up at you. "Please don't close the window. It's so dark when there's no window. Please."

The window closed. The shimmer returned. The chamber was quiet. You were standing in the dark with Viola and Hemlock and the echo of a child's voice saying *please*.`,
  vocab: { captured:"Caught, held, not free to leave" },
  companion: null,
  newClues: ["The child collects memories thinking they are 'lost pieces of warm'", "It didn't know it was taking from people", "It has forgotten its own name", "It begged you not to close the window"],
  choices: [
    { text: "We need to help it", icon: "❤️", next: "plan_help", highStakes: true },
    { text: "We need to stop it, even if it's sad", icon: "🛡️", next: "plan_stop", highStakes: true },
  ],
},

plan_help: {
  question: "{NAME}, you're choosing to help something that has been hurting your town. Why?",
  mood: "warm",
  text: `"We need to help it," you said.

Viola looked at you for a long time. "I knew you were going to say that," she said. "Helena would have said the same thing." She paused. "Helena also would have been right."

"The child is hungry," Hemlock said from the table. "It is feeding on stolen memories because it has nothing else. If we give it something that is freely given, something warm that belongs to nobody because it was offered, not taken, it might stop pulling through the thread."

"A gift," you said. "Not a stolen thing. A given thing."

"Exactly," Viola said. "But it has to be a real memory. Willingly shared. Written into something that can pass through the seal without opening it." She looked at the Field Journal on the shelf. "The journal is an **artifact**. What's written in it persists. If someone were to write a memory into the journal and then press the journal against the seal thread..."

"It would feed the child without anyone losing anything," you finished.

"In theory," Viola said. "But it has to be someone who is willing to give a memory away. Not lose it. Give it. There's a difference."`,
  vocab: {},
  companion: `A gift of memory, freely given. That is a beautiful idea. It is also untested and might not work. But beautiful.`,
  newClues: ["If someone willingly shares a memory through the journal, the child could feed without stealing", "The journal can pass through the seal thread as an artifact", "Someone must volunteer a memory as a gift, not a loss"],
  choices: [
    { text: "Ask Mrs. Puddleford to share a memory", icon: "🏪", next: "gather_memories" },
    { text: "Write your own memory into the journal", icon: "✍️", next: "own_memory", highStakes: true },
  ],
},

plan_stop: {
  mood: "tense",
  text: `"We need to stop it," you said. "Even if it's sad. People are losing their names."

Viola nodded. "That is also true. And it is the Keeper's job to protect the town." She sat down at the table. "The thread can be sealed. I can reinforce the eastern arc. Agnes, Silvia, and Marmalade can hold the seal while I close the gap. The child loses its straw. The memories stop draining."

"And the child?" you asked.

"Stays where it is. Alone. In the dark. Without even the leaking warmth to sustain it." Viola's voice was flat. Not cold. Honest.

Hemlock spoke from the table. "There may be a middle way. Seal the thread to stop the stealing, but send something through first. A gift. Something warm that is freely given, not taken. If the child has something to hold, something real, it might survive the loneliness. It won't be a solution. But it would be a **mercy**."

You looked at Viola. She was watching you the way she always did when the decision was yours to make.`,
  vocab: { mercy:"Kindness shown to someone who is suffering, even when you don't have to" },
  companion: `Both paths lead to the thread being sealed. The question is whether we seal it empty-handed or leave the child with something to hold.`,
  newClues: ["Viola can reinforce the seal and close the thread", "The child would be left alone in the dark without the leaking warmth", "A middle way: seal the thread but send a gift through first"],
  choices: [
    { text: "Seal the thread empty, protect the town", icon: "🛡️", next: "seal_empty", highStakes: true },
    { text: "Send a gift through first, then seal", icon: "❤️", next: "gather_memories", highStakes: true },
  ],
},

own_memory: {
  mood: "warm",
  text: `"I'll do it," you said. "I'll write one of my own memories."

Viola looked at you with that expression again, the one that was deeper than pride. "You understand what this means? The memory stays yours. You don't lose it. But a copy of it, the warmth of it, passes through the journal and feeds the child. It's like... lending someone your jacket. You still have the jacket. But they feel the warmth."

You opened the Field Journal to a blank page. You picked up the pen. And you thought about what to write. What memory was warm enough to feed a child in the dark?

You wrote about the first morning in Hollowmist. The bus. The cobblestones. A raven who landed on your suitcase and said "You're late." A great-aunt who said the tea might be on fire. A notebook that hummed. The moment you realized that this summer was going to be different from every summer you had ever had.

You wrote it in your own words, in your own handwriting, and the ink glowed faintly gold as it dried. The journal knew what you were doing. It **approved**.

Hemlock read over your shoulder. He did not comment on the part about himself, which was, from him, the highest form of praise.`,
  vocab: { approved:"Agreed with, supported, said yes to" },
  companion: `You wrote about your first morning here. You wrote about me. I am choosing not to be emotional about this. I am failing.`,
  newClues: ["Your own memory can serve as the gift", "The journal glowed gold when you wrote it, recognizing the intent"],
  choices: [
    { text: "Take the journal to the seal", icon: "📓", next: "feed_child" },
  ],
},

gather_memories: {
  mood: "warm",
  text: `You went back into town. Mrs. Puddleford first.

"You want me to write a memory in the journal?" she said. "On purpose? For a child I've never met?" She looked at the pen in your hand. She looked at the open page. She looked at you. "What kind of memory?"

"A warm one," you said. "Something that makes you feel safe when you remember it."

Mrs. Puddleford was quiet for a moment. Then she took the pen and wrote, in round, careful handwriting: **I remember my mother teaching me the jar system. Strawberry before raspberry, always. She said it mattered. It didn't, really. But she said it did, and that was enough.**

Mr. Finch wrote next: **The first loaf of sourdough I ever made. It was terrible. It was a brick. My father ate the whole thing and said it was the best bread he'd ever had. He was lying. I loved him for it.**

Mr. Pips, hands shaking, wrote: **My first name is Albert. I remember now. My mother called me Albie. She said it like a song.**

Three memories. Three golden glows on the page. The journal was heavy with warmth.

Hemlock, on your shoulder, was uncharacteristically quiet. When you looked at him, his feathers were pressed flat and his eyes were bright. "Dust," he said. "There is dust in this shop. Affecting my eyes. Let's go."`,
  companion: `Not a word. Not one word about the dust. We go to the seal now.`,
  newPeople: ["Mr. Finch: baker, remembered his father eating terrible bread out of love"],
  newClues: ["Three townspeople voluntarily wrote warm memories into the journal", "Each entry glowed gold. The journal recognized the freely-given intent.", "Pips remembered his name: Albert. His mother called him Albie."],
  choices: [
    { text: "Take the journal to the seal", icon: "📓", next: "feed_child" },
  ],
},

seal_empty: {
  mood: "tense",
  text: `"Seal it," you said. "The town comes first."

Viola nodded once. She did not argue. She did not try to change your mind. She respected the decision because it was the Keeper's decision, and you had made it clearly and with open eyes.

She called the Wardens. Marmalade appeared from wherever cats appear from, orange and **indifferent**. Silvia glided through the chamber window on silent wings. Agnes came last, hopping down the stairs with visible irritation at the architecture.

The three Wardens took their positions at the seal's edge. Viola knelt beside the dark thread and placed both hands flat on the stone. The thread pulsed. She whispered words you couldn't hear. The silver of the seal brightened, then blazed. The thread thinned. Thinned. And with a sound like a guitar string snapping, it broke.

Silence. The shimmer in the center of the seal steadied. The pulsing stopped. The memories stopped draining.

It was over. The town was safe.

You stood in the chamber and felt the absence of the child's voice. *Please don't close the window.* The window was closed. The thread was sealed. On the other side, in the gray dark, a child was alone again. With nothing.

Hemlock landed on your shoulder. "You protected the town," he said quietly. "That is what Keepers do." A pause. "It does not always feel good. That is also what being a Keeper means."`,
  vocab: { indifferent:"Not caring, not interested, acting like nothing matters" },
  companion: `You made the hard choice. The right choice for the town. The wrong choice for the child. Both things are true at the same time. That is the weight you carry now.`,
  newClues: ["The thread is sealed. Memories have stopped draining.", "The child is alone again on the other side."],
  choices: [
    { text: "Go upstairs", icon: "⬆️", next: "ending_sealed" },
  ],
},

feed_child: {
  mood: "relief",
  text: `You knelt beside the seal circle, the Field Journal open to the golden-glowing pages. Viola stood behind you. The Wardens watched from their positions: Marmalade washing a paw, Silvia with her enormous eyes, Agnes silent for once.

You pressed the open journal against the floor, directly over the dark thread. The golden glow from the pages flowed into the thread like honey into a crack. Warm light ran along the thin line, through the seal, and disappeared into the shimmer.

For a moment, nothing happened.

Then the shimmer cleared again, briefly, without the bell. And through it, you saw the child. It was holding the golden light in its cupped hands, and this time the light was bigger. Warmer. The child's edges were less blurred. Its face was clearer. And it was looking at the light the way someone looks at a letter from home.

"Warm," it whispered. "Real warm. Not leaking warm. Given warm." It looked up at you through the closing window. "Thank you. I remember now. My name was Ember. I was here once. A long time ago. I think I was happy."

The window closed. The thread pulsed once more, gently, and then went still. Not sealed. Not open. Quiet. Satisfied. Like a hunger that had been fed.

Viola placed her hands on the seal. The Wardens leaned in. The thread thinned and closed, softly, like a door being shut instead of slammed. On the other side, Ember had something to hold. Something real. Something given.`,
  companion: null,
  newClues: ["The gifted memories reached the child through the thread", "The child's name was Ember. It was once in Hollowmist.", "The thread closed gently after the gift was received."],
  choices: [
    { text: "Go upstairs", icon: "⬆️", next: "ending_gift" },
  ],
},

ending_sealed: {
  mood: "warm",
  text: `Upstairs, the morning had recovered. Mrs. Puddleford was reorganizing her jars with newfound certainty: strawberry before raspberry, always. Mr. Finch's sourdough was rising. Mr. Pips was behind his counter, sorting mail, though he still looked a little shaken.

The memories hadn't come back, exactly. But they had stopped leaving. People were filling in the gaps with fresh knowledge, rebuilding what was lost the way a garden regrows after a hard frost. It would take time. But the town was healing.

At the kitchen table, Viola opened the Field Journal. She wrote a short entry: **Case File No. 3: The Forgetting. Thread sealed. Town protected. Cost noted.**

She pushed the journal to you. You picked up the pen and wrote beneath her entry:

**There was a child on the other side. I chose the town. I would make the same choice again. But I will not forget the child. That's the least I can do. — {NAME}, Keeper's Apprentice.**

Hemlock landed on the table. He looked at what you'd written. He looked at you. "You carry it well, {NAME}," he said. "The weight. Not everyone does."

Outside, Hollowmist went about its morning. The mist was just fog. The bell tower stood steady. The seal held. And somewhere, on the other side, in the gray dark, a child sat alone and tried to remember what warm felt like.`,
  companion: `Not bad. For a third case.`,
  ending: true,
  endTitle: "The Weight of the Choice",
  endEmoji: "🛡️",
  endMessage: "You sealed the thread and protected the town. Mrs. Puddleford's jars are back in order. The baker's sourdough is rising. Mr. Pips remembered his name is Albert, though he had to look it up. The child on the other side is alone, but the town is safe. That is the Keeper's burden: sometimes the right choice is the heavy one.",
},

ending_gift: {
  mood: "relief",
  text: `Upstairs, the morning had recovered. Mrs. Puddleford was reorganizing her jars, and she was smiling. "Strawberry before raspberry," she said. "I don't know how I forgot. It's my mother's system."

Mr. Finch's sourdough was rising. Mr. Pips was behind his counter, and when you walked in, he beamed. "Albert," he said. "My name is Albert. My mother called me Albie. I don't know how it came back but it came back and I am NOT letting go of it again."

The memories had returned. Not leaked back, not patched over. Returned. As if the child, having been given warmth freely, had let go of what it had taken. You give something real to a hungry child and the child opens its hands. That was how it worked. That was always how it worked.

At the kitchen table, Viola opened the Field Journal. The pages where the memories were written still glowed faintly gold. She wrote below them: **Case File No. 3: The Forgetting. Thread sealed with gift. Memories restored. Ember remembered.**

She pushed the journal to you.

You wrote: **Ember was a child who forgot its name and fed on other people's memories because it was cold and alone. We gave it warmth instead of punishment. The thread closed gently. I think that matters. — {NAME}, Keeper's Apprentice.**

Hemlock landed on the table. He looked at what you'd written. He looked at you. He said nothing for a very long time. Then: "Not bad. For a third case."

Outside, Hollowmist went about its morning. The mist was just fog. The bell stood steady. The seal held. And somewhere, in the gray dark, a child named Ember was holding a golden light in its cupped hands and remembering what warmth felt like. Given warmth. The real kind.`,
  companion: `Not bad. For a third case.`,
  ending: true,
  endTitle: "The Gift",
  endEmoji: "✨",
  endMessage: "You fed a hungry child with freely given warmth and the thread sealed itself. The memories came back. Mr. Pips is Albert again. Mrs. Puddleford's jars are in order. And somewhere in the dark, Ember is holding a light made of sourdough and strawberry jam and a raven on a suitcase. That light will last.",
},

};
