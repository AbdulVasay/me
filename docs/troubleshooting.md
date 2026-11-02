# Troubleshooting

- **404 at /me/** — Pages not enabled, or first deploy still running. Check Settings → Pages and the Actions tab.
- **Page loads without styling** — an asset path starts with `/`. Use relative paths (`assets/style.css`).
- **Old version showing** — browser/CDN cache; hard-refresh (Ctrl+F5) or wait a few minutes.
- **Theme stuck** — clear the `theme` key in browser site data.
