import { useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

/**
 * ProductFilters — sidebar / top filter panel for the catalogue pages.
 *
 * Props:
 *  products  – full list of products to derive filter options from
 *  filters   – current filter state object
 *  onChange  – (key, value) => void
 *  onClear   – () => void
 *  searchQ   – string
 *  onSearch  – (value) => void
 */
export default function ProductFilters({ products, filters, onChange, onClear, searchQ, onSearch }) {
    const brands = useMemo(() => [...new Set(products.map((p) => p.brand))].sort(), [products]);
    const thicknesses = useMemo(() => [...new Set(products.map((p) => p.thicknessMm))].sort((a, b) => a - b), [products]);
    const widths = useMemo(() => [...new Set(products.map((p) => p.widthMm))].sort((a, b) => a - b), [products]);
    const lengths = useMemo(() => [...new Set(products.map((p) => p.lengthMm))].sort((a, b) => a - b), [products]);

    const hasActive = filters.brand || filters.thicknessMm || filters.widthMm || filters.lengthMm || filters.available !== '' || searchQ;

    return (
        <aside className="bg-[#F3F6FA] border border-[#D1D9E4] rounded-2xl p-5" aria-label="Product filters">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-[#172438] font-heading font-bold text-sm">
                    <SlidersHorizontal size={16} className="text-blue-700" />
                    Filters
                </div>
                {hasActive && (
                    <button onClick={onClear}
                        className="flex items-center gap-1 text-xs text-blue-700 hover:text-red-600 font-medium transition-colors">
                        <X size={12} /> Clear
                    </button>
                )}
            </div>

            {/* Search */}
            <div className="relative mb-5">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B9C4D0]" />
                <input type="search" placeholder="Search products…"
                    className="form-input pl-9 text-sm"
                    value={searchQ}
                    onChange={(e) => onSearch(e.target.value)}
                    aria-label="Search products"
                />
            </div>

            <div className="space-y-6">
                {/* Brand */}
                <FilterGroup label="Brand">
                    <FilterSelect
                        id="filter-brand" value={filters.brand}
                        onChange={(v) => onChange('brand', v)}
                        options={brands.map((b) => ({ value: b, label: b }))}
                        placeholder="All Brands"
                    />
                </FilterGroup>

                {/* Thickness */}
                <FilterGroup label="Thickness (mm)">
                    <FilterSelect
                        id="filter-thickness" value={filters.thicknessMm}
                        onChange={(v) => onChange('thicknessMm', v ? parseFloat(v) : '')}
                        options={thicknesses.map((t) => ({ value: t, label: `${t} mm` }))}
                        placeholder="All Thicknesses"
                    />
                </FilterGroup>

                {/* Width */}
                <FilterGroup label="Width (mm)">
                    <FilterSelect
                        id="filter-width" value={filters.widthMm}
                        onChange={(v) => onChange('widthMm', v ? parseFloat(v) : '')}
                        options={widths.map((w) => ({ value: w, label: `${w} mm` }))}
                        placeholder="All Widths"
                    />
                </FilterGroup>

                {/* Length */}
                <FilterGroup label="Length (mm)">
                    <FilterSelect
                        id="filter-length" value={filters.lengthMm}
                        onChange={(v) => onChange('lengthMm', v ? parseFloat(v) : '')}
                        options={lengths.map((l) => ({ value: l, label: `${l} mm` }))}
                        placeholder="All Lengths"
                    />
                </FilterGroup>

                {/* Availability */}
                <FilterGroup label="Availability">
                    <FilterSelect
                        id="filter-avail" value={filters.available}
                        onChange={(v) => onChange('available', v === '' ? '' : v === 'true')}
                        options={[
                            { value: 'true', label: 'In Stock' },
                            { value: 'false', label: 'Out of Stock' },
                        ]}
                        placeholder="All"
                    />
                </FilterGroup>
            </div>
        </aside>
    );
}

function FilterGroup({ label, children }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-[#263D59] uppercase tracking-widest mb-2">{label}</label>
            {children}
        </div>
    );
}

function FilterSelect({ id, value, onChange, options, placeholder }) {
    return (
        <select id={id} className="form-input text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">{placeholder}</option>
            {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
    );
}
