# Agent context

## Purpose
Abdul Vasay's personal profile website. He is a Technical Support Lead at Astucemedia with 10+ years in real-time, data-driven VIZrt broadcast graphics, custom apps, DevOps and AWS.
Live: https://abdulvasay.github.io/me/ · Repo: https://github.com/AbdulVasay/me

Glossary: **VIZrt** = broadcast real-time graphics platform (Viz Artist, Template Wizard, Pilot Edge); **lower third** = on-screen name/title strap; **PGM** = program output; **ticker/crawl** = scrolling news bar.

## Architecture map
- `index.html` — all content; sections `#skills`, `#experience`, `#projects`, `#education`, `#contact` plus hero, ticker and stats.
- `assets/style.css` — all styling; colour tokens at the top.
- `assets/main.js` — independent IIFE blocks: intro sting (sessionStorage `introSeen`), canvas network background, cursor glow + scroll progress, mobile menu, nav section spy, scroll reveal (`.reveal` → `.in`, staggered via `--d`), count-up (`[data-count]`), typing rotator (`.rotator[data-words]`, `|`-separated), monitor timecode, pointer effects (`.spot`, `.tilt`, `.magnetic`), timeline fill (`--fill`), project filters (`.filter[data-filter]` ↔ `.card[data-cat]`).
- `assets/favicon.svg` — "AV" monogram.
- `.nojekyll` — tells GitHub Pages to serve files as-is (no Jekyll build).
- `.gitignore` — `*.pdf` (keeps the résumé private).
- `docs/` — this knowledge base.

## Build / run / test
No build step. Open `index.html` in a browser, or run `python -m http.server` in the repo root and open http://localhost:8000.
Check a ~390px-wide viewport (no horizontal scroll) and reduced-motion mode before pushing.

## Conventions
- Plain HTML/CSS/JS, no frameworks, libraries or build tools.
- Dark-only theme: colours only through the CSS variables on `:root` (`--a1` violet, `--a2` cyan, `--a3` rose, `--live` red).
- Project card categories: `elections`, `data`, `graphics`, `enterprise`, `personal`.
- Elements with class `reveal` start hidden (`.reveal:not(.in)`) and fade in on scroll. Don't set `transform` on `.reveal.in`; hover transforms rely on it being unset.
- Respect `prefers-reduced-motion` (handled globally in CSS and in JS via `reduceMotion`).
- Use relative asset paths (`assets/...`) — the site is served under `/me/`, so absolute `/assets/...` paths break.
- Ticker and marquee content is duplicated once inside the track so the `-50%` loop is seamless; edit both copies.

## Content sources & privacy
- Content comes from the owner's résumé (`docs/1_Abdul_Vasay_Resume.pdf`, local only, git-ignored) and public GitHub repos.
- **Never publish** phone, street address, date of birth, marital status, or the résumé PDF (owner decision 2026-11-02). Email + "Karachi, Pakistan" only.
- Do not link `abdulvasay.com`; it belongs to someone else.
- LinkedIn button is a people search until the owner supplies their profile URL.

## Invariants / do not touch
- Repo name must stay `me` (it defines the URL path).
- Keep `index.html` at the repo root; Pages serves from `main` / root.
- Keep `*.pdf` in `.gitignore`.

## Roles / permissions
None — public static page. Only the repo owner can push.

## Config and secrets
No secrets. Pages settings live in GitHub → repo `me` → Settings → Pages.

## Other docs
`architecture.md`, `configuration.md`, `api.md`, `deployment.md`, `troubleshooting.md`, `CHANGELOG.md`, `changesets/`.
