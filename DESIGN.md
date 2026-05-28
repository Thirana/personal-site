---
name: Thirana Embuldeniya Portfolio
description: Engineer portfolio built on restraint; the work speaks, the surface stays quiet
colors:
  chalk-lavender: "#9488c2"
  chalk-lavender-hover: "#a39ad0"
  chalk-lavender-soft: "#16143a"
  forest-black: "#161918"
  forest-black-deep: "#101210"
  surface: "#1d201e"
  surface-raised: "#252924"
  border-subtle: "#2c312d"
  border-input: "#383d39"
  border-strong: "#d8ddd6"
  text-primary: "#ffffff"
  text-muted: "#f5f7f5"
  text-faint: "#8c9690"
  success: "#69b598"
  success-soft: "#0d2419"
  warning: "#c4a05e"
  warning-soft: "#231a07"
  danger: "#b87060"
  danger-soft: "#261009"
  swatch-sage: "#8eceb4"
  swatch-lavender: "#a8abd8"
  swatch-rose: "#ccaabc"
  swatch-amber: "#d4b878"
  swatch-salmon: "#cc9888"
  swatch-sky: "#80c8d8"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.024em"
    fontFeature: '"cv02", "cv03", "cv04", "cv11"'
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.2em"
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  "2xl": "18px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  "2xl": "48px"
components:
  button-primary:
    backgroundColor: "{colors.chalk-lavender}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "11px 20px"
  button-primary-hover:
    backgroundColor: "{colors.chalk-lavender-hover}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "11px 20px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "11px 20px"
  tag:
    backgroundColor: "#2f3530"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  social-icon:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.full}"
    size: "36px"
---

# Design System: Thirana Embuldeniya Portfolio

## 1. Overview

**Creative North Star: "The Quiet Workshop"**

This is the surface where an engineer puts their work out for inspection, not for sale. The atmosphere is what you might find at 9pm in a well-run engineering org's internal wiki: dense without being cluttered, functional without being sterile. Dark surfaces that absorb rather than compete. A single lavender accent used narrowly as a structural signal, the way a good editor uses italics: rarely, so it means something when it appears. Monospace section labels that feel like file headers in a terminal session.

The color strategy is Restrained. Forest Black is the ground: a near-black with a faint green undertone that prevents the coldness of pure black without announcing itself as a design choice. Two surface tiers lift content off that ground through tonal layering, not shadows doing the work alone. Chalk Lavender appears on perhaps 8% of any screen; its role is navigation and emphasis, not branding. It earns its place each time by marking something actionable or structurally significant.

This system explicitly rejects generic dev portfolio templates with rainbow skill bars, animated counters, and typewriter hero effects. It rejects startup landing-page energy, gradient CTAs, and "helping teams ship faster" copy. It rejects over-designed portfolios that read as designer-not-engineer. If it starts to feel like a Webflow template or a Dribbble shot, something has gone wrong.

**Key Characteristics:**

- Dark ground with a faint organic tint; neither cold tech-dark nor warm editorial-dark
- One accent color, used with discipline across the full site
- Monospace uppercase labels as structural markers, not decorative elements
- Typography hierarchy through weight and tight letter-spacing; no display typefaces
- Motion is minimal: fade-up entrances with staggered delays, no choreography
- Lists and ruled lines as layout primitives; cards only when containment is the affordance

## 2. Colors: The Forest-Lavender System

The palette is a single-accent Restrained system: tinted near-blacks and grays with one muted lavender that serves as the only chromatic statement. The six decorative swatches are dot identifiers for tags only, never used as surface colors.

### Primary

- **Chalk Lavender** (`#9488c2`): The site's sole accent. Active navigation states, interactive link text, bullet markers, section label text, focus rings, and the vertical stripe on the profile card. Appears at roughly 8% surface coverage.
- **Chalk Lavender (hover)** (`#a39ad0`): Hover and active-press shift. Same hue, 10% lighter. Used exclusively as the hover state for Chalk Lavender elements.
- **Chalk Lavender Soft** (`#16143a`): Tinted background for primary-context fills (the "open to work" badge, selected states). Near-invisible; only readable at close range.

### Neutral

- **Forest Black** (`#161918`): The page ground. Near-black with a subtle green undertone (approximately oklch 12% L, 0.007 chroma). Applied to `<body>` background and the deepest surface layer.
- **Forest Black Deep** (`#101210`): Below-ground: scrollbar track, sidebar background in shell layouts. Slightly darker than Forest Black.
- **Surface** (`#1d201e`): Cards, panels, the profile block. The primary container background, one tonal step above the ground.
- **Surface Raised** (`#252924`): Hover backgrounds, secondary surfaces, the mobile nav sheet. Second tonal step above the ground.
- **Border Subtle** (`#2c312d`): Default divider and card border. Low contrast, structural only.
- **Border Input** (`#383d39`): Form input strokes. Slightly stronger than Border Subtle to signal interactivity.
- **Border Strong** (`#d8ddd6`): High-contrast divider used for the hard-offset shadow and emphasis borders. Used sparingly.
- **Text Primary** (`#ffffff`): Headings and primary body text. Pure white but softened by the dark surface behind it; no perceptible harshness.
- **Text Muted** (`#f5f7f5`): Secondary body text, captions, muted-foreground labels. Near-white, visually distinct from Text Primary only when adjacent.
- **Text Faint** (`#8c9690`): Tertiary text, timestamps, decorative punctuation. The lowest legible text tier.

### Semantic

- **Success** (`#69b598`) / **Success Soft** (`#0d2419`): Status chips and "open to work" indicators. Warm teal-green.
- **Warning** (`#c4a05e`) / **Warning Soft** (`#231a07`): WIP and pending state chips. Muted amber.
- **Danger** (`#b87060`) / **Danger Soft** (`#261009`): Destructive states. Muted terracotta.

### Decorative Swatches (tag identifiers only)

`#8eceb4` (sage), `#a8abd8` (lavender), `#ccaabc` (rose), `#d4b878` (amber), `#cc9888` (salmon), `#80c8d8` (sky). These are assigned deterministically by tag name hash. They appear only as 7px dots inside tag chips. Never use them as surface colors, backgrounds, or typographic accents.

### Named Rules

**The One Voice Rule.** Chalk Lavender is the system's only chromatic statement. It appears on at most 10% of any given screen. Its rarity is the signal; every new lavender element is a question about whether that use is load-bearing.

**The Swatch Quarantine Rule.** The six decorative swatches exist solely as tag-dot identifiers. Prohibited on any other surface: backgrounds, text, borders, hover states, icons.

## 3. Typography: The Technical Stack

**UI/Body Font:** Inter (ui-sans-serif, system-ui fallback)
**Label/Code Font:** JetBrains Mono (ui-monospace fallback)

**Character:** A working pairing, not an expressive one. Inter at tight tracking handles hierarchy through weight and size alone. JetBrains Mono at uppercase with wide tracking creates the system's one distinctive visual voice: section labels and eyebrow text that read like file headers. The combination signals technical credibility without aesthetic performance.

### Hierarchy

- **Display** (700 weight, 30–36px responsive, -0.024em tracking, line-height 1.2): Page titles only. One per page. Tight tracking converts size into authority.
- **Headline** (700 weight, 22px, -0.02em tracking, line-height 1.3): Article and project titles in list views. Card-level emphasis.
- **Body** (400 weight, 15px, normal tracking, line-height 1.65): Primary reading text, summaries, prose content. Maximum line length 72ch. Line height is generous because content is dense.
- **Body Large** (400 weight, 16–17px, line-height 1.7): Hero summaries, intro text, profile headlines. Italic weight for the profile headline specifically.
- **Label** (JetBrains Mono, 700, uppercase, 0.2em tracking): Section titles, eyebrow markers. This is the system's signature; it signals structure, not decoration. Do not apply to interactive elements.
- **Caption** (Inter, 500 or medium, 12–13px): Tag text, timestamps, metadata. Tight and functional.

### Named Rules

**The Mono-Label Rule.** Section labels and eyebrow markers always use JetBrains Mono in uppercase with 0.2em letter-spacing, rendered in Chalk Lavender, followed by a full-width ruled line. This is the system's one visual signature; it creates hierarchy across sections without adding mass.

**The Tight-Header Rule.** Headings carry negative letter-spacing (-0.018em to -0.024em by size). At Display size this is mandatory; at Headline size it is expected. Never zero-track a heading; optical weight is the point.

## 4. Elevation

The system uses a hybrid strategy: tonal layering establishes the primary depth hierarchy, and shadows add structural emphasis on cards and panels. Flat surfaces are the default; shadows are reserved for contained blocks that need to read as lifted from the ground.

Three tonal levels create the base hierarchy without a single shadow: Forest Black (ground), Surface (one step up), Surface Raised (two steps up). Most layout elements live at one of these three levels; only interactive cards and panels use shadows.

### Shadow Vocabulary

- **Ambient** (`0 1px 3px rgba(0,0,0,0.45), 0 6px 20px -8px rgba(0,0,0,0.5)`): Default card shadow. Applied to profile blocks, about CTAs, and primary content panels. Creates lift without drama.
- **Ambient Large** (`0 2px 6px rgba(0,0,0,0.5), 0 16px 40px -12px rgba(0,0,0,0.6)`): Elevated panels at scroll or on high-emphasis surfaces. Stronger falloff at larger radius.
- **Hard Offset** (`4px 4px 0 #d8ddd6`): Structural emphasis; signals a "pinned" or high-priority surface. Used rarely; its geometric hardness contrasts with the ambient softness everywhere else.

### Named Rules

**The Tonal-First Rule.** Depth is established by surface color before shadows are added. If you can distinguish a container from its ground without a shadow, the tonal layering is working. Shadows amplify, they do not substitute.

**The Flat-By-Default Rule.** Interactive list items, navigation links, section labels, and tag chips are flat at rest. Elevation (shadow or surface shift) is a state response: hover, focus, active, or containment. A shadow on a resting list item is always wrong.

## 5. Components

### Buttons

Structural and restrained. Shape does the work; no decoration.

- **Shape:** Gently curved (14px radius). Not pill-shaped; not sharp.
- **Primary:** Solid Chalk Lavender fill (`#9488c2`), white text, 11px vertical / 20px horizontal padding. Minimum tap target 44px. Transitions on background and border-color at 120ms.
- **Hover / Focus:** Background shifts to Chalk Lavender hover (`#a39ad0`). Focus ring: 2px solid Chalk Lavender, 2px offset.
- **Active:** Scale down to 0.97 on press. Instant; no easing.
- **Secondary:** Transparent background, `rgba(255,255,255,0.15)` border. Hover fills Surface Raised. Same radius and padding as Primary.

### Tags / Chips

Color-dotted, rounded-full chips used for technology labels and topic tags across blog, project, and list views.

- **Style:** `#2f3530` background (forest-tinted dark, between Surface and Surface Raised), white text at 12–13px, 500 weight.
- **Shape:** Full pill radius (9999px). 6px vertical / 10–12px horizontal padding.
- **Dot identifier:** 7px circle with a deterministic swatch color (hash of tag name). Appears before the text, vertically centered. The dot is the only color on the chip; the chip body is always neutral.

### Cards / Surfaces

Used when content needs containment: the profile block, the about CTA, and similar structural anchors. Not the default for list items.

- **Corner Style:** Large radius (18px). Signals a "block" rather than a row.
- **Background:** Surface (`#1d201e`), one tonal step above the ground.
- **Shadow Strategy:** Ambient shadow as default. Large ambient for high-emphasis cards.
- **Border:** Border Subtle (`#2c312d`), 1px solid.
- **Internal Padding:** 20px (1.25rem) default; 24px (1.5rem) on larger viewports.

### Inputs / Fields

- **Style:** 1px Border Input stroke (`#383d39`), Surface background, 10px radius.
- **Focus:** 2px Chalk Lavender outline, 2px offset. No fill change on focus.
- **Disabled:** Text Faint color, no border change.

### Navigation

Flat, low-chrome navigation. The active state is a 1px Chalk Lavender underline below the link, not a background fill or bold weight change.

- **Desktop:** Horizontal link row, 14px Inter medium. Inactive: Text Muted; active: Text Primary with 1px lavender underline at -0.5px offset. Hover transitions color only at 150ms.
- **Mobile:** Right-side sheet drawer (82vw, max 320px). Backdrop blur on the sheet background. Active link gets Surface Raised background fill instead of underline. Links at 15px with 12px / 16px padding.
- **Logo area:** `Thirana Embuldeniya` in bold Inter + hard offset shadow class. The name is the logo; no icon.

### Section Header (Signature Component)

The system's primary layout primitive for named content groups. Used across every page to separate sections.

- **Pattern:** JetBrains Mono label in Chalk Lavender (uppercase, 0.2em tracking, 14px, 700 weight) followed by a 1px horizontal rule in Border Subtle that fills remaining width.
- **Spacing:** 24px (space-y-6) below the header before content.
- **Rule:** Never use a plain heading for a section that could use this pattern. The mono-label + rule is the system's answer to H2s outside of MDX prose.

### Content Hero (Signature Component)

The page header for blog posts and project detail pages.

- **Eyebrow:** Section Header pattern (mono label + rule) at the top. Optional badge (StatusBadge) aligned to the right end of the rule.
- **Title:** Display level (700, 30–36px, -0.024em tracking).
- **Summary:** Body Large (16px, 1.7 line-height).
- **Chips:** Tag components, full-width flex-wrap row.
- **Meta:** Flex-wrap row for date, read time, and external links.

### Status Badges

Semantic rounded-full chips for project lifecycle states.

- **Live:** `#1a3a28` background, `#a0dcb8` text.
- **WIP / Ongoing:** `#362a08` background, `#dfc070` text.
- **Paused:** `#28213a` background, `#c0b4e0` text.
- **Completed:** `#102840` background, `#88d0e8` text.
- **Typography:** 11px Inter, 700 weight, uppercase, 0.06em tracking. Never sentence case.

## 6. Do's and Don'ts

### Do:

- **Do** use Chalk Lavender exclusively for interactive affordances, active states, and Section Header labels. Every new lavender element must be functionally significant.
- **Do** establish depth through tonal surface layering first (Forest Black → Surface → Surface Raised), then add Ambient shadow only if containment requires it.
- **Do** use Section Header (mono label + ruled line) for all named content groups outside of MDX prose. This is the system's answer to H2-level structure.
- **Do** use negative letter-spacing on headings: -0.018em at 22px, -0.024em at 30px and above.
- **Do** cap body text line length at 72ch. The `.page` container (max-width 48rem) does this automatically; do not override it with unconstrained prose widths.
- **Do** use Tag chips with deterministic swatch dots for technology and topic labels. The dot is the only color on the chip.
- **Do** animate with opacity and transform only. Ease-out curves (cubic-bezier(0.22, 1, 0.36, 1) or equivalent). No layout property animation.
- **Do** respect `prefers-reduced-motion`: all FadeIn animations should be skipped or instant when the user has requested reduced motion.

### Don't:

- **Don't** add a second accent color. Chalk Lavender is the system's only chromatic statement. A second accent color destroys the rarity that makes the first one useful.
- **Don't** use the six decorative swatches (`#8eceb4`, `#a8abd8`, `#ccaabc`, `#d4b878`, `#cc9888`, `#80c8d8`) on any surface other than 7px tag dots. They are not a color palette.
- **Don't** use side-stripe borders (border-left or border-right > 1px in a colored accent) on cards, list items, or callout blocks. Use full borders, background tints, or leading dot/number markers instead.
- **Don't** use gradient text (`background-clip: text` with a gradient). Use solid Chalk Lavender or Text Primary. Weight and size carry emphasis; color does not.
- **Don't** build identical card grids: same-size cards with icon + heading + body text repeated in rows. Project lists use an indexed vertical layout with leading monospace numbers, not card grids.
- **Don't** use rainbow skill bars, animated percentage counters, typewriter "I am a [role]" effects, or any pattern from generic developer portfolio templates.
- **Don't** add startup landing-page elements: hero metric blocks (big number, small label, gradient accent), social proof banners, or gradient CTA sections.
- **Don't** use blur-and-glass as decoration. The mobile nav sheet uses backdrop-blur purposefully because it overlays page content; this is the one intentional use. Elsewhere: prohibited.
- **Don't** add shadows to flat list items or navigation links at rest. Shadows are state responses (hover, elevation), not default styling.
- **Don't** use a modal as a first solution. The system uses sheets (right-side drawer) for navigation and inline disclosure for progressive content. Exhaust these before reaching for a modal.
