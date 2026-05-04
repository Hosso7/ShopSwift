import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setMenuOpen(false);
    }
  };

  return (
    <header className="navbar">
      {/* ── Primary bar ──────────────────────────────────────────────── */}
      <div className="navbar__primary">
        <div className="navbar__inner container">

          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-icon">◈</span>
            <span className="navbar__logo-text">ShopSwift</span>
          </Link>

          {/* Search */}
          <form className="navbar__search" onSubmit={handleSearch}>
            <input
              type="text"
              className="navbar__search-input"
              placeholder="Search products, categories…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            <button type="submit" className="navbar__search-btn" aria-label="Submit search">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </form>

          {/* Right actions */}
          <nav className="navbar__actions">
            <Link to="/" className="navbar__link navbar__link--desktop">Shop</Link>

            <Link to="/cart" className="navbar__cart" aria-label={`Cart, ${totalItems} items`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {totalItems > 0 && (
                <span className="navbar__cart-badge" aria-hidden="true">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="navbar__hamburger"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className={`navbar__hamburger-bar ${menuOpen ? "navbar__hamburger-bar--open" : ""}`} />
            </button>
          </nav>
        </div>
      </div>

      {/* ── Secondary category bar ────────────────────────────────────── */}
      <div className="navbar__secondary">
        <div className="navbar__secondary-inner container">
          {["Electronics","Books","Clothing","Home & Kitchen"].map((cat) => (
            <NavLink
              key={cat}
              to={`/?category=${encodeURIComponent(cat)}`}
              className={({ isActive }) =>
                `navbar__cat-link${isActive ? " navbar__cat-link--active" : ""}`
              }
            >
              {cat}
            </NavLink>
          ))}
          <NavLink to="/?deals=1" className="navbar__cat-link navbar__cat-link--hot">
            🔥 Deals
          </NavLink>
        </div>
      </div>

      {/* ── Mobile slide-down menu ────────────────────────────────────── */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <form className="navbar__mobile-search" onSubmit={handleSearch}>
            <input
              type="text"
              className="navbar__search-input"
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="navbar__search-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </form>
          {["Electronics","Books","Clothing","Home & Kitchen"].map((cat) => (
            <Link
              key={cat}
              to={`/?category=${encodeURIComponent(cat)}`}
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {cat}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
