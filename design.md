# Portfolio Site — UI Style Migration Prompt

**Purpose:** Give this entire document to a coding agent to restyle a personal portfolio/blog (Next.js, no separate backend) to match the design system of Grow Logs — a production SaaS product. The agent must apply the full design language: color tokens, typography, spacing, component patterns, animations, and visual layering. This is a complete restyle, not a theme swap.

---

## What You Are Doing

You are migrating the visual style of this Next.js portfolio/blog site to match the Grow Logs design system. The result must feel like a premium, dark-mode developer product — similar in quality to Linear, Fathom Analytics, or Vercel's marketing site. Every page must feel part of the same cohesive product.

**This is NOT:**

- A simple color swap
- Adding a dark mode toggle (it is dark-only)
- Changing just the navbar

**This IS:**

- A full design system implementation — tokens, typography, layering, spacing, components
- A complete restyle of every page: home/landing, blog list, blog post, about, any other pages
- Mobile-first responsive layouts throughout

---

## Design System — Color Tokens

Add all of these as CSS custom properties in your global CSS file (`:root`). The site is **dark-only** — no light mode.

```css
:root {
  /* Surfaces — forest-charcoal */
  --gl-bg: #161918;
  --gl-bg-subtle: #101210;
  --gl-surface: #1d201e;
  --gl-surface-2: #252924;

  /* Borders */
  --gl-border: #2c312d;
  --gl-border-strong: #d8ddd6;
  --gl-border-input: #383d39;

  /* Text — cool off-white with sage tone */
  --gl-text: #eef0ec;
  --gl-text-muted: #8a9189;
  --gl-text-faint: #606963;

  /* Primary accent — deep teal-green */
  --gl-primary: #2eb8a0;
  --gl-primary-hover: #3ecdb5;
  --gl-primary-soft: #0d2420;
  --gl-primary-ink: #051a16;

  /* Accent swatches — used for tags, categories, highlights */
  --gl-swatch-1: #69b598; /* green */
  --gl-swatch-2: #8285ba; /* periwinkle */
  --gl-swatch-3: #b87da2; /* mauve */
  --gl-swatch-4: #c4a05e; /* amber */
  --gl-swatch-5: #b87060; /* terracotta */
  --gl-swatch-6: #62aebf; /* sky */

  /* Semantic states */
  --gl-success: #69b598;
  --gl-success-soft: #0d2419;
  --gl-warning: #c4a05e;
  --gl-warning-soft: #231a07;
  --gl-danger: #b87060;
  --gl-danger-soft: #261009;

  /* Shadows */
  --gl-shadow:
    0 1px 2px rgba(0, 0, 0, 0.5), 0 8px 24px -10px rgba(0, 0, 0, 0.55);
  --gl-shadow-lg:
    0 2px 4px rgba(0, 0, 0, 0.55), 0 28px 48px -20px rgba(0, 0, 0, 0.7);
  --gl-shadow-hard: 4px 4px 0 #d8ddd6;
}
```

**If using Tailwind CSS v4**, map these into `@theme inline` so they become utility classes:

```css
@theme inline {
  --color-gl-bg: var(--gl-bg);
  --color-gl-bg-subtle: var(--gl-bg-subtle);
  --color-gl-surface: var(--gl-surface);
  --color-gl-surface-2: var(--gl-surface-2);
  --color-gl-border: var(--gl-border);
  --color-gl-border-strong: var(--gl-border-strong);
  --color-gl-border-input: var(--gl-border-input);
  --color-gl-text: var(--gl-text);
  --color-gl-text-muted: var(--gl-text-muted);
  --color-gl-text-faint: var(--gl-text-faint);
  --color-gl-primary: var(--gl-primary);
  --color-gl-primary-hover: var(--gl-primary-hover);
  --color-gl-primary-soft: var(--gl-primary-soft);
  --color-gl-primary-ink: var(--gl-primary-ink);
  --color-gl-swatch-1: var(--gl-swatch-1);
  --color-gl-swatch-2: var(--gl-swatch-2);
  --color-gl-swatch-3: var(--gl-swatch-3);
  --color-gl-swatch-4: var(--gl-swatch-4);
  --color-gl-swatch-5: var(--gl-swatch-5);
  --color-gl-swatch-6: var(--gl-swatch-6);
  --shadow-gl: var(--gl-shadow);
  --shadow-gl-lg: var(--gl-shadow-lg);
  --shadow-gl-hard: var(--gl-shadow-hard);
}
```

**If using Tailwind CSS v3**, add them to `tailwind.config.js` under `theme.extend.colors` and `theme.extend.boxShadow`.

---

## Design System — Typography

### Fonts

- **Body/UI font:** Inter (Google Fonts) — `font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11'`
- **Monospace:** Geist Mono (Google Fonts) or JetBrains Mono — used for code, stats, numbers, dates
- Apply `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility` on `body`

### Type Scale and Treatment

| Use                 | Size                                  | Weight        | Tracking                          |
| ------------------- | ------------------------------------- | ------------- | --------------------------------- |
| Hero headline       | `52px` mobile → `64px` sm → `78px` lg | `font-bold`   | `tracking-[-0.035em]`             |
| Section headline    | `34px` mobile → `44px` sm             | `font-bold`   | `tracking-[-0.025em]`             |
| Sub-section heading | `28px` → `32px`                       | `font-bold`   | `tracking-[-0.022em]`             |
| Card/panel title    | `20px`                                | `font-bold`   | `tracking-[-0.015em]`             |
| Body copy           | `17px` → `20px` sm                    | normal        | default                           |
| Secondary body      | `14px`–`16px`                         | normal        | default                           |
| UI labels / caps    | `10px`–`11px`                         | `font-bold`   | `tracking-[0.10em]` + `uppercase` |
| Monospace stats     | `22px`–`26px`                         | `font-bold`   | default                           |
| Nav links           | `14px`                                | `font-medium` | default                           |

- **Gradient headline text** — use this pattern for primary taglines:
  ```html
  <span
    class="bg-gradient-to-r from-[#2EB8A0] to-[#7DDFD0] bg-clip-text text-transparent"
  >
    key phrase
  </span>
  ```
- **Leading** — headlines use `leading-[1.02]` to `leading-[1.18]`; body uses `leading-[1.55]` to `leading-[1.65]`
- **Text balance** — add `text-wrap: balance` on headlines, `text-wrap: pretty` on body paragraphs

### Text Selection

```css
::selection {
  background-color: rgba(46, 184, 160, 0.22);
  color: var(--gl-text);
}
```

---

## Design System — Surfaces and Layering

The site uses three levels of visual depth — never place content on a flat black background.

| Layer             | Token            | Hex       | Use                                           |
| ----------------- | ---------------- | --------- | --------------------------------------------- |
| Page background   | `--gl-bg`        | `#161918` | `<body>` and page root                        |
| Subtle background | `--gl-bg-subtle` | `#101210` | Sidebar, footer, recessed areas               |
| Surface (card)    | `--gl-surface`   | `#1d201e` | Cards, panels, dropdowns                      |
| Surface elevated  | `--gl-surface-2` | `#252924` | Nested cards, input backgrounds, inner panels |

**Card pattern (use on every content card):**

```html
<div class="bg-gl-surface border border-gl-border shadow-gl rounded-2xl p-6">
  <!-- content -->
</div>
```

**Ambient glow decoration** — add subtle radial gradients on key sections so large dark areas don't feel empty:

```css
/* Example: hero section background glow */
background-image: radial-gradient(
  ellipse 60% 40% at 50% 0%,
  rgba(46, 184, 160, 0.07) 0%,
  transparent 70%
);
```

Use opacity `0.04`–`0.09` for glows. Never brighter.

**Border tokens:**

- Standard borders: `border-gl-border` (`#2c312d`) — cards, dividers, nav
- Input borders: `border-gl-border-input` (`#383d39`) — form fields
- Strong borders: `border-gl-border-strong` (`#d8ddd6`) — hard shadow, chunky stat cards (use sparingly)

---

## Design System — Components

### Navbar

```
[Logo wordmark]        [nav links: center]        [CTA button]
```

Behaviour:

- Transparent on page load
- On scroll past 24px: gains `border-b border-gl-border bg-gl-bg/80 backdrop-blur-2xl`
- `sticky top-0 z-50 transition-all duration-300`
- Mobile: hamburger icon reveals a slide-down menu with `max-h` transition
- Logo: product/name wordmark — `text-gl-text text-[17px] font-bold tracking-[-0.015em]`
- Nav links: `text-gl-text-muted hover:text-gl-text text-[14px] font-medium`
- CTA button: see Button section below

### Announcement/Status Pill (hero area)

```html
<div
  class="border border-gl-border bg-gl-surface text-gl-text-muted mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 pr-3.5 text-[12px] font-medium"
>
  <span
    class="bg-gl-primary-soft text-gl-primary rounded-full px-2 py-0.5 text-[10.5px] font-bold tracking-[0.08em] uppercase"
  >
    New
  </span>
  Announcement text here →
</div>
```

### Buttons

Three variants — never use plain grey or blue buttons:

**Primary (teal glass):**

```html
<button
  class="inline-flex items-center gap-2.5 rounded-[10px] px-[22px] py-[13px] text-[15px] font-semibold bg-gl-primary/[0.16] text-gl-primary hover:bg-gl-primary/[0.24] transition-all duration-[120ms] active:scale-[0.97]"
>
  Label →
</button>
```

**Secondary (glass):**

```html
<button
  class="inline-flex items-center gap-2.5 rounded-[10px] px-[22px] py-[13px] text-[15px] font-semibold bg-gl-text/[0.06] text-gl-text hover:bg-gl-text/[0.10] transition-all duration-[120ms] active:scale-[0.97]"
>
  Label
</button>
```

**Ghost:**

```html
<button
  class="bg-transparent text-gl-text-muted hover:bg-gl-text/[0.05] hover:text-gl-text rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-all duration-[120ms]"
>
  Label
</button>
```

Size variants: `sm` = `px-3 py-1.5 text-[13px] rounded-lg`, `md` = `px-3.5 py-[9px] text-[14px] rounded-lg`, `lg` = `px-[22px] py-[13px] text-[15px] rounded-[10px]`

### Tags / Chips (for blog post categories, skills, tech stack)

```html
<!-- Outline chip -->
<span
  class="border border-gl-border bg-gl-surface-2 text-gl-text inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium"
>
  Tag name
</span>

<!-- Colored dot chip (for categories) -->
<span
  class="border border-gl-border bg-gl-surface-2 text-gl-text inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium"
>
  <span
    class="size-[7px] rounded-full shrink-0"
    style="background: #69B598"
  ></span>
  Category
</span>
```

Assign tag colors from the swatch palette: `#69b598`, `#8285ba`, `#b87da2`, `#c4a05e`, `#b87060`, `#62aebf` — pick consistently per tag name.

### Trust Badges / Feature Bullets

```html
<div
  class="inline-flex items-center gap-[7px] text-[13px] font-medium text-gl-text-muted whitespace-nowrap"
>
  <span
    class="bg-gl-primary-soft text-gl-primary inline-flex size-[18px] items-center justify-center rounded-full"
  >
    ✓
  </span>
  Feature text
</div>
```

### Section Headers (inside content areas — labeled dividers)

```html
<div class="mb-6 flex items-center gap-4">
  <div class="flex shrink-0 items-center gap-2.5">
    <div class="bg-gl-primary h-[18px] w-[3px] rounded-full"></div>
    <h2 class="text-gl-text text-[15px] font-bold tracking-[-0.015em]">
      Section Title
    </h2>
  </div>
  <div class="border-t border-gl-border min-w-0 flex-1"></div>
</div>
```

### Stat / Number Cards

```html
<div class="border border-gl-border bg-gl-surface-2 rounded-xl p-3 text-center">
  <p
    class="font-mono text-[22px] leading-none font-bold tabular-nums text-gl-primary"
  >
    147
  </p>
  <p class="text-gl-text-faint mt-1.5 text-[10px] leading-tight">
    Total entries
  </p>
</div>
```

### Code Blocks (for blog posts)

```html
<pre
  class="bg-gl-bg-subtle border border-gl-border rounded-xl p-5 overflow-x-auto font-mono text-[13px] leading-[1.7] text-gl-text-muted"
>
  <code>...</code>
</pre>
```

- Use `text-gl-primary` for keywords/strings
- Use `text-gl-text-faint` for comments

### Scrollbars

```css
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: var(--gl-bg-subtle);
}
::-webkit-scrollbar-thumb {
  background: var(--gl-border);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--gl-text-faint);
}
```

### Focus Ring

```css
:focus-visible {
  outline: 2px solid var(--gl-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

---

## Design System — Animations

Add these keyframes and utility classes:

```css
@keyframes gl-fade-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gl-fade-up-lg {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gl-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes gl-scale-in {
  from {
    opacity: 0;
    transform: scale(0.78);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes gl-cursor-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
```

Utility classes:

```css
.animate-fade-up {
  animation: gl-fade-up 0.4s ease both;
}
.animate-fade-up-lg {
  animation: gl-fade-up-lg 1s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.animate-fade-in {
  animation: gl-fade-in 0.25s ease both;
}
.animate-scale-in {
  animation: gl-scale-in 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.animate-cursor-blink {
  animation: gl-cursor-blink 1s steps(2) infinite;
}

/* Stagger delays */
.animation-delay-100 {
  animation-delay: 100ms;
}
.animation-delay-200 {
  animation-delay: 200ms;
}
.animation-delay-300 {
  animation-delay: 300ms;
}
.animation-delay-500 {
  animation-delay: 500ms;
}
.animation-delay-700 {
  animation-delay: 700ms;
}
```

**Usage pattern for page sections — FadeIn on scroll:**

Wrap each page section in a `FadeIn` component that uses `IntersectionObserver` to trigger `animate-fade-up` when the element enters the viewport. Delay subsequent elements by `130ms` increments for a staggered reveal.

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

export function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
```

---

## Page-by-Page Implementation Guide

### Home / Landing Page

**Overall structure:**

```
<Navbar />               — sticky, transparent → frosted on scroll
<Hero />                 — headline, subtitle, CTA buttons, bento grid or product visual
<Features/Skills />      — tabbed or card layout showing what you do / tech stack
<Projects />             — card grid: featured work
<Blog preview />         — 2–3 latest posts as cards
<Footer />               — simple: name, links, copyright
```

**Hero section:**

- Full-width, text centered
- Announcement pill at top (see component above)
- H1 with gradient span on key phrase: `from-[#2EB8A0] to-[#7DDFD0]`
- `animate-fade-up-lg` on H1 lines with staggered `animation-delay-500` on second line
- Subtitle: `text-gl-text-muted text-[17px] sm:text-[20px] leading-[1.55] max-w-[620px] mx-auto`
- CTA row: primary button + secondary button with `gap-4 flex-wrap`
- Trust badges row below CTAs (e.g. "Open to work", "5 years experience", "Available remotely")
- Ambient teal glow behind hero: `radial-gradient(ellipse 60% 40% at 50% 0%, rgba(46,184,160,0.07), transparent)`
- Product/visual below: use a bento card grid showcasing your stack, a project snippet, or a stats widget. Do NOT use placeholder illustrations. Build real-looking mini widgets using the card pattern.

**Projects section:**

- Section headline: `text-[34px] sm:text-[44px] font-bold tracking-[-0.025em]`
- Card grid: `grid grid-cols-1 sm:grid-cols-2 gap-4` or `gap-5`
- Each project card: `bg-gl-surface border border-gl-border shadow-gl rounded-2xl p-6 hover:border-gl-border-input transition-colors`
- Inside card: tag chip for tech stack, title `text-[18px] font-bold text-gl-text`, description `text-gl-text-muted text-[14px] leading-[1.65]`, link row at bottom using a ghost button or inline link

**Blog preview section:**

- Same card pattern, show 2–3 recent posts
- Date: `text-gl-text-faint font-mono text-[11px] tracking-[0.08em] uppercase`
- Title: `text-gl-text text-[17px] font-bold tracking-[-0.015em]`
- Excerpt: `text-gl-text-muted text-[14px] leading-[1.65]`
- Category chip: colored with swatch palette

### Blog List Page

- Page header: `<h1>` with the section header divider pattern (accent bar + extending rule)
- Post list: vertical stack of cards using the card pattern above
- Each card shows: date (monospace faint), category chip (swatch color), title, excerpt, estimated read time

### Blog Post Page

- Max width `max-w-[720px] mx-auto`
- Title: `text-[32px] sm:text-[40px] font-bold tracking-[-0.025em] text-gl-text`
- Meta row: date in monospace faint + category chip + read time
- Body: `text-gl-text-muted text-[16px] leading-[1.75]`
- Headings in body (`h2`, `h3`): inherit the type scale above, use `text-gl-text font-bold`
- Inline code: `bg-gl-surface-2 border border-gl-border text-gl-primary rounded px-1.5 py-0.5 font-mono text-[13px]`
- Blockquote: `border-l-2 border-gl-primary pl-4 italic text-gl-text-muted`
- Links in body: `text-gl-primary hover:text-gl-primary-hover underline underline-offset-2`

### About / CV Page (if present)

- Same two-column or centered layout
- Skills: tag chips using the swatch palette assigned consistently per category (languages one color, frameworks another, tools another)
- Experience / education: use the card pattern with a subtle left-border accent (`border-l-2 border-gl-primary`) for timeline feel
- Any stats (years of experience, projects shipped, etc.) — use the stat card pattern with monospace numbers in `text-gl-primary`

---

## Layout and Spacing Rules

- **Page max width:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` on the page wrapper
- **Section vertical spacing:** `py-12 sm:py-16 lg:py-20` on every `<section>`
- **Between sections inside a section:** `mt-12` or `mt-16`
- **Card internal padding:** `p-5` or `p-6` for standard cards, `p-4` for nested inner panels
- **Card gap in grids:** `gap-3.5` to `gap-5`
- **Mobile-first always** — write base styles for mobile, then `sm:`, `md:`, `lg:` overrides

### Responsive Grid Patterns

| Use           | Mobile | sm    | lg                       |
| ------------- | ------ | ----- | ------------------------ |
| Project cards | 1 col  | 2 col | 3 col                    |
| Blog cards    | 1 col  | 2 col | 2 col                    |
| Feature bento | 1 col  | 2 col | custom `[1.4fr_1fr_1fr]` |
| About skills  | 2 col  | 3 col | 4 col                    |

---

## Footer

```html
<footer class="border-t border-gl-border bg-gl-bg-subtle mt-20 py-10">
  <div
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4"
  >
    <!-- Left: name / logo -->
    <span class="text-gl-text font-bold text-[15px]">Your Name</span>
    <!-- Center: links -->
    <div class="flex gap-4">
      <a
        href="#"
        class="text-gl-text-muted hover:text-gl-text text-[13px] font-medium transition-colors"
        >GitHub</a
      >
      <a
        href="#"
        class="text-gl-text-muted hover:text-gl-text text-[13px] font-medium transition-colors"
        >LinkedIn</a
      >
      <a
        href="#"
        class="text-gl-text-muted hover:text-gl-text text-[13px] font-medium transition-colors"
        >Twitter</a
      >
    </div>
    <!-- Right: copyright -->
    <span class="text-gl-text-faint text-[12px]">© 2026</span>
  </div>
</footer>
```

---

## Quality Checklist

Before considering the restyle complete, verify every item:

- [ ] `<body>` background is `#161918` — no white or light background anywhere
- [ ] Every page section has visual depth: cards use `bg-gl-surface` with `border-gl-border` and `shadow-gl`, not flat colored `<div>`s
- [ ] All text uses the token palette — no raw `text-black`, `text-white`, `text-gray-*`
- [ ] Primary CTA buttons use the teal glass style — no grey or blue Bootstrap-style buttons
- [ ] Hero headline has gradient span using `from-[#2EB8A0] to-[#7DDFD0]`
- [ ] Hero has announcement pill
- [ ] Navbar is transparent on load, frosted on scroll
- [ ] Mobile hamburger menu works and uses slide-down animation
- [ ] Tags / category chips use the swatch color palette consistently
- [ ] Blog post body has styled code blocks, blockquotes, and inline code
- [ ] `FadeIn` scroll animations on page sections
- [ ] Font is Inter with font-feature-settings applied
- [ ] Monospace numbers (dates, stats, counts) use Geist Mono or JetBrains Mono
- [ ] Custom scrollbar styles applied
- [ ] Focus rings use `outline: 2px solid var(--gl-primary)`
- [ ] Text selection uses teal `rgba(46,184,160,0.22)` highlight
- [ ] Footer uses `bg-gl-bg-subtle` with `border-t border-gl-border`
- [ ] No placeholder illustrations — any decorative visuals are real mini-widgets built from the component patterns above
- [ ] Every section has an ambient teal glow where appropriate (hero, featured section)
- [ ] All layouts are mobile-first and tested at 375px, 768px, 1280px

---

## What NOT to Do

- Do not add a light mode — this is dark-only
- Do not use `text-black`, `text-white`, `bg-white`, `bg-gray-*`, `bg-zinc-*` — use the token palette
- Do not use Bootstrap, generic shadcn themes, or pre-built dark theme packs — implement from the tokens above
- Do not use placeholder `<img>` illustrations — build real component-based widgets
- Do not use `text-blue-*` for links — use `text-gl-primary`
- Do not use `rounded-full` on cards — cards use `rounded-2xl` (16px) or `rounded-xl` (12px)
- Do not leave large empty dark sections with no surface layering or ambient glow
- Do not hardcode hover colors — use the token system: `hover:bg-gl-primary/[0.24]`, `hover:text-gl-text`
- Do not use `font-black` or very light weights — all weights are `font-medium`, `font-semibold`, or `font-bold`
