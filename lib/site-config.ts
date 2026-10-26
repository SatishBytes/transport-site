// Before launch, replace the domain and contact-number placeholders with verified business details.
export const siteConfig = {
  companyName: "Bachan Road Carriers",
  copyrightYear: 2026,
  tagline: "Goods transport and part load logistics",
  productionDomain: "https://www.example.com",
  phone: "7021028726",
  whatsappNumber: "917021028726",
  email: "bachanroadcarriers7289@gmail.com",
  address: "andheri Mumbai",
  showFullTruckLoadService: false,
  developer: {
    name: "Satish Yadav",
    linkedinUrl: "https://www.linkedin.com/in/satish-yadav-9202ab25a",
    githubUrl: "https://github.com/SatishBytes",
  },
} as const;

export function isConfiguredValue(value: string) {
  return value.trim().length > 0 && !value.trim().startsWith("[");
}

export function getWhatsAppHref(message?: string) {
  return createWhatsAppHref(siteConfig.whatsappNumber, message);
}

export function createWhatsAppHref(whatsappNumber: string, message?: string) {
  const number = whatsappNumber.replace(/\D/g, "");

  if (
    !isConfiguredValue(whatsappNumber) ||
    !/^\+?[\d\s().-]+$/.test(whatsappNumber.trim()) ||
    number.length < 8 ||
    number.length > 15
  ) {
    return null;
  }

  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${query}`;
}
