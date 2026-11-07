/**
 * API service layer — structured for Flask/MySQL integration.
 * Currently uses local sample data; replace fetch calls with real endpoints.
 */
import { CR_PRODUCTS, GI_PRODUCTS, ALL_PRODUCTS } from '../data/products';

const BASE_URL = import.meta.env.VITE_API_URL || '';   // e.g. http://localhost:5000/api

// --- helpers ---
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// Simulate async API (remove delay when connecting to real backend)
const fakeGet = async (data) => { await delay(200); return data; };

// --- Products ---
export const fetchCRProducts = () => fakeGet(CR_PRODUCTS);
export const fetchGIProducts = () => fakeGet(GI_PRODUCTS);
export const fetchAllProducts = () => fakeGet(ALL_PRODUCTS);
export const fetchProductById = (id) => fakeGet(ALL_PRODUCTS.find((p) => p.id === id) || null);

// --- Enquiries (POST placeholder) ---
export const submitEnquiry = async (payload) => {
    console.log('[API] submitEnquiry payload:', payload);
    // TODO: POST to ${BASE_URL}/enquiries
    await delay(500);
    return { success: true, message: 'Enquiry submitted successfully.' };
};

// --- Prices (admin) ---
export const updateProductPrice = async (id, pricePerKg) => {
    console.log('[API] updateProductPrice:', id, pricePerKg);
    // TODO: PATCH ${BASE_URL}/products/${id}/price
    await delay(300);
    return { success: true };
};

export default {
    fetchCRProducts,
    fetchGIProducts,
    fetchAllProducts,
    fetchProductById,
    submitEnquiry,
    updateProductPrice,
};
