import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo-icon">◈</span>
          <span className="footer__logo-text">ShopSwift</span>
          <p className="footer__tagline">Your everyday marketplace.</p>
        </div>

        <nav className="footer__links" aria-label="Footer navigation">
          {[
            { to: "/",                 label: "Shop" },
            { to: "/cart",             label: "Cart" },
            { to: "/?category=Electronics",    label: "Electronics" },
            { to: "/?category=Books",          label: "Books" },
            { to: "/?category=Clothing",       label: "Clothing" },
            { to: "/?category=Home+%26+Kitchen", label: "Home & Kitchen" },
          ].map(({ to, label }) => (
            <Link key={label} to={to} className="footer__link">{label}</Link>
          ))}
        </nav>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {year} ShopSwift — Academic project demo. No real transactions.</p>
        </div>
      </div>
    </footer>
  );
}
