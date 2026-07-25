# M&H Žalúzie — webová stránka

Kompletná, pripravená na zverejnenie webová stránka pre **M&H Žalúzie s. r. o.**
(doména `mh-zaluzie.sk`). Postavená ako **statický web** — žiadne inštalácie,
žiadny build proces, žiadna databáza. Funguje na akomkoľvek hostingu a dá sa
jednoducho a prehľadne upravovať.

---

## 📁 Čo balík obsahuje

```
WEB01/
├── index.html                      # Domov (hero, wizard, garancie, recenzie…)
├── produkty.html                   # Produkty + porovnanie Z-90 vs C-80 + RAL vzorkovník
├── cennik.html                     # Orientačný cenník
├── o-nas.html                      # O nás a „Ako pracujeme"
├── realizacie.html                 # Galéria realizácií s filtrami
├── kontakt.html                    # Kontakt + dopytový formulár + mapa
├── ochrana-osobnych-udajov.html    # GDPR / cookies
├── 404.html                        # Stránka „nenájdené"
│
├── css/
│   └── styles.css                  # Vzhľad celého webu (farby hore v súbore)
├── js/
│   ├── config.js   ★               # HLAVNÝ konfiguračný súbor (údaje firmy)
│   ├── main.js                     # Navigácia, cookies, prepis údajov, animácie
│   ├── wizard.js                   # 3-krokový dopytový sprievodca
│   ├── form.js                     # Kontaktný formulár
│   └── gallery.js                  # Filtre v galérii
├── assets/
│   ├── favicon.svg                 # Ikona webu
│   └── img/                        # Obrázky (zástupné – nahraďte fotkami)
│
├── robots.txt · sitemap.xml · site.webmanifest · netlify.toml
└── README.md                       # Tento návod
```

> ★ **Najdôležitejší súbor pri bežných úpravách je `js/config.js`.**
> Zmena telefónu, e-mailu, otváracích hodín či nastavení sa vykoná na jednom
> mieste a automaticky sa prejaví na celom webe.

---

## 🚀 Rýchly štart — ako si web pozrieť lokálne

Stačí otvoriť `index.html` v prehliadači. Formuláre a niektoré funkcie však
najlepšie fungujú cez malý lokálny server. Ak máte nainštalovaný Python:

```bash
# v priečinku projektu spustite:
python3 -m http.server 8000
# potom otvorte v prehliadači:
# http://localhost:8000
```

---

## ✏️ Ako upraviť najčastejšie veci

### 1) Telefón, e-mail, adresa, otváracie hodiny → `js/config.js`
Otvorte `js/config.js` a upravte hodnoty v sekcii `business`. Miesta na doplnenie
sú označené `⚠ DOPLNIŤ`. **Najdôležitejšie pred spustením:**

```js
phone:     "+421 9XX XXX XXX",   // ← reálne číslo, ako sa zobrazí
phoneHref: "+4219XXXXXXXX",       // ← to isté číslo bez medzier (pre klik-na-volanie)
```

### 2) Aby formulár reálne posielal e-maily → `js/config.js` (sekcia `form`)
Bez nastavenia formulár otvorí e-mailového klienta (funguje, ale nie je to ideálne).
Pre plnohodnotné odosielanie priamo z webu odporúčame **bezplatný Web3Forms**:

1. Prejdite na <https://web3forms.com>
2. Zadajte e-mail `info@mh-zaluzie.sk` a získate **Access Key**
3. Vložte kľúč do `config.js`:
   ```js
   form: { web3formsKey: "sem-vlozte-kluc", customEndpoint: "" }
   ```
Odteraz dopyty z wizardu aj kontaktného formulára chodia priamo do e-mailu.

### 3) Google Analytics / Tag Manager → `js/config.js` (sekcia `analytics`)
```js
analytics: { ga4Id: "G-XXXXXXXXXX", gtmId: "GTM-XXXXXXX" }
```
Skripty sa načítajú **až po súhlase návštevníka** v cookie lište (GDPR-korektne).

### 4) Google mapa v kontakte → `js/config.js` (sekcia `maps`)
V Google Mapách nájdite adresu → **Zdieľať → Vložiť mapu** → skopírujte hodnotu
z atribútu `src` a vložte:
```js
maps: { embedSrc: "https://www.google.com/maps/embed?pb=..." }
```
Kým je pole prázdne, zobrazí sa elegantný zástupný blok s tlačidlom na otvorenie mapy.

### 5) Sociálne siete → `js/config.js` (sekcia `social`)
Vyplňte odkazy (Facebook / Instagram / Google recenzie). Prázdne polia sa nezobrazia.

### 6) Ceny v cenníku → `cennik.html`
Nahraďte texty `od XX €` reálnymi sumami. Tabuľka je priamo v HTML — vyhľadajte
`class="price"` a upravte hodnoty.

### 7) Skutočné fotografie realizácií → priečinok `assets/img/`

Web je už **pripravený na reálne fotky**. Na potrebných miestach (galéria
realizácií, produkty, domovská stránka) sa načítavajú tieto súbory — stačí ich
nahrať do `assets/img/` **presne s týmto názvom**:

| Názov súboru | Čo má obsahovať |
|---|---|
| `realizacia-exterierove-zaluzie.jpg` | Exteriérové žalúzie (napr. antracit, detail lamiel) |
| `realizacia-roleta-dub.jpg` | Hliníková roleta – odtieň zlatý dub / drevodekor |
| `realizacia-roleta-antracit.jpg` | Hliníková roleta – antracit |
| `realizacia-siet-proti-hmyzu.jpg` | Sieť proti hmyzu (okno / dvere) |
| `realizacia-markiza.jpg` | Markíza (balkón / terasa) |

> **Dôležité:** kým daný súbor nenahráte, na jeho mieste sa automaticky zobrazí
> zástupná ilustrácia (nikdy nie „rozbitý" obrázok). Po nahratí fotky s presným
> názvom sa reálna fotka zobrazí sama.

Odporúčania k fotkám:
- formát **JPG** (alebo WebP), šírka cca **800–1200 px**, pomer strán **4:3**,
- pred nahratím zmenšite/optimalizujte (napr. na <https://squoosh.app>) — mobilné
  fotky mávajú 3–5 MB, na web stačí do ~300 kB.

**Pridanie ďalšej realizácie do galérie** (`realizacie.html`): skopírujte jeden
`<figure class="tile">` blok a upravte `src`, `alt`, popis a kategóriu
(`data-category`: `exterier`, `rolety`, `interier`, `siete`, `markizy`):
```html
<figure class="tile" data-category="exterier">
  <img src="assets/img/moja-fotka.jpg" alt="Popis fotky" loading="lazy">
  <figcaption class="tile__cap"><b>Názov realizácie</b><span>Lokalita</span></figcaption>
</figure>
```

### 8) Texty na stránkach
Všetky texty sú priamo v HTML súboroch — stačí ich prepísať v ktoromkoľvek
textovom editore. Štruktúra a nadpisy sú prehľadne okomentované.

### 9) Farby / vzhľad značky → `css/styles.css` (úplne hore)
Firemné farby sú na jednom mieste v sekcii `:root`:
```css
--c-dark:   #2C3E50;   /* antracitová */
--c-accent: #E67E22;   /* oranžový akcent */
--c-white:  #ffffff;
```
Zmenou týchto premenných zmeníte vzhľad celého webu.

---

## 🌐 Ako web zverejniť (nasadenie)

Web je statický, takže funguje kdekoľvek. Tri najjednoduchšie možnosti:

### A) Netlify (odporúčané, zdarma, najrýchlejšie)
1. Vytvorte si účet na <https://netlify.com>.
2. Metóda „drag & drop": v Netlify → *Sites* → pretiahnite celý priečinok projektu.
3. Alebo prepojte tento Git repozitár — Netlify po každom `push` web automaticky
   aktualizuje. Konfigurácia (`netlify.toml`) vrátane 404 a hlavičiek je pripravená.
4. V *Domain settings* nastavte doménu `mh-zaluzie.sk`.

### B) GitHub Pages (zdarma)
1. V repozitári: **Settings → Pages → Source: `main` / root**.
2. Pre vlastnú doménu pridajte do koreňa súbor `CNAME` s obsahom `mh-zaluzie.sk`
   a nasmerujte DNS podľa návodu GitHubu. Súbor `.nojekyll` je už priložený.

### C) Klasický webhosting (FTP)
Nahrajte **celý obsah priečinka** (vrátane `css/`, `js/`, `assets/`) do koreňového
priečinka webu (zvyčajne `public_html/` alebo `www/`). Nič viac netreba.

---

## ✅ Kontrolný zoznam pred spustením

- [ ] Doplniť reálne **telefónne číslo** v `js/config.js` (`phone` aj `phoneHref`)
- [ ] Overiť **e-mail** `info@mh-zaluzie.sk`
- [ ] Nastaviť **doručovanie formulárov** (Web3Forms kľúč) a otestovať odoslanie
- [ ] Vložiť **Google mapu** (`maps.embedSrc`)
- [ ] Nastaviť **Google Analytics / GTM** (ak sa použije)
- [ ] Doplniť **skutočné ceny** v `cennik.html`
- [ ] Nahradiť **zástupné obrázky** reálnymi fotkami (`assets/img/`)
- [ ] Doplniť odkazy na **sociálne siete** (ak existujú)
- [ ] Skontrolovať / doplniť **Ochranu osobných údajov** podľa reálnych procesov
- [x] ~~Rastrový OG obrázok (1200×630) pre náhľady na sociálnych sieťach~~ —
      hotové: `assets/img/og-image.png` (voliteľne nahraďte vlastným záberom)
- [x] ~~Rastrové favicony / PWA ikony~~ — hotové (`favicon-32.png`,
      `apple-touch-icon.png`, `icon-192/512.png`)

---

## 🔧 Technické poznámky

- **Bez závislostí a bez buildu** — čistý HTML/CSS/JavaScript. Maximálna životnosť
  a jednoduchosť údržby.
- **Mobile-first & rýchly** — optimalizované pre mobil (>70 % návštevníkov),
  bez externých knižníc a fontov, s dôrazom na skóre Google PageSpeed.
- **SEO** — lokalizované `title`/`description` pre Bratislavu, `sitemap.xml`,
  `robots.txt` a štruktúrované dáta (LocalBusiness) na domovskej stránke.
- **GDPR** — cookie lišta so súhlasom; analytické skripty sa spúšťajú až po súhlase.
- **Prístupnosť** — sémantické HTML, klávesová ovládateľnosť, rešpektovanie
  `prefers-reduced-motion`.

---

## 💡 Ako web ďalej rozširovať

- **Nová podstránka:** skopírujte niektorý existujúci `.html` súbor, upravte obsah,
  pridajte odkaz do navigácie (`<nav class="main-nav">`) a do pätičky na všetkých
  stránkach, a doplňte URL do `sitemap.xml`.
- **Nová sekcia:** použite pripravené stavebné bloky (`.section`, `.card`,
  `.cta-band`, `.compare`, `.grid` …) — sú zdokumentované v `css/styles.css`.

V prípade otázok k štruktúre pozrite komentáre priamo v jednotlivých súboroch —
sú písané po slovensky a vysvetľujú, čo ktorá časť robí.