/* ═══════════════════════════════════════════════════
   Case File No. 2 — The Thornwick Map
   Three weeks after Case 1. A map of a town that
   shouldn't exist. A woman who can't forget.
   ═══════════════════════════════════════════════════ */

export const meta = {
  id: "thornwick_map",
  number: 2,
  title: "The Thornwick Map",
  subtitle: "Some things are lost for a reason",
  available: true,
  startScene: "start",
  estimatedMinutes: 20,
};

export const scenes = {

start: {
  mood: "warm",
  text: `Three weeks in, and Hollowmist was starting to feel like yours.

You knew which cobblestones wobbled on Main Street. You knew that Mrs. Puddleford would give you free shortbread if you let her talk for ten minutes, and that the trick was to say "really?" at the right moments. You knew that the third step on Aunt Viola's staircase creaked, and the seventh one didn't, and the eleventh one creaked only on Tuesdays for reasons nobody could explain.

Hemlock had taken to meeting you at breakfast. He would land on the kitchen windowsill, accept a piece of toast with the dignity of a senator, and brief you on the town's overnight activity. "Mrs. Puddleford's cat is on her roof again. The baker has switched to sourdough, which is a **lateral** move at best. And someone left a package at the post office before dawn."

That last part made Aunt Viola look up from her tea. "A package?"

"Mr. Pips was very agitated about it. More than usual, which is saying something for a squirrel who vibrates under normal conditions." Hemlock tore a corner of toast. "No return address. No postage. Just appeared on the counter before the shop opened."

Viola set down her cup. She looked at you. "Go see what it is, {NAME}. Take Hemlock. If it's nothing, bring shortbread."`,
  vocab: { lateral:"Sideways, not really up or down, not really better or worse" },
  companion: `I will note that she did not say 'if it's something.' Only 'if it's nothing.' That is your aunt's way of telling you she already thinks it's something.`,
  newPeople: ["Mr. Pips: postman, nervous, vibrates under normal conditions"],
  newClues: ["A package left at the post office before dawn, no return address"],
  choices: [
    { text: "Head to the post office", icon: "📮", next: "post_office" },
    { text: "Check the Field Journal first for anything about packages", icon: "📓", next: "check_journal" },
  ],
},

check_journal: {
  mood: "warm",
  text: `You pulled the Field Journal off its shelf and flipped to the index Viola had taught you. She kept a running list of **anomaly** types in the back, cross-referenced by date. You scanned the entries: bells, feathers, missing animals, temperature drops, mist patterns. Nothing about mysterious packages.

But something caught your eye. An entry from 1963, the year after Thornwick disappeared. In Helena's handwriting: **"Received a letter. No return address. Contained a pressed flower from a garden that no longer exists. Showed it to the Wardens. Silvia said: 'Someone remembers.' Destroyed the flower. Regret this."**

That was all. No follow-up. No explanation of why she destroyed it or why she regretted doing so.

Hemlock, reading over your shoulder (a thing he did without apology), made a small sound. "Helena destroyed it," he said, quietly. "I remember. She was afraid that **anything** from Thornwick, even a flower, might be a thread. A thread that could be pulled."

He was not being dry. He was not being sarcastic. This was Hemlock being careful with something that mattered.

"Post office," he said. "Now."`,
  vocab: { anomaly:"Something that doesn't fit the normal pattern" },
  companion: `Helena was not someone who regretted things easily. If she wrote 'regret,' she meant it kept her up at night.`,
  newClues: ["Helena received a similar package in 1963: a pressed flower from Thornwick", "She destroyed it because she feared anything from Thornwick could be 'a thread'", "She regretted destroying it"],
  choices: [
    { text: "Go to the post office", icon: "📮", next: "post_office" },
  ],
},

post_office: {
  question: "She said 'For the Keeper' and left crying. If she wanted to destroy the town, would she warn the one person who could stop her?",
  mood: "warm",
  illustration: `<svg viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg" style="max-width:250px">
  <g fill="none" stroke="#2C1810" stroke-width="1" stroke-linecap="round">
    <!-- paper edges -->
    <rect x="50" y="15" width="180" height="140" rx="1" stroke-width="1.5"/>
    <!-- fold lines -->
    <line x1="140" y1="15" x2="140" y2="155" stroke="#8B7355" stroke-width=".5" stroke-dasharray="4 3" opacity=".4"/>
    <line x1="50" y1="85" x2="230" y2="85" stroke="#8B7355" stroke-width=".5" stroke-dasharray="4 3" opacity=".4"/>
    <!-- streets -->
    <line x1="70" y1="50" x2="210" y2="50" stroke="#5C4033" stroke-width=".8"/>
    <line x1="70" y1="70" x2="210" y2="70" stroke="#5C4033" stroke-width=".8"/>
    <line x1="70" y1="100" x2="210" y2="100" stroke="#5C4033" stroke-width=".8"/>
    <line x1="90" y1="35" x2="90" y2="130" stroke="#5C4033" stroke-width=".8"/>
    <line x1="130" y1="35" x2="130" y2="130" stroke="#5C4033" stroke-width=".8"/>
    <line x1="170" y1="35" x2="170" y2="130" stroke="#5C4033" stroke-width=".8"/>
    <!-- tiny buildings -->
    <rect x="95" y="53" width="12" height="8" stroke="#8B7355" stroke-width=".6"/>
    <rect x="135" y="53" width="10" height="8" stroke="#8B7355" stroke-width=".6"/>
    <rect x="95" y="73" width="15" height="10" stroke="#8B7355" stroke-width=".6"/>
    <rect x="175" y="53" width="12" height="8" stroke="#8B7355" stroke-width=".6"/>
    <rect x="135" y="103" width="14" height="10" stroke="#8B7355" stroke-width=".6"/>
    <!-- church with crooked steeple -->
    <rect x="175" y="73" width="14" height="12" stroke="#2C1810" stroke-width=".8"/>
    <line x1="182" y1="73" x2="184" y2="63" stroke="#2C1810" stroke-width=".8"/>
    <!-- fountain in park -->
    <circle cx="110" cy="115" r="6" stroke="#5C4033" stroke-width=".6"/>
    <circle cx="110" cy="115" r="2" fill="#5C4033" opacity=".3"/>
    <!-- title -->
    <text x="140" y="30" font-family="'Alegreya',serif" font-size="9" fill="#2C1810" text-anchor="middle" font-weight="700" font-style="italic">THORNWICK</text>
    <!-- note -->
    <text x="140" y="148" font-family="'Alegreya',serif" font-size="7" fill="#8B7355" text-anchor="middle" font-style="italic">As I remember it</text>
  </g>
</svg>`,
  text: `Mr. Pips was standing behind the counter in a state of **advanced** agitation, which for Pips meant his whiskers were vibrating at a frequency that could probably pick up radio signals.

"Oh thank GOODNESS," he said when you walked in. "Viola's niece. Good. Excellent. Take it. Please take it. It has been sitting on my counter since five-thirty this morning and it is making me DEEPLY **uncomfortable**."

The package was a flat, rectangular bundle wrapped in brown paper and tied with kitchen string. No address. No stamps. No name. Just the paper and the string and, when you picked it up, a weight that felt like a single sheet of heavy paper.

"Who left it?" you asked.

Pips wrung his paws. "An old woman. I've never seen her before. She came in just as I was opening. She was small. Bent. She had hands that shook. She set it on the counter and said, 'For the Keeper.' Just that. Then she walked out. She was **crying**, {NAME}. Silently. Like someone who has been crying for a very long time and has gotten quiet about it."

You unwrapped the package. Inside was a hand-drawn map. The ink was fresh. The detail was extraordinary: streets, houses, a school, a park with a fountain, a church with a crooked steeple. Every building labeled in small, careful handwriting. At the top, in letters that trembled slightly: **THORNWICK. As I remember it.**

And at the bottom, folded into the corner: a note. Two words. **"I remember."**

Hemlock landed on the counter. He looked at the map. He did not speak. You had never, in three weeks, seen Hemlock not have something to say.`,
  vocab: { advanced:"At a high level, very developed", uncomfortable:"Uneasy, not at ease, wanting something to stop" },
  companion: null,
  newPeople: ["An old woman: small, bent, shaking hands, silent tears"],
  newClues: ["A hand-drawn map of Thornwick, labeled 'As I remember it'", "A note: 'I remember'", "Left by an old woman who said 'For the Keeper' and was crying silently"],
  choices: [
    { text: "Take the map straight to Viola", icon: "🏠", next: "viola_reacts" },
    { text: "Ask Pips to describe the woman in more detail", icon: "🔍", next: "pips_details" },
  ],
},

pips_details: {
  mood: "warm",
  text: `"Tell me everything," you said. "Everything you noticed."

Pips took a breath. For once, the nervous energy focused into something useful. "Old. Very old. Eighties, maybe ninety. Small. She walked with a cane but she didn't lean on it, she gripped it. Her coat was brown. Good quality but old, the kind of old where the fabric has gone soft from being worn for decades. Her shoes were polished. That stuck with me. Very **deliberately** polished, like she had a reason to look presentable today."

He paused. "She smelled like lavender and old paper. Library smell. And her hands, when she set the package down, they shook, but her voice didn't. Her voice was steady. 'For the Keeper.' That's all she said. She didn't ask who the Keeper was. She already knew."

Hemlock, from the counter, finally spoke. Quietly. "What color were her eyes?"

Pips blinked. "Blue. Very pale blue. Almost gray."

Hemlock closed his own eyes. Just for a second. When he opened them, he said: "Her name is Edith Thorne. She was seven years old when Thornwick was **erased**. She was sleeping at a friend's house in Hollowmist the night it happened. She went home the next morning and there was no home to go to."

He looked at the map. "She has been remembering for sixty-two years. And now she has sent us a message."`,
  vocab: { deliberately:"On purpose, with careful thought", erased:"Completely removed, as if it never existed" },
  companion: `I know her name because Helena wrote about her in the journal. Once. A single line: 'The Thorne girl will not forget. I do not know if this is a blessing or a tragedy.' Helena was rarely unsure about anything.`,
  newPeople: ["Edith Thorne: 7 years old when Thornwick disappeared, now in her late 60s"],
  newClues: ["Edith Thorne survived because she was sleeping at a friend's house the night Thornwick vanished", "She has been remembering Thornwick for 62 years", "Hemlock recognizes her name from the journal"],
  choices: [
    { text: "Take everything to Viola", icon: "🏠", next: "viola_reacts" },
    { text: "Try to find Edith yourself first", icon: "🔍", next: "find_edith_early" },
  ],
},

find_edith_early: {
  mood: "forest",
  text: `"Where does she live?" you asked Pips.

"I don't know! She doesn't receive mail! She doesn't EXIST in my records!" Pips was back to vibrating. "But there's an old cottage at the end of Lantern Road that has had its chimney smoking for the past few weeks. Nobody has lived there in years. I deliver to every house on that road and I have never delivered to that one, and now someone is burning firewood in it, and I have been DELIBERATELY not thinking about it because thinking about it makes my whiskers hurt."

Hemlock was already at the door. "Lantern Road," he said. "I know the cottage. I have been watching the smoke and assuming it was **squatters**. I was wrong, and I do not enjoy being wrong."

You looked at the map in your hands. The ink was fresh. The detail was extraordinary. Someone had drawn this from memory alone, sixty-two years after the original was gone. Every street. Every window. Every tree.

Whatever Edith Thorne wanted, she wanted it badly enough to walk into a post office and cry while asking for it.`,
  vocab: { squatters:"People who move into an empty building without permission" },
  companion: `We could go to Viola first. That is the responsible choice. Or we could go to Lantern Road and see what we're dealing with before your aunt starts worrying. I leave the decision to you. Both have consequences.`,
  newPlaces: ["Lantern Road: an old cottage with smoke where there shouldn't be"],
  newClues: ["Someone has been living in an abandoned cottage on Lantern Road"],
  choices: [
    { text: "Go to the cottage on Lantern Road", icon: "🏚️", next: "edith_cottage" },
    { text: "Tell Viola first, then go together", icon: "🏠", next: "viola_reacts" },
  ],
},

viola_reacts: {
  mood: "warm",
  text: `You spread the map on Viola's kitchen table. She put on her glasses. She leaned in. She was quiet for a very long time.

Then she sat down heavily, which was something Viola never did. Viola stood. Viola paced. Viola did not sit down like the chair was the only thing keeping her upright.

"Thornwick," she said. Her voice was flat. "Someone has drawn Thornwick from **memory**." She traced one finger along a street on the map. "Birch Lane. The school was here. The fountain was here. The church with the crooked steeple." Her finger stopped. "This house. Right here. This was the Thorne house."

She looked up at you. "How much do you know about Thornwick, {NAME}?"

"A town that was erased," you said. "In 1962. By a Mistwalker."

"By a Mistwalker that Helena stopped, at great personal cost." Viola took off her glasses and cleaned them, which was what she did when she needed her hands to be doing something. "Thornwick was consumed. The people, the buildings, the memories. Everything except the road and the sign. And one child. A girl named Edith Thorne, who was seven years old and staying with a friend in Hollowmist the night it happened."

She looked at the note. **I remember.** "I have been waiting for this," she said quietly. "For sixty years, I have been waiting to find out whether Edith Thorne would come back. Because someone who remembers a place that was erased is either the bravest person you will ever meet, or the most **dangerous**. And I do not yet know which."`,
  vocab: { memory:"The ability to recall things that happened in the past", dangerous:"Capable of causing harm, even if not meaning to" },
  companion: `Your aunt sat down. She never sits down. That map did something to her that Blackthorn did not.`,
  newClues: ["Viola recognizes every street on the map from records", "Edith was the only survivor because she was away the night Thornwick fell", "Viola has been waiting 60 years to see if Edith would come back"],
  choices: [
    { text: "Ask Viola what Edith might want", icon: "❓", next: "what_wants" },
    { text: "Go find Edith now, before she does anything", icon: "🏚️", next: "edith_cottage" },
  ],
},

what_wants: {
  mood: "tense",
  text: `"What does she want?" you asked.

Viola stared at the map. "What would you want, {NAME}, if your whole world was taken from you when you were seven years old, and everyone told you to forget it, and you could NOT forget it, and you spent sixty years carrying a town inside your head that nobody else even believed existed?"

She didn't wait for you to answer. "She wants it back. She wants Thornwick back. And the terrible thing, the truly terrible thing, is that she might know how to do it."

Hemlock, from the windowsill, spoke carefully. "The seal works in both directions. What was taken can **theoretically** be returned. But pulling Thornwick back means pulling back whatever ate it. You cannot separate the food from the mouth."

"Hemlock," Viola said sharply.

"She needs to hear this. If Edith Thorne has found a way to reverse the erasure, she has also found a way to reopen the wound. And a wound that was closed sixty years ago does not open neatly." He looked at you. "The last time a Mistwalker came through, things disappeared. Street names. Mailboxes. If someone **deliberately** opens the seal, what comes through will not stop at mailboxes."

Viola stood up. "We need to find her before she does anything. {NAME}, she left that map at the post office. She told Pips it was for the Keeper. That means she wants to be found. She's asking for help, or she's asking for permission, or she's **warning** us. I need to know which."`,
  vocab: { theoretically:"In theory, meaning it could work in idea but maybe not in practice", warning:"A message about danger that hasn't happened yet" },
  companion: `She sent the map TO us. That matters. A person who wanted to destroy the town wouldn't announce it. She is reaching out. The question is what she is reaching for.`,
  newClues: ["Pulling Thornwick back means pulling back what ate it", "Opening the seal deliberately would be worse than a Mistwalker break-in", "Edith sent the map TO the Keeper, which means she wants contact, not secrecy"],
  choices: [
    { text: "Go find Edith at the cottage on Lantern Road", icon: "🏚️", next: "edith_cottage" },
  ],
},

edith_cottage: {
  mood: "eerie",
  text: `The cottage at the end of Lantern Road was small and old and looked like it had been holding its breath for decades. The garden had given up on being a garden and was now just a collection of things growing where they pleased. The fence leaned. The paint on the front door had peeled so far back it looked like the wood underneath was trying to shed its own skin.

But the chimney was smoking. Fresh smoke, warm and steady, the kind that comes from a fire that someone is sitting beside. And through the window, you could see the yellow glow of a lamp, the kind of glow that turns a cold room into a place where a person is choosing to stay.

Hemlock landed on the gate. He looked at the cottage. He looked at you. This was the moment when he would normally say something dry and pointed, a comment about the garden or the structural integrity of the fence or the questionable life choices of people who live at the ends of roads. He didn't. He said nothing.

That told you more than any of his best sentences ever had.`,
  companion: `Be kind. Whatever she is, she has been carrying this for longer than you have been alive.`,
  newPlaces: ["Edith's cottage: end of Lantern Road, small, old, lamp burning"],
  choices: [
    { text: "Knock on the front door", icon: "🚪", next: "meet_edith" },
    { text: "Look through the window first", icon: "👁️", next: "peek_window" },
  ],
},

peek_window: {
  mood: "eerie",
  illustrationImg: "/illustrations/c2_wall.jpg",
  
  text: `You crept around the side of the cottage and looked through the window.

The room inside was small and warm. A fire in the grate. An old armchair. A cup of tea on a side table, still steaming. And every wall, every **surface**, was covered in drawings.

Maps. Dozens of them. All of the same town, drawn from slightly different angles, slightly different levels of detail, as if the person drawing them was trying to get it exactly right from memory and kept starting over. Some were rough sketches. Some were beautiful, detailed works that must have taken days. All of them were labeled THORNWICK.

Between the maps: photographs. Old, faded, curling at the edges. A family in front of a house. A boy on a bicycle. A woman hanging laundry. A dog sleeping in a garden. People who no longer existed in a place that no longer existed, pinned to a wall like **evidence** in a case that had been open for sixty years.

And sitting in the armchair, staring at the fire with pale blue eyes: an old woman. Small. Bent. Her hands were folded in her lap and they were shaking, very slightly, like a motor that never quite turned off.

She spoke without looking toward the window. "You might as well come in, child. The door is unlocked. I left the map for you."`,
  vocab: { surface:"The outside or top layer of something", evidence:"Clues or proof that help show what happened" },
  companion: `She knew you were there. She probably knew before you arrived. Come in. Gently.`,
  newClues: ["Edith's walls are covered in dozens of maps of Thornwick, drawn from memory", "Family photographs of people who no longer exist", "She knew you were coming"],
  choices: [
    { text: "Go inside", icon: "🚪", next: "meet_edith" },
  ],
},

meet_edith: {
  mood: "warm",
  text: `The door was unlocked.

Edith Thorne was smaller than you expected. She sat in an old armchair near the fire, wrapped in a brown cardigan that had been washed so many times it looked like it was made of clouds. Her hair was white. Her eyes were very pale blue, almost the color of the mist itself. She looked at you, and her face did something complicated: surprise, then recognition, then a sadness so deep it had gone quiet.

"You look like Helena," she said. "Around the eyes. She had that same way of looking at things. Like she was already deciding what to do about them."

On the walls around her: maps. Dozens of them. All Thornwick. All drawn from memory. Some rough, some beautiful. Between them, old photographs of people and places that no longer existed.

"Sit down, {NAME}," she said. She knew your name. Of course she did. "I will tell you what I want, and you will tell me whether it is possible. I have been waiting sixty-two years for someone to ask." She picked up her tea. Her hands shook. The cup did not spill. She had gotten very good at shaking without spilling.

"I was seven," she said. "My parents sent me to sleep at a friend's house in Hollowmist for the night. A treat, they said. A special **occasion**. When I walked home the next morning, there was no home. There was a road. There was a sign. And where my town had been, there was mist. I walked into it. I walked for what felt like an hour. I came out on the same road, facing the same sign. There was nothing inside. Nothing except the feeling that something was watching me walk."

She set down the tea. "I am going to bring Thornwick back, {NAME}. I know how. The question is whether your aunt will let me."`,
  vocab: { occasion:"A special event or reason for something" },
  companion: null,
  newPeople: ["Edith Thorne: small, white-haired, pale eyes, has been remembering for 62 years"],
  newClues: ["Edith walked into the mist where Thornwick was and found nothing inside", "She says she knows how to bring Thornwick back", "She wants the Keeper's permission"],
  choices: [
    { text: "Ask her how", icon: "❓", next: "edith_plan" },
    { text: "Ask her why she waited so long", icon: "⏳", next: "why_waited" },
  ],
},

why_waited: {
  mood: "warm",
  text: `"Why now?" you asked. "After sixty-two years. Why now?"

Edith looked at the fire. "Because I am running out of time," she said simply. "I am eighty-nine years old. My hands shake. My eyes are not what they were. I can still draw the map, but I can feel the details starting to blur at the edges. My brother's face. I used to see it perfectly. Now I have to look at the photograph to remember exactly." She gestured at the wall. "Every year, a little more fades. And when I am gone, no one will remember Thornwick at all. Not a single person on this earth will know that my mother had a garden with **hollyhocks** by the fence, or that my brother could whistle any song after hearing it once, or that our dog was named Captain and he was afraid of butterflies."

She turned back to you. "I am not asking your aunt to open a door. I am asking her to help me save a memory before the last person who carries it is gone."

Hemlock, from the windowsill, was very still. You had never heard him be this quiet for this long.`,
  vocab: { hollyhocks:"Tall flowers with big, bright blooms that grow along fences and walls" },
  companion: `She is not a villain. She is a woman with a very good reason and a very bad plan. Those are the hardest ones to stop.`,
  newClues: ["Edith is 89 and feels her memories of Thornwick fading", "When she dies, no one will remember Thornwick existed at all", "She sees this as saving a memory, not opening a door"],
  choices: [
    { text: "Ask her how she plans to do it", icon: "❓", next: "edith_plan" },
  ],
},

edith_plan: {
  question: "Edith says 90 seconds is enough. Agnes says 90 seconds is actually 6 hours. Who do you believe, and why?",
  mood: "tense",
  text: `Edith stood up slowly and crossed the room to a desk covered in papers. She pulled out a diagram. It was hand-drawn, precise, and labeled in the same careful handwriting as the map.

"The bell," she said. "The Hollowmist bell is not just a counter. It is a **mechanism**. Twelve rings seal the thin place shut for the night. Thirteen opens it, as your friend Blackthorn demonstrated. But there is a fourteenth ring, one that Helena's journal mentions only once. Fourteen is a **reversal**. It pulls back what was taken. The town. The people. Everything."

She traced the diagram with a shaking finger. "I have spent forty years researching this. I built a device that can force the bell to ring fourteen. I know the exact minute of the exact night it must be done. I know the words that must be spoken. I have everything I need."

She looked at you. "Except permission. Because the fourteenth ring will open the seal completely for approximately ninety seconds. During those ninety seconds, anything on the other side can come through. Including whatever ate Thornwick in the first place."

Her voice was steady. "I believe the risk is worth it. Your aunt will not. That is why I am talking to you and not to her."

Hemlock spoke from the window. His voice was flat. "You are asking a child to **overrule** the Keeper."

"I am asking a child to listen," Edith said. "Because in my experience, children are better at listening than adults who have already decided."`,
  vocab: { mechanism:"A system of parts that work together to do something", reversal:"The act of turning something backward or undoing it", overrule:"To reject someone else's decision and choose differently" },
  companion: `She is telling you this because she knows Viola will say no. She is hoping you will say yes. And she is not wrong that the bell can do what she says. She is wrong about the ninety seconds.`,
  newClues: ["A 14th bell ring could reverse the erasure and pull Thornwick back", "It would open the seal for 90 seconds", "Edith has built a device to force the bell to ring 14", "She wants the kid's support because she knows Viola will refuse"],
  choices: [
    { text: "Tell Viola everything, right now", icon: "🏠", next: "tell_viola" },
    { text: "Visit the crow Warden to ask if this is even possible", icon: "🐦", next: "meet_crow" },
  ],
},

meet_crow: {
  question: "Agnes is cranky and rude, but she's also the oldest creature in town. How do you weigh what someone says against how they say it?",
  mood: "warm",
  illustrationImg: "/illustrations/c2_agnes.jpg",
  
  text: `The old schoolhouse was at the north end of town, boarded up and covered in ivy. The crow lived in the chimney. She had lived there for, as she put it, "longer than the school was a school and I will be here after the bricks forget what a school is."

Her name was Agnes. She was the crankiest creature you had ever met.

"A FOURTEENTH ring," she said, from the chimney top, looking down at you with one yellow eye. "Oh, wonderful. WONDERFUL. Another human with a clever idea and no understanding of **consequences**. The last one tried it in 1847 and blew the chimney off the church. The one before that turned the river backward for six hours. Do you know what a backward river does to the fish? They were VERY confused."

"Could it work, though?" you asked. "Could it bring Thornwick back?"

Agnes was quiet for three seconds, which was an eternity for a creature who usually filled silences with complaints. "Yes," she said. "In theory. The fourteenth ring reverses the erasure. But it also opens the seal, and what the girl is not telling you, or does not know, is that ninety seconds is not ninety seconds on the other side. Time moves differently there. Ninety seconds here is approximately six HOURS there. Do you know what can walk through a door in six hours? EVERYTHING. Everything can walk through a door in six hours."

She ruffled her feathers **indignantly**. "Also, I was not consulted. I am a WARDEN. I hold a third of this seal. And nobody thought to ask the CROW."`,
  vocab: { consequences:"The results of an action, especially bad results", indignantly:"In an offended, annoyed way because you think something is unfair" },
  companion: `Agnes is cranky, rude, and impossible. She is also the oldest living creature in this town, and when she says six hours, she is not exaggerating.`,
  newPeople: ["Agnes the Crow: third Warden, cranky, lives in the schoolhouse chimney, not consulted"],
  newPlaces: ["The old schoolhouse: boarded up, ivy-covered, Agnes's chimney"],
  newClues: ["Agnes confirms the 14th ring could theoretically reverse the erasure", "90 seconds here = 6 hours on the other side of the seal", "Anything could come through in that time"],
  choices: [
    { text: "Take this back to Viola", icon: "🏠", next: "tell_viola" },
    { text: "Ask Agnes if there's a safer way", icon: "❓", next: "agnes_idea" },
  ],
},

agnes_idea: {
  mood: "warm",
  text: `"Is there another way?" you asked. "A way to save what Edith remembers without opening the seal?"

Agnes cocked her head. Both eyes now. She was looking at you the way Hemlock sometimes did: **reassessing**.

"You are asking the right question," she said, grudgingly. "Most humans ask 'can I do the thing?' You are asking 'should I do the thing, and if not, is there a different thing?' That is rarer than you would expect."

She shifted on the chimney top. "The Keeper's journal is not just a book. It is an **artifact**. What is written in it persists. Not as memory, which fades. Not as stone, which crumbles. As record. Permanent. If the old woman were to sit down with the journal and write everything she remembers, Thornwick, every street, every name, every hollyhock, it would be preserved in a way that outlasts human memory. It would exist as long as the journal exists. And the journal has existed for four hundred years."

She fluffed her feathers. "This is not the same as bringing the town back. I want to be clear about that. The people are gone. The houses are gone. But the memory of them, written in the Keeper's journal, would be **permanent**. Protected. Real, in a way that a drawing on a wall is not."

She looked down at you. "Whether that is enough for Edith Thorne is not a question I can answer. But it is a question worth asking."`,
  vocab: { reassessing:"Looking at something again and changing your mind about it", artifact:"An object of special power or historical importance", permanent:"Lasting forever, not temporary" },
  companion: `Agnes just offered something Edith may not have considered. The journal is not a notebook. What is written in it does not fade, does not burn, does not forget. That is a real offer. Whether it is enough is the question.`,
  newClues: ["The Field Journal is an artifact: what's written in it persists permanently", "Edith could write her memories of Thornwick into the journal", "It's not the same as bringing the town back, but it preserves the memory forever"],
  choices: [
    { text: "Go tell Viola all of this", icon: "🏠", next: "tell_viola" },
  ],
},

tell_viola: {
  question: "Viola says a written record isn't a mother. Edith wants her family back. Is there a middle ground, or are these two things that can't meet?",
  mood: "warm",
  text: `You laid it all out on the kitchen table. The map. Edith's plan. The fourteenth ring. The ninety seconds that were actually six hours. Agnes's idea about the journal. Everything.

Viola listened the way she always did: completely still, eyes on you, not interrupting. When you finished, she stood up and walked to the window and looked out at the garden for a long time.

"I have known about Edith Thorne for most of my life," she said. "Helena told me about her. A girl who could not forget. Helena wanted to help her. She could not figure out how without risking the seal. She died carrying that **failure**."

She turned back. "The fourteenth ring is real. It would work. And it would destroy this town and possibly several others. Edith knows the risk, and she has decided her town is worth it. I understand why. I do not agree."

She sat down across from you. "But you said Agnes offered something. The journal."

"Yes."

Viola was quiet. Then: "That is not nothing, {NAME}. That is, in fact, a great deal. The journal is the most **durable** thing I own. More durable than this house. More durable than me. If Edith were to write Thornwick into the journal, it would outlast every building in Hollowmist." She paused. "The question is whether that is enough for a woman who wants her family back. A written record is not a mother. A map is not a home."

She looked at you. "I think you need to go back to Edith. And I think you need to go alone. Not because I am not willing to face her, but because she reached out to YOU. She sent the map for the Keeper, but she is talking to you. And I think," Viola said carefully, "that you might be the only person she will listen to."`,
  vocab: { failure:"Not being able to do something you tried to do", durable:"Able to last a long time without breaking down" },
  companion: `Your aunt is sending you to do the hardest thing a person can do: change someone's mind about something they have spent their whole life deciding. Good luck. I mean that.`,
  newClues: ["Viola confirms the 14th ring would work but would devastate Hollowmist", "Helena wanted to help Edith and couldn't, and died carrying that failure", "Viola believes you are the only one Edith will listen to"],
  choices: [
    { text: "Go back to Edith's cottage", icon: "🏚️", next: "return_edith" },
  ],
},

return_edith: {
  question: "You're about to try to change the mind of someone who has spent 62 years deciding. What matters more: what you say, or how you say it?",
  mood: "tense",
  text: `The walk to Lantern Road was longer the second time. Not because the distance had changed. Because you were carrying something heavy, and it wasn't the iron nail in your pocket.

The cottage was the same. Lamp burning. Chimney smoking. But the door was open this time, and Edith was standing in the garden, looking up at the sky. She turned when she heard your footsteps.

"You've been to see the crow," she said. Not a question. "And you've told your aunt."

"Yes."

"And your aunt said no."

"She said the fourteenth ring would **work**. She also said it would destroy Hollowmist."

Edith nodded slowly. "She's right. It would risk Hollowmist. I am not **pretending** otherwise. I have spent forty years understanding exactly what I am asking for. I know the cost." She looked at you with those pale eyes. "But you haven't told me what YOU think, {NAME}. You've told me what the crow thinks. What your aunt thinks. Not what you think."

Behind you, Hemlock landed on the garden fence. Quiet. Waiting.

This was the moment. Edith was going to do this tonight if you didn't find the right words. The device was built. The research was done. She had nothing left to wait for except a reason to stop.

You had to give her one.`,
  vocab: { work:"Function successfully, accomplish what it's designed to do", pretending:"Acting as if something is true when it isn't" },
  companion: null,
  choices: [
    { text: "Tell her the truth about the cost", icon: "💭", next: "appeal_logic", highStakes: true },
    { text: "Tell her what her family would want", icon: "❤️", next: "appeal_heart", highStakes: true },
    { text: "Offer her the journal", icon: "📓", next: "offer_journal", highStakes: true },
  ],
},

appeal_logic: {
  mood: "tense",
  text: `"It wouldn't be Thornwick," you said.

Edith's expression shifted. Not anger. Attention.

"The crow told me," you continued. "Ninety seconds here is six hours on the other side. Whatever ate your town has been sitting in that mist for sixty years. It's not going to come back and then politely leave. And the town that comes back, if it comes back, it won't be the town you remember. It'll be a town that was swallowed by something horrible and spent sixty years inside it."

You were talking fast now, because the logic was clicking into place the way it did when you were working through a problem. "Your mother's garden won't have hollyhocks. Your brother won't be able to whistle. Captain won't be afraid of butterflies. Because the thing that took them changed them. You'd get Thornwick back, but it wouldn't be YOUR Thornwick. It would be a **copy** made by the thing that ate the original."

Edith's hands were shaking harder now. She gripped the garden fence.

"And then you'd lose it again," you said, quieter. "Because we'd have to stop whatever came through. We'd have to reseal it. And Thornwick would go back into the mist, and this time you'd know exactly what was in there with it."

The silence that followed was the kind of silence that happens when someone's world rearranges itself. Edith's pale eyes were bright. Not with anger. With the terrible clarity of someone seeing a truth they had been looking away from for a very long time.

"A copy," she whispered. "Not my town. A copy."`,
  vocab: { copy:"A reproduction of something, not the original" },
  companion: `That was hard. That was the right thing. Both of those are true at the same time.`,
  choices: [
    { text: "Offer her something real", icon: "📓", next: "offer_after" },
  ],
},

appeal_heart: {
  mood: "tense",
  text: `"What would your mother think?" you said.

Edith went very still.

"If she could see you right now," you said, and your voice was shaking a little but you kept going, "standing in a garden, about to risk a whole town to bring her back. Would she want that? Would she want Hollowmist, Mrs. Puddleford and Mr. Pips and the baker and the kids who play in the square, would she want all of them to pay the price for her coming back?"

Edith's hand tightened on the fence. Her knuckles went white.

"You knew her," you said. "I didn't. But you told me she had a garden with hollyhocks by the fence. People who grow gardens don't want other people's gardens to die so theirs can live. That's not how it works. That's not who she was. You KNOW that's not who she was."

Edith's face crumpled. Not all at once. Slowly, the way a wall crumbles when the last brick is pulled. She let go of the fence and put both hands over her face and she cried. Not silently this time. Out loud. The kind of crying that sounds like it has been **waiting** for decades.

You stood there. You did not look away. You owed her that.

After a long time, she lowered her hands. Her face was wet and her eyes were red and she looked, for the first time since you had met her, like she was not carrying the full weight of a lost town on her shoulders.

"She would be so angry with me," Edith whispered. "She would be **furious**."`,
  vocab: { waiting:"Being held back for a long time before finally happening" },
  companion: null,
  choices: [
    { text: "Offer her something real", icon: "📓", next: "offer_after" },
  ],
},

offer_journal: {
  mood: "relief",
  text: `"I have an idea," you said. "The crow told me about it, and I think it might be what you actually need."

Edith watched you. Waiting.

"The Field Journal isn't a regular notebook," you said. "It's an **artifact**. What gets written in it doesn't fade. Doesn't burn. Doesn't get lost. It lasts as long as the journal lasts, and the journal has lasted four hundred years. If you wrote Thornwick into it, every street, every house, every person, every garden, every dog named Captain who was afraid of butterflies, it would be there. Permanently. For every Keeper who comes after us."

Edith didn't speak.

"It's not the same as bringing it back," you said. "I know that. A written record isn't your mother. A map isn't a home. But Thornwick wouldn't be forgotten. Ever. By anyone. For as long as Hollowmist stands, your town stands inside the journal. Your family has **names**. Your street has a place. Captain gets to be afraid of butterflies forever."

The silence lasted a long time. Edith was looking at the drawings on her walls. The dozens of maps. The photographs. The sixty-two years of trying to hold a whole town inside her head.

"You are offering me a place to put it down," she said. Her voice was barely a whisper. "You are offering me a place to set this DOWN."

"Yes," you said.

Edith Thorne closed her eyes. Two tears ran down her face. She did not wipe them away.

"I have been so tired, {NAME}," she said. "I have been so tired of being the only one who remembers."`,
  vocab: { artifact:"An object with special, lasting importance or power", names:"What people are called, the most basic way they are remembered" },
  companion: `That is the answer. Not force. Not logic. A place to put it down. I did not expect that from someone your age. I did not expect it from someone any age.`,
  choices: [
    { text: "Walk her home to Viola and the journal", icon: "📓", next: "ending" },
  ],
},

offer_after: {
  mood: "relief",
  text: `"There's something else," you said. "Something the crow told me about. The Field Journal."

Edith looked up. Her eyes were red but she was listening.

"It's not a regular notebook. It's an **artifact**. What gets written in it lasts. Not like a book that can burn or a drawing that can fade. Permanently. Four hundred years permanently. If you wrote Thornwick into it, every street, every name, every hollyhock, it would be there for every Keeper who comes after us. Your town wouldn't be forgotten. Ever."

You took a breath. "It's not the same as bringing them back. I know. But Captain would be afraid of butterflies forever. In the record. In the journal. For as long as Hollowmist stands."

Edith was quiet for a long time. She looked at the maps on her walls. The photographs. The decades of work.

"A place to put it down," she said softly. "You are offering me a place to set all of this DOWN."

"Yes."

She closed her eyes. "I have been so tired," she whispered. "I have been so tired of being the only one who remembers."`,
  vocab: { artifact:"An object with special, lasting importance or power" },
  companion: `That was the right answer. Not the easy one. The right one.`,
  choices: [
    { text: "Walk her home to Viola and the journal", icon: "📓", next: "ending" },
  ],
},

ending: {
  mood: "relief",
  illustrationImg: "/illustrations/c2_edith_writing.jpg",
  
  text: `You walked Edith Thorne down Lantern Road and through the streets of Hollowmist as the sun set. She walked slowly. She held your arm. Her hands were still shaking, but her grip was steady.

Viola was waiting at the front door. She took one look at Edith and opened her arms, and Edith walked into them, and two old women stood in the doorway of a crooked house and held each other for a long time without speaking.

Inside, Viola made tea. She set the Field Journal on the kitchen table. She opened it to a blank page. She set a pen beside it.

"Take as long as you need," she said. "Start wherever you want. The journal will hold all of it."

Edith sat down. She picked up the pen. Her hand shook. Then it steadied. She began to write.

**Thornwick. A town on the other side of the mountain. My town. Founded in 1832. Population: 412, including one dog named Captain who was afraid of butterflies.**

She wrote for three hours. She filled nine pages. She drew a map in the center, the final version, steadier than any of the ones on her walls because this time she knew it would last. She wrote her parents' names. Her brother's name. The address of their house. The color of the front door. The hollyhocks by the fence. The crooked steeple of the church.

When she was done, she set down the pen and sat very still. Her face was wet. She was smiling.

"There," she said. "It's safe now."

Hemlock, from the windowsill, spoke for the first time in an hour. "Welcome to the journal, Thornwick," he said. And if a raven could sound gentle, he did.

Viola put her hand on Edith's shoulder. Then she looked at you, {NAME}, and her expression was something you had never seen on her face before. Not pride exactly. Something deeper. The look of someone who has watched a person do a thing they did not think anyone could do.

"Write your entry," she said, and pushed the journal across the table. "Below hers."

You picked up the pen. Beneath Edith Thorne's nine pages of Thornwick, you wrote:

**Case File No. 2: The Thornwick Map. Resolved without force. The memory is safe. — {NAME}, Keeper's Apprentice.**`,
  companion: `Not bad. For a second case.`,
  ending: true,
  endTitle: "The Memory Keeper",
  endEmoji: "📓",
  endMessage: "You saved a town by saving a memory. Edith Thorne visits Viola every Tuesday now. She brings lavender shortbread that Mrs. Puddleford says is 'aggressively good.' Agnes the crow still hasn't forgiven anyone for not consulting her sooner, and brings it up at every opportunity. And in the Field Journal, nine pages of Thornwick stand permanent, protected, and remembered. Captain is still afraid of butterflies. 📓🌸🦋",
},

};
