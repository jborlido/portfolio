# CLAUDE.md

Personal portfolio for João Borlido (jborlido.pt). Static HTML/CSS/JS, no build step.

## Writing style (important)

All visible text must read like it was written by a person: site copy, case studies,
meta descriptions, page titles, simulated terminal lines, and the resume.

- Never use em dashes (—). In prose use periods, commas, or restructure the sentence.
  In titles, date ranges, and UI labels use "·" as the separator.
- Avoid AI-tell patterns: "X, not Y" constructions ("workflows, not buzzwords"),
  punchy fragment endings ("that works while you sleep"), "The problem isn't X.
  It's Y.", and neatly balanced triadic sentences.
- Drop filler intensifiers: "genuinely", "actually", "seamless", "truly".
- Voice: plain, direct, first person, concrete. Short sentences are fine.

## Deploy

- Merging to `master` auto-deploys to jborlido.pt via Cloudflare Pages.
  Custom domains are configured in the Cloudflare dashboard (no CNAME file).
- Do not push directly to `master`. Branch, open a PR, let João merge.
- Branch pushes get Cloudflare preview deployments attached to the PR.

## Resume

- Source of truth: `~/dev/personal/knowledge-vault/PERSONAL/cv/resume.tex`.
- Compile with `/Library/TeX/texbin/xelatex` (run twice), then copy the PDF to
  `resume.pdf` in this repo. Keep resume wording aligned with the site.

## Content notes

- The Wedding Photo Contest card in `index.html` is commented out pending a SaaS
  rework. Restore by uncommenting.
- To add a Work card, see README.md and the HTML comment in the `#work` section.
- New pages must be added to `sitemap.xml`; removed pages get a 301 in `_redirects`.
