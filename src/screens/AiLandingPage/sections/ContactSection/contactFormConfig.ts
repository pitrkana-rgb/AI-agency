/** Service labels aligned with Naše služby navigation. */
export const CONTACT_SERVICE_OPTIONS_CS = [
  "Webové stránky na míru",
  "Modernizace webových stránek",
  "Webové aplikace",
] as const;

export const CONTACT_SERVICE_OPTIONS_EN = [
  "New website",
  "Website modernization",
  "Web applications",
] as const;

export type LeadFormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  services: string[];
  projectDetails: string;
  gdprConsent: boolean;
};

export const leadFormInit: LeadFormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  services: [],
  projectDetails: "",
  gdprConsent: false,
};

export function getContactServiceOptions(isEn: boolean): string[] {
  return isEn ? [...CONTACT_SERVICE_OPTIONS_EN] : [...CONTACT_SERVICE_OPTIONS_CS];
}

/** Accepts international numbers (+prefix) or local 9-digit numbers; allows spaces, dashes, parentheses. */
export function isValidPhoneNumber(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (!/^\+?[\d\s().\-/]+$/.test(trimmed)) return false;

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 0) return false;

  if (trimmed.startsWith("+")) {
    return digits.length >= 8 && digits.length <= 15;
  }

  if (digits.length === 9) return true;

  return digits.length >= 10 && digits.length <= 15;
}

export function getPhoneValidationError(isEn: boolean): string {
  return isEn
    ? "Enter a valid phone number (with country prefix or 9 digits)"
    : "Zadejte platné telefonní číslo (s předvolbou nebo 9 číslic)";
}

export function buildLeadPayload(form: LeadFormState, isEn: boolean) {
  const details = form.projectDetails.trim();
  const address = form.address.trim();
  const messageParts = [
    details || null,
    address ? `${isEn ? "Address" : "Adresa"}: ${address}` : null,
  ].filter(Boolean);

  return {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    company: "",
    project_type: form.services.length
      ? form.services.join(", ")
      : isEn
        ? "Not specified"
        : "Neuvedeno",
    budget: "",
    message: messageParts.length ? messageParts.join("\n") : isEn ? "No details provided" : "Bez upřesnění",
  };
}
