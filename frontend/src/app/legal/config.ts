export const LEGAL_SITE_URL = "https://atom-plus.pro";
export const LEGAL_OPERATOR_EMAIL = "licensing@atom.com";

export const LEGAL_ROUTES = {
    privacyPolicy: "/politika-pd",
    personalDataConsent: "/soglasie-pd",
} as const;

export const LEGAL_URLS = {
    privacyPolicy: `${LEGAL_SITE_URL}${LEGAL_ROUTES.privacyPolicy}`,
    personalDataConsent: `${LEGAL_SITE_URL}${LEGAL_ROUTES.personalDataConsent}`,
} as const;
