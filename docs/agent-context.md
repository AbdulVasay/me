# Agent context

## Purpose
Abdul Vasay's personal profile website: who they are, experience, projects, and how to get in touch.
Live: https://abdulvasay.github.io/me/ · Repo: https://github.com/abdulvasay/me

## Architecture map
- `index.html` — all content, one section per `<section id>` (about, experience, projects, contact).
- `assets/style.css` — all styling; colour tokens at the top.
- `assets/main.js` — theme toggle and footer year only.
- `assets/favicon.svg` — "AV" monogram.
- `.nojekyll` — tells GitHub Pages to serve files as-is (no Jekyll build).
- `docs/` — this knowledge base.

## Build / run / test
No build step. Open `index.html` in a browser, or run `python -m http.server` in the repo root and open http://localhost:8000.
Check both light and dark mode and a ~375px-wide viewport before pushing.

## Conventions
- Plain HTML/CSS/JS, no frameworks or build tools.
- Colours only through the CSS variables on `:root`; when adding one, define it in all three theme blocks (light, `prefers-color-scheme: dark`, `[data-theme="dark"]`).
- Use relative asset paths (`assets/...`) — the site is served under `/me/`, so absolute `/assets/...` paths break.
- Placeholder content is in `[square brackets]` with `<!-- TODO -->` comments above it.

## Invariants / do not touch
- Repo name must stay `me` (it defines the URL path).
- Keep `index.html` at the repo root; Pages serves from `main` / root.

## Roles / permissions
None — public static page. Only the repo owner can push.

## Config and secrets
No secrets. Pages settings live in GitHub → repo `me` → Settings → Pages.

## Other docs
`architecture.md`, `configuration.md`, `api.md`, `deployment.md`, `troubleshooting.md`, `CHANGELOG.md`, `changesets/`.
