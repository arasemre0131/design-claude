# scripts/ — design-claude CLI araçları

## validate-combo.js

Combo/preset validator. YAML veya Markdown tablo formatındaki combo'yu alır, 5 check yapar:
1. Yasaklı pathway ID'leri (globally_forbidden)
2. Repeat skor (13 mevcut proje ile 15 kolon karşılaştırma)
3. Sektör-stil uyumluluk (`catalog/compatibility.yaml > forbidden_combinations`)
4. Türkçe karakter font desteği (atom YAML > turkish_support)
5. A11y hızlı check (kontrast ≥ 4.5 + prefers-reduced-motion not)

### Kurulum

```bash
cd <repo-root>
npm install js-yaml
```

`package.json` zaten yok ise script otomatik minimal package.json kullanır.

### Kullanım

```bash
node scripts/validate-combo.js catalog/presets/mucevher-editorial-luxury.yaml
node scripts/validate-combo.js insaat-crm/combo.md
node scripts/validate-combo.js /absolute/path/to/combo.yaml
```

### Çıktı

PASS:
```
[PASS] combo <name> geçti
  ✓ Yasaklı ID: 0 ihlal
  ✓ Repeat skor: 2/15 — OK
  ✓ Sektör-stil uyum: uyumlu
  ✓ Türkçe font: TY27 (Fraunces) bilinen TR-uyumlu font
  ✓ A11y: kontrast + motion check OK
```

FAIL:
```
[FAIL] combo <name> reddedildi
  ✗ Yasaklı ID: 2 ihlal
    - PL1: Dark #0A0A0A + Gold #C9A84C (6 proje)
      Alternatif: PL22 (Tobacco+Pearl), PL23 (Plum+Champagne)
  ...
```

### Exit kodları

- `0` — PASS (combo geçerli)
- `1` — FAIL (en az bir check başarısız)
- `2` — Kullanım hatası (dosya yok, dependency eksik)

### Desteklenen input formatları

**YAML (önerilen):**
```yaml
---
id: proje-adi
sector: mucevher
style: editorial-luxury
---
combo:
  header: H1
  nav: N3
  hero: HR11
  kpi: K2
  ...
```

**Markdown tablo:**
```markdown
sektör: insaat
stil: industrial-workwear

| Kategori | Seçim ID | ... |
|----------|----------|-----|
| Header | H1 | ... |
| Nav | N3 | ... |
| Hero | HR13 | ... |
...
```

Desteklenen 15 kolon: `header, nav, hero, kpi, pipeline, table, chat, chart, form, modal, footer, typography, palette, layout, motion`

### Veri kaynakları

- `catalog/compatibility.yaml` — forbidden_combinations, conditional_combinations, existing_projects
- `catalog/atoms/typography/TY*.yaml` — font TR desteği
- `catalog/atoms/palette/PL*.yaml` — WCAG contrast pairs
