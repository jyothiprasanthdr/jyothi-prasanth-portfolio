# Portfolio Spec v4: The Run-All Notebook

Owner: Jyothi Prasanth D R
Status: **built.** Confirmed by the owner ("proceed") and implemented in Astro. The impeccable finish review verdict was *ship* for all review findings. The shipped design system is recorded in [DESIGN.md](DESIGN.md). Replaces v3, which featured employer case studies that are now ruled out.

**How this was produced.** The four skills installed in `.claude/skills/` drove it, each for a different job:

- **impeccable** (`pbakaus/impeccable`) ran the process. It interviewed you and wrote the facts to [PRODUCT.md](PRODUCT.md), rolled the visual direction (seed `e4b85dee`), and put the choice in front of you on its decision page, where you picked **The Run-All Notebook**. This document is impeccable's `shape` brief.
- **Emil Kowalski's skills** (`emilkowalski/skills`: emil-design-eng, animate, review-animations) govern motion and interaction polish (§7).
- **taste-skill** and **uupm** provide the anti-slop rules and the accessibility/UX floor (§8, §12).

Build path: **code-led**. No image generation is available here, so the ambition lives in the written first-viewport and signature-interaction contract below, not in a mockup image.

---

## 1. Job and audience

- **Primary visitor: a recruiter or hiring manager screening AI Engineer candidates,** on a laptop between applicant-tracking tabs, deciding in under a minute. They need to see role, location, availability, a working resume, and a way to make contact, plus one piece of proof that this person builds real AI systems.
- **Secondary visitor: an engineer or interviewer** checking depth before or after an interview. They open notebooks and repos.
- **Visitor mode (impeccable):** Experience. The work leads from the first viewport and the interface recedes. `/notes` and `/resume` are Read mode.

## 2. Outcome and proof

- **Success:** recruiters get Resume and Email in one action from anywhere; engineers find real work within one scroll.
- **The proof only you have:** 20 handwritten notebooks on transformers, RAG, LangGraph, PEFT, and MLOps. The site treats them as primary evidence, not an appendix (PRODUCT.md principle 3).
- **Supporting proof:** 2 or 3 public GitHub projects, real LeetCode/GitHub numbers fetched at build time, and resume-level experience.
- **Never shown (confirmed):** employer system detail of any kind, your photo, fabricated or random data, invented testimonials or metrics.

## 3. Selected direction: The Run-All Notebook

**Thesis.** The site is a notebook you run: every section is a cell, and running it renders real output. It rejects the category default, a dark hero with a project-card grid and terminal-green accents.

**Why this world.** Jupyter is the interface AI engineers work in every day, and its grammar is a real interface language:
- cells with execution counts;
- markdown and code cells;
- rendered outputs such as tables, plots, and images;
- a table-of-contents rail;
- a kernel status indicator;
- "Run all."

It also pairs with the handwritten notebooks, so the site is a notebook whose outputs include your notebooks. Recruiters don't need to know Jupyter to read it: every cell is plain headed prose with visible outputs.

**Raised by the declined challengers** (impeccable borrows one discipline from each direction it declines, never its look):

| Borrowed from | Discipline it adds |
|---|---|
| Drum-machine step row | One unbroken execution line with a "now" marker that follows the reader down the page. |
| Darkroom exposure record | An 11-step neutral ramp is the only tonal token set. The one accent means *running/active* and nothing else. |
| Cereal-box aisle | Every project has a front (the result) and a back (stack, repo, date). |
| Merz collage | One type family across a wide size range. Mono appears only where a notebook itself uses mono. |
| Memory quilt | Provenance on every item: date, source file, link. |
| Papercut | Depth comes from overlap only. No drop shadows; the active cell sits above its neighbours. |

### First viewport (the contract the build is reviewed against)

Desktop 1440×900, light ground:

- **Toolbar** across the top, 56px:
  - left: wordmark `jyothi-prasanth.ipynb`;
  - center: **Run all** (text button);
  - right: **Resume** (primary), then the kernel status "● Idle · open to AI Engineer roles".
- **Contents rail** on the left, 200px. It lists every cell as `[n] Title`. The current cell carries the running chip.
- **Cell [1]**, a markdown cell, fills the first viewport's reading column (max 720px):
  - H1 "Jyothi Prasanth D R";
  - one line: "AI engineer in the Bay Area. I build agent and retrieval systems, and I learn them by hand."
  - its **output area** holds the two actions, **Resume** and **Email me**, plus the location line.
- **Cell [2]** is visible below the fold line with its execution count still pending `[ ]`, which invites the scroll.

Nothing else is in the hero: no photo, no gradient, no particle field, no tagline row.

### Signature interaction: Run all

- **First visit, motion allowed:** cells execute top to bottom. Each cell's counter goes `[ ]` → `[*]` (yellow running chip) → `[n]`, then its output appears.
  - Above the fold this runs as a quick cascade.
  - Below the fold each cell runs as it enters the viewport. That is the now-marker, and the contents rail tracks it.
- **Return visits** (stored in `sessionStorage`), **reduced motion**, and **no-JS** all get the fully executed page instantly.
- Content is always in the HTML. Only the pre-run visual state is applied by script, before first paint, and only on the first visit.
- **Run all** in the toolbar replays the cascade on demand.

### Keyboard (command mode, as in Jupyter)

- `j` / `k` move between cells.
- `Shift+Enter` moves to the next cell.
- `r` opens the resume.
- `?` shows the shortcut list.

Keyboard moves never animate (Emil: never animate keyboard-initiated actions). Shortcuts are ignored while focus is in a text input.

### What about mouse tracking?

The earlier tilt and particle effects are dropped. They were decoration with no job. In this world, mouse tracking means **the active cell follows the pointer**, the way JupyterLab highlights the cell under your cursor:
- the gutter marker and the cell toolbar (copy link, collapse) appear on hover;
- hover is gated to `(hover: hover) and (pointer: fine)`, so touch devices don't get false hovers.

---

## 4. Information architecture and page layouts

| Route | What it is | Mode |
|---|---|---|
| `/` | The notebook (cells below) | Experience |
| `/notes` | Notebook library, laid out like JupyterLab's file browser | Read |
| `/notes/<slug>` | One notebook: page-thumbnail strip + PDF viewer | Read |
| `/projects/<slug>` | One public project, from its README | Read |
| `/resume` | HTML resume, print-perfect, with PDF download | Read |
| 404 | An error-output cell: "This page doesn't exist." + links home | – |

Cells on `/` in execution order. Each is a `<section>` with a real heading; the `[n]` counts are hidden from screen readers.

1. **[1] Intro (markdown).** As in the first viewport.
2. **[2] The notebooks (code cell + image output).** This is the page's centerpiece.
   - Input: the *real* line of this site's source that loads the collection, e.g. `const notes = await getCollection('notes')`.
   - Output: a shelf of notebook covers. Each cover is the first handwritten page, rendered from the PDF at build time. That makes them real images, not illustrations.
   - Shows the 6 most recent, then "Open all 20 in /notes".
   - Every cover carries title, category, and date (provenance).
3. **[3] Projects (markdown + outputs).** 2 or 3 public repos (candidates: AI-Financial-News-agent-with-RAG, BiasRadar, Transformer translation).
   - Each output has a front: what it does, what it shows, the repo link.
   - A collapsible back holds stack, date, and README highlights.
   - Only claims the repo supports.
4. **[4] Experience (DataFrame-style table output).**
   - Columns: role, company, location, dates, one-line outcome.
   - Rows expand for the resume bullets, capped at resume-level detail (see §11 on numbers).
   - Education as two rows in a second table.
5. **[5] Practice (code cell + plot output).**
   - Input: the real build-time fetch function from `scripts/fetch-stats`.
   - Output: solved counts and a contribution calendar drawn from the fetched data, with "Updated <date>".
   - If a fetch fails, the output cell shows a plain error output and the last good data. Nothing is ever invented.
6. **[6] Writing (markdown, optional).** The 3 publications, if you want them (you didn't select them to carry over).
7. **[7] Contact (markdown).**
   - "Hiring for AI engineering work? Email me."
   - The email address with a Copy button that reports "Copied" via `aria-live`.
   - LinkedIn and GitHub links.
   - The kernel returns to Idle. This is the page's close.

**Mobile (<768px).**
- The contents rail becomes a "Contents" menu in the toolbar.
- Cells go full width, with the execution count inline above each cell.
- The notebook shelf becomes a horizontal scroll-snap row.
- Tables become stacked label/value rows.
- The toolbar keeps the wordmark, Resume, and a menu button: one line, no wrapping. This fixes today's broken mobile header.

**`/notes`.**
- A left file tree: Gen AI, Deep Learning, MLOps.
- Search and category filters live in the URL (`?c=&q=`).
- Results in a grid of covers.
- Empty state: "No notebooks match "{q}"." with a Clear button.
- Back returns to the same filter and scroll position.

**`/notes/<slug>`.**
- Desktop: a PDF viewer with a thumbnail strip.
- Mobile: page images plus an "Open PDF" button. iOS shows embedded PDFs as a single page, so the viewer is skipped there.

---

## 5. States and ranges

| Thing | Range | States |
|---|---|---|
| Notebooks | 20 now; the design must hold 5–100 | first-run cascade, loaded, filtered-empty, thumbnail missing (falls back to a title plate) |
| Projects | 2–4 | collapsed, expanded |
| Experience rows | 4 roles + 2 degrees | collapsed, expanded |
| Stats | per build | fresh, stale (older than 7 days shows its date), fetch-failed (error output + last good data) |
| Copy email | – | idle, copied (2 s), clipboard blocked (select the text instead) |
| Theme | light | dark follows `prefers-color-scheme` post-launch; no toggle unless you ask |

---

## 6. Visual system (proposed; finalized in DESIGN.md at the end of the build)

- **Scene that decides the theme:** a recruiter on a laptop in a daylit office, reading documents all day. **Light ground.**
- **Color strategy: restrained.**
  - ground `#F7F7F4`, cells `#FFFFFF`, ink `#1B1C1E`, secondary `#5E6269`, gutters `#E6E5E0`;
  - an 11-step neutral ramp between these, and nothing else tonal;
  - **one accent, signal yellow `#F5C400`, meaning only "running/active."**
- **Contrast (checked):**
  - ink on ground 15.9:1; secondary on ground 5.7:1.
  - Yellow alone against the ground is **1.53:1, below the 3:1 minimum for state indicators.** So state is always a yellow chip with ink text inside it (10.4:1), never a bare yellow bar.
  - Focus rings are ink, 2px, offset 2px.
- **Type:**
  - one superfamily, **Geist Sans + Geist Mono**, self-hosted with `font-display: swap`;
  - Mono only for execution counts, code inputs, dates, and figures, with tabular numerals;
  - wide size range from 13px labels to a 56px H1; headings use `text-wrap: balance`, body `text-wrap: pretty`, max 68ch.
- **Depth:** overlap only. No shadows; cells separate with gutters and a 1px rule.
- **Radius:** 2 values, 4px (chips, buttons) and 8px (cells).
- **Icons:** Phosphor, used only where they carry meaning (copy, external link, menu, collapse).

---

## 7. Motion (Emil Kowalski's rules)

- **Curves:**
  - ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for entering;
  - ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement;
  - never `ease-in`.
- **Durations under 300ms for UI.** Exits run faster than enters.

| Motion | Spec | Purpose |
|---|---|---|
| Cell executes | chip fades in 120ms; count text swaps without animation; output opacity + `translateY(4px)` 180ms ease-out | Explanation: shows the page running |
| Above-fold cascade | 60ms stagger between cells, never blocks interaction | Hierarchy |
| Rail now-marker | chip moves with a 200ms ease-in-out transition, interruptible | Spatial consistency |
| Project back / table row expand | `grid-template-rows` 0fr→1fr 220ms; collapse 160ms | State indication |
| Button press | `scale(0.97)` 160ms ease-out | Feedback |
| Hover cell gutter | 120ms `ease`, pointer-fine devices only | Feedback |
| Copy → Copied | label crossfade 150ms | State indication |
| Mobile menu | opacity + `translateY(-4px)` 200ms; close 150ms | Preventing jarring changes |

**Rules:**
- CSS transitions (not keyframes) for anything re-triggerable; WAAPI for the scripted cascade.
- No GSAP, Lenis, or Three.js.
- No `transition: all`; no `scale(0)` entrances; transform and opacity only.
- Keyboard-initiated moves are instant.
- **Reduced motion keeps the opacity fades** that aid comprehension and removes all movement (Emil: reduced motion means gentler, not none).

---

## 8. UX and accessibility floor (uupm + taste-skill)

- WCAG 2.2 AA both ways.
- Semantic landmarks, one `h1` per page, a skip link, and keyboard access to everything:
  - cells, shelf covers, expanders, filters, copy;
  - `scroll-margin-top` so the sticky toolbar never covers a heading.
- **Links:**
  - one label per intent everywhere: **Resume**, **Email me**, **Open notebook**, **View repo**;
  - every page and filter state is a URL, and Back never leaves the site unexpectedly;
  - off-site links carry a visible icon and an "(opens in new tab)" label.
- **Touch and layout:** targets at least 44px; no horizontal scroll at 375px; `min-height: 100dvh` wherever a full-height region exists.
- **Copy:** zero em dashes; none of the AI clichés (elevate, seamless, delve, and the rest); first person, plain, specific.
- **Security of content:** code cells show only real code from this site or your public repos.

---

## 9. Technical plan

Stack delegated to me, recorded in PRODUCT.md: **Astro, static output.**

- **Start clean in this repo.**
  - First run `git init` and commit the current site, so the old version stays recoverable.
  - Then replace `src/` with the Astro app.
  - Keep `public/notes/`, `public/notes-manifest.json`, and `scripts/sync-notes.js`.
- **Content collections:**
  - `notes`, from the manifest plus generated covers;
  - `projects`, one Markdown file each, drawn from repo READMEs;
  - `experience` and `profile`, data files.
- **Components stay small and native.** There is no React: interactive pieces are small TypeScript scripts, not framework islands.
  - The `Cell` component takes a markdown, code, table, image, or plot output.
  - The Run-all orchestrator and the rail scroll-spy use IntersectionObserver.
  - `/notes` filtering runs client-side over the manifest.
- **Build scripts:**
  - `sync-notes` (existing);
  - `render-covers`: PDF first page to 480px WebP via `pdftoppm` + `cwebp`, then the page thumbnails for the viewer;
  - `fetch-stats`: LeetCode GraphQL plus GitHub contributions GraphQL, using a token in CI, writing `src/content/stats.json` with a timestamp.
- **Deploy and CI:**
  - Deploy to Vercel or Netlify with your domain; a nightly GitHub Action rebuild refreshes stats.
  - CI runs lint, build, a Playwright check of every route at 390px and 1440px with zero console errors, axe-core, and impeccable's detector (`impeccable detect`).
- **Removed dependencies:** React, GSAP, Lenis, Three.js, lucide.
- **Performance budget:** under 30 KB of JS on `/`, LCP under 1.8 s on 4G, CLS under 0.05; covers lazy-loaded below the fold with explicit dimensions.
- **Sharing:**
  - per-page title and description;
  - an OG image rendered from cell [1]: name, role, the notebook grammar, **no photo**;
  - `Person` JSON-LD, sitemap, robots.

---

## 10. Build phases

1. **Foundation.** `git init` and commit the current site. Scaffold Astro, tokens, fonts, toolbar, rail, the `Cell` component, the 404 page.
2. **Content.** Collections, covers script, stats script, all seven cells with real content, fully executed and static.
3. **Pages.** `/notes`, `/notes/<slug>`, `/projects/<slug>`, `/resume` with print CSS.
4. **Behavior.** Run all, the now-marker, keyboard command mode, expanders, copy, and every reduced-motion and no-JS path.
5. **Finish (impeccable).**
   - One batched screenshot round at desktop and mobile; the detector.
   - A fresh-context finish review against §3's first-viewport contract.
   - The documenter writes DESIGN.md.
   - Then deploy.

---

## 11. Decisions and inputs still needed from you

1. **Resume PDF.** Needed for the Resume action; the current site's link 404s. **Blocking.**
2. **Resume numbers.** Your current resume bullets include metrics (28% latency, 62%→77% faithfulness, 38%, 68%, 9%). Since employer systems are off-limits, should those numbers still appear in the Experience table, or only role/company/dates?
3. **Projects.** Which 2–3 public repos to feature. My suggestion: AI-Financial-News-agent-with-RAG, BiasRadar, Transformer translation. I'll only claim what each README supports.
4. **Publications.** Include cell [6] or drop it?
5. **Intro line.** "AI engineer in the Bay Area. I build agent and retrieval systems, and I learn them by hand." Keep, or give me your own sentence.
6. **Domain and host.**

---

## 12. Pre-flight (every phase)

- [ ] First viewport matches §3 exactly: toolbar, rail, cell [1] with both actions visible at 1440×900 and 390×844.
- [ ] Run all works on first visit, is skipped on return / reduced motion / no-JS, and content is never hidden from crawlers.
- [ ] The accent appears only as the running chip or the active state, always with ink text inside.
- [ ] No shadows, 2 radii, one type superfamily.
- [ ] Every code cell is real code; every number is real, fetched data or a confirmed resume fact.
- [ ] No employer system detail, no photo (including the OG image), no random data.
- [ ] Every animation is in §7's table, under 300ms (except the cascade total), interruptible, with no keyboard-triggered motion.
- [ ] One label per intent; zero em dashes; copy self-audit done.
- [ ] Keyboard-only pass; axe clean; 375px has no horizontal scroll.
- [ ] Budgets in §9 met; impeccable detector run once; finish review verdict recorded.
