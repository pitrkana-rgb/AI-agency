## AI Landing Page – Czech Localization & Microinteractions

Checklist for implementation progress. Mark each item as `[ ]` (todo), `[~]` (in progress), or `[x]` (done).

1. **Header Navigation & Sticky Behavior**
   - [x] Localize navigation items to Czech (`Domů`, `Služby`, `Kontakt`, `O nás`)
   - [x] Replace `Login` button with `Napište nám` CTA (orange gradient + hover glow)
   - [x] Add smooth scroll to contact form on CTA click
   - [x] Implement sticky header with backdrop blur + scroll-based state

2. **Hero Section Enhancements**
   - [x] Replace rating badge structure with pill containing 5 circular headshot placeholders
   - [x] Add star rating: `Hodnocení 5.0 / 5` + `117+ spokojených klientů`
   - [x] Update hero title to `Využijte s námi sílu AI pro váš business` (with `AI` in orange)
   - [x] Update hero subheadline with Czech copy (webdesign, automatizace, AI agenti)
   - [x] Update buttons to `Kontaktujte nás` (primary, scroll to contact) and `Naše služby` (secondary)
   - [x] Add page-load fade‑in animation for hero content

3. **Trust Stats Section Redesign**
   - [x] Replace existing stats with Czech metrics (e.g. `120+ Realizovaných projektů`, `95% Klientů s námi pokračuje`, etc.)
   - [x] Add lucide-react line icons per stat
   - [x] Implement hover states (orange border glow + lift) and smooth transitions
   - [x] Ensure spacing/alignment across breakpoints

4. **Feature Section Content Update**
   - [x] Rename section heading to `Povyšte váš business díky` + `AI` in orange
   - [x] Add Czech subheadline about AI solutions
   - [x] Add minimal AI line icon next to heading
   - [x] Replace 4 feature cards with Czech content:
     - Nezávazná poptávka (chat/message icon)
     - Validace & úpravy (check/review icon)
     - Spolupráce & vývoj (code/build icon)
     - Škálování & automatizace (automation/gear/AI icon)
   - [x] Implement hover gradient shift, soft glow, `translateY(-6px)`, `scale(1.03)` with 0.3s ease

5. **Timeline / Company Milestones Layout**
   - [x] Fix spacing & alignment issues in `CompanyMilestonesSection`
   - [x] Localize content to Czech (e.g. `2024 Založení studia`, `38+ Realizovaných AI projektů`, etc.)
   - [x] Add circular/rounded placeholder images beneath each stat (subtle, non-breaking)
   - [x] Preserve large-number typography style

6. **Client Testimonials Carousel**
   - [x] Replace simple stats block with testimonial carousel component
   - [x] Add ~15 Czech testimonials (photo, name, company, 5-star rating, 2-sentence text)
   - [x] Implement horizontal, infinite auto-scroll (slow and subtle; pause on hover if reasonable)
   - [x] Style cards with dark background + soft hover glow
   - [x] Insert section after Company Milestones section

7. **Pricing Section Transformation**
   - [x] Rename section to `Vyberte službu`
   - [x] Remove monthly/yearly toggle and Tabs
   - [x] Reduce from 3 to 2 cards while keeping overall layout
   - [x] Create `Webdesign` card (`od 24 900 Kč`) and `AI Agenti & Automatizace` card (`od 29 900 Kč`)
   - [x] Localize/replace all feature bullets to Czech
   - [x] Update primary CTAs to `Chci web` and `Chci AI řešení`
   - [x] Keep current gradients/glow; add subtle `scale(1.03)` hover on cards/buttons

8. **FAQ Section Fixes**
   - [x] Adjust top margin/spacing to avoid overlap with previous section
   - [x] Localize and rewrite all 5 FAQ questions and answers in Czech
   - [x] Ensure accordion uses clear plus/minus (or chevron) icons with smooth open/close animation
   - [x] Verify typography and spacing on mobile/desktop

9. **Final CTA Section Update**
   - [x] Update heading to `Připraveni povýšit váš business s námi?`
   - [x] Replace description with Czech copy about flexibilita / nezávazná spolupráce
   - [x] Change button label to `Nezávazně nás kontaktujte`
   - [x] Enhance orange glow + `scale(1.05)` hover with ~0.3s transition

10. **Contact Form Section**
    - [x] Add new `Kontakt` section before footer (with `id="contact"` for smooth scroll)
    - [x] Include fields: `Jméno`, `Email`, `Telefon`, `Popis projektu`
    - [x] Style form with modern minimal dark theme matching page
    - [x] Add submit button `Odeslat poptávku` (orange gradient + hover glow)
    - [x] Implement basic validation (required fields, email format)
    - [x] Show success message `Děkujeme, ozveme se vám do 24 hodin` on submit
    - [ ] (Optional) Wire up to Bolt Database or placeholder submission handler

11. **Global Styling & Animation**
    - [x] Add subtle animated gradient background to main container
    - [x] Implement fade-in-on-scroll for key sections (Intersection Observer or Framer Motion)
    - [x] Standardize card hover: `translateY(-6px)`, `scale(1.03)`, soft orange glow
    - [x] Standardize button hover: `scale(1.05)` + smooth 0.3s transitions
    - [x] Ensure sticky header uses `backdrop-filter: blur(...)`
    - [x] Verify dark gradient background + orange accent `#ff531f` consistency

12. **Icons & Image Assets**
    - [x] Use `lucide-react` icons for trust stats + features (chat, check/review, code, automation/AI, etc.)
    - [x] Implement circular startup-style headshot placeholders for hero rating badge
    - [x] Add subtle placeholder images for milestones timeline cards
    - [x] Ensure all images are responsive and do not break layout

13. **Responsive & UX Verification**
    - [~] Verify layouts on mobile, tablet, and desktop for all sections
    - [~] Confirm testimonial carousel behaves smoothly on all screen sizes
    - [~] Ensure new contact form is mobile-friendly
    - [~] Validate sticky header behavior on small screens
    - [~] Test all hover effects work appropriately on touch devices

