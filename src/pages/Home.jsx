import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ProductCard from '../components/ProductCard';
import QuickCalculator from '../components/QuickCalculator';
import WhyUs from '../components/WhyUs';
import About from '../components/About';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main className="w-full bg-[#f9f9ff]">
      <Hero />
      <Stats />
      <ProductCard />
      <QuickCalculator />
      <WhyUs />
      <About />
      <Contact />
    </main>
  );
}
