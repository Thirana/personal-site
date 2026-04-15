# Dev Notes

This file summarizes the current implementation and operational behavior of the portfolio site.

Code is the source of truth. Keep this file in sync when routing, MDX loading, SEO, caching, or major UX behavior changes.

## Current Stack

- Next.js 16 App Router with React 19 and TypeScript
- Tailwind CSS v4 with Typography plugin
- shadcn/ui primitives for reusable controls
- MDX content loaded with `@next/mdx` and `gray-matter`

## Product Shape

- The site is a content-first portfolio/blog with routes for `/`, `/projects`, `/projects/[slug]`, `/blog`, and `/about`.
- UI direction is backend-first and system-oriented: status, capabilities, evidence, constraints, and outcomes.
- The visual system is intentionally dark and restrained, using shared tokens from `src/app/globals.css`.

## Content Sources

- Typed personal/profile data lives in:
  - `src/content/profile.ts`
  - `src/content/experience.ts`
  - `src/content/about.ts`
- MDX source content lives in:
  - `content/blog/*.mdx`
  - `content/projects/*.mdx`
- Blog and project metadata parsing must go through `src/lib/content.ts`.

## MDX Pipeline

- `next.config.ts` enables `.mdx` as a page extension and wires remark plugins for frontmatter and GFM.
- `src/mdx.d.ts` provides TypeScript module declarations for MDX imports.
- `src/mdx-components.tsx` maps custom MDX rendering behavior.
- Current MDX enhancements include:
  - Mermaid diagram rendering from fenced ` ```mermaid ` blocks
  - Expandable Mermaid diagrams through a shared dialog for larger-chart viewing
  - Collapsible code examples through `CodeToggle`
  - Styled blockquotes, images, and links
- Detail pages render a `ContentHero` above the article body, and `.content-with-hero > h1:first-child` hides the first MDX `h1` so content can still keep a canonical document heading.

## Content Loading and Validation

- `src/lib/content.ts` is the single content access layer for:
  - blog metadata lists
  - project metadata lists
  - metadata lookup by slug
  - full MDX module loading by slug
- Blog metadata is soft-normalized.
- Project metadata is strictly validated and throws on missing required fields.
- Project ordering is metadata-driven:
  - lower `priority` first
  - newer `date` next
  - alphabetical `title` as tiebreaker

## Rendering Behavior

- Blog and project detail pages are static-first.
- Both detail routes keep:
  - `generateStaticParams`
  - `dynamicParams = false`
  - `dynamic = "force-static"`
- Blog detail route: `src/app/blog/[slug]/page.tsx`
- Project detail route: `src/app/projects/[slug]/page.tsx`
- Home page pulls typed profile/experience data plus featured/all project metadata.
- Blog index cards keep whole-card links but now include an explicit `Read article` affordance for clearer clickability.
- Project cards use explicit `Project overview` actions instead of relying on whole-card hover affordance.
- Project cards keep the at-rest state lighter and use progressive disclosure for secondary signals and constraints.
- Mobile navigation remains a right-side drawer implemented with `Nav` + `ui/sheet`.

## Caching and Revalidation

- Content cache tags are defined in `src/lib/content.ts`:
  - `content:blog`
  - `content:projects`
- In development, content reads directly from the filesystem for immediate feedback.
- During production builds, content also reads directly from the filesystem so static route generation always sees the latest MDX files.
- In production, content lists and slug lookups use `unstable_cache`.
- On-demand revalidation is handled by `src/app/api/revalidate/route.ts`.
- Revalidation behavior uses `revalidateTag(tag, "max")`.
- Supported scopes are:
  - `all`
  - `blog`
  - `projects`
- `REVALIDATE_SECRET` is required for endpoint authorization.

Manual trigger examples:

```bash
# Revalidate both blog + projects tags
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"scope":"all","secret":"YOUR_REVALIDATE_SECRET"}'

# Revalidate only blog tag via GET
curl "http://localhost:3000/api/revalidate?scope=blog&secret=YOUR_REVALIDATE_SECRET"
```

## SEO and Metadata

- Shared site URL and metadata defaults live in `src/lib/site.ts`.
- Set `NEXT_PUBLIC_SITE_URL` or `SITE_URL` in deployment environments so canonicals, JSON-LD URLs, sitemap entries, and `robots.txt` host values are correct.
- Global metadata is defined in `src/app/layout.tsx`.
- Index routes (`/blog`, `/projects`, `/about`) define route-level canonical/Open Graph/Twitter metadata.
- Blog and project detail pages define:
  - `generateMetadata`
  - JSON-LD script blocks
  - route-scoped Open Graph image handlers
  - route-scoped Twitter image handlers
- SEO support files:
  - `src/app/sitemap.ts`
  - `src/app/robots.ts`
  - `src/app/blog/[slug]/opengraph-image.tsx`
  - `src/app/blog/[slug]/twitter-image.tsx`
  - `src/app/projects/[slug]/opengraph-image.tsx`
  - `src/app/projects/[slug]/twitter-image.tsx`

## Dev and Build Notes

- `npm run dev` and `npm run build` intentionally use webpack:
  - `next dev --webpack`
  - `next build --webpack`
- This is kept in place because current MDX loader configuration is not compatible with Turbopack serialization.

## Current Content Inventory

- Blog posts currently include:
  - `url-shortener-caching`
  - `idempotency-in-api-design`
  - `rendering-techniques-nextjs-portfolio`
- Project entries currently include:
  - `url-shortener`
  - `personal-site`
  - `backend-standards`

## Quick Checklist

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Lint: `npm run lint`
- Home: `/`
- Blog index: `/blog`
- Blog detail example: `/blog/idempotency-in-api-design`
- Projects index: `/projects`
- Project detail example: `/projects/url-shortener`
- About: `/about`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
