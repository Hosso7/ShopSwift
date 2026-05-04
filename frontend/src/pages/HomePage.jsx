import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../services/api";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import "./HomePage.css";

export default function HomePage() {
  const [products, setProducts]       = useState([]);
  const [categories, setCategories]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [activeCategory, setCategory] = useState("");
  const [sortBy, setSortBy]           = useState("default");

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";

  // Sync ?category= URL param into state
  useEffect(() => {
    if (categoryParam) setCategory(categoryParam);
  }, [categoryParam]);

  // ── Data fetching ──────────────────────────────────────────────────────────
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [prods, cats] = await Promise.all([
        fetchProducts(activeCategory),
        fetchCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Could not connect to the server. Make sure the backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [activeCategory]);

  // ── Filter + sort ──────────────────────────────────────────────────────────
  const displayedProducts = useMemo(() => {
    let list = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    if (sortBy === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating")     list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return list;
  }, [products, searchQuery, sortBy]);

  return (
    <main className="home">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="home__hero">
        <div className="container home__hero-inner">
          <div className="home__hero-copy">
            <p className="home__hero-eyebrow">Free shipping on orders over $50</p>
            <h1 className="home__hero-title">
              Find everything<br />you need, fast.
            </h1>
            <p className="home__hero-sub">
              Thousands of products across Electronics, Books, Clothing, and more.
            </p>
          </div>
          <div className="home__hero-stats">
            {[
              { num: "1,200+", label: "Products" },
              { num: "4",      label: "Categories" },
              { num: "4.6★",   label: "Avg Rating" },
            ].map(({ num, label }) => (
              <div key={label} className="home__stat">
                <span className="home__stat-num">{num}</span>
                <span className="home__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="container">

        {/* Toolbar */}
        <div className="home__toolbar">
          <CategoryFilter
            categories={categories}
            selected={activeCategory}
            onSelect={setCategory}
          />

          <div className="home__toolbar-right">
            <span className="home__count">
              {!loading && !error && (
                <>
                  {displayedProducts.length}{" "}
                  {displayedProducts.length === 1 ? "result" : "results"}
                  {searchQuery && ` for "${searchQuery}"`}
                </>
              )}
            </span>
            <select
              className="home__sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* States */}
        {loading && <LoadingSpinner message="Fetching products…" />}
        {!loading && error && <ErrorMessage message={error} onRetry={loadData} />}

        {!loading && !error && displayedProducts.length === 0 && (
          <div className="home__empty">
            <span>🔍</span>
            <p>No products found{searchQuery ? ` for "${searchQuery}"` : ""}.</p>
            {(searchQuery || activeCategory) && (
              <a href="/" className="home__empty-link">Clear filters</a>
            )}
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && displayedProducts.length > 0 && (
          <div className="home__grid">
            {displayedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
