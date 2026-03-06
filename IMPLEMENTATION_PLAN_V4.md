# Implementation Plan V4 – Particle Background & Contact Page Redesign

Checklist for implementation progress. Mark each item as `[ ]` (todo), `[~]` (in progress), or `[x]` (done).

---

## 1. Global Animated Background — Pulsing Orange Particles

- [x] Create reusable `<ParticleBackground />` canvas component
- [x] Small glowing orange dots (#FF6B35 palette) that softly pulse, appear, and fade
- [x] Smooth slow motion with low visual noise — 30–50 particles max
- [x] Semi-transparent, layered behind all content
- [x] Works on dark/neutral backgrounds across all pages
- [x] Performance-optimized with requestAnimationFrame
- [x] Add ParticleBackground to Contact page
- [x] Add ParticleBackground to AI Landing page (optional / as needed)

---

## 2. Contact Page — Redesigned Layout (Premium Top-to-Bottom)

### Top Half — Contact Form (hero prominence)

- [x] Full-width section with "Pojďme spolu tvořit" heading
- [x] "Odpovídáme do 24h" badge visible in hero
- [x] Large, elegant contact form centered as main focus
- [x] Form fields: Name, Email, Phone, Project Type (select), Budget (select), How did you hear about us (select), Project Description (textarea)
- [x] Premium submit button with subtle hover glow
- [x] Privacy note below the button

### Bottom Half — Contact Details Section

- [x] Clean card-based layout: email, phone, address cards with icons
- [x] Social media icons row (LinkedIn, Instagram, GitHub)
- [x] Client trust strip: avatar bubbles + "117+ spokojených klientů"
- [x] Embedded Google Maps iframe (business location)
- [x] Mini FAQ accordion (3 questions specific to contact/collaboration)

---

## 3. Mobile View — Contact Cards Carousel

- [x] Contact details (email, phone, address) in horizontal scroll on mobile
- [x] Scroll-snap so when user scrolls, the next card slides into view (not just replace)
- [x] User sees the next card “moving” into current view (smooth scroll/snap behavior)

---

## 4. Integration & Polish

- [x] Ensure ParticleBackground does not block pointer events (layered behind content)
- [ ] Test on mobile: form usable, cards scroll correctly
- [x] Lint and type-check
