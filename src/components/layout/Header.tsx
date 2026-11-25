import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { studioConfig } from '../../config/studio.config';
import { useStudio } from '../../lib/StudioContext';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openEnquiry, entranceActive } = useStudio();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          entranceActive ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
        } ${
          scrolled
            ? 'bg-[#FAF8F7]/94 backdrop-blur-md border-b border-[#DCD2D8]'
            : 'bg-[#FAF8F7]/80 backdrop-blur-sm border-b border-[#DCD2D8]/45'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="font-campaign text-sm md:text-base font-bold tracking-[0.34em] text-[#2A2128] hover:text-[#844D60] transition-colors"
            aria-label="AERA Beauty Studio Home"
          >
            {studioConfig.brand.name}
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7 whitespace-nowrap">
            {studioConfig.navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[11px] uppercase tracking-[0.18em] transition-colors relative py-1 whitespace-nowrap ${
                    isActive
                      ? 'text-[#844D60] font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#844D60]'
                      : 'text-[#493D46] hover:text-[#2A2128]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => openEnquiry({ sourceLabel: 'Header Booking' })}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.16em] rounded-full bg-[#493D46] text-[#FAF8F7] hover:bg-[#844D60] transition-colors cursor-pointer whitespace-nowrap"
            >
              Book a Visit
            </button>
          </nav>

          {/* Mobile & Tablet Controls */}
          <div className="flex lg:hidden items-center gap-2.5">
            <button
              type="button"
              onClick={() => openEnquiry({ sourceLabel: 'Mobile Header' })}
              className="px-3.5 py-1.5 text-[10px] uppercase tracking-[0.14em] rounded-full bg-[#493D46] text-[#FAF8F7] cursor-pointer"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="p-2 rounded-sm border border-[#DCD2D8] text-[#2A2128]"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Height Drawer */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-[#FAF8F7] text-[#2A2128] flex flex-col justify-between p-6"
        >
          <div className="flex items-center justify-between border-b border-[#DCD2D8] pb-4">
            <span className="font-campaign text-sm font-bold tracking-[0.28em]">
              {studioConfig.brand.wordmark}
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 rounded-sm border border-[#DCD2D8]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex flex-col gap-5 my-auto py-8">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-editorial text-2xl text-[#2A2128] border-b border-[#DCD2D8]/60 pb-3 flex items-baseline justify-between"
            >
              <span>Home</span>
              <span className="text-xs text-[#844D60] font-semibold">00</span>
            </Link>
            {studioConfig.navigation.map((item, idx) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="font-editorial text-2xl text-[#2A2128] border-b border-[#DCD2D8]/60 pb-3 flex items-baseline justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#844D60] font-semibold">0{idx + 1}</span>
              </Link>
            ))}
          </nav>

          <div className="space-y-3 pt-4 border-t border-[#DCD2D8]">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openEnquiry({ sourceLabel: 'Mobile Menu Drawer' });
              }}
              className="w-full py-3 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs uppercase tracking-[0.18em]"
            >
              Book a Visit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
