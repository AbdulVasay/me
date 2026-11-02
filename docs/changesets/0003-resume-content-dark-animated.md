# 0003 — Résumé content + dark, animated broadcast theme

- **Type:** change
- **Status:** Done
- **Date:** 2026-11-02

## Summary
Replace all placeholder content with the owner's résumé and restyle the site as a dark-only, heavily animated "broadcast control room" theme that highlights key skills.

## Why
Owner asked to use their résumé for all information, highlight key skills, and make the site darker and more animated.

## What changed
- **Content (from résumé):** summary, 6 key-skill cards (Real-time broadcast graphics, Data-driven integration, Custom app development, DevOps & CI/CD, AWS cloud & cost optimisation, Leadership & support), full tech stack, all 6 roles 2012–present (Astucemedia, SAMAA ×2, BOL Network, Advance Business Consulting, SAIF Enterprises), 16 projects with category filter, BS Computer Engineering (Sir Syed University), certificates, email contact.
- **Privacy decisions (owner-confirmed):** published email + city only. Phone, street address, DOB and marital status are NOT on the site. No résumé download. AV monogram kept instead of a photo. `*.pdf` added to `.gitignore` so `docs/1_Abdul_Vasay_Resume.pdf` stays local.
- **Not linked:** `abdulvasay.com` (listed on the résumé) now resolves to a different person's site. The LinkedIn button points to a LinkedIn people search for "Muhammad Abdul Vasay" until the exact profile URL is supplied.
- **Design:** dark-only theme (light mode and theme toggle removed), JetBrains Mono accents, "ON AIR" intro sting with colour bars (once per session), canvas data-network background reacting to the cursor, film grain, cursor glow, scroll progress bar, glitching animated-gradient surname, typing rotator, broadcast monitor visual with live timecode, animated bar chart and lower third, "BREAKING" news-crawl ticker, count-up stats, spotlight + 3D tilt cards, magnetic buttons, dual tech-stack marquees, timeline that fills as you scroll, project filters with pop-in animation, rotating conic glow behind contact.
- **Accessibility:** all motion disabled under `prefers-reduced-motion`; pointer effects only on fine pointers.

## Affected components
`index.html`, `assets/style.css`, `assets/main.js`, `.gitignore`.

## Dependencies
Google Fonts: Inter, Space Grotesk, JetBrains Mono. No JS libraries.

## Migration / deployment notes
Push to `main`. Rollback: `git revert <commit>`. Visitors' old `theme` localStorage value is now ignored.

## Schema changes
None.

## History
- 2026-11-02 — Created.
