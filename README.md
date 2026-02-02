# Thirana's Personal Site

A minimal, MDX‑powered personal site with a calm, markdown‑style aesthetic, project portfolio, and work experience timeline.

## Use This Repo

You can use this repo as a starting point for your own site. Feel free to fork it, customize it, and remove any personal information. I love seeing my work used by others, so if it helps you, consider giving it a ⭐

## Features

- **Portfolio homepage** with profile, skills, featured projects, and experience.
- **MDX content system** for projects and blog posts (frontmatter‑driven).
- **Project pages** with metadata, tech tags, and links.
- **Work experience timeline** with collapsible roles and markdown descriptions.
- **Dark, minimal UI** with Tailwind Typography for prose styling.

## Tech Stack

- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS** + **Typography Plugin**
- **MDX** via `@next/mdx`
- **Content parsing** with `gray-matter`
- **UI utilities** from shadcn/ui (Card, Badge, Button, Separator, Collapsible)

### Credits

- Work Experience component by **@ncdai / Chanh Dai** (inspired by: `chanhdai.com/components/work-experience-component`).

## Project Structure

- `content/blog/*.mdx` – Blog posts (frontmatter + body)
- `content/projects/*.mdx` – Projects (frontmatter + body)
- `src/content/profile.ts` – Profile + skills + socials data
- `src/content/experience.ts` – Work experience data
- `src/components/work-experience.tsx` – Experience timeline component
- `src/lib/content.ts` – Content loader helpers

## Local Setup

### 1) Clone the repo

```bash
git clone https://github.com/Thirana/personal-site.git
cd personal-site
```

### 2) Install dependencies

```bash
npm install
```

### 3) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 to view the site.

### 4) Build for production

```bash
npm run build
npm run start
```

## Notes

- MDX frontmatter is used as the source of truth for blog/project metadata.
- Social links and personal info live in `src/content/profile.ts`.

---

If you find any issues or have suggestions, feel free to open a PR.
