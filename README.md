![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=personal-site-gopaljigaur&style=for-the-badge)

# Personal Website ([gopalji.ml](https://gopalji.me))
This is a repository containing the source files for my personel website.

## Built Using
- [Next.js](https://nextjs.org/)
- [PlanetScale](https://planetscale.com)
- [Prisma](https://prisma.io/)
- [Vercel](https://vercel.com)
- [Forestry](https://forestry.io/)
- [MDX](https://github.com/mdx-js/mdx)
- [Tailwind CSS](https://tailwindcss.com/)

## Files

- `data/*` - MDX data that is used for blogs, projects, metadata, about-page, newsletters *(not available yet)*, and code snippets *(not available yet)*.
- `layouts/*` - The different page layouts each MDX category (blog, project, newsletter *(not available yet)*, snippets *(not available yet)*) uses.
- `lib/*` - A collection of helpful utilities or code for external services.
- `pages/api/*` - API routes powering [`/dashboard`](https://gopalji.me/dashboard), blog and project views, contact-form, and fun-facts.
- `pages/blog/*` - Static pre-rendered blog pages using MDX.
- `pages/project/*` - Static pre-rendered project README pages using MDX.
- `pages/dashboard` - [Personal dashboard](https://gopalji.me/dashboard) tracking metrics.
- `pages/*` - All other static pages.
- `prisma/*` - Prisma schema, which uses a PlanetScale MySQL database, and DB init script.
- `public/*` - Static assets including fonts, logos and images.
- `scripts/*` - Useful scripts to generate RSS feed, sitemap, manifest.json and robots.txt.
- `styles/*` - A small amount of global styles.

## Running Locally

Create a `.env` file similar to [`.env.example`](https://github.com/gopaljigaur/personal-site/blob/main/.env.example) and add your credentials.

```bash
$ git clone https://github.com/gopaljigaur/personal-site.git
$ cd personal-site
$ yarn
$ yarn dev
```

## Usage

- Replace data in `data/metadata/*`, `public/*` and `next.config.js` before publishing.
- You can contact me [here](https://gopalji.me/contact), in case you need help in implementing the project.
- Crediting the author is highly appreciated.

---
Design inspiration form [leerob.io](https://leerob.io), [Vercel](https://vercel.com/).
