/**
 * atom-resolver.ts
 * ----------------------------------------------------------------
 * Preset YAML icindeki atom ID'leri (orn "HR11", "H2", "K2") → bu app icindeki
 * React component isimlerine maple.
 *
 * Agent J (layout), Agent K (hero/media), Agent L (form/interaction) bu tabloyu
 * takip ederek src/components/atoms/ altina component yazar.
 *
 * Component yoksa PresetRenderer stub kullanir — "Component bekleniyor: HR11" gibi
 * placeholder cizer.
 */

export type AtomCategory =
  | "palette"
  | "typography"
  | "header"
  | "nav"
  | "hero"
  | "kpi"
  | "footer"
  | "table"
  | "form"
  | "modal"
  | "chat"
  | "chart"
  | "pipeline"
  | "layout"
  | "motion"
  | "3d";

export type AtomMapping = {
  id: string;
  category: AtomCategory;
  componentName: string;
  description: string;
};

/* ================================================================ */
/*  Atom → Component Registry                                        */
/*  (agent/J/K/L bu dosyayi guncelleyecek, yeni component ekledikce) */
/* ================================================================ */

export const ATOM_REGISTRY: Record<string, AtomMapping> = {
  // ---------- HEADER (10 atom) ----------
  H1:  { id: "H1",  category: "header", componentName: "HeaderHazardPlate",    description: "Plate + hazard strip (brutalist)" },
  H2:  { id: "H2",  category: "header", componentName: "HeaderMastheadCentered", description: "Masthead centered (editorial)" },
  H3:  { id: "H3",  category: "header", componentName: "HeaderSidebarRail",    description: "Sidebar rail + breadcrumb (Swiss)" },
  H4:  { id: "H4",  category: "header", componentName: "HeaderStickyNav",      description: "Sticky top nav + scroll-hide" },
  H5:  { id: "H5",  category: "header", componentName: "HeaderTickerMarquee",  description: "Ticker marquee top bar" },
  H6:  { id: "H6",  category: "header", componentName: "HeaderHamburgerOverlay", description: "Hamburger full-screen overlay" },
  H7:  { id: "H7",  category: "header", componentName: "HeaderFloatingPill",   description: "Floating pill center nav" },
  H8:  { id: "H8",  category: "header", componentName: "HeaderMixBlendDiff",   description: "YASAK — mix-blend-mode difference" },
  H9:  { id: "H9",  category: "header", componentName: "HeaderBlueprintTabs",  description: "Blueprint-style tabs" },
  H10: { id: "H10", category: "header", componentName: "HeaderMinimalMark",    description: "Minimal wordmark + icon cluster" },

  // ---------- NAV (10 atom) ----------
  N1:  { id: "N1",  category: "nav", componentName: "NavHamburgerDrawer", description: "Hamburger drawer" },
  N2:  { id: "N2",  category: "nav", componentName: "NavHorizontalTabs",  description: "Horizontal tabs underline" },
  N3:  { id: "N3",  category: "nav", componentName: "NavSidebarRail",     description: "Sidebar rail (vertical)" },
  N4:  { id: "N4",  category: "nav", componentName: "NavMegaMenu",        description: "Mega menu full-width" },
  N5:  { id: "N5",  category: "nav", componentName: "NavBottomBarMobile", description: "Bottom bar mobile" },
  N6:  { id: "N6",  category: "nav", componentName: "NavStickySubmenu",   description: "Sticky submenu (scroll-spy)" },
  N7:  { id: "N7",  category: "nav", componentName: "NavCommandPalette",  description: "Cmdk ⌘K command palette" },
  N8:  { id: "N8",  category: "nav", componentName: "NavBreadcrumbRail",  description: "Breadcrumb rail" },
  N9:  { id: "N9",  category: "nav", componentName: "NavFloatingDock",    description: "Floating dock (magnified)" },
  N10: { id: "N10", category: "nav", componentName: "NavContextualSide",  description: "Contextual side panel" },

  // ---------- HERO (17 atom) ----------
  HR1:  { id: "HR1",  category: "hero", componentName: "HeroSplitLeftCopy",       description: "Split left copy + right media" },
  HR2:  { id: "HR2",  category: "hero", componentName: "HeroSplitCenterCarousel", description: "YASAK — split + 5-slide carousel" },
  HR3:  { id: "HR3",  category: "hero", componentName: "HeroFullBleedVideo",      description: "Full-bleed video + overlay" },
  HR4:  { id: "HR4",  category: "hero", componentName: "HeroPinSpinDataOverlay",  description: "Pin-spin + data overlay" },
  HR5:  { id: "HR5",  category: "hero", componentName: "HeroSignBoardStencil",    description: "Sign-board stencil industrial" },
  HR6:  { id: "HR6",  category: "hero", componentName: "HeroMarqueeKinetic",      description: "Kinetic marquee text" },
  HR7:  { id: "HR7",  category: "hero", componentName: "HeroDashboardPreview",    description: "YASAK — dashboard as hero" },
  HR8:  { id: "HR8",  category: "hero", componentName: "HeroMagazineColumns",     description: "Magazine 3-col" },
  HR9:  { id: "HR9",  category: "hero", componentName: "HeroMaskSVGReveal",       description: "SVG mask reveal" },
  HR10: { id: "HR10", category: "hero", componentName: "HeroParallaxLayers",      description: "Parallax layer stack" },
  HR11: { id: "HR11", category: "hero", componentName: "HeroBrochureCover",       description: "Brochure cover grid (editorial)" },
  HR12: { id: "HR12", category: "hero", componentName: "Hero3DModelCenter",       description: "3D model centered (R3F)" },
  HR13: { id: "HR13", category: "hero", componentName: "HeroBlueprintGridOzalit", description: "Blueprint grid ozalit" },
  HR14: { id: "HR14", category: "hero", componentName: "HeroGaussianSplatBG",     description: "Gaussian splat BG" },
  HR15: { id: "HR15", category: "hero", componentName: "HeroTypeOnlyDisplay",     description: "Type-only display (no media)" },
  HR16: { id: "HR16", category: "hero", componentName: "HeroTickerSplitCopy",     description: "Ticker + split copy" },
  HR17: { id: "HR17", category: "hero", componentName: "HeroInteractiveMap",      description: "Interactive map hero" },

  // ---------- KPI (13 atom) ----------
  K1:  { id: "K1",  category: "kpi", componentName: "KpiBentoGlass",       description: "YASAK — bento glass" },
  K2:  { id: "K2",  category: "kpi", componentName: "KpiBandWithRules",    description: "Band + horizontal rules" },
  K3:  { id: "K3",  category: "kpi", componentName: "KpiChipRowColored",   description: "Chip row colored blocks" },
  K4:  { id: "K4",  category: "kpi", componentName: "KpiLargeNumberStack", description: "Large number stack" },
  K5:  { id: "K5",  category: "kpi", componentName: "KpiRingProgress",     description: "Ring progress" },
  K6:  { id: "K6",  category: "kpi", componentName: "KpiSparklineList",    description: "Sparkline list" },
  K7:  { id: "K7",  category: "kpi", componentName: "KpiTableCompact",     description: "Table compact" },
  K8:  { id: "K8",  category: "kpi", componentName: "KpiTabsComparison",   description: "Tabs comparison" },
  K9:  { id: "K9",  category: "kpi", componentName: "KpiCounterAnimated",  description: "Animated counter (number morph)" },
  K10: { id: "K10", category: "kpi", componentName: "KpiMinimalHair",      description: "Minimal hairline metrics" },
  K11: { id: "K11", category: "kpi", componentName: "KpiBigTileWithDelta", description: "Big tile + delta indicator" },
  K12: { id: "K12", category: "kpi", componentName: "KpiOzalitMetricStrip", description: "Ozalit metric strip (blueprint)" },
  K13: { id: "K13", category: "kpi", componentName: "KpiChartEmbed",       description: "KPI with chart embed" },

  // ---------- LAYOUT (11 atom) ----------
  L1:  { id: "L1",  category: "layout", componentName: "Layout12ColSwiss",      description: "12-col Swiss grid" },
  L2:  { id: "L2",  category: "layout", componentName: "LayoutAsymmetricHalves", description: "Asymmetric halves (60/40)" },
  L3:  { id: "L3",  category: "layout", componentName: "LayoutMondrianBox",     description: "Mondrian box-in-box" },
  L4:  { id: "L4",  category: "layout", componentName: "LayoutStackedSections", description: "Stacked sections (single col)" },
  L5:  { id: "L5",  category: "layout", componentName: "LayoutThreeColEditorial", description: "3-col editorial" },
  L6:  { id: "L6",  category: "layout", componentName: "LayoutCenterSingleCol", description: "Center single col (meditatif)" },
  L7:  { id: "L7",  category: "layout", componentName: "LayoutSidebarContent",  description: "Sidebar + content" },
  L8:  { id: "L8",  category: "layout", componentName: "LayoutMasonry",         description: "Masonry 3-col" },
  L9:  { id: "L9",  category: "layout", componentName: "LayoutCardDeckCarousel", description: "Card deck carousel" },
  L10: { id: "L10", category: "layout", componentName: "LayoutDataDenseGrid",   description: "Data-dense grid (dashboard)" },
  L11: { id: "L11", category: "layout", componentName: "LayoutBentoAsymm",      description: "Bento 2.0 asymmetric no-glass" },

  // ---------- FOOTER (8 atom) ----------
  FT1: { id: "FT1", category: "footer", componentName: "FooterMinimal2Line",   description: "Minimal 2-line" },
  FT2: { id: "FT2", category: "footer", componentName: "FooterSitemap4Col",    description: "Sitemap 4-col" },
  FT3: { id: "FT3", category: "footer", componentName: "FooterNewsletterSplit", description: "Newsletter split" },
  FT4: { id: "FT4", category: "footer", componentName: "FooterColophon",       description: "Colophon editorial credits" },
  FT5: { id: "FT5", category: "footer", componentName: "FooterBigWordmark",    description: "Big wordmark + links" },
  FT6: { id: "FT6", category: "footer", componentName: "FooterIndustrialNum",  description: "Industrial numeric footer" },
  FT7: { id: "FT7", category: "footer", componentName: "FooterAddressCard",    description: "Address card + map" },
  FT8: { id: "FT8", category: "footer", componentName: "FooterHorizontalRule", description: "Horizontal rule separators" },

  // ---------- TABLE (8 atom) ----------
  T1: { id: "T1", category: "table", componentName: "TableStandardRows",  description: "Standard rows + alternating" },
  T2: { id: "T2", category: "table", componentName: "TableStickyHeader",  description: "Sticky header + scroll" },
  T3: { id: "T3", category: "table", componentName: "TableSpecSheet",     description: "Spec sheet (sertifika/ayar)" },
  T4: { id: "T4", category: "table", componentName: "TableCompareCols",   description: "Compare columns" },
  T5: { id: "T5", category: "table", componentName: "TableInlineEdit",    description: "Inline edit cells" },
  T6: { id: "T6", category: "table", componentName: "TableCardGrid",      description: "YASAK — card grid olarak kullanilamaz" },
  T7: { id: "T7", category: "table", componentName: "TableDenseDataGrid", description: "Dense data grid (TanStack)" },
  T8: { id: "T8", category: "table", componentName: "TableStatList",      description: "Stat list (editorial)" },

  // ---------- FORM (8 atom) ----------
  F1: { id: "F1", category: "form", componentName: "FormSingleColTall",   description: "Single-col tall" },
  F2: { id: "F2", category: "form", componentName: "FormTwoColSplit",     description: "Two-col split" },
  F3: { id: "F3", category: "form", componentName: "FormWizardSteps",     description: "Wizard 4-step" },
  F4: { id: "F4", category: "form", componentName: "FormInlineEdit",      description: "Inline edit (cart/favorite)" },
  F5: { id: "F5", category: "form", componentName: "FormFloatingLabels",  description: "Floating labels" },
  F6: { id: "F6", category: "form", componentName: "FormStepperProgress", description: "Stepper + progress bar" },
  F7: { id: "F7", category: "form", componentName: "FormAccordionSections", description: "Accordion sections" },
  F8: { id: "F8", category: "form", componentName: "FormSidebarSticky",   description: "Sidebar sticky form" },

  // ---------- MODAL (6 atom) ----------
  M1: { id: "M1", category: "modal", componentName: "ModalCentered",     description: "Centered dialog" },
  M2: { id: "M2", category: "modal", componentName: "ModalSideSheet",    description: "Side sheet (drawer)" },
  M3: { id: "M3", category: "modal", componentName: "ModalBottomSheet",  description: "Bottom sheet (vaul)" },
  M4: { id: "M4", category: "modal", componentName: "ModalFullscreen",   description: "Fullscreen overlay" },
  M5: { id: "M5", category: "modal", componentName: "ModalCommand",      description: "Command menu (cmdk)" },
  M6: { id: "M6", category: "modal", componentName: "ModalContextual",   description: "Contextual inline" },

  // ---------- CHAT (6 atom) ----------
  C1: { id: "C1", category: "chat", componentName: "ChatWhatsAppWidget",   description: "WhatsApp widget (sticky)" },
  C2: { id: "C2", category: "chat", componentName: "ChatLivePanel",        description: "Live chat panel" },
  C3: { id: "C3", category: "chat", componentName: "ChatEmailThreaded",    description: "Email threaded (konsiyerj)" },
  C4: { id: "C4", category: "chat", componentName: "ChatBotTyping",        description: "Bot typing indicator" },
  C5: { id: "C5", category: "chat", componentName: "ChatInlineForm",       description: "Inline contact form" },
  C6: { id: "C6", category: "chat", componentName: "ChatFloatingBubbles",  description: "Floating bubble trigger" },

  // ---------- CHART (12 atom) ----------
  CH1:  { id: "CH1",  category: "chart", componentName: "ChartChartJsSmooth",   description: "YASAK — Chart.js smooth default" },
  CH2:  { id: "CH2",  category: "chart", componentName: "ChartApexDonut",       description: "YASAK — ApexCharts donut default" },
  CH3:  { id: "CH3",  category: "chart", componentName: "ChartNivoGeometric",   description: "Nivo geometric colorful" },
  CH4:  { id: "CH4",  category: "chart", componentName: "ChartVisxCustom",      description: "Visx custom D3 layer" },
  CH5:  { id: "CH5",  category: "chart", componentName: "ChartEchartsDense",    description: "Echarts dense (dashboard)" },
  CH6:  { id: "CH6",  category: "chart", componentName: "ChartColumnBarElev",   description: "Column bar elevation (blueprint)" },
  CH7:  { id: "CH7",  category: "chart", componentName: "ChartLineSparkline",   description: "Line sparkline compact" },
  CH8:  { id: "CH8",  category: "chart", componentName: "ChartAreaGradient",    description: "Area gradient fill" },
  CH9:  { id: "CH9",  category: "chart", componentName: "ChartHeatmapGrid",     description: "Heatmap grid (calendar)" },
  CH10: { id: "CH10", category: "chart", componentName: "ChartRadarSpider",     description: "Radar/spider comparison" },
  CH11: { id: "CH11", category: "chart", componentName: "ChartGaugeSpeedometer", description: "Gauge/speedometer" },
  CH12: { id: "CH12", category: "chart", componentName: "ChartSvgEditorialHand", description: "SVG editorial hand-drawn" },

  // ---------- PIPELINE (10 atom) ----------
  P1:  { id: "P1",  category: "pipeline", componentName: "PipelineClassicKanban", description: "YASAK — klasik Kanban globally" },
  P2:  { id: "P2",  category: "pipeline", componentName: "PipelineBlueprintStepDiag", description: "Blueprint step diagonal" },
  P3:  { id: "P3",  category: "pipeline", componentName: "PipelineHorizontalTimeline", description: "Horizontal timeline" },
  P4:  { id: "P4",  category: "pipeline", componentName: "PipelineVerticalSteps", description: "Vertical steps" },
  P5:  { id: "P5",  category: "pipeline", componentName: "PipelineNumberedCircle", description: "Numbered circle chain" },
  P6:  { id: "P6",  category: "pipeline", componentName: "PipelineProgressBar",   description: "Progress bar segmented" },
  P7:  { id: "P7",  category: "pipeline", componentName: "PipelineChevronFlow",   description: "Chevron arrow flow" },
  P8:  { id: "P8",  category: "pipeline", componentName: "PipelineOrbitalSteps",  description: "Orbital / radial steps" },
  P9:  { id: "P9",  category: "pipeline", componentName: "PipelineAccordionSteps", description: "Accordion expanding steps" },
  P10: { id: "P10", category: "pipeline", componentName: "PipelineStickerBlocks", description: "Neo-brutal sticker blocks" },

  // ---------- MOTION (12 atom) ----------
  MO1:  { id: "MO1",  category: "motion", componentName: "MotionGsapScrollTrigger", description: "GSAP ScrollTrigger" },
  MO2:  { id: "MO2",  category: "motion", componentName: "MotionLenisSmooth",       description: "Lenis smooth scroll" },
  MO3:  { id: "MO3",  category: "motion", componentName: "MotionCssScrollDriven",   description: "CSS native scroll-driven" },
  MO4:  { id: "MO4",  category: "motion", componentName: "MotionFramerLayoutId",    description: "Framer layoutId morph" },
  MO5:  { id: "MO5",  category: "motion", componentName: "MotionSpringPhysics",     description: "react-spring physics" },
  MO6:  { id: "MO6",  category: "motion", componentName: "MotionMagneticCursor",    description: "Magnetic cursor elastic" },
  MO7:  { id: "MO7",  category: "motion", componentName: "MotionTextRevealBlur",    description: "Text reveal blur (wearebrand)" },
  MO8:  { id: "MO8",  category: "motion", componentName: "MotionMarqueeTicker",     description: "Marquee ticker infinite" },
  MO9:  { id: "MO9",  category: "motion", componentName: "MotionPinScrub",          description: "Pin + scrub section" },
  MO10: { id: "MO10", category: "motion", componentName: "MotionPrintFirstReduce",  description: "Print-first / no-motion" },
  MO11: { id: "MO11", category: "motion", componentName: "MotionScrollJackAggress", description: "YASAK — scroll-jack agresif" },
  MO12: { id: "MO12", category: "motion", componentName: "MotionTheatreKeyframe",   description: "Theatre.js keyframe" },

  // ---------- 3D (15 atom) ----------
  "3D-01-drei-envmap":           { id: "3D-01-drei-envmap",           category: "3d", componentName: "Drei3DEnvMap",          description: "drei EnvMap (HDRI)" },
  "3D-02-drei-orbitcontrols":    { id: "3D-02-drei-orbitcontrols",    category: "3d", componentName: "Drei3DOrbitControls",   description: "drei OrbitControls" },
  "3D-03-drei-presentationcontrols": { id: "3D-03-drei-presentationcontrols", category: "3d", componentName: "Drei3DPresentationControls", description: "drei PresentationControls" },
  "3D-04-drei-contactshadows":   { id: "3D-04-drei-contactshadows",   category: "3d", componentName: "Drei3DContactShadows", description: "drei ContactShadows" },
  "3D-05-drei-html":             { id: "3D-05-drei-html",             category: "3d", componentName: "Drei3DHtmlOverlay",    description: "drei Html (DOM in 3D)" },
  "3D-06-drei-text3d":           { id: "3D-06-drei-text3d",           category: "3d", componentName: "Drei3DText3D",         description: "drei Text3D (extruded)" },
  "3D-07-drei-scrollcontrols":   { id: "3D-07-drei-scrollcontrols",   category: "3d", componentName: "Drei3DScrollControls", description: "drei ScrollControls" },
  "3D-08-drei-meshtransmission": { id: "3D-08-drei-meshtransmission", category: "3d", componentName: "Drei3DMeshTransmission", description: "drei MeshTransmissionMaterial (cam/kristal/elmas)" },
  "3D-09-postprocessing-bloom":  { id: "3D-09-postprocessing-bloom",  category: "3d", componentName: "Post3DBloom",          description: "Postprocessing Bloom" },
  "3D-10-postprocessing-dof":    { id: "3D-10-postprocessing-dof",    category: "3d", componentName: "Post3DDepthOfField",   description: "Postprocessing DepthOfField" },
  "3D-11-gaussian-splat":        { id: "3D-11-gaussian-splat",        category: "3d", componentName: "GaussianSplatViewer",  description: "gsplat viewer (real-world scan)" },
  "3D-12-gltf-draco-ktx2":       { id: "3D-12-gltf-draco-ktx2",       category: "3d", componentName: "GltfDracoKtx2Loader",  description: "GLTF + Draco + KTX2 compressed loader" },
  "3D-13-rapier-physics":        { id: "3D-13-rapier-physics",        category: "3d", componentName: "RapierPhysicsWorld",   description: "@react-three/rapier WASM physics" },
  "3D-14-spline-embed":          { id: "3D-14-spline-embed",          category: "3d", componentName: "SplineEmbedScene",     description: "Spline embed (no-code 3D)" },
  "3D-15-model-viewer":          { id: "3D-15-model-viewer",          category: "3d", componentName: "ModelViewerWeb",       description: "<model-viewer> Web Component" },
};

/* ================================================================ */
/*  Concrete React component bindings                                */
/*  Metadata (ATOM_REGISTRY) ayri, gerçek component burada.          */
/*  Mevcut olmayan atomlar createPlaceholder fallback kullanir.      */
/* ================================================================ */

import type { ComponentType } from "react";
import { HeroBrochure } from "@/components/hero/HeroBrochure";
import { HeroSignBoardRotated } from "@/components/hero/HeroSignBoardRotated";
import { HeroInteractiveMap } from "@/components/hero/HeroInteractiveMap";
import { HeroKineticSerif } from "@/components/hero/HeroKineticSerif";
import { HeroImmersive3D } from "@/components/hero/HeroImmersive3D";
import { HeroZeroReceipt } from "@/components/hero/HeroZeroReceipt";
import { PlateHeader } from "@/components/chrome/PlateHeader";
import { MastheadCentered } from "@/components/chrome/MastheadCentered";
import { SidebarRail } from "@/components/chrome/SidebarRail";
import { BottomSheet } from "@/components/interaction/BottomSheet";
import { InlineExpand } from "@/components/interaction/InlineExpand";
import { WizardSteps } from "@/components/interaction/WizardSteps";
import { createPlaceholder } from "./atom-placeholder";

export type ResolvedComponent = ComponentType<Record<string, unknown>>;

/**
 * Atom ID → React component binding.
 * Her atom burada listelenir; eksik binding createPlaceholder ile stub alir.
 * Gercek component eklendikce placeholder'i replace et.
 *
 * PALETTE (PL*) ve TYPOGRAPHY (TY*) atomlari component RENDER ETMEZ — token
 * saglayici. Placeholder'lar safety net: resolveAtom('PL22') hata vermesin.
 */
export const ATOM_COMPONENTS: Record<string, ResolvedComponent> = {
  // === HERO (17) — 6 concrete, 11 placeholder ============================
  HR1: HeroKineticSerif as ResolvedComponent,
  HR2: createPlaceholder("HR2", "Hero Split (forbidden in most)"),
  HR3: createPlaceholder("HR3", "Video Full-Bleed"),
  HR4: HeroImmersive3D as ResolvedComponent,
  HR5: HeroSignBoardRotated as ResolvedComponent,
  HR6: createPlaceholder("HR6", "Newspaper Hed + Deck"),
  HR7: createPlaceholder("HR7", "Dashboard-as-Hero"),
  HR8: createPlaceholder("HR8", "Magazine 3-Col"),
  HR9: HeroInteractiveMap as ResolvedComponent,
  HR10: createPlaceholder("HR10", "Parallax Layers"),
  HR11: HeroBrochure as ResolvedComponent,
  HR12: createPlaceholder("HR12", "3D Model Centered"),
  HR13: createPlaceholder("HR13", "Blueprint Grid"),
  HR14: HeroZeroReceipt as ResolvedComponent,
  HR15: createPlaceholder("HR15", "Type-Only Display"),
  HR16: createPlaceholder("HR16", "Ticker Split Copy"),
  HR17: createPlaceholder("HR17", "Interactive Map Alt"),

  // === HEADER (10) — 3 concrete, 7 placeholder ===========================
  H1: PlateHeader as ResolvedComponent,
  H2: MastheadCentered as ResolvedComponent,
  H3: SidebarRail as ResolvedComponent,
  H4: createPlaceholder("H4", "Sticky Top Nav"),
  H5: createPlaceholder("H5", "Ticker Marquee"),
  H6: createPlaceholder("H6", "Hamburger Overlay"),
  H7: createPlaceholder("H7", "Floating Pill"),
  H8: createPlaceholder("H8", "Mix-Blend-Diff (often forbidden)"),
  H9: createPlaceholder("H9", "Blueprint Tabs"),
  H10: createPlaceholder("H10", "Minimal Wordmark"),

  // === NAV (10) — placeholder ============================================
  N1: createPlaceholder("N1", "Hamburger Drawer"),
  N2: createPlaceholder("N2", "Horizontal Tabs Underline"),
  N3: createPlaceholder("N3", "Sidebar Rail Vertical"),
  N4: createPlaceholder("N4", "Mega Menu"),
  N5: createPlaceholder("N5", "Bottom Bar Mobile"),
  N6: createPlaceholder("N6", "Sticky Submenu"),
  N7: createPlaceholder("N7", "Command Palette"),
  N8: createPlaceholder("N8", "Breadcrumb Rail"),
  N9: createPlaceholder("N9", "Floating Dock"),
  N10: createPlaceholder("N10", "Contextual Side"),

  // === KPI (13) — placeholder ============================================
  K1: createPlaceholder("K1", "Bento Glass (forbidden)"),
  K2: createPlaceholder("K2", "Band + Rules"),
  K3: createPlaceholder("K3", "Chip Row"),
  K4: createPlaceholder("K4", "Large Number Stack"),
  K5: createPlaceholder("K5", "Ring Progress"),
  K6: createPlaceholder("K6", "Sparkline List"),
  K7: createPlaceholder("K7", "Table Compact"),
  K8: createPlaceholder("K8", "Tabs Comparison"),
  K9: createPlaceholder("K9", "Counter Animated"),
  K10: createPlaceholder("K10", "Minimal Hairline"),
  K11: createPlaceholder("K11", "Postcard Stack"),
  K12: createPlaceholder("K12", "Ozalit Metric Strip"),
  K13: createPlaceholder("K13", "Chart Embed"),

  // === LAYOUT (11) — placeholder =========================================
  L1: createPlaceholder("L1", "12-Col Swiss"),
  L2: createPlaceholder("L2", "Asymmetric Halves"),
  L3: createPlaceholder("L3", "Mondrian Box"),
  L4: createPlaceholder("L4", "Stacked Sections"),
  L5: createPlaceholder("L5", "3-Col Editorial"),
  L6: createPlaceholder("L6", "Center Single Col"),
  L7: createPlaceholder("L7", "Sidebar + Content"),
  L8: createPlaceholder("L8", "Masonry 3-Col"),
  L9: createPlaceholder("L9", "Card Deck Carousel"),
  L10: createPlaceholder("L10", "Data-Dense Grid"),
  L11: createPlaceholder("L11", "Bento 2.0 Asymm"),

  // === FOOTER (8) — placeholder ==========================================
  FT1: createPlaceholder("FT1", "Minimal 2-Line"),
  FT2: createPlaceholder("FT2", "Sitemap 4-Col"),
  FT3: createPlaceholder("FT3", "Newsletter Split"),
  FT4: createPlaceholder("FT4", "Colophon Credits"),
  FT5: createPlaceholder("FT5", "Big Wordmark"),
  FT6: createPlaceholder("FT6", "Industrial Numeric"),
  FT7: createPlaceholder("FT7", "Address Card"),
  FT8: createPlaceholder("FT8", "Horizontal Rule"),

  // === TABLE (8) — placeholder ===========================================
  T1: createPlaceholder("T1", "Standard Rows"),
  T2: createPlaceholder("T2", "Sticky Header"),
  T3: createPlaceholder("T3", "Spec Sheet"),
  T4: createPlaceholder("T4", "Compare Columns"),
  T5: createPlaceholder("T5", "Inline Edit Cells"),
  T6: createPlaceholder("T6", "Card Grid (forbidden)"),
  T7: createPlaceholder("T7", "Dense Data Grid"),
  T8: createPlaceholder("T8", "Stat List Editorial"),

  // === FORM (8) — 2 concrete, 6 placeholder ==============================
  F1: createPlaceholder("F1", "Single-Col Tall"),
  F2: createPlaceholder("F2", "Two-Col Split"),
  F3: WizardSteps as ResolvedComponent,
  F4: InlineExpand as ResolvedComponent,
  F5: createPlaceholder("F5", "Floating Labels"),
  F6: createPlaceholder("F6", "Stepper Progress"),
  F7: createPlaceholder("F7", "Accordion Sections"),
  F8: createPlaceholder("F8", "Sidebar Sticky"),

  // === MODAL (6) — 2 concrete, 4 placeholder =============================
  M1: createPlaceholder("M1", "Centered Dialog"),
  M2: createPlaceholder("M2", "Side Sheet"),
  M3: BottomSheet as ResolvedComponent,
  M4: createPlaceholder("M4", "Fullscreen Overlay"),
  M5: InlineExpand as ResolvedComponent,
  M6: createPlaceholder("M6", "Contextual Inline"),

  // === CHAT (6) — placeholder ============================================
  C1: createPlaceholder("C1", "WhatsApp Widget"),
  C2: createPlaceholder("C2", "Live Panel"),
  C3: createPlaceholder("C3", "Email Threaded"),
  C4: createPlaceholder("C4", "Bot Typing"),
  C5: createPlaceholder("C5", "Inline Contact Form"),
  C6: createPlaceholder("C6", "Floating Bubbles"),

  // === CHART (12) — placeholder ==========================================
  CH1: createPlaceholder("CH1", "Chart.js Smooth (forbidden)"),
  CH2: createPlaceholder("CH2", "Apex Donut"),
  CH3: createPlaceholder("CH3", "Nivo Geometric"),
  CH4: createPlaceholder("CH4", "Visx Custom"),
  CH5: createPlaceholder("CH5", "Echarts Dense"),
  CH6: createPlaceholder("CH6", "Column Bar Elev"),
  CH7: createPlaceholder("CH7", "Line Sparkline"),
  CH8: createPlaceholder("CH8", "Area Gradient"),
  CH9: createPlaceholder("CH9", "Heatmap Grid"),
  CH10: createPlaceholder("CH10", "Radar Spider"),
  CH11: createPlaceholder("CH11", "Stacked Area Kinetic"),
  CH12: createPlaceholder("CH12", "SVG Editorial Hand"),

  // === PIPELINE (10) — placeholder =======================================
  P1: createPlaceholder("P1", "Kanban (forbidden global)"),
  P2: createPlaceholder("P2", "Blueprint Step Diagonal"),
  P3: createPlaceholder("P3", "Horizontal Timeline / Funnel"),
  P4: createPlaceholder("P4", "Vertical Steps"),
  P5: createPlaceholder("P5", "Numbered Circle"),
  P6: createPlaceholder("P6", "Progress Bar Segmented"),
  P7: createPlaceholder("P7", "Chevron Flow"),
  P8: createPlaceholder("P8", "Orbital Radial"),
  P9: createPlaceholder("P9", "Accordion Steps"),
  P10: createPlaceholder("P10", "Sticker Blocks"),

  // === MOTION (12) — placeholder =========================================
  MO1: createPlaceholder("MO1", "GSAP ScrollTrigger"),
  MO2: createPlaceholder("MO2", "Lenis Smooth"),
  MO3: createPlaceholder("MO3", "CSS Scroll-Driven"),
  MO4: createPlaceholder("MO4", "Framer layoutId"),
  MO5: createPlaceholder("MO5", "react-spring Physics"),
  MO6: createPlaceholder("MO6", "Magnetic Cursor"),
  MO7: createPlaceholder("MO7", "Text Reveal Blur"),
  MO8: createPlaceholder("MO8", "Marquee Ticker"),
  MO9: createPlaceholder("MO9", "Pin + Scrub"),
  MO10: createPlaceholder("MO10", "Print-First"),
  MO11: createPlaceholder("MO11", "ScrollJack (forbidden)"),
  MO12: createPlaceholder("MO12", "Theatre.js"),

  // === 3D (15) — placeholder =============================================
  "3D-01-drei-envmap": createPlaceholder("3D-01", "drei EnvMap"),
  "3D-02-drei-orbitcontrols": createPlaceholder("3D-02", "drei OrbitControls"),
  "3D-03-drei-presentationcontrols": createPlaceholder("3D-03", "drei PresentationControls"),
  "3D-04-drei-contactshadows": createPlaceholder("3D-04", "drei ContactShadows"),
  "3D-05-drei-html": createPlaceholder("3D-05", "drei Html Overlay"),
  "3D-06-drei-text3d": createPlaceholder("3D-06", "drei Text3D"),
  "3D-07-drei-scrollcontrols": createPlaceholder("3D-07", "drei ScrollControls"),
  "3D-08-drei-meshtransmission": createPlaceholder("3D-08", "drei MeshTransmission"),
  "3D-09-postprocessing-bloom": createPlaceholder("3D-09", "Bloom"),
  "3D-10-postprocessing-dof": createPlaceholder("3D-10", "DepthOfField"),
  "3D-11-gaussian-splat": createPlaceholder("3D-11", "Gaussian Splat"),
  "3D-12-gltf-draco-ktx2": createPlaceholder("3D-12", "GLTF + Draco/KTX2"),
  "3D-13-rapier-physics": createPlaceholder("3D-13", "Rapier Physics"),
  "3D-14-spline-embed": createPlaceholder("3D-14", "Spline Embed"),
  "3D-15-model-viewer": createPlaceholder("3D-15", "<model-viewer>"),
};

/* ================================================================ */
/*  Resolver helpers                                                 */
/* ================================================================ */

export function resolveAtomId(id: string): AtomMapping | null {
  return ATOM_REGISTRY[id] ?? null;
}

export function componentNameForAtom(id: string): string {
  const m = resolveAtomId(id);
  return m ? m.componentName : `Stub_${id}`;
}

/**
 * resolveAtom — atom ID'den React component al.
 * PresetRenderer bu function'i cagirir; eksik ID'de hata firlatir.
 */
export function resolveAtom(atomId: string): ResolvedComponent {
  const Component = ATOM_COMPONENTS[atomId];
  if (!Component) {
    throw new Error(
      `atom-resolver: unknown atom id "${atomId}". ` +
        `Add a binding in src/lib/atom-resolver.ts (ATOM_COMPONENTS).`
    );
  }
  return Component;
}

/**
 * Soft resolver — eksik id'de hata vermez, null doner (optional atom'lar icin).
 */
export function tryResolveAtom(atomId: string | undefined | null): ResolvedComponent | null {
  if (!atomId) return null;
  return ATOM_COMPONENTS[atomId] ?? null;
}

/** Atom ID listesi — Agent J/K/L ilerlemesini takip icin */
export function listAllAtomIds(): string[] {
  return Object.keys(ATOM_REGISTRY);
}

/** Concrete component'i olan atom id'leri (placeholder olmayanlar). */
export function registeredAtomIds(): readonly string[] {
  return Object.keys(ATOM_COMPONENTS);
}

export function getAtomsByCategory(category: AtomCategory): AtomMapping[] {
  return Object.values(ATOM_REGISTRY).filter((m) => m.category === category);
}

export const TOTAL_MAPPINGS = Object.keys(ATOM_REGISTRY).length;
export const TOTAL_COMPONENT_BINDINGS = Object.keys(ATOM_COMPONENTS).length;
