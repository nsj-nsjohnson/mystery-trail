/* ═══════════════════════════════════════════════════
   Case Registry
   Add new cases here. Each case lives in its own file
   and exports { meta, scenes }.
   ═══════════════════════════════════════════════════ */

import * as hollowmistBell from "./hollowmist_bell.js";

export const CASES = [
  hollowmistBell,

  // Placeholder entries for future cases.
  // Replace these with real imports as cases are written.
  {
    meta: {
      id: "placeholder_2",
      number: 2,
      title: "Case File No. 2",
      subtitle: "Coming soon",
      available: false,
      startScene: "start",
      estimatedMinutes: 20,
    },
    scenes: {},
  },
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
