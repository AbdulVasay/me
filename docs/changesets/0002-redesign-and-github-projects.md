# 0002 — Visual redesign + real projects from GitHub

- **Type:** change
- **Status:** Done (bio, experience, stats and contact links still placeholder)
- **Date:** 2026-11-02

## Summary
Make the profile more attractive and replace placeholder projects with the owner's real public GitHub repos.

## Why
The owner asked for a more attractive site and wanted details from LinkedIn. LinkedIn needs a signed-in session (the URL given was the personal feed), so LinkedIn content could not be read. Public GitHub data was used instead.

## What changed
- `index.html`: new two-column hero (gradient name, typing role rotator, availability pill, social icons, orbiting avatar with skill chips); stats strip; About in glass panels; vertical gradient timeline; 4 project cards (Vizrt Scripts Course, BTK Utilities Calculator, BTK Electricity Bill Calculator, BTK Bus Timings) with live/GitHub links; gradient contact call-to-action; mobile hamburger menu; inline head script applies saved theme before paint.
- `assets/style.css`: rewritten: violet→cyan gradient accent, Space Grotesk headings, animated blurred background blobs + masked grid, glassmorphism, card hover gradient border, scroll-reveal classes, `prefers-reduced-motion` support, breakpoints at 860px and 680px.
- `assets/main.js`: added mobile menu, nav scroll state + active-section highlighting, scroll reveal (IntersectionObserver), typing rotator.
- `assets/favicon.svg`: gradient rounded-square monogram.

## Affected components
`index.html`, `assets/style.css`, `assets/main.js`, `assets/favicon.svg`.

## Dependencies
Google Fonts: Inter + Space Grotesk.

## Migration / deployment notes
Push to `main`. Rollback: `git revert <commit>`.

## Schema changes
None.

## History
- 2026-11-02 — Created.
