# ZeroShot

An applied technology and engineering firm's website, built with Next.js, TypeScript and native SVG motion. Statically exported for Cloudflare Pages; no application server, API keys or runtime environment variables are required.

## Local development

Use Node.js 22 (the exact version is in `.node-version`).

```bash
npm ci
npm run dev
```

Open http://127.0.0.1:3000.

## Build and preview the static site

```bash
npm run lint
npm run build
npm start
```

`npm run build` produces `out/`, including HTML, JavaScript, CSS, local fonts, sharing images, `robots.txt` and `sitemap.xml`. `npm start` serves that directory at http://127.0.0.1:3001. It does not run a Next.js application server. `npm run typecheck` is also available after build or dev generates Next.js types.

## Deploy to Cloudflare Pages

Connect this GitHub repository to a **Pages** project under **Workers & Pages**. Use:

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | Repository root |
| Node.js | 22, pinned by `.node-version` |

Use the build command above instead of the preset's default so the project's Webpack setting is retained. Cloudflare installs dependencies and creates `out/` itself; generated build output is not committed to Git.

After checking the `*.pages.dev` deployment, add `0shot.io` in the Pages project's **Custom domains** settings. The site's canonical URL, sitemap and sharing metadata already target `https://0shot.io`. Configure redirects for alternative hostnames on Cloudflare. Do not change email-related MX/TXT records when connecting the website. Submit `https://0shot.io/sitemap.xml` to Search Console after the custom domain is live.

Do not use an SPA fallback to `index.html`: the exported `404.html` should remain a real not-found page. This deployment does not need OpenNext or a Workers runtime.

## Editing

- Page copy and founders: `src/app/page.tsx`
- Company metadata and four capabilities: `src/lib/site.ts`
- SEO tags and structured data: `src/app/layout.tsx`
- Palette and responsive layout: `src/app/globals.css`
- Hero illustration: `src/components/agent-visual.tsx`
- Brand and sharing assets: `public/`
- Font subset generation and licensing: `src/app/fonts/README.md`

Contact links open the visitor's email client at `contact@0shot.io`; hosting this site does not configure the mailbox. No analytics or external form service is included.
