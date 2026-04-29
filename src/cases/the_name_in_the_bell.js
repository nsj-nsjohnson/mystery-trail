/* ═══════════════════════════════════════════════════
   Case File No. 6 — The Name in the Bell
   A name carved inside the bell. The Founder who
   gave up their identity to create the seal.
   ═══════════════════════════════════════════════════ */

export const meta = {
  id: "the_name_in_the_bell",
  number: 6,
  title: "The Name in the Bell",
  subtitle: "Some people choose to be invisible so others can be safe",
  available: true,
  startScene: "start",
  estimatedMinutes: 25,
};

export const scenes = {

start: {
  mood: "warm",
  text: `It was your idea to clean the bell.

Not because it was dirty. Because you were the Keeper's Apprentice, and after five cases of the bell being important, you had never actually studied it up close. You had thrown a nail past it. You had heard it ring thirteen. But you had never looked at the bell itself, the way Aunt Viola looked at things: slowly, carefully, with your face close enough to see what the surface was hiding.

So on a Tuesday morning, you climbed the bell tower with a rag and a lantern and Hemlock on your shoulder.

The bell was enormous up close. Iron, dark, old. The surface was rough with centuries of **oxidation**, tiny ridges and valleys, like wrinkles on a very old face. You started wiping, working around the curve. Twenty minutes in, on the inside where the clapper hung, your rag caught on something. Not a bump. A groove.

You held the lantern closer. Letters. Tiny, precise, carved into the iron with a tool finer than anything you had seen. Hidden by centuries of grime.

You wiped them clean, letter by letter.

**ROWAN ASHFORD**

You stared. Ashford. Viola's family name. Helena's. In some way that you were still getting used to, yours.

Hemlock leaned forward. He was quiet for a long time. "I have been in this town for thirty years," he said. "I have never heard that name, {NAME}. Not once."`,
  vocab: { oxidation:"A chemical process that changes metal over time, like rust" },
  companion: `An Ashford carved into the bell, completely unknown. In a family that has kept records for four centuries. That is not an oversight. That is deliberate.`,
  question: `Why would an Ashford's name be hidden inside the bell and missing from every record?`,
  newClues: ["A name carved inside the bell: ROWAN ASHFORD", "Hidden by centuries of grime, precise and deliberate", "No record of any Rowan Ashford exists"],
  choices: [
    { text: "Check the Field Journal for Rowan Ashford", icon: "📓", next: "search_journal" },
    { text: "Ask Viola about the name", icon: "🏠", next: "ask_viola" },
  ],
},

search_journal: {
  mood: "warm",
  text: `You searched the journal cover to cover. Every page, every entry, every index reference. Helena's copperplate. Viola's sharp hand. The Keepers before Helena.

Nothing. Rowan Ashford did not exist in the journal.

But on the very first page, before Helena's introductory entry, there was a dedication you had seen before but never thought about:

**This Journal is dedicated to the Founder, whose name is the price and whose sacrifice is the seal. May we be worthy of what was given.**

No name. "The Founder." Every Keeper for four hundred years had written in this journal, and not one of them had written the Founder's name.

Hemlock read the dedication. "The Founder, whose name is the price," he repeated. "That is not a metaphor, {NAME}. That is **literal**. The Founder's name WAS the price. Given up. Traded. Used as fuel for something."

The seal. The name was the price of the seal.`,
  vocab: { literal:"Meaning exactly what it says, not a figure of speech" },
  companion: `Four hundred years of Keepers. None knew the Founder's name. Now you've found it in the one place nobody thought to look.`,
  newClues: ["The journal dedication: 'the Founder, whose name is the price'", "No Keeper has ever known the Founder's name", "The name was literally traded to fuel the seal"],
  choices: [
    { text: "Ask around town if anyone has heard the name", icon: "🏘️", next: "investigate_town" },
    { text: "Tell Viola what you found", icon: "🏠", next: "tell_viola" },
  ],
},

investigate_town: {
  mood: "warm",
  text: `You showed the name ROWAN ASHFORD to every person on Main Street. Nobody recognized it.

Mrs. Puddleford: "Ashford, yes, that's Viola's family. But Rowan? No. I know every Ashford who has lived in this town since I was born. There is no Rowan." She paused. "But I will tell you something strange. When I read that name, I feel something. Like I should know it. Like it was on the tip of my tongue once and fell off."

Mr. Finch: "The name makes my hands want to knead bread. I don't know why. It feels like a name that belonged to someone who worked with their hands."

Mr. Pips: "No Rowan Ashford in any record I have. No mail. No **census** entry. No property deed. A person who doesn't appear in postal records doesn't exist. That is the foundational principle of my profession." He paused. "And yet. When I read the name, I want to deliver something to them. A letter. A package. Something that says: I know you were here."

Three people. Three versions of the same feeling: the ghost of a memory that had been removed from every mind in town but had left its shape behind, like a handprint in wet concrete after the hand was gone.`,
  vocab: { census: "An official count of all the people living in a place" },
  companion: `Three people who don't remember Rowan but feel the shape of the memory. That is what happens when a name is consumed but not destroyed. The fire goes out. The warmth remains.`,
  newClues: ["Nobody recognizes the name but everyone feels something when they read it", "The memory was removed but left an emotional impression behind", "Mr. Pips has no records of any Rowan Ashford"],
  choices: [
    { text: "Go to the chamber", icon: "⬇️", next: "tell_viola" },
  ],
},

ask_viola: {
  mood: "warm",
  text: `You showed Viola the rubbing: ROWAN ASHFORD.

"I don't know this name," she said. "And I know every Ashford who has ever lived in Hollowmist." She went to the journal and opened it to the first page. The dedication. She read it aloud: **"This Journal is dedicated to the Founder, whose name is the price and whose sacrifice is the seal."**

"Helena always interpreted that as a **metaphor**," she said. "But what if the Founder's name was literally the price? Given up. Burned. Used as fuel that powers the seal?"

She set down the rubbing. "And Rowan carved it inside the bell before it was consumed. As the only surviving record."`,
  vocab: { metaphor:"Describing something by comparing it to something else, not literally true" },
  companion: `Your aunt just realized four centuries of family history are missing a person. Not forgotten. Erased. On purpose. By the person themselves.`,
  newClues: ["Viola doesn't recognize the name", "The journal dedication may be literal, not metaphorical"],
  choices: [
    { text: "Go to the chamber and examine the seal", icon: "⬇️", next: "tell_viola" },
  ],
},

tell_viola: {
  mood: "eerie",
  text: `In the chamber, Viola knelt beside the seal and held the lantern low. You had looked at this circle a dozen times. But never as something someone BUILT. Someone designed these symbols. Someone carved this circle four hundred years ago, knowing the cost.

"The seal is powered by a sacrifice," Viola said. "The most powerful barriers use names. A true name, freely given, is the strongest fuel because it is the most **personal** thing a person can surrender."

She traced a symbol. "Rowan Ashford gave up their name. Not just the word. The identity. Every record, every memory, every trace was consumed when the seal was created."

"Except the bell," you said.

"Except the bell. Iron is **resistant** to magical erasure. That is why we use iron nails against Mistwalkers. Rowan must have known that. They carved their name in the one material the erasure couldn't reach. Their last act before they disappeared."

Hemlock landed on the seal's edge. "Not proof for themselves," he said. "They knew they would be forgotten. The name wasn't for them. It was for us."`,
  vocab: { personal:"Belonging uniquely to one person", resistant:"Able to stand against something, not easily affected" },
  companion: `Rowan knew the name would be erased. Carved it in iron anyway. Not to be remembered. To leave a message for whoever came after. That is the bravest thing I have ever heard of.`,
  question: `Rowan carved their name knowing it would be their last trace. What does that tell you about why they made the seal?`,
  newClues: ["The seal is powered by a freely given true name", "Rowan's identity was consumed as fuel", "Iron resists magical erasure, which is why the name survived"],
  choices: [
    { text: "Ask the Wardens what they remember", icon: "🐦", next: "ask_wardens" },
    { text: "Try the resonance bell", icon: "🔔", next: "resonance_rowan" },
  ],
},

ask_wardens: {
  mood: "warm",
  text: `Agnes looked at the name ROWAN ASHFORD for a long time.

"I feel something," she said. "Not a memory. More like the **impression** a memory leaves after the memory is gone. Like a footprint in dried mud. The foot is gone. The shape remains."

She ruffled her feathers. "I have been a Warden for two hundred thirty-one years. The memory of who founded the seal was gone before my time. But the FEELING of that person, the gratitude, the sense that someone did something enormous and was never thanked, that has been inside me since the day I accepted the Wardenship. We carry the weight of a debt we cannot name."

Silvia, on the schoolhouse roof: "I feel it too. A warmth that has no source. Like standing in sunlight when there is no sun."

Marmalade appeared, stared at the paper, and headbutted your hand once, gently. The most emotional thing Marmalade had ever done.`,
  vocab: { impression:"A mark left by something that is no longer there" },
  companion: `Three Wardens. Two hundred years of carrying a debt they couldn't name. And a cat who headbutted your hand, which from Marmalade is a standing ovation.`,
  newPeople: ["Rowan Ashford: the Founder, identity consumed to power the seal"],
  newClues: ["Every Warden carries unnamed gratitude toward the Founder", "Silvia describes it as 'warmth with no source'"],
  choices: [
    { text: "Try the resonance bell", icon: "🔔", next: "resonance_rowan" },
    { text: "Decide what to do with the name", icon: "📓", next: "what_now" },
  ],
},

resonance_rowan: {
  mood: "dark",
  text: `You rang the resonance bell and spoke: "Rowan Ashford."

The seal reacted. Every symbol brightened at once. The shimmer stilled completely, like water suddenly going flat. As if the seal had heard its own heartbeat spoken aloud for the first time in four centuries.

Then: a vibration. Low, deep, old. Coming from the seal, the stone, the iron of the bell above. Not language. Something older. The sound of someone who had given up the ability to speak their own name, whose name still echoed in the structure they built.

"Rowan is in the seal," Viola whispered. "Not as a person. Not as a ghost. As the **foundation**. The name didn't just fuel the seal. The name BECAME the seal. Every symbol, every line of silver on this floor, is Rowan Ashford."

The vibration faded. You stood in a room made of someone's sacrifice and felt the full weight of what that meant.`,
  vocab: { foundation:"The base something is built on, the most important underlying part" },
  companion: `The seal is not a wall. The seal is a person. A person who chose to become a wall so everyone behind it could be safe.`,
  newClues: ["Rowan didn't just fuel the seal. Rowan BECAME it.", "Every symbol is made of Rowan's sacrificed identity", "The seal resonated when it heard its original name"],
  choices: [
    { text: "Decide what to do", icon: "📓", next: "what_now" },
  ],
},

what_now: {
  mood: "warm",
  text: `The kitchen table. The journal. The paper with ROWAN ASHFORD. Viola, Hemlock, and you.

"We know the Founder's name," Viola said. "For the first time in four hundred years. The question is what we do with it."

Hemlock: "Two schools of thought. First: write the name in the journal. Restore Rowan to the record. Every future Keeper will know."

"And the second?"

"Leave it hidden. Rowan chose to be **anonymous**. Writing it down might honor them. Or it might undo their choice."

Viola: "There is a third option. Write the name not as a restoration but as a thank you. An **acknowledgment**. The name stays in the record, but as gratitude, not reversal."

Three paths. Each one respected Rowan differently.`,
  vocab: { anonymous:"Unknown, unnamed", acknowledgment:"Recognizing something and expressing appreciation" },
  companion: `Three choices. Each says something different about how you honor someone who chose to be invisible. No wrong answer. But there is a most honest one.`,
  question: `Rowan chose to be forgotten. Is it right to restore their name? Or should you honor the choice, even if it means they stay invisible?`,
  choices: [
    { text: "Write Rowan's full story into the record", icon: "📓", next: "write_full", highStakes: true },
    { text: "Leave the name hidden, honor the choice", icon: "🤫", next: "leave_hidden", highStakes: true },
    { text: "Write a thank-you, not a restoration", icon: "❤️", next: "write_thanks", highStakes: true },
  ],
},

write_full: {
  mood: "relief",
  text: `Below the dedication, you wrote:

**The Founder's name was Rowan Ashford. They carved it inside the bell in iron that could not be erased. They built the seal that has protected Hollowmist for four hundred years. They gave up their identity so every person in this town could sleep safely.**

**Rowan Ashford was the first Keeper. We will not forget again. — {NAME}**

The ink glowed gold. From below, a tremor. Not an earthquake. A settling. The seal, which had hummed and pulsed through five cases of being stressed, went still. As if hearing its own name in permanent record had given it something it had been missing for four hundred years.

Viola: "Rowan Ashford. First Keeper of Hollowmist. Welcome back."`,
  companion: `You restored the name. Every Keeper from now on will know who made the sacrifice. Rowan is no longer invisible.`,
  choices: [
    { text: "Sit with this for a moment", icon: "💭", next: "reflection" },
  ],
},

reflection: {
  mood: "warm",
  text: `You sat at the kitchen table with the journal closed in front of you. Viola made tea. Hemlock sat on the windowsill. Nobody spoke.

Outside, Hollowmist went about its afternoon. Mrs. Puddleford sweeping. Children playing by the fountain. The baker stepping outside to see the sky because his window was small and that was how he met his neighbors.

"Viola," you said. "How many people do you think have done things like Rowan? Given up something so that other people could be safe? And nobody ever knew?"

Viola set down her tea. "More than we can count," she said. "That is the nature of sacrifice, {NAME}. The ones who give the most are usually the ones who are noticed the least. Keepers do not do this job for the applause. We do it because the stair needs to creak and the tower needs to lean and somebody has to make sure that it does."

Hemlock cleared his throat. "I would like to point out that I have been doing this job for thirty years and I receive neither applause nor adequate toast."

"You receive exactly enough toast," Viola said.

"That is a matter of **perspective**," Hemlock said. "And mine is that toast quantities should be increased across the board."

You laughed. And the laugh felt good. Not because the moment was funny. Because the moment was real. A kitchen. A raven arguing about toast. An aunt who had spent her life protecting a town that didn't know it needed protecting. And somewhere in the iron of a bell, a name that had waited four hundred years for someone to find it.`,
  vocab: { perspective: "A particular way of looking at or thinking about something" },
  companion: null,
  choices: [
    { text: "Close the journal", icon: "📓", next: "ending" },
  ],
},

leave_hidden: {
  mood: "relief",
  text: `You closed the journal. You folded the paper and put it in your pocket.

"Rowan chose to disappear," you said. "Four hundred years later, I don't think I have the right to undo it."

Viola nodded. "That is a harder choice than writing it down. It takes more **courage** to honor someone's decision, even when your heart wants to shout their name from the bell tower."

You climbed back to the tower. You pressed the paper against the carving and tucked it into a crack beside the bell. A companion keeping the name company.

"You're not alone," you said. "Someone knows. Someone chose to let you stay where you put yourself."

The bell hummed. Very softly. A single low note from the iron itself.

Hemlock pressed his feathers against your neck. "That," he said, "was the right kind of quiet."`,
  vocab: { courage:"Being brave enough to do something difficult" },
  companion: `You found a hero and chose to let them stay hidden. Not because you don't care. Because you do. That is the hardest kind of respect.`,
  choices: [
    { text: "Go home", icon: "🏠", next: "ending" },
  ],
},

write_thanks: {
  mood: "relief",
  text: `Below the dedication, you wrote:

**To Rowan Ashford, the Founder of the seal of Hollowmist.**

**I found your name inside the bell. I don't know if you wanted to be found. But four hundred years of Keepers lived under your protection without knowing your name. That's not right.**

**This is not a restoration. I cannot undo what you chose. But I can say this, in permanent ink, in a journal that does not forget:**

**Thank you, Rowan. For every night. For every morning. For every person who slept safe and never knew why.**

**— {NAME}, Keeper's Apprentice. The sixth. And the first to know your name.**

The ink glowed. Not gold. Silver. The color of the seal. As if Rowan, from somewhere inside four hundred years of purpose, had read what you wrote and answered in the only language they had left.

Viola's eyes were bright. "The sixth Keeper. And the first to know." She put her hand on the journal. "I think that would have mattered to them."`,
  companion: `Silver ink. The seal's color. Rowan answered you, {NAME}. From inside the barrier they became. That is the most extraordinary thing that has happened in this town.`,
  choices: [
    { text: "Sit with this for a moment", icon: "💭", next: "reflection_after" },
  ],
},

reflection_after: {
  mood: "warm",
  text: `Viola read what you wrote. She took off her glasses. She cleaned them. She put them on. She cleaned them again.

"The sixth Keeper," she said. "And the first to know."

She was quiet for a moment. Then: "When I was young, Helena told me the Founder's story. She said: 'Someone gave everything so we could have this.' I asked her who. She said she didn't know. I asked if that bothered her. She said: 'Every day. Every single day.'"

Viola looked at the silver-glowing ink. "It doesn't bother me anymore. Because now I know. And because you found it, {NAME}. Not me. Not Helena. You. The kid who opened a notebook she was told not to touch, in a kitchen where the tea was on fire, in a town where the ravens talk. You found it because you clean bells. Because you pay attention. Because you are exactly the kind of person Rowan would have wanted to find their name."

Hemlock, on the windowsill, said nothing. But his feathers pressed flat, the way they did when he was feeling something he would rather not admit to feeling.`,
  companion: null,
  choices: [
    { text: "Close the journal", icon: "📓", next: "ending" },
  ],
},

ending: {
  mood: "relief",
  text: `The walk home was quiet. The good kind.

Hollowmist was doing its thing. Mrs. Puddleford sweeping. The baker's sourdough rising. Mr. Pips sorting mail. Agnes complaining. Cobblestones wobbling. Third stair creaking. Bell tower leaning 4.2 degrees, as it had for four hundred years, and at the top of that tower, inside a bell made of iron that could not be erased, a name waited. Patient. Permanent.

At the table, Viola wrote: **Note to future Keepers: the bell is not just a bell. Clean it when your Apprentice is ready. What they find inside will teach them more about this job than I ever could.**

She slid the journal to you. Not to write in. Just to hold. To feel the weight of four hundred years of care and sacrifice, and the kind of love that erases itself so others can be safe.

Hemlock landed on the table. He looked at the journal. He looked at you. And for once, he did not say "not bad."

He said: "Well done, {NAME}. Well done."

The third stair creaked. The bell tower leaned. The seal held. And somewhere inside it, a name carved in iron waited, quiet and certain, for as long as iron lasts.`,
  companion: `Well done, {NAME}. Well done.`,
  ending: true,
  endTitle: "The Founder",
  endEmoji: "🔔",
  endMessage: "You found a name hidden for four hundred years. Rowan Ashford, who gave up everything so a town could be safe. The cobblestones wobble. The stair creaks. The tower leans. The bell holds a name in iron that cannot be erased. Some people choose to be invisible so others can be safe. That is not a tragedy. That is the bravest kind of love. 🔔📓✨",
},

};
