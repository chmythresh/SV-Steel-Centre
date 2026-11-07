import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Calculator, Shield, Clock } from 'lucide-react';

const PRODUCT_LINKS = [
  { label: 'Cold Rolled (CR) Sheets', path: '/products/cr-sheets' },
  { label: 'Zinc / Galvanized Iron (GI) Sheets', path: '/products/zinc-gi-sheets' },
  { label: 'Sheet Weight & Price Calculator', path: '/calculator' },
];

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About SV Steel Centre', path: '/about' },
  { label: 'Contact & Yard Location', path: '/contact' },
  { label: 'Admin Management Portal', path: '/admin' },
];

const BRANDS = ['Tata Steel', 'JSW Steel', 'Jindal Steel', 'AM/NS India', 'SAIL'];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#101d32] text-[#d6e3fe] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <svg viewBox="0 0 36 36" fill="none" className="w-6 h-6" aria-hidden="true">
                  <rect x="4" y="8" width="6" height="20" rx="1.5" fill="#c4dcff" />
                  <rect x="12" y="4" width="6" height="24" rx="1.5" fill="#ffffff" />
                  <rect x="20" y="10" width="6" height="18" rx="1.5" fill="#90b2e4" />
                  <rect x="28" y="14" width="4" height="14" rx="1.5" fill="#c4dcff" opacity="0.8" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl text-white font-extrabold uppercase tracking-tight">
                  SV Steel Centre
                </span>
                <span className="text-[11px] text-[#b1c8ea] font-medium tracking-wider uppercase">
                  Estd. 1989 • Bhavanipuram, Vijayawada
                </span>
              </div>
            </div>

            <p className="text-sm text-[#c4dcff]/80 leading-relaxed">
              Prime flat steel distribution specialist. Continuous inventory of Cold Rolled (CR) and Zinc / GI sheets catering to regional Andhra Pradesh builders, OEMs, and fabricators.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {BRANDS.map((b) => (
                <span key={b} className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/10 text-white border border-white/10">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Product Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Steel Catalogues
            </h4>
            <ul className="space-y-2.5 text-sm">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:scale-125 transition-transform"></span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-1">
              Yard &amp; Sales Depot
            </h4>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#c4dcff]">
              <MapPin size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <span>Main Road, Bhavanipuram, Vijayawada, Andhra Pradesh 520012, India</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#c4dcff]">
              <Phone size={16} className="text-blue-400 shrink-0" />
              <span>+91 92464 73280</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#c4dcff]">
              <Clock size={16} className="text-blue-400 shrink-0" />
              <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
            </div>

            <a
              href="https://wa.me/919246473280?text=Hello%20SV%20Steel%20Centre,%20I%20need%20a%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <MessageSquare size={14} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#b1c8ea]">
          <p>© {year} Sri Venkateswara Steel Centre. All rights reserved.</p>
          <p>Vijayawada • Krishna District • Andhra Pradesh</p>
        </div>
      </div>
    </footer>
  );
}
