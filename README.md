# jborlido.pt — personal portfolio

Static site (no build step) hosted on **Cloudflare Pages**. Pushing to `master` auto-deploys.

- Live: https://jborlido.pt (+ https://www.jborlido.pt)
- Stack: hand-written HTML/CSS/JS · Archivo + Fragment Mono (Google Fonts)
- Custom domains are configured in the Cloudflare Pages dashboard (not via a CNAME file)

## Structure

```
index.html            Main page (hero, services, work, experience, games, about)
work/                 Case-study pages
projects/             Game project pages
assets/css/main.css   Design system (tokens at the top)
assets/js/            navigation.js (injected nav) · carousel.js (project media)
sitemap.xml           Update when adding/removing pages
robots.txt, _headers  SEO + Cloudflare headers
favicon.svg           jb monogram
```

## How to add a Work card

1. Open `index.html` and find the `HOW TO ADD A WORK CARD` comment in the `#work` section.
2. Copy an existing `<article class="work-card">` block and edit:
   - **Badge**: `badge-case` (Case Study) / `badge-saas` (SaaS) / `badge-tool` (Tool)
   - Optional `<span class="work-live">● Live</span>` for deployed products
   - Title, description, `.work-tags`
   - **Link**: an `<a class="work-card-link">` covering the card + a `.work-cta` label,
     or a `.work-note` for unlinked/private entries
3. For a full case-study page: copy `work/ai-agent-ops.html` as a template, update the
   `<title>`, meta description, canonical URL, OG tags, and content.
4. Add the new page to `sitemap.xml`.
5. Push to `master` — Cloudflare Pages deploys automatically.
