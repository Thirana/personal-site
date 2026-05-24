# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server (uses --webpack, not Turbopack)
npm run build      # production build (also uses --webpack)
npm run lint       # ESLint
npm run start      # start production build
```

`dev` and `build` use webpack intentionally -- MDX serialization is currently incompatible with Turbopack.

There is no test suite in this project.

## Architecture

**Content sources**: Two kinds of content exist side by side.

- `content/blog/*.mdx` and `content/projects/*.mdx` -- MDX files for authored content; frontmatter is parsed by `gray-matter` via `src/lib/content.ts`.
- `src/content/profile.ts` and `src/content/experience.ts` -- typed TypeScript files for static site data (profile, socials, skills, work timeline).

**Content loading** (`src/lib/content.ts`): Single access layer for all MDX metadata. Wraps reads in `unstable_cache` with tags `content:blog` and `content:projects`. Project frontmatter is strictly validated (throws on missing required fields); blog frontmatter is soft-normalized. Project ordering is priority (ascending) → date (descending) → title (alphabetical).

**Routing** (`src/app/`): Next.js App Router. Detail pages (`/blog/[slug]`, `/projects/[slug]`) are fully static: `generateStaticParams`, `dynamicParams = false`, `dynamic = "force-static"`. Each detail route also has `opengraph-image.tsx` and `twitter-image.tsx` for social cards, and `generateMetadata` for SEO.

**On-demand revalidation** (`src/app/api/revalidate/route.ts`): Accepts GET/POST with `?secret=` and optional `?tag=` (values: `all`, `blog`, `projects`). Requires `REVALIDATE_SECRET` env var. Calls `revalidateTag(tag, "max")`.

**MDX rendering** (`src/mdx-components.tsx`): Overrides default MDX rendering -- Mermaid diagrams from fenced ` ```mermaid ` blocks, syntax-highlighted code blocks, styled links/blockquotes/images.

**Design system**: Dark theme with OKLCH color space. Tokens defined as CSS variables in `src/app/globals.css`. Uses Tailwind CSS v4 + `@tailwindcss/typography`. shadcn/ui primitives (new-york style, slate base). Import path alias: `@/*` → `src/*`.

**Mobile nav**: Right-side drawer via shadcn/ui `sheet`; avoid replacing with full-screen takeovers.

## Key Practices

- Prefer server components; add `"use client"` only when hooks or browser APIs are required.
- Use `@/*` imports, not long relative paths.
- All content-driven routes must use `src/lib/content.ts` helpers to keep cache tag behavior consistent.
- Do not duplicate content metadata between frontmatter/`src/content/*` and UI.
- Reuse styling tokens from `src/app/globals.css`; do not introduce disconnected color or type systems.
- Use ASCII punctuation in authored copy. Use `-` instead of em dash or en dash.
- For dense mobile content, use progressive disclosure (collapsible/details) rather than hiding information.

## Content Rules

**Blog frontmatter** (required fields): `title`, `date` (ISO `YYYY-MM-DD`), `summary`, `tags`, `level`, `track`, `appliesTo`, `takeaway`.

**Project frontmatter** (required): `title`, `date`, `summary`, `status` (one of `Live | WIP | Paused | Completed`), `tech`. Optional: `featured` (default `false`), `priority` (default `100`), `links`, `domains`, `constraints`, `metrics`, `evidence`, `outcomes`.

The MDX filename is the slug. Keep `outcomes`, `domains`, `constraints`, and `metrics` internally consistent per project -- do not mix work-experience data into project entries.

## SEO Baseline

- `metadataBase` and canonical URL defaults are in the root layout and `src/lib/site.ts`.
- All index and detail routes must be covered by `src/app/sitemap.ts` and `src/app/robots.ts`.
- Set `NEXT_PUBLIC_SITE_URL` in deployment environments for correct canonical/sitemap hosts.

## LinkedIn Blog Captions

When generating a LinkedIn caption for any blog in this repo, see the detailed rules and worked examples in `AGENTS.md` (LinkedIn Blog Captions section). Default to one caption, no hashtags, no emoji, teach-first tone, credibility line grounded in real industry experience, final line as `Link: [public blog URL]`.

## Further Reference

- `AGENTS.md` -- product direction, detailed style rules, LinkedIn caption guide
- `docs/dev-notes.md` -- implementation details, MDX pipeline, caching/revalidation behavior
