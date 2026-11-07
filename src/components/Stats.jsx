export default function Stats() {
  const STATS = [
    {
      value: '35+',
      title: 'Years Regional Experience',
      desc: 'Established trade network catering continuously to Vijayawada, Krishna, Guntur & coastal AP fabricators.',
    },
    {
      value: '02',
      title: 'Core Specializations',
      desc: 'Laser-focused inventory on prime Cold Rolled (CR) and Zinc / Galvanized Iron (GI) steel sheets.',
    },
    {
      value: 'Retail & Bulk',
      title: 'Flexible Purchase Orders',
      desc: 'From single custom test sheets for small fabrication jobs to multi-bundle 25-ton trailer deliveries.',
    },
    {
      value: '₹ / kg',
      title: 'Transparent Billing',
      desc: 'Zero hidden surcharges. Clear theoretical and actual weighbridge invoicing verified on pickup.',
    },
  ];

  return (
    <section className="w-full bg-white py-12 lg:py-16 border-b border-gray-100" aria-label="Business highlights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#f0f3ff] hover:bg-[#e7eeff] transition-all shadow-sm border border-[#dee8ff]/60 group"
            >
              <span className="font-heading text-3xl sm:text-4xl text-[#00020b] font-black tracking-tight block group-hover:text-blue-900 transition-colors">
                {stat.value}
              </span>
              <span className="font-heading text-base text-[#0e1c2f] font-bold block mt-1.5">
                {stat.title}
              </span>
              <p className="text-xs sm:text-sm text-[#44474d] mt-2 leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
