# Personal Site Starter

This workspace now contains a lightweight static site for:

- blogs
- experiments
- opinions

## Recommended repo name

For a GitHub Pages user site, the repository should be named:

- `ayyoubbouras.github.io`

That publishes the site at:

- `https://ayyoubbouras.github.io/`

If you later add a custom domain, the same repo structure still works.

## Main files

- `index.html` - homepage
- `404.html` - custom not-found page
- `assets/styles.css` - visual design
- `assets/app.js` - writing data and interactions
- `experiments/job_market_skill_map.html` - experiment
- `experiments/skill_hexagon_comparison.html` - experiment
- `experiments/agent_system_skill_workflow.html` - experiment
- `favicon.svg` - site icon
- `robots.txt` - crawler rules
- `sitemap.xml` - sitemap for the GitHub Pages URL
- `.nojekyll` - disables Jekyll processing on GitHub Pages
- `CNAME.example` - template for a future custom domain

## Editing content

Most of the site content is in `assets/app.js`.

To add a new entry, copy one of the objects in the `entries` array and update:

- `type`
- `date`
- `title`
- `summary`
- `tags`
- `mode`

Use:

- `mode: "dialog"` for text entries that open inside the site
- `mode: "link"` for experiments or separate pages

## Hosting recommendation

### Best default: GitHub Pages

Good choice if you want the simplest path and you already use GitHub.

1. Put these files in a repository named `ayyoubbouras.github.io`.
2. Push the repo to GitHub.
3. In GitHub, go to `Settings -> Pages`.
4. Use GitHub Actions as the source. The workflow in `.github/workflows/deploy-pages.yml` is already set up.
5. After the first deploy, your site should publish to `https://ayyoubbouras.github.io/`.
6. If you want a custom domain later, copy `CNAME.example` to `CNAME` and replace the placeholder with your real domain.

### Good alternative: Cloudflare Pages

Good choice if you want preview deployments or direct upload.

1. Create a new Pages project.
2. Connect the Git repository or upload the static files directly.
3. Set the build command to none and the output directory to the project root for this static version.
4. Deploy.

### Another option: Vercel

Also works well for static sites.

1. Import the repository into Vercel.
2. No special framework setup is needed for this version.
3. Deploy and connect a custom domain if needed.

## Notes

- The site is static on purpose, so hosting stays easy.
- You can later migrate this into Astro, Next.js, or another generator if you want markdown-based publishing.
- The canonical URL and sitemap currently point at `https://ayyoubbouras.github.io/`. If you switch to a custom domain, update them once.
