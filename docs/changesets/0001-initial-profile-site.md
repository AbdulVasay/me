# 0001 — Initial profile site

- **Type:** feature + config
- **Status:** Done (content still placeholder)
- **Date:** 2026-11-02

## Summary
Create a static personal profile website and publish it on GitHub Pages at https://abdulvasay.github.io/me/.

## Why
A public, zero-cost, zero-maintenance profile page.

## What changed
- `index.html`: single page with Hero, About + Skills, Experience timeline, Projects grid, Contact, footer.
- `assets/style.css`: design tokens on `:root`, dark mode via `prefers-color-scheme` and `data-theme`, responsive at 640px.
- `assets/main.js`: footer year; theme toggle persisted in `localStorage` (wrapped in try/catch).
- `assets/favicon.svg`, `.nojekyll`, `README.md`.
- Repo `me` created under the `abdulvasay` GitHub account (the repo name decides the `/me` path, which is why it isn't called `Profile`).

## Affected components
`index.html`, `assets/*`, GitHub repo settings → Pages.

## Dependencies
Google Fonts (Inter) loaded from fonts.googleapis.com; falls back to system fonts if blocked.

## Migration / deployment notes
Push to `main` → Pages rebuilds in ~1 minute. Rollback: `git revert <commit>` and push.

## Schema changes
None (no database).

## History
- 2026-11-02 — Created.
