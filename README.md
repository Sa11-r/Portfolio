# Sara – Developer Portfolio

React + Vite portfolio site, deployed to GitHub Pages automatically with GitHub Actions.

## Editing content
Almost all text, links, skills, projects, etc. live in one file: `src/models/siteData.js`.
Edit it on GitHub (pencil icon → *Commit changes*) and the site redeploys by itself in ~1 minute.

## Deployment
Every commit to the `main` branch triggers `.github/workflows/deploy.yml`, which runs
`npm ci` → `npm run build` and publishes the `dist/` folder to GitHub Pages.
Progress is visible in the repository's **Actions** tab.

## Local development (optional – needs Node.js 20.19+ or 22.12+)
```
npm ci
npm run dev       # local dev server
npm run build     # production build into dist/
```

## Notes
- Put static files (PDF CV, images, videos) in `public/` and reference them with
  `` `${import.meta.env.BASE_URL}file-name.ext` `` – never with a leading `/`.
- Never commit `.env` files or secrets (they are git-ignored).
