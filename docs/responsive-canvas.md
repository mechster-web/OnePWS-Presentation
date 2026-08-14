# Responsive model: the fixed design canvas

## The problem this replaced

Scenes used to size themselves against the browser viewport, mixing `rem`
minimums with `vw`/`vh` fluid terms, e.g.:

```
grid-cols-[minmax(20rem,0.42fr)_minmax(0,1fr)_minmax(20rem,0.36fr)]
text-[clamp(3.1rem,4.6vw,6rem)]
```

Those two unit families do not move together. The stage was letterboxed to 16:9,
so its width was never the viewport width, and browser zoom shrinks the CSS
viewport without shrinking `rem`. Zoom in far enough and the `vw` terms bottom
out at their `rem` minimums while the stage keeps getting narrower — the rigid
`20rem` columns stop fitting, the middle column collapses to a few pixels, and
text stacks one character per line.

The same mismatch made a slide render differently on a phone, a laptop and a 4K
panel, because Tailwind's `md:`/`lg:` breakpoints were also keyed to the window.

## The model now

Every scene is authored against a **fixed 1920x1080 canvas**. That canvas is
scaled as a single unit to fit whatever room is available:

- `.pws-stage-frame` fills the available box and clips.
- `.presentation-stage` is exactly `1920px x 1080px` and carries
  `transform: translate(-50%, -50%) scale(var(--stage-scale))`.
- [`useStageScale`](../src/hooks/useStageScale.ts) computes the scale as
  `min(frameWidth / 1920, frameHeight / 1080)` and re-measures on resize,
  orientation change and visual-viewport change (which is what browser zoom
  moves).

Because the canvas keeps a constant **layout** size, every `rem`, `px` and
`clamp()` inside it resolves to the same value on every device. Only the outer
scale factor changes. A slide is therefore pixel-identical everywhere, just
larger or smaller.

## Rules for scene code

1. **Never use viewport units inside a scene.** `vw`/`vh`/`dvw`/`dvh` measure the
   browser window, which is not the canvas. Use the container units instead —
   `cqw`, `cqh`, `cqmin`, `cqmax` — which resolve against the stage
   (`container-name: stage`). On the canvas `1cqw = 19.2px` and `1cqh = 10.8px`,
   always.

2. **Width breakpoints are pinned on.** `tailwind.config.ts` maps every screen to
   `{ raw: "all" }`, because a 1920px-wide canvas satisfies all of them. So
   `md:`/`lg:`/`xl:` utilities always apply inside a scene — which is what makes
   the slide look the same everywhere.

3. **Narrow-layout fallbacks query the canvas, not the window.** Write
   `[@container_stage_(max-width:1023px)]:grid-cols-1` rather than
   `max-lg:grid-cols-1`. On today's canvas these never engage, which is correct;
   they would engage if the canvas aspect were ever changed.

4. **Check `clamp()` bounds.** `clamp(1.2rem, 0.88cqw, 1.05rem)` has its minimum
   above its maximum, so it silently pins to the minimum and throws the fluid
   term away. The audit script's sibling scan caught three of these.

## Code outside the canvas

The loading screen, the chapter-map overlay, the customer-path selector, the
presenter panel and the design-system showcase render outside the stage. They
have no size container, so they stay genuinely fluid: `clamp()` on real viewport
units and `repeat(auto-fit, minmax(...))` grids instead of breakpoints. The
chapter map, which needs real window queries, uses explicit
`[@media(max-width:1023px)]:` variants so it is unaffected by the pinned screens.

## Verifying a change

```
npm run dev
npm run audit:visual          # assert only
npm run audit:visual:shots    # assert and write screenshots to docs/visual-audit/
```

[`scripts/visual-audit.mjs`](../scripts/visual-audit.mjs) drives the locally
installed Chrome over every enabled chapter across 14 viewport/zoom combinations
(desktop at 80%-200% zoom, laptop, ultrawide, 4K, tablet and phone in both
orientations). For each render it fails on:

- the stage overflowing the viewport,
- the document scrolling,
- the canvas not measuring 1920x1080,
- any unclipped element escaping the canvas,
- any leaf text box narrower than ~2 characters yet several lines tall — the
  signature of the collapsed-column bug.

It reads the chapter list straight from `src/content/chapters.ts` rather than
walking the deck with the Next control, because the route a presenter takes
depends on the selected journey and under-reports chapters. It also runs with
`prefers-reduced-motion` emulated so measurements are not taken mid-animation.
