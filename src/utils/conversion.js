/** 1 foot = 304.8 millimetres (exact) */
export const MM_PER_FOOT = 304.8;

/**
 * Convert millimetres to feet.
 * @param {number} mm
 * @returns {number}
 */
export const mmToFeet = (mm) => mm / MM_PER_FOOT;

/**
 * Convert feet to millimetres.
 * @param {number} feet
 * @returns {number}
 */
export const feetToMm = (feet) => feet * MM_PER_FOOT;

/**
 * Format a dimension for display.
 * @param {number} mm - value in millimetres
 * @param {'mm'|'ft'} unit
 * @param {number} decimals
 * @returns {string}
 */
export const formatDimension = (mm, unit = 'mm', decimals = 2) => {
    if (mm == null || isNaN(mm)) return '—';
    if (unit === 'ft') return `${mmToFeet(mm).toFixed(decimals)} ft`;
    return `${mm.toFixed(decimals)} mm`;
};

/**
 * Parse dimension input and convert to mm.
 * @param {string|number} value
 * @param {'mm'|'ft'} inputUnit
 * @returns {number} mm
 */
export const parseDimensionToMm = (value, inputUnit) => {
    const num = parseFloat(value);
    if (isNaN(num)) return 0;
    return inputUnit === 'ft' ? feetToMm(num) : num;
};
