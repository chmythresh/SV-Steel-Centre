import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calculator, Send, Printer, Info, ShieldCheck, Scale, Check, RefreshCw } from 'lucide-react';

const DENSITY_CR = 7850;
const DENSITY_GI = 7870;

const THICKNESS_PRESETS = [0.40, 0.50, 0.60, 0.80, 1.00, 1.20, 1.60, 2.00, 2.50, 3.00, 3.20];

const DIMENSION_PRESETS = [
  { label: '4 × 8 ft (1220 × 2438 mm)', wFt: 4, lFt: 8 },
  { label: '3 × 8 ft (914 × 2438 mm)', wFt: 3, lFt: 8 },
  { label: '4 × 10 ft (1220 × 3048 mm)', wFt: 4, lFt: 10 },
  { label: '4 × 6.5 ft (1220 × 2000 mm)', wFt: 4, lFt: 6.56 },
];

const BRANDS = ['JSW Steel', 'Tata Steel', 'Jindal Steel', 'AM/NS India', 'Commercial Grade'];

export default function CalculatorPage() {
  const [searchParams] = useSearchParams();
  const initMat = searchParams.get('material') === 'GI' ? 'GI' : 'CR';

  const [material, setMaterial] = useState(initMat);
  const [brand, setBrand] = useState('JSW Steel');
  const [thickness, setThickness] = useState(1.20);
  const [unit, setUnit] = useState('ft'); // 'ft' or 'mm'

  const [widthFt, setWidthFt] = useState(4);
  const [lengthFt, setLengthFt] = useState(8);

  const [widthMm, setWidthMm] = useState(1219.2);
  const [lengthMm, setLengthMm] = useState(2438.4);

  const [quantity, setQuantity] = useState(10);
  const [baseRate, setBaseRate] = useState(initMat === 'GI' ? 82 : 72);

  // Sync dimension changes
  const handleWidthFtChange = (val) => {
    setWidthFt(val);
    setWidthMm(+(val * 304.8).toFixed(1));
  };
  const handleLengthFtChange = (val) => {
    setLengthFt(val);
    setLengthMm(+(val * 304.8).toFixed(1));
  };
  const handleWidthMmChange = (val) => {
    setWidthMm(val);
    setWidthFt(+(val / 304.8).toFixed(2));
  };
  const handleLengthMmChange = (val) => {
    setLengthMm(val);
    setLengthFt(+(val / 304.8).toFixed(2));
  };

  const applyPreset = (preset) => {
    handleWidthFtChange(preset.wFt);
    handleLengthFtChange(preset.lFt);
  };

  const density = material === 'CR' ? DENSITY_CR : DENSITY_GI;

  // Compute weight
  const widthM = widthMm / 1000;
  const lengthM = lengthMm / 1000;
  const thicknessM = thickness / 1000;

  const areaSqM = widthM * lengthM;
  const areaSqFt = widthFt * lengthFt;

  const singleWeightKg = useMemo(() => {
    return widthM * lengthM * thicknessM * density;
  }, [widthM, lengthM, thicknessM, density]);

  const totalWeightKg = singleWeightKg * quantity;
  const totalTonnageMt = totalWeightKg / 1000;

  const subtotal = totalWeightKg * baseRate;
  const gstAmount = subtotal * 0.18;
  const grandTotal = subtotal + gstAmount;

  // WhatsApp text
  const rawWhatsAppText =
    `*Quote Request — Sri Venkateswara Steel Centre*\n` +
    `---------------------------------------\n` +
    `• *Material:* ${material === 'CR' ? 'Cold Rolled (CR) IS 513' : 'Galvanized Iron (GI) IS 277'}\n` +
    `• *Brand:* ${brand}\n` +
    `• *Thickness:* ${thickness.toFixed(2)} mm\n` +
    `• *Sheet Dimensions:* ${widthFt} ft × ${lengthFt} ft (${widthMm} mm × ${lengthMm} mm)\n` +
    `• *Quantity:* ${quantity} sheets\n` +
    `• *Est. Single Weight:* ${singleWeightKg.toFixed(2)} kg\n` +
    `• *Est. Total Weight:* ${totalWeightKg.toFixed(2)} kg (${totalTonnageMt.toFixed(3)} MT)\n` +
    `• *Base Rate Est.:* ₹${baseRate}/kg (₹${Math.round(subtotal).toLocaleString('en-IN')} + GST)\n` +
    `---------------------------------------\n` +
    `Please confirm ready stock at Bhavanipuram depot and current commercial dispatch quote.`;

  const whatsappUrl = `https://wa.me/919246473280?text=${encodeURIComponent(rawWhatsAppText)}`;

  return (
    <div className="pt-28 pb-20 bg-[#f9f9ff] min-h-screen">
      {/* Top Standard Strip */}
      <section className="w-full bg-[#f0f3ff] px-4 sm:px-6 lg:px-8 py-2.5 border-b border-[#dee8ff]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-[#49607e]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0e1c2f]">Technical Standards:</span>
            <span>{material === 'CR' ? 'IS 513:2016 (Cold Rolled Low Carbon)' : 'IS 277:2018 (Galvanized Steel)'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Density Reference: <strong>{density} kg/m³</strong></span>
            <span>Tolerance: <strong>±0.03 mm Micrometer Calibrated</strong></span>
          </div>
        </div>
      </section>

      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-md bg-[#dee8ff] text-[#00020b] text-xs font-bold uppercase tracking-wider">
              <Calculator size={14} />
              <span>Metallurgical Compute Console</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#00020b] tracking-tight">
              Steel Sheet Weight &amp; Price Calculator
            </h1>
            <p className="text-sm sm:text-base text-[#44474d] mt-2">
              Instant Bureau of Indian Standards theoretical weight calculation with live mm / feet dimension conversion and direct WhatsApp quotation generator.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-xs border border-[#dee8ff] flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-[#e7eeff] flex items-center justify-center text-[#101d32]">
              <Scale size={20} />
            </div>
            <div className="text-xs">
              <span className="text-[#49607e] font-bold block uppercase">Depot Availability</span>
              <span className="text-sm font-bold text-[#0e1c2f]">Bhavanipuram Ready Yard</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dual-Panel Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PANEL: Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-[#dee8ff] p-6 sm:p-8 flex flex-col gap-6">
            {/* Step 1: Material Grade */}
            <div>
              <label className="text-xs font-bold text-[#00020b] uppercase tracking-wider block mb-2.5">
                1. Material Grade &amp; Surface Treatment
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMaterial('CR');
                    if (baseRate === 82) setBaseRate(72);
                  }}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    material === 'CR'
                      ? 'bg-[#101d32] text-white border-[#101d32] shadow-md'
                      : 'bg-[#f9f9ff] text-[#0e1c2f] border-[#dee8ff] hover:bg-[#f0f3ff]'
                  }`}
                >
                  <div className="font-heading font-bold text-base flex items-center justify-between">
                    <span>Cold Rolled (CR)</span>
                    {material === 'CR' && <Check size={16} className="text-emerald-400" />}
                  </div>
                  <div className="text-xs mt-1 text-[#c4dcff]">
                    Density: 7,850 kg/m³ • IS 513 CRCA
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMaterial('GI');
                    if (baseRate === 72) setBaseRate(82);
                  }}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    material === 'GI'
                      ? 'bg-[#101d32] text-white border-[#101d32] shadow-md'
                      : 'bg-[#f9f9ff] text-[#0e1c2f] border-[#dee8ff] hover:bg-[#f0f3ff]'
                  }`}
                >
                  <div className="font-heading font-bold text-base flex items-center justify-between">
                    <span>Galvanized Iron (GI / Zinc)</span>
                    {material === 'GI' && <Check size={16} className="text-emerald-400" />}
                  </div>
                  <div className="text-xs mt-1 text-[#c4dcff]">
                    Density: 7,870 kg/m³ • IS 277 (90-275 GSM)
                  </div>
                </button>
              </div>
            </div>

            {/* Brand Authority */}
            <div>
              <label className="text-xs font-bold text-[#44474d] uppercase block mb-2">
                Mill Brand Authority
              </label>
              <div className="flex flex-wrap gap-2">
                {BRANDS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBrand(b)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      brand === b
                        ? 'bg-[#101d32] text-white shadow-xs'
                        : 'bg-[#f0f3ff] text-[#44474d] hover:bg-[#dee8ff]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Thickness Selection */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-[#00020b] uppercase tracking-wider">
                  2. Sheet Thickness (Gauge in mm)
                </label>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {thickness.toFixed(2)} mm
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {THICKNESS_PRESETS.map((thk) => (
                  <button
                    key={thk}
                    type="button"
                    onClick={() => setThickness(thk)}
                    className={`py-2 text-center text-xs font-bold rounded-lg transition-all ${
                      thickness === thk
                        ? 'bg-[#101d32] text-white shadow-sm'
                        : 'bg-[#f0f3ff] text-[#0e1c2f] hover:bg-[#dee8ff]'
                    }`}
                  >
                    {thk.toFixed(2)} mm
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Dimensions */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <label className="text-xs font-bold text-[#00020b] uppercase tracking-wider">
                  3. Dimensions ({unit.toUpperCase()})
                </label>

                {/* Unit Switcher */}
                <div className="inline-flex rounded-lg bg-[#f0f3ff] p-0.5 border border-[#dee8ff]">
                  <button
                    type="button"
                    onClick={() => setUnit('ft')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                      unit === 'ft' ? 'bg-[#101d32] text-white' : 'text-[#44474d]'
                    }`}
                  >
                    Feet (ft)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('mm')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                      unit === 'mm' ? 'bg-[#101d32] text-white' : 'text-[#44474d]'
                    }`}
                  >
                    Millimetres (mm)
                  </button>
                </div>
              </div>

              {/* Standard presets */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {DIMENSION_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#f0f3ff] text-[#49607e] hover:bg-[#dee8ff] transition-all"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Width & Length inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {unit === 'ft' ? (
                  <>
                    <div>
                      <label className="text-[11px] font-bold text-[#44474d] uppercase block mb-1">
                        Width in Feet
                      </label>
                      <div className="flex rounded-lg overflow-hidden bg-[#f0f3ff] border border-[#dee8ff]">
                        <input
                          type="number"
                          step="0.25"
                          min="0.5"
                          value={widthFt}
                          onChange={(e) => handleWidthFtChange(parseFloat(e.target.value) || 0)}
                          className="w-full bg-transparent px-4 py-2.5 font-bold text-base outline-none"
                        />
                        <span className="px-3 py-2.5 text-xs font-bold bg-[#dee8ff] flex items-center">
                          FT
                        </span>
                      </div>
                      <span className="text-[11px] text-[#49607e] mt-1 block">≈ {widthMm} mm</span>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#44474d] uppercase block mb-1">
                        Length in Feet
                      </label>
                      <div className="flex rounded-lg overflow-hidden bg-[#f0f3ff] border border-[#dee8ff]">
                        <input
                          type="number"
                          step="0.25"
                          min="0.5"
                          value={lengthFt}
                          onChange={(e) => handleLengthFtChange(parseFloat(e.target.value) || 0)}
                          className="w-full bg-transparent px-4 py-2.5 font-bold text-base outline-none"
                        />
                        <span className="px-3 py-2.5 text-xs font-bold bg-[#dee8ff] flex items-center">
                          FT
                        </span>
                      </div>
                      <span className="text-[11px] text-[#49607e] mt-1 block">≈ {lengthMm} mm</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-[11px] font-bold text-[#44474d] uppercase block mb-1">
                        Width in Millimetres
                      </label>
                      <div className="flex rounded-lg overflow-hidden bg-[#f0f3ff] border border-[#dee8ff]">
                        <input
                          type="number"
                          step="10"
                          min="100"
                          value={widthMm}
                          onChange={(e) => handleWidthMmChange(parseFloat(e.target.value) || 0)}
                          className="w-full bg-transparent px-4 py-2.5 font-bold text-base outline-none"
                        />
                        <span className="px-3 py-2.5 text-xs font-bold bg-[#dee8ff] flex items-center">
                          MM
                        </span>
                      </div>
                      <span className="text-[11px] text-[#49607e] mt-1 block">≈ {widthFt} ft</span>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#44474d] uppercase block mb-1">
                        Length in Millimetres
                      </label>
                      <div className="flex rounded-lg overflow-hidden bg-[#f0f3ff] border border-[#dee8ff]">
                        <input
                          type="number"
                          step="10"
                          min="100"
                          value={lengthMm}
                          onChange={(e) => handleLengthMmChange(parseFloat(e.target.value) || 0)}
                          className="w-full bg-transparent px-4 py-2.5 font-bold text-base outline-none"
                        />
                        <span className="px-3 py-2.5 text-xs font-bold bg-[#dee8ff] flex items-center">
                          MM
                        </span>
                      </div>
                      <span className="text-[11px] text-[#49607e] mt-1 block">≈ {lengthFt} ft</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Step 4 & 5: Quantity & Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#00020b] uppercase tracking-wider block mb-1">
                  4. Quantity (Sheets)
                </label>
                <div className="flex rounded-lg overflow-hidden bg-[#f0f3ff] border border-[#dee8ff]">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-transparent px-4 py-2.5 font-bold text-base outline-none"
                  />
                  <span className="px-3 py-2.5 text-xs font-bold bg-[#dee8ff] flex items-center">
                    NOS
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#00020b] uppercase tracking-wider block mb-1">
                  5. Benchmark Rate (₹ / kg)
                </label>
                <div className="flex rounded-lg overflow-hidden bg-[#f0f3ff] border border-[#dee8ff]">
                  <input
                    type="number"
                    min="1"
                    value={baseRate}
                    onChange={(e) => setBaseRate(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-transparent px-4 py-2.5 font-bold text-base outline-none"
                  />
                  <span className="px-3 py-2.5 text-xs font-bold bg-[#dee8ff] flex items-center">
                    ₹/KG
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Live Calculation Output & WhatsApp Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Calculation Card */}
            <div className="bg-[#101d32] text-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs uppercase tracking-wider font-bold text-[#c4dcff]">
                  Theoretical Output Result
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-white/15 text-white font-mono">
                  {material} • {brand}
                </span>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-[#d6e3fe]">Single Sheet Weight:</span>
                  <span className="font-heading text-xl font-bold text-white">
                    {singleWeightKg.toFixed(2)} kg
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-[#d6e3fe]">Single Sheet Surface Area:</span>
                  <span className="text-sm font-semibold text-white">
                    {areaSqM.toFixed(2)} m² ({areaSqFt.toFixed(1)} sq.ft)
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-3 border-t border-white/10">
                  <span className="text-sm text-[#d6e3fe]">Total Batch Weight ({quantity} sheets):</span>
                  <span className="font-heading text-2xl font-black text-emerald-400">
                    {totalWeightKg.toFixed(2)} KG
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#b1c8ea]">Total Metric Tonnage:</span>
                  <span className="text-xs font-mono font-bold text-white">
                    ≈ {totalTonnageMt.toFixed(3)} MT
                  </span>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex items-baseline justify-between text-xs text-[#c4dcff]">
                    <span>Approx Material Value:</span>
                    <span>₹ {Math.round(subtotal).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs text-[#c4dcff]">
                    <span>GST Estimate (18%):</span>
                    <span>₹ {Math.round(gstAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                    <span>Approx Grand Total:</span>
                    <span className="font-heading text-xl text-yellow-300">
                      ₹ {Math.round(grandTotal).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live WhatsApp Quotation Preview Card (From Screen 8) */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#dee8ff] p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#0e1c2f] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Live WhatsApp Preview
                </span>
                <span className="text-[11px] text-[#49607e]">Pre-formatted message</span>
              </div>

              {/* Chat Bubble Presentation */}
              <div className="bg-[#f0f3ff] p-4 rounded-xl border border-[#dee8ff] text-xs font-mono text-[#0e1c2f] leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto">
                {rawWhatsAppText}
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all"
                >
                  <Send size={16} />
                  <span>Send Quotation to WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-lg bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#101d32] font-semibold text-xs transition-colors"
                >
                  <Printer size={14} />
                  <span>Print Calculation Sheet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
