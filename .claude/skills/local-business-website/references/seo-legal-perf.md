# SEO, legal (GDPR), performance & deploy

## SEO
- **Per-page `<title>` and `meta description`**, localised and, for local
  businesses, location-qualified (e.g. "Exteriérové žalúzie Bratislava | Brand").
  Titles ~50–60 chars, descriptions ~150–160.
- **Canonical** URL on every page. **Open Graph + Twitter** tags (see components
  `<head>`), pointing at the **raster** `og-image.png` (1200×630) — not SVG.
- **`sitemap.xml`** listing every indexable page with `<lastmod>` (today) and
  sensible `<priority>`; **`robots.txt`** allowing all and pointing to the
  sitemap. Exclude `404.html` (give it `<meta name="robots" content="noindex">`).
- **LocalBusiness JSON-LD** on the homepage — the concrete schema type
  (`HomeAndConstructionBusiness`, `Dentist`, `Restaurant`, …), name, image, url,
  email, telephone, `address` (PostalAddress), `areaServed`,
  `openingHoursSpecification`, and `makesOffer` for the main services.
- **Do NOT add `aggregateRating` to JSON-LD** unless you have a real rating AND
  a real review count from the client, and the reviews are shown on-page.
  Self-serving or invented rating markup risks a Google manual action.
- One `<h1>` per page; logical heading order; descriptive `alt` on images;
  human-readable URLs (`produkty.html`, not `p1.html`).

## Legal / GDPR (EU)
- A **cookie consent bar** is required if you load any non-essential cookies.
  `main.js` already gates analytics: GA4/GTM load **only** after the visitor
  clicks "Accept" (choice stored in `localStorage`). "Only necessary" loads
  nothing. Never fire analytics before consent.
- Ship a **privacy policy page** (data controller, data collected, purpose &
  legal basis, retention, processors, cookies, data-subject rights, supervisory
  authority). Mark it clearly as a **template to be reviewed by the operator** —
  you are not their lawyer; don't invent retention periods or processor names as
  if final.
- The contact form's GDPR consent checkbox must be **required** and name the
  data controller + link the privacy page.

## Performance (aim: PageSpeed ≥ 90, effortless with static)
- `preload` the CSS; on the homepage also `preload` the hero image and give the
  hero `<img>` `fetchpriority="high"`.
- Every `<img>`: explicit `width`/`height` (prevents layout shift),
  `decoding="async"`, and `loading="lazy"` for anything below the fold (NOT the
  hero/LCP image).
- Keep it dependency-free: no frameworks, no web fonts, inline SVG icons,
  self-contained SVG placeholders. Optimise real photos with
  `scripts/optimize_photos.py` (target ≤ ~300 kB, ≤ ~1600 px).
- Raster the OG image and favicons with `scripts/render_raster.js`.

## Accessibility
- Skip-to-content link (`.skip-link` → `#obsah`), `<main id="obsah" tabindex="-1">`.
- Keyboard-operable nav (hamburger is a real `<button>` with `aria-expanded`/
  `aria-controls`); visible focus styles; `prefers-reduced-motion` disables the
  reveal animations (handled in the CSS).
- Colour contrast AA; don't encode meaning in colour alone.

## Deploy files to include
- **`.nojekyll`** — empty file; lets GitHub Pages serve `assets/` etc. untouched.
- **`netlify.toml`** — `publish="."`, a 404 redirect, security headers
  (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`) and long-cache headers for `/assets/*`.
- **`site.webmanifest`** — name, theme/background colour, icons (SVG + PNG
  192/512 maskable).
- **`.gitignore`** — OS/editor junk, `node_modules/`, build/cache dirs.

## Deploy targets (put in the README, in the client's language)
1. **Netlify** — drag-and-drop the folder, or connect the repo for auto-deploy;
   `netlify.toml` is picked up automatically. Set the custom domain.
2. **GitHub Pages** — Settings → Pages → branch/root. Add a `CNAME` file with
   the domain for a custom domain. `.nojekyll` is already present. Note: Pages +
   the browser cache HTML for a few minutes — after an update, a hard refresh
   (Ctrl/Cmd+F5) shows the new version; different pages can update at slightly
   different times (this is caching, not a bug).
3. **Classic FTP hosting** — upload the whole folder into `public_html`/`www`.

## Git workflow
Commit in logical chunks. If the client pushes their own commits (e.g. uploads
photos through the GitHub UI) and your push is rejected: `git fetch origin
<branch>` then `git rebase origin/<branch>` onto their work (their upload is
usually just new files → conflict-free), then push. Never force-clobber their
commit.
