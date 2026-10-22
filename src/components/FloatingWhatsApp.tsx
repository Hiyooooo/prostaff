"use client";

import { MessageSquare } from "lucide-react";

interface FloatingWhatsAppProps {
  number: string;
  message?: string;
  enabled?: boolean;
}

export function FloatingWhatsApp({
  number,
  message = "Halo Admin ProStaff, saya ingin konsultasi mengenai sistem HRIS.",
  enabled = true,
}: FloatingWhatsAppProps) {
  if (!enabled || !number) return null;

  // Clean phone number (digits only)
  const cleanNumber = number.replace(/\D/g, "");
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <aside
      aria-label="Bantuan WhatsApp"
      className="fixed bottom-5 right-5 z-40 print:hidden"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi kami melalui WhatsApp"
        className="group flex items-center gap-2.5 border border-line-mid bg-ink px-3.5 py-2.5 text-surface transition-colors hover:bg-surface hover:text-ink hover:border-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-line-mid"
      >
        <MessageSquare
          size={16}
          strokeWidth={2}
          className="shrink-0 transition-transform group-hover:scale-105"
          aria-hidden="true"
        />
        <span className="font-mono text-xs font-medium tracking-tight sm:inline">
          Konsultasi WhatsApp
        </span>
      </a>
    </aside>
  );
}
