---
name: jyothi-prasanth.ipynb
description: Personal site of an AI engineer, built as a notebook you run.
colors:
  signal: "#f5c400"
  ground: "#f7f7f4"
  surface: "#ffffff"
  code-paper: "#f0efea"
  rule: "#e6e5e0"
  rule-strong: "#d5d4ce"
  graphite-5: "#b9b8b2"
  graphite-7: "#6a6c70"
  graphite-8: "#5e6269"
  graphite-9: "#3a3c40"
  ink: "#1b1c1e"
typography:
  display:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 4.4vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Mono Variable, ui-monospace, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tnum"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.graphite-9}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "36px"
  chip-running:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "1px 6px"
  code-input:
    backgroundColor: "{colors.code-paper}"
    textColor: "{colors.graphite-9}"
    rounded: "{rounded.md}"
    padding: "12px 16px 14px"
---

# Design System: jyothi-prasanth.ipynb

## Overview

**Creative North Star: "The Run-All Notebook"**

The site is a Jupyter notebook you run. Every section is a cell. Markdown cells render headings and prose. Code cells show real source from this repository with an `In [n]:` prompt and render their results beside `Out[n]:`. On a first visit the page executes as you read it. That is the one piece of theatre the system allows, and it exists to show that the page is doing work.

The mood is a lab bench in daylight: paper-white ground, graphite ink, hairline rules, and nothing that glows. Evidence carries the page: roles, real stats, and public projects. The handwritten study notes live on their own pages (/notes), outside the numbered flow.

**Key Characteristics:**
- Light paper ground; one theme.
- A graphite neutral ramp is the only tonal system.
- One signal yellow that always means "running / active".
- Geist Sans for reading, Geist Mono only where a notebook itself uses mono.
- Flat: depth comes from rules and overlap, never from shadows.

## Colors

A restrained neutral ramp with a single signal accent.

### Primary
- **Execution Yellow** (signal): marks what is running or active, and nothing else. It appears as the `In [*]:` chip while a cell executes, the current section's number in the gutter, and the current item in the contents rail. It is always a filled chip with Ink text inside (10.4:1). On its own against the ground it reaches only 1.5:1, so it never appears as a bare bar, border, or text color.

### Neutral
- **Lab Paper** (ground): the page background.
- **Cell White** (surface): buttons and dialogs.
- **Code Paper** (code-paper): the code-input box and error output.
- **Hairline** (rule) and **Hairline Strong** (rule-strong): cell and table dividers, input and secondary-button borders.
- **Graphite 5**: scrollbar thumb and a heat-grid level.
- **Graphite 7**: prompts, execution counts, and table indexes (4.9:1 on the ground).
- **Graphite 8**: secondary text (5.7:1).
- **Graphite 9**: code and long-form body.
- **Ink**: primary text, the primary button, and focus rings.

### Named Rules
**The One Meaning Rule.** Execution Yellow means running or active. It never encodes data, never decorates, and never marks selection. Text selection uses a neutral ramp step instead.

**The Chip-or-Nothing Rule.** The accent appears only as a filled chip with ink text inside, which keeps state readable without relying on a 1.5:1 color edge.

## Typography

**Display Font:** Geist Variable (with ui-sans-serif, system-ui)
**Body Font:** Geist Variable
**Label/Mono Font:** Geist Mono Variable (with ui-monospace, Menlo)

**Character:** One superfamily across a wide size range. The sans handles every human sentence. The mono is reserved for what a notebook prints in mono.

### Hierarchy
- **Display** (600, clamp 2.5–3.5rem, 1.02): the name in section 1 only.
- **Headline** (600, 1.75rem, 1.15): section headings (sections 2–5) and page titles on the reader and library.
- **Title** (600, 1.3125rem): project names and sub-headings.
- **Body** (400, 1rem, 1.6): prose, capped at about 62–68ch; `text-wrap: pretty`.
- **Label** (Geist Mono, 0.8125rem, tabular figures): execution counts, file labels, dates, stats, page counts.

### Named Rules
**The Mono Is Machine Rule.** Mono appears only for things a notebook prints: prompts, code, stdout, counts, dates. It is never used for headings or for style.

## Layout

The home page is a two-column notebook: a 200px sticky contents rail, then a cell column of at most 800px, inside a 1120px frame with 24px gutters. Each cell is a two-column grid: a 72px right-aligned prompt gutter and the cell body. A section starts with 64px of extra space above its heading cell (40px on phones).

Below 860px the rail becomes a Contents dialog, prompts stack above their cells, code wraps instead of scrolling, the contribution plot shows the last 26 weeks, and the experience timeline stacks. Spacing steps are 4, 8, 12, 16, 24, 32, 40, and 96px.

## Elevation & Depth

Flat. There are no shadows anywhere. Surfaces separate with 1px hairlines and a tone step (Lab Paper to Code Paper to Cell White). The sticky toolbar is the one translucent layer: 94% ground with a small backdrop blur, so content stays legible as it scrolls beneath.

### Named Rules
**The Overlap Not Shadow Rule.** If something needs to sit above something else, it gets a rule, a tone step, or a chip. It never gets a drop shadow.

## Shapes

Two radii only: 4px on controls, chips, notebook-page frames, and inputs; 8px on cells, code inputs, and dialogs. Borders are 1px throughout. The only heavier stroke is the 2px focus ring.

## Components

### Buttons
- **Shape:** gently squared (4px), 36px tall (44px on touch screens).
- **Primary:** Ink fill with Cell White text. One per view: Email me on the home page, Download PDF in the reader. The toolbar's Resume is secondary so it never competes.
- **Secondary:** Cell White with a Hairline Strong border.
- **Quiet:** transparent, with Code Paper on hover. Used for Run all and Details.
- **Hover / press:** the fill steps one ramp tone and the border turns to Ink. On press the button scales to 0.97 over 160ms (ease-out). Hover effects apply only to fine-pointer devices.

### Chips
- **Running chip:** Execution Yellow fill, Ink mono text, 4px radius. Used for `In [*]:`, the current section number, and the current rail item.

### Cells (signature component)
- **Prompt gutter:** `In [n]:` / `Out[n]:` on code cells and the section number on heading cells, in Graphite 7. The prompt turns Ink on hover.
- **Code input:** Code Paper box with an 8px radius and no border: the tone step alone separates it, so the page has fewer outlined boxes. A file label in mono sits above the code. Only real source, pulled from `// #region` blocks.
- **Run states:** pending (`In [ ]:` with raw markdown source showing), running (yellow chip), done (the output fades in over 180ms with a 4px rise, and the source disappears instantly so the two texts never overlap).
- **Section link:** on hover or focus-within, a 32px copy-link button appears at the heading cell's top right.

### Experience timeline
- Dates in a 168px mono gutter, role then company and location. Spacing separates entries, not row rules. On phones the dates move under the role.

### Inputs / Fields
- **Search:** Cell White with a Hairline Strong border and a 4px radius, with a leading magnifier icon. Focus shows the 2px Ink ring with a 2px offset. Text is 16px on phones so iOS does not zoom.

### Navigation
- **Toolbar:** 56px sticky bar: mono wordmark `jyothi-prasanth.ipynb`, Run all in the center, and on the right the kernel status (hollow dot when idle, filled while a cell executes) and a secondary Resume button (hidden on /resume itself). It always fits on one line, and the Contents button becomes icon-only below 480px.
- **Contents rail:** section number plus label. The current section shows the running chip and Ink text. Below the numbered list, outside the story, sit two quiet icon links: Study notes (/notes) and Keyboard shortcuts. The phone Contents dialog repeats Study notes under a hairline.
- **Footer:** GitHub, LinkedIn, Email, and Notes on every page.

## Do's and Don'ts

### Do:
- **Do** use Execution Yellow only as a chip with Ink text, only for running or active state.
- **Do** keep every code cell's input a real `// #region` block read from the repository at build time.
- **Do** separate surfaces with 1px hairlines and tone steps.
- **Do** keep UI motion under 300ms with a strong ease-out (the card-to-reader morph on /notes is the only longer one), and never animate keyboard-initiated moves.
- **Do** let pages hand off with the native cross-document view transition: a notebook card morphs into the reader's first page; everything else crossfades in 180ms.
- **Do** frame handwritten page images (on /notes only) in a 1px Hairline at 4px radius.

### Don't:
- **Don't** add drop shadows, glows, gradients, or a dark theme section.
- **Don't** introduce a second accent color or use the yellow for data, selection, or decoration.
- **Don't** set headings in mono or add small uppercase kicker labels above sections.
- **Don't** use a thick left border as a callout. Error output uses a full 1px border on Code Paper.
- **Don't** show the owner's photograph anywhere, including social preview images.
