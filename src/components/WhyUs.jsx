import { History, ShieldCheck, Scale, Scissors, Layers, Truck } from 'lucide-react';

export default function WhyUs() {
  const PILLARS = [
    {
      icon: History,
      title: '35+ Years Local Business Roots',
      desc: 'Deep relationships built across four decades in Bhavanipuram. We understand local machining tolerances, AP weather corrosion patterns, and project timelines.',
    },
    {
      icon: ShieldCheck,
      title: 'Direct Primary Brand Supply',
      desc: 'We procure verified prime coils from JSW Steel, Tata Steel, and Jindal. Mill Test Certificates (MTC) supplied upon request for commercial projects.',
    },
    {
      icon: Scale,
      title: 'Dual Weighbridge Verification',
      desc: 'Zero ambiguity in kilograms. All wholesale dispatches cross accredited commercial weighbridges, backed by physical micrometer gauge spot inspections.',
    },
    {
      icon: Scissors,
      title: 'Custom Dimensions in Feet & MM',
      desc: 'Whether your engineering blueprints are drafted in standard metric millimetres or field-carpentered in traditional feet, our yard cuts and supplies accurately.',
    },
    {
      icon: Layers,
      title: 'Retail & Bulk Flexibility',
      desc: 'We value individual walk-in fabricators needing 2 sheets as much as institutional contractors taking 40 tons for infrastructure erection.',
    },
    {
      icon: Truck,
      title: 'Speedy Dispatch Across AP',
      desc: 'Convenient Bhavani Shankara street corridor loading. Immediate overhead crane loading for commercial lorries, auto-trolleys, and inter-district haulers.',
    },
  ];

  return (
    <section className="w-full bg-[#f9f9ff] py-16 lg:py-24" aria-label="Why Choose SV Steel Centre">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#49607e] block mb-1">
            Uncompromising Standards
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0e1c2f] tracking-tight">
            Why Andhra Pradesh Builders &amp; OEMs Trust SV Steel Centre
          </h2>
          <p className="text-sm text-[#44474d] mt-2 leading-relaxed">
            From the heart of Bhavanipuram's industrial iron market, our dealership bridges primary producers with local fabrication realities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow border border-[#dee8ff]/80 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#f0f3ff] flex items-center justify-center text-[#101d32] mb-5 border border-[#dee8ff]">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#0e1c2f] mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#44474d] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
