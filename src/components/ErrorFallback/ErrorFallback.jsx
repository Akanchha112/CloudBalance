import "./ErrorFallback.scss";

const ErrorFallback = () => {
  return (
    <div className="error-fallback">
      <div className="error-card">
        <img
          className="error-illustration"
          src="https://cdn-icons-png.flaticon.com/512/7486/7486780.png"
          alt="error"
        />

        <h2 className="error-title">Oops, something went wrong.</h2>

        <p className="error-subtitle">
          This page is temporarily unavailable. Please try again in a moment.
        </p>

        <a href="/app/cost-explorer" className="error-btn">
          Return Home
        </a>
      </div>
    </div>
  );
};

export default ErrorFallback;
