import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CheckoutPage.css";

// ── Tiny field component ─────────────────────────────────────────────────────
function Field({ label, id, type = "text", placeholder, value, onChange, half }) {
  return (
    <div className={`co-field ${half ? "co-field--half" : ""}`}>
      <label className="co-field__label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        className="co-field__input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
}

// ── Steps ────────────────────────────────────────────────────────────────────
const STEPS = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep]       = useState(0); // 0 Shipping | 1 Payment | 2 Review
  const [success, setSuccess] = useState(false);
  const [placing, setPlacing] = useState(false);

  // Form state
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    address: "", city: "", zip: "", country: "United States",
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  // Derived
  const shipping   = totalPrice >= 50 ? 0 : 4.99;
  const tax        = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  // Redirect empty cart away from checkout
  if (!success && items.length === 0) {
    return (
      <main className="co-page">
        <div className="container">
          <div className="co-empty">
            <span>🛒</span>
            <h2>Nothing to check out</h2>
            <p>Add some products first.</p>
            <Link to="/" className="co-btn co-btn--primary">Go Shopping</Link>
          </div>
        </div>
      </main>
    );
  }

  // ── Success screen ───────────────────────────────────────────────────────
  if (success) {
    return (
      <main className="co-page">
        <div className="container">
          <div className="co-success">
            <div className="co-success__ring">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h1 className="co-success__title">Order placed!</h1>
            <p className="co-success__sub">
              Thanks for your order. A confirmation would be sent to{" "}
              <strong>{form.email || "your email"}</strong>.
            </p>
            <div className="co-success__meta">
              <div className="co-success__meta-row">
                <span>Order total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
              <div className="co-success__meta-row">
                <span>Est. delivery</span>
                <span>3–5 business days</span>
              </div>
            </div>
            <Link to="/" className="co-btn co-btn--primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── Place order ──────────────────────────────────────────────────────────
  const handlePlaceOrder = () => {
    setPlacing(true);
    // Simulate a network delay for realism
    setTimeout(() => {
      clearCart();
      setSuccess(true);
      setPlacing(false);
    }, 1200);
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <main className="co-page">
      <div className="container">

        {/* Breadcrumb steps */}
        <nav className="co-steps" aria-label="Checkout steps">
          {STEPS.map((label, i) => (
            <div key={label} className="co-steps__item">
              <button
                className={[
                  "co-steps__btn",
                  i === step  ? "co-steps__btn--active"  : "",
                  i <  step   ? "co-steps__btn--done"    : "",
                  i >  step   ? "co-steps__btn--future"  : "",
                ].join(" ")}
                onClick={() => i < step && setStep(i)}
                disabled={i >= step}
                aria-current={i === step ? "step" : undefined}
              >
                <span className="co-steps__num">
                  {i < step ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="3"
                      strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : i + 1}
                </span>
                {label}
              </button>
              {i < STEPS.length - 1 && <span className="co-steps__sep" aria-hidden>›</span>}
            </div>
          ))}
        </nav>

        <div className="co-layout">

          {/* ── LEFT: Form panels ───────────────────────────────────────── */}
          <div className="co-form-area">

            {/* STEP 0 — Shipping */}
            {step === 0 && (
              <section className="co-panel" aria-labelledby="shipping-title">
                <h2 className="co-panel__title" id="shipping-title">
                  Shipping Information
                </h2>

                <div className="co-fields">
                  <Field label="First name"  id="fn" half placeholder="Jane"
                    value={form.firstName} onChange={set("firstName")} />
                  <Field label="Last name"   id="ln" half placeholder="Smith"
                    value={form.lastName}  onChange={set("lastName")}  />
                  <Field label="Email address" id="em" type="email" placeholder="jane@example.com"
                    value={form.email}     onChange={set("email")}     />
                  <Field label="Street address" id="addr" placeholder="123 Main St"
                    value={form.address}   onChange={set("address")}   />
                  <Field label="City"  id="city" half placeholder="New York"
                    value={form.city}      onChange={set("city")}      />
                  <Field label="ZIP"   id="zip"  half placeholder="10001"
                    value={form.zip}       onChange={set("zip")}       />

                  <div className="co-field">
                    <label className="co-field__label" htmlFor="country">Country</label>
                    <select
                      id="country"
                      className="co-field__input co-field__select"
                      value={form.country}
                      onChange={set("country")}
                    >
                      {["United States","United Kingdom","Canada","Australia","Germany","France","Egypt","Other"].map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="co-panel__actions">
                  <button className="co-btn co-btn--primary" onClick={() => setStep(1)}>
                    Continue to Payment →
                  </button>
                </div>
              </section>
            )}

            {/* STEP 1 — Payment */}
            {step === 1 && (
              <section className="co-panel" aria-labelledby="payment-title">
                <h2 className="co-panel__title" id="payment-title">
                  Payment Details
                </h2>
                <p className="co-panel__note">
                  🔒 This is a demo — no real payment is processed.
                </p>

                <div className="co-fields">
                  <Field label="Name on card" id="cname" placeholder="Jane Smith"
                    value={form.cardName}   onChange={set("cardName")}   />
                  <Field label="Card number" id="cnum" placeholder="4242 4242 4242 4242"
                    value={form.cardNumber} onChange={set("cardNumber")} />
                  <Field label="Expiry" id="exp" half placeholder="MM / YY"
                    value={form.expiry}     onChange={set("expiry")}     />
                  <Field label="CVV" id="cvv" half placeholder="123"
                    value={form.cvv}        onChange={set("cvv")}        />
                </div>

                <div className="co-card-icons">
                  {["VISA","MC","AMEX","PAYPAL"].map(b => (
                    <span key={b} className="co-card-icon">{b}</span>
                  ))}
                </div>

                <div className="co-panel__actions">
                  <button className="co-btn co-btn--ghost" onClick={() => setStep(0)}>
                    ← Back
                  </button>
                  <button className="co-btn co-btn--primary" onClick={() => setStep(2)}>
                    Review Order →
                  </button>
                </div>
              </section>
            )}

            {/* STEP 2 — Review */}
            {step === 2 && (
              <section className="co-panel" aria-labelledby="review-title">
                <h2 className="co-panel__title" id="review-title">
                  Review Your Order
                </h2>

                {/* Shipping summary */}
                <div className="co-review-block">
                  <div className="co-review-block__header">
                    <span className="co-review-block__label">Ship to</span>
                    <button className="co-review-block__edit" onClick={() => setStep(0)}>Edit</button>
                  </div>
                  <p className="co-review-block__value">
                    {form.firstName} {form.lastName}<br />
                    {form.address}, {form.city} {form.zip}<br />
                    {form.country}
                  </p>
                </div>

                {/* Payment summary */}
                <div className="co-review-block">
                  <div className="co-review-block__header">
                    <span className="co-review-block__label">Payment</span>
                    <button className="co-review-block__edit" onClick={() => setStep(1)}>Edit</button>
                  </div>
                  <p className="co-review-block__value">
                    •••• •••• •••• {form.cardNumber.slice(-4) || "——"}
                  </p>
                </div>

                {/* Items */}
                <div className="co-review-items">
                  {items.map(item => (
                    <div key={item._id} className="co-review-item">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="co-review-item__img"
                        onError={(e) => { e.target.src = `https://placehold.co/56x56/f0ede8/9c958d?text=?`; }}
                      />
                      <div className="co-review-item__info">
                        <span className="co-review-item__name">{item.name}</span>
                        <span className="co-review-item__qty">Qty: {item.quantity}</span>
                      </div>
                      <span className="co-review-item__price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="co-panel__actions">
                  <button className="co-btn co-btn--ghost" onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button
                    className={`co-btn co-btn--place ${placing ? "co-btn--loading" : ""}`}
                    onClick={handlePlaceOrder}
                    disabled={placing}
                  >
                    {placing ? (
                      <><span className="co-spinner" />Placing order…</>
                    ) : (
                      <>Place Order · ${orderTotal.toFixed(2)}</>
                    )}
                  </button>
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT: Order summary ────────────────────────────────────── */}
          <aside className="co-summary" aria-label="Order summary">
            <h2 className="co-summary__title">Order Summary</h2>

            <ul className="co-summary__items">
              {items.map(item => (
                <li key={item._id} className="co-summary__item">
                  <div className="co-summary__item-img-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="co-summary__item-img"
                      onError={(e) => { e.target.src = `https://placehold.co/48x48/f0ede8/9c958d?text=?`; }}
                    />
                    <span className="co-summary__item-qty">{item.quantity}</span>
                  </div>
                  <span className="co-summary__item-name">{item.name}</span>
                  <span className="co-summary__item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="co-summary__divider" />

            <div className="co-summary__rows">
              <div className="co-summary__row">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="co-summary__row">
                <span>Shipping</span>
                <span className={shipping === 0 ? "co-summary__free" : ""}>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="co-summary__row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="co-summary__divider" />
              <div className="co-summary__row co-summary__row--total">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
