import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shell } from "@/components/ui/Shell";
import { FAQ } from "@/lib/faq";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-judul" className="bg-surface-subtle">
      <Shell crosshairBand="light" className="py-14 md:py-[72px] 2xl:py-[88px]">
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
          <SectionHeader path="faq" title="Pertanyaan yang sering diajukan." />
          <div className="border-t border-line">
            {FAQ.map((f) => (
              <details key={f.question} className="group border-b border-line">
                <summary className="flex min-h-[58px] cursor-pointer list-none items-center justify-between gap-6 py-3.5 text-[15px] tracking-[-0.01em] text-ink [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <span aria-hidden className="relative h-3.5 w-3.5 shrink-0">
                    <span className="absolute top-[6.5px] right-0 left-0 h-px bg-ink" />
                    <span className="absolute top-0 bottom-0 left-[6.5px] w-px bg-ink group-open:hidden" />
                  </span>
                </summary>
                <p className="max-w-[64ch] pb-4 text-sm leading-[1.7] text-ink-secondary">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}
