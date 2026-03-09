# Implementation Plan — Legal, Cookie & 404 (6 Tasks)

## Checklist

- [x] **1. Privacy Policy Page** — `/zasady-ochrany-soukromi`, full Czech content, route in App, link in footer
- [x] **2. Terms of Use Page** — `/podminky-uziti`, full Czech content, route in App, link in footer
- [x] **3. Cookie Consent Banner** — bottom banner, "Přijmout vše" / "Pouze nezbytné", localStorage, link to privacy, hide after choice
- [x] **4. Footer Copyright** — change to "© 2025 PK-Digital. Všechna práva vyhrazena."
- [x] **5. GDPR Consent Checkbox** — required checkbox in contact form with link to Zásady ochrany soukromí
- [x] **6. 404 Page in Czech** — "Stránka nenalezena", "Omlouváme se, tato stránka neexistuje.", button "Zpět na úvodní stránku"

---

## 1. Privacy Policy Page

- **Route:** `/zasady-ochrany-soukromi`
- **Content (Czech):** What data is collected, how it's used, cookies, third-party services, GDPR rights (access, deletion, portability), data controller (PK-Digital contact).
- **Add route** in `src/index.tsx` (or App if present).
- **Footer:** Add link "Zásady ochrany soukromí" → `/zasady-ochrany-soukromi`.

## 2. Terms of Use Page

- **Route:** `/podminky-uziti`
- **Content (Czech):** Scope of services, intellectual property, liability limitations, governing law (Czech Republic), dispute resolution.
- **Add route** in router.
- **Footer:** Add link "Podmínky užití" → `/podminky-uziti`.

## 3. Cookie Consent Banner

- Bottom banner text: "Tento web používá cookies pro zlepšení vašeho zážitku."
- Buttons: "Přijmout vše", "Pouze nezbytné".
- Store preference in `localStorage` (e.g. `cookie-consent`).
- Link to privacy policy in banner.
- Do not show again after user chooses.

## 4. Footer Copyright

- Replace "© 2025 AI-agency. Všechna práva vyhrazena." with "© 2025 PK-Digital. Všechna práva vyhrazena."

## 5. GDPR Consent Checkbox (Contact Form)

- Required checkbox: "Souhlasím se zpracováním osobních údajů dle Zásad ochrany soukromí".
- "Zásad ochrany soukromí" links to `/zasady-ochrany-soukromi`.
- Block submit until checked; show validation error if unchecked.

## 6. 404 Page in Czech

- Title: "Stránka nenalezena"
- Message: "Omlouváme se, tato stránka neexistuje."
- Button: "Zpět na úvodní stránku" → navigate to `/`.
