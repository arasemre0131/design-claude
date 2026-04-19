// constants.ts — preview-app global sabitleri.
//
// - SUPPORTED_PRESETS: catalog/presets/ altinda olmasi beklenen id sablonu.
//   Runtime'da listPresets() ile genisletilir; burada sadece ref tipi.
// - RECIPE_DEFAULTS: tier/style bazli default preset opsiyonu
// - FORBIDDEN_IDS: global klise/forbidden atom listesi — her preset'te
//   scan edilmesi gereken ID'ler.

// --- Tier / recipe sabitleri --------------------------------------------
export const TIERS = ['ultra-budget', 'budget', 'mid', 'premium', 'enterprise'] as const;
export type Tier = (typeof TIERS)[number];

export const STYLES = [
  'editorial-luxury',
  'editorial-print',
  'minimal-swiss',
  'kinetic-agency',
  'maximalist-atmospheric',
  'warm-organic',
  'brutalist',
  'industrial-workwear',
  'immersive-3d',
  'data-dense-dashboard',
] as const;
export type Style = (typeof STYLES)[number];

export const SECTORS = [
  'mucevher',
  'restoran',
  'otel',
  'spa',
  'fotograf',
  'gayrimenkul',
  'insaat',
  'eticaret',
  'klinik',
  'kuafor',
] as const;
export type Sector = (typeof SECTORS)[number];

// --- Recipe defaults (stack + 3D flag per tier) -------------------------
/**
 * Her stil + tier icin default framework / 3D ihtiyaci. scaffold script bunu
 * kullanir; preset YAML override eder.
 */
export interface RecipeDefaults {
  recipe: string;
  three_d: boolean;
  libraries: string[];
}

export const RECIPE_DEFAULTS: Record<Tier, RecipeDefaults> = {
  'ultra-budget': {
    recipe: 'next-minimal',
    three_d: false,
    libraries: ['tailwindcss'],
  },
  budget: {
    recipe: 'next-standard',
    three_d: false,
    libraries: ['tailwindcss', 'gsap', 'lenis'],
  },
  mid: {
    recipe: 'next-motion',
    three_d: false,
    libraries: ['tailwindcss', 'gsap', 'lenis', 'framer-motion'],
  },
  premium: {
    recipe: 'next-r3f',
    three_d: true,
    libraries: ['tailwindcss', 'gsap', 'lenis', 'framer-motion', 'three', '@react-three/fiber', '@react-three/drei'],
  },
  enterprise: {
    recipe: 'next-r3f-postprocessing',
    three_d: true,
    libraries: [
      'tailwindcss',
      'gsap',
      'lenis',
      'framer-motion',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/postprocessing',
      '@react-three/rapier',
    ],
  },
};

// --- Forbidden atom ids (global cliche warning list) --------------------
/**
 * Global klise/forbidden id'ler. ULTRAPLAN Bolum 4 (anti-cliche) referans.
 * Her preset validate edilirken bu listeye bakilmali.
 */
export const FORBIDDEN_IDS = {
  palettes: ['PL1'], // dark + gold, 5+ proje kanitli
  typography: ['TY1', 'TY2', 'TY4', 'TY8'], // Inter-only, Playfair+Inter, Instrument+SpaceGrotesk, DM+Inter
  heroes: ['HR2', 'HR7'], // split-hero, dashboard-as-hero (evrensel klise)
  headers: ['H8'], // mix-blend-mode difference (6+ proje)
  kpi: ['K1'], // bento glass (Fatih Bey v1 + cok proje)
  tables: ['T6'], // card grid (product list kılifında)
  layouts: ['L1'], // tam-frame grid (Fatih Bey v1)
  charts: ['CH1'], // Chart.js smooth default
  motion: ['MO11'], // scrolljack agresif
  pipelines: ['P1'], // klasik Kanban (globally)
} as const;

/**
 * Tek bir flat array — preset validator icin hizli lookup.
 */
export const FORBIDDEN_IDS_FLAT: readonly string[] = [
  ...FORBIDDEN_IDS.palettes,
  ...FORBIDDEN_IDS.typography,
  ...FORBIDDEN_IDS.heroes,
  ...FORBIDDEN_IDS.headers,
  ...FORBIDDEN_IDS.kpi,
  ...FORBIDDEN_IDS.tables,
  ...FORBIDDEN_IDS.layouts,
  ...FORBIDDEN_IDS.charts,
  ...FORBIDDEN_IDS.motion,
  ...FORBIDDEN_IDS.pipelines,
];

export function isForbiddenId(id: string): boolean {
  return FORBIDDEN_IDS_FLAT.includes(id);
}

// --- Supported preset id set (sector-style pairs) -----------------------
/**
 * Catalog'da uretilmesi beklenen preset pairs.
 * SECTORS x STYLES kartezyen carpimi — sadece pratik olanlar aktif.
 *
 * Dinamik list icin preset-loader.listPresets() kullan; bu sabit referans.
 */
export const SUPPORTED_PRESET_PATTERNS: readonly string[] = SECTORS.flatMap((sector) =>
  STYLES.map((style) => `${sector}-${style}`)
);

// --- Mobil breakpoint varsayilanlari ------------------------------------
export const MOBILE_BREAKPOINTS = [375, 768, 1280] as const;

// --- Lenis default opts (wearebrand pattern) ----------------------------
export const LENIS_DEFAULTS = {
  duration: 1.2,
  smoothWheel: true,
  touchMultiplier: 2,
} as const;

// --- Turkce karakter testi (her preset icinde calismalidir) -------------
export const TURKISH_CHARS_TEST: readonly string[] = [
  'ı', 'İ', 'ğ', 'Ğ', 'ş', 'Ş', 'ç', 'Ç', 'ö', 'Ö', 'ü', 'Ü',
];

// --- WCAG contrast targets ----------------------------------------------
export const WCAG_TARGETS = {
  AA: 4.5,
  AA_LARGE: 3,
  AAA: 7,
  AAA_LARGE: 4.5,
} as const;

// --- Lighthouse targets per tier ----------------------------------------
export const LIGHTHOUSE_TARGETS: Record<Tier, number> = {
  'ultra-budget': 85,
  budget: 88,
  mid: 90,
  premium: 92,
  enterprise: 95,
};
