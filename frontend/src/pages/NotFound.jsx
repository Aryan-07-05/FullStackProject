import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="app">
      <div className="not-found">
        <div className="not-found-code">404</div>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary">
          <span>← Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
