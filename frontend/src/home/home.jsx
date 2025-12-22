import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const token = localStorage.getItem("TOKEN");

  return (
    <div className="home-container">
      <section className="home-hero">
        <h1>Digital Health Wallet</h1>
        <p>
          Securely store, manage, and share your medical reports and health
          records anytime, anywhere.
        </p>

        {!token ? (
          <div className="home-actions">
            <Link to="/login" className="home-btn primary">
              Login
            </Link>
            <Link to="/register" className="home-btn secondary">
              Register
            </Link>
          </div>
        ) : (
          <div className="home-actions">
            <Link to="/dashboard" className="home-btn primary">
              Go to Dashboard →
            </Link>
          </div>
        )}
      </section>

      <section className="home-features">
        <h2>What You Can Do</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h4>📄 Store Reports</h4>
            <p>Upload and organize your medical reports securely.</p>
          </div>

          <div className="feature-card">
            <h4>❤️ Track Vitals</h4>
            <p>Maintain history of vitals like BP, Sugar, and Heart Rate.</p>
          </div>

          <div className="feature-card">
            <h4>🔐 Share Securely</h4>
            <p>Share reports with doctors or family with controlled access.</p>
          </div>

          <div className="feature-card">
            <h4>📊 Easy Access</h4>
            <p>Access your health data anytime from one dashboard.</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>
          Your health data is private, secure, and fully under your control.
        </p>
      </footer>
    </div>
  );
};

export default Home;
