import { AttendanceSection } from "@/components/AttendanceSection";
import { Audience } from "@/components/Audience";
import { DataFlow } from "@/components/DataFlow";
import { ExamSection } from "@/components/ExamSection";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Implementation } from "@/components/Implementation";
import { JsonLd } from "@/components/JsonLd";
import { LibrarySection } from "@/components/LibrarySection";
import { Navbar } from "@/components/Navbar";
import { PayrollSection } from "@/components/PayrollSection";
import { PermitSection } from "@/components/PermitSection";
import { Principles } from "@/components/Principles";
import { SpecStrip } from "@/components/SpecStrip";
import { getSiteConfig } from "@/lib/site-config";

// Urutan section tetap sesuai docs/03 §1.
export default async function Home() {
  const config = await getSiteConfig();

  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-surface"
      >
        Lewati ke konten
      </a>
      <Navbar
        ctaText={config.hero.ctaText}
        ctaLink={config.hero.ctaLink}
        logoUrl={config.branding.logoUrl}
        siteName={config.branding.siteName}
      />
      <main id="konten">
        <Hero
          headline={config.hero.headline}
          subheadline={config.hero.subheadline}
          ctaText={config.hero.ctaText}
          ctaLink={config.hero.ctaLink}
          ctaSecondaryText={config.hero.ctaSecondaryText}
          ctaSecondaryLink={config.hero.ctaSecondaryLink}
          waNumber={config.whatsapp.number}
          waMessage={config.whatsapp.message}
        />
        <SpecStrip />
        <Audience />
        <Principles />
        <LibrarySection />
        <PermitSection />
        <AttendanceSection />
        <PayrollSection />
        <ExamSection />
        <DataFlow />
        <Implementation />
        <Faq />
        <FinalCta />
      </main>
      <Footer
        email={config.contact.email}
        phone={config.contact.phone}
        address={config.contact.address}
        city={config.contact.city}
        about={config.footer.about}
        copyright={config.footer.copyright}
        socialLinks={config.contact.socialLinks}
        logoUrl={config.branding.logoUrl}
        siteName={config.branding.siteName}
      />
      <FloatingWhatsApp
        number={config.whatsapp.number}
        message={config.whatsapp.message}
        enabled={config.whatsapp.floatingEnabled}
      />
      <JsonLd />
    </>
  );
}
