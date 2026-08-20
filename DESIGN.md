---
name: ArtGate
description: Kompleksowe systemy bezpieczeństwa, bramy, ogrodzenia i automatyka
colors:
  primary: "#2563eb"
  primary-hover: "#1d4ed8"
  primary-glow: "#3b82f6"
  accent-cyan: "#06b6d4"
  accent-glow: "#67e8f9"
  success: "#10b981"
  rating-amber: "#fbbf24"
  neutral-dark-bg: "#020617"
  neutral-dark-surface: "#0f172a"
  neutral-dark-card: "#1e293b"
  neutral-dark-border: "#334155"
  neutral-light-bg: "#f8fafc"
  neutral-light-surface: "#ffffff"
  neutral-light-card: "#f1f5f9"
  neutral-light-border: "#e2e8f0"
  neutral-text-primary: "#0f172a"
  neutral-text-secondary: "#475569"
  neutral-text-muted: "#94a3b8"
  neutral-text-inverted: "#ffffff"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.875rem, 3.5vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-text-inverted}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-card:
    backgroundColor: "{colors.neutral-light-surface}"
    textColor: "{colors.neutral-text-primary}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-card-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-text-inverted}"
  badge-pill:
    backgroundColor: "{colors.neutral-light-card}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Design System: ArtGate

## Overview

**Creative North Star: "The Precision Sentinel"**

The ArtGate design system embodies the dual identity of modern security engineering: heavy structural craftsmanship (hot-dip galvanized steel gates and architectural fencing) fused with digital precision (4K AI optical surveillance, smart automation drives, and micro-calibrated intrusion detection).

The visual language is structured around a **Dual-Chamber Rhythm**. Editorial light chambers (`#f8fafc` / `#ffffff`) communicate commercial transparency, verified Google social proof, clear service breakdowns, and accessible contact points. Deep obsidian night chambers (`#020617` / `#0f172a`) evoke vigilance, high-tech security operations centers, and computational confidence for the Estimator and Portfolio showcases.

**Key Characteristics:**
- **Dual-Chamber Contrast:** Deliberate alternation between airy white daylight zones and radiant obsidian security zones.
- **Electric Precision Accents:** Controlled laser-like Electric Blue (`#2563eb`) paired with Cyan (`#06b6d4`) highlights.
- **Tactile & Confident Geometry:** Generous 24px container corners, pill-shaped action controls, and clear interactive feedback.
- **Instant Proof & Clarity:** Integrated live Google feedback badges, interactive real-time cost calculator, and transparent spec lists.

## Colors

The ArtGate palette pairs high-contrast structural slates with vibrant electric signals that communicate modern technological security.

### Primary
- **Electric Blue** (`#2563eb`): The core operational color. Used for primary CTAs, active status rings, brand marks, and interactive focus states.
- **Deep Cobalt Hover** (`#1d4ed8`): Darkened state for primary interactive elements on pointer hover.
- **Electric Blue Glow** (`#3b82f6`): Ambient illumination and badge text color inside dark containers.

### Secondary
- **Vigilance Cyan** (`#06b6d4`): High-tech optical signal used in hero gradient typography, calculator accent glows, and smart automation highlights.
- **Cyan Glow** (`#67e8f9`): Micro-detail accent for gradient text termination and illuminated status indicators.

### Tertiary
- **Certified Emerald** (`#10b981`): Trust, warranty verification badges, operating hours status, and success submission modals.
- **Google Amber** (`#fbbf24`): Verified 5.0 customer review star rating and high-trust social proof elements.

### Neutral
- **Obsidian Void** (`#020617`): Deepest background for dark sections, modal backdrops, and footer surfaces.
- **Night Slate** (`#0f172a`): Secondary dark container background and primary light-mode typography.
- **Midnight Card** (`#1e293b`): Elevated card surface in dark mode sections.
- **Slate Border** (`#334155`): Subtle architectural border in dark containers.
- **Pure White** (`#ffffff`): Light mode card background, modal bodies, and inverted typography.
- **Porcelain Light** (`#f8fafc`): Main light page background and input default surface.
- **Subtle Light Gray** (`#e2e8f0`): Structural dividing lines and input resting borders.
- **Muted Steel** (`#64748b`): Secondary descriptive text and body copy in light mode.

### Named Rules
**The Dual-Chamber Rhythm Rule.** Interleaving light editorial zones (About, Offer, Contact) with dark high-tech chambers (Hero, Estimator, Projects) is mandatory; it prevents fatigue and creates deliberate narrative pacing between craft and technology.

**The Electric Focus Rule.** Electric Blue (`#2563eb`) is strictly reserved for high-intent actions, selected options, and security status marks; never use it as a generic full-bleed section background.

## Typography

**Display Font:** System Sans (`ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`)
**Body Font:** System Sans (`ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`)
**Label / Monospace Font:** Font Mono (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`)

**Character:** Technical, crisp, and uncompromisingly legible. High-contrast headlines with tight negative letter spacing communicate solid engineering, while relaxed body text ensures effortless scanning of technical parameters.

### Hierarchy
- **Display** (800 Extrabold, `clamp(2.25rem, 5vw, 4.5rem)`, line-height 1.1, tracking `-0.025em`): Hero impact headline with gradient text spans.
- **Headline** (800 Extrabold, `clamp(1.875rem, 3.5vw, 3rem)`, line-height 1.2, tracking `-0.02em`): Section headings (`O firmie`, `Oferta`, `Kalkulator`, `Realizacje`).
- **Title** (700 Bold, `1.25rem` / `20px` to `1.5rem` / `24px`, line-height 1.4, tracking `-0.01em`): Card titles, modal headers, service names.
- **Body** (400 Regular / 500 Medium, `1rem` / `16px` to `1.125rem` / `18px`, line-height 1.625): Core descriptive copy and feature explanations. Max line length: 65–75ch.
- **Label / Eyebrow** (600 Semibold, `0.75rem` / `12px` to `0.875rem` / `14px`, tracking `0.05em`, uppercase): Section badges, category pills, meta captions.

### Named Rules
**The Tight Headline Rule.** All display and section headlines at or above 24px must apply negative tracking (`tracking-tight` or `-0.02em`) to maintain architectural density.

## Layout

The spatial model is built around a standard 12-column grid inside a maximum container width of `1280px` (`max-w-7xl`).

- **Outer Margins & Padding:** Responsive container gutters: `16px` (`px-4`) on mobile, `24px` (`px-6`) on tablet, `32px` (`px-8`) on desktop.
- **Vertical Rhythm:** Major sections use generous vertical spacing: `64px` (`py-16`) on mobile, scaling to `96px` (`py-24`) on desktop.
- **Section Overlaps:** The transition from Hero to About employs an overlapping negative margin (`-mt-10`) with top corner radius (`rounded-t-[3rem]`) to break the rigid block grid.
- **Grid Patterns:**
  - Services / Projects: 3 columns on desktop (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), 32px gap (`gap-8`).
  - Estimator: 12-column split (7 columns controls, 5 columns live summary).
  - Contact: 2-column split (`grid-cols-1 lg:grid-cols-2`, `gap-16`).

## Elevation & Depth

ArtGate uses a **Hybrid Luminous Layering** strategy:

1. **Light Surfaces (Ambient Soft Depth):**
   - High-trust cards use large diffuse drop shadows (`shadow-xl` / `shadow-2xl`: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)`) paired with hairline borders (`border border-slate-100`).
   - Sticky navigation applies dynamic frosted glass (`bg-white/90 backdrop-blur-md shadow-sm`).

2. **Dark Surfaces (Volumetric Glow):**
   - Deep obsidian cards (`bg-slate-950/80 backdrop-blur-xl`) float on top of large ambient radial blurs (`w-96 h-96 bg-blue-600/10 rounded-full blur-3xl`).
   - Interactive hover states trigger electric border illumination (`hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10`).

### Shadow Vocabulary
- **Subtle Surface** (`box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)`): Sticky nav bar, small action chips.
- **Card Float** (`box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`): Main service cards and contact box in light mode.
- **Electric Accent Glow** (`box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3)`): Primary hero and submit buttons.
- **Backdrop Blur** (`backdrop-filter: blur(12px)`): Navigation bar, modal sheets, and floating badge overlays.

### Named Rules
**The Glass & Glow Rule.** Dark surfaces must never rely solely on gray borders; they must integrate subtle radial gradients or backlight glows to convey energized digital security.

## Shapes

- **Form Language:** Architectural, confident, and tactile. High-radii geometry balances the rigid physical steel nature of fences and gates with friendly, modern consumer software aesthetics.
- **Corner Radii Hierarchy:**
  - **Pill (`9999px` / `rounded-full`):** Buttons (Hero CTA, phone pill), category filter tabs, status badges.
  - **Super-curve (`24px` / `rounded-3xl`):** Feature cards, estimator container, contact box, project cards, modals.
  - **Structural (`12px` / `rounded-xl` to `16px` / `rounded-2xl`):** Form inputs, internal feature checkmark pills, modal action buttons.
  - **Section Curvature (`48px` / `rounded-t-[3rem]`):** Overlapping boundary between Hero and About section.
- **Borders:** Consistent `1px` structural stroke (`border-slate-100` / `border-slate-200` in light, `border-slate-800` in dark).

## Components

### Buttons
- **Primary Hero / Action:** Pill shaped (`rounded-full`), Electric Blue (`#2563eb`), white text, bold font (`font-semibold`), padding `16px 32px`, intense shadow (`shadow-blue-600/30`). Hover shifts to `#1d4ed8`.
- **Secondary Ghost / Glass:** Pill shaped, transparent white with backdrop blur (`bg-white/10 backdrop-blur-md border border-white/20`), white text, hover `bg-white/20`.
- **Card Detail Action:** Rounded-xl (`12px`), white background with subtle border, text `#0f172a`. Hover transitions smoothly to Electric Blue background with white text (`transition-all duration-300`).

### Category Filter Tabs (Pills)
- **Active State:** Solid Night Slate (`#0f172a`) in light sections or Electric Blue (`#2563eb`) in dark sections with drop shadow.
- **Inactive State:** Light slate (`#f1f5f9`) or dark slate (`#1e293b`), smooth text transition on hover.

### Cards / Containers
- **Light Feature Card:** `#ffffff` surface, `24px` radius (`rounded-3xl`), overflow hidden, `h-52` zoom-enabled image header, `24px` to `32px` internal padding, hover lift and shadow deepening.
- **Dark Metric / Estimator Container:** `#020617` with `80%` opacity and `16px` backdrop blur, subtle `border-slate-800`, inner glowing widgets with blue tint.

### Inputs / Form Fields
- **Resting:** `#f8fafc` background, `#e2e8f0` border, `12px` radius (`rounded-xl`), `12px 16px` padding, dark slate text.
- **Focus:** `#ffffff` background, `2px` Electric Blue ring (`focus:ring-2 focus:ring-blue-600`), transparent border.

### Status Eyebrows & Badges
- **Style:** Compact pill (`rounded-full`), `#eff6ff` background, `#2563eb` text, `1px` border `#dbeafe`, uppercase tracking. In dark mode: `bg-blue-500/10 text-blue-400 border-blue-500/20`.

### Navigation
- **Top Sticky Bar:** Transparent at rest over hero; frosted white (`bg-white/90 backdrop-blur-md shadow-sm`) when scrolled. Phone quick-dial pill anchored at top right.

## Do's and Don'ts

### Do:
- **Do** maintain the alternating Dual-Chamber Rhythm between light and dark sections across pages.
- **Do** use exact real phone numbers (`+48 532 420 269`), office address, and verified 5.0 Google rating.
- **Do** wrap primary interactive CTAs in full pill geometry (`rounded-full`) with active hover states.
- **Do** ensure all form inputs transition into pure white with a 2px blue ring on focus.
- **Do** incorporate subtle icons (Lucide React) with matching semantic colors (e.g. Emerald for guarantees, Blue for security features).

### Don't:
- **Don't** make all sections dark or all sections light; the contrast is foundational to the identity.
- **Don't** use generic placeholder testimonials when real verified Google reviews are available.
- **Don't** use sharp 0px or small 4px corners on main content cards; preserve the tactile 24px radius (`rounded-3xl`).
- **Don't** use plain saturated primary blue as full-screen flat background; use gradients or dark obsidian with glow.
- **Don't** hide or obscure pricing transparency; keep estimator outputs and free consultation promises prominent.
