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
            ? 'bg-[#F8F5F1]/90 backdrop-blur-md border-b border-[#C8B49D]/40'
            : 'bg-[#F8F5F1]/75 backdrop-blur-sm border-b border-[#C8B49D]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-4">
          {/* Left Asymmetric Wordmark + Coordinates (Never Shree Ji's centered serif header) */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="font-sculpt text-sm md:text-base font-semibold tracking-[0.28em] text-[#2D2328] hover:text-[#504348] transition-colors"
              aria-label="AERA Beauty Studio Home"
            >
              {studioConfig.brand.wordmark}
            </Link>
            <span className="hidden lg:inline-block h-3.5 w-px bg-[#C8B49D]/60" aria-hidden="true" />
            <span className="hidden lg:inline-block text-[10px] uppercase tracking-[0.2em] text-[#504348]/75">
              {studioConfig.locale.coordinatesLabel}
            </span>
          </div>

          {/* Right Primary Nav + Hairline CTA Pill */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7">
            {studioConfig.navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[11px] uppercase tracking-[0.18em] transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#2D2328] font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#504348]'
                      : 'text-[#504348]/85 hover:text-[#2D2328]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => openEnquiry({ sourceLabel: 'Header Concierge' })}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.16em] rounded-full bg-[#504348] text-[#F8F5F1] hover:bg-[#3A2E33] transition-colors cursor-pointer"
            >
              Request Chair
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2.5">
            <button
              type="button"
              onClick={() => openEnquiry({ sourceLabel: 'Mobile Header CTA' })}
              className="px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] rounded-full bg-[#504348] text-[#F8F5F1]"
            >
              Request
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="p-2 rounded-sm border border-[#C8B49D]/50 text-[#2D2328]"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Height Mobile Drawer */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-[#F8F5F1] text-[#2D2328] flex flex-col justify-between p-6"
        >
          <div className="flex items-center justify-between border-b border-[#C8B49D]/40 pb-4">
            <span className="font-sculpt text-sm font-semibold tracking-[0.28em]">
              {studioConfig.brand.wordmark}
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 rounded-sm border border-[#C8B49D]/50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex flex-col gap-5 my-auto py-8">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-sculpt text-2xl font-medium tracking-tight text-[#2D2328] border-b border-[#C8B49D]/25 pb-3 flex items-baseline justify-between"
            >
              <span>Home Sanctuary</span>
              <span className="text-xs font-normal text-[#504348]">00</span>
            </Link>
            {studioConfig.navigation.map((item, idx) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="font-sculpt text-2xl font-medium tracking-tight text-[#2D2328] border-b border-[#C8B49D]/25 pb-3 flex items-baseline justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs font-normal text-[#504348]">0{idx + 1}</span>
              </Link>
            ))}
          </nav>

          <div className="space-y-3 pt-4 border-t border-[#C8B49D]/40">
            <p className="text-[11px] text-[#504348]/85">{studioConfig.brand.demoNotice}</p>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openEnquiry({ sourceLabel: 'Mobile Menu Drawer' });
              }}
              className="w-full py-3 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.18em]"
            >
              Request Demo Appointment
            </button>
          </div>
        </div>
      )}
    </>
  );
}
