/* ═══════════════════════════════════════════════════
   Case Registry
   Add new cases here. Each case exports { meta, scenes }.
   ═══════════════════════════════════════════════════ */

import * as hollowmistBell from "./hollowmist_bell.js";
import * as thornwickMap from "./thornwick_map.js";

export const CASES = [
  hollowmistBell,
  thornwickMap,
  {
    meta: {
      id: "placeholder_3",
      number: 3,
      title: "Case File No. 3",
      subtitle: "Coming soon",
      available: false,
      startScene: "start",
      estimatedMinutes: 20,
    },
    scenes: {},
  },
];

export function getCaseById(id) {
  return CASES.find((c) => c.meta.id === id);
}
