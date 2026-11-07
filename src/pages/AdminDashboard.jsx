import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    LayoutDashboard, Package, Tags, DollarSign, ClipboardList,
    BarChart2, LogOut, Plus, Edit2, Trash2, CheckCircle, Clock, XCircle,
    Shield, ChevronRight, Bell, Search,
} from 'lucide-react';
import { ALL_PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { calcSheetWeight } from '../utils/priceCalculator';

// ── Sidebar items ──────────────────────────────────────────────────────────
const MENU = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'brands', icon: Tags, label: 'Brands' },
    { id: 'prices', icon: DollarSign, label: 'Prices' },
    { id: 'enquiries', icon: ClipboardList, label: 'Enquiries' },
    { id: 'reports', icon: BarChart2, label: 'Reports' },
];

// ── Seed enquiry data ──────────────────────────────────────────────────────
const SEED_ENQUIRIES = [
    { id: 'q1', name: 'Challa Visweswara rao', mobile: '9246473280', category: 'CR', brand: 'SAIL', qty: 10, status: 'new', ts: '2024-11-01' },
    { id: 'q2', name: 'Challa Mythresh', mobile: '9959362380', category: 'GI', brand: 'Tata Steel', qty: 25, status: 'pending', ts: '2024-11-02' },
    { id: 'q3', name: 'Suresh Babu', mobile: '76543XXXXX', category: 'CR', brand: 'JSW Steel', qty: 5, status: 'done', ts: '2024-11-03' },
];

const STATUS_BADGE = {
    new: 'badge-blue',
    pending: 'badge-gray',
    done: 'badge-green',
};
const STATUS_ICON = {
    new: Bell,
    pending: Clock,
    done: CheckCircle,
};

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [active, setActive] = useState('overview');
    const [products, setProducts] = useState(
        ALL_PRODUCTS.map((p) => ({ ...p, pricePerKg: p.pricePerKg ?? '' }))
    );
    const [enquiries, setEnquiries] = useState(SEED_ENQUIRIES);
    const [sideOpen, setSideOpen] = useState(false);
    const [editPrice, setEditPrice] = useState({});   // id -> new price
    const [saved, setSaved] = useState({});   // id -> bool
    const [search, setSearch] = useState('');

    // Guard: must be logged in
    useEffect(() => {
        if (sessionStorage.getItem('sv_admin') !== 'true') {
            navigate('/login');
        }
    }, [navigate]);

    const logout = () => {
        sessionStorage.removeItem('sv_admin');
        navigate('/login');
    };

    // Save price
    const savePrice = (id) => {
        const val = parseFloat(editPrice[id]);
        if (isNaN(val) || val <= 0) return;
        setProducts((prev) => prev.map((p) => p.id === id ? { ...p, pricePerKg: val } : p));
        setSaved((s) => ({ ...s, [id]: true }));
        setTimeout(() => setSaved((s) => ({ ...s, [id]: false })), 2000);
    };

    // Toggle stock
    const toggleStock = (id) => {
        setProducts((prev) => prev.map((p) => p.id === id ? { ...p, available: !p.available } : p));
    };

    // Enquiry status cycle
    const cycleStatus = (id) => {
        const cycle = { new: 'pending', pending: 'done', done: 'new' };
        setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status: cycle[e.status] } : e));
    };

    const crProducts = products.filter((p) => p.category === 'CR');
    const giProducts = products.filter((p) => p.category === 'GI');
    const inStock = products.filter((p) => p.available).length;
    const newEnq = enquiries.filter((e) => e.status === 'new').length;

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-[#F3F6FA] overflow-hidden">
            {/* ── Sidebar ── */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#101D32] flex flex-col
        transform transition-transform duration-300
        ${sideOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Shield size={15} className="text-white" />
                    </div>
                    <div className="leading-tight">
                        <p className="text-white font-heading font-bold text-sm">SV Steel Centre</p>
                        <p className="text-[#B9C4D0] text-[9px] uppercase tracking-widest">Admin Panel</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Admin navigation">
                    {MENU.map((item) => {
                        const Icon = item.icon;
                        const isActive = active === item.id;
                        return (
                            <button key={item.id} onClick={() => { setActive(item.id); setSideOpen(false); }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-[#B9C4D0] hover:bg-white/10 hover:text-white'}`}
                                aria-current={isActive ? 'page' : undefined}>
                                <Icon size={16} /> {item.label}
                                {item.id === 'enquiries' && newEnq > 0 && (
                                    <span className="ml-auto bg-blue-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                        {newEnq}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="px-3 pb-5">
                    <button onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#B9C4D0] hover:bg-red-900/30 hover:text-red-400 transition-colors">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sideOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSideOpen(false)} />
            )}

            {/* ── Main content ── */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white border-b border-[#D1D9E4] px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSideOpen(true)} className="lg:hidden text-[#263D59] hover:text-[#101D32]">
                            <LayoutDashboard size={20} />
                        </button>
                        <div>
                            <h1 className="font-heading font-bold text-[#172438] text-base capitalize">{active}</h1>
                            <nav className="flex items-center gap-1 text-[10px] text-[#4A6080]" aria-label="Breadcrumb">
                                <span>Admin</span><ChevronRight size={9} /><span className="text-blue-700 font-semibold capitalize">{active}</span>
                            </nav>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/" className="text-xs text-blue-600 hover:underline hidden sm:inline">View Site</Link>
                        <div className="w-8 h-8 bg-[#101D32] rounded-full flex items-center justify-center">
                            <Shield size={14} className="text-blue-400" />
                        </div>
                    </div>
                </header>

                {/* Scrollable content */}
                <main className="flex-1 overflow-y-auto p-6">

                    {/* ── OVERVIEW ── */}
                    {active === 'overview' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                                {[
                                    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-100 text-blue-700' },
                                    { label: 'In Stock', value: inStock, icon: CheckCircle, color: 'bg-green-100 text-green-700' },
                                    { label: 'New Enquiries', value: newEnq, icon: Bell, color: 'bg-amber-100 text-amber-700' },
                                    { label: 'Total Enquiries', value: enquiries.length, icon: ClipboardList, color: 'bg-purple-100 text-purple-700' },
                                ].map((s) => {
                                    const Icon = s.icon;
                                    return (
                                        <div key={s.label} className="bg-white border border-[#D1D9E4] rounded-2xl p-5">
                                            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                                                <Icon size={18} />
                                            </div>
                                            <div className="text-3xl font-heading font-extrabold text-[#172438]">{s.value}</div>
                                            <div className="text-xs text-[#4A6080] mt-1">{s.label}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Recent enquiries */}
                            <div className="bg-white border border-[#D1D9E4] rounded-2xl p-6">
                                <h2 className="font-heading font-bold text-[#172438] text-sm mb-4">Recent Enquiries</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-[#F3F6FA]">
                                                {['Customer', 'Mobile', 'Category', 'Brand', 'Qty', 'Status', 'Date'].map((h) => (
                                                    <th key={h} className="text-left text-xs font-semibold text-[#4A6080] uppercase tracking-widest pb-3 pr-4">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {enquiries.map((e) => {
                                                const Icon = STATUS_ICON[e.status];
                                                return (
                                                    <tr key={e.id} className="border-b border-[#F3F6FA] last:border-none hover:bg-[#F3F6FA]/50 transition-colors">
                                                        <td className="py-3 pr-4 font-medium text-[#172438]">{e.name}</td>
                                                        <td className="py-3 pr-4 text-[#4A6080]">{e.mobile}</td>
                                                        <td className="py-3 pr-4"><span className="badge badge-blue">{e.category}</span></td>
                                                        <td className="py-3 pr-4 text-[#4A6080]">{e.brand}</td>
                                                        <td className="py-3 pr-4 text-[#172438]">{e.qty}</td>
                                                        <td className="py-3 pr-4">
                                                            <button onClick={() => cycleStatus(e.id)}
                                                                className={`badge ${STATUS_BADGE[e.status]} cursor-pointer hover:opacity-80 flex items-center gap-1`}>
                                                                <Icon size={10} /> {e.status}
                                                            </button>
                                                        </td>
                                                        <td className="py-3 text-[#4A6080] text-xs">{e.ts}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── PRODUCTS ── */}
                    {active === 'products' && (
                        <div className="space-y-6">
                            {/* Search */}
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1 max-w-sm">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B9C4D0]" />
                                    <input type="search" placeholder="Search products…" className="form-input pl-9 text-sm"
                                        value={search} onChange={(e) => setSearch(e.target.value)} />
                                </div>
                            </div>

                            {[
                                { title: 'CR Sheets', data: crProducts },
                                { title: 'Zinc / GI Sheets', data: giProducts },
                            ].map((sec) => (
                                <div key={sec.title} className="bg-white border border-[#D1D9E4] rounded-2xl overflow-hidden">
                                    <div className="px-6 py-4 border-b border-[#F3F6FA] flex items-center justify-between">
                                        <h2 className="font-heading font-bold text-[#172438] text-sm">{sec.title}</h2>
                                        <span className="badge badge-gray">{sec.data.length} items</span>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-[#F3F6FA]">
                                                    {['Product', 'Brand', 'Thickness', 'Width', 'Length', 'Est. Wt.', '₹/kg', 'Stock', 'Actions'].map((h) => (
                                                        <th key={h} className="text-left text-xs font-semibold text-[#4A6080] uppercase tracking-widest px-5 py-3">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sec.data
                                                    .filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
                                                    .map((p) => {
                                                        const wt = calcSheetWeight(p.lengthMm, p.widthMm, p.thicknessMm, p.densityKgM3);
                                                        return (
                                                            <tr key={p.id} className="border-b border-[#F3F6FA] last:border-none hover:bg-[#F3F6FA]/50 transition-colors">
                                                                <td className="px-5 py-3 font-medium text-[#172438] whitespace-nowrap">{p.name}</td>
                                                                <td className="px-5 py-3 text-[#4A6080]">{p.brand}</td>
                                                                <td className="px-5 py-3">{p.thicknessMm} mm</td>
                                                                <td className="px-5 py-3">{p.widthMm} mm</td>
                                                                <td className="px-5 py-3">{p.lengthMm} mm</td>
                                                                <td className="px-5 py-3">{wt.toFixed(2)} kg</td>
                                                                {/* Inline price editor */}
                                                                <td className="px-5 py-3">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <input type="number" min="0" step="0.01"
                                                                            placeholder={p.pricePerKg || 'Set price'}
                                                                            className="form-input text-xs w-20 py-1.5"
                                                                            value={editPrice[p.id] ?? (p.pricePerKg || '')}
                                                                            onChange={(e) => setEditPrice({ ...editPrice, [p.id]: e.target.value })}
                                                                        />
                                                                        <button onClick={() => savePrice(p.id)}
                                                                            className="text-white bg-blue-600 hover:bg-blue-700 text-[10px] font-bold px-2 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                                                                            {saved[p.id] ? '✓ Saved' : 'Save'}
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                {/* Stock toggle */}
                                                                <td className="px-5 py-3">
                                                                    <button onClick={() => toggleStock(p.id)}
                                                                        className={`badge cursor-pointer hover:opacity-80 ${p.available ? 'badge-green' : 'badge-red'}`}>
                                                                        {p.available ? 'In Stock' : 'Out of Stock'}
                                                                    </button>
                                                                </td>
                                                                {/* Actions */}
                                                                <td className="px-5 py-3">
                                                                    <div className="flex gap-1.5">
                                                                        <button title="Edit" className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-700 transition-colors">
                                                                            <Edit2 size={13} />
                                                                        </button>
                                                                        <button title="Delete" className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors">
                                                                            <Trash2 size={13} />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── BRANDS ── */}
                    {active === 'brands' && (
                        <div className="bg-white border border-[#D1D9E4] rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#F3F6FA] flex items-center justify-between">
                                <h2 className="font-heading font-bold text-[#172438] text-sm">Manage Brands</h2>
                                <button className="inline-flex items-center gap-1.5 bg-[#101D32] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#263D59] transition-colors">
                                    <Plus size={12} /> Add Brand
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-[#F3F6FA]">
                                            {['ID', 'Short Name', 'Full Name', 'Actions'].map((h) => (
                                                <th key={h} className="text-left text-xs font-semibold text-[#4A6080] uppercase tracking-widest px-5 py-3">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {BRANDS.map((b) => (
                                            <tr key={b.id} className="border-b border-[#F3F6FA] last:border-none hover:bg-[#F3F6FA]/50">
                                                <td className="px-5 py-3 font-mono text-xs text-[#4A6080]">{b.id}</td>
                                                <td className="px-5 py-3 font-semibold text-[#172438]">{b.name}</td>
                                                <td className="px-5 py-3 text-[#4A6080]">{b.fullName}</td>
                                                <td className="px-5 py-3">
                                                    <div className="flex gap-1.5">
                                                        <button className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-700 transition-colors"><Edit2 size={13} /></button>
                                                        <button className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"><Trash2 size={13} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ── PRICES ── */}
                    {active === 'prices' && (
                        <div className="space-y-6">
                            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 text-amber-800 text-xs flex items-center gap-2">
                                <Bell size={13} /> Changes made here update the local state only. Connect Flask API to persist prices.
                            </div>
                            <div className="bg-white border border-[#D1D9E4] rounded-2xl overflow-hidden">
                                <div className="px-6 py-4 border-b border-[#F3F6FA]">
                                    <h2 className="font-heading font-bold text-[#172438] text-sm">Price Management — ₹/kg</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-[#F3F6FA]">
                                                {['Product', 'Category', 'Brand', 'Current ₹/kg', 'New Price', ''].map((h) => (
                                                    <th key={h} className="text-left text-xs font-semibold text-[#4A6080] uppercase tracking-widest px-5 py-3">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((p) => (
                                                <tr key={p.id} className="border-b border-[#F3F6FA] last:border-none hover:bg-[#F3F6FA]/50">
                                                    <td className="px-5 py-3 font-medium text-[#172438] max-w-[180px] truncate">{p.name}</td>
                                                    <td className="px-5 py-3"><span className="badge badge-blue">{p.category}</span></td>
                                                    <td className="px-5 py-3 text-[#4A6080]">{p.brand}</td>
                                                    <td className="px-5 py-3 font-semibold text-[#172438]">
                                                        {p.pricePerKg ? `₹ ${p.pricePerKg}` : <span className="text-[#B9C4D0]">Not set</span>}
                                                    </td>
                                                    <td className="px-5 py-3">
                                                        <input type="number" min="0" step="0.01" placeholder="Enter ₹/kg"
                                                            className="form-input text-xs w-28 py-1.5"
                                                            value={editPrice[p.id] ?? ''}
                                                            onChange={(e) => setEditPrice({ ...editPrice, [p.id]: e.target.value })}
                                                        />
                                                    </td>
                                                    <td className="px-5 py-3">
                                                        <button onClick={() => savePrice(p.id)}
                                                            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${saved[p.id]
                                                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                                                    : 'bg-[#101D32] text-white hover:bg-[#263D59]'
                                                                }`}>
                                                            {saved[p.id] ? '✓ Saved' : 'Update'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── ENQUIRIES ── */}
                    {active === 'enquiries' && (
                        <div className="bg-white border border-[#D1D9E4] rounded-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#F3F6FA] flex items-center justify-between">
                                <h2 className="font-heading font-bold text-[#172438] text-sm">Customer Enquiries</h2>
                                <span className="badge badge-blue">{newEnq} new</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-[#F3F6FA]">
                                            {['Customer', 'Mobile', 'Category', 'Brand', 'Qty', 'Status', 'Date', 'Action'].map((h) => (
                                                <th key={h} className="text-left text-xs font-semibold text-[#4A6080] uppercase tracking-widest px-5 py-3">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {enquiries.map((e) => {
                                            const Icon = STATUS_ICON[e.status];
                                            return (
                                                <tr key={e.id} className="border-b border-[#F3F6FA] last:border-none hover:bg-[#F3F6FA]/50 transition-colors">
                                                    <td className="px-5 py-3 font-medium text-[#172438]">{e.name}</td>
                                                    <td className="px-5 py-3 text-[#4A6080]">{e.mobile}</td>
                                                    <td className="px-5 py-3"><span className="badge badge-blue">{e.category}</span></td>
                                                    <td className="px-5 py-3 text-[#4A6080]">{e.brand}</td>
                                                    <td className="px-5 py-3">{e.qty}</td>
                                                    <td className="px-5 py-3">
                                                        <span className={`badge ${STATUS_BADGE[e.status]} flex items-center gap-1 w-fit`}>
                                                            <Icon size={10} /> {e.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-3 text-xs text-[#4A6080]">{e.ts}</td>
                                                    <td className="px-5 py-3">
                                                        <button onClick={() => cycleStatus(e.id)}
                                                            className="text-xs bg-[#F3F6FA] border border-[#D1D9E4] hover:bg-[#263D59] hover:text-white hover:border-[#263D59] font-semibold px-3 py-1.5 rounded-lg transition-colors">
                                                            Mark Next
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ── REPORTS ── */}
                    {active === 'reports' && (
                        <div className="space-y-6">
                            <div className="bg-white border border-[#D1D9E4] rounded-2xl p-8 text-center text-[#4A6080]">
                                <BarChart2 size={40} className="mx-auto mb-4 text-[#B9C4D0]" />
                                <h2 className="font-heading font-bold text-[#172438] text-lg mb-2">Inventory Reports</h2>
                                <p className="text-sm mb-6">Connect the Flask backend and MySQL to generate live inventory and sales reports.</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-left mt-6">
                                    {[
                                        { label: 'CR Products', value: crProducts.length },
                                        { label: 'GI Products', value: giProducts.length },
                                        { label: 'In Stock', value: inStock },
                                        { label: 'Total Enquiries', value: enquiries.length },
                                    ].map((s) => (
                                        <div key={s.label} className="bg-[#F3F6FA] border border-[#D1D9E4] rounded-xl p-4">
                                            <div className="text-2xl font-heading font-extrabold text-[#172438]">{s.value}</div>
                                            <div className="text-xs text-[#4A6080] mt-1">{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
