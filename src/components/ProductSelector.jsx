import { useState } from 'react';
import { parseDimensionToMm, mmToFeet } from '../utils/conversion';
import { BRANDS, THICKNESS_OPTIONS_CR, THICKNESS_OPTIONS_GI, WIDTH_OPTIONS_MM, LENGTH_OPTIONS_MM } from '../data/brands';
import { submitEnquiry } from '../services/api';
import { Send, MessageCircle, CheckCircle } from 'lucide-react';

// ⚙️  Configure WhatsApp number here:
const WHATSAPP_NUMBER = '9246473280'; // TODO: replace with real number

const CATEGORIES = [
    { value: 'CR', label: 'CR Sheets (Cold Rolled)' },
    { value: 'GI', label: 'Zinc / GI Sheets (Galvanized)' },
];
const SUPPLY_TYPES = ['Retail', 'Wholesale'];
const UNITS = ['mm', 'ft'];

export default function ProductSelector({ defaultCategory = 'CR' }) {
    const [form, setForm] = useState({
        category: defaultCategory,
        brand: '',
        thicknessMm: '',
        widthMm: '',
        lengthMm: '',
        unit: 'mm',
        quantity: 1,
        name: '',
        mobile: '',
        supplyType: 'Retail',
        notes: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const thicknessOptions = form.category === 'CR' ? THICKNESS_OPTIONS_CR : THICKNESS_OPTIONS_GI;

    const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

    const parseToMm = (val) => parseDimensionToMm(val, form.unit);

    const buildWAMessage = () => {
        const wVal = form.widthMm ? (form.unit === 'ft' ? `${form.widthMm} ft` : `${parseToMm(form.widthMm)} mm`) : 'Not specified';
        const lVal = form.lengthMm ? (form.unit === 'ft' ? `${form.lengthMm} ft` : `${parseToMm(form.lengthMm)} mm`) : 'Not specified';
        return `Hello Sri Venkateswara Steel Centre,

I would like to enquire about:
• Category  : ${form.category === 'CR' ? 'CR Sheets (Cold Rolled)' : 'Zinc/GI Sheets (Galvanized)'}
• Brand     : ${form.brand || 'Any'}
• Thickness : ${form.thicknessMm ? form.thicknessMm + ' mm' : 'Not specified'}
• Width     : ${wVal}
• Length    : ${lVal}
• Quantity  : ${form.quantity} sheet(s)
• Supply    : ${form.supplyType}

Name  : ${form.name || 'Not provided'}
Mobile: ${form.mobile || 'Not provided'}

Additional: ${form.notes || 'None'}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await submitEnquiry({
            ...form,
            widthMm: parseToMm(form.widthMm),
            lengthMm: parseToMm(form.lengthMm),
        });
        setLoading(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={52} className="text-green-500 mb-4" />
                <h3 className="font-heading font-bold text-xl text-[#172438] mb-2">Enquiry Submitted!</h3>
                <p className="text-[#4A6080] text-sm mb-6">We will contact you on <strong>{form.mobile}</strong> shortly.</p>
                <button onClick={() => setSubmitted(false)} className="text-blue-600 text-sm hover:underline">Submit another enquiry</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Product enquiry form" id="enquiry">
            <h3 className="font-heading font-bold text-[#172438] text-lg">Product Enquiry</h3>

            {/* Row 1: Category & Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Material Category" htmlFor="ps-cat">
                    <select id="ps-cat" className="form-input text-sm" value={form.category}
                        onChange={(e) => update('category', e.target.value)}>
                        {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                </Field>
                <Field label="Brand" htmlFor="ps-brand">
                    <select id="ps-brand" className="form-input text-sm" value={form.brand}
                        onChange={(e) => update('brand', e.target.value)}>
                        <option value="">Any / Not sure</option>
                        {BRANDS.map((b) => <option key={b.id} value={b.name}>{b.name}</option>)}
                    </select>
                </Field>
            </div>

            {/* Row 2: Thickness & Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Thickness (mm)" htmlFor="ps-thick">
                    <select id="ps-thick" className="form-input text-sm" value={form.thicknessMm}
                        onChange={(e) => update('thicknessMm', e.target.value)}>
                        <option value="">Select Thickness</option>
                        {thicknessOptions.map((t) => <option key={t} value={t}>{t} mm</option>)}
                    </select>
                </Field>
                <Field label="Dimension Unit">
                    <div className="flex rounded-lg overflow-hidden border border-[#D1D9E4]">
                        {UNITS.map((u) => (
                            <button key={u} type="button" onClick={() => update('unit', u)}
                                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${form.unit === u ? 'bg-[#101D32] text-white' : 'bg-white text-[#4A6080] hover:bg-[#F3F6FA]'}`}
                                aria-pressed={form.unit === u}>
                                {u.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </Field>
            </div>

            {/* Row 3: Width & Length */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label={`Width (${form.unit})`} htmlFor="ps-width">
                    <input id="ps-width" type="number" min="1" step="any"
                        placeholder={form.unit === 'mm' ? 'e.g. 1219' : 'e.g. 4'}
                        className="form-input text-sm" value={form.widthMm}
                        onChange={(e) => update('widthMm', e.target.value)} />
                </Field>
                <Field label={`Length (${form.unit})`} htmlFor="ps-length">
                    <input id="ps-length" type="number" min="1" step="any"
                        placeholder={form.unit === 'mm' ? 'e.g. 2438' : 'e.g. 8'}
                        className="form-input text-sm" value={form.lengthMm}
                        onChange={(e) => update('lengthMm', e.target.value)} />
                </Field>
            </div>

            {/* Row 4: Quantity & Supply */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Quantity (sheets)" htmlFor="ps-qty">
                    <input id="ps-qty" type="number" min="1" step="1"
                        className="form-input text-sm" value={form.quantity}
                        onChange={(e) => update('quantity', e.target.value)} />
                </Field>
                <Field label="Supply Type" htmlFor="ps-supply">
                    <select id="ps-supply" className="form-input text-sm" value={form.supplyType}
                        onChange={(e) => update('supplyType', e.target.value)}>
                        {SUPPLY_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </Field>
            </div>

            {/* Row 5: Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Your Name *" htmlFor="ps-name">
                    <input id="ps-name" type="text" required placeholder="Full Name"
                        className="form-input text-sm" value={form.name}
                        onChange={(e) => update('name', e.target.value)} />
                </Field>
                <Field label="Mobile Number *" htmlFor="ps-mobile">
                    <input id="ps-mobile" type="tel" required placeholder="+91 XXXXX XXXXX"
                        className="form-input text-sm" value={form.mobile}
                        onChange={(e) => update('mobile', e.target.value)} />
                </Field>
            </div>

            {/* Notes */}
            <Field label="Additional Requirements" htmlFor="ps-notes">
                <textarea id="ps-notes" rows={3} placeholder="Any special requirements, delivery area, etc."
                    className="form-input text-sm resize-none" value={form.notes}
                    onChange={(e) => update('notes', e.target.value)} />
            </Field>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button type="submit" disabled={loading}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#101D32] hover:bg-[#263D59] disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200">
                    <Send size={15} /> {loading ? 'Submitting…' : 'Submit Enquiry'}
                </button>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWAMessage())}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200">
                    <MessageCircle size={15} /> Enquire via WhatsApp
                </a>
            </div>
        </form>
    );
}

function Field({ label, htmlFor, children }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-[#263D59] mb-1.5" htmlFor={htmlFor}>{label}</label>
            {children}
        </div>
    );
}
