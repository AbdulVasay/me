# Architecture

Single static page served by GitHub Pages. Browser loads `index.html` → `assets/style.css` (+ Inter, Space Grotesk, JetBrains Mono from Google Fonts) → `assets/main.js`.
No backend, no database, no build pipeline, no JS libraries.

Visual layers (back to front): `body::before` gradient → `#net` canvas → `.noise` grain → `.cursor-glow` → content. The `#intro` overlay sits on top for ~1.5s on the first visit per session.
