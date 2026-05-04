import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import "./CartPage.css";

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  // ── Empty state ──────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="container">
          <h1 className="cart-page__title">Your Cart</h1>
          <div className="cart-empty">
            <span className="cart-empty__icon">🛒</span>
            <h2 className="cart-empty__heading">Your cart is empty</h2>
            <p className="cart-empty__text">
              Looks like you haven't added anything yet.
            </p>
            <Link to="/" className="cart-empty__cta">
              Continue Shopping →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── Estimated tax + shipping (fake, for realism) ──────────────────────────
  const shipping  = totalPrice >= 50 ? 0 : 4.99;
  const tax       = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <main className="cart-page">
      <div className="container">
        <div className="cart-page__header">
          <h1 className="cart-page__title">
            Your Cart
            <span className="cart-page__count">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </h1>
          <button
            className="cart-page__clear"
            onClick={clearCart}
            aria-label="Clear all items from cart"
          >
            Clear cart
          </button>
        </div>

        <div className="cart-page__layout">

          {/* ── Left: item list ───────────────────────────────────────────── */}
          <section className="cart-page__items" aria-label="Cart items">

            {/* Column headers (desktop only) */}
            <div className="cart-table-head">
              <span style={{ gridColumn: "1 / 3" }}>Product</span>
              <span>Qty</span>
              <span style={{ textAlign: "right" }}>Subtotal</span>
              <span />
            </div>

            {items.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}

            {/* Continue shopping */}
            <div className="cart-page__continue">
              <Link to="/" className="cart-page__continue-link">
                ← Continue shopping
              </Link>
            </div>
          </section>

          {/* ── Right: order summary ──────────────────────────────────────── */}
          <aside className="cart-summary" aria-label="Order summary">
            <h2 className="cart-summary__title">Order Summary</h2>

            <div className="cart-summary__rows">
              <div className="cart-summary__row">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="cart-summary__row">
                <span>Shipping</span>
                <span className={shipping === 0 ? "cart-summary__free" : ""}>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              {shipping === 0 && (
                <p className="cart-summary__shipping-msg">
                  ✓ You qualify for free shipping
                </p>
              )}

              {shipping > 0 && (
                <p className="cart-summary__shipping-msg">
                  Add ${(50 - totalPrice).toFixed(2)} more for free shipping
                </p>
              )}

              <div className="cart-summary__row">
                <span>Estimated tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="cart-summary__divider" />

              <div className="cart-summary__row cart-summary__row--total">
                <span>Order Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="cart-summary__checkout-btn">
              Proceed to Checkout
            </Link>

            <div className="cart-summary__trust">
              <span>🔒 Secure checkout</span>
              <span>·</span>
              <span>Free returns</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
