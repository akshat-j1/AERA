import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteSeo } from '../../lib/seo';

interface PageBannerProps {
  eyebrow: string;
  titlePrefix: string;
  titleItalic: string;
  description: string;
  surface?: 'porcelain' | 'lilac' | 'peach';
  rightSlot?: ReactNode;
}

export function PageShell({
  eyebrow,
  titlePrefix,
  titleItalic,
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
      ? 'bg-[#F3EEF5]'
      : surface === 'peach'
        ? 'bg-[#F3E6DF]/70'
        : 'bg-[#F8F5F1]';

  return (
    <>
      <div className={`pt-28 pb-14 md:pt-36 md:pb-18 border-b border-[#C8B49D]/40 ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#504348]">{eyebrow}</p>
            <h1 className="font-sculpt text-4xl md:text-5xl font-semibold leading-[1.04] text-[#2D2328]">
              {titlePrefix}{' '}
              <span className="font-whisper font-normal text-[#504348]">{titleItalic}</span>
            </h1>
            <p className="text-sm md:text-base text-[#504348] max-w-2xl leading-relaxed">
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
