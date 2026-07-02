export const subjects = [
  "maths",
  "language",
  "science",
  "history",
  "coding",
  "economics",
];

/**
 * Per-subject theme — refined, gallery-grade accents that sit inside the
 * warm near-achromatic design system. Each subject has a soft `tint`
 * (always-light tile background, works in both color schemes) and a
 * saturated `ink` used for the glyph + accents. Kept intentionally
 * desaturated so nothing screams against the ember-orange brand.
 */
export const subjectsTheme = {
  science: { tint: "oklch(0.93 0.035 300)", ink: "oklch(0.52 0.16 300)" },
  maths: { tint: "oklch(0.945 0.045 80)", ink: "oklch(0.58 0.13 66)" },
  language: { tint: "oklch(0.93 0.035 240)", ink: "oklch(0.54 0.14 250)" },
  coding: { tint: "oklch(0.93 0.038 355)", ink: "oklch(0.56 0.17 355)" },
  history: { tint: "oklch(0.935 0.038 45)", ink: "oklch(0.55 0.14 40)" },
  economics: { tint: "oklch(0.93 0.032 160)", ink: "oklch(0.5 0.12 160)" },
} as const;

// Back-compat: single color per subject (the soft tint) used where a
// legacy `color` string is expected.
export const subjectsColors = {
  science: subjectsTheme.science.tint,
  maths: subjectsTheme.maths.tint,
  language: subjectsTheme.language.tint,
  coding: subjectsTheme.coding.tint,
  history: subjectsTheme.history.tint,
  economics: subjectsTheme.economics.tint,
};

export const voices = {
  male: { casual: "6MoEUz34rbRrmmyxgRm4", formal: "ByWUwXA3MMLREYmxtB32" },
  female: { casual: "FzV1qDk1i6MbsuwXpJ46", formal: "kPzsL2i3teMYv0FxEYQ6" },
  kid: {}
};

export const recentSessions = [
  {
    id: "1",
    subject: "science",
    name: "Neura the Brainy Explorer",
    topic: "Neural Network of the Brain",
    duration: 45,
    color: "#E5D0FF",
  },
  {
    id: "2",
    subject: "maths",
    name: "Countsy the Number Wizard",
    topic: "Derivatives & Integrals",
    duration: 30,
    color: "#FFDA6E",
  },
  {
    id: "3",
    subject: "language",
    name: "Verba the Vocabulary Builder",
    topic: "English Literature",
    duration: 30,
    color: "#BDE7FF",
  },
  {
    id: "4",
    subject: "coding",
    name: "Codey the Logic Hacker",
    topic: "Intro to If-Else Statements",
    duration: 45,
    color: "#FFC8E4",
  },
  {
    id: "5",
    subject: "history",
    name: "Memo, the Memory Keeper",
    topic: "World Wars: Causes & Consequences",
    duration: 15,
    color: "#FFECC8",
  },
  {
    id: "6",
    subject: "economics",
    name: "The Market Maestro",
    topic: "The Basics of Supply & Demand",
    duration: 10,
    color: "#C8FFDF",
  },
];
