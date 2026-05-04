import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartItem.css";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const { _id, name, price, image, category, quantity, stock } = item;
  const subtotal = price * quantity;

  return (
    <div className="cart-item">
      {/* Product image */}
      <Link to={`/product/${_id}`} className="cart-item__img-wrap" tabIndex={-1}>
        <img
          src={image}
          alt={name}
          className="cart-item__img"
          onError={(e) => {
            e.target.src = `https://placehold.co/120x96/f0ede8/9c958d?text=${encodeURIComponent(category)}`;
          }}
        />
      </Link>

      {/* Name + category */}
      <div className="cart-item__info">
        <Link to={`/product/${_id}`} className="cart-item__name">{name}</Link>
        <span className="cart-item__category">{category}</span>
        <span className="cart-item__unit-price">${price.toFixed(2)} each</span>

        {/* Remove link (visible on mobile below the name) */}
        <button
          className="cart-item__remove-inline"
          onClick={() => removeItem(_id)}
          aria-label={`Remove ${name} from cart`}
        >
          Remove
        </button>
      </div>

      {/* Quantity stepper */}
      <div className="cart-item__qty-wrap">
        <div className="cart-item__qty">
          <button
            className="cart-item__qty-btn"
            onClick={() => updateQuantity(_id, quantity - 1)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="cart-item__qty-val">{quantity}</span>
          <button
            className="cart-item__qty-btn"
            onClick={() => updateQuantity(_id, quantity + 1)}
            disabled={quantity >= stock}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        {quantity >= stock && (
          <span className="cart-item__stock-warn">Max stock</span>
        )}
      </div>

      {/* Subtotal */}
      <div className="cart-item__subtotal">
        ${subtotal.toFixed(2)}
      </div>

      {/* Remove button (desktop column) */}
      <button
        className="cart-item__remove"
        onClick={() => removeItem(_id)}
        aria-label={`Remove ${name}`}
        title="Remove item"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
        </svg>
      </button>
    </div>
  );
}
