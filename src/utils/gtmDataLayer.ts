declare global {
  interface Window {
    /** Google Tag Manager standard queue — created by snippet in index.html */
    dataLayer?: Record<string, unknown>[];
    /** gtag function created by Consent Mode default snippet in index.html */
    gtag?: (...args: unknown[]) => void;
  }
}

/** Push a gtag consent update to dataLayer. */
export function pushConsentUpdate(granted: boolean): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const state = granted ? "granted" : "denied";
  window.dataLayer.push("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
}

/**
 * On page load, re-apply saved consent for returning visitors so that
 * GTM consent state is restored before any tags fire.
 * Call once at app bootstrap (before React mounts is fine; also safe after).
 */
export function restoreConsentFromStorage(): void {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "all") pushConsentUpdate(true);
    else if (stored === "essential") pushConsentUpdate(false);
    // null = banner not yet answered; keep default (denied)
  } catch {
    /* localStorage unavailable — keep default */
  }
}

/**
 * Signal a validated lead submission to Google Tag Manager.
 *
 * Use only after HTTP success is confirmed (`response.ok`).
 * Runs in queueMicrotask so the push clears the synchronous React/fetch chain — Tag Assistant
 * Preview timelines record Custom Events more reliably than synchronous pushes inside `onSubmit`.
 */
export function pushLeadFormSubmitSuccessToDataLayer(): void {
  if (typeof window === "undefined") return;

  const flush = (): void => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "lead_form_submit" });
  };

  if (typeof queueMicrotask === "function") {
    queueMicrotask(flush);
  } else {
    Promise.resolve().then(flush);
  }
}
