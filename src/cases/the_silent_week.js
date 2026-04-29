/* ═══════════════════════════════════════════════════
   Case File No. 5 — The Silent Week
   The seal hoards spoken words out of fear.
   ═══════════════════════════════════════════════════ */

export const meta = {
  id: "the_silent_week",
  number: 5,
  title: "The Silent Week",
  subtitle: "Words are not yours to keep just because you're afraid of silence",
  available: true,
  startScene: "start",
  estimatedMinutes: 25,
};

export const scenes = {

start: {
  mood: "warm",
  text: `You knew something was wrong before you opened your eyes.

The house was quiet. Not morning-quiet, the kind where Viola is downstairs making tea and Hemlock is reporting on the activities of Mrs. Puddleford's cat. This was a thick quiet. The kind of quiet that has weight.

You got dressed and went downstairs. Viola was at the kitchen table. She looked up when you walked in. She opened her mouth to say good morning. Nothing came out.

Not a whisper. Not a croak. Nothing. Her mouth moved. Her lips formed the words. But the space between her lips and your ears was empty, as if the sound had been **intercepted** between her throat and the air.

She tried again. Her face shifted from confusion to concern to controlled fear.

She grabbed a pen and wrote in her sharp fast hand: **I cannot speak. Can you?** Her letters were pressed harder than usual. That was how you could tell Viola was scared: her handwriting got sharper, as if the pen was trying to do the work her voice could not.

You opened your mouth. You tried to say "yes." You tried to say your own name.

Silence. Complete, total, impossible silence.

From the windowsill, Hemlock opened his beak. No sound. He tried again. Nothing. He grabbed a piece of toast, flew to the table, and scratched in the butter with one talon:

**WELL THIS IS INCONVENIENT. {NAME}, DO SOMETHING.**`,
  vocab: { intercepted:"Caught or stopped before reaching where it was supposed to go" },
  companion: null,
  question: `Everyone lost their voice at the same time. What could take something from an entire town at once?`,
  newClues: ["Nobody in the house can speak", "Mouths move but no sound comes out", "It happened overnight to everyone"],
  choices: [
    { text: "Go into town and see if everyone is affected", icon: "🏘️", next: "silent_town" },
    { text: "Check the Field Journal for anything like this", icon: "📓", next: "check_journal" },
  ],
},

check_journal: {
  mood: "warm",
  text: `Under "S" for silence, one entry, in Helena's hand, 1951:

**"March 14. The mockingbird on Hemlock Row has stopped singing. It still opens its beak. No sound emerges. Duration: six hours. Self-resolved. Possibly connected to the seal's maintenance cycle."**

One bird. Six hours. Not the same as an entire town.

Viola wrote on her notepad: **Helena noted a maintenance cycle. The seal absorbs ambient sound periodically to calibrate itself. But this is not calibration. This is everything.**

Hemlock dropped a note: **THE SEAL IS NOT CALIBRATING. THE SEAL IS TAKING. GO TO TOWN. FIND OUT HOW BAD IT IS.**

Beneath that, smaller: **ALSO I CANNOT GIVE MY MORNING REPORT AND THIS IS GENUINELY DISTRESSING TO ME AS A PROFESSIONAL.**`,
  companion: null,
  newClues: ["Helena noted a single bird losing its voice in 1951", "The seal has a maintenance cycle that absorbs sound", "This is different: everything is being taken"],
  choices: [
    { text: "Go into town", icon: "🏘️", next: "silent_town" },
  ],
},

silent_town: {
  mood: "eerie",
  text: `Main Street was the strangest thing you had ever seen in Hollowmist.

Every shop was open. Every person was at their post. And nobody was making a sound.

Mrs. Puddleford held up a chalkboard: **CAN'T TALK. VERY UPSET. HAVE WRITTEN 47 NOTES. MY HAND HURTS.**

Mr. Finch held up cardboard: **THE BREAD IS FINE. MY VOICE IS NOT. THESE TWO FACTS ARE EQUALLY IMPORTANT TO ME.**

Mr. Pips had gone full **bureaucrat**. He'd set up numbered tickets, a suggestion box labeled "COMPLAINTS (WRITTEN ONLY)," and a sign: **POSTAL SERVICE CONTINUES. SCREAMING DOES NOT. PLEASE FORM AN ORDERLY LINE.**

A woman outside the bookshop was having an argument with her neighbor using nothing but facial expressions and aggressive pointing. She was winning. Next to the fountain, two children were playing a game that appeared to involve throwing pebbles at a target, keeping score on a piece of slate. They had adapted faster than any of the adults. Children, you were learning, were good at finding new ways to communicate when the old ones broke.

The strangest part was the birds. They were silent too. Every sparrow, every robin, every pigeon that usually filled the morning with chatter was sitting on rooftops and fences with closed beaks, looking offended. The silence was not just human. It was everything. The whole town had been muted like a phone.

Hemlock dropped a note at your feet: **THIS IS SIMULTANEOUSLY THE WORST AND FUNNIEST THING THAT HAS EVER HAPPENED TO THIS TOWN.**`,
  vocab: { bureaucrat:"A person who follows official rules and procedures very strictly" },
  companion: null,
  question: `Writing and gestures work. Only spoken words are gone. What does that tell you about what's being taken?`,
  newPeople: ["Mrs. Puddleford: 47 notes and counting", "Mr. Finch: bread is fine, voice is not", "Mr. Pips: silent postal system with numbered tickets"],
  newClues: ["Every person in town has lost their voice", "Writing, gestures, and expressions still work", "Only spoken words are gone"],
  choices: [
    { text: "Visit Agnes at the schoolhouse", icon: "🐦", next: "hemlock_notes" },
    { text: "Go straight to the chamber", icon: "⬇️", next: "hemlock_notes" },
  ],
},

hemlock_notes: {
  mood: "warm",
  text: `On the walk back from Main Street, Hemlock had been writing notes faster than you could read them. He was using a small notepad strapped to his leg with a rubber band, a system he had apparently prepared in advance, which told you he had been expecting something like this for a while.

He lined his notes up on the garden wall like a detective pinning evidence to a board:

**NOTE: THE SILENCE BEGAN AT APPROXIMATELY 3 AM. I WAS AWAKE. I HEARD THE TOWN GO QUIET. NOT GRADUALLY. ALL AT ONCE. LIKE SOMEONE PRESSING MUTE.**

**NOTE: THE BIRDS STOPPED FIRST. THEN THE INSECTS. THEN THE DOGS. THEN THE PEOPLE. THE ORDER MATTERS. WILDLIFE FIRST, THEN DOMESTIC ANIMALS, THEN HUMANS. WHATEVER DID THIS STARTED WITH THE SIMPLEST VOICES AND WORKED UP.**

**NOTE: I TRIED TO CAW SEVENTEEN TIMES. NOTHING. I TRIED TO CLICK MY BEAK. THAT WORKS. I TRIED TO RUFFLE MY FEATHERS LOUDLY. THAT WORKS. ONLY VOICED SOUNDS ARE AFFECTED. BREATH, FOOTSTEPS, PAPER RUSTLING, ALL FINE. SPECIFICALLY VOCALIZED SOUND, PRODUCED BY A THROAT, IS BEING TAKEN.**

**NOTE: THIS IS PERSONAL. WHATEVER IS DOING THIS WANTS VOICES. NOT ALL SOUND. VOICES.**

He tapped the last note with his talon and looked at you. His eyes said what his voice could not: this is bad, {NAME}. This is very bad.`,
  companion: null,
  newClues: ["The silence began at 3 AM, all at once, like pressing mute", "Wildlife lost voices first, then animals, then humans", "Only vocalized sound is affected, not breath or footsteps or rustling", "Whatever is doing this specifically wants voices"],
  choices: [
    { text: "Visit Agnes at the schoolhouse", icon: "🐦", next: "agnes_notes" },
    { text: "Go to the chamber", icon: "⬇️", next: "seal_check" },
  ],
},

agnes_notes: {
  mood: "warm",
  text: `Agnes was on her chimney. Silent. This alone was worth the walk. Agnes, who had never gone more than thirty seconds without voicing a complaint, was sitting with her beak clamped shut and an expression of **concentrated** fury.

She had scratched words into the brick with her talons:

**I HAVE OPINIONS. I CANNOT VOICE THEM. THIS IS A VIOLATION OF MY FUNDAMENTAL RIGHTS AS A CREATURE WHO EXISTS PRIMARILY TO COMPLAIN.**

Below: **THE SEAL IS DOING THIS. I CAN FEEL IT. IT IS PULLING SPOKEN WORDS INTO ITSELF. NOT WRITTEN WORDS. NOT THOUGHTS. SPOKEN WORDS SPECIFICALLY. IT IS HOARDING THEM.**

And below that: **IT IS AFRAID OF SOMETHING. I DO NOT KNOW WHAT.**

You looked at the deep scratches in the brick. Agnes had been carving words into masonry with her talons. That was not a casual act. That was someone who needed to communicate badly enough to claw language into stone.

You wrote: **Afraid of what?**

Agnes scratched: **SILENCE. THE SEAL IS AFRAID OF SILENCE. IT HAS LISTENED TO THIS TOWN TALK FOR FOUR CENTURIES. SPOKEN WORDS ARE WHAT TELLS IT THE TOWN IS ALIVE. SOMETHING MADE IT BELIEVE THE TALKING MIGHT STOP.**`,
  vocab: { concentrated:"Focused intensely, very strong" },
  companion: null,
  newClues: ["Agnes confirms the seal is pulling spoken words into itself", "It is afraid of silence", "It believes the talking might stop"],
  choices: [
    { text: "Go to the chamber", icon: "⬇️", next: "seal_check" },
  ],
},

seal_check: {
  mood: "eerie",
  text: `The chamber was different. The shimmer in the center was gone. In its place: a sound. A low, dense hum, like a thousand conversations compressed. The seal was vibrating with stolen voices.

You stepped closer. The hum grew louder, and you realized it was not one sound but thousands, layered on top of each other like pages in a book. You could almost make out individual words. "Good morning." "Two loaves, please." "Has anyone seen my—" "I love—" Pieces of a town's daily talk, pulled from the air and packed into the seal.

Viola wrote: **The seal has been absorbing spoken words for 8 hours. At this rate, it will consume every spoken word from the past decade within 48 hours. People will begin losing memories of conversations. Not just the ability to speak. The memory of what they said.**

She wrote another line: **We need to understand WHY. The seal doesn't do things without reason.**

Hemlock dropped a note: **WHAT FRIGHTENS A FOUR-HUNDRED-YEAR-OLD MAGICAL BARRIER?**`,
  companion: null,
  question: `The seal is storing words because it's afraid of silence. What would make it believe the town might go quiet?`,
  newClues: ["The seal is vibrating with thousands of stolen conversations", "Within 48 hours people will lose memories of what they've said", "The seal doesn't act without reason"],
  choices: [
    { text: "Use the resonance bell to talk to the seal", icon: "🔔", next: "talk_seal" },
    { text: "Search the journal for what triggered this", icon: "📓", next: "search_trigger" },
  ],
},

search_trigger: {
  mood: "warm",
  text: `You went through the journal page by page. What had changed recently?

Case 3. Memories had been leaking through a crack. Case 4. The journal itself had started thinking independently. Both events, back to back, showed the seal that the world around it was changing. Artifacts could develop minds. Memories could be stolen through cracks.

If the seal had noticed all of this...

You wrote on a notepad: **It's scared of becoming irrelevant.**

Viola read it and wrote: **It watched the journal develop independence. It watched memories get stolen. It concluded: if the town forgets me, I weaken. If I weaken, the seal breaks. So it started hoarding the one thing that proves the town is alive. Voices. Words.**

She underlined: **It is not evil. It is terrified.**`,
  companion: null,
  newClues: ["Recent events showed the seal that artifacts can change and memories can be stolen", "The seal concluded: if the town forgets me, I break", "It's hoarding voices as proof the town is alive"],
  choices: [
    { text: "Go talk to the seal", icon: "🔔", next: "talk_seal" },
  ],
},

talk_seal: {
  mood: "eerie",
  text: `You rang the resonance bell. The hum shifted. Organized. From the compressed mass of stolen voices, words assembled themselves. Not one voice. All of them. A **chorus** of every voice in Hollowmist, speaking in pieces:

**"...we are... afraid... the talking... stops... and we... are forgotten... and we... break..."**

Mrs. Puddleford's voice saying "afraid." Mr. Finch's saying "forgotten." A child's voice saying "break." The seal was speaking in the town's stolen words.

You held up your notepad: **Why are you afraid of being forgotten?**

**"...the thread... the memories... leaking... the journal... thinking... changing... if everything changes... if no one remembers... we are... just... stone..."**

Just stone. A four-hundred-year-old barrier, terrified of becoming ordinary rock.`,
  vocab: { chorus:"Many voices speaking together as one" },
  companion: null,
  question: `The seal fears becoming "just stone." Does something need to be spoken about to matter?`,
  newClues: ["The seal speaks using assembled fragments of stolen voices", "It fears becoming 'just stone'", "Recent events made it feel everything is changing"],
  choices: [
    { text: "Try to reassure the seal", icon: "🗣️", next: "reassure_seal" },
    { text: "Go upstairs and think", icon: "💭", next: "think_it_over" },
  ],
},

think_it_over: {
  question: "Ember took memories because it was hungry. The journal rearranged because it wanted to help. The seal hoards because it's scared. What do all three have in common?",
  mood: "warm",
  text: `Upstairs, Hemlock had lined up notes on the windowsill:

**NOTE 1: THE SEAL WANTS TO BE REMEMBERED.**
**NOTE 2: IT IS HOARDING WORDS TO GUARANTEE THIS.**
**NOTE 3: HOARDING DOES NOT CREATE LOYALTY. IT CREATES RESENTMENT.**
**NOTE 4: IF YOU LOCK SOMEONE IN A ROOM TO KEEP THEM, THEY WANT TO LEAVE MORE.**
**NOTE 5: THE SEAL NEEDS TO UNDERSTAND THAT BEING REMEMBERED IS NOT ABOUT KEEPING. IT IS ABOUT DESERVING.**

Viola wrote: **He's right. The seal is trying to guarantee something that can only be given freely. Sound familiar?**

It did. Ember took memories because it was hungry. The journal rearranged the town because it wanted to help. Now the seal was hoarding words because it was afraid. Three different problems. Same root: gripping instead of earning.

You knew what to say. The question was how, when you couldn't speak.`,
  companion: null,
  newClues: ["Hemlock's argument: hoarding creates resentment, not loyalty", "Same pattern: gripping instead of earning"],
  choices: [
    { text: "Go back down", icon: "⬇️", next: "reassure_seal" },
  ],
},

reassure_seal: {
  question: "The seal needs to hear a voice. But nobody can speak. How do you give something freely when the thing you're giving has been taken?",
  mood: "eerie",
  text: `You stood at the circle's edge. The seal hummed with stolen words. You rang the resonance bell.

**"...are you... going to... make us... stop?..."**

Writing felt wrong for this. The seal was afraid of losing SPOKEN words. It needed to hear a voice. A real one. Given freely.

Viola stepped forward, placed her hand on the stone. The grip loosened. For one second, enough voice leaked back for her to speak.

"I remember you," she said, barely a whisper but real. "I have written about you every week for forty years. You are not forgotten. You will NOT be forgotten."

The hum wavered.

"Now give them back," she said. "The town that remembers you cannot do that if you've stolen their words. You are **silencing** the people whose voices keep you alive."

The seal was quiet. Processing. Weighing.`,
  vocab: { silencing:"Making someone unable to speak or be heard" },
  companion: null,
  choices: [
    { text: "Write a permanent promise in the journal", icon: "✍️", next: "write_promise" },
    { text: "Add your voice to Viola's", icon: "🗣️", next: "add_voice", highStakes: true },
    { text: "Go find people to add their voices too", icon: "🏘️", next: "gather_voices" },
  ],
},

gather_voices: {
  mood: "warm",
  text: `You ran upstairs and out the door. If the seal needed to hear voices, it needed to hear the town's voices. Not stolen. Given.

Mrs. Puddleford was on the sidewalk, chalk in hand, writing prices on a sandwich board. You grabbed her notepad and wrote: **Come to Viola's house. Bring your voice. I know how to get it back but the seal needs to hear you choose to give it something first.**

She read it. She didn't hesitate. She picked up her chalkboard and followed.

Mr. Finch came next. Then Mr. Pips. Then the woman from the bookshop, and her neighbor, and the two children from the fountain, still carrying their slate. By the time you reached Viola's house, you had eleven people, a cat (Marmalade, who had appeared from nowhere and was walking at the front of the group with the confidence of a **parade** marshal), and one deeply irritated crow who had glided down from her chimney without being asked.

In the chamber, eleven people stood around the seal circle. Viola placed her hand on the stone. The hum shifted. The grip loosened, just slightly.

"When I touch the stone, you get your voice back for a few seconds," you wrote on your notepad and held it up. "Say something. Anything. Say what you want the seal to hear. Say why this town matters."

Mrs. Puddleford went first. She put her hand on the stone beside Viola's. Her voice came back in a rush: "I have run that shop for thirty years and I intend to run it for thirty more and I will TALK about it the ENTIRE time!"

Mr. Finch: "The sourdough rises every morning. That is a promise between me and the bread and I will not make it in silence."

Albert Pips, voice shaking: "My name is Albert. My mother called me Albie. I will say my own name as many times as I like. It is MINE."

One by one, eleven voices, each one freely given to the seal. Each one saying: I am here. I am staying. I will keep talking.`,
  vocab: { parade: "A public march or procession, usually celebratory" },
  companion: null,
  newClues: ["You gathered townspeople to voluntarily give their voices to the seal", "Eleven people spoke freely into the seal", "Each voice was a promise: I am here and I will keep talking"],
  choices: [
    { text: "Let the voices do their work", icon: "✨", next: "voices_release" },
  ],
},

voices_release: {
  mood: "relief",
  text: `Eleven voices. Eleven promises. The seal listened the way it always listened, with the whole of its four-hundred-year-old attention, and this time what it heard was not stolen words but given ones. Words that came with faces and histories and the weight of people who meant what they said.

The hum cracked. Not violently. Like ice in spring: a long, slow, spreading thaw. The compressed voices released in a warm wave, rising through the stone, flowing up through the floor of the kitchen, spreading through the walls and out into the streets, finding their way home to the throats they had been taken from.

Outside, someone laughed. Someone else said "oh!" in a voice full of surprise and relief. A dog barked. A bird sang. The sounds of a town waking up from a silence it had not chosen.

Agnes, from the chamber doorway, spoke first and loudest: "FINALLY. I have been COMPOSING complaints for EIGHT HOURS and I intend to DELIVER every single one."

Hemlock, on your shoulder, exhaled. "Eleven people," he said. "You brought eleven people underground and asked them to talk to a wall. And they did it. Because you asked." He paused. "That is not nothing, {NAME}. That is leadership."`,
  companion: null,
  choices: [
    { text: "Go upstairs", icon: "⬆️", next: "ending" },
  ],
},

write_promise: {
  mood: "relief",
  text: `You knelt beside Viola and placed your hand on the stone too. Instead of speaking, you opened the Field Journal and wrote:

**The seal of Hollowmist has held this town safe for four hundred years. It is not stone. It is a promise. Every Keeper who comes after me will know this. The seal is remembered. The seal is honored. The seal matters.**

**This is a permanent record. It does not fade. It does not need to be hoarded. It is here. — {NAME}, Keeper's Apprentice.**

You pressed the journal against the seal. Golden warmth flowed from the page into the stone. Not a memory. A promise.

The hum broke like a wave. Stolen voices released. Sound flooded the chamber, a rush of "good mornings" and "I love yous" spreading through the town like warmth returning to cold hands.

From upstairs, Mrs. Puddleford's voice: "—AND ANOTHER THING, the price of butter has gotten COMPLETELY out of hand—"

The seal was quiet. Not empty. At peace.`,
  companion: null,
  newClues: ["You wrote a permanent promise into the journal", "The golden glow carried it into the seal", "The stolen voices were released"],
  choices: [
    { text: "Go upstairs", icon: "⬆️", next: "ending" },
  ],
},

add_voice: {
  mood: "relief",
  text: `You knelt beside Viola and placed your hand on the stone. The grip loosened. You pushed.

"I'm here," you said. Rough, strange, like speaking through sand. But real. "I'm here, and I remember you, and I'm not going anywhere."

The hum wavered. You kept talking.

"You held the door shut when Blackthorn tried to open it. You held it when Ember was drinking through the crack. You have held this town together for four hundred years and NOBODY has ever said thank you." Your voice was getting stronger. "So I'm saying it now. Thank you. For every night you held. For every morning we woke up safe. Thank you."

The hum broke. Gently. Like someone who has been holding their breath finally exhaling. Voices released in a warm rush, rising through stone, spreading through walls and into the streets.

From the windowsill, quiet but clear: Hemlock's voice. "There it is," he said. "There is the voice I have been missing, {NAME}." "There is the voice I have been missing."

The seal shimmered. Steady. Calm. Thanked, and at peace.`,
  companion: `You thanked a four-hundred-year-old magical barrier that has never been acknowledged. And it worked. Gratitude, freely given, is the one thing that cannot be hoarded or stolen.`,
  newClues: ["You spoke directly to the seal, thanking it", "The stolen voices released when the seal felt heard"],
  choices: [
    { text: "Go upstairs", icon: "⬆️", next: "ending" },
  ],
},

ending: {
  mood: "relief",
  text: `The noise hit you when you reached the kitchen. Hollowmist was LOUD. Mrs. Puddleford was holding court on the sidewalk about the **indignity** of chalkboards. Mr. Finch was singing off-key about sourdough. Mr. Pips came out of the post office, tore down his sign, and said: "My name is ALBERT and I can SAY IT."

Agnes was making up for lost time: "—AND FURTHERMORE, the STRUCTURAL INADEQUACY of this chimney has been a CONSISTENT concern—"

Hemlock landed on your shoulder. He was quiet for a moment, enjoying the sound of the town being itself. Then: "I would like to deliver my morning report. It is now afternoon, but it has been building all day."

"Go ahead," you said. With your voice.

"Mrs. Puddleford's cat is on her roof again. The baker has returned to sourdough. Agnes is complaining. The seal is stable. The town is talking." He paused. "And the Keeper's Apprentice remembered to say thank you. That last item is the most important."

At the table, Viola wrote in the journal: **Case File No. 5: The Silent Week. The seal hoarded spoken words out of fear. {NAME} reminded it that being remembered is not about keeping. Voices restored. The seal is at peace.**

You wrote: **I thanked a wall today. It was the most important thing I've ever said. Some things do their jobs so long that nobody notices. The seal held for four hundred years. Nobody said thank you until today. — {NAME}, Keeper's Apprentice.**

The third stair creaked when you went up to bed. Viola's voice called from the kitchen: "Goodnight, {NAME}."

Best sound in the world. Your name, in her voice, in a house that was yours.`,
  vocab: { indignity:"Being treated in a way that makes you feel unimportant" },
  companion: `Not bad. For a fifth case. Also: my morning report is now a morning-and-afternoon report, and I expect full attention. Tomorrow. With toast.`,
  ending: true,
  endTitle: "The Voice",
  endEmoji: "🗣️",
  endMessage: "You thanked a four-hundred-year-old wall and it gave an entire town its voice back. Mrs. Puddleford has opinions about chalkboards. Mr. Finch is singing about sourdough. Albert can say his name. Agnes is complaining at full volume. And Hemlock has a report to deliver. 🏘️🗣️✨",
},

};
