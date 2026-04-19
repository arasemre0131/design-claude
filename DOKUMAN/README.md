# design-claude — Kullanım Rehberi

> **Son güncelleme:** 2026-04-19
> **Durum:** Faz 0-5 tamamlandı, Faz 6 test devam
> **Amaç:** Armut ilanından 30 dakikada çalışır dev server'a uzanan tek-zincir pipeline.

---

## Sistem özeti (5 cümle)

`design-claude` 10 sektör × 10 stil = 100 hücrelik bir tasarım karar ağı. Her kombinasyon önceden YAML'e kodlanmış (atoms + sektör anti-cliché + stil forbidden + compatibility), böylece Claude hiçbir "vibe coded" klişeye düşmeden her projeye **farklı** bir tasarım dili uygular. Katalog (356 YAML), live preview-app (60+ route), 4 ayrı tier'a göre scaffolder CLI (Next.js 16 / WordPress + Elementor / Shopify Hydrogen / Enterprise Turborepo) ve `/project-start` slash komutu ile uçtan uca çalışır. Senin yazdığın brief'ten kopana dek, `design-council` (14 agent) → `catalog-query` (3 preset A/B/C öner) → scaffold CLI (5 dk içinde dev-server ready) zinciri otomatik. Her aşamada senin onayın var — AI klişeye saplanıp seni aynı `#0A0A0A + gold` tuzağına geri götürmez.

---

## Bu repo ne işe yarar

| Sorun | Çözüm |
|-------|-------|
| **Her sitede aynı dark+gold+glass** klişesine saplanmak | 10 stil × 10 sektör matrix, forbidden combinations, repeat-guard |
| **Her projede 2 hafta "tasarım kararı"** tartışması | 60 preset önceden hazır, 3 alternatif otomatik öneriliyor |
| **Next.js boilerplate** her defa sıfırdan | 4 scaffolder CLI, 5 dakikada çalışır dev server |
| **Yasaklı ID'leri hatırlama** yükü | `validate-combo.js` + `compatibility.yaml` otomatik kontrol |
| **Armut ilanından teslime** manuel 20 adım | `/project-start` tek slash ile 8 stage zinciri |

---

## Hızlı başlangıç (3 komut)

### 1) Preview app — 60 preset canlı göster

```bash
cd C:/Users/EAS/Desktop/armut/research/design-claude/preview-app
pnpm install
pnpm dev
```

Tarayıcı aç: `http://localhost:3000/gallery`

- **Gallery** → tüm preset kartları (filtre: sektör + stil + tier)
- **Preview** → `/preview/{preset-id}` tek preset tam render
- **Compare** → `/compare?a={id1}&b={id2}` yan yana iframe karşılaştırma

### 2) Yeni proje üret — Scaffold CLI

```bash
cd C:/Users/EAS/Desktop/armut/research/design-claude/
node scaffold.js mucevher-editorial-luxury --out ../fatih-bey-v2/
cd ../fatih-bey-v2/
pnpm install
pnpm dev
```

5 dakika içinde `localhost:3000` açık, preset-spesifik placeholder anasayfa çalışıyor.

### 3) Tek komutla tam pipeline — Slash command

Claude Code içinde:

```
/project-start "Ankara mücevherci, 25K TL, 3D ürün viewer, KVKK + iyzico, 2 Mayıs teslim"
```

Bu komut şunları otomatik yapar:
1. Sektör + bütçe + feature tespiti (tier = premium, recipe = next-r3f)
2. `design-council` 14 agent → 3 combo A/B/C
3. `catalog-query` → 3 preset öneri + anti-cliché validator
4. Senin onayın → scaffold CLI → dev server
5. `seo-audit` + `schema-markup` + `code-reviewer` + `launch-strategy` zincir

**Durmak istersen:** Her stage'de onay istenir, geri çevirebilirsin.

---

## 10 stil × 10 sektör — Tam tablo

Tam tablo: [`catalog/MATRIX.md`](../catalog/MATRIX.md) (otorite)

| Stil \ Sektör | İnşaat | Mücevher | Kuaför | Restoran | Klinik | E-ticaret | Spa | Fotoğraf | Gayrimenkul | Otel |
|--------------|--------|----------|--------|----------|--------|-----------|-----|----------|-------------|------|
| **brutalist** | ✓ | ✗ | ✗ | ⚠ | ✗ | ✓ | ✗ | ⚠ | ✗ | ✗ |
| **editorial-luxury** | ⚠ | ✓✓ | ✓ | ✓ | ✓✓ | ⚠ | ✓ | ✓ | ✓ | ✓ |
| **kinetic-agency** | ✓ | ⚠ | ✓ | ⚠ | ✗ | ✓ | ✗ | ✓ | ⚠ | ⚠ |
| **immersive-3d** | ✓ | ✓ | ✗ | ✗ | ⚠ | ✓ | ✗ | ✓ | ✓ | ✓ |
| **maximalist-atmospheric** | ✗ | ⚠ | ⚠ | ✓ | ✗ | ⚠ | ✗ | ✓ | ✗ | ✓ |
| **minimal-swiss** | ✓ | ✓ | ✓✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **warm-organic** | ⚠ | ✓ | ✓ | ✓ | ✓ | ⚠ | ✓✓ | ⚠ | ✓✓ | ✓✓ |
| **data-dense-dashboard** | ✓ | ✗ | ✗ | ✗ | ⚠ | ✓✓ | ✗ | ✗ | ⚠ | ✗ |
| **editorial-print** | ⚠ | ✓ | ⚠ | ✓✓ | ⚠ | ⚠ | ⚠ | ✓✓ | ⚠ | ⚠ |
| **industrial-workwear** | ✓✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |

**Legend:** ✓✓ default | ✓ aktif | ⚠ koşullu | ✗ forbidden

**10 sektör:** insaat · mucevher · kuafor · restoran · klinik · eticaret · spa · fotograf · gayrimenkul · otel
**10 stil:** brutalist · editorial-luxury · kinetic-agency · immersive-3d · maximalist-atmospheric · minimal-swiss · warm-organic · data-dense-dashboard · editorial-print · industrial-workwear

---

## 5 Tier bütçe → Scaffold eşleşmesi

| Tier | Bütçe (TL) | Teslim | Recipe | Scaffold CLI | Örnek müşteri |
|------|------------|--------|--------|--------------|---------------|
| **ultra-budget** | < 7.500 | 2-3 gün | `nextjs-template-swap` | (manuel template swap) | Vitanatur-tarzı tek sayfa |
| **budget** | 7.5K – 15K | 3-7 gün | `wordpress-elementor-motion` | `scaffold-wp.js` | KADIKOY kuaför, berber |
| **mid** | 15K – 25K | 2-3 hafta | `next-premium` | `scaffold.js` | Fatih Bey Mücevher |
| **premium** | 25K – 80K | 3-5 hafta | `next-r3f` veya `shopify-hydrogen` | `scaffold.js` / `scaffold-shopify.js` | Premium mobilya + AR |
| **enterprise** | 80K+ | 6-12 hafta | `next-enterprise-monorepo` | `scaffold-enterprise.js` | Multi-tenant SaaS + SLA |

**Kural:** Brief'te `3d-viewer` / `ar` / `configurator` geçerse tier zorla ≥ premium. `multi-tenant` / `SLA` / `observability` geçerse zorla enterprise.

---

## Scaffold CLI — Hangisi ne için

```
C:/Users/EAS/Desktop/armut/research/design-claude/
├── scaffold.js                     # Next.js 16 (premium + mid)
├── scaffold/
│   ├── nextjs-16-base/             # Template (scaffold.js kaynağı)
│   ├── wordpress-elementor/
│   │   └── scaffold-wp.js          # WordPress + Elementor (budget)
│   ├── shopify-hydrogen/
│   │   └── scaffold-shopify.js     # Shopify Hydrogen (premium e-com)
│   └── enterprise-monorepo/
│       └── scaffold-enterprise.js  # Turborepo (enterprise)
```

**Komut özeti:**

```bash
# Next.js 16 (mid + premium)
node scaffold.js <preset-id> --out ./path/

# WordPress + Elementor (budget)
node scaffold/wordpress-elementor/scaffold-wp.js <preset-id> --out ./path/

# Shopify Hydrogen (premium e-com)
node scaffold/shopify-hydrogen/scaffold-shopify.js <preset-id> --out ./path/

# Enterprise Turborepo
node scaffold/enterprise-monorepo/scaffold-enterprise.js <preset-id> --out ./path/
```

`--force` flag: mevcut klasörü sil + yeniden oluştur.

---

## 60 preset — Özet

Tam liste: [`catalog/presets/`](../catalog/presets/) (64 YAML)
Karar matrisi: [`catalog/MATRIX.md`](../catalog/MATRIX.md)

Her preset:
- `catalog/presets/{sector}-{style}.yaml` → atom listesi + anti-cliché + repeat-guard
- `preview-app/app/preview/{preset-id}/` → canlı render
- `scaffold/*.js` → dev-server-ready proje

Örnek: `mucevher-editorial-luxury`
- Sektör: mücevher | Stil: editorial-luxury | Tier: mid
- Palette: PL22 (Tobacco+Pearl), Typography: TY27 (Fraunces + IBM Plex)
- Recipe: next-r3f, 3D ürün viewer + AR try-on opsiyonel
- Yasak: PL1, TY1/2/4/8, HR2, K1, T6 (dark+gold klişesi engeli)

---

## Önemli komutlar — Cheatsheet

| Komut | Ne yapar |
|-------|----------|
| `node scripts/validate-combo.js <combo.yaml>` | Combo'yu anti-cliché + repeat-guard kontrol et |
| `node scaffold.js <preset> --out <path>` | Next.js 16 projesi üret |
| `node scaffold.js <preset> --out <path> --force` | Mevcut klasörü silip yeniden üret |
| `/project-start "<brief>"` | Pipeline başlat (Claude Code) |
| `/catalog-query <sector> <budget> <features>` | 3 preset öneri (manuel) |
| `/design-council <proje> <brief>` | 14 agent council (manuel) |
| `cd preview-app && pnpm dev` | Gallery + preview server |
| `node scripts/validate-combo.js --matrix` | Matrix tablosunu tazele |

---

## Doküman indeksi

| Doküman | Ne için okunur |
|---------|----------------|
| [README.md](README.md) (bu dosya) | İlk okunan, hızlı başlangıç |
| [CATALOG-STRUCTURE.md](CATALOG-STRUCTURE.md) | YAML schema + yeni atom/preset ekleme |
| [PIPELINE-GUIDE.md](PIPELINE-GUIDE.md) | `/project-start` + 8 stage detayı + 5 senaryo |
| [TROUBLESHOOT.md](TROUBLESHOOT.md) | Hata → çözüm listesi |
| [SYSTEM-OVERVIEW.md](SYSTEM-OVERVIEW.md) | 4 katman mimari + faz geçmişi |

---

## Commit history — Özet

| Faz | Tarih | Commit | Özet |
|-----|-------|--------|------|
| 0 + 0.5 | 19 Nis 12:28 | `619cd3b` | 296 dosya, 16.8K satır (atoms + sectors + styles + recipes + techstack + 4 agent draft) |
| 1 | 19 Nis (faz) | `e8fc6e6` | catalog-query skill + validate-combo.js + MATRIX.md + compatibility.yaml (2.1K satır) |
| 2 | 19 Nis (faz) | `82ea36c` | 60 preset YAML (10 stil × sektör) |
| 3 | 19 Nis 18:03 | `f190a68` | Next.js 16 scaffolder + preview-app (60 route) + 64 component (17.2K satır) |
| 4 | 19 Nis 18:33 | `9a4dfae` | WP Elementor + Shopify Hydrogen + Turborepo (141 dosya, 12K satır) |
| 5 | 19 Nis | `35ab6d6` | `/project-start` + pipeline hook + Stage 6.75+6.8 + memory entry |

**Toplam:** ~500 dosya, ~35.000 satır, 6 major commit.

---

## Bir sonraki adım

1. **Faz 6 test:** Paralelde başka agent test scaffold çalıştırıyor
2. **Senin işin:** Preview app'i aç, 5 preset'e göz at, `mucevher-editorial-luxury` + `kuafor-warm-organic` + `insaat-industrial-workwear` scaffold'unu dene
3. **İlk gerçek kullanım:** Bir sonraki Armut ilanı geldiğinde `/project-start "<brief>"` dene
4. **Sorun çıkarsa:** [TROUBLESHOOT.md](TROUBLESHOOT.md) ilk bakılacak yer

---

## Lisans + kullanım

Private. Sadece Emre (Gokhan Emre Aras) ve Armut üstünden aldığı müşteri projeleri için.

Referans research'ler:
- `C:/Users/EAS/Desktop/armut/FRONTEND-TECHSTACK.md` (82 entry)
- `C:/Users/EAS/Desktop/armut/3D-TECHSTACK.md` (99 entry)
- `C:/Users/EAS/Desktop/armut/Mobilyacı/3d-demo/research/` (239 dosya, 14MB)
- `C:/Users/EAS/Desktop/armut/Fatih Bey Mucevher Sitesi/research/` (49 dosya)
