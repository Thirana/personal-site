---
target: homepage / full site
total_score: 26
p0_count: 0
p1_count: 2
p2_count: 3
timestamp: 2026-05-26T15-50-49Z
slug: homepage-full-site
---

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                                                                                   |
| --------- | ------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| 1         | Visibility of System Status     | 2         | Nav active state works; typewriter header introduces ambiguity, not clarity                                 |
| 2         | Match System / Real World       | 3         | Language is clear and engineer-appropriate; "Evidence Links" and "Backend/Infra" labels are slightly opaque |
| 3         | User Control and Freedom        | 3         | Good; browser back always works, mobile sheet has close affordance                                          |
| 4         | Consistency and Standards       | 3         | Design system is cohesive; TechTabs dot style vs Tag chips swatch palette is a minor divergence             |
| 5         | Error Prevention                | 3         | Static site; external links handled correctly with noreferrer                                               |
| 6         | Recognition Rather Than Recall  | 3         | Nav always visible and labeled; no search or filtering means content isn't scannable                        |
| 7         | Flexibility and Efficiency      | 2         | No search, no filtering on blog or projects, no keyboard accelerators                                       |
| 8         | Aesthetic and Minimalist Design | 3         | Mostly clean; homepage density is high; mono-label pattern repeated 6+ times per page becomes invisible     |
| 9         | Error Recovery                  | 2         | No 404 page found in codebase; no empty states visible                                                      |
| 10        | Help and Documentation          | 2         | No contact CTA above the fold; no way to filter or find specific work quickly                               |
| **Total** |                                 | **26/40** | **Acceptable — meaningful improvements available**                                                          |

## Anti-Patterns Verdict

LLM assessment: Partial pass. The GL token system is coherent and distinctive. The indexed project list avoids the card-grid trap. The failures are localized but prominent: BrandTypewriter in the sticky header is a typewriter effect explicitly named in the anti-references. Every page uses the same centered-stack layout and the same mono-label + rule header. Homepage buries projects below a full technology tab component.

Deterministic scan: bundled detector unavailable; manual code review substituted.
Browser visualization: not available in this session.

## Priority Issues

[P1] BrandTypewriter: named anti-pattern in the most persistent UI element

- File: src/components/BrandTypewriter.tsx, used in src/components/StickyHeader.tsx
- The sticky header cycles "Thirana's Blog / Portfolio / Projects / Experience" via a typewriter animation on every page, forever. This is textbook typewriter-hero-effect from the anti-references. Signals template-use to hiring managers.
- Fix: Replace with a static identity mark. "Thirana Embuldeniya" in mono uppercase, or a compact wordmark. The header should be stable.
- Command: /impeccable polish src/components/StickyHeader.tsx

[P1] Homepage buries projects below TechTabs

- File: src/app/page.tsx
- Section order: status pill > profile card > headline + highlights > Technologies & Tools (full tab component) > Project Portfolio > Experience. TechTabs is already on /about. On the homepage it delays the highest-value content by a full viewport height.
- Fix: Remove TechTabs from homepage (already on /about). Reorder: Status > Profile card > Headline > Projects > Experience.
- Command: /impeccable layout src/app/page.tsx

[P2] FadeIn doesn't respect prefers-reduced-motion

- File: src/components/FadeIn.tsx
- Fires opacity + translateY animation on every section, every page, with no prefers-reduced-motion check. WCAG 2.1 SC 2.3.3 violation.
- Fix: If window.matchMedia('(prefers-reduced-motion: reduce)').matches, set visible=true immediately.
- Command: /impeccable audit src/components/FadeIn.tsx

[P2] Section-label pattern overused, becomes invisible

- Files: src/app/page.tsx, src/app/about/page.tsx, src/app/blog/page.tsx, src/app/projects/page.tsx
- The mono uppercase label + ruled line appears 3 times on the homepage, 3 times on /about. By the second or third instance it registers as decoration.
- Fix: Reserve for top-level page sections only. Reduce homepage to 1 instance. Use whitespace and weight contrast for sub-group separation.
- Command: /impeccable layout src/app/page.tsx

[P2] Homepage headline is the site's key value proposition, treated as secondary

- File: src/app/page.tsx
- The identity statement is italic body text in a left-bordered callout, visually subordinate to the profile card. The left stripe is also the side-stripe border explicitly banned in DESIGN.md.
- Fix: Elevate headline into or adjacent to the profile card, or remove the bordered callout entirely. Replace the 3px stripe with weight contrast or nothing.
- Command: /impeccable layout src/app/page.tsx

## Persona Red Flags

Jordan (Recruiter): ~300px of scroll before it's clear what Thirana does. TechTabs is a dense skills wall before reaching the projects.

Marcus (Hiring Manager): Typewriter header reads as template immediately. TechTabs duplicates resume data. Projects reached after 50%+ scroll. 90-second visit budget spent navigating, not evaluating work.

Casey (Mobile): Social icon buttons are 28px x 28px (h-7 w-7), below 44px minimum touch target. Tab triggers in TechTabs are small.

## Minor Observations

- BlogCard shows no post date in list view; recency signals matter for technical writing.
- TechTabs uses bg-gl-primary as dot color; Tag chips use 6-color swatch palette. Both appear on homepage, inconsistency is visible.
- animate-scale-in in globals.css uses cubic-bezier(0.34, 1.56, 0.64, 1) — a bounce curve, prohibited by motion rules.
- About page duplicates TechTabs from homepage; visitors see the same section twice.
- MetaStrip "Backend/Infra: N" leaks internal domain-filter logic as a UI stat label.
