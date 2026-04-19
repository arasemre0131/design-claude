# Elementor Template İmport Rehberi

Bu klasör, scaffold-wp.js'in ürettiği preset-specific Elementor template JSON'larını barındırır.

## Dosya yapısı

- `_template.json` — boş base template (CLI patch edecek).
- `<preset-id>.json` — CLI çalıştırıldıktan sonra üretilen preset-specific homepage.
  Örn: `kuafor-minimal-swiss.json`, `mucevher-editorial-luxury.json`.

## Manuel import (Elementor Pro Library)

1. WordPress admin panele gir.
2. **Templates → Saved Templates** menüsüne tıkla.
3. Üstteki **Import Templates** butonuna bas.
4. `<preset-id>.json` dosyasını seç ve **Import Now** de.
5. Yeni bir sayfa oluştur (Pages → Add New), **Edit with Elementor**'a gir.
6. Template library ikonuna tıkla → **My Templates** → az önce import ettiğin template → **Insert**.

## Otomatik import (Elementor Pro `wp-cli`)

```bash
# Elementor Pro ile:
wp elementor library import wordpress-elementor/elementor-templates/kuafor-minimal-swiss.json
```

Ya da PHP snippet:

```php
if ( class_exists( '\Elementor\Plugin' ) ) {
    \Elementor\Plugin::$instance->templates_manager->import_template( [
        'fileData' => base64_encode( file_get_contents( get_stylesheet_directory() . '/elementor-templates/kuafor-minimal-swiss.json' ) ),
        'fileName' => 'kuafor-minimal-swiss.json',
    ] );
}
```

## Template içeriği

Her template şu bölümleri içerir:

1. **Hero** — palette bg + blur-reveal başlık + magnetic primary CTA.
2. **KPI bandı** — 3 kolon (yıl/müşteri/çalışma saati).
3. **Hizmetler** — icon-list, 4 satır.
4. **İletişim** — dark background, Elementor Form.

WordPress admin'den her section'ı kendi içeriğinle değiştirebilirsin.

## Placeholder'lar

scaffold-wp.js, JSON içindeki şu tokenleri preset YAML'dan gelen değerlerle değiştirir:

| Token | Kaynak |
|-------|--------|
| `__PRESET_ID__` | preset.id |
| `__PRESET_SECTOR__` | preset.sector |
| `__PRESET_STYLE__` | preset.style |
| `__COLOR_BG__` / `__COLOR_INK__` / `__COLOR_ACCENT__` / `__COLOR_SECONDARY__` / `__COLOR_MUTED__` / `__COLOR_SURFACE__` | palette atom hex |
| `__FONT_DISPLAY__` / `__FONT_BODY__` / `__FONT_MONO__` | typography atom |
| `__HERO_HEADLINE__` / `__HERO_SUBHEADLINE__` | scaffold_hints veya default |
| `__PRIMARY_CTA__` | scaffold_hints.primary_cta |
| `__GENERATED_AT__` | ISO timestamp |

## Özel Elementor setting anahtarları

- `__attr__data-wab-blur-reveal` — render ederken `data-wab-blur-reveal=""` olarak çıkar (Elementor custom attribute sözdizimi).
- `css_classes` — CSS class eklemek için Elementor widget ayarı.
- `_element_custom_id` — anchor için kullanılır.
