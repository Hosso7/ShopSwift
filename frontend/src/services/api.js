import axios from "axios";

// In dev, Vite proxies /api → http://localhost:5000
// In production, set VITE_API_URL in .env
const BASE_URL = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// ─── Products ─────────────────────────────────────────────────────────────────

/**
 * Fetch all products, with an optional category filter.
 * @param {string} [category] - optional category string
 * @returns {Promise<Product[]>}
 */
export const fetchProducts = async (category = "") => {
  const params = category ? { category } : {};
  const { data } = await api.get("/api/products", { params });
  return data.data; // unwrap envelope: { success, count, data: [...] }
};

/**
 * Fetch all unique category names.
 * @returns {Promise<string[]>}
 */
export const fetchCategories = async () => {
  const { data } = await api.get("/api/products/categories");
  return data.data;
};

/**
 * Fetch a single product by its MongoDB _id.
 * @param {string} id
 * @returns {Promise<Product>}
 */
export const fetchProductById = async (id) => {
  const { data } = await api.get(`/api/products/${id}`);
  return data.data;
};

export default api;
