import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function StarRating({ rating, reviewCount }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (rating >= i + 1) return "full";
    if (rating >= i + 0.5) return "half";
    return "empty";
  });

  return (
    <div className="stars" aria-label={`${rating} out of 5 stars`}>
      {stars.map((type, i) => (
        <span key={i} className={`star star--${type}`}>★</span>
      ))}
      {reviewCount != null && (
        <span className="stars__count">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { _id, name, price, image, category, rating, reviewCount, stock } = product;
  const { addItem, isInCart } = useCart();
  const [flash, setFlash] = useState(false);

  const isOutOfStock = stock === 0;
  const inCart = isInCart(_id);

  const handleAdd = (e) => {
    e.preventDefault();   // don't navigate on button click
    e.stopPropagation();
    if (isOutOfStock) return;
    addItem(product, 1);
    setFlash(true);
    setTimeout(() => setFlash(false), 1500);
  };

  return (
    <Link to={`/product/${_id}`} className="product-card" aria-label={`View ${name}`}>
      {/* Image */}
      <div className="product-card__image-wrap">
        <img
          src={image}
          alt={name}
          className="product-card__image"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x320/f0ede8/9c958d?text=${encodeURIComponent(category)}`;
          }}
        />
        {stock <= 5 && stock > 0 && (
          <span className="product-card__badge product-card__badge--low">
            Only {stock} left
          </span>
        )}
        {stock === 0 && (
          <span className="product-card__badge product-card__badge--out">
            Out of stock
          </span>
        )}
      </div>

      {/* Info */}
      <div className="product-card__body">
        <span className="product-card__category">{category}</span>
        <h3 className="product-card__name">{name}</h3>

        {rating > 0 && (
          <StarRating rating={rating} reviewCount={reviewCount} />
        )}

        <div className="product-card__footer">
          <span className="product-card__price">${price.toFixed(2)}</span>
        </div>

        <button
          className={[
            "product-card__add-btn",
            isOutOfStock           ? "product-card__add-btn--disabled"  : "",
            flash                  ? "product-card__add-btn--flash"     : "",
            inCart && !flash       ? "product-card__add-btn--in-cart"   : "",
          ].join(" ")}
          onClick={handleAdd}
          disabled={isOutOfStock}
          aria-label={isOutOfStock ? "Out of stock" : flash ? "Added" : "Add to cart"}
        >
          {flash ? "✓ Added!" : isOutOfStock ? "Out of Stock" : inCart ? "✓ Add More" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}
