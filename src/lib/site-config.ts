import { cache } from "react";
import { SITE } from "./site";

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteConfig {
  branding: {
    siteName: string;
    logoUrl: string | null;
    faviconUrl: string | null;
    primaryColor: string | null;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    ctaSecondaryText: string;
    ctaSecondaryLink: string;
  };
  whatsapp: {
    number: string;
    message: string;
    floatingEnabled: boolean;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    city: string;
    socialLinks: SocialLink[];
  };
  footer: {
    about: string;
    copyright: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  analytics: {
    gaId: string | null;
    gtmId: string | null;
    fbPixelId: string | null;
    googleSiteVerification: string | null;
  };
}

export const DEFAULT_CONFIG: SiteConfig = {
  branding: {
    siteName: SITE.name,
    logoUrl: null,
    faviconUrl: null,
    primaryColor: null,
  },
  hero: {
    headline: "Navigasi cepat. Layar bersih. Nol bloatware.",
    subheadline:
      "ProStaff HRIS menyatukan arsip dokumen, presensi, perizinan, penggajian, dan uji teknis dalam satu antarmuka monokrom. Aksi utama selesai dari keyboard, tanpa pop-up dan tanpa tur onboarding.",
    ctaText: "Jadwalkan demo",
    ctaLink: "#demo",
    ctaSecondaryText: "Lihat Library",
    ctaSecondaryLink: "#library",
  },
  whatsapp: {
    number: "6281234567890",
    message:
      "Halo Admin ProStaff, saya tertarik untuk menjadwalkan demo sistem ProStaff HRIS.",
    floatingEnabled: true,
  },
  contact: {
    email: SITE.contactEmail,
    phone: "+62 21 555 0199",
    address: "Sudirman Central Business District, Jakarta",
    city: SITE.city,
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "GitHub", url: "https://github.com" },
    ],
  },
  footer: {
    about: "Sistem manajemen SDM minimalis untuk kantor profesional.",
    copyright: "© 2026 ProStaff. Hak cipta dilindungi undang-undang.",
  },
  seo: {
    metaTitle: SITE.title,
    metaDescription: SITE.description,
    keywords: "HRIS, manajemen SDM, absensi, payroll, perizinan, exam, SOP",
  },
  analytics: {
    gaId: null,
    gtmId: null,
    fbPixelId: null,
    googleSiteVerification: null,
  },
};

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  youtube: "YouTube",
  tiktok: "TikTok",
  twitter: "Twitter / X",
  x: "X",
};

export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  const apiUrl = process.env.APIURL || process.env.API_URL;
  const siteId = process.env.SITE_ID || "07-prostaff";
  const siteSecret = process.env.SITE_SECRET;
  const revalidateSeconds = Number(process.env.REVALIDATE_SECONDS) || 15;

  if (!apiUrl || apiUrl.trim() === "" || !siteSecret || siteSecret.trim() === "") {
    return DEFAULT_CONFIG;
  }

  try {
    const cleanUrl = apiUrl.replace(/\/+$/, "");
    const endpoint = `${cleanUrl}/api/v1/site/config`;

    const headers: Record<string, string> = {
      "X-Site-Id": siteId,
      "X-Site-Secret": siteSecret,
      "ngrok-skip-browser-warning": "true",
      Accept: "application/json",
    };

    const res = await fetch(endpoint, {
      method: "GET",
      headers,
      next: { revalidate: revalidateSeconds },
    });

    if (!res.ok) {
      console.warn(
        `[getSiteConfig] Laravel API returned status ${res.status}. Falling back to default config.`
      );
      return DEFAULT_CONFIG;
    }

    const json = await res.json();
    const data = json?.data || json;

    const resolveUrl = (url: string | null | undefined): string | null => {
      if (!url) return null;
      if (url.startsWith("/")) return `${cleanUrl}${url}`;
      if (url.includes("localhost:8000") && !cleanUrl.includes("localhost:8000")) {
        return url.replace(/https?:\/\/[^/]+/, cleanUrl);
      }
      return url;
    };

    const normalizeSocialUrl = (url: unknown): string => {
      if (!url || typeof url !== "string") return "";
      const trimmed = url.trim();
      if (!trimmed) return "";
      return trimmed.startsWith("http://") || trimmed.startsWith("https://")
        ? trimmed
        : `https://${trimmed}`;
    };

    const rawSocial = data?.contact?.social_links;
    const socialLinks: SocialLink[] = [];

    if (Array.isArray(rawSocial)) {
      for (const item of rawSocial) {
        const u = normalizeSocialUrl(item?.url);
        if (u) {
          const rawKey = String(item.platform || item.name || "Tautan").toLowerCase();
          socialLinks.push({
            platform: PLATFORM_LABELS[rawKey] || item.platform || "Tautan",
            url: u,
          });
        }
      }
    } else if (typeof rawSocial === "object" && rawSocial !== null) {
      for (const [key, val] of Object.entries(rawSocial)) {
        const u = normalizeSocialUrl(val);
        if (u) {
          const rawKey = key.toLowerCase();
          socialLinks.push({
            platform: PLATFORM_LABELS[rawKey] || key.charAt(0).toUpperCase() + key.slice(1),
            url: u,
          });
        }
      }
    }

    return {
      branding: {
        siteName:
          data?.site?.name ||
          data?.branding?.site_name ||
          data?.site_name ||
          DEFAULT_CONFIG.branding.siteName,
        logoUrl:
          resolveUrl(data?.branding?.logo_url || data?.logo_url) ||
          DEFAULT_CONFIG.branding.logoUrl,
        faviconUrl:
          resolveUrl(data?.branding?.favicon_url || data?.favicon_url) ||
          DEFAULT_CONFIG.branding.faviconUrl,
        primaryColor:
          data?.branding?.primary_color ||
          data?.primary_color ||
          DEFAULT_CONFIG.branding.primaryColor,
      },
      hero: {
        headline: data?.hero?.headline || DEFAULT_CONFIG.hero.headline,
        subheadline: data?.hero?.subheadline || DEFAULT_CONFIG.hero.subheadline,
        ctaText: data?.hero?.cta_text || DEFAULT_CONFIG.hero.ctaText,
        ctaLink: data?.hero?.cta_link || DEFAULT_CONFIG.hero.ctaLink,
        ctaSecondaryText:
          data?.hero?.cta_secondary_text || DEFAULT_CONFIG.hero.ctaSecondaryText,
        ctaSecondaryLink:
          data?.hero?.cta_secondary_link || DEFAULT_CONFIG.hero.ctaSecondaryLink,
      },
      whatsapp: {
        number:
          data?.cta?.whatsapp_number ||
          data?.whatsapp?.number ||
          data?.whatsapp_number ||
          DEFAULT_CONFIG.whatsapp.number,
        message:
          data?.cta?.whatsapp_message_template ||
          data?.whatsapp?.message ||
          data?.whatsapp_message ||
          DEFAULT_CONFIG.whatsapp.message,
        floatingEnabled:
          typeof data?.whatsapp?.floating_enabled === "boolean"
            ? data.whatsapp.floating_enabled
            : DEFAULT_CONFIG.whatsapp.floatingEnabled,
      },
      contact: {
        email: data?.contact?.email || data?.email || DEFAULT_CONFIG.contact.email,
        phone: data?.contact?.phone || data?.phone || DEFAULT_CONFIG.contact.phone,
        address: data?.contact?.address || data?.address || DEFAULT_CONFIG.contact.address,
        city: data?.contact?.city || data?.city || DEFAULT_CONFIG.contact.city,
        socialLinks: socialLinks.length > 0 ? socialLinks : DEFAULT_CONFIG.contact.socialLinks,
      },
      footer: {
        about: data?.footer?.about || data?.footer_text || DEFAULT_CONFIG.footer.about,
        copyright: data?.footer?.copyright || DEFAULT_CONFIG.footer.copyright,
      },
      seo: {
        metaTitle: data?.seo?.meta_title || data?.meta_title || DEFAULT_CONFIG.seo.metaTitle,
        metaDescription:
          data?.seo?.meta_description ||
          data?.meta_description ||
          DEFAULT_CONFIG.seo.metaDescription,
        keywords: data?.seo?.keywords || data?.keywords || DEFAULT_CONFIG.seo.keywords,
      },
      analytics: {
        gaId: data?.tracking?.ga_id || data?.analytics?.ga_id || null,
        gtmId: data?.tracking?.gtm_id || data?.analytics?.gtm_id || null,
        fbPixelId:
          data?.tracking?.meta_pixel_id ||
          data?.analytics?.fb_pixel_id ||
          null,
        googleSiteVerification:
          data?.tracking?.google_site_verification ||
          data?.analytics?.google_site_verification ||
          null,
      },
    };
  } catch (err) {
    console.error("[getSiteConfig] Error connecting to Laravel Admin API:", err);
    return DEFAULT_CONFIG;
  }
});
