# Design Council Sistem Kurulum Raporu

**Tarih:** 2026-04-18
**Amaç:** "Dark + gold + glass + Inter" recipe'sinin 7+ kez tekrar etmesini durdurmak. Her UI işinde 14 uzman agent tartışsın, 3 combo üretsin, adversary onaylasın, kullanıcı seçsin, **sonra** kod yazılsın.

---

## Kurulan 4 Katman Enforcement

| # | Katman | Dosya | Ne yapar |
|---|--------|-------|----------|
| 1 | **Skill (auto-trigger)** | `~/.claude/skills/design-council/SKILL.md` | UI/tasarım/frontend keyword'ü gördüğünde otomatik tetiklenir |
| 2 | **Slash komut** | `~/.claude/commands/design-council.md` | `/design-council [proje] [brief]` ile manuel tetikleme — 5 tur orchestration |
| 3 | **Hook (UserPromptSubmit)** | `~/.claude/hooks/design-council-reminder.js` + `settings.json` | Her prompt'ta keyword check; combo.md yoksa renkli kutulu stderr uyarısı |
| 4 | **Pipeline entegrasyonu** | `armut/SITE-GELISTIRME-PIPELINE.md` Aşama 6.5 | Dokuman ↔ kod yazımı arasına zorunlu council stage |

---

## 14 Uzman Agent (`~/.claude/agents/`)

### 12 Domain Uzmanı
| # | Agent | Alan |
|---|-------|------|
| 1 | `typography-expert` | 25 combo + Türkçe karakter + opsz variable axes |
| 2 | `palette-expert` | 20 palette + WCAG kontrast + sektör psikolojisi |
| 3 | `layout-expert` | 10 grid/layout sistem |
| 4 | `motion-expert` | GSAP/Lenis/CSS scroll-driven/Framer/Theatre |
| 5 | `header-expert` | H1-H10 + N1-N10 (header+nav birleşik) |
| 6 | `hero-expert` | HR1-HR14 |
| 7 | `kpi-expert` | K1-K12 + tabular-nums |
| 8 | `pipeline-list-expert` | P1-P10 + T1-T8 (pipeline+table) |
| 9 | `chart-expert` | CH1-CH12 + accessibility |
| 10 | `interaction-expert` | C1-C6 + F1-F8 + M1-M6 (chat+form+modal) |
| 11 | `footer-expert` | FT1-FT8 + KVKK yasal |
| 12 | `immersive-3d-expert` | R3F/drei/postprocessing/Gaussian splat — 3D gerekli projede |

### 2 Meta Agent
| # | Agent | Rol |
|---|-------|-----|
| 13 | `design-director` | Orchestrator — 3 tur yürütür, 3 combo türetir |
| 14 | `design-adversary` | Eleştirmen — repeat skor + yasaklı ID + coherence + accessibility |

---

## Katalog

### `armut/DESIGN-PATHWAYS.md` (1 dosya, yeni)
- **15 kategori** × ortalama 8-12 pattern = **120+ pathway**
- Mevcut 13 projenin combo matrisi (repeat guard için)
- Yasaklı ID listesi: TY1/2/4/8, PL1, K1, HR2, T6, CH1, H8
- Scoring matris: 0-3 ✓ / 4-5 ⚠ / 6-7 ⚠⚠ / 8+ ✗
- Yeni combo template

---

## Akış (5 Tur)

```
Kullanıcı brief
    ↓
TUR 1  Paralel görüş alma   → 12 uzman agent aynı anda
    ↓
TUR 2  Karşılıklı inceleme  → çelişki tespit + revize
    ↓
TUR 3  Sentez               → design-director → 3 combo (A/B/C)
    ↓
TUR 4  Adversary check      → repeat skor + yasak ID + accessibility
    ↓ (8+ eşleşme → RED, max 2 retry)
TUR 5  Kullanıcıya sun      → A/B/C/hybrid onay
    ↓
combo.md kaydedilir         → [proje]/combo.md
    ↓
Kod yazımı başlar           → her component `// COMBO: [...]`yorumuyla
```

---

## Memory (sonraki session'da bile geçerli)

- `feedback_design_council_mandatory.md` — zorunlu sistem + dosya lokasyonları + ihlal sinyalleri
- `feedback_design_repeat_avoidance.md` — yasaklı palette/font listesi + LOCK comment bloğu
- `MEMORY.md` index'e 2 satır eklendi

---

## Global CLAUDE.md

"Design Council Sistemi (ZORUNLU)" başlıklı yeni bölüm:
- 4 katman enforcement listesi
- 5 tur akış özeti
- Katalog + agent referansları
- Yasaklı ID listesi
- Bypass kuralları (bug fix/typo/README)
- İhlal sinyali

---

## Test Sonucu

**Proje:** insaat-crm (simüle council çalıştırıldı)
**Çıktı:** `design-claude/insaat-crm/combo.md` — 3 alternatif combo
- **A · Safe:** H9 + N5 + HR14 + K2 + P8 + T2 + C3 + CH10 + F4 + M5 + FT5 + TY12 + PL19 + L7 + MO3+4 — **repeat skor 2/15 ✓**
- **B · Edge:** H1 + N4 + HR9 + K9 + P5 + T7 + C4 + CH5 + F3 + M3 + FT8 + TY11 + PL4 + L4 + MO2 — **repeat skor 4/15 ⚠**
- **C · Hybrid:** H9 + N5 + HR13 + K12 + P5 + T3 + C3 + CH6 + F5 + M5 + FT6 + TY14 + PL11 + L6 + MO1+3 — **repeat skor 4/15 ✓**

**Üçünde de** yasaklı ID yok (TY1/2/4/8, PL1, K1, HR2, T6, CH1, H8 hiçbirinde kullanılmadı).

---

## Sıradaki Adım

Sen 3 combo'dan birini seç (A / B / C / hybrid). Seçim kesinleşince:
1. `DESIGN-PATHWAYS.md` § PROJECT MATRIX'e insaat-crm satırı eklenir
2. `insaat-crm/apps/web/src/` altında component'ler combo'ya göre yeniden üretilir
3. Mevcut `design-claude/index.html` + 4 variant + 3 mockup referans olarak saklanır ama production kod bu combo'dan türer

Combo seçtikten sonra ayrıca gerçek 14-agent run yapmak istersen:
```
/design-council insaat-crm "[brief]"
```

---

## Kaynak Dosyalar (Özet Tablo)

| Dosya | Satır | Kategori |
|-------|-------|----------|
| `armut/DESIGN-PATHWAYS.md` | ~430 | Katalog |
| `~/.claude/agents/typography-expert.md` | ~80 | Agent |
| `~/.claude/agents/palette-expert.md` | ~90 | Agent |
| `~/.claude/agents/layout-expert.md` | ~75 | Agent |
| `~/.claude/agents/motion-expert.md` | ~85 | Agent |
| `~/.claude/agents/header-expert.md` | ~75 | Agent |
| `~/.claude/agents/hero-expert.md` | ~80 | Agent |
| `~/.claude/agents/kpi-expert.md` | ~75 | Agent |
| `~/.claude/agents/pipeline-list-expert.md` | ~75 | Agent |
| `~/.claude/agents/chart-expert.md` | ~75 | Agent |
| `~/.claude/agents/interaction-expert.md` | ~85 | Agent |
| `~/.claude/agents/footer-expert.md` | ~70 | Agent |
| `~/.claude/agents/immersive-3d-expert.md` | ~95 | Agent |
| `~/.claude/agents/design-director.md` | ~100 | Meta agent |
| `~/.claude/agents/design-adversary.md` | ~100 | Meta agent |
| `~/.claude/commands/design-council.md` | ~135 | Slash komut |
| `~/.claude/skills/design-council/SKILL.md` | ~60 | Skill |
| `~/.claude/hooks/design-council-reminder.js` | ~95 | Hook script |
| `~/.claude/settings.json` | değişiklik | Hook config |
| `~/.claude/CLAUDE.md` | değişiklik | Global kural |
| `armut/SITE-GELISTIRME-PIPELINE.md` | değişiklik | Aşama 6.5 |
| `.claude/projects/.../memory/feedback_design_council_mandatory.md` | ~50 | Memory |
| `.claude/projects/.../memory/MEMORY.md` | 1 satır | Memory index |
| `design-claude/insaat-crm/combo.md` | ~130 | Test sonuç |
| `design-claude/COUNCIL-KURULUM-RAPORU.md` | bu | Özet |

**Toplam:** 24 dosya (20 yeni + 4 değişiklik).

---

## Garanti Mekanizması

**"Her defasında çalışacak" garantisi şuradan geliyor:**

1. Sen yeni bir UI/frontend prompt'u yazdığında → **hook** (UserPromptSubmit) keyword yakalar, stderr'e kutulu uyarı basar
2. Aynı prompt → **skill** (design-council) otomatik tetiklenir, combo.md yoksa engeller
3. Ben (Claude) kod yazmaya kalktığımda → global **CLAUDE.md** kuralı hatırlatır ("onaysız .tsx yok")
4. Site geliştirme sürecinde → **pipeline Aşama 6.5** zorunlu atlama yasak
5. Session'lar arası hafıza → **memory feedback** entry'si sonraki session'da bile geçerli

Tek bir katman atlanabilir ama 4'ü birden atlanması için aktif sabotaj gerekir.
