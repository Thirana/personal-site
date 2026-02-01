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

## Dev Server Notes

- Turbopack fails with MDX loader options because remark plugin functions are not serializable.
- Dev script was updated to force webpack:
  - `package.json` -> `"dev": "next dev --webpack"`

## Known Warnings (safe to ignore for now)

- Experimental type-stripping warning from Next.js.
- Module type warning for `tailwind.config.ts` (can be resolved later by using `.mts` or adding `"type": "module"`).

## Quick Checklist

- Start dev server: `npm run dev`
- Blog index: `/blog`
- Blog post: `/blog/hello-world`
- Projects index: `/projects`
- Project detail: `/projects/personal-site`
