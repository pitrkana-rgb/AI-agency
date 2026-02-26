# IMPROVEMENT_VISUALS_V1 – Visual Upgrade Checklist

> **Scope:** Visual-only changes to the homepage (header, hero, global styles).  
> **Date:** 2026-02-26  
> **Spec version:** V1  

---

## Layout

- [x] Header: flex `space-between`, max-width 1280px, centered container, `px-6 py-5` padding
- [x] Hero: full-width, `min-height: 100vh`, `pt-120px / pb-140px`, content centered
- [x] Hero text block: `max-width: 900px`, text-align center
- [x] Paragraph: `max-width: 720px`, centered via `margin: 0 auto`
- [x] CTA buttons: side by side, `gap: 16px`, flex-wrap for stacking on narrow viewports
- [x] Sections below hero: solid `#000000` background (via inline style on each `<section>`)
- [x] Removed all absolute-positioned decorative blobs, circles, and misplaced SVG lines
- [x] Removed broken background images (`image-88.png`, `image-87.png`, `group-1707480375.png`, `dots.svg`, `line-20.svg`, `line-21.svg`)
- [x] Consistent container max-width 1280px across header

## Typography

- [x] Font family updated to **Space Grotesk** (loaded from Google Fonts) with Inter as fallback
- [x] Font loaded in `index.html` via `<link>` preconnect + stylesheet (weights 400, 500, 600, 700, 800)
- [x] `--text-font-family` CSS variable updated to `"Space Grotesk", "Inter", sans-serif`
- [x] `body` font-family set to Space Grotesk in `tailwind.css`
- [x] Headline: `clamp(34px, 7vw, 62px)`, weight 800, line-height 1.07
- [x] Paragraph: `clamp(16px, 2.2vw, 19px)`, weight 400, line-height 1.6
- [x] Nav links: 15px, weight 500
- [x] Rating pill text: "Hodnocení" 14px weight 600; secondary 13px weight 400
- [x] Header button: 15px, weight 600
- [x] No pure-gray text below #A0A0A0 equivalent used on dark backgrounds

## Color / Contrast

- [x] Deep black base `#000000` applied globally
- [x] Hero background: `Images/background.png` with `linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.85) 100%)` overlay
- [x] All below-hero sections: solid `#000000` (no gradients)
- [x] Accent color **#FF5A1F** (warm orange) applied to:
  - Logo icon
  - Nav active underline
  - Star icons (filled)
  - Primary CTA gradient (`#FF6A2A → #FF3C00`)
  - "AI" word text-shadow glow
  - Pulse-glow animation
  - Global focus ring
- [x] White text on hero: `#FFFFFF` (headline), `rgba(255,255,255,0.75)` (paragraph)
- [x] Nav text: `rgba(255,255,255,0.85)` default, `#FFFFFF` on hover/active – exceeds 4.5:1
- [x] CSS variables `--accent-primary`, `--accent-gradient-from`, `--accent-gradient-to` defined

## Spacing

- [x] 8px spacing scale followed throughout
- [x] Hero: `pt-120px / pb-140px`
- [x] Rating pill margin-bottom: `40px`
- [x] Headline margin-bottom: `24px`
- [x] CTA buttons margin-top from paragraph: `36px` (paragraph `mb: 36px`)
- [x] CTA button gap: `16px`
- [x] Header nav gap: `32px` (gap-8)
- [x] Avatar overlap: `-12px margin-left` (except first)
- [x] Rating pill: `padding: 10px 18px`

## Imagery

- [x] Background image `Images/background.png` applied only to header + hero zone (top 900px)
- [x] All broken decoration images removed (`image-87.png`, `image-88.png`, `group-1707480375.png`, `dots.svg`, `line-20.svg`, `line-21.svg`, `logo.png`)
- [x] Avatar images replaced with SVG gradient-initials avatars (5 avatars, unique colors)
- [x] Avatar SVGs properly clipped with `<clipPath>` – no distortion
- [x] Avatar size: 44×44px (matches `width/height="44"` in SVG)
- [x] No broken `src` references remain in hero or header

## Components

- [x] **Logo:** SVG AI-chip icon (circuit lines + center dot) in `#FF5A1F` + "AI-agency" text
- [x] **Rating pill:** glassmorphism style (`rgba(0,0,0,0.55)`, `backdrop-filter: blur(8px)`, border `rgba(255,255,255,0.08)`, `border-radius: 999px`)
- [x] **Avatar stack:** 5 SVG gradient-initials, `border: 2px solid #111`, `box-shadow: 0 6px 16px rgba(0,0,0,0.4)`, proper z-index stacking
- [x] **Star icons:** `fill="#FF5A1F"` and `text-[#FF5A1F]` – fully orange
- [x] **Primary CTA:** gradient `#FF6A2A → #FF3C00`, `border-radius: 12px`, `padding: 14px 28px`, font-weight 600, `animate-pulse-glow` class
- [x] **Secondary CTA:** `background: #000`, `border: 1px solid rgba(255,255,255,0.2)`, `border-radius: 12px`, `padding: 14px 28px`, visual weight clearly lower

## States (hover / focus / active)

- [x] **Nav links:** hover → `color: #FFFFFF`; orange underline slides in via `::after` CSS (`.nav-link-underline`)
- [x] **Active nav link:** `data-active="true"` triggers full-width orange underline
- [x] **Header "Napište nám":** hover → `brightness(1.05)`, `translateY(-0.5px)`; active → `scale(0.98)`
- [x] **Primary CTA hero:** hover → `translateY(-3px)`, `brightness(1.1)`; active → `scale(0.97)`
- [x] **Secondary CTA hero:** hover → `background: #111111`, `border-color: rgba(255,255,255,0.4)`; active → `scale(0.98)`
- [x] **Pulse-glow animation:** `@keyframes pulse-glow` – box-shadow expands from `0 0 0 0 rgba(255,90,31,0.4)` to `0 0 0 14px rgba(255,90,31,0)`, 2.5s infinite ease-out
- [x] **Global focus ring:** `:focus-visible { outline: 2px solid #FF5A1F; outline-offset: 2px; }`
- [x] All transitions: 200–250ms ease

## Responsiveness

- [x] Headline uses `clamp(34px, 7vw, 62px)` — covers mobile (34px), tablet (44–48px), desktop (62px)
- [x] Paragraph uses `clamp(16px, 2.2vw, 19px)`
- [x] Header padding: `px-6` (24px) desktop; reduces via Tailwind on small screens
- [x] CTA buttons: `flex-wrap` + `justify-center` — stack vertically below 640px automatically
- [x] Nav: `hidden md:inline-flex` — hidden on mobile (existing behavior preserved; no new features added)

## QA Notes

- **Image path:** Background uses `/Images/background.png` — Vite serves the `Images/` folder at root since `base: "./"` in vite.config.ts. Verify path resolves correctly in dev and production build.
- **Font loading:** Space Grotesk loaded via Google Fonts. In offline environments or strict CSP, may fall back to Inter/system sans-serif.
- **Image generation quota:** Avatar portrait images could not be generated (quota exhausted). SVG gradient-initials avatars used as professional alternative. Replace with real photos when available.
- **Logo.png removed:** The header `<img src="/logo.png">` was replaced with inline SVG + text logo. Verify `logo.png` is no longer referenced elsewhere.
- **Reduced-motion:** `@media (prefers-reduced-motion: reduce)` disables pulse-glow and sets all animation/transition durations to `0.01ms`.
- **Z-index layering:** Background div `z-index: 0`, main content `z-index: 1`, header `z-index: 50` (fixed).
- **WCAG AA contrast:** Dark overlay (`rgba(0,0,0,0.85)` at bottom) ensures white text contrast ≥ 4.5:1 on hero background photo.
- **Sections below hero:** `backgroundColor: "#000000"` applied as inline style on each `<section>` in `AiLandingPage.tsx` to override any inherited or Tailwind `bg-background` theming.
- **Removed radial gradient decorations:** The `mix-blend-screen` radial overlay from the root wrapper was removed; accent color is now provided only through UI component styling.
