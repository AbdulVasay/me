# Deployment

1. Commit changes and `git push origin main`.
2. GitHub Pages redeploys automatically (Actions tab → "pages build and deployment"), usually within 1–2 minutes.
3. Verify at https://abdulvasay.github.io/me/ (hard-refresh to bypass cache).

Rollback: `git revert <commit>` then push.

Custom domain (optional, later): add it in Settings → Pages, which creates a `CNAME` file, and configure DNS at your registrar.
