# Contact Page Redesign — Implementation Plan V5

## Checklist

- [x] **1. Header** — Keep existing design: PK Digital logo, nav (Domů, Služby, O nás, FAQ, Kontakt), "Napište nám" CTA, dark styling
- [x] **2. Hero section** — Remove subheading; keep only "Odpovídáme do 24h" badge + main title; solid black background (no gradient/orbs)
- [x] **3. Contact form (top half)** — Full-width (logo-to-CTA span); remove left "Kontaktní údaje" column; 2-col grid: Jméno|Firma, E-mail|Telefon, Typ projektu|Rozpočet (10 000 Kč format); full-width textarea "Napište nám, co poptáváte"; submit; dark inputs; visual only
- [x] **4. Company information section** — 2×2 grid: Address, Phone+Email, Čú+IBAN, IČO+Datová schránka; Lucide icons; white text on black
- [x] **5. Removed** — "Zarezervujte si 15min call", testimonials/avatars/"117+ spokojených klientů", "Jak jste se o nás dozvěděli?" field
- [x] **6. Kept** — Google Maps embed, FAQ accordion
- [x] **7. Footer** — Keep existing design
- [x] **8. Styling** — Solid black (#000), clean typography, responsive (form columns and info grid stack on mobile)

---

## 1. Header
- Replicate current pk-digital.cz header: **PK Digital logo** (left), **nav links** (Domů, Služby, O nás, FAQ, Kontakt), **"Napište nám"** CTA (right).
- Same dark/black styling as current site.
- *Implementation: Use existing `Header` component; ensure CTA label is "Napište nám" (already present).*

## 2. Hero Section
- **Remove** the subheading text ("Máte vizi? My máme technologie...").
- **Keep** only:
  - "Odpovídáme do 24h" badge
  - Main title ("Pojďme spolu tvořit").
- **Solid black background** — no gradient, no background image, no floating orbs. Consistent with rest of page.

## 3. Contact Form (full-width, top half)
- **Width:** Expand form to match header content width (logo-to-CTA span), e.g. same `max-width` as header (1280px) with same horizontal padding.
- **Remove** the left-side column (Kontaktní údaje, email/phone/address cards, social icons, client avatars). This info moves to the new Company Information section below.
- **Form layout** (2-column grid):
  - **Row 1:** Jméno (required) | Firma
  - **Row 2:** E-mail (required) | Telefon (required)
  - **Row 3:** Typ projektu (dropdown) | Rozpočet (dropdown, format e.g. "10 000 Kč", "25 000 Kč", "50 000 Kč", "100 000 Kč")
  - **Full-width:** "Napište nám, co poptáváte" (textarea, required)
  - Submit button
- **Inputs:** Dark fields with subtle borders, matching reference. Visual only — no backend submission.

## 4. Company Information Section (below form)
- Styled as a clean **2×2 grid** with icon + text pairs (Lucide icons).
- **4 items:**
  1. **Address:** PK-Digital — Němčice 329, Ivančice 664 91 (e.g. Home icon)
  2. **Contact:** +420 725 703 868 · info@pk-digital.cz (Phone + Mail icons)
  3. **Bank:** Čú: 1025290491/5500 — IBAN: CZ60 5500 0000 0010 2529 0491 (e.g. Building2/Landmark)
  4. **Company ID:** IČO: 21185301 — Datová schránka: f4i6cbb (e.g. User/FileText icon)
- White/light text on black background.

## 5. Removed Sections
- "Zarezervujte si 15min call" button/section
- Testimonials / client avatars / "117+ spokojených klientů"
- Form field: "Jak jste se o nás dozvěděli?"

## 6. Kept Sections
- **Google Maps** embed (same location)
- **FAQ** accordion ("Často kladené dotazy")

## 7. Footer
- Keep existing footer design (replicate current site footer).

## 8. Overall Styling
- **Background:** Solid black (#000 or near-black) for entire page.
- **Typography:** Professional, clean; consistent with current site.
- **Responsive:** Form columns stack on mobile; company info grid stacks (e.g. 2×2 → 1 col on small screens).
