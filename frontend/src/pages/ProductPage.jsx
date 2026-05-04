import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import "./ProductPage.css";

function StarRating({ rating }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (rating >= i + 1) return "full";
    if (rating >= i + 0.5) return "half";
    return "empty";
  });
  return (
    <div className="detail-stars">
      {stars.map((t, i) => (
        <span key={i} className={`star star--${t}`}>★</span>
      ))}
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [quantity, setQty]    = useState(1);
  const [added, setAdded]     = useState(false);

  const loadProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      setError(
        err.response?.status === 404
          ? "This product could not be found."
          : err.response?.data?.message || "Failed to load product."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const { addItem, getItemQuantity } = useCart();
  const cartQty = product ? getItemQuantity(product._id) : 0;

  // Real add-to-cart — replaces the placeholder
  const handleAddToCart = () => {
    if (!product || product.stock === 0) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <main className="detail-page container">
      <LoadingSpinner message="Loading product…" />
    </main>
  );

  if (error) return (
    <main className="detail-page container">
      <ErrorMessage message={error} onRetry={loadProduct} />
      <div style={{ textAlign: "center", marginTop: "var(--space-lg)" }}>
        <Link to="/" className="detail__back-link">← Back to shop</Link>
      </div>
    </main>
  );

  if (!product) return null;

  const {
    name, price, image, category,
    description, stock, rating, reviewCount,
  } = product;

  const isOutOfStock = stock === 0;
  const isLowStock   = stock > 0 && stock <= 5;

  return (
    <main className="detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="detail__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Shop</Link>
          <span>/</span>
          <Link to={`/?category=${encodeURIComponent(category)}`}>{category}</Link>
          <span>/</span>
          <span className="detail__breadcrumb-current">{name}</span>
        </nav>

        {/* Product layout */}
        <div className="detail__layout">
          {/* Left: image */}
          <div className="detail__image-wrap">
            <img
              src={image}
              alt={name}
              className="detail__image"
              onError={(e) => {
                e.target.src = `https://placehold.co/600x480/f0ede8/9c958d?text=${encodeURIComponent(category)}`;
              }}
            />
          </div>

          {/* Right: info */}
          <div className="detail__info">
            <span className="detail__category">{category}</span>
            <h1 className="detail__name">{name}</h1>

            {/* Rating row */}
            {rating > 0 && (
              <div className="detail__rating">
                <StarRating rating={rating} />
                <span className="detail__rating-score">{rating.toFixed(1)}</span>
                {reviewCount > 0 && (
                  <span className="detail__rating-count">
                    {reviewCount.toLocaleString()} reviews
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="detail__price-row">
              <span className="detail__price">${price.toFixed(2)}</span>
              {isOutOfStock && <span className="detail__stock detail__stock--out">Out of stock</span>}
              {isLowStock   && <span className="detail__stock detail__stock--low">Only {stock} left!</span>}
              {!isOutOfStock && !isLowStock && (
                <span className="detail__stock detail__stock--ok">In stock</span>
              )}
              {cartQty > 0 && (
                <span className="detail__in-cart">{cartQty} in cart</span>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="detail__description">{description}</p>
            )}

            {/* Divider */}
            <hr className="detail__divider" />

            {/* Quantity + Add to Cart */}
            <div className="detail__actions">
              <div className="detail__qty">
                <button
                  className="detail__qty-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  disabled={isOutOfStock}
                >−</button>
                <span className="detail__qty-value">{quantity}</span>
                <button
                  className="detail__qty-btn"
                  onClick={() => setQty((q) => Math.min(stock, q + 1))}
                  aria-label="Increase quantity"
                  disabled={isOutOfStock || quantity >= stock}
                >+</button>
              </div>

              <button
                className={`detail__add-btn ${added ? "detail__add-btn--added" : ""}`}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                {added ? "✓ Added to Cart" : isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>

              {cartQty > 0 && (
                <Link to="/cart" className="detail__view-cart-btn">
                  View Cart ({cartQty})
                </Link>
              )}
            </div>

            {/* Meta */}
            <div className="detail__meta">
              <div className="detail__meta-row">
                <span className="detail__meta-label">Category</span>
                <Link
                  to={`/?category=${encodeURIComponent(category)}`}
                  className="detail__meta-value detail__meta-link"
                >
                  {category}
                </Link>
              </div>
              <div className="detail__meta-row">
                <span className="detail__meta-label">Availability</span>
                <span className="detail__meta-value">
                  {isOutOfStock ? "Out of stock" : `${stock} units`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="detail__back">
          <button className="detail__back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    </main>
  );
}
