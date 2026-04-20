/* Case Registry — All 4 Cases */

import * as hollowmistBell from "./hollowmist_bell.js";
import * as thornwickMap from "./thornwick_map.js";
import * as theForgetting from "./the_forgetting.js";
import * as theMapThatMoves from "./the_map_that_moves.js";

export const CASES = [
  hollowmistBell,
  thornwickMap,
  theForgetting,
  theMapThatMoves,
];

export function getCaseById(id) {
  return CASES.find((c) => c.meta.id === id);
}
