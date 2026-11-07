import About from '../components/About';
import WhyUs from '../components/WhyUs';

export default function AboutPage() {
  return (
    <main className="pt-24 bg-[#f9f9ff]">
      <div className="bg-[#101d32] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d6e3fe] block mb-2">
            Established 1989 • Vijayawada
          </span>
          <h1 className="font-heading text-3xl lg:text-5xl font-extrabold text-white mb-3">
            About SV Steel Centre
          </h1>
          <p className="text-[#c4dcff] text-sm sm:text-base max-w-2xl leading-relaxed">
            Over 35 years of metallurgical experience, trusted wholesale distribution, and premier flat steel supply in Bhavanipuram, Vijayawada.
          </p>
        </div>
      </div>
      <About />
      <WhyUs />
    </main>
  );
}
