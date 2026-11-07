/**
 * Calculate theoretical weight of a rectangular steel sheet.
 *
 * Formula: Weight (kg) = Length (m) × Width (m) × Thickness (m) × Density (kg/m³)
 *
 * NOTE: This is an APPROXIMATION only. Actual weight depends on supplier data.
 *
 * @param {number} lengthMm
 * @param {number} widthMm
 * @param {number} thicknessMm
 * @param {number} densityKgM3 - default 7850 kg/m³ for steel
 * @returns {number} weight in kg
 */
export const calcSheetWeight = (lengthMm, widthMm, thicknessMm, densityKgM3 = 7850) => {
    const l = lengthMm / 1000;   // convert to m
    const w = widthMm / 1000;   // convert to m
    const t = thicknessMm / 1000; // convert to m
    return l * w * t * densityKgM3;
};

/**
 * Calculate price of a single sheet.
 * @param {number} weightKg
 * @param {number} pricePerKg
 * @returns {number}
 */
export const calcSheetPrice = (weightKg, pricePerKg) => {
    if (!pricePerKg || pricePerKg <= 0) return null;
    return weightKg * pricePerKg;
};

/**
 * Calculate full estimate for a given quantity.
 * @param {object} params
 * @returns {object}
 */
export const calcEstimate = ({
    lengthMm, widthMm, thicknessMm,
    density = 7850, pricePerKg, quantity = 1,
}) => {
    const weightPerSheet = calcSheetWeight(lengthMm, widthMm, thicknessMm, density);
    const totalWeight = weightPerSheet * quantity;
    const pricePerSheet = pricePerKg ? calcSheetPrice(weightPerSheet, pricePerKg) : null;
    const totalEstimate = pricePerSheet ? pricePerSheet * quantity : null;

    return {
        weightPerSheet: +weightPerSheet.toFixed(3),
        totalWeight: +totalWeight.toFixed(3),
        pricePerSheet: pricePerSheet ? +pricePerSheet.toFixed(2) : null,
        totalEstimate: totalEstimate ? +totalEstimate.toFixed(2) : null,
        pricePerKg,
        quantity,
    };
};

/** Format Indian currency */
export const formatINR = (amount) => {
    if (amount == null) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};
