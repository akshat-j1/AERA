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
            ? 'bg-[#FCFAF7]/92 backdrop-blur-md border-b border-[#D4BEB0]/60'
            : 'bg-[#FCFAF7]/80 backdrop-blur-sm border-b border-[#D4BEB0]/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="font-sculpt text-sm md:text-base font-semibold tracking-[0.34em] text-[#2C221E] hover:text-[#874030] transition-colors"
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
                      ? 'text-[#874030] font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#874030]'
                      : 'text-[#493B36] hover:text-[#2C221E]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => openEnquiry({ sourceLabel: 'Header Booking' })}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.16em] rounded-full bg-[#493B36] text-[#FCFAF7] hover:bg-[#874030] transition-colors cursor-pointer whitespace-nowrap"
            >
              Book an Appointment
            </button>
          </nav>

          {/* Mobile & Tablet Controls */}
          <div className="flex lg:hidden items-center gap-2.5">
            <button
              type="button"
              onClick={() => openEnquiry({ sourceLabel: 'Mobile Header' })}
              className="px-3.5 py-1.5 text-[10px] uppercase tracking-[0.14em] rounded-full bg-[#493B36] text-[#FCFAF7] cursor-pointer"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="p-2 rounded-sm border border-[#D4BEB0] text-[#2C221E]"
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
          className="fixed inset-0 z-50 bg-[#FCFAF7] text-[#2C221E] flex flex-col justify-between p-6"
        >
          <div className="flex items-center justify-between border-b border-[#D4BEB0]/60 pb-4">
            <span className="font-sculpt text-sm font-semibold tracking-[0.28em]">
              {studioConfig.brand.wordmark}
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 rounded-sm border border-[#D4BEB0]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex flex-col gap-5 my-auto py-8">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-editorial text-2xl font-medium text-[#2C221E] border-b border-[#D4BEB0]/40 pb-3 flex items-baseline justify-between"
            >
              <span>Home</span>
              <span className="text-xs font-sans text-[#874030]">00</span>
            </Link>
            {studioConfig.navigation.map((item, idx) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="font-editorial text-2xl font-medium text-[#2C221E] border-b border-[#D4BEB0]/40 pb-3 flex items-baseline justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs font-sans text-[#874030]">0{idx + 1}</span>
              </Link>
            ))}
          </nav>

          <div className="space-y-3 pt-4 border-t border-[#D4BEB0]/60">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openEnquiry({ sourceLabel: 'Mobile Menu Drawer' });
              }}
              className="w-full py-3 rounded-sm bg-[#493B36] text-[#FCFAF7] text-xs uppercase tracking-[0.18em]"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      )}
    </>
  );
}
