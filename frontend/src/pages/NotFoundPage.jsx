import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <main className="notfound">
      <span className="notfound__code">404</span>
      <h1 className="notfound__title">Page not found</h1>
      <p className="notfound__text">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="notfound__link">← Back to shop</Link>
    </main>
  );
}
