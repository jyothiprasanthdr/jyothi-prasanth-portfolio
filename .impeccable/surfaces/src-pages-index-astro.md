---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

## Scope
Home route `/` of the portfolio. Visitor mode: Experience. `/notes`, `/notes/<slug>`, `/projects/<slug>`, `/resume` inherit this world in Read mode.

## Audience, job, action
Recruiters screening AI Engineer candidates (under a minute, laptop, daylight office); engineers checking depth. Action: Resume or Email me, one step from anywhere. Proof: 20 handwritten notebooks, public repos, build-time LeetCode/GitHub data. No employer system detail, no photo, no invented data.

## Direction contract
THESIS: The site is a notebook you run; every section is a cell and running it renders real output. Refuses the dark hero + project-card grid + terminal-accent portfolio.
OWN-WORLD: Light paper ground #F7F7F4, white cells, ink #1B1C1E, an 11-step neutral ramp, one signal yellow #F5C400 used only as the running/active chip with ink text inside. Geist Sans + Geist Mono. Execution counts, cell gutters, 1px rules, 4/8px radii, no shadows, depth by overlap.
STORY: The visitor sees who this is and the two actions, watches the page execute, then meets the handwritten notebooks as rendered output, public projects, experience as a table, real practice data, and a contact close.
FIRST VIEWPORT: 56px toolbar (wordmark jyothi-prasanth.ipynb left, Run all center, Resume + kernel status right); 200px contents rail left with the running chip on the current cell; cell [1] markdown in a 720px column with H1 name, one intro line, output area with Resume (primary) and Email me; cell [2] header visible at the fold with a pending count.
FORM: Jupyter notebook cell grammar, position 7 on the ordered list, seed key e4b85dee. Signature interaction: Run all cascade ([ ] → [*] → [n], outputs render), below-fold cells run on entering view, rail now-marker follows; keyboard command mode j/k, Shift+Enter, r, ?; keyboard moves never animate.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
Resume PDF missing (Resume action points to /resume page until supplied). Whether resume metrics stay public. Final project picks. Domain.
