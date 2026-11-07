import { useState } from 'react';
import { parseDimensionToMm, mmToFeet } from '../utils/conversion';
import { calcEstimate, formatINR } from '../utils/priceCalculator';
import { BRANDS, THICKNESS_OPTIONS_CR, THICKNESS_OPTIONS_GI } from '../data/brands';
import { Calculator, AlertCircle } from 'lucide-react';

const CATEGORIES = [
    { value: 'CR', label: 'CR Sheets (Cold Rolled)' },
    { value: 'GI', label: 'Zinc / GI Sheets (Galvanized)' },
];

const UNITS = ['mm', 'ft'];

export default function PriceCalculator() {
    const [unit, setUnit] = useState('mm');
    const [category, setCategory] = useState('CR');
    const [brand, setBrand] = useState('');
    const [thickness, setThick] = useState('');
    const [widthVal, setWidth] = useState('');
    const [lengthVal, setLength] = useState('');
    const [qty, setQty] = useState(1);
    const [rate, setRate] = useState('');   // ₹/kg entered by user (demo only)
    const [result, setResult] = useState(null);

    const thicknessOptions = category === 'CR' ? THICKNESS_OPTIONS_CR : THICKNESS_OPTIONS_GI;

    const calculate = () => {
        const tMm = parseFloat(thickness);
        const wMm = parseDimensionToMm(widthVal, unit);
        const lMm = parseDimensionToMm(lengthVal, unit);
        const q = parseInt(qty) || 1;
        const r = parseFloat(rate) || null;

        if (!tMm || !wMm || !lMm) return;
        setResult(calcEstimate({ lengthMm: lMm, widthMm: wMm, thicknessMm: tMm, pricePerKg: r, quantity: q }));
    };

    const reset = () => {
        setResult(null);
        setThick('');
        setWidth('');
        setLength('');
        setQty(1);
        setRate('');
    };

    return (
        <div className="bg-white border border-[#D1D9E4] rounded-2xl p-7 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Calculator size={18} className="text-blue-700" />
                </div>
                <div>
                    <h3 className="font-heading font-bold text-[#172438] text-base">Price &amp; Weight Calculator</h3>
                    <p className="text-[#4A6080] text-xs">Approximate estimate only — not a final quote.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Category */}
                <div>
                    <label className="block text-xs font-semibold text-[#263D59] mb-1.5" htmlFor="calc-cat">Material Category</label>
                    <select id="calc-cat" className="form-input text-sm" value={category} onChange={(e) => { setCategory(e.target.value); setThick(''); }}>
                        {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                </div>

                {/* Brand */}
                <div>
                    <label className="block text-xs font-semibold text-[#263D59] mb-1.5" htmlFor="calc-brand">Brand</label>
                    <select id="calc-brand" className="form-input text-sm" value={brand} onChange={(e) => setBrand(e.target.value)}>
                        <option value="">Select Brand</option>
                        {BRANDS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                </div>

                {/* Thickness */}
                <div>
                    <label className="block text-xs font-semibold text-[#263D59] mb-1.5" htmlFor="calc-thick">Thickness (mm)</label>
                    <select id="calc-thick" className="form-input text-sm" value={thickness} onChange={(e) => setThick(e.target.value)}>
                        <option value="">Select Thickness</option>
                        {thicknessOptions.map((t) => <option key={t} value={t}>{t} mm</option>)}
                    </select>
                </div>

                {/* Dimension Unit */}
                <div>
                    <label className="block text-xs font-semibold text-[#263D59] mb-1.5">Dimension Unit</label>
                    <div className="flex rounded-lg overflow-hidden border border-[#D1D9E4]">
                        {UNITS.map((u) => (
                            <button key={u} type="button"
                                onClick={() => setUnit(u)}
                                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${unit === u ? 'bg-[#101D32] text-white' : 'bg-white text-[#4A6080] hover:bg-[#F3F6FA]'
                                    }`}
                                aria-pressed={unit === u}
                            >
                                {u.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Width */}
                <div>
                    <label className="block text-xs font-semibold text-[#263D59] mb-1.5" htmlFor="calc-width">Width ({unit})</label>
                    <input id="calc-width" type="number" min="1" step="any" placeholder={`e.g. ${unit === 'mm' ? '1219' : '4'}`}
                        className="form-input text-sm" value={widthVal} onChange={(e) => setWidth(e.target.value)} />
                </div>

                {/* Length */}
                <div>
                    <label className="block text-xs font-semibold text-[#263D59] mb-1.5" htmlFor="calc-length">Length ({unit})</label>
                    <input id="calc-length" type="number" min="1" step="any" placeholder={`e.g. ${unit === 'mm' ? '2438' : '8'}`}
                        className="form-input text-sm" value={lengthVal} onChange={(e) => setLength(e.target.value)} />
                </div>

                {/* Rate */}
                <div>
                    <label className="block text-xs font-semibold text-[#263D59] mb-1.5" htmlFor="calc-rate">Rate (₹/kg) — optional</label>
                    <input id="calc-rate" type="number" min="0" step="0.01" placeholder="e.g. 65.00 (demo)"
                        className="form-input text-sm" value={rate} onChange={(e) => setRate(e.target.value)} />
                </div>

                {/* Quantity */}
                <div>
                    <label className="block text-xs font-semibold text-[#263D59] mb-1.5" htmlFor="calc-qty">Quantity (sheets)</label>
                    <input id="calc-qty" type="number" min="1" step="1" placeholder="1"
                        className="form-input text-sm" value={qty} onChange={(e) => setQty(e.target.value)} />
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <button type="button" onClick={calculate}
                    className="flex-1 bg-[#101D32] hover:bg-[#263D59] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200">
                    Calculate
                </button>
                <button type="button" onClick={reset}
                    className="px-5 border border-[#D1D9E4] hover:bg-[#F3F6FA] text-[#172438] font-semibold text-sm py-3 rounded-xl transition-all duration-200">
                    Reset
                </button>
            </div>

            {/* Result */}
            {result && (
                <div className="mt-6 bg-[#F3F6FA] border border-[#D1D9E4] rounded-xl p-5 animate-fade-in">
                    <h4 className="font-heading font-bold text-[#172438] text-sm mb-4">Estimate Result</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                        <ResultRow label="Weight / Sheet" value={`${result.weightPerSheet} kg`} />
                        <ResultRow label="Quantity" value={`${result.quantity} sheets`} />
                        <ResultRow label="Total Weight" value={`${result.totalWeight} kg`} />
                        <ResultRow label="Rate" value={result.pricePerKg ? `₹ ${result.pricePerKg}/kg` : 'Not provided'} />
                        <ResultRow label="Price / Sheet" value={result.pricePerSheet ? formatINR(result.pricePerSheet) : '—'} />
                        <ResultRow label="Total Estimate" value={result.totalEstimate ? formatINR(result.totalEstimate) : '—'} highlight />
                    </div>
                    {/* Disclaimer */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                        <AlertCircle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-[10px] text-amber-800 leading-snug">
                            Prices and weights are approximate. Final rates, actual material weight, GST and other applicable charges will be confirmed by Sri Venkateswara Steel Centre.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function ResultRow({ label, value, highlight }) {
    return (
        <div className={`p-3 rounded-lg ${highlight ? 'bg-[#101D32] col-span-2' : 'bg-white border border-[#D1D9E4]'}`}>
            <p className={`text-[10px] uppercase tracking-widest font-semibold mb-1 ${highlight ? 'text-blue-300' : 'text-[#4A6080]'}`}>{label}</p>
            <p className={`font-heading font-bold text-sm ${highlight ? 'text-white' : 'text-[#172438]'}`}>{value}</p>
        </div>
    );
}
