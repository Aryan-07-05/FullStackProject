import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

function Admin() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    minBudget: "",
    maxBudget: "",
    targetCondition: "average",
    targetGoal: "resale",
    estimatedCost: "",
    expectedValueBoost: "",
    priority: "HIGH",
  });

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/recommendations");
      setRecommendations(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load recommendations");
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/recommendations", {
        ...formData,
        minBudget: Number(formData.minBudget),
        maxBudget: Number(formData.maxBudget),
        estimatedCost: Number(formData.estimatedCost),
      });

      alert("Recommendation added successfully!");
      setFormData({
        title: "",
        description: "",
        minBudget: "",
        maxBudget: "",
        targetCondition: "average",
        targetGoal: "resale",
        estimatedCost: "",
        expectedValueBoost: "",
        priority: "HIGH",
      });
      fetchRecommendations();
    } catch (error) {
      console.error(error);
      alert("Failed to add recommendation");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recommendation?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/recommendations/${id}`);
      fetchRecommendations();
    } catch (error) {
      console.error(error);
      alert("Failed to delete recommendation");
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="nav-logo">HomeValue+</Link>
        <div className="nav-links">
          <Link to="/">← Back to Home</Link>
        </div>
      </nav>

      <div className="admin-layout">
        <div className="form-section">
          <h2>Add Recommendation</h2>
          <p className="section-subtitle">Create a new recommendation rule for property owners</p>

          <form onSubmit={handleSubmit} className="property-form">
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              name="minBudget"
              type="number"
              placeholder="Min Budget (₹)"
              value={formData.minBudget}
              onChange={handleChange}
              required
            />
            <input
              name="maxBudget"
              type="number"
              placeholder="Max Budget (₹)"
              value={formData.maxBudget}
              onChange={handleChange}
              required
            />

            <select name="targetCondition" value={formData.targetCondition} onChange={handleChange}>
              <option value="poor">Poor</option>
              <option value="average">Average</option>
              <option value="good">Good</option>
            </select>

            <select name="targetGoal" value={formData.targetGoal} onChange={handleChange}>
              <option value="resale">Resale</option>
              <option value="appearance">Appearance</option>
            </select>

            <input
              name="estimatedCost"
              type="number"
              placeholder="Estimated Cost (₹)"
              value={formData.estimatedCost}
              onChange={handleChange}
              required
            />
            <input
              name="expectedValueBoost"
              placeholder="Expected Value Boost"
              value={formData.expectedValueBoost}
              onChange={handleChange}
              required
            />

            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading && <span className="spinner"></span>}
              {loading ? "Adding..." : "Add Recommendation"}
            </button>
          </form>
        </div>

        <div className="results-section">
          <h2>All Recommendations ({recommendations.length})</h2>

          {recommendations.length === 0 ? (
            <p className="empty-state">No recommendations found. Add one above.</p>
          ) : (
            <div className="results-grid">
              {recommendations.map((rec) => (
                <div key={rec.id} className="recommendation-card">
                  <h3>{rec.title}</h3>
                  <p>{rec.description}</p>
                  <p className="card-meta">
                    <span className="emoji">💰</span> Budget: ₹{rec.minBudget?.toLocaleString()} – ₹{rec.maxBudget?.toLocaleString()}
                  </p>
                  <p className="card-meta">
                    <span className="emoji">🏠</span> Condition: {rec.targetCondition}
                  </p>
                  <p className="card-meta">
                    <span className="emoji">🎯</span> Goal: {rec.targetGoal}
                  </p>
                  <p className="card-meta">
                    <span className="emoji">💵</span> Est. Cost: ₹{rec.estimatedCost?.toLocaleString()}
                  </p>
                  <p className="card-meta">
                    <span className="emoji">📈</span> Boost: {rec.expectedValueBoost}
                  </p>
                  {rec.priority && (
                    <span className={`priority-badge ${rec.priority.toLowerCase()}`}>
                      {rec.priority}
                    </span>
                  )}
                  <div className="admin-card-actions">
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(rec.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>© 2026 <span>HomeValue+</span> — All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Admin;