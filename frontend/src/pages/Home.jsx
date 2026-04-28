import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    city: "",
    location: "",
    propertyType: "",
    bhk: "",
    areaSqft: "",
    houseAge: "",
    conditionRating: "",
    budget: "",
    goal: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + "/api/properties", {
        title: formData.title,
        city: formData.city,
        location: formData.location,
        propertyType: formData.propertyType,
        bhk: Number(formData.bhk),
        areaSqft: Number(formData.areaSqft),
        houseAge: Number(formData.houseAge),
        conditionRating: formData.conditionRating,
        budget: Number(formData.budget),
        goal: formData.goal
      });

      setRecommendations(response.data);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="nav-logo">HomeValue+</Link>

        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#form">Details</a>
          <a href="#results">Results</a>

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span className="nav-user-name">
                {user.name || user.username || user.email}
              </span>
              {user.role === "ADMIN" && (
                <Link to="/admin">Admin</Link>
              )}
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <section id="hero" className="hero">
        <h1>Boost Your Home Resale Value</h1>
        <p className="hero-subtitle">
          Get smart, budget-friendly suggestions to improve your property before selling.
        </p>
        <p className="hero-accent">
          ✦ Smart AI-powered recommendations for better resale value
        </p>

        {user && (
          <div className="hero-welcome">
            👋 Welcome back, {user.name || user.username || user.email}!
          </div>
        )}
      </section>

      <section id="form" className="form-section">
        <h2>Enter Property Details</h2>
        <p className="section-subtitle">Fill in your property information to get personalized recommendations</p>

        <form onSubmit={handleSubmit} className="property-form">
          <input
            name="title"
            placeholder="Property Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location / Area"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            name="propertyType"
            placeholder="Property Type (Apartment, Villa...)"
            value={formData.propertyType}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="bhk"
            placeholder="BHK (e.g. 2, 3)"
            value={formData.bhk}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="areaSqft"
            placeholder="Area in Sq Ft"
            value={formData.areaSqft}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="houseAge"
            placeholder="House Age (years)"
            value={formData.houseAge}
            onChange={handleChange}
            required
          />

          <select
            name="conditionRating"
            value={formData.conditionRating}
            onChange={handleChange}
            required
          >
            <option value="">Select Condition</option>
            <option value="Poor">Poor</option>
            <option value="Average">Average</option>
            <option value="Good">Good</option>
          </select>

          <input
            type="number"
            name="budget"
            placeholder="Budget (₹)"
            value={formData.budget}
            onChange={handleChange}
            required
          />

          <input
            name="goal"
            placeholder="Goal (resale, appearance...)"
            value={formData.goal}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading && <span className="spinner"></span>}
            {loading ? "Analyzing..." : "Get Recommendations"}
          </button>
        </form>
      </section>

      <section id="results" className="results-section">
        <h2>Recommendations</h2>

        {recommendations.length === 0 ? (
          <p className="empty-state">
            No recommendations yet. Fill in your property details above and submit the form.
          </p>
        ) : (
          <div className="results-grid">
            {recommendations.map((rec) => (
              <div key={rec.id} className="recommendation-card">
                <h3>{rec.description}</h3>
                <p className="card-meta">
                  <span className="emoji">💰</span> Cost: ₹{rec.estimatedCost?.toLocaleString()}
                </p>
                <p className="card-meta">
                  <span className="emoji">📈</span> Impact: {rec.expectedValueBoost}
                </p>
                <p className="card-meta">
                  <span className="emoji">📊</span> Budget: ₹{rec.minBudget?.toLocaleString()} – ₹{rec.maxBudget?.toLocaleString()}
                </p>
                {rec.priority && (
                  <span className={`priority-badge ${rec.priority.toLowerCase()}`}>
                    {rec.priority}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <p>© 2026 <span>HomeValue+</span> — All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;