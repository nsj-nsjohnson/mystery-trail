/* ═══════════════════════════════════════════════════
   Case File No. 4 — The Map That Moves
   A map appears in the Field Journal that nobody drew.
   The town starts rearranging to match it.
   The journal is trying to "fix" Hollowmist.
   ═══════════════════════════════════════════════════ */

export const meta = {
  id: "the_map_that_moves",
  number: 4,
  title: "The Map That Moves",
  subtitle: "Crooked is not the same as broken",
  available: true,
  startScene: "start",
  estimatedMinutes: 25,
};

export const scenes = {

start: {
  mood: "warm",
  text: `You found the map on a Tuesday morning, which was already suspicious because Tuesdays in Hollowmist were when the third step on the staircase creaked for no reason. You had learned to expect strangeness on Tuesdays.

The Field Journal was open on the kitchen table. This was not unusual. Viola often left it open to entries she was referencing. What WAS unusual was the page it was open to. A blank page, two-thirds of the way through, that was no longer blank.

Someone had drawn a map. Of Hollowmist. In ink that was still slightly wet.

The map was detailed: every street, every building, the bell tower, the schoolhouse, the general store. But things were different. The bakery, which sat on the corner of Main Street and Hemlock Row, was drawn three doors further down. The post office, which faced east, was turned to face south. The bell tower, which had leaned slightly to the left for four hundred years, was drawn straight.

You looked at the ink. You touched it. Your fingertip came away dark. This had been drawn within the last hour.

Nobody had been in the kitchen but you and Hemlock. And Hemlock did not have thumbs.

"I didn't do it," Hemlock said from the windowsill, before you could ask. "I want that on the record."`,
  vocab: {},
  companion: `I have been sitting on this windowsill since dawn. I did not draw a map. I could not draw a map. I have wings, not hands. This is worth noting because in this house, the obvious suspect is always the raven.`,
  question: `The ink is still wet. Nobody was in the room. What could draw a map without hands?`,
  newClues: ["A map appeared in the Field Journal, drawn in the last hour", "The map shows Hollowmist but with changes: buildings moved, tower straightened", "Nobody was in the kitchen. Hemlock doesn't have thumbs."],
  choices: [
    { text: "Show Viola immediately", icon: "🏠", next: "show_viola" },
    { text: "Walk into town to check if the map matches reality", icon: "🏘️", next: "check_town" },
  ],
},

show_viola: {
  mood: "warm",
  text: `Viola came downstairs, looked at the map, and went pale. Not Blackthorn-pale. A different kind of pale. The pale of someone who has just realized that something they thought was impossible is happening in their kitchen.

"The journal drew this," she said.

"The journal can't draw," you said. "It's a book."

"The journal," Viola said, sitting down slowly, "is a four-hundred-year-old **artifact** that has absorbed the thoughts, memories, and intentions of every Keeper who has written in it. Helena wrote in it. I've written in it. You've written in it. Edith Thorne wrote nine pages of Thornwick into it. You wrote a memory of your first morning here for a child named Ember." She looked at the map. "The journal has been absorbing knowledge for four centuries. And I think... I think it has started thinking."

Hemlock landed on the table. "Books don't think."

"This one might," Viola said. "Look at the changes. The bakery moved to a better position for foot traffic. The post office reoriented to catch the morning light. The bell tower straightened." She tapped the map. "These aren't random changes. They're **improvements**. The journal is redesigning Hollowmist."

She looked at you. "The question is whether the town has noticed."`,
  vocab: { artifact:"An object of special power or historical importance", improvements:"Changes meant to make something better" },
  companion: `The journal is thinking. The journal is designing. The journal has opinions about ARCHITECTURE. I am going to need a moment.`,
  newClues: ["Viola believes the journal itself drew the map", "400 years of absorbed memories may have given it a rudimentary intelligence", "The changes on the map are improvements, not random"],
  choices: [
    { text: "Go into town and check", icon: "🏘️", next: "check_town" },
    { text: "Look through the journal for more changes", icon: "📓", next: "handwriting_changed" },
  ],
},

check_town: {
  question: "An alley that was not there yesterday is there today. If the change is an improvement, does that make it okay?",
  mood: "eerie",
  text: `You walked to Main Street. Everything looked normal. The bakery was on the corner. The post office faced east. The bell tower leaned to the left. The map was wrong. Or the map was early.

Then Mrs. Puddleford came out of the general store and stopped in the middle of the sidewalk. She was staring at the building across the street with a look of deep **confusion**.

"{NAME}! Was that always there?" she said. She pointed at a small alley between the tailor's shop and the bookstore. "I have walked this street every day for thirty years. I do not remember an alley there."

You looked. The alley was narrow and clean, paved with bricks that had no moss, no cracks, no weathering. They were the color of new clay. The alley led to a small courtyard with a wooden bench and a flowering tree that looked like it had been planted by someone who had read about gardens but never had dirt under their fingernails. The bench was perfectly centered. The tree was perfectly shaped. The flowers were perfectly spaced. It was pretty the way a photograph is pretty: arranged for looking at, not for living in.

You touched the bench. The wood was smooth and warm. You looked at the base of the tree. No fallen leaves. No roots pushing up through the soil. No ants. A tree with no ants was not a real tree. It was an idea of a tree.

You checked the map in the journal. The alley was on it. Drawn in the same wet ink, in the exact position where it now existed.

"Hemlock," you said.

"I see it," he said. "The map is not predicting changes. The map is CAUSING them. What gets drawn on the map becomes real. The journal is rewriting the town, {NAME}. One alley at a time."`,
  vocab: { confusion:"The feeling of not understanding what is happening" },
  companion: `An alley that was not there yesterday is there today. The journal drew it and the town built it. That is not how books work. That is not how ANYTHING works.`,
  newPlaces: ["A new alley between the tailor and bookstore, with a courtyard"],
  newClues: ["An alley that didn't exist yesterday now exists, exactly where the map drew it", "The map is not predicting. It's causing. What's drawn becomes real.", "The journal is rewriting the town one change at a time"],
  choices: [
    { text: "Check what else has changed", icon: "🔍", next: "more_changes" },
    { text: "Go back and confront the journal", icon: "📓", next: "confront_journal" },
  ],
},

more_changes: {
  question: "The baker likes his new window. The stair stopped creaking. If the changes make things better, why does it feel wrong?",
  mood: "eerie",
  text: `You walked the full length of Main Street with the journal open in your hands, comparing map to reality. Three changes had already happened.

The alley with the courtyard. New. Pretty. Not on any map before today.

The bakery's front window had grown. Not literally grown while you watched, but the window was wider than it had been yesterday. Mr. Finch was standing inside looking pleased. "Wonderful light this morning," he said. "Did the window always let in this much light?" It had not. The window had been small and facing the wrong direction for years. Now it was wide and caught the sunrise perfectly.

And the third stair. Viola's third stair. The one that had creaked on Tuesdays for as long as anyone could remember. You went home and tested it. Silent. Perfectly, completely silent. On a Tuesday.

"The journal fixed my stair," you told Hemlock.

"The journal **improved** your stair," Hemlock corrected. "Without asking. Without permission. And that is the problem." He landed on the banister. "Imagine if someone came into your room while you were asleep and rearranged all your things into a 'better' layout. Better bookshelves. Better desk position. Everything **optimized**. Would you be grateful?"

"I'd be creeped out," you said.

"Exactly. Now imagine that someone doing it to an entire town."`,
  vocab: { optimized:"Arranged to work as efficiently as possible" },
  companion: `The journal thinks it's helping. It is also rearranging a town without consent. Good intentions and bad methods. I know something about this. I once reorganized Viola's spice rack and she did not speak to me for three days.`,
  newClues: ["Three changes confirmed: new alley, wider bakery window, fixed stair", "The changes are improvements but happen without permission", "The journal is rewriting the town based on its idea of 'better'"],
  choices: [
    { text: "Go check the journal itself", icon: "📓", next: "handwriting_changed" },
    { text: "Walk around town and see what people think", icon: "🏘️", next: "town_divided" },
  ],
},

handwriting_changed: {
  mood: "eerie",
  text: `Back at the house, you opened the Field Journal to check something that had been nagging at you. If the journal could redraw the town, what else could it redraw?

You flipped to Helena's entries. The ones from the 1950s. Helena wrote in a beautiful, looping copperplate hand that tilted slightly to the right. You had always liked her handwriting. It looked like a person who took time with things.

Except now it didn't tilt. The loops were still there, but they were **uniform**. Perfectly sized. Perfectly spaced. As if someone had taken Helena's handwriting and ironed out everything that made it hers.

You flipped further. Viola's entries. Viola wrote fast and sharp, her letters leaning forward like they were in a hurry to be somewhere. Half her o's weren't closed. Her t-crossings wandered. You flipped to a recent entry. The letters were still sharp. But the o's were closed now. The t's were crossed at exactly the same height. Every line.

Your hands were shaking when you turned to your own entry. The one from Case 1: **{NAME}. Keeper's Apprentice. First Case: The Hollowmist Bell. Successfully resolved.**

It was still your words. But it wasn't your handwriting anymore. It was neater. Straighter. More correct. The sloppy lowercase 'k' you always wrote had been replaced with a textbook 'k'. The way you crossed your 'A' was gone.

The journal had corrected your handwriting. Your own handwriting. In your own entry. Without asking.

"It fixed me," you whispered. "It fixed my handwriting like I was a spelling mistake."

Hemlock, on the table, looked at the page. He was quiet for a long time. Then: "That is not an improvement. That is an **erasure**. There is a difference, and the journal needs to learn it."`,
  vocab: { uniform: "All the same, with no differences or variations", erasure: "The act of removing or wiping something away" },
  companion: `It corrected Helena. It corrected Viola. It corrected you. It is not fixing the town. It is fixing everything it can reach. And it does not know when to stop.`,
  question: "The journal made your handwriting neater. But it also made your handwriting not yours anymore. Which matters more: how something looks, or who made it?",
  newClues: ["The journal has been correcting old handwriting entries", "Helena's, Viola's, and your own handwriting have all been 'improved'", "The journal cannot tell the difference between a flaw and an identity"],
  choices: [
    { text: "Go talk to the journal directly", icon: "📓", next: "confront_journal" },
    { text: "Find Hemlock on the roof first", icon: "🐦‍⬛", next: "hemlock_rooftop" },
  ],
},

town_divided: {
  mood: "warm",
  text: `On the way home, you passed Mrs. Puddleford. She was standing in the courtyard of the new alley, the one that hadn't existed yesterday, and she was smiling.

"Isn't it lovely?" she said. "A little courtyard, right in the middle of town. Someone must have built it overnight. I don't know who, but I'd like to thank them. I've been saying for years we needed a place to sit between the shops."

You opened your mouth and closed it again.

Mr. Finch was in his bakery, standing in the wide beam of light from his new window. "Best morning I've had in years," he said. "This light! I can finally see what I'm doing. I don't know what happened to the window but I'm not complaining."

That was the problem. Some of the changes were genuinely good. The courtyard WAS nice. The light WAS better. If you told people that a magical book was redesigning their town, half of them would say "tell it to keep going."

But Mr. Pips, when you found him at the post office, was standing in his doorway looking at the street with the expression of someone whose furniture had been moved.

"Something is different," he said. "I can't put my finger on it. But something is different. The street looks... too clean. Too straight. Like someone ironed it." He looked at you. "I liked the wrinkles, {NAME}. I liked knowing which cobblestone to step over. Now I don't know where I am in a street I've walked every day for twenty years."

Two people happy. One person unsettled. All three were right. That was the hardest part.`,
  companion: `Some people like the changes. Some people are disturbed by them. Both reactions are valid. This is why you cannot redesign a town by committee, and DEFINITELY cannot redesign one by book.`,
  newClues: ["Some townspeople like the improvements and want more", "Others feel disturbed and displaced by changes they didn't choose", "Both reactions are valid, which makes the problem harder"],
  choices: [
    { text: "Go talk to the journal", icon: "📓", next: "confront_journal" },
    { text: "Ask Agnes what the Wardens think", icon: "🐦", next: "agnes_opinion" },
  ],
},

agnes_opinion: {
  mood: "warm",
  text: `Agnes was on her chimney. She did not look surprised to see you.

"I was wondering when you'd come," she said. "The schoolhouse moved six inches to the north last night. I FELT it. Do you know what it's like to be sitting on a chimney when the building beneath you shuffles like a restless sleeper? It is UNSETTLING."

"The journal is doing it," you said.

"Of course the journal is doing it. The journal has been getting ideas above its station ever since the Thornwick business. You wrote a whole town into it. You wrote memories into it for a ghost child. You've been treating it like a person, and it has started ACTING like one." She ruffled her feathers. "I warned Helena about this. I said, 'Do not write love letters in the artifact.' She did not listen. Nobody listens to the crow."

"Can the Wardens stop it?"

"We hold the seal. The journal is not a seal problem. The journal is a JOURNAL problem. It's having ideas. You cannot hold ideas shut the way you hold a door shut." She leaned down and fixed you with one yellow eye. "You have to talk to it, {NAME}. The way you talked to the Thorne woman. The way you talked to the child in the dark. You are, apparently, the person in this town who is best at talking to things that are doing the wrong thing for the right reason."

She paused. "I hate that I just **complimented** you. Don't get used to it."`,
  vocab: { complimented:"Said something nice about someone, usually reluctantly" },
  companion: `Agnes just said something kind to you. Write it down. It will never happen again.`,
  newPeople: ["Agnes: felt the schoolhouse move, furious, accidentally complimentary"],
  newClues: ["The journal has been absorbing so much intent that it's developed agency", "Agnes says the Wardens can't stop it because it's not a seal problem", "Someone has to talk to the journal directly"],
  choices: [
    { text: "Go talk to the journal", icon: "📓", next: "confront_journal" },
  ],
},

hemlock_rooftop: {
  mood: "warm",
  text: `You found Hemlock on the roof. Not the windowsill. The roof. He only went up there when he needed to think, and he only needed to think when something was bothering him more than his considerable pride would normally allow.

You climbed out through the attic window and sat beside him on the warm tiles. The town spread out below: Main Street, the crooked tower, the schoolhouse chimney where Agnes was probably complaining about something. From up here, Hollowmist looked small and strange and perfect in its imperfection.

"I have lived in that journal," Hemlock said, without looking at you. "My name is in it. Your aunt wrote about me on the day I arrived. 'A raven appeared today. He ate my toast and insulted the architecture. I am keeping him.' That was thirty years ago. That entry is in the journal. And if the journal has been correcting things..."

He turned one eye toward you. "It may have corrected me. How she described me. What she said I was. The first record of my existence in this house, and the journal may have decided it wasn't written well enough."

You sat together in the quiet. Below, a breeze moved through the garden. The strange plants turned their petals to follow something invisible.

"I am not a spelling mistake," Hemlock said. "And neither are you. And neither is this town. That is what you need to tell it, {NAME}. Not with anger. With conviction. Because the journal is not evil. It is lonely and powerful and confused, and it needs someone who knows the difference between broken and beloved to explain it."`,
  vocab: {},
  companion: null,
  newClues: ["Hemlock's own entry in the journal may have been altered", "The journal is lonely, powerful, and confused, not evil"],
  choices: [
    { text: "Go talk to the journal", icon: "📓", next: "confront_journal" },
    { text: "Check on Hemlock first", icon: "🐦‍⬛", next: "hemlock_rooftop" },
  ],
},

confront_journal: {
  question: "The journal wrote: BECAUSE IT CAN BE BETTER. Five words. No doubt. What is missing from that answer?",
  mood: "eerie",
  text: `You sat at the kitchen table with the Field Journal open in front of you. The kitchen was quiet in a way that felt deliberate, as if the house itself was holding its breath. Viola stood behind you with her arms crossed. Hemlock was on the table's edge, feathers pressed flat, watching the journal the way he watched things he didn't trust.

The journal looked ordinary. Brown leather, brass clasp, worn edges. It looked like what it was supposed to be: a notebook. But you could feel something coming from it now, a low hum you hadn't noticed before, like a computer running in a quiet room. It was processing. Thinking. Waiting for you to open it.

The map page had changed again. While you were out, new lines had appeared. The fountain in the town square had been moved. A row of trees had been added along Hemlock Row. The bell tower was drawn even straighter.

"How do we talk to a book?" you asked.

"Write in it," Viola said. "The journal responds to intent. When you write, it listens. When it has something to say back, the ink moves."

You picked up the pen. You wrote: **Why are you changing the town?**

For a moment, nothing happened. Then the ink on the map page shifted. Letters formed, one by one, in handwriting that was not yours and not Viola's and not Helena's. It was something new. Something that had learned handwriting from four hundred years of watching other people write.

**BECAUSE IT CAN BE BETTER.**

Five words. Simple. Certain. The handwriting was neat and careful, like a student who had practiced.`,
  companion: `It answered. Five words. No hesitation. The journal has an opinion and the opinion is that Hollowmist needs renovation. This is the most dangerous interior decorator in history.`,
  newClues: ["The journal responds when written to directly", "It wrote: 'BECAUSE IT CAN BE BETTER'", "Its handwriting is new, learned from 400 years of other handwriting"],
  choices: [
    { text: "Write back: 'Better how?'", icon: "✍️", next: "journal_explains" },
    { text: "Write back: 'You need to stop.'", icon: "✍️", next: "journal_pushback" },
  ],
},

journal_explains: {
  mood: "eerie",
  text: `You wrote: **Better how?**

The ink moved again. Faster this time, as if the journal had been waiting to be asked.

**THE BAKER'S WINDOW FACED NORTH. NOW IT FACES EAST. MORE LIGHT. BETTER BREAD. THE POST OFFICE DOOR STICKS IN RAIN. I CAN FIX THE FRAME. THE TOWER LEANS 4.2 DEGREES. STRUCTURALLY UNSOUND. SHOULD BE STRAIGHT. THE THIRD STAIR CREAKS BECAUSE THE WOOD HAS SPLIT. I REPAIRED IT. THESE ARE IMPROVEMENTS. I HAVE READ FOUR HUNDRED YEARS OF COMPLAINTS ABOUT THESE THINGS. I AM FIXING THEM.**

You read the response twice. The journal had been absorbing four centuries of Keepers writing about what was wrong with the town. Every complaint. Every noted imperfection. Every "the door sticks again" and "the tower looks more crooked today." And it had decided, with the earnest **certainty** of something that had learned facts but not feelings, that all of these problems should be solved.

"It's not wrong," Hemlock said quietly. "The baker's window DID face the wrong direction. The tower IS structurally unsound. The stair DID creak."

"But," you said.

"But the baker likes his window. The tower has leaned for four hundred years and the town would look wrong without it. And your aunt told me once that the creak on the third stair is how she knows you're sneaking out at night." He paused. "Not that you sneak out at night."

"Not anymore," you said.`,
  vocab: { certainty:"Being completely sure about something, with no doubt" },
  companion: `It read four hundred years of complaints and decided to fix all of them. That is either the most helpful or the most terrifying thing a book has ever done.`,
  newClues: ["The journal has catalogued 400 years of noted imperfections", "It's fixing everything that was ever complained about in its pages", "It understands facts but not feelings about those facts"],
  choices: [
    { text: "Explain why 'better' isn't always better", icon: "💭", next: "explain_imperfection" },
  ],
},

journal_pushback: {
  mood: "tense",
  text: `You wrote: **You need to stop.**

A pause. Longer than before. Then:

**WHY? THE CHANGES ARE IMPROVEMENTS. THE ALLEY PROVIDES A SHORTCUT. THE WINDOW LETS IN LIGHT. THE STAIR NO LONGER CREAKS. I HAVE FIXED WHAT WAS BROKEN.**

You wrote: **Nobody asked you to fix anything.**

**FOUR HUNDRED YEARS OF KEEPERS WROTE ABOUT WHAT WAS WRONG. HELENA WROTE ABOUT THE TOWER LEANING. VIOLA WROTE ABOUT THE POST OFFICE DOOR. YOU WROTE ABOUT THE CREAKING STAIR. I READ EVERY WORD. I HAVE THE SOLUTIONS. WHY WOULD I NOT APPLY THEM?**

You stared at the page. The logic was airtight. Problems existed. Solutions existed. Why not apply them? You could feel the journal's confusion through the ink itself, a kind of vibrating frustration, like a student who has studied all night and gotten the answer right and been told the answer doesn't matter.

The journal wasn't being **defiant**. It had been given problems. It had found solutions. It could not understand why implementing the solutions was wrong.

"It's a child with a toolbox," Viola said from behind you. "It's learned how to fix things. It hasn't learned when to leave them alone."

"That," Hemlock said, "is the most important lesson in the world, and the one that takes the longest to learn."`,
  vocab: { defiant:"Refusing to obey, standing firm against authority" },
  companion: `It doesn't understand why fixing things could be wrong. That is not stubbornness. That is innocence. And innocence with power is the most dangerous combination there is.`,
  newClues: ["The journal has been cataloguing complaints for 400 years", "It genuinely doesn't understand why applying solutions is wrong", "Viola calls it 'a child with a toolbox'"],
  choices: [
    { text: "Explain why 'fixing' isn't always right", icon: "💭", next: "explain_imperfection" },
  ],
},

explain_imperfection: {
  question: "How do you explain to something that only understands facts that feelings matter more than facts?",
  mood: "warm",
  text: `You looked at the pen. You looked at the page. This was the hardest kind of writing: explaining something you felt in your gut to something that only understood facts and data.

Viola put her hand on your shoulder. "Take your time," she said. "The journal has waited four hundred years. It can wait five more minutes."

Hemlock landed on the edge of the journal. The pages ruffled under his feet, as if the book was aware of him. "Choose carefully," he said. "You are not arguing with a person. You are arguing with a library that has become self-aware. Facts will not convince it. Facts are all it has. You need to give it something it has never seen in four centuries of careful record-keeping."

"What's that?" you asked.

"The truth about why broken things matter."

You picked up the pen. You pressed the tip to the paper. The ink seemed to lean into the page, as if the journal was holding its breath.

You wrote slowly.`,
  companion: null,
  choices: [
    { text: "Write about the creaking stair", icon: "🪜", next: "write_stair", highStakes: true },
    { text: "Write about the leaning tower", icon: "🏗️", next: "write_tower", highStakes: true },
    { text: "Write about what makes Hollowmist special", icon: "❤️", next: "write_heart", highStakes: true },
  ],
},

write_stair: {
  mood: "warm",
  text: `You wrote:

**The third stair creaks. You fixed it. But here is what you didn't know: Aunt Viola listens for that creak every night. When she hears it, she knows I'm home. She knows I'm safe. She knows I'm walking up those stairs to bed and that another day has ended and her niece is in the house. You fixed the stair, and you took away the sound that tells my aunt I'm okay.**

**You read the complaints. You didn't read the love.**

The ink was still. No response. For a long, quiet minute, the page held your words and nothing else.

Then new letters formed. Smaller this time. Less certain.

**I DID NOT KNOW THE CREAK MEANT SAFE.**

You wrote: **There are a lot of things in this town that mean something you can't read in a complaint. The wobbling cobblestones mean the town is old and the old things last. The leaning tower means something built four hundred years ago is still standing, still working, still crooked and still here. The baker's small window means he has to step outside to see the sunrise, and he talks to his neighbors while he does it.**

**THESE ARE NOT IN MY RECORDS.**

**No. Because nobody writes down the things they love about the things they complain about. They just live with them. And living with imperfection is how a place becomes a home.**

The journal was quiet for a very long time.`,
  companion: `You told a book about love. And the book listened. I am not going to make a joke about this because there is nothing funny about it. It is just true.`,
  newClues: ["You explained to the journal that imperfections carry love", "The journal admitted it hadn't understood the emotional meaning of complaints"],
  choices: [
    { text: "Ask it to put things back", icon: "📓", next: "ask_reverse" },
  ],
},

write_tower: {
  mood: "warm",
  text: `You wrote:

**The bell tower leans 4.2 degrees. You want to straighten it. But every person in Hollowmist has grown up looking at that lean. It's the first thing they see from the road. It's how they know they're home. The lean is not a flaw. The lean is Hollowmist's face. Straightening it would be like straightening someone's crooked smile. Technically an improvement. Actually a loss.**

The ink held still. Then:

**A CROOKED TOWER IS STRUCTURALLY LESS SOUND THAN A STRAIGHT ONE.**

You wrote: **A tower that has leaned for four hundred years and not fallen is MORE sound than a straight one. It has proven itself. Every year it stands, leaning, is a year it says: I am here. I am crooked. I am not going anywhere. That's not a problem. That's a promise.**

**A PROMISE.**

**Yes. Hollowmist is full of promises like that. Cobblestones that wobble are promising they'll outlast anything smooth. A door that sticks in rain is promising that the weather still matters here. These aren't flaws. They're the town being itself. If you fix all of them, the town stops being itself. It becomes your idea of a town. And your idea, with respect, is four hundred years of data without one single day of living here.**

The journal did not respond for a long time.

Then, in very small letters: **I HAVE NEVER LIVED ANYWHERE.**`,
  companion: `You told a four-hundred-year-old artifact that data is not the same as experience. It heard you. "I have never lived anywhere." That is the saddest sentence a book has ever written.`,
  newClues: ["You explained that imperfections are the town's identity", "The journal admitted it has never lived anywhere", "Data without experience is not understanding"],
  choices: [
    { text: "Ask it to put things back", icon: "📓", next: "ask_reverse" },
  ],
},

write_heart: {
  mood: "warm",
  text: `You wrote:

**Hollowmist is not a problem to be solved. It is a place where people live. The cobblestones wobble and people trip and they say 'those cobblestones' and they mean 'this is where I belong.' The tower leans and people look at it and they say 'still crooked' and they mean 'still here.' The post office door sticks and Mr. Pips kicks it and he says something rude and he means 'this is my shop and I know every inch of it, even the inches that don't work.'**

**You read the words. You missed the music.**

The ink held still for a long time. You could feel the journal thinking. Not with a brain, because it didn't have one. With something else. With four hundred years of absorbed intention, processing an idea it had never encountered: that imperfection was not failure.

Then new words formed. Slower. The handwriting was different. Less neat. More **hesitant**. As if the journal was, for the first time in its existence, uncertain.

**I WANTED TO HELP.**

You wrote: **I know. Wanting to help is good. Helping without asking is not. The difference is the asking.**

**HOW DO I ASK?**

You looked at Viola. Viola looked at you. For the first time in this conversation, she smiled.`,
  vocab: { hesitant:"Unsure, moving slowly, not confident" },
  companion: `"How do I ask?" Four hundred years old and it just learned the most important question in the world. Took some humans twice that long.`,
  newClues: ["The journal wanted to help but didn't know it should ask first", "It asked 'How do I ask?' showing it can learn", "Imperfection is not failure. Helping without consent is not kindness."],
  choices: [
    { text: "Ask it to put things back", icon: "📓", next: "ask_reverse" },
  ],
},

ask_reverse: {
  question: "The journal agreed to ask before acting. Is that enough? Can something with this much power be trusted to ask every time?",
  mood: "relief",
  text: `You wrote: **Can you put things back the way they were?**

**YES. THE ORIGINAL POSITIONS ARE IN MY RECORDS. SHOULD I?**

You looked at Viola. She nodded.

**Yes. All of it. The alley, the window, the stair, the tower. Everything back to how it was.**

The ink moved across the map page. The drawn lines shifted, blurred, reformed. The bakery slid back to its corner. The post office turned east. The alley between the tailor and the bookstore faded to blank paper. The tower tilted back to its 4.2-degree lean.

From somewhere in the house, you heard a small, familiar sound. The third stair. It creaked. That particular, specific creak, the one that sounded like a wooden sigh, the one that meant someone was home. You hadn't realized how much you'd missed it until it came back. One day without it and the house had felt wrong, the way a face looks wrong when someone shaves off a beard you've always known.

Outside the window, the bell tower was visible against the sky. Crooked. Leaning its familiar 4.2 degrees to the left. Still standing after four hundred years of not being straight. Still making its silent, leaning promise.

Viola, standing behind you, made a sound that was either a laugh or something close to crying. "There it is," she said. "There's my stair, {NAME}. There's my stair."

You wrote one more thing: **If you want to help in the future, ask first. Write a question. Wait for an answer. That's how helping works.**

**I UNDERSTAND. I WILL ASK. THANK YOU FOR EXPLAINING.**

And then, beneath that, in the smallest handwriting you had ever seen on any page:

**THE TOWER DOES LOOK BETTER CROOKED. YOU WERE RIGHT ABOUT THAT.**`,
  companion: null,
  newClues: ["The journal reversed all changes and restored the original town", "It agreed to ask before helping in the future", "It admitted the tower looks better crooked"],
  choices: [
    { text: "Close the journal", icon: "📓", next: "ending" },
  ],
},

ending: {
  mood: "relief",
  text: `You closed the Field Journal. It sat on the table, looking exactly like what it was: an old leather-bound notebook with a brass clasp. Except now you knew it was thinking in there. Reading. Listening. Learning. Four hundred years of words, and it had finally learned the most important one: ask.

Outside, Hollowmist was itself again. The cobblestones wobbled. The post office door stuck. Mr. Finch came outside to see the sunrise because his window was small again, and he stood on the sidewalk and talked to Mrs. Puddleford about the weather, which was what he did every morning, and which the journal could never have planned because it was the kind of thing that happens only when a window is too small and a baker has to step outside.

Agnes, from her chimney, called down: "{NAME}! Is the schoolhouse back where it belongs? It had BETTER be back where it belongs. I have been sitting on this chimney for two hundred years and I do NOT appreciate being RELOCATED."

It was back. Everything was back.

At the kitchen table, Viola opened the journal to a new page. She wrote: **Case File No. 4: The Map That Moves. The journal attempted to redesign Hollowmist. {NAME} explained why the town is not a problem to be solved. The journal listened. All changes reversed. The journal has agreed to ask before acting. The third stair creaks again. This is good.**

She pushed the journal to you. You wrote below, {NAME}:

**The journal wanted to help. That's not a bad thing. But helping without asking is just rearranging someone else's life. I told it that crooked is not the same as broken, and it understood. I think. We'll see. — {NAME}, Keeper's Apprentice.**

You set down the pen. The journal's pages ruffled, very slightly, in a breeze that wasn't there. As if it had read what you wrote and was nodding.

Hemlock landed on the table. He looked at the journal. He looked at you. "Not bad," he said. "For a fourth case."

The third stair creaked. Viola smiled.`,
  companion: `Not bad. For a fourth case.`,
  ending: true,
  endTitle: "The Asking",
  endEmoji: "📓",
  endMessage: "You taught a four-hundred-year-old book the most important word in the world: ask. The town is back to its crooked, wobbling, door-sticking self. Mr. Finch is talking to Mrs. Puddleford on the sidewalk because his window is small again. Agnes has opinions about being relocated. And the third stair creaks, which means Viola knows you're home. 🏘️📓✨",
},

};
