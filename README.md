# Jiangfei Duan's Homepage

A zero-dependency static website generated with Node.js. There are no npm packages to install and no Ruby, Jekyll, framework, database, or container requirements.

## Requirements

- Git
- Node.js 24 LTS (`.nvmrc` pins the version)

`npm` is included with Node.js and is used only to run the local scripts.

## Local development

```bash
nvm use
npm run dev
```

Open <http://localhost:4321/>. The development server rebuilds the site and refreshes the browser when files change.

To make the server reachable from another device on the same network:

```bash
npm run dev -- --host 0.0.0.0
```

If Node was installed with Homebrew as `node@24`, add it to the current shell first:

```bash
export PATH="$(brew --prefix node@24)/bin:$PATH"
```

No `npm install` or `npm ci` step is required.

## Content updates

- Biography, news, education, experience, teaching, services, and awards: `src/content/home.html`
- Blog page: `src/content/blog.html`
- Publications: `src/data/publications.mjs`
- Profile, top navigation, and social links: `src/data/site.mjs`
- Styling: `public/assets/css/site.css`
- PDFs and images: `public/files/` and `public/images/`

Everything under `public/` is copied into the deployed site. Keep reference documents containing
non-public information under `.private/`; that directory is ignored by Git and is never deployed.

News and the internship group use native HTML `<details>` disclosures. Add the `open` attribute when
a group should be expanded by default; remove it when the group should start collapsed.

Each publication requires an ISO date in `YYYY-MM-DD` format. The build sorts regular publications
by this field with the newest item first, so the array itself does not need to be manually reordered.
Set `category: "survey"` to place a publication in the separate Survey section. Set `owner: true` on
Jiangfei's author entry to bold the name, and add `equal: true` only when the paper explicitly marks
that author as an equal contributor. To emphasize part of a venue inline, set `venue` to an object
with `before`, `highlight`, and `after` strings instead of a single string.

Generate the production site in `dist/`:

```bash
npm run build
```

Preview the production output without file watching:

```bash
npm run preview
```

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml` and publishes the generated `dist/` directory to GitHub Pages. The workflow installs no npm packages. In the repository's **Settings > Pages**, set **Source** to **GitHub Actions** once; generated files do not need to be committed.

## Attribution

The visual design retains portions of the Minimal Mistakes theme by Michael Rose under the MIT License in `LICENSE`. The locally hosted social icon fonts are from Font Awesome Free 5.5.0; see `THIRD_PARTY_NOTICES.md`.
