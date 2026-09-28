# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated (owner answered "your call"). Chosen: **Astro**, static output, with interactive islands only where a surface needs client JS. Reasons: the site is mostly content (notes library, project write-ups, resume) that should ship near-zero JavaScript; Astro content collections fit the 20-notebook library and project pages; islands keep interactive pieces isolated. The existing `scripts/sync-notes.js` and `public/notes/` library carry over.

## Users

- **Primary: recruiters and hiring managers screening AI Engineer candidates.** Usually on a laptop between other tabs, deciding in under a minute whether to read further or reach out. They need role, location, availability, a working resume, and one piece of evidence that the person builds real AI systems.
- **Secondary: engineers and technical interviewers** checking depth before or after an interview. They read notes and code.

## Product Purpose

A personal site for Jyothi Prasanth that earns interviews for AI Engineer roles. Success means a recruiter can find the resume and contact route immediately, and a technical reader finds enough real work to trust the resume.

## Positioning

An AI engineer who builds agent and retrieval systems. The pitch is experience, practice, and public projects. The 20 handwritten notebooks are the owner's personal study notes (changed 2026-09-28, see NOTES_SPEC.md): kept on the site at /notes for anyone curious, reachable from the footer and the contents rail, but never part of the main flow.

## Operating Context

- Visitors arrive from LinkedIn, job applications, email signatures, and recruiter searches.
- The notes are Noteful PDF exports synced into `public/notes/` by `scripts/sync-notes.js` and indexed in `public/notes-manifest.json`.
- Resume content lives in `src/data/portfolioData.js` today.

## Capabilities and Constraints

- Positioning: **AI Engineer** first (confirmed). Data science and ML depth are supporting, not co-equal.
- **Employer systems are not published** (confirmed answer "no"; interpreted as: no case studies, architecture diagrams, or system detail for Talent360, Ziontech, or Iowa State work). Resume-level lines (role, company, dates, outcome bullets) are the ceiling for employer work. *Resolved 2026-09-28:* the owner supplied their resume PDF for the site, so its quantified bullets are public on /resume (verbatim from the PDF, nothing beyond it). The home page shows role, company, and dates only.
- Must carry over (confirmed): the Digital Garden notes library; LeetCode/GitHub stats, **real data only**, fetched at build time.
- Optional (not selected): publications, light/dark theme toggle.
- The owner's photograph is not to appear anywhere on the site, including social preview images.
- No fabricated data. The current LeetCode heatmap is generated with `Math.random()` and must not ship in any form.

## Brand Commitments

- Name as written: **Jyothi Prasanth**.
- No photo of the owner (standing instruction).
- No other brand assets exist yet (no logo, no palette commitment).

## Evidence on Hand

- `public/notes/`: 20 handwritten PDF notebooks (9 Gen AI, 7 Deep Learning, 4 MLOps), indexed in `public/notes-manifest.json`.
- Public GitHub repos (github.com/jyothiprasanthdr), candidates to feature: `AI-Financial-News-agent-with-RAG` (Python, RAG agent, 2026), `BiasRadar` (ML pipeline for bias in 311 service data), `Transformer-code-for-German-English-translation`, `Langchain-learning`, `Sentiment-Analysis-using-Twitter-Data`. *Open decision:* which 2 or 3 to feature; each needs a README/demo check.
- LeetCode: profile `jpdr98`, practice repo `Leetcode_python_practice` (active 2026-09). Counts in the current data file (252 solved) are unverified until the build-time fetch runs.
- Education: MS Computer Engineering, Iowa State (GPA 3.78); BTech IT, Anna University / MIT Chennai.
- Publications (optional to show): IEEE 2020, Springer 2021, IGI Global 2022.
- **Absent, must not be invented:** testimonials, employer case studies, OG/social image.

## Product Principles

1. The resume and the contact route are never more than one action away.
2. Show real work; never claim what can't be linked or verified.
3. The study notes are personal reference: one click away, never pushed into the pitch.
4. Employer confidentiality outranks storytelling.

## Accessibility & Inclusion

WCAG 2.2 AA. Fully usable by keyboard. Respects `prefers-reduced-motion`.
