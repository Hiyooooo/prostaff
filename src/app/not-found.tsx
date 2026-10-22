import { Shell } from "@/components/ui/Shell";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-surface text-ink">
      <Shell className="text-center py-20 border-t-0">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
          404 / Halaman Tidak Ditemukan
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Halaman tidak tersedia.
        </h1>
        <p className="mt-3 max-w-md mx-auto text-sm text-ink-secondary leading-relaxed">
          Alamat yang Anda tuju tidak ditemukan atau telah dipindahkan.
        </p>
        <div className="mt-8">
          <ButtonLink href="/">Kembali ke beranda</ButtonLink>
        </div>
      </Shell>
    </section>
  );
}
