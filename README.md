# jyothi-prasanth.ipynb

Personal site of Jyothi Prasanth D R, AI engineer. Built with Astro as a static site, designed as a notebook you run: every section is a cell.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built site |
| `npm run stats` | Fetch LeetCode + GitHub numbers into `src/data/stats.json` (run before a deploy build) |
| `npm run notes:sync` | Pull new Noteful PDF exports into `public/notes/` and update the manifest |
| `npm run notes:render` | Render notebook PDFs to page images (macOS only: uses PDFKit via Swift, plus `cwebp`) |

## Where things live

- `src/data/profile.ts`: name, intro line, links, availability.
- `src/data/resume.ts`: experience, education, tools. **`showEmployerDetail` is `false`**. Employer bullets are kept in the file but not published until it is set to `true`.
- `src/content/projects/*.md`: public projects. Only state what the repo supports.
- `public/notes/` + `public/notes-manifest.json`: the notebook PDFs. `public/notebook-pages/`: rendered pages (committed, so CI never needs macOS).
- `src/data/stats.json`: generated. If a fetch fails, the last good data is kept and marked stale. Nothing is invented.

## Rules the design depends on

- Code cells only show real source, via `// #region <name>` blocks read at build time (`src/lib/source.ts`).
- One accent (signal yellow) that means "running / active" only, and always carries ink text.
- No photo of the owner, including in social preview images.

## Resume PDF

Put the PDF at `public/Jyothi_Prasanth_Resume.pdf`. The Download PDF button on `/resume` appears automatically once the file exists.

Design direction and product context: `PORTFOLIO_SPEC.md`, `PRODUCT.md`, `DESIGN.md`.
