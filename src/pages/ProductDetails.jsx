import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, AlertCircle, MessageCircle, ArrowLeft } from 'lucide-react';
import { fetchProductById } from '../services/api';
import { calcSheetWeight, formatINR } from '../utils/priceCalculator';
import { mmToFeet } from '../utils/conversion';
import ProductSelector from '../components/ProductSelector';
import PriceCalculator from '../components/PriceCalculator';

const WHATSAPP = '919999999999';
const IMAGES = {
    CR: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    GI: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80',
};

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductById(id).then((p) => { setProduct(p); setLoading(false); });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F3F6FA] pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="skeleton h-8 w-48 mx-auto mb-4" />
                    <div className="skeleton h-4 w-64 mx-auto" />
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#F3F6FA] flex flex-col items-center justify-center pt-24 text-center px-4">
                <AlertCircle size={48} className="text-red-400 mb-4" />
                <h1 className="font-heading font-bold text-[#172438] text-2xl mb-2">Product Not Found</h1>
                <p className="text-[#4A6080] text-sm mb-6">The product you are looking for could not be found.</p>
                <Link to="/products/cr-sheets" className="bg-[#101D32] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#263D59] transition-colors">
                    Browse Products
                </Link>
            </div>
        );
    }

    const weight = calcSheetWeight(product.lengthMm, product.widthMm, product.thicknessMm, product.densityKgM3);
    const catPath = product.category === 'CR' ? '/products/cr-sheets' : '/products/zinc-gi-sheets';
    const waMsg = encodeURIComponent(
        `Hello, I want to enquire about: ${product.name} (Brand: ${product.brand}, ${product.thicknessMm}mm, ${product.widthMm}×${product.lengthMm}mm). Please share the current price.`
    );

    return (
        <>
            <title>{product.name} – SV Steel Centre</title>

            {/* Breadcrumb */}
            <div className="bg-[#101D32] pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
                    <nav className="flex items-center gap-1.5 text-[#B9C4D0] text-xs mb-4" aria-label="Breadcrumb">
                        <Link to="/" className="hover:text-white">Home</Link>
                        <ChevronRight size={10} />
                        <Link to={catPath} className="hover:text-white">{product.category === 'CR' ? 'CR Sheets' : 'Zinc / GI Sheets'}</Link>
                        <ChevronRight size={10} />
                        <span className="text-white truncate max-w-xs">{product.name}</span>
                    </nav>
                    <Link to={catPath} className="inline-flex items-center gap-1.5 text-[#B9C4D0] text-xs hover:text-white mb-2">
                        <ArrowLeft size={13} /> Back to {product.category === 'CR' ? 'CR Sheets' : 'GI Sheets'}
                    </Link>
                </div>
            </div>

            {/* Sample notice */}
            <div className="bg-amber-50 border-b border-amber-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-amber-800 text-xs">
                    <AlertCircle size={13} /> <strong>Sample data</strong> — Specifications and images are illustrative. Prices will be confirmed by SV Steel Centre.
                </div>
            </div>

            <div className="bg-[#F3F6FA] py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                        {/* Left: image + specs */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="rounded-2xl overflow-hidden border border-[#D1D9E4] shadow-sm bg-[#263D59] h-72">
                                <img
                                    src={IMAGES[product.category]}
                                    alt={product.name}
                                    className="w-full h-full object-cover opacity-70"
                                    loading="lazy"
                                />
                            </div>

                            {/* Spec table */}
                            <div className="bg-white border border-[#D1D9E4] rounded-2xl p-6">
                                <h3 className="font-heading font-bold text-[#172438] text-sm mb-4 uppercase tracking-wide">Specifications</h3>
                                <table className="w-full text-sm">
                                    <tbody>
                                        {[
                                            ['Category', product.category === 'CR' ? 'Cold Rolled (CR)' : 'Galvanized Iron (GI)'],
                                            ['Brand', product.brand],
                                            ['Thickness', `${product.thicknessMm} mm`],
                                            ['Width', `${product.widthMm} mm (${mmToFeet(product.widthMm).toFixed(2)} ft)`],
                                            ['Length', `${product.lengthMm} mm (${mmToFeet(product.lengthMm).toFixed(2)} ft)`],
                                            ['Est. Weight', `${weight.toFixed(3)} kg / sheet`],
                                            ['Density', `${product.densityKgM3} kg/m³ (approx.)`],
                                            ['Price/kg', product.pricePerKg ? `₹ ${product.pricePerKg}` : 'Contact for price'],
                                            ['Stock', product.available ? 'In Stock' : 'Out of Stock'],
                                        ].map(([k, v]) => (
                                            <tr key={k} className="border-b border-[#F3F6FA] last:border-none">
                                                <td className="py-2.5 text-[#4A6080] text-xs font-semibold uppercase tracking-widest w-36">{k}</td>
                                                <td className="py-2.5 text-[#172438] font-medium">{v}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Right: enquiry + calculator */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Title block */}
                            <div className="bg-white border border-[#D1D9E4] rounded-2xl p-7">
                                <span className="badge badge-blue text-xs mb-3 inline-block">{product.brand}</span>
                                <h1 className="text-2xl lg:text-3xl font-heading font-extrabold text-[#172438] mb-2">{product.name}</h1>
                                <p className="text-[#4A6080] text-sm mb-5">{product.notes}</p>
                                <div className="flex gap-3">
                                    <a href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors">
                                        <MessageCircle size={15} /> Enquire on WhatsApp
                                    </a>
                                </div>
                            </div>

                            {/* Enquiry form */}
                            <div className="bg-white border border-[#D1D9E4] rounded-2xl p-7">
                                <ProductSelector defaultCategory={product.category} />
                            </div>

                            {/* Calculator */}
                            <PriceCalculator />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
