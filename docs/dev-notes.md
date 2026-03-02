# Dev Notes

This file summarizes the changes made to get the Next.js dev build working and to enable MDX content.

## Key Changes

- MDX support added via `@next/mdx` and `gray-matter`.
- Frontmatter parsing is enabled through remark plugins in `next.config.ts`.
- MDX type declarations added in `src/mdx.d.ts`.
- MDX component mapping added in `src/mdx-components.tsx`.
- Content loader utilities added in `src/lib/content.ts`.
- Dynamic MDX routes created for:
  - `src/app/blog/[slug]/page.tsx`
  - `src/app/projects/[slug]/page.tsx`
- Blog/projects index pages now list content from `content/`.
- Sample content added under:
  - `content/blog/hello-world.mdx`
  - `content/projects/personal-site.mdx`
- Placeholder image added at `public/images/placeholder.svg`.
- Content caching tags added in `src/lib/content.ts` for blog/projects:
  - `content:blog`
  - `content:projects`
- Revalidation API route added at `src/app/api/revalidate/route.ts` using:
  - `revalidateTag(tag, "max")`
- SEO metadata routes added:
  - `src/app/sitemap.ts`
  - `src/app/robots.ts`
- Route-level metadata upgrades:
  - canonical URLs for `/blog`, `/projects`, `/blog/[slug]`, `/projects/[slug]`
  - JSON-LD for blog posts and project detail pages
- Dynamic social images added for detail routes:
  - `src/app/blog/[slug]/opengraph-image.tsx`
  - `src/app/blog/[slug]/twitter-image.tsx`
  - `src/app/projects/[slug]/opengraph-image.tsx`
  - `src/app/projects/[slug]/twitter-image.tsx`

## Dev Server Notes

- Turbopack fails with MDX loader options because remark plugin functions are not serializable.
- Dev and build scripts are set to force webpack:
  - `package.json` -> `"dev": "next dev --webpack"`
  - `package.json` -> `"build": "next build --webpack"`

## Known Warnings (safe to ignore for now)

- Experimental type-stripping warning from Next.js.
- Module type warning for `tailwind.config.ts` (can be resolved later by using `.mts` or adding `"type": "module"`).

## Quick Checklist

- Start dev server: `npm run dev`
- Blog index: `/blog`
- Blog post: `/blog/hello-world`
- Projects index: `/projects`
- Project detail: `/projects/personal-site`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`

## SEO + Revalidation Config

- Set `NEXT_PUBLIC_SITE_URL` (or `SITE_URL`) for canonical metadata and sitemap host generation.
- Set `REVALIDATE_SECRET` to protect on-demand revalidation.

Manual trigger examples:

```bash
# Revalidate both blog + projects tags
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"scope":"all","secret":"YOUR_REVALIDATE_SECRET"}'

# Revalidate only blog tag via GET (manual/browser-friendly)
curl "http://localhost:3000/api/revalidate?scope=blog&secret=YOUR_REVALIDATE_SECRET"
```
