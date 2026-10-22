import { Logo } from "@/components/ui/Logo";
import { Shell } from "@/components/ui/Shell";
import { SITE } from "@/lib/site";
import type { SocialLink } from "@/lib/site-config";

const MODUL = [
  { href: "#library", label: "Library" },
  { href: "#perizinan", label: "Perizinan" },
  { href: "#absensi", label: "Absensi" },
  { href: "#gaji", label: "Gaji" },
  { href: "#exam", label: "Exam" },
];

const HALAMAN = [
  { href: "#spesifikasi", label: "Spesifikasi" },
  { href: "#alur", label: "Alur data" },
  { href: "#implementasi", label: "Implementasi" },
  { href: "#faq", label: "FAQ" },
];

export interface FooterProps {
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  about?: string;
  copyright?: string;
  socialLinks?: SocialLink[];
  logoUrl?: string | null;
  siteName?: string;
}

export function Footer({
  email = SITE.contactEmail,
  phone = "+62 21 555 0199",
  address,
  city = SITE.city,
  about = "Sistem manajemen SDM minimalis dan efisien.",
  copyright = "© 2026 ProStaff. Situs demonstrasi. Logo, nama perusahaan, dan data pada halaman ini ilustratif.",
  socialLinks,
  logoUrl = null,
  siteName = "ProStaff",
}: FooterProps) {
  return (
    <footer className="on-inverse bg-surface-inverse">
      <Shell crosshairBand="dark" className="pt-14 pb-6">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Logo src={logoUrl} name={siteName} />
            <p className="mt-3.5 max-w-[30ch] text-[13px] leading-[1.6] text-ink-secondary">
              {about}
            </p>
          </div>
          <nav aria-label="Modul">
            <h2 className="mb-3 font-mono text-[11.5px] font-normal tracking-[0.06em] text-ink-muted uppercase">
              Modul
            </h2>
            <ul>
              {MODUL.map((l) => (
                <li key={l.href} className="mt-2">
                  <a
                    href={l.href}
                    className="border-b border-transparent text-[13px] text-ink-secondary transition-colors duration-100 ease-linear hover:border-ink hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Halaman">
            <h2 className="mb-3 font-mono text-[11.5px] font-normal tracking-[0.06em] text-ink-muted uppercase">
              Halaman
            </h2>
            <ul>
              {HALAMAN.map((l) => (
                <li key={l.href} className="mt-2">
                  <a
                    href={l.href}
                    className="border-b border-transparent text-[13px] text-ink-secondary transition-colors duration-100 ease-linear hover:border-ink hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="mb-3 font-mono text-[11.5px] font-normal tracking-[0.06em] text-ink-muted uppercase">
              Kontak
            </h2>
            {/* ILUSTRATIF: email dan kota placeholder, ganti dengan data asli sebelum rilis. */}
            <ul className="text-[13px] text-ink-secondary">
              <li className="mt-2">
                <a
                  href={`mailto:${email}`}
                  className="border-b border-transparent transition-colors duration-100 ease-linear hover:border-ink hover:text-ink"
                >
                  {email}
                </a>
              </li>
              {phone && <li className="mt-2">{phone}</li>}
              <li className="mt-2">{address ? `${address}, ${city}` : `${city}, Indonesia`}</li>
              {socialLinks && socialLinks.length > 0 && (
                <li className="mt-3 flex gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-ink-muted hover:text-ink"
                    >
                      {s.platform}
                    </a>
                  ))}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-line pt-4 font-mono text-[11.5px] text-ink-muted">
          <p>{copyright}</p>
          <p>Foto ilustrasi.</p>
        </div>
      </Shell>
    </footer>
  );
}
