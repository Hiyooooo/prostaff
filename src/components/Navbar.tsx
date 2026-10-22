import { Menu } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Shell } from "@/components/ui/Shell";
import { CONTACT_MAILTO } from "@/lib/site";

const LINKS = [
  { href: "#library", label: "Library" },
  { href: "#perizinan", label: "Perizinan" },
  { href: "#absensi", label: "Absensi" },
  { href: "#gaji", label: "Gaji" },
  { href: "#exam", label: "Exam" },
  { href: "#faq", label: "FAQ" },
];

export interface NavbarProps {
  ctaText?: string;
  ctaLink?: string;
  logoUrl?: string | null;
  siteName?: string;
}

export function Navbar({
  ctaText = "Jadwalkan demo",
  ctaLink = CONTACT_MAILTO,
  logoUrl = null,
  siteName = "ProStaff",
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-[60] border-b border-line bg-surface">
      <Shell className="flex h-14 items-center gap-6 border-t-0">
        <a href="#hero" aria-label={`${siteName}, kembali ke atas`}>
          <Logo src={logoUrl} name={siteName} />
        </a>
        <nav aria-label="Navigasi utama" className="ml-auto hidden items-center gap-[26px] min-[961px]:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="border-b border-transparent py-1.5 font-mono text-xs tracking-[0.02em] text-ink-secondary transition-colors duration-100 ease-linear hover:border-ink hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 min-[961px]:ml-1">
          <ButtonLink href={ctaLink}>{ctaText}</ButtonLink>
          <details className="relative min-[961px]:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-control border border-line-strong [&::-webkit-details-marker]:hidden">
              <Menu aria-hidden size={20} strokeWidth={1.5} />
              <span className="sr-only">Buka menu navigasi</span>
            </summary>
            <nav
              aria-label="Navigasi seluler"
              className="absolute right-0 top-[52px] w-[240px] border border-line bg-surface"
            >
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="flex min-h-12 items-center border-b border-line px-4 font-mono text-xs tracking-[0.02em] text-ink-secondary"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </Shell>
    </header>
  );
}
