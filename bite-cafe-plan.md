# BITE — `/bite-cafe` Section Plan

A static, visually striking section added to the existing Park Diamond Apartments site. One location in Ohrid. Brand: **BITE** — healthy food, coffee, tobacco. No checkout, no backend — the goal is to make people want to walk in.

## Color Palette (locked)

```css
--bite-green:   #6d8c3e;   /* 30% — primary, accents, CTAs, brand moments */
--bite-cream:   #fafef9;   /* 60% — backgrounds, breathing room */
--bite-dark:    #1f2a14;   /* 10% — text, contrast, depth */
```

Discipline rule: no fourth color. Photography brings the warmth, the palette stays clean.

---

## Brand Notes

Reference Instagram: `@bite_ohrid`. Couldn't pull live content (Instagram blocks scraping), so before final design lock, manually capture:
- 8–12 hero-quality photos from the feed (food, coffee, interior, staff)
- The actual logo / wordmark (download highest-res version available)
- Tone of voice from captions — playful? minimal? bilingual?
- Any signature dishes or drinks that should anchor the menu
- Real opening hours, address, phone

Save these to `/src/assets/bite/` so the site can be built around real content, not placeholders.

---

## Hosting: GitHub Pages — What Changes

GitHub Pages is static-only and has a few quirks worth knowing upfront before they bite you:

### 1. Base href (the #1 gotcha)
If hosting at `username.github.io/park-diamond/`, every asset path needs the subpath prefix or the site 404s on every image and route. Build with:

```bash
ng build --configuration production --base-href "/park-diamond/"
```

If using a **custom domain** (e.g. `parkdiamondapartments.com` via a `CNAME` file in the repo), base-href stays `/`. Decide which one upfront — switching mid-build is annoying.

### 2. SPA routing fix
GitHub Pages doesn't support server-side rewrites, so deep links like `/bite-cafe/menu` will 404 on refresh. Two fixes, pick one:

- **Hash routing** (simplest): `RouterModule.forRoot(routes, { useHash: true })` → URLs become `/#/bite-cafe/menu`. Works everywhere, slightly uglier URLs.
- **`404.html` redirect trick**: copy `index.html` to `404.html` at deploy time. GitHub Pages serves `404.html` for unknown paths, Angular bootstraps, the route resolves. Cleaner URLs, one extra build step. The `spa-github-pages` repo by rafgraph documents this pattern.

Recommendation: **404.html redirect**. Cleaner URLs matter for SEO and sharing.

### 3. No server-side anything
Already aligned with your "static, no payments" scope, but to be explicit: no SSR, no Workers, no API routes. Anything dynamic (contact form, newsletter signup) needs a third-party service — Formspree, Getform, or a Tally embed. Probably not needed for v1.

### 4. Deploy
Use `angular-cli-ghpages`:
```bash
npm i -D angular-cli-ghpages
ng build --configuration production --base-href "/your-repo-name/"
npx angular-cli-ghpages --dir=dist/your-app/browser
```

Or wire up a **GitHub Action** that builds and pushes to the `gh-pages` branch on every commit to `main`. Cleaner — one push, automatic deploy. Workflow is ~15 lines.

### 5. Custom domain (recommended)
If `parkdiamondapartments.com` is going on GH Pages:
- Add a `CNAME` file with the domain to `/src` (or `/public` depending on Angular version) so it's copied to dist on every build
- Configure DNS: `A` records pointing to GitHub's IPs (185.199.108.153, .109.153, .110.153, .111.153) or `CNAME` to `username.github.io`
- Enable "Enforce HTTPS" in repo Settings → Pages once DNS propagates

### 6. i18n caveat
Angular's `@angular/localize` builds **separate bundles per locale**, typically deployed under `/mk/`, `/en/`, `/sq/` paths. On GH Pages with custom domain this works, but base-href math gets fiddly per-locale. Two practical options:

- **Locale-as-route param** instead of separate builds: store translations as JSON, switch at runtime via a service. Simpler for GH Pages, lower bundle efficiency.
- **`@ngx-translate/core`**: same runtime approach, well-trodden library, ~10kb.

Recommendation: **ngx-translate** for this use case. Three small JSON files (`mk.json`, `en.json`, `sq.json`), one service, no build-time locale gymnastics. Lose ~5% bundle efficiency, gain a lot of simplicity on a static host.

---

## Architecture

Single Angular app, lazy-loaded route:

```
/src/app
  /pages                    (existing apartment pages)
  /bite-cafe                (new — lazy-loaded)
    /home
    /menu
    /story
    /visit
    bite-cafe.routes.ts
    bite-cafe.layout.ts     (wraps everything in .bite-theme)
  /shared
    /tokens
    /i18n                   (mk.json, en.json, sq.json)
```

```ts
// app.routes.ts
{
  path: 'bite-cafe',
  loadChildren: () => import('./bite-cafe/bite-cafe.routes')
                       .then(m => m.BITE_ROUTES)
}
```

**Theme isolation.** Apartment site keeps its existing palette. BITE's three CSS variables live under a `.bite-theme` wrapper on the lazy layout component:

```css
.bite-theme {
  --primary: #6d8c3e;
  --bg: #fafef9;
  --text: #1f2a14;
}
```

One wrapper, two visually distinct sections, zero style bleed.

**Cross-link.** One tasteful CTA on the Park Diamond home — *"Hungry? Visit BITE →"* — links to `/bite-cafe`. That's the integration.

---

## UI/UX Stack (static-friendly, lean)

### Core
- **Angular 17+ standalone components** — no NgModules in the new section
- **TailwindCSS** — palette locked into `tailwind.config.js`, plus the runtime CSS-var theme
- **Angular's built-in animations** for route transitions
- **ngx-translate** for MK/EN/AL

### The "feel" layer
- **GSAP + ScrollTrigger** — pinned scroll sections, image reveals, menu transitions. Single biggest UX upgrade for a static site.
- **Lenis** — smooth scroll. ~3kb, makes the whole site feel premium.
- **Lottie** — small ambient animations (steam from coffee, leaf drift). One file each, ~10–20kb.

### Imagery (most important line in this doc)
For a food + coffee place, photography *is* the product.
- Use BITE's actual Instagram photos as a baseline; reshoot weak ones
- AVIF with WebP fallback. Optimize via `squoosh-cli` or `sharp` in a build script — GH Pages serves whatever you commit, so optimize before pushing
- Consistent treatment: warm tones, slight green pull in shadows. One preset, all images
- `loading="lazy"` below fold; `fetchpriority="high"` on hero only
- Use `<picture>` with `<source srcset>` for responsive variants

### Typography
- One serif for headings — **Fraunces** or **DM Serif Display** (warm, editorial, menu-like)
- One sans for body — **Inter** or **Geist** (boring on purpose, max legibility)
- **Self-host via `@fontsource`** — important on GH Pages, removes the Google Fonts CDN dependency and improves LCP
- Verify Macedonian Cyrillic + Albanian Latin coverage. Fraunces ✅, Inter ✅

---

## The Killer Feature

**The Living Menu.**

A scroll-driven, cinematic menu that turns the page itself into the experience. Not a grid of cards — a single continuous scroll where each item takes over the screen.

**How it works:**
- Three sections — **Bite** (food), **Brew** (coffee), **Smoke** (tobacco) — each with its own GSAP-pinned scroll segment
- As you scroll, items slide into focus one at a time: large hero photo, name, two-line description, ingredients/origin notes, allergen icons (food) / origin notes (coffee) / strength + flavor profile (tobacco)
- Background subtly shifts hue between sections — Bite leans warmer cream, Brew goes deeper, Smoke gets richer accent-dark — all still inside the three-color palette by adjusting opacity/overlay, not by introducing new colors
- A persistent left rail shows progress (Bite 3/8, Brew 2/6, etc.) so it never feels endless
- Each item has one subtle parallax detail — steam rising on coffee, a leaf drifting on a salad, slow ember glow on tobacco — Lottie or pure CSS, ≤20kb each

**Why this is the killer feature:**
- Editorial, not transactional — fits a static site whose goal is *desire*, not conversion
- Differentiates immediately from every other Ohrid café site (mostly Wix templates or just Facebook pages)
- Genuinely fun on mobile, where vertical scroll is the native gesture
- Solo-buildable in a weekend once photography is in hand
- Shareable: a "Save this dish" button generates a clean SVG card with BITE branding for Instagram stories — free organic marketing
- **Works on GH Pages.** All client-side. No backend needed.

**The trick that makes it work:** all three categories on one page. A visitor who came for coffee scrolls into the food menu by accident and now wants lunch. That's the upsell, without ever asking for a sale.

---

## Pages

1. **`/bite-cafe`** — Home. One strong photo + the BITE wordmark, brief "what we are" statement, scroll cue down to the Living Menu.
2. **`/bite-cafe/menu`** — The Living Menu. Bite → Brew → Smoke. The whole feature.
3. **`/bite-cafe/story`** — Who's behind it, sourcing notes (local farms, bean origin, tobacco provenance), the room itself. Photo-forward, minimal text.
4. **`/bite-cafe/visit`** — Address, hours, embedded map (Leaflet — lighter than Google Maps and no API key needed), Instagram link, phone. One screen, no scroll.

Four pages, all static, all fast.

---

## Performance Targets

- Lighthouse mobile **≥ 95** across all four metrics
- LCP **< 1.8s** on 4G
- Total JS for `/bite-cafe` route **< 150kb gzipped** on first load (GSAP + Lenis lazy-loaded only on menu page)
- All images AVIF, sized via `srcset`, hero preloaded with `<link rel="preload">`
- Critical CSS inlined, Tailwind aggressively purged
- Self-hosted fonts with `font-display: swap`

---

## Tobacco — Legal Note

Tobacco advertising has constraints in North Macedonia. Before launch:
- Likely need an **age-gate modal** on first visit if tobacco products are named/photographed (sessionStorage flag, not cookie — keeps it simple on a static site)
- Avoid promotional language ("the best," "must try") — use descriptive ("Virginia blend, medium-bodied")
- **No prices on tobacco** if local regulation prohibits tobacco price advertising. Show items, descriptions, "ask in store"
- Footer disclaimer for the Smoke section

10-minute check with a local lawyer or the relevant agency before publishing. Worth it.

---

## Build Order (3–4 weekends solo)

1. **Setup** — lazy route, `.bite-theme` wrapper, palette tokens, fonts loaded, ngx-translate scaffolding, GitHub Action for deploy. Push a placeholder, confirm it lives at the right URL with the right base-href. (1 evening)
2. **Static pages** — Home, Story, Visit. Structure + typography only, no animations. Real photos from Instagram. (1 weekend)
3. **The Living Menu** — GSAP ScrollTrigger, three sections, progress rail. Main lift. (1 weekend)
4. **Polish** — Lenis, Lottie ambient details, MK/EN/AL translations, age-gate if needed, accessibility pass, Lighthouse fixes, 404.html SPA redirect, custom domain if applicable. (1 weekend)

Photography in parallel — block out a half-day at BITE before week 2 if Instagram photos aren't enough.

---

## Open Questions

1. Hosting at a project path (`username.github.io/repo`) or custom domain? Affects base-href.
2. Real photos from Instagram sufficient, or scheduling a dedicated shoot?
3. Age-gate scope — entire site, or just `/menu#smoke`? Depends on local regulation interpretation.
4. Logo/wordmark — does BITE have a clean SVG/PNG version? If not, a wordmark in the heading serif works for v1.
5. Hours, exact address, phone — pull from the Instagram bio before week 1 ends.

Lock these before week 2.
