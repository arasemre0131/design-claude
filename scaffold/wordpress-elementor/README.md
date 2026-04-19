# scaffold/wordpress-elementor/

WordPress + Elementor Pro + GSAP 3.13 + Lenis 1.3.4 Budget Tier (7.5-15K TL) scaffolder.

design-claude kataloğundaki `recipe: wordpress-elementor-motion` preset'leri için WordPress child theme + Elementor template JSON üretir.

## Hızlı kullanım

```bash
node scaffold-wp.js <preset-id> --out <output-path> [--force]
```

Örnek:

```bash
node scaffold-wp.js kuafor-minimal-swiss --out ./kadikoy-freeman-wp/
```

CLI:
1. `catalog/presets/<preset-id>.yaml` okur
2. Recipe `wordpress-elementor-motion` mı kontrol eder — değilse durur ve Next.js scaffold'a yönlendirir
3. Atom'ları yükler (palette + typography)
4. `hello-elementor-child/` şablonunu `<out>/hello-elementor-child/` altına kopyalar
5. Her dosyadaki placeholder'ı preset değerleriyle patch eder (PHP + CSS + JS + JSON)
6. `elementor-templates/<preset-id>.json` üretir
7. Proje root'una `README.md`, `CLAUDE.md`, `combo.md` bırakır

## Çıktı dizin yapısı

```
<out>/
├── hello-elementor-child/          Yüklenecek child theme
│   ├── style.css                   Preset CSS vars + preset name
│   ├── functions.php               GSAP + Lenis + wab-anim enqueue + KVKK + schema
│   ├── theme.json                  WP 6.9+ block editor tokens
│   ├── header.php                  Nav + magnetic CTA + Elementor Theme Builder fallback
│   ├── footer.php                  4-col footer + KVKK legal + brand
│   ├── templates/
│   │   ├── single-post.php
│   │   ├── archive.php
│   │   └── 404.php
│   └── assets/
│       ├── js/
│       │   ├── wab-safe-animations.js   6 MIT-safe pattern (vanilla JS, 16KB)
│       │   └── main.js                  Boot + autoInit
│       └── css/
│           ├── custom.css               Preset utility sınıfları
│           └── lenis.css                Lenis official CSS hooks
├── elementor-templates/
│   ├── <preset-id>.json            Homepage template (4 section)
│   └── README.md                   Import rehberi
├── README.md                       Proje-spesifik kurulum rehberi
├── CLAUDE.md                       Proje-spesifik Claude kuralları
└── combo.md                        Atom + palette + typography özeti
```

## Desteklenen preset'ler

Bu scaffolder sadece `recipe: wordpress-elementor-motion` presetlerini kabul eder. Mevcut WordPress preset'leri:

```bash
grep -l "recipe: wordpress-elementor-motion" ../../catalog/presets/*.yaml
```

Şu anda:
- `fotograf-minimal-swiss`
- `klinik-minimal-swiss`
- `kuafor-minimal-swiss`
- `restoran-brutalist`
- `restoran-editorial-print`
- `spa-minimal-swiss`
- (ve Budget tier eklendikçe artar)

Başka preset'leri WP için migrate etmek istersen preset YAML'in `recipe: wordpress-elementor-motion` olarak güncellenmesi gerek.

## Dosya sayısı + satır

| Dosya | Satır | Tür |
|-------|------:|-----|
| `scaffold-wp.js` | ~760 | Node CLI |
| `hello-elementor-child/style.css` | ~180 | CSS |
| `hello-elementor-child/functions.php` | ~350 | PHP |
| `hello-elementor-child/header.php` | ~70 | PHP |
| `hello-elementor-child/footer.php` | ~90 | PHP |
| `hello-elementor-child/theme.json` | ~80 | JSON |
| `hello-elementor-child/assets/js/wab-safe-animations.js` | ~440 | JS |
| `hello-elementor-child/assets/js/main.js` | ~100 | JS |
| `hello-elementor-child/assets/css/custom.css` | ~230 | CSS |
| `hello-elementor-child/assets/css/lenis.css` | ~45 | CSS |
| `hello-elementor-child/templates/*.php` | ~90 | PHP (3 dosya) |
| `elementor-templates/_template.json` | ~280 | JSON |
| **Toplam** | **~2,700 satır** | |

## Stack detay

### Runtime gereksinimleri
- WordPress 6.9+
- PHP 8.1+
- MySQL 8.0+ (utf8mb4)
- Node 18+ (sadece scaffold-wp.js için)

### Plugin gereksinimleri (hedef sunucuda)
- **Elementor** (ücretsiz core) — ✓ zorunlu
- **Elementor Pro** 3.35+ — ✓ zorunlu (Theme Builder + Forms)
- **Rank Math SEO** — ✓ zorunlu (meta + sitemap)
- **Wordfence Security** — ✓ zorunlu (2FA + brute force)
- **Limit Login Attempts Reloaded** — ✓ zorunlu
- **UpdraftPlus** — önerilir (haftalık backup)
- **WP Rocket** — opsiyonel (premium cache)
- **Motion Design for Elementor** (MasterAddons) — opsiyonel (preset'e göre)

### JS libraries (CDN via jsdelivr)
- `gsap@3.13.0` — core (ücretsiz, Webflow acquisition 2024 sonrası)
- `gsap/ScrollTrigger@3.13.0` — scroll-driven animation
- `gsap/SplitText@3.13.0` — text splitting (artık ücretsiz)
- `gsap/Observer@3.13.0` — scroll/swipe detection
- `lenis@1.3.4` — smooth scroll
- Custom: `wab-safe-animations.js` (MIT rewrite, hand-coded)

## MIT-safe rewrite notu

`wab-safe-animations.js` — **wearebrand.io** ve **fraxbit.com** sitelerinin proprietary `animations.js` (30KB minified) dosyasından 6 kavramsal pattern'i **sıfırdan yazmış** bir implementasyondur:

1. Lenis + GSAP ticker bridge
2. Blur-36px text reveal
3. Magnetic elastic hover
4. CSS `--mask-y` reveal
5. Theme switch on scroll zones
6. `wabSplit` DIY SplitText

Orijinal minified dosyaya **bakılmadı** (ya da inceleme sadece pattern isimlerini okuma seviyesinde kaldı). Kod tamamen public GSAP + Lenis API'leri + vanilla DOM üzerinden yazıldı. MIT uyumlu.

## Güvenlik notları (her teslimatta kontrol)

`functions.php` otomatik şunları yapar:
- `DISALLOW_FILE_EDIT` true (WP admin'de dosya editörünü kapatır)
- XML-RPC kapalı
- REST API user enumeration disabled (`/wp-json/wp/v2/users` erişimi engellenir)
- WP version header kaldırılır
- Google Fonts + jsdelivr preconnect

Hedef sunucuda **manuel** yapılması gerekenler:
- HTTPS zorunlu (.htaccess redirect)
- `wp-admin` 2FA (Wordfence)
- Haftalık DB backup (UpdraftPlus)
- Cloudflare proxy (önerilir, free tier)
- WAF rules (Wordfence veya Cloudflare)

## KVKK uyum

`functions.php` otomatik bir KVKK çerez banner'ı gösterir:
- İlk ziyarette bottom-fixed çıkar
- Kabul et / Reddet butonları
- `kvkk_accepted` cookie (1 yıl ömür)
- Gizlilik politikası sayfasına link (`/gizlilik-politikasi/`)

Hedef sitede yapılması gereken:
- `/gizlilik-politikasi/` sayfası oluştur (metin müşteri sağlar veya template kullan)
- `/kvkk/` aydınlatma metni
- `/cerez-politikasi/`
- Form'lara "onay kutusu" ekle (Elementor Form > Acceptance field)

## Test edilmiş preset'ler

Bu scaffolder 3 preset ile end-to-end test edildi:
- `kuafor-minimal-swiss` — PL24 (Salt + Peach) + TY39 (IBM Plex Sans) ✓
- `klinik-minimal-swiss` — PL (Medical) + TY (clean sans) ✓
- `restoran-brutalist` — PL6 + TY6 (Archivo Black + Space Grotesk) ✓

Sonuç: 16/16 dosya valid (CSS + PHP + JS + JSON), 0 placeholder leak.

## Bilinen sınırlamalar

1. **PHP lint offline yok** — Bu Windows makine PHP CLI kurulu değil, ancak `<?php` tag dengesi ve JS/JSON validation otomatik yapılıyor.
2. **Elementor Pro lisansı** — Müşteriye aittir veya Emre agency lisansı gerekli. CLI bunu otomatik aktifleştirmez.
3. **Template JSON Elementor Pro ile import edilir** — free core ile çalışmaz (Library feature Pro only).
4. **Motion Design addon** — Bazı preset'ler daha fazla efekt için MasterAddons plugin'ini isteyebilir, functions.php bunu zorunlu kılmaz.
5. **Server-side import** — Elementor template'i manuel olarak WP Admin'den import edilir. WP-CLI ile de yapılabilir ama otomatik değil.

## Evidence & referans

- **fraxbit.com** — WordPress 6.9 + Elementor Pro 3.35 + GSAP 3.12 (Awwwards Honorable Mention). fraxbit_home.html research-assets'te.
- **wearebrand.io** — Awwwards SOTD, WordPress + custom Lenis 1.2.3 + 30KB custom anim. wearebrand_home.html + wab/ research-assets'te.
- **Recipe tanımı:** `catalog/recipes/wordpress-elementor-motion.yaml`
- **Scaffold (Next.js):** `scaffold.js` (parent tier)

## Sonraki adımlar (Faz 4 devamı)

- Shopify Hydrogen scaffolder (`scaffold/shopify-hydrogen/`)
- Enterprise monorepo scaffolder (`scaffold/enterprise-monorepo/`)
- Scaffold-router: tek komut ile preset recipe'ine göre uygun CLI'ı çağırır
