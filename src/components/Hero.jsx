import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, MessageSquare, ShieldCheck, Warehouse, Ruler } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#101d32] text-white pt-28 pb-16 lg:pt-36 lg:pb-24" aria-label="Hero section">
      {/* Real Warehouse Photography from Stitch Screen 1 with cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/warehouse-hero.jpg"
          alt="Sri Venkateswara Steel Centre Bhavanipuram Warehouse Stockyard"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101d32] via-[#101d32]/90 to-[#101d32]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101d32] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Authority Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md mb-6 border border-white/15">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs uppercase tracking-wider text-[#d6e3fe] font-bold">
            ESTABLISHED 1989 • BHAVANIPURAM, VIJAYAWADA • 35+ YEARS OF TRUST
          </span>
        </div>

        {/* Main Headline & Narrative */}
        <div className="max-w-4xl">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight mb-6">
            Strength in Steel.
            <span className="block text-[#c4dcff]">Trust in Every Deal.</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#d6e3fe]/90 max-w-2xl leading-relaxed mb-8">
            Your trusted destination for prime Cold Rolled (CR) and Zinc / Galvanized Iron (GI) steel sheets.
            Serving retail fabricators and wholesale infrastructure projects with deep metallurgy expertise and unwavering regional commitment in Vijayawada.
          </p>

          {/* CTA Action Cluster */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
            <a
              href="#products-section"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#d3e4ff] text-[#011c37] font-bold text-sm shadow-md hover:bg-white hover:text-[#00020b] transition-all hover:-translate-y-0.5"
            >
              <span>Explore Products</span>
              <ArrowRight size={16} />
            </a>

            <Link
              to="/calculator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-bold text-sm backdrop-blur-sm border border-white/20 transition-all hover:-translate-y-0.5"
            >
              <Calculator size={16} className="text-blue-300" />
              <span>Calculate Weight &amp; Price</span>
            </Link>

            <a
              href="https://wa.me/919246473280?text=Hello%20SV%20Steel%20Centre,%20I%20need%20a%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all hover:-translate-y-0.5"
            >
              <MessageSquare size={16} />
              <span>Direct WhatsApp Enquiry</span>
            </a>
          </div>
        </div>

        {/* Verified Steel Suppliers Horizontal Ticker from Stitch */}
        <div className="pt-2 bg-[#00020b]/40 rounded-xl p-4 sm:p-6 backdrop-blur-md border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#c4dcff] shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Authorized Mills &amp; Brands</p>
                <p className="text-[#b1c8ea] text-xs">Tata Steel, JSW Steel, Jindal, AM/NS India</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#c4dcff] shrink-0">
                <Warehouse size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Ready Stock in Bhavanipuram</p>
                <p className="text-[#b1c8ea] text-xs">Immediate Yard Dispatch &amp; Direct Loading</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#c4dcff] shrink-0">
                <Ruler size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Precision Cut &amp; Gauge Assured</p>
                <p className="text-[#b1c8ea] text-xs">Standard Density 7,850 kg/m³ Tolerances</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
