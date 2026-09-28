# Portfolio Redesign — Motion & 3D Design Spec

Status: **superseded by [PORTFOLIO_SPEC.md](PORTFOLIO_SPEC.md)** (full rebuild from scratch). Kept as a record of the earlier iterations. The hero photo described below has since been removed at the owner's request.

## 0. How This Spec Was Built

Per your correction, I installed the actual **uupm.cc / "UI UX Pro Max"** skill into this repo (`.claude/skills/ui-ux-pro-max/`, MIT-licensed, from `github.com/nextlevelbuilder/ui-ux-pro-max-skill`, installed via `npm exec -- ui-ux-pro-max-cli init --ai claude` — `npx` itself is broken in this shell, `npm exec` is the working equivalent) and queried its local design database directly, including its dedicated **Three.js stack** and **GSAP motion-preset** tables. Everything in §3–§5 below is sourced from those queries, not guessed.

I also fetched **motionsites.ai** as you asked — it's a prompt-library/template marketplace (dark bases, glow/neon accents, named 3D hero templates like "Nebula Hero," "Golden Portal," "Agent Wave"). Per your instruction, I'm not replicating any specific template from it. I'm taking one mood cue from it — a single glowing, animated focal point in the hero on a dark canvas, then calm content below — which happens to agree with what the uupm database independently recommends for this product type (see §3).

I also ran uupm's automatic `--design-system` generator twice with different keywords, and it returned two mismatched results — "HUD / Sci-Fi FUI" (neon, iron-man aesthetic, flagged `accessibility risk: high`) and "Brutalism" (raw/asymmetric, "anti-design"). Neither fits a recruiter-facing resume site, so I rejected both and instead composed the system below from targeted, single-purpose queries (style, color, typography, landing pattern) — the workflow the skill's own docs call for when the one-shot generator doesn't fit.

## 1. Current State (what exists today)

React 19 + Vite, single-page app with tab switching (Overview / Notes / Resume) in [App.jsx](src/App.jsx), dark/light theme via CSS variables in [index.css](src/index.css). Visual language is Vercel/Linear-style minimalism: Inter + JetBrains Mono, monochrome palette, no accent color except a green "available" status dot. Motion today is limited to CSS `fadeInUp` on mount and hover `translateY`/border-color transitions on cards — no scroll-triggered reveals, no orchestration, no 3D.

Content is genuinely strong for a Data Scientist/AI Engineer job search: real experience timeline, 3 publications, LeetCode heatmap (252 solved), 20 study notebooks, certifications. The redesign's job is to make that content feel alive without burying it under effects.

## 2. Goals & Audience

- **Reader**: recruiters/hiring managers screening for AI Engineer / Data Scientist / ML Engineer roles, plus technical peers who'll judge engineering taste from the site itself.
- **Tone**: confident and precise. Motion should read as "this person sweats the details," not "agency template." Nothing should slow down someone scanning your resume content on a 30-second skim.
- **Explicit non-goal**: 3D is optional polish, not the centerpiece. If it adds load time or risk without adding clarity, cut it.

## 3. Visual Direction (uupm-sourced)

I queried uupm's `style`, `color`, `typography`, and `landing` databases directly rather than trusting the one-shot generator. Good news: it validates most of what you already have.

**Style profile match: `motion-driven`** (uupm `styles.csv`) — "Animation-heavy, microinteractions, smooth transitions, scroll effects, parallax, entrance anim, page transitions." Listed as `cost: low`, best-for "Portfolio sites, storytelling platforms," framework-compatible with `gsap` and `framer-motion`. This is the style category the rest of this spec builds on.

**Color — keep your current dark palette, don't replace it.** uupm's closest verified match for "dark tech, professional" product types (Smart Home/IoT Dashboard profile) recommends background `#0F172A`, card `#1B2336`, and — notably — **accent green `#22C55E`**, which is almost exactly the `--brand-dot` green (`#22c55e`) your header already uses for the "available" status pulse in [index.css](src/index.css). Your instinct there was already correct. Formalizing it:

| Role | Current | Keep/Add |
|---|---|---|
| Background (dark) | `#09090b` | keep |
| Text (dark) | `#ededed` | keep |
| Status/available accent | `#22c55e` (already used) | keep, scope stays "availability" only |
| **New: interactive/motion accent** | none | add `#3B82F6` (electric blue) — used only for hover glow, focus rings, the animated nav pill, and the hero particle color in §5. Keeps it visually distinct from the green "I'm available" signal. |

This replaces the earlier draft's cardinal/gold-vs-indigo question — the data points to blue as the interaction accent, sitting alongside (not replacing) your existing green status dot. If you still want an Iowa State cardinal/gold nod, the natural place for it is the hero photo treatment in §5, not the UI chrome.

**Typography — keep Inter, formalize the scale.** uupm's typography match for this exact product category is literally named **"Modern Dark Cinema (Inter System)"** — "dark, cinematic, technical, precision... developer tools, fintech/trading, AI dashboards." Best-for list matches your role almost word for word. It's a single-family system (Inter everywhere) with a defined tracking/weight scale:

- Display/hero name: Inter 700, letter-spacing -1.5%, ~48pt
- H1/H2 (section titles): Inter 600, letter-spacing -0.5%, 32/24pt
- Body: Inter 400, 16pt
- Labels/tags: Inter 500, uppercase, letter-spacing +1.2%

Keep JetBrains Mono where you already use it (tag badges, LeetCode stats) — it's already doing the "developer precision" job this pairing calls for; no need to remove it.

**Landing structure — validates hero-first, minimal-CTA.** uupm's `hero-centric-design` pattern: "Full-bleed Hero (headline + visual) → single value prop strip → key proof → primary CTA," hero should "dominate the initial viewport without hiding the next content cue," one primary CTA only. Your current Hero already does this (name/title/bio → resume download + contact) — no structural change needed there, just the motion layer in §4.

## 4. Motion System (uupm `gsap`/`ux` domain-sourced)

Principles, straight from uupm's Animation rule set (priority 7, `--domain ux`): motion must express cause-effect not decoration, animate only 1-2 key elements per view, use `transform`/`opacity` only (never `width`/`height`/`top`/`left`), stagger list items 30-50ms apart, and respect `prefers-reduced-motion` everywhere. Given the "Motion-Driven" style's framework compatibility (`gsap` or `framer-motion`), and that uupm's own snippet library is GSAP-native, **I'm switching the recommended engine from Framer Motion (my first draft) to GSAP + ScrollTrigger** — one library instead of two, and every snippet below is a real, performance-noted preset from uupm's `motion.csv`, not something I'm inventing.

- **Page load — headline entrance.** uupm's "Stagger List / Complex" preset, applied to the hero name via SplitText:
  ```js
  const split = new SplitText(headline, { type: 'chars' });
  gsap.from(split.chars, { opacity: 0, y: 20, rotateX: -40, duration: 0.6, stagger: 0.015, ease: 'expo.out' });
  ```
  Guardrail from the skill: register SplitText once, call `split.revert()` on unmount to restore the DOM for accessibility tools, and reserve character-splitting for short headlines only (your hero name is well under the ~8-word limit). Bio/CTA row follows with a simpler fade-up stagger, replacing the current CSS `fadeInUp` keyframe in [index.css](src/index.css).
- **Scroll reveals** (TechSkills, ResumeTimeline, LeetCodeHeatmap, PublicationsCerts, NotefulNotes) — uupm's "Scroll Reveal / Subtle" preset, one-shot per element:
  ```js
  gsap.from(el, { opacity: 0, y: 12, duration: 0.35, ease: 'power1.out',
    scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } });
  ```
  `toggleActions: 'play none none reverse'` is what stops it re-triggering every time you flip back to the Overview tab.
- **Nav tabs**: replace the instant background swap in [Header.jsx](src/components/Header.jsx) with a GSAP Flip-based sliding pill between active tabs (same Flip plugin used for the tab-to-resume transition below).
- **Tab switch (Overview ↔ Resume ↔ Notes)**: since [App.jsx](src/App.jsx) already conditionally renders by `activeTab`, use GSAP Flip for a shared-element feel when switching — e.g. the hero's "Download Resume" affordance visually connecting to the Resume tab's timeline. Optional polish, not required for v1.
- **Cards** (`clean-card`, tech-skill-card): cursor-follow tilt (perspective transform, max ~6°) layered on the existing hover `translateY`/shadow — plain CSS/JS, no library needed.
- **Resume timeline**: the connector line in [ResumeTimeline.jsx](src/components/ResumeTimeline.jsx) draws downward via a scroll-scrubbed `scaleY`, using the same Parallax Scroll `scrub` mechanism as §5.
- **LeetCode heatmap**: cells stagger in (scale + opacity, 30-50ms apart per the rule above) the first time [LeetCodeHeatmap.jsx](src/components/LeetCodeHeatmap.jsx) is visible.
- **Theme toggle**: animated sun/moon icon morph instead of an instant swap.
- **Smooth scroll**: Lenis site-wide — ScrollTrigger has a documented Lenis integration, so this pairs cleanly with everything above instead of fighting native scroll.
- **Custom cursor** (optional, desktop only, disabled on touch): small dot + trailing ring that grows over interactive elements. Flagged in §10 — cheap to add or cut.

## 5. Optional 3D Module (hero only) — uupm Three.js stack-sourced

Scoped tightly so it can be dropped entirely without touching anything else: lazy-loaded, code-split, never blocks first paint. This section changed the most from the first draft — uupm's dedicated `threejs` stack table gave concrete, verified performance rules (not just "use Three.js"), which makes the abstract-particle option low-risk enough to promote to the default.

**Recommended default — combine both prior options instead of choosing one:** your actual photo (a duotone-treated crop from the Stanton Memorial Carillon arch shot) sits in the hero as the personal/human element, with a lightweight Three.js particle field as an ambient WebGL background layer behind/around it — the "3D object" you asked for, without needing a 3D model of a person. This is exactly the "single glowing animated focal point on a dark canvas" mood from motionsites.ai (§0), built with your real content instead of a copied template.

**Three.js implementation rules (from uupm `stacks/threejs.csv`, verified against Three.js 0.185.1):**
- Build the particle field with `BufferGeometry` + `Points`, never individual `Mesh` objects — meshes-as-particles cap out at a few hundred before frame drops; `Points` scales to thousands in one draw call:
  ```js
  const COUNT = 3000; // verified safe mobile baseline — profile before raising
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT * 3; i++) pos[i] = (Math.random() - 0.5) * 20;
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.05, color: 0x3B82F6 }));
  ```
  (Particle color set to the `#3B82F6` interaction accent from §3, so the 3D layer and the rest of the motion system read as one system.)
- **Hard ceiling: 3000 particles as the starting point, profile on real mobile hardware before going higher** — uupm's own severity-High warning notes desktop can hit 60fps at 150,000 particles while a mid-range Android phone drops to 8fps at the same count. Do not skip the mobile profiling step.
- No shadow casting on the particle system at all — `castShadow`/`receiveShadow` triggers a full extra scene render pass per frame and buys nothing visually on point sprites. If a solid hero object is added later (e.g. an icosahedron), shadows go only on that one mesh, not the particles.
- Mouse-reactive drift only (parallax offset on pointer move), no physics simulation — keeps it firmly in "ambient background," not a distracting centerpiece competing with your resume content.

**Mandatory fallback either way**: on mobile, `prefers-reduced-motion`, or a low-end GPU (`navigator.hardwareConcurrency` / a quick WebGL capability check), skip the canvas entirely and render the static photo with zero motion. A slow-loading hero canvas costs more with recruiters than it gains — this is non-negotiable, not a nice-to-have.

**Out of scope for v1**: full 3D avatar/GLTF human model, scroll-scrubbed "3D storytelling" camera scenes. High effort, high risk for a resume site, and neither uupm's data nor your own framing calls for it.

## 6. Component-Level Plan

| Component | Current | Change |
|---|---|---|
| [Header.jsx](src/components/Header.jsx) | instant tab background swap | animated layout pill, icon-morph theme toggle |
| [Hero.jsx](src/components/Hero.jsx) | static, CSS fade on mount | staggered entrance; optional Hero3D/photo module beside text |
| [TechSkills.jsx](src/components/TechSkills.jsx) | static grid | `whileInView` stagger-in per card |
| [ResumeTimeline.jsx](src/components/ResumeTimeline.jsx) | static connector line | scroll-linked drawing line, per-item reveal |
| [LeetCodeHeatmap.jsx](src/components/LeetCodeHeatmap.jsx) | renders all cells at once | staggered cell draw-in on first view |
| [PublicationsCerts.jsx](src/components/PublicationsCerts.jsx) | static cards | `whileInView` reveal, tilt-on-hover |
| [NotefulNotesGallery.jsx](src/components/NotefulNotesGallery.jsx) | static grid + modal | reveal on view; keep existing `modalZoom`, just retime via Framer |
| [Projects.jsx](src/components/Projects.jsx) | (currently unused in App.jsx — confirm if intentional) | tilt-on-hover cards if wired in |

## 7. Tech Stack Additions

- `gsap` (includes `ScrollTrigger`, `SplitText`, `Flip`) — covers every motion pattern in §4: scroll reveals, headline stagger, timeline draw-in, nav pill, tab transitions. One library instead of two; matches what uupm's own snippets are written against. **Note**: `SplitText` and `Flip` are GSAP's bundled plugins (free since GSAP 3.13, no separate Club GreenSock license needed) — confirm the installed GSAP version is ≥3.13 when implementing.
- `lenis` — smooth/inertia scroll, has a documented ScrollTrigger integration.
- **Hero-only, lazy-loaded**: `three` — for the particle field in §5. `@react-three/fiber`/`drei` are optional convenience wrappers; given the hero visual is a single `Points` system, vanilla `three` inside a `useEffect`-managed canvas is arguably simpler than pulling in R3F's whole reconciler for one object — worth deciding at implementation time based on whether more 3D elements get added later.
- Everything else (`lucide-react`, `marked`, React 19, Vite) stays as-is.
- New local dependency: `.claude/skills/ui-ux-pro-max/` (installed this session) — not a runtime dependency, just design reference data checked into the repo. Fine to keep or `.gitignore` it; it doesn't ship to the built site.

## 8. Performance & Accessibility Guardrails

- Honor `prefers-reduced-motion`: reduce to opacity-only fades, disable tilt/cursor/3D.
- 3D or particle canvas: dynamic `import()`, mount only once the hero scrolls into view, pause the render loop on `visibilitychange` and when scrolled out of the viewport.
- All new motion must consume the existing `--bg-*`/`--text-*` CSS variables — nothing hardcoded, so dark/light theming keeps working.
- Target: Lighthouse performance ≥ 90 desktop / ≥ 80 mobile even with the 3D module active; mobile always gets the static fallback from §5 regardless of score, to be safe.

## 9. File Plan

```
src/lib/gsap.js                 # registers ScrollTrigger/SplitText/Flip once, shared config
src/hooks/useReducedMotion.js
src/components/hero/HeroParticles.jsx  # lazy-loaded Three.js Points field (§5)
src/components/hero/HeroStatic.jsx     # fallback: static photo, zero motion
src/components/CursorFX.jsx            # optional, desktop-only custom cursor
src/assets/photos/                     # the 3 supplied grad photos, cropped for hero use
```
Existing components listed in §6 get edited in place, not rewritten.

## 10. Decisions Made During Implementation

Built and shipped (in the codebase now, not just planned):

1. **3D hero module**: built, as the combined default — the archway photo (photo 1 of the three supplied) plus a Three.js particle field (`src/components/hero/HeroParticles.jsx`), lazy-loaded via `React.lazy`/`Suspense` so `three` only downloads for visitors who'll actually see it (desktop-width, WebGL-capable, no `prefers-reduced-motion`), gated by `src/hooks/useCanRender3D.js`. Verified: production build splits it into its own ~526KB chunk separate from the ~407KB main bundle.
2. **Custom cursor**: left out. Cut for risk/reward — cheapest thing to add later if you want it, and skipping it kept the surface area smaller for this pass.
3. **Navigation model**: kept the existing tab-switch UX (Overview/Notes/Resume) in [App.jsx](src/App.jsx) unchanged — lower risk than a structural rewrite, and `ScrollTrigger.refresh()` now runs on every tab switch so scroll-linked animations stay correct against the new layout.
4. **Hero photo**: used the archway portrait (Stanton Memorial Carillon), resized and served as WebP with a JPEG fallback (`src/assets/photos/hero-arch.{webp,jpg}`, 1600×1066, ~191KB/439KB) via `<picture>`.

## 11. What Shipped

- `src/lib/gsap.js` — registers ScrollTrigger/SplitText/Flip once.
- `src/hooks/` — `useReducedMotion`, `useCanRender3D`, `useTilt`, `useLenis`.
- `src/components/motion/Reveal.jsx` — shared scroll-reveal wrapper (forwardRef, so it composes with `useTilt`), applied to TechSkills cards, Publications/Certification cards, and Resume timeline items.
- Hero: SplitText character-stagger entrance on the name, fade-stagger on bio/CTAs, photo + particle hero visual. (Superseded by §12: the accent is now the single locked `--color-accent` emerald, not the blue described here originally.)
- Header: measured-rect animated nav pill (plain `left`/`top`/`width`/`height` tween via GSAP — deliberately not a pure-transform animation; for a 3-item, click-triggered indicator the robustness/simplicity tradeoff won over strict adherence to the transform-only performance rule in §4), animated theme-icon morph.
- Resume timeline: per-item scroll-scrubbed connector line (`.resume-line`, replaces the old static `border-left`).
- LeetCode heatmap: cells stagger in once on first viewport entry.
- Lenis smooth scroll wired into the GSAP ticker, `App.jsx`.
- All motion respects `prefers-reduced-motion` (per-component checks, plus a blanket global override in `index.css` as a safety net) and degrades gracefully — verified via a headless Chrome smoke test (Playwright against system Chrome) with zero console errors from any of this work, at desktop, mobile, and both themes.

**Known pre-existing issue, not introduced by this work**: the header nav (`Jyothi Prasanth D R` + the three tabs) wraps awkwardly below ~400px viewport width — there was no mobile-specific header layout before this change either. Worth a follow-up if you want it fixed; out of scope for the motion/3D spec itself.

## 11. Phased Delivery

- **Phase 1 — Foundation**: install `gsap` + `lenis`, build the reduced-motion hook and a shared ScrollTrigger setup, migrate the existing CSS-keyframe animations to GSAP, animate header + hero entrance (SplitText headline).
- **Phase 2 — Scroll motion**: `whileInView` reveals across all sections, timeline drawing line, heatmap stagger-in, card tilt-on-hover.
- **Phase 3 — Optional 3D/photo module**: hero visual per §5, with fallback and a real Lighthouse pass before calling it done.

## 12. Round 2: Anti-Slop Revamp (taste-skill)

After Phases 1–3 shipped, you flagged two things: the hero photo was too small/boxed (you'd sent the photo expecting a big, mouse-tracking hero, not a side thumbnail), and you wanted the whole site run through **tasteskill.dev** to strip out anything that reads as generic AI output. Here's what that actually was and what changed.

### What tasteskill.dev is

Same situation as uupm.cc: not itself a reference site, but "Taste-Skill" (`github.com/Leonxlnx/taste-skill`, MIT, 90k+ stars, active PR history — verified legitimate before installing, same diligence as uupm). It's a set of plain-markdown anti-slop design rules, not a code generator. Installed two of its skill files directly into `.claude/skills/`:
- `design-taste-frontend` (the core anti-slop ruleset — brief inference, dial system, banned AI patterns, pre-flight checklist)
- `redesign-existing-projects` (audit-first workflow for upgrading an existing codebase without rewriting it from scratch)

### Hero: rebuilt big, full-bleed, mouse-tracking

- Pulled `<Hero>` out of the width-capped `.container` in [App.jsx](src/App.jsx) so the photo can bleed to the actual browser edge, not just to an 880px column.
- New split-screen layout (`min-height: 100dvh` on desktop, per the skill's explicit "never `h-screen`, always `min-h-dvh`" rule): text column left, photo column right, full viewport height, photo dissolving into the dark background at the seam instead of sitting in a bordered card.
- Mouse-tracking: reused the existing `useTilt` hook (already built for card hover, GSAP `quickTo`-driven, no `useState` in the hot path — the same principle the skill enforces via Framer's `useMotionValue`, just the GSAP equivalent) on the photo itself, at hero-visual scale with `perspective: 1600px` so the tilt reads as real depth. The particle field from Phase 3 now sits over a photo that's actually large enough to carry it.

### Sitewide anti-slop audit and fixes

- **Icons**: replaced `lucide-react` and two hand-rolled SVG icons (`GithubIcon`/`LinkedinIcon`, literally hand-copied Lucide paths) with `@phosphor-icons/react` everywhere, site-wide. Both uupm and taste-skill independently name Lucide-everywhere as the single most recognizable "AI default" icon choice — two unrelated skills converging on the same flag was enough to act on it despite the mechanical size of the change (8 files).
- **Typography**: dropped Inter (taste-skill names "Inter + slate-900" as the most common LLM typography tell) for **Satoshi** (via Fontshare), paired with the JetBrains Mono already in use — `Satoshi + JetBrains Mono` is one of the skill's own named-good pairings, so this wasn't a guess.
- **Color**: the accent I'd added in Phase 3 (`#3B82F6`, plain Tailwind blue) is called out almost verbatim in the skill as "the most common AI design fingerprint." Removed it. Consolidated to **one locked accent** (`--color-accent`, emerald `#22c55e`) reused everywhere: the status dot that was already there, focus rings, the hero particles, the nav pill. One accent, whole site, per the skill's "Color Consistency Lock."
- **Copy**: removed the two remaining user-visible em dashes (footer credit line, two Digital Garden note titles) — en dashes in date ranges (`Sep 2025 – Present`) were left alone, that's a different, non-flagged character.
- **Grain texture**: attempted a fixed noise overlay per the skill's "flat sections feel sterile" guidance, found and fixed a real bug it introduced (see below), then cut it entirely once the safe version still wasn't worth the risk for a barely-visible effect.

### A real bug the process caught

The first grain-overlay attempt (`body::after`, `mix-blend-mode: overlay`, low opacity) caused a reproducible ~100ms flash of solid gray across the entire page on first paint, in both the dev server and the production build. Root-caused by disabling the element entirely (flash gone), then trying `mix-blend-mode` removal alone (flash persisted) before isolating it to the `feTurbulence` SVG filter itself being expensive to rasterize on first paint. Removed the feature rather than ship a half-fixed decorative effect. Caught via actual Playwright screenshots at 50ms/150ms/2500ms after load, not by inspection — this is exactly the kind of defect that only shows up when you run the thing.

### Verification

Full lint + production build clean after every step; headless Chrome (Playwright against system Chrome, no `chromium-cli` in this environment) smoke tests at desktop/mobile/both themes with zero console errors from this work, mouse-tracking tilt confirmed to actually change the rendered frame under cursor movement, and every tab (Overview/Digital Garden/Resume) re-screenshotted after the icon swap to confirm nothing broke.
