import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, MessageCircle, ChevronRight, Package, Calculator } from 'lucide-react';
import ProductFilters from '../components/ProductFilters';
import PriceCalculator from '../components/PriceCalculator';
import { fetchCRProducts } from '../services/api';
import { formatINR, calcSheetWeight } from '../utils/priceCalculator';

const HERO_IMG = '/cr-sheets.jpg';
const WHATSAPP = '9246473280';

const INITIAL_FILTERS = { brand: '', thicknessMm: '', widthMm: '', lengthMm: '', available: '' };

export default function CRSheets() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [searchQ, setSearchQ] = useState('');

  useEffect(() => {
    fetchCRProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filters.brand && p.brand !== filters.brand) return false;
      if (filters.thicknessMm && p.thicknessMm !== filters.thicknessMm) return false;
      if (filters.widthMm && p.widthMm !== filters.widthMm) return false;
      if (filters.lengthMm && p.lengthMm !== filters.lengthMm) return false;
      if (filters.available !== '' && p.available !== filters.available) return false;
      if (
        searchQ &&
        !p.name.toLowerCase().includes(searchQ.toLowerCase()) &&
        !p.brand.toLowerCase().includes(searchQ.toLowerCase())
      )
        return false;
      return true;
    });
  }, [products, filters, searchQ]);

  const onFilterChange = (key, val) => setFilters((f) => ({ ...f, [key]: val }));
  const onFilterClear = () => {
    setFilters(INITIAL_FILTERS);
    setSearchQ('');
  };

  return (
    <>
      {/* Mini hero with real Stitch photograph */}
      <div className="relative bg-[#101d32] pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <nav className="flex items-center gap-1.5 text-[#b1c8ea] text-xs mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight size={10} />
            <span className="text-white font-semibold">CR Sheets</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-2">
            IS 513 / CRCA Quality Steel
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-extrabold text-white mb-2">
            Cold Rolled (CR) Sheets Catalogue
          </h1>
          <p className="text-[#c4dcff] text-sm max-w-xl leading-relaxed">
            Ultra-smooth oiled finish and superior deep-drawing capability. Sourced from JSW Steel, Tata Steel, and Jindal for electrical enclosures, auto components, and precision fabrication.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-[#f9f9ff] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <ProductFilters
                products={products}
                filters={filters}
                onChange={onFilterChange}
                onClear={onFilterClear}
                searchQ={searchQ}
                onSearch={setSearchQ}
              />
              <div className="mt-6">
                <PriceCalculator />
              </div>
            </aside>

            {/* Product Grid */}
            <main className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#dee8ff]">
                      <div className="skeleton h-40" />
                      <div className="p-4 space-y-3">
                        <div className="skeleton h-4 w-3/4" />
                        <div className="skeleton h-3 w-1/2" />
                        <div className="skeleton h-8 rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <Package size={48} className="text-[#49607e] mb-4" />
                  <h3 className="font-heading font-bold text-[#0e1c2f] text-lg mb-2">No products found</h3>
                  <p className="text-[#44474d] text-sm mb-4">Try adjusting the filters or search term.</p>
                  <button onClick={onFilterClear} className="text-blue-600 text-sm hover:underline font-bold">
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-[#44474d] text-sm font-semibold">
                      {filtered.length} product{filtered.length !== 1 ? 's' : ''} available in stock
                    </p>
                    <Link
                      to="/calculator?material=CR"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101d32] hover:text-blue-700"
                    >
                      <Calculator size={14} />
                      <span>Open Batch Weight Calculator</span>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map((p) => (
                      <ProductItemCard key={p.id} product={p} waNumber={WHATSAPP} />
                    ))}
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductItemCard({ product: p, waNumber }) {
  const weight = calcSheetWeight(p.lengthMm, p.widthMm, p.thicknessMm, p.densityKgM3);
  const waMsg = encodeURIComponent(
    `Hello Sri Venkateswara Steel Centre, I am inquiring about:\n` +
      `• Product: ${p.name}\n` +
      `• Brand: ${p.brand}\n` +
      `• Thickness: ${p.thicknessMm} mm\n` +
      `• Size: ${p.widthMm} mm × ${p.lengthMm} mm\n` +
      `Please confirm stock in Bhavanipuram yard and current price per kg.`
  );

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-[#dee8ff] card-hover shadow-sm flex flex-col">
      <div className="h-44 bg-[#101d32] flex items-center justify-center relative overflow-hidden">
        <img
          src={p.image || '/cr-sheets.jpg'}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101d32]/70 via-transparent to-transparent" />
        <span
          className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded ${
            p.available ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {p.available ? 'In Stock' : 'Call for Booking'}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#dee8ff] text-[#00020b]">
            {p.brand}
          </span>
          <span className="text-[10px] font-mono text-[#49607e] font-semibold">IS 513 CRCA</span>
        </div>
        <h3 className="font-heading font-bold text-[#0e1c2f] text-base mt-2 mb-2">{p.name}</h3>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4 text-xs bg-[#f9f9ff] p-3 rounded-lg border border-gray-100">
          <Spec label="Thickness" value={`${p.thicknessMm} mm`} />
          <Spec label="Width" value={`${p.widthMm} mm`} />
          <Spec label="Length" value={`${p.lengthMm} mm`} />
          <Spec label="Est. Wt." value={`${weight.toFixed(2)} kg`} />
          <Spec label="Rate" value={p.pricePerKg ? `₹ ${p.pricePerKg}/kg` : 'Approx ₹72/kg'} />
          <Spec label="Category" value={p.category} />
        </div>

        <div className="mt-auto flex gap-2">
          <Link
            to={`/products/details/${p.id}`}
            className="flex-1 text-center bg-[#101d32] hover:bg-[#1a2d4c] text-white font-semibold text-xs py-2.5 rounded-lg transition-colors"
          >
            View Details
          </Link>
          <a
            href={`https://wa.me/${waNumber}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center transition-colors"
            title="Enquire on WhatsApp"
            aria-label={`WhatsApp enquiry for ${p.name}`}
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}

function Spec({ label, value }) {
  return (
    <div>
      <span className="text-[#49607e] text-[10px] uppercase tracking-wider font-semibold block">{label}</span>
      <div className="text-[#0e1c2f] font-bold text-xs">{value}</div>
    </div>
  );
}
