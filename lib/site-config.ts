// Before launch, replace the domain and contact-number placeholders with verified business details.
const experienceYears = 10;
const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.example.com";

function getProductionDomain(siteUrl: string) {
  let url: URL;

  try {
    url = new URL(siteUrl);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be an absolute HTTPS origin, such as https://www.example.com.",
    );
  }

  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path, query, or fragment.",
    );
  }

  return url.origin;
}

export const siteConfig = {
  companyName: "Bachan Road Carriers",
  copyrightYear: 2026,
  tagline: "Goods transport and part load logistics",
  experienceYears,
  experienceLabel: `${experienceYears}+ Years`,
  productionDomain: getProductionDomain(configuredSiteUrl),
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
