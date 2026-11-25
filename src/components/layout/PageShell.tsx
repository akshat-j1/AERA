import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteSeo } from '../../lib/seo';

interface PageBannerProps {
  eyebrow: string;
  titlePrefix: string;
  titleAccent?: string;
  description: string;
  surface?: 'porcelain' | 'lilac' | 'alabaster';
  rightSlot?: ReactNode;
}

export function PageShell({
  eyebrow,
  titlePrefix,
  titleAccent,
  description,
  surface = 'porcelain',
  rightSlot,
  children,
}: PageBannerProps & { children: ReactNode }) {
  const { pathname } = useLocation();
  const seo = getRouteSeo(pathname);

  useEffect(() => {
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
  }, [seo.title, seo.description]);

  const bgClass =
    surface === 'lilac'
      ? 'bg-[#E7DFEB]/55'
      : surface === 'alabaster'
        ? 'bg-[#F2EEF1]'
        : 'bg-[#FAF8F7]';

  return (
    <>
      <div className={`pt-28 pb-14 md:pt-36 md:pb-20 border-b border-[#DCD2D8] ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#844D60]">
              {eyebrow}
            </p>
            <h1 className="font-campaign text-4xl md:text-6xl font-bold leading-[1.02] text-[#2A2128]">
              {titlePrefix}
              {titleAccent ? (
                <span className="block md:inline font-whisper font-normal text-[#844D60] text-[0.9em]">
                  {' '}
                  {titleAccent}
                </span>
              ) : null}
            </h1>
            <p className="text-sm md:text-base text-[#493D46] max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
          {rightSlot && <div className="lg:col-span-5">{rightSlot}</div>}
        </div>
      </div>

      {children}
    </>
  );
}
