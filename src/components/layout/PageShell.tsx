import type { ReactNode } from 'react';

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
  const bgClass =
    surface === 'lilac'
      ? 'bg-[#E8DFED]/55'
      : surface === 'alabaster'
        ? 'bg-[#F5F0F3]'
        : 'bg-[#FCFAFA]';

  return (
    <>
      <div className={`aera-page-banner pt-24 pb-9 md:pt-32 md:pb-12 border-b border-[#DED2DA] ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#7B4A60]">
              {eyebrow}
            </p>
            <h1 className="font-campaign text-[clamp(2.2rem,5.5vw,4.25rem)] text-balance font-bold leading-[1.02] text-[#2A2028]">
              {titlePrefix}
              {titleAccent ? (
                <span className="block md:inline font-whisper font-normal text-[#7B4A60] text-[0.9em]">
                  {' '}
                  {titleAccent}
                </span>
              ) : null}
            </h1>
            <p className="text-sm md:text-base text-[#40343D] max-w-2xl leading-relaxed">
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
