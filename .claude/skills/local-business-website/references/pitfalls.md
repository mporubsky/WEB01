# Pitfalls & gotchas (learned from real builds)

Each is a real bug that shipped or nearly shipped. Format: **symptom → cause → fix.**

## 1. Content invisible when JS is off / blank in screenshots
**Symptom:** whole sections are blank without JavaScript (bad for SEO, no-JS
users) and appear empty in full-page screenshots.
**Cause:** reveal-on-scroll elements start at `opacity:0` and only un-hide via JS.
**Fix:** scope the hidden state to `html.js [data-reveal]` and set the class with
an inline `<script>document.documentElement.className+=" js";</script>` **in
`<head>`** (before the stylesheet, so there's no flash). No JS ⇒ no `.js` class ⇒
content is always visible. Make the reduced-motion override win with
`html.js [data-reveal]{opacity:1!important;transform:none!important}`.

## 2. Form success message never appears
**Symptom:** the form submits (network call fires) but the "thank you" alert
never shows.
**Cause:** the `[data-form-alert]` box sits **outside** `<form>`, but the code
looked it up with `form.querySelector(...)` → `null`.
**Fix:** find it with `document.querySelector('[data-form-alert]')`. (Already
fixed in the bundled `form.js`.) Lesson: query page-level status elements from
`document`, not the form.

## 3. Mobile CTA button shows on desktop / phone number wraps
**Symptom:** two "Book now" buttons on desktop and the header phone breaks onto
several lines.
**Cause:** the in-nav CTA (`.header-mobile-cta`) had no desktop rule, and the
phone had no `nowrap`.
**Fix:** `.header-mobile-cta{display:none}` by default and show it only inside
the mobile menu media query; `.header-phone{white-space:nowrap}`. (Already in
the bundled CSS.)

## 4. Social share preview is blank
**Symptom:** Facebook/LinkedIn/iMessage show no image for the link.
**Cause:** `og:image` pointed at an **SVG**; most platforms only accept raster.
**Fix:** render a 1200×630 **PNG** (`scripts/render_raster.js`) and point
`og:image` at it, with `og:image:width/height/type` set.

## 5. Rastered icons don't match their declared sizes
**Symptom:** `favicon-32.png` is actually 64×64; OG is 2400×1260.
**Cause:** Chromium screenshot with `deviceScaleFactor:2` doubles pixels.
**Fix:** render at `deviceScaleFactor:1`. (The bundled script already does.)

## 6. A Node script won't parse: "Unexpected identifier"
**Symptom:** `node --check` fails inside what looks like a comment.
**Cause:** the sequence `*/` appeared **inside** a `/* … */` block comment (e.g.
writing a glob like `chromium-*/chrome`), closing the comment early.
**Fix:** never write `*/` inside block-comment prose; reword (`chromium-<ver>/…`).

## 7. Screenshots show gray boxes where images should be
**Symptom:** verification screenshots show placeholders/gray instead of images.
**Cause:** (a) below-the-fold `loading="lazy"` images don't load during a
full-page screenshot; (b) reveal elements never `.is-visible` without scrolling.
**Fix (for verification only):** before screenshotting, scroll through the page
to trigger lazy-load AND `document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-visible'))`.
This is a capture artifact, not a real bug — real users scrolling see them fine.

## 8. `pypdf`/`pdfplumber` crash on `_cffi_backend`
**Symptom:** `ModuleNotFoundError: No module named '_cffi_backend'` when reading
the brief PDF.
**Fix:** `pip install --force-reinstall cffi`, then retry.

## 9. Can't scrape Google reviews
**Symptom:** fetching the Google Maps place URL returns an empty "Google Maps"
shell; a headless browser gets `ERR_CONNECTION_RESET` through the agent proxy.
**Cause:** Maps is JS-rendered and the proxy blocks general browsing.
**Fix:** don't fabricate reviews. Use the **real** rating the owner provides,
link it to their Google profile (via `?cid=`), and ask them to paste real
quotes. See the honesty principle in SKILL.md.

## 10. Find/replace across pages hits the wrong thing
**Symptom:** editing the nav also changed a breadcrumb or an `<h1>`; or removing
a "Home" nav item also removed the breadcrumb "Home" link.
**Cause:** the same text/markup appears in multiple roles (nav vs breadcrumb vs
heading).
**Fix:** scope replacements precisely — match the full anchor
(`<a href="produkty.html">Produkty & služby</a>`), not just the text; when
deleting the nav "Home" item, match the standalone nav line, not the
`<li><a …>Home</a></li>` breadcrumb. Verify with a grep afterwards.

## 11. "The header changes depending on which page section I'm on"
**Symptom:** the client reports different header/markup on different pages after
an update.
**Cause:** GitHub Pages + browser HTTP caching serve stale copies for a few
minutes, and different pages refresh at different times.
**Fix:** it's caching, not code. Hard refresh (Ctrl/Cmd+F5) or wait; confirm the
live HTML with a fetch if unsure. Reassure the client.

## 12. Two sources of truth for content
**Symptom:** prices/swatches drift between `config.js` and the HTML.
**Cause:** putting content that appears once (prices, product copy) into config
as well as the page.
**Fix:** content shown once lives in the HTML (SEO-friendly, no-JS visible).
Only cross-cutting data (phone, email, hours, IDs, analytics, map, rating) lives
in `config.js`.

## 13. Duplicated header/footer drift
**Symptom:** header/footer differ subtly between pages after manual edits.
**Cause:** the header/footer are copied into every page (no build/includes).
**Fix:** when changing shared chrome, edit **all** pages in one scripted pass and
re-run `verify_site.js`. Accept the duplication as the price of no-build
robustness; keep the blocks byte-identical.
