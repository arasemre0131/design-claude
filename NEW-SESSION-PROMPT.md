# NEW SESSION PROMPT — Copy everything below into the new Claude Code session

---

## META INSTRUCTIONS TO CLAUDE

You are being called into an in-progress project with significant prior work. **READ THIS ENTIRE PROMPT BEFORE WRITING ANY CODE.** Then read the repository files listed below. Then execute the work plan.

**Do not start writing code until you have:**
1. Read this prompt end-to-end
2. Read the 8 critical reference files listed in section 4
3. Confirmed your understanding by producing a 1-page audit summary

**User language:** The user's native language is Turkish. Respond in Turkish. Technical terms can stay in English. Be direct, no flattery, no long preambles.

**User personality:** Emre is a solo freelance web developer in Istanbul. He works from the Armut platform. He is impatient with abstract work that produces no visible output. He wants **real, working, distinct-looking websites** — not YAML metadata. He has lost patience with the previous session because it produced a catalog system where all 60 preset pages look identical (same skeleton + different palette + different font). He does not want this to repeat.

---

## 1 · PROJECT CONTEXT

### What this project is

A system that converts Armut job listings into production-ready Next.js websites in 30 minutes. User gives a brief like "Ankara jewelry shop, 25K TL budget, 3D product viewer" → system outputs a working Next.js dev server with a distinct, sector-appropriate design.

### Active client (critical deadline)

**Fatih Bey Mücevher (Ankara)** — jewelry e-commerce site. Contract: 17.500 TL, half paid. **Delivery: 8 May 2026.** This session must produce a real `mucevher-editorial-luxury` or `mucevher-immersive-3d` preset that can be handed to this client.

### Secondary business pipeline

- **KADIKOY SATIŞ** — 10 cold-outreach prospects in Kadıköy, total 95.500 TL potential. Need fast-turnaround templates (budget tier).
- **StandartTIMWeb, ContentFlow AI, Vitanatur** — other active projects.

### Previous session output

**11 commits, 727 files, ~65,000 lines, ~2.8M Opus tokens, ~14 hours.** Git repo: `https://github.com/arasemre0131/design-claude` (public). Working tree is clean.

**What works:**
- Catalog YAML structure (356 files) defining atoms, sectors, styles, recipes, presets
- Preview-app Next.js 16 compiles and renders (`http://localhost:4200/gallery`)
- 4 scaffold CLIs (`scaffold.js`, `scaffold-wp.js`, `scaffold-shopify.js`, `scaffold-enterprise.js`)
- `/project-start` slash command + hook integration
- 64 React components (buttons, cards, hero scaffolds, 3D shells)
- 3 test scaffold projects passed file-level verification

**What is broken (critical):**
- All 60 preset pages look nearly identical. Only palette and font differ.
- No real sector content (no product lists, no service pages, no nav items, no footer links — all placeholder)
- No tier differentiation (Premium 25-80K TL and Budget 7.5-15K TL preset pages are visually indistinguishable)
- No signature motion/effect implementations per style (brutalist has no hazard stripe, immersive-3d has no 3D canvas rendering)
- Scraped agency HTMLs (fraxbit, wearebrand, mdx.so — 1.6MB of real, working, award-winning designs) were cataloged as metadata but never ported to Next.js

### Why the previous session failed

The previous Claude session spent tokens on metadata and abstraction layers:
- Defined atom IDs (HR11 = "Brochure Cover Hero") in YAML
- Wrote generic React components (HeroBrochure.tsx) that accept props
- Mapped atoms to components via atom-resolver.ts
- But **never produced per-preset page content** — every preset renders the same empty HeroBrochure skeleton

The user called this "saçmalık" (nonsense). Correctly so. **Do not repeat this pattern.**

---

## 2 · USER'S ORIGINAL INTENT

Quoting Emre's own words from the prior session:

> "Şu şöyle olur, uyumlu teknolojileri bul, uyumlu tasarımları bul, beraber çalış iyi şeyleri bul, onlardan karma combo yapıştır bizim amacımız buydu zaten. Her sektörde zaten bunun için combo, teknoloji combo'ları oluşturacaktı."

Translation: "Find compatible technologies. Find compatible designs. Take the best parts. Make combo-paste from them. Every sector should get its own combo of technology."

**The user wanted combinatorial design:** Take real, working reference designs (fraxbit + wearebrand + mdx.so + 14 existing sector templates) and combine them with sector-specific content to produce visually distinct, production-ready preset pages. The previous session produced the framework for this but did not do the actual combination work.

---

## 3 · YOUR MISSION

Produce **real, visually distinct, content-rich Next.js pages** for each of the 60 preset IDs. Priority:

### Priority 1 — Fatih Bey preset (this must work first)

File: `catalog/presets/mucevher-editorial-luxury.yaml`

Produce a production-grade jewelry e-commerce page that Fatih Bey can receive on 8 May. Must include:
- Hero with real jewelry sample content (collection name, season, tagline, CTA)
- 3D product viewer using drei MeshTransmissionMaterial (diamond refraction simulation)
- Masonry product gallery (at least 12 placeholder products with real-seeming names and prices)
- Variable font scroll animation (Fraunces opsz 9→144)
- Blur-36px text reveal on headings (adapt wearebrand pattern, MIT-safe rewrite)
- Tobacco + Pearl palette (PL22), NOT PL1 dark+gold
- Category navigation: Alyans, Yüzük, Küpe, Kolye, Bileklik, Pırlanta
- Product detail drawer with spec sheet, favorite toggle, WhatsApp contact
- Footer with KVKK banner, atelier info, certifications

Base references to port from:
- `research-assets/wearebrand_brand.html` (atmosphere + mask-y reveal pattern)
- `templates/14-ultra/index.html` (14 signature techniques, real working code)
- `templates/02-mucevher/index.html` (jewelry content structure)
- `mockups/a-warm-dark/index.html` (warm palette + Fraunces type system)

### Priority 2 — KADIKOY templates (3 Budget-tier presets)

Budget-tier presets for cold-sales to Kadıköy small businesses:
- `catalog/presets/kuafor-minimal-swiss.yaml` (hair salon / barber)
- `catalog/presets/restoran-editorial-print.yaml` (restaurant)
- `catalog/presets/klinik-minimal-swiss.yaml` (clinic)

Each must include: hero + services + team + booking form + WhatsApp widget + Google Maps embed + KVKK. Fast to customize (5-7 day delivery).

### Priority 3 — Flagship tier demonstrators (4 presets)

Show Armut prospects what each tier looks like:
- `insaat-industrial-workwear` (Mid tier CRM) — hazard stripe + Ankara project map + barometer KPI
- `eticaret-immersive-3d` (Premium tier) — Three.js product viewer + AR button + custom cursor
- `gayrimenkul-editorial-luxury` (Mid-Premium) — property showcase + virtual tour placeholder
- `otel-maximalist-atmospheric` (Premium) — atmospheric drift bg + room gallery + booking flow

### Priority 4 — Remaining 52 presets

After Priority 1-3 pass user approval, generate remaining 52 presets as variants of the validated flagship presets.

---

## 4 · REQUIRED READING (do this first, in order)

Read these 8 files before writing any code. Confirm understanding in a 1-page audit summary.

1. `WORKFLOW.md` — previous session final state, file inventory, gap analysis
2. `ULTRAPLAN.md` — 24-section comprehensive plan (2,226 lines) from previous session
3. `catalog/MATRIX.md` — 10×10 sector × style compatibility grid
4. `catalog/compatibility.yaml` — forbidden ID list + anti-cliché rules
5. `templates/SCRAPED-STACKS-2026.md` — 13 agency tech analysis + 15 signature patterns + CDN catalog
6. `templates/2026-ADVANCED-TECHNIQUES.md` — detailed code for fraxbit/mdx/wearebrand + 10 Codrops-tier patterns
7. `templates/14-ultra/index.html` (660 lines) — 14 signature techniques implemented, real working code
8. `catalog/presets/mucevher-editorial-luxury.yaml` — read this preset YAML, then read the atoms it references in `catalog/atoms/`

After reading, write a Turkish audit summary (1 page max, no code yet):
- What the system does today
- What the critical gap is
- Which 3 preset files you will produce first
- Which reference HTMLs you will port from
- Estimated token and time budget

Wait for user approval before starting production.

---

## 5 · AVAILABLE RESOURCES

### Scraped real working HTMLs (reuse these)

```
research-assets/
├── _fraxbit_home.html          (268KB — Awwwards HM, WordPress + GSAP 3.12 + Lenis 0.2.28)
├── wearebrand_home.html        (121KB — Awwwards SOTD, Barba + Lenis 1.2.3 + custom animations)
├── wearebrand_brand.html       (57KB — /brand premium landing, porthole + mask-y reveal)
├── theoberry_home.html         (163KB — Framer portfolio)
├── _research/mdx_home.html     (MDX.so — Vimeo bg "3D" + clip-path reveal)
├── _research/marcelo_*.html    (Marcelo Design X)
└── wab/
    ├── wearebrand-animations.js (30KB — 6 MIT-safe extractable patterns)
    ├── wearebrand-custom.css
    └── lenis.css
```

### Sector templates (port to Next.js routes)

```
templates/
├── 01-insaat/index.html         (construction, concrete + ozalit blueprint, 258 lines)
├── 02-mucevher/index.html       (jewelry, tobacco+pearl + plum+champagne, 257 lines)
├── 03-kuafor/index.html         (salon, salt+peach + slate+olive, 330 lines)
├── 04-restoran/index.html       (restaurant, salmon+burgundy + olive+tomato, 304 lines)
├── 05-klinik/index.html         (clinic, glacier+sage + cream+forest, 335 lines)
├── 06-eticaret/index.html       (e-commerce, slate+acid + kraft+burst, 360 lines)
├── 07-spa/index.html            (spa, clay+mist + pearl+seafoam, 252 lines)
├── 08-fotograf/index.html       (photography, off-black + cream+black, 332 lines)
├── 09-gayrimenkul/index.html    (real estate, sand+ocean + mist+sunset, 293 lines)
├── 10-otel/index.html           (hotel, terracotta+sky + cool marble, 322 lines)
├── 11-kinetic/index.html        (kinetic agency, Fraunces opsz scroll, 435 lines — REAL GSAP/Lenis implementation)
├── 12-immersive-3d/index.html   (3D, Three.js crystal + scroll camera + 800 particles, 476 lines)
├── 13-maximalist/index.html     (maximalist, atmospheric drift + porthole, 472 lines)
└── 14-ultra/index.html          (660 lines — 14 signature techniques, production-quality)
```

### Mockups (3 high-quality designs, reuse)

```
mockups/
├── a-warm-dark/index.html              (Fraunces + Hanken Grotesk + espresso + coral, score 5/5)
├── b-off-white-editorial/index.html    (Instrument Serif + IBM Plex + newsprint + editorial red)
└── c-concrete-industrial/index.html    (Archivo Black + Stardos Stencil + concrete + hazard)
```

### v2 CRM variants (for insaat-crm presets)

```
v2-blueprint/index.html       (ozalit + Syne + GSAP reveal, 635 lines)
v2-neobrutalist/index.html    (white + cobalt/yellow + Archivo Black + 3px border, 622 lines)
v2-kinetic-data/index.html    (dark + lime/cyan + Bricolage + D3 force network, 786 lines)
v2-immersive-3d/index.html    (Three.js procedural tower + scroll camera, 967 lines)
```

### Existing scaffold + preview-app

```
preview-app/                 (Next.js 16, running at localhost:4200)
scaffold/nextjs-16-base/     (base template, replace generic components)
scaffold.js                  (CLI, works but produces generic output)
catalog/                     (356 YAML, reference but don't expand)
```

### Research documents (sector-specific content sources)

```
C:/Users/EAS/Desktop/armut/Mobilyacı/3d-demo/research/  (241 files)
├── jewelry-watch-3d-showcase.md                    (jewelry 3D)
├── furniture-3d-web-experience-research.md         (furniture)
├── drei-MeshTransmissionMaterial-research.md       (glass/crystal material)
├── ecommerce-supabase-payment-turkey-2026.md       (iyzico + PayTR)
├── accessibility-wcag-aria-2026.md                 (147KB — WCAG 2.2)
├── landing-page-conversion-patterns-2026.md        (108KB)
├── animation-gsap-framer-lenis-masterclass-2026.md
└── ... (240 more)

C:/Users/EAS/Desktop/armut/Mobilyacı/  (23 files — root research)
C:/Users/EAS/Desktop/armut/  (16 root MD files)
```

### Global catalogs

```
C:/Users/EAS/Desktop/armut/FRONTEND-TECHSTACK.md   (82 research index, 526 lines)
C:/Users/EAS/Desktop/armut/3D-TECHSTACK.md          (98 research index, 231 lines)
C:/Users/EAS/Desktop/armut/DESIGN-PATHWAYS.md       (120+ pattern catalog, 381 lines)
C:/Users/EAS/Desktop/armut/SITE-GELISTIRME-PIPELINE.md (8-stage pipeline, 594 lines)
C:/Users/EAS/.claude/CLAUDE.md                      (global rules)
```

---

## 6 · EXECUTION STRATEGY

### Wave 1 — Audit + Base Mapping (single agent, 30 minutes)

Dispatch one general-purpose agent to produce `BASE-MAP.yaml`:
- For each of 60 preset IDs
- Identify the "base HTML" to port from (from templates/, mockups/, research-assets/, or v2-*/)
- Identify the signature techniques to inject (from templates/14-ultra/ or motion-ajans atoms)
- Identify the sector content source (which research docs contain product/service lists)
- Output: `catalog/BASE-MAP.yaml`

### Wave 2 — Priority 1: Fatih Bey preset (3 parallel agents, ~2 hours)

Three agents work in parallel on `mucevher-editorial-luxury`:
- Agent 1: Full page layout in `preview-app/src/presets/mucevher-editorial-luxury/page.tsx` — port `wearebrand_brand.html` atmosphere + mask-y reveal
- Agent 2: 3D product viewer component using drei MeshTransmissionMaterial with real diamond geometry + scroll camera
- Agent 3: Sector content file `content.ts` with 12 product placeholders, 6 categories, 3 team members, KVKK + iyzico checkout structure

Verify: `http://localhost:4200/preview/mucevher-editorial-luxury` shows a complete, distinct jewelry site.

### Wave 3 — Priority 2: KADIKOY Budget presets (3 parallel agents, ~3 hours)

Three agents, one per preset:
- `kuafor-minimal-swiss` — services list, team cards, booking form, WhatsApp
- `restoran-editorial-print` — menu (drop cap + 3-col CSS columns), reservation form
- `klinik-minimal-swiss` — services, doctors, Q&A hero, appointment request

Verify each preset URL shows distinct design from Fatih Bey preset.

### Wave 4 — Priority 3: Flagship tier demonstrators (4 parallel agents, ~3 hours)

- `insaat-industrial-workwear` — hazard stripe + Ankara SVG map + barometer
- `eticaret-immersive-3d` — Three.js product viewer + AR button + custom cursor
- `gayrimenkul-editorial-luxury` — property showcase (port from templates/09-gayrimenkul)
- `otel-maximalist-atmospheric` — atmospheric drift (port from templates/13-maximalist)

### Wave 5 — User checkpoint

User reviews 11 presets (1 + 3 + 4 = 8 + 3 overlap). If approved, Wave 6. If not, iterate.

### Wave 6 — Remaining 52 presets (10-15 parallel agents, ~6 hours)

Each agent generates 3-5 preset variants based on Wave 2-4 validated presets. Faster per preset since templates are established.

### Wave 7 — Polish + Lighthouse + commit + push

---

## 7 · QUALITY CRITERIA (how user will judge success)

A preset is "done" when all of these are true:

1. **Visual distinctiveness** — Opening two preset pages side-by-side in the browser reveals obvious differences: different hero shape, different layout grid, different animation, different content tone. Not just color + font swap.

2. **Real content** — Hero has a real headline (not "Koleksiyon 2026" placeholder). Product/service listings show at least 6-12 items with names, prices, images (placeholder images OK if from public CDN). Navigation has real sector-appropriate items.

3. **Tier visibility** — Premium preset shows features Budget preset does not. For example: Premium has 3D viewer, AR button, custom cursor, scroll camera; Budget has WhatsApp widget, simple form, static hero.

4. **Signature techniques work** — If preset YAML says `motion_ajans: [wearebrand-blur-36px-reveal]`, the actual blur-reveal animation plays on the page. Not just a YAML declaration.

5. **No crashes** — `pnpm dev` renders the preview page 200 OK. No runtime TypeErrors from undefined props.

6. **Mobile responsive** — Viewport 375, 768, 1280 all render correctly. No horizontal scroll. Touch targets ≥ 44px.

7. **Turkish character test passes** — All Turkish characters (ı, İ, ğ, Ş, ç, Ö, Ü) render without glyph fallback.

8. **Performance** — Lighthouse mobile ≥ 85 (Performance + Accessibility + Best Practices + SEO).

9. **Anti-cliché passed** — `scripts/validate-combo.js` confirms no forbidden IDs (TY1, TY2, TY4, TY8, PL1, K1, HR2, H8, HR7, P1, T6, CH1, CH2).

10. **Sector-appropriate** — Jewelry preset shows jewelry. Restaurant preset shows food and menu. Clinic preset shows calm, trustworthy design without aggressive motion.

---

## 8 · TECHNICAL GUARDRAILS

### Do

- Read scraped HTMLs with `cat` or Read tool, port the actual DOM structure to React JSX
- Reuse `templates/14-ultra/index.html` animations via copy-adapt (inline GSAP + Lenis)
- Put preset-specific code in `preview-app/src/presets/{preset-id}/` folder
- Create one unique `content.ts` file per preset with real sample data
- Use `scripts/validate-combo.js` to check every new preset
- Commit after each Wave
- Push to GitHub after each commit
- Keep `LOG.md` updated as you go

### Do not

- Expand catalog/ YAMLs. The catalog is already 356 files. You are not adding to the catalog. You are rendering it.
- Generate more generic placeholder components. The user does not want another layer of abstraction.
- Use `HeroBrochure` as default for all presets. Each preset gets its own hero variant.
- Skip reading scraped HTMLs. They are the source of truth for the "look" that makes each preset distinct.
- Use `console.log` or `any` in TypeScript.
- Copy wearebrand-animations.js verbatim. Use MIT-safe rewrites (the pattern, not the code). Previous session fixed this once for cubic-out easing; maintain that.

### Stack versions (lock)

- Next.js 16 (App Router, Turbopack, React Compiler via `babel-plugin-react-compiler`)
- React 19
- Tailwind v4 (`@theme` directive, CSS-first config)
- GSAP 3.13 (ScrollTrigger, SplitText, ScrambleText — all free since Webflow 2024)
- Lenis 1.3.4 (smooth scroll)
- Framer Motion v12
- Three.js r183 + R3F v9 + drei v10 + postprocessing v3
- shadcn/ui + cmdk + Vaul + Sonner + Radix UI
- TypeScript 5.9 strict

### Port pattern (when converting HTML to Next.js)

```tsx
// templates/14-ultra/index.html has:
//   <section class="hero-porthole">
//     <div class="hero-bg" />
//     <h1 class="scramble">...</h1>
//   </section>
// Port to:

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function HeroPortholeDive({ title, subtitle, bgImage }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=2000',
        pin: true,
        scrub: 1,
      }
    });
    tl.fromTo('.hero-bg', { scale: 1 }, { scale: 6.5 });
    // ... port the rest of the animation 1:1
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
  
  return (
    <section ref={heroRef} className="hero-porthole relative h-screen overflow-hidden">
      <div className="hero-bg absolute inset-0 ..." style={{ backgroundImage: `url(${bgImage})` }} />
      <h1 className="scramble">{title}</h1>
    </section>
  );
}
```

Do this for every signature technique in every preset that references it.

---

## 9 · DELIVERABLE CHECKLIST

When you are done, the following should be true:

- [ ] `preview-app/src/presets/mucevher-editorial-luxury/page.tsx` exists with full working page
- [ ] `preview-app/src/presets/mucevher-editorial-luxury/content.ts` has 12+ product entries
- [ ] `http://localhost:4200/preview/mucevher-editorial-luxury` renders a complete jewelry site
- [ ] A viewer from outside the project can open the URL and say "this is a jewelry site" in under 5 seconds without looking at code
- [ ] Lighthouse mobile score ≥ 85 on this page
- [ ] Same criteria met for `kuafor-minimal-swiss`, `restoran-editorial-print`, `klinik-minimal-swiss`
- [ ] Same criteria met for 4 flagship tier presets
- [ ] 8 preset pages are visibly distinct from each other when viewed side-by-side
- [ ] Commit + push to GitHub main
- [ ] `LOG.md` updated with Wave 1-4 results
- [ ] User approval checkpoint reached before Wave 6

---

## 10 · ENTRY COMMAND

After reading this prompt and the 8 required files, respond with ONLY:

```
AUDIT HAZIR. [Your 1-page Turkish audit summary]

WAVE 1 BAŞLAT? (Evet/Hayır)
```

Do not write code yet. Do not start agents yet. Wait for user's "Evet".

---

## END OF PROMPT

User will paste this entire document (from "## META INSTRUCTIONS" to "END OF PROMPT") into a fresh Claude Code session. Repository state at handoff: 11 commits, clean working tree, GitHub in sync, dev servers on 4100 (test-mucevher-v2) and 4200 (preview-app) may still be running.
