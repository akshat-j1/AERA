import { Link } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';

export function NotFoundPage() {
  return (
    <PageShell
      eyebrow="404"
      titlePrefix="Page not found."
      description="The page may have moved. Start from the studio homepage or browse the salon services."
      surface="porcelain"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 flex flex-wrap items-center gap-5">
        <Link to="/" className="px-5 py-3 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs uppercase tracking-[0.15em]">
          Studio Homepage
        </Link>
        <Link to="/services" className="underline underline-offset-4 text-sm">
          Services &amp; Pricing
        </Link>
      </div>
    </PageShell>
  );
}
