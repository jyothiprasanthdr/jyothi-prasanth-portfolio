# Spec: Handwritten notes move out of the main flow

Status: built 2026-09-28 with the default choices (notes stay indexed, new intro line, no notes mention on /resume). The rail link uses a notebook icon, not an arrow, since it is an internal page.

## Why

The handwritten notebooks are the owner's personal study notes, written for their own use. They should stay on the site for anyone curious, but they are not part of the pitch. The main flow is for recruiters: who the owner is, where they have worked, what they practise, and what they have built. The 3D notebook stack in the hero goes too.

## Principle

The notes are **opt-in, never pushed**. A recruiter never has to scroll past them, but a curious one can find them with one click from any page. They are labelled plainly as personal notes, so nobody mistakes them for polished work.

## 1. What leaves the home page

| Remove | Where |
|---|---|
| The 3D notebook stack in the hero | `NotebookStack.astro` (delete the component) and the hero grid in `index.astro` |
| Section 5 "Handwritten notebooks": the heading cell and the `In [3]` shelf cell | `index.astro` |
| The notebook mention in the home page's meta description | `index.astro` |

**Hero after the change:** one column with the name on a single line, the intro, and the Email me and GitHub buttons. There is no replacement visual; the notebook cells below carry the page. The hero keeps its 2-line intro and its buttons, so it stays compact and the Experience section starts high on the first screen.

**Intro line:** "I build agent and retrieval systems, and I learn them by hand" only makes sense next to the notebooks. It becomes: **"AI engineer in the Bay Area. I build agent and retrieval systems."**

**New section order:** 1 About, 2 Experience, 3 Practice, 4 Projects, 5 Contact. The code cells become Practice `In [1]` and Projects `In [2]`.

## 2. Where the notes live

The `/notes` library and the reader pages (`/notes/<slug>`) stay as they are: search, category filter, page-by-page reading, and PDF download.

Wording on `/notes` changes to say plainly what the notes are:
- Title: **Study notes**
- Lede: **"Handwritten notes I keep while learning. They're for my own reference, shared as they are."**
- The breadcrumb stays `notes`.

## 3. How someone finds them (secondary entry points only)

| Entry point | Behaviour | Why here |
|---|---|---|
| **Footer** on every page | A "Notes" link next to GitHub, LinkedIn and Email. | This is where curious visitors look for "more". It's on every page, without competing with anything. |
| **Contents rail** (desktop) | An unnumbered "Study notes ↗" link below the numbered sections, beside "Keyboard shortcuts". | It's visible while reading, but clearly outside the numbered story. |
| **Contents dialog** (phones) | The same link, under a thin rule after the numbered list. | Parity with desktop. |
| **404 page** | Keeps its existing "Notebooks" link, relabelled "Study notes". | It's a recovery route. |

**Not added:** no toolbar link (the toolbar stays Run all, status, Resume) and no mention inside a home section.

## 4. Resume page

Remove the "Notebooks" section from `/resume`. The resume should match the PDF, and the PDF doesn't mention the notes. The footer link still reaches them.

## 5. Cleanup

- Remove the home notebook view transition. The `/notes` card-to-reader morph stays, since it lives on the notes pages.
- Remove the hero tilt code from `src/scripts/notebook.ts`, and the unused imports and shelf styles from `index.astro`.
- Keep `NotebookCard.astro`, `src/lib/notes.ts`, the page images, the PDFs, and `render-notes.mjs` / `sync-notes.js`; `/notes` still uses them.
- Update `PRODUCT.md` (positioning: the notes are personal reference, not the pitch), `DESIGN.md` (drop the notebook stack section and the "page images carry the visual weight" rule on the home page), and `README.md`.

## 6. Acceptance checks

- The home page has no notebook images and no 3D element. Sections are numbered 1 to 5 with no gaps, and the code cells are `In [1]` and `In [2]`.
- From any page, the notes are one click away (footer), and one click away on desktop home (rail).
- `/notes` and every reader page still work, including search, filters and PDF download.
- The accessibility scan is clean at 1440px and 390px, with no horizontal scroll and no console errors.
- The Run all cascade and keyboard shortcuts still work with 5 sections.

## Open decisions (defaults chosen; change any)

1. **Search engines:** the default is to keep `/notes` indexed. The alternative is `noindex`, so the notes only surface to people already on the site.
2. **Intro line:** the default is the new line in section 1. Say if you'd rather write your own.
3. **Resume page:** the default removes the notes mention. The alternative keeps one line: "Study notes: /notes".
