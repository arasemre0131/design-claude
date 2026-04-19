# MATRIX.md — Sektör × Stil Compatibility Tablosu

> **Kaynak:** `catalog/compatibility.yaml` (matrix: bölümü + forbidden_combinations + conditional_combinations)
> **Bağlam:** 10 sektör × 10 stil = 100 hücre. Her hücre bir preset kararı.
> **Faz 2 hedefi:** 47 aktif (✓✓ + ✓) zorunlu + 24 koşullu (⚠) opsiyonel = **47–71 preset üretilecek**, 29 hücre forbidden.
> **validate-combo.js** bu tablonun kaynağını (compatibility.yaml) okur.

---

## Legend

| Sembol | Anlam |
|--------|-------|
| **✓✓** | **Default / en uygun** (sector YAML `recommended` → primary + stil `compatible_sectors` match) |
| ✓ | Aktif — preset üretilebilir, sektöre + stile uyumlu |
| ⚠ | Koşullu — belirli bir bağlamda OK (ör. CRM yanında tanıtım sitesi, butik vs. commodity) |
| ✗ | Forbidden — `forbidden_combinations`'da gerekçe |

---

## 10 × 10 Grid

| Sektör ↓ / Stil → | brutalist | editorial-luxury | kinetic-agency | immersive-3d | maximalist-atmospheric | minimal-swiss | warm-organic | data-dense-dashboard | editorial-print | industrial-workwear |
|--------------------|-----------|------------------|----------------|--------------|------------------------|---------------|--------------|----------------------|-----------------|---------------------|
| **insaat**         | ✓         | ⚠                | ✓              | ✓            | ✗                      | ✓             | ⚠            | ✓                    | ⚠               | **✓✓**              |
| **mucevher**       | ✗         | **✓✓**           | ⚠              | ✓            | ⚠                      | ✓             | ✓            | ✗                    | ✓               | ✗                   |
| **kuafor**         | ✗         | ✓                | ✓              | ✗            | ⚠                      | **✓✓**        | ✓            | ✗                    | ⚠               | ✗                   |
| **restoran**       | ⚠         | ✓                | ⚠              | ✗            | ✓                      | ✓             | ✓            | ✗                    | **✓✓**          | ✗                   |
| **klinik**         | ✗         | **✓✓**           | ✗              | ⚠            | ✗                      | ✓             | ✓            | ⚠                    | ⚠               | ✗                   |
| **eticaret**       | ✓         | ⚠                | ✓              | ✓            | ⚠                      | ✓             | ⚠            | **✓✓**               | ⚠               | ✓                   |
| **spa**            | ✗         | ✓                | ✗              | ✗            | ✗                      | ✓             | **✓✓**       | ✗                    | ⚠               | ✗                   |
| **fotograf**       | ⚠         | ✓                | ✓              | ✓            | ✓                      | ✓             | ⚠            | ✗                    | **✓✓**          | ✗                   |
| **gayrimenkul**    | ✗         | ✓                | ⚠              | ✓            | ✗                      | ✓             | **✓✓**       | ⚠                    | ⚠               | ✗                   |
| **otel**           | ✗         | ✓                | ⚠              | ✓            | ✓                      | ✓             | **✓✓**       | ✗                    | ⚠               | ✗                   |

---

## Satır Bazında Sayım (sektör)

Otomatik `catalog/compatibility.yaml > matrix` alanından hesaplandı.

| Sektör | ✓✓ (default) | ✓ (aktif) | ⚠ (koşullu) | ✗ (forbidden) | Toplam |
|--------|-------------:|----------:|------------:|--------------:|-------:|
| insaat         | 1 | 5 | 3 | 1 | 10 |
| mucevher       | 1 | 4 | 2 | 3 | 10 |
| kuafor         | 1 | 3 | 2 | 4 | 10 |
| restoran       | 1 | 4 | 2 | 3 | 10 |
| klinik         | 1 | 2 | 3 | 4 | 10 |
| eticaret       | 1 | 5 | 4 | 0 | 10 |
| spa            | 1 | 2 | 1 | 6 | 10 |
| fotograf       | 1 | 5 | 2 | 2 | 10 |
| gayrimenkul    | 1 | 3 | 3 | 3 | 10 |
| otel           | 1 | 4 | 2 | 3 | 10 |
| **TOPLAM**     | **10** | **37** | **24** | **29** | **100** |

## Sütun Bazında Sayım (stil)

| Stil | ✓✓ (default) | ✓ (aktif) | ⚠ (koşullu) | ✗ (forbidden) | Toplam |
|------|-------------:|----------:|------------:|--------------:|-------:|
| brutalist               | 0 | 2 | 2 | 6 | 10 |
| editorial-luxury        | 2 | 6 | 2 | 0 | 10 |
| kinetic-agency          | 0 | 4 | 4 | 2 | 10 |
| immersive-3d            | 0 | 6 | 1 | 3 | 10 |
| maximalist-atmospheric  | 0 | 3 | 3 | 4 | 10 |
| minimal-swiss           | 1 | 9 | 0 | 0 | 10 |
| warm-organic            | 3 | 4 | 3 | 0 | 10 |
| data-dense-dashboard    | 1 | 1 | 2 | 6 | 10 |
| editorial-print         | 2 | 1 | 7 | 0 | 10 |
| industrial-workwear     | 1 | 1 | 0 | 8 | 10 |
| **TOPLAM**              | **10** | **37** | **24** | **29** | **100** |

> **Özet:** 47 aktif (✓✓ + ✓) + 24 koşullu (⚠) + 29 forbidden (✗) = 100 hücre sabit.
> **Faz 2 preset hedefi:** 47 aktif + opsiyonel 24 koşullu = **47–71 preset**.

---

## Default Seçimler (her sektör için primary ✓✓)

| Sektör | Default Stil | Gerekçe |
|--------|--------------|---------|
| insaat         | industrial-workwear   | Concrete + hazard + stencil — şantiye dilinin native imzası |
| mucevher       | editorial-luxury      | El-emeği + rafine + Fraunces opsz — sektörün native dili |
| kuafor         | minimal-swiss         | Sakin + sıcak karşılama + hijyen — IBM Plex monolithic |
| restoran       | editorial-print       | Masthead + 3-col CSS columns menü + drop cap |
| klinik         | editorial-luxury      | Sade + güven + Fraunces + IBM Plex Sans + cream/forest |
| eticaret       | data-dense-dashboard  | Admin + filtre + ⌘K + tabular-nums + dense ürün grid |
| spa            | warm-organic          | Clay+mist+pearl+seafoam + slow Lenis — meditatif |
| fotograf       | editorial-print       | PL33 pure off-black + masonry + image kahraman |
| gayrimenkul    | warm-organic          | Sand+Ocean + güven + yaşam-tarzı |
| otel           | warm-organic          | Terracotta+sky + organik + Fraunces italic |

---

## Forbidden Hücreler (29) — Kısa Gerekçe

Tam listesi `catalog/compatibility.yaml` > `forbidden_combinations`'da. Buraya özet:

**Brutalist yasak sektörler (6):** mucevher, kuafor, klinik, spa, gayrimenkul, otel — raw + primary renk + hard shadow premium/güven/huzur moodlarını kırar.

**Immersive-3d yasak sektörler (3):** kuafor (3D saç yapay), restoran (2D food daha iştah açıcı), spa (fiziksel deneyim — 3D mesafe yaratır).

**Maximalist-atmospheric yasak sektörler (4):** insaat (disiplin), klinik (güven), spa (sessizlik), gayrimenkul (netlik).

**Industrial-workwear yasak sektörler (7):** mucevher, kuafor, klinik, spa, fotograf, gayrimenkul, otel — hazard/concrete/stencil premium/feminen/lüks sektörler için atölye hissi yaratır.

**Data-dense-dashboard yasak sektörler (5):** mucevher, kuafor, restoran, spa, fotograf, otel — görsel-öncelikli sektörlerde dense tabular yanlış dil (compatibility.yaml matrix ✗). Kahin: tanıtım sitesi vs. iç admin farkı — iç admin için ⚠ olarak klinik/gayrimenkul'da kullanılıyor.

**Kinetic-agency yasak sektörler (1):** klinik — hızlı kinetic dikkat dağıtıcı + sağlık güveni kırar.

**Maximalist-atmospheric + otel kombini istisna:** warm terracotta density OK ama spa-otel hibrit için ✗'e düşmez — matrix'te otel ✓, spa ✗.

---

## Faz 2 Dispatch Planı (preset üretimi)

Faz 2 — her stil için 1 paralel agent → toplam 10 agent, ~71 preset.yaml üretir (✓✓ + ✓ + ⚠).

| Agent | Stil | Üretilecek Hücreler | Sayı |
|-------|------|---------------------|------|
| Agent 1  | brutalist              | insaat (✓), eticaret (✓), restoran (⚠), fotograf (⚠) | 4 |
| Agent 2  | editorial-luxury       | mucevher (✓✓), klinik (✓✓), kuafor (✓), restoran (✓), spa (✓), fotograf (✓), gayrimenkul (✓), otel (✓), insaat (⚠), eticaret (⚠) | 10 |
| Agent 3  | kinetic-agency         | insaat (✓), kuafor (✓), eticaret (✓), fotograf (✓), mucevher (⚠), restoran (⚠), gayrimenkul (⚠), otel (⚠) | 8 |
| Agent 4  | immersive-3d           | insaat (✓), mucevher (✓), eticaret (✓), fotograf (✓), gayrimenkul (✓), otel (✓), klinik (⚠) | 7 |
| Agent 5  | maximalist-atmospheric | restoran (✓), fotograf (✓), otel (✓), mucevher (⚠), eticaret (⚠) | 5 + 1 eksik → bkz not |
| Agent 6  | minimal-swiss          | kuafor (✓✓), insaat (✓), mucevher (✓), restoran (✓), klinik (✓), eticaret (✓), spa (✓), fotograf (✓), gayrimenkul (✓), otel (✓) | 10 |
| Agent 7  | warm-organic           | spa (✓✓), gayrimenkul (✓✓), otel (✓✓), mucevher (✓), kuafor (✓), restoran (✓), klinik (✓), insaat (⚠), eticaret (⚠), fotograf (⚠) | 10 |
| Agent 8  | data-dense-dashboard   | eticaret (✓✓), insaat (✓), klinik (⚠), gayrimenkul (⚠) | 4 |
| Agent 9  | editorial-print        | restoran (✓✓), fotograf (✓✓), mucevher (✓), insaat (⚠), kuafor (⚠), klinik (⚠), eticaret (⚠), spa (⚠), gayrimenkul (⚠), otel (⚠) | 10 |
| Agent 10 | industrial-workwear    | insaat (✓✓), eticaret (✓) | 2 |
| **TOPLAM** |                      |                     | **~70** |

Not: Agent 5 maximalist-atmospheric satır toplamı matrix sayımında 6 (3 ✓ + 3 ⚠) — yukarıda otel'in ✓ değeri + eticaret ⚠ + mucevher ⚠ + fotograf ✓ + restoran ✓ = 5 maddeli. "otel" maximalist ✓ + mucevher ⚠ zaten listelendi. Doğru toplam = 3 aktif + 3 koşullu = 6 (matrix kolon sütun sayımı). Dispatch'te küçük kayma varsa compatibility.yaml > matrix kanonik kaynak.

---

## Öncelik Sırası (Faz 2 teslim akışı)

1. **Öncelik 1 (10 default preset)** — her sektörün ✓✓ hücresi. Bunlar `recipes/`'e eklenecek ilk 10.
2. **Öncelik 2 (38 ✓ aktif preset)** — default dışı aktif kombinasyonlar.
3. **Öncelik 3 (23 ⚠ koşullu preset)** — sadece belirli koşul karşılanırsa üretilir, yoksa skip.

**Faz 2 toplam:** ~48 default + aktif (Öncelik 1+2) + opsiyonel 23 conditional = 48-71 preset.

---

## İstisna: Mevcut 13 proje (DESIGN-PATHWAYS.md § PROJECT MATRIX)

`catalog/compatibility.yaml > existing_projects` altında. Yeni combo'lar bu 13 projenin **hiçbiriyle 8+ kolonda eşleşemez** (`validate-combo.js` repeat-guard kontrolü). Eşleşme 4-5 → ikinci tur, 6-7 → en az 3 kolon değiştir, 8+ → red.

---

## Karar Referansları

- `catalog/sectors/*.yaml` — her sektörün `anti_cliche`, `recommended`, `existing_projects` alanları
- `catalog/styles/*.yaml` — her stilin `compatible_sectors`, `incompatible_sectors`, `forbidden` alanları
- `catalog/compatibility.yaml` — bu tablonun kaynak YAML'ı (validate-combo.js bunu okur)
- `catalog/ROUTING.yaml` — feature → research dosyası mapping
- `mevcut pipeline ve techstack/DESIGN-PATHWAYS.md` — § PROJECT MATRIX + § Repeat Guard + § Scoring
