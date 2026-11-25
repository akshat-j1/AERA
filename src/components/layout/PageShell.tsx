import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteSeo } from '../../lib/seo';

interface PageBannerProps {
  eyebrow: string;
  titlePrefix: string;
  titleAccent?: string;
  description: string;
  surface?: 'white' | 'peach' | 'clay';
  rightSlot?: ReactNode;
}

export function PageShell({
  eyebrow,
  titlePrefix,
  titleAccent,
  description,
  surface = 'white',
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
    surface === 'peach'
      ? 'bg-[#F4E5DA]'
      : surface === 'clay'
        ? 'bg-[#EFE0D5]'
        : 'bg-[#FCFAF7]';

  return (
    <>
      <div className={`pt-28 pb-14 md:pt-36 md:pb-20 border-b border-[#D4BEB0]/55 ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#874030]">
              {eyebrow}
            </p>
            <h1 className="font-editorial text-4xl md:text-6xl font-medium leading-[1.01] text-[#2C221E]">
              {titlePrefix}
              {titleAccent ? (
                <span className="block md:inline font-sculpt font-semibold text-[#493B36] text-[0.82em] tracking-tight">
                  {' '}
                  {titleAccent}
                </span>
              ) : null}
            </h1>
            <p className="text-sm md:text-base text-[#493B36] max-w-2xl leading-relaxed">
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
