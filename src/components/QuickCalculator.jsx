import { useState, useMemo } from 'react';
import { Send, Calculator, Info } from 'lucide-react';

export default function QuickCalculator() {
  const [material, setMaterial] = useState('CR'); // 'CR' or 'GI'
  const [thickness, setThickness] = useState(1.20);
  const [widthFt, setWidthFt] = useState(4);
  const [lengthFt, setLengthFt] = useState(8);
  const [quantity, setQuantity] = useState(10);
  const [baseRate, setBaseRate] = useState(72);

  // Density: CR is 7850, GI is 7870 (standard IS constants)
  const density = material === 'CR' ? 7850 : 7870;

  // Convert feet to meters for IS calculation
  const widthM = (widthFt * 0.3048);
  const lengthM = (lengthFt * 0.3048);
  const thicknessM = (thickness / 1000);

  // Approximate theoretical single sheet weight
  const singleWeightKg = useMemo(() => {
    return widthM * lengthM * thicknessM * density;
  }, [widthM, lengthM, thicknessM, density]);

  const totalWeightKg = singleWeightKg * quantity;
  const totalTonnageMt = (totalWeightKg / 1000).toFixed(2);
  const approxValue = Math.round(totalWeightKg * baseRate);

  // WhatsApp formatted enquiry message
  const whatsappMsg = encodeURIComponent(
    `Hello Sri Venkateswara Steel Centre, I am looking for a quote:\n` +
    `• Material: ${material === 'CR' ? 'Cold Rolled (CR)' : 'Galvanized Iron (GI)'} Sheets\n` +
    `• Thickness: ${thickness.toFixed(2)} mm\n` +
    `• Dimensions: ${widthFt} ft × ${lengthFt} ft (${(widthFt * 304.8).toFixed(1)} mm × ${(lengthFt * 304.8).toFixed(1)} mm)\n` +
    `• Quantity: ${quantity} sheets\n` +
    `• Approx Weight: ${totalWeightKg.toFixed(2)} kg (~${totalTonnageMt} MT)\n` +
    `Please confirm ready yard availability and your best rate.`
  );

  const THICKNESS_OPTIONS = [0.50, 0.60, 0.80, 1.00, 1.20, 1.60, 2.00, 3.00];

  return (
    <section className="w-full bg-[#f0f3ff] py-16 lg:py-24 border-y border-[#dee8ff]" id="quick-calculator" aria-labelledby="calc-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#49607e] block mb-1">
            Engineering Tool
          </span>
          <h2 id="calc-heading" className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0e1c2f] tracking-tight">
            Precision Steel Weight &amp; Rate Estimator
          </h2>
          <p className="text-sm text-[#44474d] mt-2">
            Calculate theoretical sheet weight using Indian Standard density constants (7,850 kg/m³) with instant mm to feet dimension synchronization.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-[#dee8ff]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls Panel */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Material Category */}
              <div>
                <label className="text-xs font-bold text-[#44474d] uppercase block mb-2 tracking-wider">
                  Material Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMaterial('CR');
                      if (baseRate === 82) setBaseRate(72);
                    }}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      material === 'CR'
                        ? 'bg-[#101d32] text-white shadow-md'
                        : 'bg-[#f0f3ff] text-[#0e1c2f] hover:bg-[#dee8ff]'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    Cold Rolled (CR)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMaterial('GI');
                      if (baseRate === 72) setBaseRate(82);
                    }}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      material === 'GI'
                        ? 'bg-[#101d32] text-white shadow-md'
                        : 'bg-[#f0f3ff] text-[#0e1c2f] hover:bg-[#dee8ff]'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                    Zinc / GI Sheet
                  </button>
                </div>
              </div>

              {/* Thickness Selector */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-[#44474d] uppercase tracking-wider">
                    Sheet Thickness (Gauge in mm)
                  </label>
                  <span className="text-xs text-[#49607e] font-bold">
                    Selected: {thickness.toFixed(2)} mm
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {THICKNESS_OPTIONS.map((thk) => (
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
                      {thk.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions: Feet with mm sync */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#44474d] uppercase block mb-1">
                    Width (in Feet)
                  </label>
                  <div className="flex rounded-lg overflow-hidden bg-[#f0f3ff] border border-[#dee8ff]">
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      max="12"
                      value={widthFt}
                      onChange={(e) => setWidthFt(Math.max(0.5, parseFloat(e.target.value) || 0))}
                      className="w-full bg-transparent px-4 py-2.5 font-bold text-base text-[#0e1c2f] outline-none"
                    />
                    <span className="px-3 py-2.5 text-xs font-bold text-[#44474d] bg-[#dee8ff] flex items-center">
                      FT
                    </span>
                  </div>
                  <span className="text-[11px] text-[#49607e] font-mono mt-1 block">
                    ≈ {(widthFt * 304.8).toFixed(1)} mm
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#44474d] uppercase block mb-1">
                    Length (in Feet)
                  </label>
                  <div className="flex rounded-lg overflow-hidden bg-[#f0f3ff] border border-[#dee8ff]">
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      max="25"
                      value={lengthFt}
                      onChange={(e) => setLengthFt(Math.max(0.5, parseFloat(e.target.value) || 0))}
                      className="w-full bg-transparent px-4 py-2.5 font-bold text-base text-[#0e1c2f] outline-none"
                    />
                    <span className="px-3 py-2.5 text-xs font-bold text-[#44474d] bg-[#dee8ff] flex items-center">
                      FT
                    </span>
                  </div>
                  <span className="text-[11px] text-[#49607e] font-mono mt-1 block">
                    ≈ {(lengthFt * 304.8).toFixed(1)} mm
                  </span>
                </div>
              </div>

              {/* Quantity & Base Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#44474d] uppercase block mb-1">
                    Quantity (Sheets)
                  </label>
                  <div className="flex rounded-lg overflow-hidden bg-[#f0f3ff] border border-[#dee8ff]">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-transparent px-4 py-2.5 font-bold text-base text-[#0e1c2f] outline-none"
                    />
                    <span className="px-3 py-2.5 text-xs font-bold text-[#44474d] bg-[#dee8ff] flex items-center">
                      NOS
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#44474d] uppercase block mb-1">
                    Indicative Base Rate (₹/kg)
                  </label>
                  <div className="flex rounded-lg overflow-hidden bg-[#f0f3ff] border border-[#dee8ff]">
                    <input
                      type="number"
                      min="50"
                      max="150"
                      value={baseRate}
                      onChange={(e) => setBaseRate(Math.max(1, parseFloat(e.target.value) || 0))}
                      className="w-full bg-transparent px-4 py-2.5 font-bold text-base text-[#0e1c2f] outline-none"
                    />
                    <span className="px-3 py-2.5 text-xs font-bold text-[#44474d] bg-[#dee8ff] flex items-center">
                      ₹/KG
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Calculation Output Display */}
            <div className="lg:col-span-5 bg-[#e7eeff] rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-[#c4dcff]">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#49607e]">
                    Theoretical Output
                  </span>
                  <span className="text-[11px] bg-white px-2.5 py-1 rounded text-[#0e1c2f] font-mono font-semibold shadow-xs">
                    ρ = {density} kg/m³
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-xs border border-blue-50">
                    <span className="text-xs text-[#44474d] font-medium block">
                      Single Sheet Theoretical Weight
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-heading text-2xl sm:text-3xl font-black text-[#00020b]">
                        {singleWeightKg.toFixed(2)}
                      </span>
                      <span className="text-xs text-[#44474d] font-semibold">kg / sheet</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-xs border border-blue-50">
                    <span className="text-xs text-[#44474d] font-medium block">
                      Total Lot Weight ({quantity} sheets)
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-heading text-3xl sm:text-4xl font-black text-[#00020b]">
                        {totalWeightKg.toFixed(2)}
                      </span>
                      <span className="text-sm text-[#44474d] font-bold">KG</span>
                      <span className="text-xs text-[#49607e] font-semibold">({totalTonnageMt} MT)</span>
                    </div>
                  </div>

                  <div className="bg-[#101d32] text-white p-4 sm:p-5 rounded-xl shadow-md">
                    <span className="text-xs text-[#d6e3fe] font-medium block">
                      Approximate Material Value
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-heading text-2xl sm:text-3xl font-black text-white">
                        ₹ {approxValue.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-[#b1c8ea] ml-1.5">+ GST as applicable</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#c4dcff]">
                <a
                  href={`https://wa.me/919246473280?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all mb-2.5"
                >
                  <Send size={16} />
                  <span>Request In-Stock Quote on WhatsApp</span>
                </a>
                <p className="text-[11px] text-[#44474d] text-center italic">
                  Prices and weights are theoretical approximations. Final rates, actual weighbridge weight, and GST will be confirmed by SV Steel Centre on loading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
