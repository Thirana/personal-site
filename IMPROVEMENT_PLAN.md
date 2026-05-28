# Site Improvement Plan

Based on the `/impeccable critique` run on 2026-05-26. Score: **26/40** (Acceptable).
Target after all fixes: **32+/40**.

All changes are scoped to the homepage and shared components unless noted.
Work through these in order — earlier steps unblock later ones.

---

## Step 1 — FadeIn: accessibility fix ✅ DONE

**Priority:** P2 (WCAG violation)
**File:** `src/components/FadeIn.tsx`
**Command:** direct code edit (no impeccable command needed)

### Why

Every section on every page fades in with `opacity 0→1` and `translateY 14px→0`.
There is no check for `prefers-reduced-motion`. Users with vestibular disorders or motion
sensitivity set this OS-level preference; the site ignores it entirely.
This is a WCAG 2.1 SC 2.3.3 (Animation from Interactions) violation.

### What to change

Inside `useEffect`, add this check at the top before the IntersectionObserver setup:

```ts
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setVisible(true);
  return;
}
```

When reduced-motion is requested, `visible` is set to `true` immediately — no
delay, no animation, content just appears. The rest of the component is unchanged.

---

## Step 2 — StickyHeader: kill the BrandTypewriter ✅ DONE

**Priority:** P1 (named anti-pattern)
**File:** `src/components/StickyHeader.tsx`
**Command:** `/impeccable polish src/components/StickyHeader.tsx`

### Why

The sticky header cycles "Thirana's Blog / Portfolio / Projects / Experience" via a
typewriter animation on every page, permanently. This is the exact "typewriter I am a
[role] / hero effect" pattern listed in the site's own anti-references in PRODUCT.md.

Problems:

- It runs in the most persistent UI element (visible on every scroll, every page)
- It reads as a template signal to any hiring manager who has seen 40 portfolios
- It conflicts with the brand personality (Credible, Direct, Precise)
- The nav links already list Blog / Projects / etc. — the animation adds no information
- It is visually distracting in a header meant to be stable

### What to change

In `StickyHeader.tsx`:

- Remove the `import BrandTypewriter from "./BrandTypewriter"` line
- Replace `<BrandTypewriter />` with plain text: `Thirana Embuldeniya`

The link `className` already has the correct mono uppercase style. No other changes needed.

BrandTypewriter.tsx can be left in place (do not delete it unless you are certain it is
unused elsewhere).

---

## Step 3 — Homepage: section order + remove TechTabs ✅ DONE

**Priority:** P1
**File:** `src/app/page.tsx`
**Command:** `/impeccable layout src/app/page.tsx`

### Why

Current homepage section order:

1. Status pill
2. Profile card
3. Headline + highlights
4. **Technologies & Tools (TechTabs)** ← full tab component with 4 categories
5. Project Portfolio
6. Experience

An engineering hiring manager who does not scroll past 50% of the page never sees
the work. TechTabs is a skills inventory — it belongs on the About page, where it
already exists. On the homepage it delays the highest-value content (projects) by a
full viewport height on desktop, more on mobile.

### What to change

Remove the TechTabs section from `page.tsx` entirely:

- Remove `import TechTabs from "@/components/TechTabs"`
- Remove the `<FadeIn delay={220}><Section title="Technologies & Tools"><TechTabs /></Section></FadeIn>` block

Reorder the remaining sections and adjust FadeIn delays:

| Section               | Old delay | New delay |
| --------------------- | --------- | --------- |
| Status pill           | 0ms       | 0ms       |
| Profile card          | 80ms      | 80ms      |
| Headline + highlights | 160ms     | 160ms     |
| Project Portfolio     | 280ms     | 220ms     |
| Experience            | 340ms     | 280ms     |

TechTabs stays on `/about` — no change needed there.

---

## Step 4 — Homepage: fix the headline callout ✅ DONE

**Priority:** P2
**File:** `src/app/page.tsx`
**Command:** can be done in the same pass as Step 3

### Why

The site's single most important sentence — the value proposition — is rendered as
italic body text inside a left-bordered callout with a 3px `bg-gl-primary` vertical
stripe. Two problems:

1. The 3px left stripe is the exact side-stripe border pattern banned in DESIGN.md.
2. The visual treatment (italic + bordered callout) de-emphasises the headline. It
   reads as a secondary pullquote, not the primary identity statement.

A hiring manager pattern-matching in 10 seconds will parse the profile card first,
then this bordered block second. The content order and visual weight are inverted.

### What to change

Replace the current structure:

```jsx
// BEFORE — remove this
<div className="flex gap-4">
  <div className="w-[3px] shrink-0 self-stretch rounded-full bg-gl-primary" />
  <div className="space-y-3 pb-2">
    <p className="text-[17px] italic font-medium ...">{profile.headline}</p>
    <ul>...</ul>
  </div>
</div>
```

With a plain structure that gives the headline visual authority through weight, not decoration:

```jsx
// AFTER — use this
<div className="space-y-4">
  <p className="text-[19px] font-semibold leading-[1.65] tracking-[-0.01em] text-gl-text">
    {profile.headline}
  </p>
  <ul className="space-y-2 text-[15px] text-gl-text">
    {profile.highlights.map((item) => (
      <li key={item} className="flex gap-2">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gl-primary" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
</div>
```

Key changes: remove the outer flex wrapper and the stripe div; change `italic font-medium text-[17px]` to `font-semibold text-[19px] tracking-[-0.01em]`. The headline now stands on its own weight.

---

## Step 5 — Homepage: fix social icon tap targets ✅ DONE

**Priority:** P2 (accessibility / mobile)
**File:** `src/app/page.tsx`
**Command:** included in the Step 3/4 pass or `/impeccable audit src/app/page.tsx`

### Why

Social icon buttons in the profile card are `h-7 w-7` (28px) on mobile.
WCAG 2.2 SC 2.5.8 requires a minimum 24×24px target with adequate spacing, and
the practical target for comfortable touch interaction is 44×44px.
At 28px these are difficult to tap accurately one-handed.

### What to change

In the social icon `<a>` elements, change:

```
className="inline-flex h-7 w-7 ... sm:h-9 sm:w-9"
```

To:

```
className="inline-flex h-9 w-9 ..."
```

Remove the `sm:` size variant — `h-9 w-9` (36px) is the right size at all breakpoints.
The icon size inside (`h-3.5 w-3.5 sm:h-4 sm:w-4`) can stay as-is.

---

## Step 6 — BlogCard: add post date

**Priority:** P3
**File:** `src/components/BlogCard.tsx`
**Command:** `/impeccable polish src/components/BlogCard.tsx`

### Why

Technical readers care about recency. The blog list shows no publication date on any
post. The MetaStrip at the top of the page shows "Latest: YYYY-MM-DD" but that is a
single aggregate stat, not per-post. An EM scanning for a relevant recent post has
no way to assess freshness without clicking into each one.

### What to change

Add a date line between the title link and the summary paragraph:

```jsx
{/* Title */}
<Link ...>{post.title}</Link>

{/* Date — add this */}
<p className="text-[12px] font-medium text-gl-text-faint">{post.date}</p>

{/* Summary */}
<p ...>{post.summary}</p>
```

`post.date` is already available on the `ContentMeta` type (ISO `YYYY-MM-DD` format
from frontmatter). No data changes needed.

---

## Step 7 — Projects page: fix MetaStrip label ✅ DONE

**Priority:** P3
**File:** `src/app/projects/page.tsx`
**Command:** `/impeccable clarify src/app/projects/page.tsx`

### Why

The MetaStrip on the projects page shows:

| Label             | Value |
| ----------------- | ----- |
| Total Systems     | N     |
| Active            | N     |
| **Backend/Infra** | N     |
| Evidence Links    | N     |

"Backend/Infra" is an internal domain-filter label — it reflects the hardcoded
`["api", "data", "platform", "infra", "observability"]` filter in the component code.
Visitors see an opaque label that leaks an implementation detail.

### What to change

In `projects/page.tsx`, change:

```ts
{ label: "Backend/Infra", value: `${backendOrInfra}` }
```

To:

```ts
{ label: "Technical", value: `${backendOrInfra}` }
```

The underlying count is unchanged. The label is now meaningful to a visitor.

---

## Step 8 — Hero section: unique redesign ✅ DONE

**Priority:** Design uplift (the biggest single change)
**File:** `src/app/page.tsx`
**Command:** `/impeccable polish need to improve hero section such a way it gives unique approach`

### Why

After Steps 3–5, the homepage has the right structure but the hero is still a
"raised profile card with headshot + name" — a template shape. For a brand-register
portfolio where design IS the product, the hero needs to signal craft, not convenience.

The "Quiet Workshop" north star and "Credible, Direct, Precise" personality call for
something structural and engineered — not a startup hero, not an editorial magazine
opener, not a terminal aesthetic.

### The approach: personal specification

Replace the raised card with an open-structure spec sheet:

- **Name at display scale** (`44px` mobile / `56px` desktop, tight tracking, broken across two lines)
- **No card container** — hero sits directly on the page ground
- **Two thin horizontal rules** create three structural zones
- **Spec rows** using `opsSignals` from `profile.ts` — mono labels (Role / Focus / Stack / Delivery Style) paired with values
- **Headline** stands alone in the third zone at 17px / 1.75 line-height
- **Contact row** at the bottom uses the Section Header pattern (mono label + expanding rule + icon buttons)
- **Photo** becomes a secondary element: small (72×88px), right-anchored on desktop, hidden on mobile

### Structure

```
● Open to work

THIRANA                              [photo — sm+ only]
EMBULDENIYA

─────────────────────────────────────

ROLE          Backend Engineer
FOCUS         Reliability + Data Systems
PREFERRED STACK   Node.js, Go, AWS
DELIVERY STYLE    Metrics-first

─────────────────────────────────────

I enjoy taking backend ideas from concept to working
systems. I study how real platforms handle reliability,
scale, and architecture decisions...

REACH OUT  ──────────────  [●] [●] [●] [●]
```

### Key implementation notes

- Import `opsSignals` from `@/content/profile`
- Name is hardcoded with `<br />` between first and last name for the two-line display treatment
- Spec row grid: `grid-cols-[105px_1fr] sm:grid-cols-[140px_1fr]`; label: `font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-gl-text-faint`
- The entire hero is one `<FadeIn>` block (no staggered sub-sections)
- Outer page `space-y-16` (was `space-y-12`) for more breathing room between hero and projects

---

## Step 9 — Reduce section-label overuse (across pages)

**Priority:** P2
**Files:** `src/app/page.tsx`, `src/app/about/page.tsx`
**Command:** `/impeccable layout` (per page)

### Why

The mono-label + ruled line (Section Header pattern) is the system's structural
signature. On the homepage it appeared 3 times (Technologies & Tools, Project
Portfolio, Experience). After Step 3 removes TechTabs, it appears twice — acceptable.

The About page has 3 instances: Technologies & Tools, Featured Work, How I Work.
When the pattern appears on every subsection it stops being a structural signal and
becomes visual wallpaper. The value of the pattern comes from its rarity.

### What to change

**Homepage:** after Steps 3–8, only 2 section labels remain (Project Portfolio,
Experience). No further action needed here.

**About page:** evaluate whether all three labels are necessary. Consider:

- Keep "Technologies & Tools" (it is the primary content section on /about)
- Keep "Featured Work"
- "How I Work" can use a plain `<h2>` or a visual weight break instead of the full Section Header pattern, since it is a sub-section within the page, not a primary navigation section

This is a judgement call — review the about page after completing Steps 1–8 before
making this change.

---

## Step 10 — Final quality pass

**Priority:** polish
**Files:** all modified files
**Command:** `/impeccable polish`

### What to check

Run this after all previous steps are complete.

- [ ] Build passes cleanly (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] Homepage loads, hero is correct, no layout shift
- [ ] Sticky header shows static name, no animation
- [ ] Projects section appears above the fold on desktop after a short scroll
- [ ] Blog posts show dates
- [ ] Social icons are 36px (h-9 w-9) on mobile
- [ ] Reduced-motion: verify FadeIn content shows immediately when `prefers-reduced-motion: reduce` is set
- [ ] About page still has TechTabs (it was not changed)
- [ ] No console errors

---

## Summary table

| Step | File              | Why                                      | Command                   | Effort  |
| ---- | ----------------- | ---------------------------------------- | ------------------------- | ------- |
| 1    | FadeIn.tsx        | WCAG a11y violation                      | direct edit               | ✅ Done |
| 2    | StickyHeader.tsx  | Anti-pattern, kills credibility          | `/impeccable polish`      | ✅ Done |
| 3    | page.tsx          | Section order buries projects            | `/impeccable layout`      | ✅ Done |
| 4    | page.tsx          | Side-stripe border ban + headline weight | same pass as Step 3       | ✅ Done |
| 5    | page.tsx          | Small tap targets on mobile              | same pass as Step 3       | ✅ Done |
| 6    | BlogCard.tsx      | Missing recency signal                   | `/impeccable polish`      | 5 min   |
| 7    | projects/page.tsx | Leaky internal label                     | `/impeccable clarify`     | ✅ Done |
| 8    | page.tsx          | Hero needs unique identity               | `/impeccable polish` hero | ✅ Done |
| 9    | about/page.tsx    | Section pattern overuse                  | `/impeccable layout`      | 10 min  |
| 10   | all               | Final quality pass                       | `/impeccable polish`      | 20 min  |

**Total estimated time:** ~1.5 hours

---

## Reference

- Critique snapshot: `.impeccable/critique/2026-05-26T15-50-49Z__homepage-full-site.md`
- Design system: `DESIGN.md` (tokens, component specs, named rules)
- Strategy: `PRODUCT.md` (personas, anti-references, design principles)
- Re-run `/impeccable critique` after all steps to verify score improvement
