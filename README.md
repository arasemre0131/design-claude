# design-claude — CONSTRUO · 4 Tasarım Varyantı

> İnşaat CRM panelinin aynı içerikle 4 farklı teknoloji stack'inde, birbirinden **gerçekten farklı** tasarım dilleriyle denenmiş hali. Freeman/Kadıköy sitelerindeki dark+gold+glass klişeme saplanmamak için kasıtlı olarak yan yana kondu.

## Dosyalar

| Varyant | Yol | Tek satır özet |
|---------|-----|----------------|
| **v1 (iptal)** | `index.html` | Editorial Luxury + Dark OLED — Freeman + Kadıköy ile **aynı recipe**, kendi klişem. Karşılaştırma için duruyor. |
| **v2-blueprint** | `v2-blueprint/index.html` | Ozalit / teknik çizim. Açık zemin, draft çizgileri, isometric kule, Gantt schedule, kot çizgileri. GSAP reveal. |
| **v2-neobrutalist** | `v2-neobrutalist/index.html` | Beyaz + renk blokları + 3px siyah border + 7px sharp shadow + rotasyonlu sticker. Archivo Black dev başlık. |
| **v2-kinetic-data** | `v2-kinetic-data/index.html` | Dark arka plan ama altın yok. Lenis smooth scroll + GSAP + D3 force-directed lead-agent network + kinetic marquee. Lime + cyan + magenta. |
| **v2-immersive-3d** | `v2-immersive-3d/index.html` | Three.js procedural kule (5 kat = 5 pipeline stage) + scroll-based kamera + particles + sun/rim/accent lights. Glass UI overlay. |

## Aç

```bash
# Hepsini tek seferde:
start "" "C:/Users/EAS/Desktop/armut/research/design-claude/v2-blueprint/index.html"
start "" "C:/Users/EAS/Desktop/armut/research/design-claude/v2-neobrutalist/index.html"
start "" "C:/Users/EAS/Desktop/armut/research/design-claude/v2-kinetic-data/index.html"
start "" "C:/Users/EAS/Desktop/armut/research/design-claude/v2-immersive-3d/index.html"
```

Hepsi tek HTML + CDN, internet şart.

## Niçin 4 tane

Tekrar eden pattern'den kurtulmak için. Her varyant **ayrı techstack + ayrı font + ayrı palette + ayrı layout dili** kullanıyor:

| Eksen | v2-blueprint | v2-neobrutalist | v2-kinetic-data | v2-immersive-3d |
|-------|--------------|-----------------|-----------------|-----------------|
| Bg | Kağıt `#E6EDF2` | Bej-beyaz + dots `#FFF8EB` | Dark `#08090C` | Dark `#0B0D10` |
| Accent | Blueprint `#0F4C75` + warn | Cobalt + yellow + red + green | Lime + cyan + magenta | Orange + cool-blue + warm-amber |
| Typography (display) | Syne 800 italic | Archivo Black | Bricolage Grotesque italic | DM Serif Display italic |
| Typography (mono) | JetBrains Mono | JetBrains Mono | JetBrains Mono | JetBrains Mono |
| Layout | Title block + scope + Gantt + elevation | Block + sticker + zigzag + marquee | Rail + ticker + KPI grid + force net | Fixed 3D canvas + glass overlay + scroll cam |
| Library | GSAP + ScrollTrigger | None (CSS + vanilla JS) | Lenis + GSAP + SplitText + D3 | Three.js + GSAP ScrollTrigger |
| Hareket | Reveal + gantt bar grow | Magnetic hover + count-up | Smooth scroll + marquee reactive + force sim | Kule rotasyon + particle + scroll-based kamera + loader |
| Sektör bağı | DOĞRUDAN (ozalit) | Yok (genel neobrutalist) | Data-ops bağı | Dolaylı (kule metafor) |

## Kullanılan research dosyaları

Bu sefer gerçekten taradım (previous default yerine):

| Research | Ne verdi |
|----------|----------|
| `animation-gsap-framer-lenis-masterclass-2026.md` | Lenis smooth + GSAP ScrollTrigger timeline pattern |
| `css-scroll-driven-view-transitions-2026.md` | ScrollTrigger ile scroll-locked camera path |
| `micro-interactions-hover-cursor-2026.md` | Magnetic hover + counter + reveal stagger |
| `3D-TECHSTACK.md` + R3F research | Three.js procedural building + fog + PCF shadow + emissive |
| `landing-page-conversion-patterns-2026.md` | KPI bento grid + hero eyebrow + CTA dual-button |
| `gradient-glass-visual-effects-2026.md` | KAÇINILACAK liste — gold gradient, purple, rounded-2xl |

## Sırada ne?

Sen bir tanesini (veya hybrid: "v2-blueprint'in üstüne v2-immersive-3d'nin scroll kamera fikri" gibi) seç — onu `insaat-crm/apps/web` altında Next.js 16 + shadcn/ui component'lerine dönüştürürüz. Claude Design'a da yüklemek istersen (claude.ai/design tarayıcıda) handoff bundle → kod yoluyla aynı sonuca ulaşılabilir.

## Global CLAUDE.md değişikliği

Claude Design bloğu şişmişti — kısaltıldı. Yerine **"her tasarım işi öncesi FRONTEND-TECHSTACK.md + 3D-TECHSTACK.md tara, aynı recipe'yi tekrar kullanma"** meta-kuralı eklendi. Bundan sonra her "site yap" istediğinde önce stack'i tarayıp varyant önerileri çıkarıp sunmam lazım.
