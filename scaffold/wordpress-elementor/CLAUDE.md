# CLAUDE.md — scaffold/wordpress-elementor

## Ne yapar
Budget tier (7.5-15K TL, 3-7 gün teslim) WordPress + Elementor Pro preset'leri için child theme + Elementor template JSON üretir.

## Ne zaman kullan
- Kullanıcı "WordPress", "Elementor", "kuaför site", "restoran site", "fotografçı portfolyo" gibi Budget tier sinyali verdiğinde
- Preset `recipe: wordpress-elementor-motion` ise sadece bu scaffolder
- Next.js preset (`next-premium`, `next-r3f`, vs.) varsa `scaffold.js` kullan

## Entry point
```bash
node scaffold-wp.js <preset-id> --out <output-path> [--force]
```

## Kritik kurallar

### 1. Recipe guard zorunlu
`scaffold-wp.js` preset YAML'inin `recipe` alanını okur. `wordpress-elementor-motion` değilse hata verip `scaffold.js`'e yönlendirir. Bu guard'ı **atlama**.

### 2. MIT-safe rewrite
`wab-safe-animations.js` dosyasındaki 6 pattern, wearebrand.io/fraxbit.com'un proprietary minified kodundan **kopyalanmadı**. Kavramsal olarak incelenip sıfırdan yazıldı. Bu dosyayı değiştirirken:
- GSAP + Lenis public API'leri dışına çıkma
- Orijinal `wearebrand-animations.js` dosyasını **kopyalama**
- MIT lisans notunu dosya başında tut

### 3. KVKK banner kaldırma yasak
`functions.php` içindeki KVKK banner Türkiye yasal zorunluluk. Kaldırmak veya opsiyonel yapmak **yasak**.

### 4. Güvenlik hardening'i kaldırma
`functions.php`'deki güvenlik önlemleri (XML-RPC disable, REST user enum fix, DISALLOW_FILE_EDIT) istisna olmadan korunmalı.

### 5. Placeholder formatı
Tüm patch'lenebilir dosyalarda `__PLACEHOLDER_NAME__` formatı kullanılır. Yeni placeholder eklerken:
- `scaffold-wp.js` içindeki `buildReplacements()` fonksiyonuna eklemeyi unutma
- İki ucu çift underscore, uppercase + underscore

### 6. PHP function/const prefix çakışma önleme
Her preset'in `functions.php`'i benzersiz prefix kullanır:
- Fonksiyonlar: `dc_<preset_slug>_*` (örn `dc_kuafor_minimal_swiss_enqueue_styles`)
- Const'lar: `DC_<PRESET_SLUG>_*` (örn `DC_KUAFOR_MINIMAL_SWISS_VERSION`)
- Bu scaffold-wp.js tarafından otomatik üretilir (`presetToFnPrefix`, `presetToConstPrefix`).

### 7. Elementor Pro bağımlılığı
Homepage template JSON import'u Elementor Pro gerektirir (free core'da Library feature yok). Free alternatif: Elementor Cloud veya Kit Import (Pro hala gerekir). Müşteriye bunu önceden söyle.

### 8. Preset recipe'ini değiştirme
Bir preset Next.js'ten WordPress'e taşınırken:
1. `catalog/presets/<id>.yaml` içinde `recipe: wordpress-elementor-motion` yap
2. `budget_range_try: [7500, 15000]` kontrol et (Budget tier limit)
3. `delivery_weeks: [0.5, 1]` (3-7 gün)
4. Atom'ları yeniden değerlendir (WordPress bazı atomları destekleyemez, örn custom cursor, advanced motion-ajans)

## Tech stack referansı

| Alan | Versiyon | Not |
|------|----------|-----|
| WordPress | 6.9+ | PHP 8.1+, MySQL 8.0+ |
| Elementor | 3.35+ | Pro zorunlu |
| Hello Elementor | latest | Parent theme (ücretsiz) |
| GSAP | 3.13.0 | Core + ScrollTrigger + SplitText + Observer (hepsi ücretsiz) |
| Lenis | 1.3.4 | Smooth scroll |
| Rank Math | latest | SEO + schema |
| Wordfence | latest | Security + 2FA |

## Patch akışı (değiştirmek için bilinmesi gerekenler)

1. `parseYaml()` — Zero-deps YAML parser (js-yaml yok, runtime bağımlılığı yok)
2. `resolvePalette()` — Atom palette → {bg, ink, accent, secondary, muted, surface, border}
3. `extractFontName()` — "Archivo Black + Space Grotesk 900" → "Archivo Black" (ilk font)
4. `buildReplacements()` — Tüm placeholder mapping'i bu fonksiyonda tanımlı
5. `patchTree()` — Child theme dizinini recursive patch eder (.css, .php, .js, .json, .md)
6. `generateElementorJson()` — `_template.json` base'i patch'ler → `<preset-id>.json`
7. `generateProjectReadme()` + `generateProjectClaudeMd()` — Proje root README/CLAUDE
8. `writeComboMd()` — design-claude tradition combo.md

## Test
```bash
# 3 preset ile test et:
node scaffold-wp.js kuafor-minimal-swiss --out /tmp/test-wp-1/ --force
node scaffold-wp.js klinik-minimal-swiss --out /tmp/test-wp-2/ --force
node scaffold-wp.js restoran-brutalist --out /tmp/test-wp-3/ --force

# Placeholder leak kontrol:
grep -rc "__[A-Z_]*__" /tmp/test-wp-*/  # hepsi 0 olmalı
```

## Bilinen tuzaklar

1. **Windows path + MINGW bash**: `/tmp/foo` → `C:\Users\...\AppData\Local\Temp\foo` otomatik çözülür. Sorun yok.
2. **Node 18+ gerekli**: `fs.cpSync` + recursive rm kullanılmıyor (eski Node destekli), ancak `fs.rmSync` Node 14+.
3. **Preset YAML front-matter**: `---\n...\n---` bloğunun altındaki body de YAML. Hem header hem body merge edilir.
4. **PHP prefix dash**: Preset ID `kuafor-minimal-swiss` → PHP fonksiyon adı `dc_kuafor_minimal_swiss_*`. Dash yerine underscore (otomatik).
5. **"+" içeren font** (TY6 vs.): `extractFontName` ilk fontu alır, virgülle ikinci tutulmaz. Eğer gerçekten 2 font kullanılacaksa custom.css'e elle yaz.

## Git + deploy

Kullanıcı test ederken bu scaffolder'ı **commit etmemeli** (henüz integration testi çalışmadı). Scaffold-wp.js çalışıp temiz çıktı verdiğinde repo'ya push.

## Sonraki adımlar (Faz 4 devamı)

- [ ] Shopify Hydrogen scaffolder (mid-tier e-ticaret)
- [ ] Enterprise monorepo scaffolder (hi-tier)
- [ ] Unified scaffold-router (`node scaffold <preset>` otomatik doğru CLI'ı çağırır)
