---
name: local-business-website
description: >-
  Build a complete, publish-ready marketing / lead-generation website for a
  local business or service (tradesperson, dentist, café, cleaning company,
  small B2B, etc.) from a brief. Produces a static, no-build, multi-page site —
  hand-written HTML/CSS/vanilla-JS themed to the client's brand — with a
  conversion-focused homepage (hero + inquiry wizard), services, pricing,
  gallery, and a contact page with a working form, plus SEO, GDPR cookie
  consent, a config-driven data layer, branded placeholder imagery, and browser
  verification. Use whenever the user wants to CREATE or BUILD a website, landing
  page, company/presentation/brochure site, "web na kľúč", small-business site,
  or a site to get inquiries/leads — of ANY design or theme — even from just a
  brief/PDF. Also use it to add pages, wire real photos, embed a map, or set up
  forms/analytics on a site built this way. Do NOT use for web apps with
  logins/databases, e-commerce checkouts, CMS (WordPress) work, or single-file
  claude.ai artifacts.
---

# Local-business / lead-gen website builder

This skill captures a proven, repeatable pipeline for turning a brief into a
complete, publish-ready website that a non-technical owner can maintain. It is
**design-agnostic**: the same architecture powers wildly different brands — you
re-theme it, you don't rebuild it.

## Why this architecture (read before deviating)

The default is a **static, no-build, multi-page site** (plain HTML + one CSS
file + a few vanilla-JS files). This is a deliberate choice, not laziness:

- **Publishable anywhere, instantly** — drop the folder on Netlify, GitHub
  Pages, or any FTP host. No Node, no build, no server, nothing to break.
- **The owner can actually maintain it** — editing HTML/text or one `config.js`
  is realistic for a small-business owner; a React/CMS build is not.
- **Longevity & speed** — no dependencies to rot, no build to fail; trivially
  hits high PageSpeed scores because there are no frameworks or web fonts.

Deviate only when the brief genuinely needs it: logins/accounts, a database,
real e-commerce checkout, or dozens of frequently-changing content items (then
a static-site generator or CMS is warranted). A "modern look", animations, or a
few dozen pages are **not** reasons to abandon static.

## The data layer that makes it maintainable

All data that appears in many places (phone, e-mail, address, hours, coverage
area, analytics IDs, form key, map, social, review rating) lives in **one**
file, `js/config.js`. `main.js` binds it into the HTML through attributes:

- `data-mh="business.phone"` → sets the element's text
- `data-mh-tel` / `data-mh-mail` → sets `tel:` / `mailto:` href
- `data-mh-href="social.googleReviews"` → sets href from config
- `data-mh-hours`, `data-mh-coverage`, `data-mh-map`, `data-mh-social` → rendered lists/blocks

Page-specific content (product copy, prices, RAL/colour swatches, gallery items)
lives directly in the HTML where it's shown once — **one source of truth**,
SEO-friendly, visible without JS. Don't duplicate content into config.

The bundled `assets/engine/` files are the proven implementation of all of the
above. **Start every project by copying them in** — don't rewrite them:

```
assets/engine/config.js  → js/config.js     (fill from brief)
assets/engine/main.js    → js/main.js        (reuse as-is)
assets/engine/wizard.js  → js/wizard.js      (reuse as-is)
assets/engine/form.js    → js/form.js        (reuse as-is)
assets/engine/gallery.js → js/gallery.js     (reuse as-is)
assets/engine/styles.css → css/styles.css    (RE-THEME via :root tokens)
assets/engine/favicon.svg→ assets/favicon.svg (redraw for the brand)
```

## Workflow (phases)

Track these with your todo tool; they run roughly in order but iterate freely.

### 1. Intake — turn the brief into a spec
- If the brief is a PDF/DOCX, extract it (use the `pdf` / `docx` skills). If
  `pdftoppm`/pypdf fail on `_cffi_backend`, run `pip install --force-reinstall cffi`.
- Pull out and write down: legal + short business name, domain, ID numbers,
  address, phone, e-mail, hours, service area; **brand colours**; information
  architecture (page list); the actual **copywriting** for each page; and any
  special features (comparison tables, swatches, price tables, wizard steps,
  map, reviews). A good brief already contains the copy — use it verbatim.
- Note the site's **language** — all UI text, comments, and the README go in
  the client's language, not English.

### 2. Scaffold — engine first, tokens first
- Copy `assets/engine/*` into place (table above).
- Open `css/styles.css` and set the brand in the `:root` tokens (`--c-dark`,
  `--c-accent`, `--c-white`, plus derived shades). Re-theming the tokens
  changes the whole site. This is where "different designs/themes" happens —
  colours, radius, font stack, shadows, hero treatment.
- Fill `js/config.js` from the brief (leave `⚠ DOPLNIŤ` where the client still
  owes real data — e.g. the real phone number).

### 3. Build pages from the copy
Standard set (rename per brief): `index.html`, plus service/product, pricing,
about, gallery, contact, a privacy/GDPR page, and `404.html`. Every page shares
the same header, footer, cookie bar, and mobile CTA bar. See
`references/components.md` for the copy-paste component library (header, hero,
3-step wizard, benefit/guarantee cards, comparison table, swatch grid, price
table, gallery+filters, contact form, footer, cookie bar) and the exact
`<head>` block (SEO meta, Open Graph, favicons, JSON-LD).

Conversion essentials on the homepage: a strong hero with two CTAs, the **3-step
inquiry wizard** (higher conversion than a static form), trust/benefit blocks,
an education/"did you know" stat block, social proof, and a closing CTA band.

### 4. Imagery
- Generate branded **placeholder** images so the site looks complete before the
  client sends photos: `python scripts/gen_placeholder_svgs.py` (SVG, brand
  colours, self-contained). See its `--help`.
- Render the **raster** OG image (1200×630 PNG) and favicons from SVG with
  `node scripts/render_raster.js` — social platforms won't render SVG previews.
- When the client sends **real photos**, run `python scripts/optimize_photos.py`
  (fixes EXIF rotation, strips metadata, resizes, recompresses) and, if they
  used generic names, pass `--rename map.json` to give SEO-friendly filenames.
  Wire photos in with an `onerror` fallback so nothing ever looks broken before
  upload — see `references/components.md`.

### 5. SEO, legal, performance, accessibility
Details in `references/seo-legal-perf.md`. The must-haves:
- Localised `<title>`/`meta description` per page; `sitemap.xml`; `robots.txt`;
  LocalBusiness JSON-LD on the homepage; canonical URLs; Open Graph + Twitter.
- **GDPR cookie consent** bar; analytics (GA4/GTM) load **only after consent**
  (already implemented in `main.js`).
- Performance: `preload` CSS + hero image, `fetchpriority="high"` on the LCP
  image, `decoding="async"` + `loading="lazy"` on images, explicit
  `width`/`height` to avoid layout shift.
- Accessibility: one `<h1>` per page, a "skip to content" link, keyboard-usable
  nav, `prefers-reduced-motion` respected.

### 6. Verify in a real browser (do not skip)
Run `node scripts/verify_site.js --root . --ignore '\.jpg$'` (ignore the photo
names that intentionally 404 before upload). It serves the site, loads every
page, and fails on JS errors, broken internal links/assets, missing a11y
basics, or a non-working mobile menu — then screenshots every page for a visual
pass. **Look at the screenshots.** Read `references/pitfalls.md` for the
specific bugs this catches (they are subtle and easy to reintroduce).

### 7. Deliver
- Write a `README.md` **in the client's language** explaining how to edit
  common things (via `config.js`), add photos, set up form delivery
  (Web3Forms), analytics, the map, and how to deploy (Netlify / GitHub Pages /
  FTP), plus a pre-launch checklist.
- Add `.nojekyll` (GitHub Pages), a `netlify.toml` (headers + 404 + caching),
  `site.webmanifest`, `.gitignore`.
- Commit and push. If the client pushes their own commits (photo uploads etc.),
  `git fetch` + `git rebase` onto their work rather than clobbering it.

## Core principles (these are what make the result trustworthy)

- **Never fabricate social proof.** Do not invent customer testimonials, names,
  star counts, or review numbers. If you can't obtain real reviews (Google Maps
  is JS-rendered and usually un-scrapeable), show the *real* aggregate rating
  the owner gives you, link it to their Google profile, and ask them to paste
  real quotes. A believable fake review is still a fake review.
- **Real business facts only.** Use exact address/ID/phone from the brief; where
  a real value is still missing, leave a clearly-marked placeholder — never a
  plausible-looking invention.
- **Config-driven & no-build** — keep cross-cutting data in `config.js`; keep
  the site buildless so the owner can host and edit it anywhere.
- **Honest imagery** — never lift other people's photos (e.g. reviewers' photos
  from Google) onto the site; use the client's own or clearly-branded
  placeholders.
- **Client's language everywhere** the owner or their visitors will read.

## Reference files (load as needed)
- `references/components.md` — copy-paste HTML/CSS component library + the exact `<head>`.
- `references/seo-legal-perf.md` — SEO, JSON-LD, GDPR/cookies, performance, deploy files.
- `references/pitfalls.md` — concrete bugs from real builds and how to avoid them.

## Bundled scripts
- `scripts/gen_placeholder_svgs.py` — branded SVG placeholders (hero, cards, OG).
- `scripts/render_raster.js` — SVG → PNG (OG 1200×630 + favicons) via Chromium.
- `scripts/optimize_photos.py` — EXIF-fix, strip, resize, recompress, rename.
- `scripts/verify_site.js` — browser verification + screenshots (run before delivery).

Dependencies these assume: `playwright-core` (Chromium at `/opt/pw-browsers`),
`Pillow`. Install if missing; the scripts print clear errors otherwise.
