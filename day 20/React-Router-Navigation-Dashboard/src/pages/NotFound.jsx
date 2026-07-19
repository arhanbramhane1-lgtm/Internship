// useNavigate to programmatically go back to Home
import { useNavigate, Link } from "react-router-dom";
import "./NotFound.css";

/**
 * 404 Not Found Page
 * - Rendered by React Router when no route matches
 * - useNavigate for the "Go Home" button
 * - Animated glowing "404" number
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="page-enter">
      <div className="not-found-page" aria-labelledby="not-found-heading">
        <div className="not-found-emoji" aria-hidden="true">🛸</div>
        <div className="not-found-number" aria-label="Error 404">404</div>
        <h1 className="not-found-title" id="not-found-heading">
          Page Not Found
        </h1>
        <p className="not-found-desc">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="not-found-actions">
          {/* useNavigate for programmatic navigation */}
          <button
            className="btn-primary"
            onClick={() => navigate("/")}
            id="not-found-home"
          >
            🏠 Go Home
          </button>
          {/* Link for declarative navigation */}
          <Link to="/products" className="btn-ghost" id="not-found-products">
            🛍️ View Products
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
