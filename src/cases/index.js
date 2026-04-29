/* Case Registry — All 6 Cases */

import * as hollowmistBell from "./hollowmist_bell.js";
import * as thornwickMap from "./thornwick_map.js";
import * as theForgetting from "./the_forgetting.js";
import * as theMapThatMoves from "./the_map_that_moves.js";
import * as theSilentWeek from "./the_silent_week.js";
import * as theNameInTheBell from "./the_name_in_the_bell.js";

export const CASES = [
  hollowmistBell,
  thornwickMap,
  theForgetting,
  theMapThatMoves,
  theSilentWeek,
  theNameInTheBell,
];

export function getCaseById(id) {
  return CASES.find((c) => c.meta.id === id);
}
