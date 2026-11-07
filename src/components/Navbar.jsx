import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, Calculator, User } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'CR Sheets', path: '/products/cr-sheets' },
  { label: 'Zinc / GI Sheets', path: '/products/zinc-gi-sheets' },
  { label: 'Weight & Price Calculator', path: '/calculator' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Admin Portal', path: '/admin' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f9f9ff]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)] transition-all">
      {/* Top Authority Announcement Bar from Stitch */}
      <div className="w-full bg-[#101d32] text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span>Bhavanipuram, Vijayawada • 35+ Years of Steel Distribution Excellence • Retail &amp; Wholesale Orders</span>
          <span className="hidden sm:inline">•</span>
          <a
            href="https://wa.me/919246473280?text=Hello%20SV%20Steel%20Centre,%20I%20need%20a%20quote"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Call / WhatsApp: +91 92464 73280
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Authority Label */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group" aria-label="SV Steel Centre Home">
          <div className="w-10 h-10 rounded-lg bg-[#101d32] border border-blue-900/40 flex items-center justify-center text-white shadow-sm group-hover:bg-[#1a2d4c] transition-colors">
            <svg viewBox="0 0 36 36" fill="none" className="w-6 h-6" aria-hidden="true">
              <rect x="4" y="8" width="6" height="20" rx="1.5" fill="#c4dcff" />
              <rect x="12" y="4" width="6" height="24" rx="1.5" fill="#ffffff" />
              <rect x="20" y="10" width="6" height="18" rx="1.5" fill="#90b2e4" />
              <rect x="28" y="14" width="4" height="14" rx="1.5" fill="#c4dcff" opacity="0.8" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg sm:text-xl text-[#00020b] uppercase font-black tracking-tight leading-none group-hover:text-blue-900 transition-colors">
              SV Steel Centre
            </span>
            <span className="text-[11px] text-[#49607e] font-semibold mt-0.5 tracking-wider uppercase">
              Estd. 1989 | Vijayawada
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-1.5 font-medium text-sm text-[#44474d]">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-[#00020b] font-bold bg-[#dee8ff]'
                    : 'text-[#44474d] hover:text-[#00020b] hover:bg-[#f0f3ff]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="https://wa.me/919246473280?text=Hello%20SV%20Steel%20Centre,%20I%20need%20a%20quote"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#e7eeff] text-[#011c37] font-semibold text-xs hover:bg-[#dee8ff] transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Enquire on WhatsApp
          </a>

          <Link
            to="/calculator"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#101d32] text-white font-bold text-xs sm:text-sm hover:bg-[#1a2d4c] transition-all shadow-sm"
          >
            <Calculator size={14} className="text-blue-300" />
            <span>Instant Quote</span>
          </Link>

          <Link
            to="/admin"
            className="w-9 h-9 rounded-full bg-[#101d32] flex items-center justify-center text-white hover:bg-blue-900 transition-colors shadow-sm"
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <User size={16} />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="xl:hidden p-2 rounded-lg text-[#101d32] hover:bg-[#e7eeff] transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="xl:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#dee8ff] text-[#00020b]'
                      : 'text-[#44474d] hover:bg-[#f0f3ff]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="https://wa.me/919246473280?text=Hello%20SV%20Steel%20Centre,%20I%20need%20a%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-sm shadow-sm"
              >
                <MessageSquare size={16} />
                WhatsApp Direct Enquiry
              </a>
              <Link
                to="/calculator"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#101d32] text-white font-bold text-sm shadow-sm"
              >
                <Calculator size={16} />
                Open Weight &amp; Price Calculator
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
