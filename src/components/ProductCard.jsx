import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, ShieldCheck, Cpu } from 'lucide-react';

export default function ProductCard() {
  return (
    <section className="w-full bg-[#f9f9ff] py-16 lg:py-24" id="products-section" aria-labelledby="products-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#49607e] block mb-1">
              Certified Mill Inventory
            </span>
            <h2 id="products-title" className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0e1c2f] tracking-tight">
              Prime Industrial Steel Sheets
            </h2>
          </div>
          <p className="text-sm text-[#44474d] max-w-md leading-relaxed">
            Sourced directly from certified integrated mills (Tata Steel, JSW, Jindal, AM/NS) with full chemical and mechanical grade traceability.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CATEGORY 1: CR SHEETS */}
          <div className="rounded-2xl overflow-hidden bg-white shadow-md border border-[#c5c6cd]/40 flex flex-col group hover:shadow-xl transition-all">
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#101d32]">
              <img
                src="/cr-sheets.jpg"
                alt="Cold Rolled CR Sheets with Precision Digital Micrometer Gauge Inspection"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded bg-[#101d32] text-white text-xs font-bold tracking-wider uppercase shadow-sm">
                  IS 513 / CRCA Grade
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-[#0e1c2f] text-xs font-bold shadow-md">
                Indicative: Approx ₹68 - ₹78 / kg
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0e1c2f]">
                    Cold Rolled (CR) Sheets
                  </h3>
                  <Cpu className="text-[#49607e]" size={22} />
                </div>
                <p className="text-xs font-bold text-[#49607e] uppercase tracking-wider mb-3">
                  CRCA • Cold Rolled Close Annealed
                </p>
                <p className="text-sm text-[#44474d] leading-relaxed mb-6">
                  Featuring an ultra-smooth oiled surface finish, exceptional dimensional uniformity, and superior deep-drawing capability. Engineered specifically for precision enclosures, electrical switchgear boxes, control cabinets, and automobile panels.
                </p>

                {/* Technical Specifications Matrix */}
                <div className="bg-[#f0f3ff] rounded-xl p-4 mb-6 border border-[#dee8ff]">
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                    <div>
                      <span className="text-[#44474d] font-medium block">Thickness Span:</span>
                      <span className="font-bold text-[#0e1c2f]">0.50 mm – 3.20 mm</span>
                    </div>
                    <div>
                      <span className="text-[#44474d] font-medium block">Standard Widths:</span>
                      <span className="font-bold text-[#0e1c2f]">914, 1220, 1250, 1500 mm</span>
                    </div>
                    <div>
                      <span className="text-[#44474d] font-medium block">Stock Formats:</span>
                      <span className="font-bold text-[#0e1c2f]">Cut Sheets &amp; Slit Coils</span>
                    </div>
                    <div>
                      <span className="text-[#44474d] font-medium block">Mill Brands:</span>
                      <span className="font-bold text-[#0e1c2f]">JSW Steel, Tata, Jindal</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
                <Link
                  to="/products/cr-sheets"
                  className="inline-flex items-center text-[#101d32] font-bold text-sm hover:text-blue-700 transition-colors gap-1.5"
                >
                  <span>Explore CR Sheets Catalogue</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/calculator?material=CR"
                  className="px-4 py-2 rounded-lg bg-[#e7eeff] text-[#011c37] text-xs font-bold hover:bg-[#dee8ff] transition-colors inline-flex items-center gap-1.5"
                >
                  <Calculator size={14} />
                  <span>Calculate CR Weight</span>
                </Link>
              </div>
            </div>
          </div>

          {/* CATEGORY 2: ZINC / GI SHEETS */}
          <div className="rounded-2xl overflow-hidden bg-white shadow-md border border-[#c5c6cd]/40 flex flex-col group hover:shadow-xl transition-all">
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#101d32]">
              <img
                src="/gi-sheets.jpg"
                alt="Galvanized Iron GI Zinc Coated Steel Sheets on Wooden Pallets Bhavanipuram"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded bg-[#49607e] text-white text-xs font-bold tracking-wider uppercase shadow-sm">
                  IS 277 / Hot-Dip Galvanized
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-[#0e1c2f] text-xs font-bold shadow-md">
                Coating: 90 to 275 GSM
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0e1c2f]">
                    Zinc / GI Sheets
                  </h3>
                  <ShieldCheck className="text-[#49607e]" size={22} />
                </div>
                <p className="text-xs font-bold text-[#49607e] uppercase tracking-wider mb-3">
                  Galvanized Iron • Spangled Corrosion Defense
                </p>
                <p className="text-sm text-[#44474d] leading-relaxed mb-6">
                  Continuous hot-dip pure zinc coating providing galvanic sacrifice protection against heavy coastal humidity and weather exposure. Ideal for HVAC ducting, agricultural silos, outdoor structures, roofing, and industrial enclosures.
                </p>

                {/* Technical Specifications Matrix */}
                <div className="bg-[#f0f3ff] rounded-xl p-4 mb-6 border border-[#dee8ff]">
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                    <div>
                      <span className="text-[#44474d] font-medium block">Thickness Span:</span>
                      <span className="font-bold text-[#0e1c2f]">0.35 mm – 2.50 mm</span>
                    </div>
                    <div>
                      <span className="text-[#44474d] font-medium block">Standard Feet Cuts:</span>
                      <span className="font-bold text-[#0e1c2f]">3×8 ft, 4×8 ft, 4×10 ft</span>
                    </div>
                    <div>
                      <span className="text-[#44474d] font-medium block">Spangle Grain:</span>
                      <span className="font-bold text-[#0e1c2f]">Regular / Zero Spangle</span>
                    </div>
                    <div>
                      <span className="text-[#44474d] font-medium block">Mill Brands:</span>
                      <span className="font-bold text-[#0e1c2f]">JSW Vishwas, Tata Shaktee</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
                <Link
                  to="/products/zinc-gi-sheets"
                  className="inline-flex items-center text-[#101d32] font-bold text-sm hover:text-blue-700 transition-colors gap-1.5"
                >
                  <span>Explore Zinc / GI Catalogue</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/calculator?material=GI"
                  className="px-4 py-2 rounded-lg bg-[#e7eeff] text-[#011c37] text-xs font-bold hover:bg-[#dee8ff] transition-colors inline-flex items-center gap-1.5"
                >
                  <Calculator size={14} />
                  <span>Calculate GI Weight</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
