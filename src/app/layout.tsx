import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SITE } from "@/lib/site";
import { BRAND } from "@/lib/brand";
import { getSiteConfig } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const ogImageUrl = config.seo.ogImageUrl || `${SITE.url}/opengraph-image`;

  return {
    metadataBase: new URL(SITE.url),
    title: { absolute: config.seo.metaTitle },
    description: config.seo.metaDescription,
    applicationName: config.branding.siteName,
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    icons: {
      icon: config.branding.faviconUrl || "/icon.svg",
    },
    verification: config.analytics.googleSiteVerification
      ? { google: config.analytics.googleSiteVerification }
      : undefined,
    openGraph: {
      type: "website",
      url: "/",
      siteName: config.branding.siteName,
      locale: SITE.locale,
      title: config.seo.metaTitle,
      description: config.seo.metaDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: config.seo.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.metaTitle,
      description: config.seo.metaDescription,
      images: [ogImageUrl],
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const config = await getSiteConfig();
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: config.branding.primaryColor || BRAND.white,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();

  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {config.branding.primaryColor && (
          <style id="admin-theme-colors">{`
            :root, .on-inverse {
              --theme-primary: ${config.branding.primaryColor};
              --theme-primary-hover: ${config.branding.primaryColor};
              --theme-primary-text: ${BRAND.white};
              --focus-ring: ${config.branding.primaryColor};
            }
          `}</style>
        )}
        {config.analytics.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.analytics.gaId}');
              `}
            </Script>
          </>
        )}
        {config.analytics.gtmId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${config.analytics.gtmId}');
            `}
          </Script>
        )}
        {config.analytics.fbPixelId && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${config.analytics.fbPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body>
        {config.analytics.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${config.analytics.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
