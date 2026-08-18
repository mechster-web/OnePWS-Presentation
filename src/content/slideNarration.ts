/**
 * Section-by-section narration for guided slide walkthroughs.
 *
 * Each segment is one spoken beat: the player highlights the matching part of
 * the slide while its file plays, then moves on to the next segment. The audio
 * is produced from this same list by `npm run voiceover:segments`, so the text
 * here is the single source of truth for both the recording and the highlight.
 */
export type NarrationSegment = {
  /** Matches the highlight target in the scene. */
  id: string;
  /** Short label for the progress readout while the segment plays. */
  label: string;
  /** Spoken text, also sent to the text-to-speech generator. */
  text: string;
  /** Public path of the generated MP3. */
  file: string;
};

const philosophySegmentFile = (id: string) => `/assets/audio/en/segments/human-centred-philosophy/${id}.mp3`;

export const philosophyNarration: NarrationSegment[] = [
  {
    id: "headline",
    label: "People First",
    text: "People first, control room second. So the design of control rooms should be around the people who make the decisions.",
    file: philosophySegmentFile("headline"),
  },
  {
    id: "subheading",
    label: "Why it matters",
    text: "A control room should help operators think clearly, act quickly, and stay comfortable during long and critical operations.",
    file: philosophySegmentFile("subheading"),
  },
  {
    id: "operator",
    label: "Understand the User",
    text: "Design around the people who actually operate the room.",
    file: philosophySegmentFile("operator"),
  },
  {
    id: "task",
    label: "Support the Work",
    text: "Make every element help operators perform their tasks better.",
    file: philosophySegmentFile("task"),
  },
  {
    id: "information",
    label: "Simplify Information",
    text: "Present important information where it can be understood instantly.",
    file: philosophySegmentFile("information"),
  },
  {
    id: "team",
    label: "Enable Teamwork",
    text: "Create a space that supports fast communication and collaboration.",
    file: philosophySegmentFile("team"),
  },
  {
    id: "environment",
    label: "Build the Right Environment",
    text: "Use lighting, acoustics, space, and ergonomics to improve focus and performance.",
    file: philosophySegmentFile("environment"),
  },
  {
    id: "quote",
    label: "The room adapts",
    text: "The operator should never have to adapt to a poorly designed room. The room should adapt to the operator.",
    file: philosophySegmentFile("quote"),
  },
];

export const slideNarrationSets: Record<string, NarrationSegment[]> = {
  "human-centred-philosophy": philosophyNarration,
};

export function getSlideNarration(chapterId: string) {
  return slideNarrationSets[chapterId] ?? null;
}
