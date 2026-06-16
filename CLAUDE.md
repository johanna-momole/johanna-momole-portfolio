# CLAUDE.md

## Project Purpose

Personal portfolio website for Johanna Momole, a biomedical informatics and healthcare analytics professional. The site communicates her work across pharmacovigilance, real-world evidence, healthcare operations, and analytical product development.

Core positioning statement: "I turn healthcare data into evidence people can act on."

---

## Technology Stack

- **Next.js 16** App Router (Server Components by default)
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS v4** (CSS-first configuration in globals.css, no tailwind.config.js)
- **shadcn** with `radix-luma` preset
- **Radix UI** via the unified `radix-ui` package
- **Motion for React** (`motion/react`) v12+
- **Lucide React** for icons
- **next-themes** for light/dark theme switching
- Fonts: Geist (interface), Playfair Display (editorial serif, used selectively)

---

## Design Direction

Working concept: **Living Evidence**

The site combines editorial biomedical research aesthetics with futuristic healthcare analytics.

### Color Palette

Defined as Tailwind v4 tokens in `app/globals.css`:

| Token | Hex | Use |
|---|---|---|
| `ivory` | `#F3F1EC` | Light background |
| `soft-white` | `#FAF9F6` | Elevated light surface |
| `near-black` | `#090B0C` | Dark background, text |
| `deep-blue` | `#102027` | Dark elevated surface |
| `aqua` | `#C9F2EE` | Primary accent |
| `lilac` | `#D9D1FF` | Secondary accent |
| `blush` | `#F1D7E4` | Tertiary accent |
| `organic-green` | `#87A878` | Warm natural accent |
| `chartreuse` | `#C7FF35` | Sparingly: active states, data points, metrics |

### Typography

- Geist: interface text, body, navigation
- Playfair Display (`font-serif`): one or two editorial phrases only, not all headings
- Clear responsive type scale using Tailwind defaults

### Layout

- Max content width: 1440px
- 12-column desktop grid where useful
- Container rounding: 28px to 36px (`rounded-[28px]` to `rounded-[36px]`)
- Card rounding: 20px to 28px (`rounded-[20px]` to `rounded-[28px]`)
- Thin translucent borders, soft shadows, layered panels
- No horizontal overflow

### Avoid

- Generic neon AI styling
- Excessive gradients
- Glassmorphism on every element
- Animated DNA backgrounds or spinning globes
- Three.js, Spline, heavy charting libraries
- Background videos, cursor trails, long loading screens
- Em dash characters in published website copy

---

## Content Architecture

Centralized in `content/`:
- `content/site.ts` - name, headline, nav, social links, metrics, contact
- `content/projects.ts` - typed project objects with all fields

Never hard-code repeated site content across multiple components. Always import from `content/`.

---

## Component Organization

```
components/
  layout/    Navigation components (SiteHeader)
  sections/  Page sections (Hero, Metrics, etc.)
  motion/    Animation wrappers (Reveal)
  shared/    Reusable presentational components (GlassPanel, SectionHeading, ThemeProvider, ThemeToggle)
  ui/        shadcn components - do not modify
```

---

## Accessibility Requirements

- Semantic HTML with correct heading hierarchy
- All interactive elements keyboard-accessible with visible focus states
- Sufficient color contrast (do not use tiny gray text)
- Descriptive `aria-label` where button text is not self-explanatory
- Decorative SVGs marked `aria-hidden="true"`
- No information available only through hover
- Comfortable mobile touch targets (min 44x44px)
- `role` and `aria-expanded` on mobile menu trigger

---

## Motion Requirements

Import from `motion/react`. Use animation only for:
- Soft hero entrance (fade + translate)
- Gentle floating evidence cards
- Subtle visual layer movement
- Navigation transitions
- Metric reveal on scroll
- Button and card hover feedback

Rules:
- Always check `useReducedMotion()` and skip or simplify animations when true
- Prefer `transform` and `opacity` only (avoid layout-triggering properties)
- Never hide critical content until an animation finishes
- Never delay navigation
- Do not animate every element

---

## Development Rules

- Server Components by default; add `"use client"` only for motion, state, theme, or browser APIs
- Use `next/link` for internal links
- Use `next/image` only when there is a real image (not SVGs or decorative elements)
- Do not suppress TypeScript or ESLint errors
- Do not use `any` type
- Do not use em dashes (`--` or `—`) in published website copy
- Do not add placeholder links pointing to invalid external URLs
- Do not replace or modify the existing shadcn UI component files in `components/ui/`
- Do not create a database, API routes, CMS, or authentication system

---

## Git Rules

- Do not run destructive Git commands (`reset --hard`, `push --force`, `clean -f`, `checkout -- .`)
- Do not commit or push automatically
- Do not modify files outside this repository
- After major implementation phases: run `npm run lint` and `npm run build` and fix all errors before stopping
- Preserve responsive and reduced-motion behavior after any changes
- Do not amend commits unless explicitly asked

---

## Phase Notes

**Phase 1 (current):** Homepage foundation only.
- Global design tokens
- Font and typography system
- Root layout and metadata
- Navigation
- Hero section with biological visual and evidence cards
- Impact metrics strip
- Reusable components (GlassPanel, SectionHeading, Reveal)
- Light/dark theme
- Mobile and reduced-motion behavior

Do not build project pages, About, Notes, or deploy to Vercel until Phase 1 is visually reviewed.
