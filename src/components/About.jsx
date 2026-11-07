import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <section className="w-full bg-[#f0f3ff] py-16 lg:py-24 border-t border-[#dee8ff]" aria-label="About Sri Venkateswara Steel Centre">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-widest text-[#49607e] block mb-1">
              Our Heritage
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0e1c2f] tracking-tight mb-6">
              Serving Vijayawada’s Industrial Backbone Since 1989
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#44474d] leading-relaxed">
              <p>
                Founded in 1989, <strong className="text-[#0e1c2f]">Sri Venkateswara Steel Centre (SV Steel Centre)</strong> started with a clear industrial objective: to give coastal Andhra Pradesh fabricators and manufacturers seamless, fair, and reliable access to flat steel products without prohibitive minimum order barriers.
              </p>
              <p>
                Situated at the epicentre of Vijayawada's commercial iron trade in Bhavanipuram, we have witnessed the region's transformation into a bustling industrial and commercial corridor. Throughout, our commitment has remained rock-solid: providing solely genuine primary-grade Cold Rolled (CR) and Zinc / Galvanized (GI) sheets.
              </p>
              <p>
                Today, our experienced yard team provides technical guidance on sheet thickness gauges, zinc GSM coatings, and theoretical-to-actual weight calculations to hundreds of engineering workshops, electrical panel builders, and regional infrastructure contractors.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#101d32] text-white font-bold text-sm hover:bg-[#1a2d4c] transition-all shadow-sm"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#101d32] font-bold text-sm border border-[#dee8ff] hover:bg-[#dee8ff] transition-all"
              >
                <span>Visit Bhavanipuram Depot</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#dee8ff]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#101d32] text-white flex items-center justify-center font-heading font-black text-xl">
                  35+
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#0e1c2f]">Years in Iron &amp; Steel</h4>
                  <p className="text-xs text-[#49607e]">Bhavanipuram, Vijayawada</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#44474d]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Authorized distributor of Tata, JSW &amp; Jindal coils</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Dual certified commercial weighbridge on-site</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Overhead gantry crane for prompt lorry loading</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Custom shearing &amp; cut-to-length in mm &amp; feet</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#101d32] text-white rounded-2xl p-6 sm:p-8 shadow-md">
              <span className="text-xs uppercase tracking-wider text-[#d6e3fe] font-bold block mb-1">
                Depot Location
              </span>
              <p className="font-heading font-bold text-lg text-white mb-2">
                Bhavanipuram Iron &amp; Hardware Market
              </p>
              <p className="text-xs sm:text-sm text-[#c4dcff] leading-relaxed mb-4">
                Door No. 11-23-45, Main Road, Bhavanipuram, Vijayawada – 520012, Andhra Pradesh, India.
              </p>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-emerald-400 font-bold">Yard Hours: Mon - Sat 9 AM - 8 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
