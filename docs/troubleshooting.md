# Troubleshooting

- **404 at /me/** — Pages not enabled, or first deploy still running. Check Settings → Pages and the Actions tab.
- **Page loads without styling** — an asset path starts with `/`. Use relative paths (`assets/style.css`).
- **Old version showing** — browser/CDN cache; hard-refresh (Ctrl+F5) or wait a few minutes.
- **Content invisible** — `.reveal` elements wait for IntersectionObserver; a JS error stops them appearing. Check the browser console.
- **Headless screenshots look blurred or cut off** — headless browsers freeze CSS transitions and enforce a minimum window width. Use `--force-prefers-reduced-motion`, and render the page inside a 390px iframe to check mobile.
- **Intro not showing** — it plays once per session; open a new window or clear `introSeen` from session storage.
