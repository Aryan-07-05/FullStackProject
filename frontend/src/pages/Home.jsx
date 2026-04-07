import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Home() {
  
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    location: "",
    propertyType: "",
    bhk: "",
    areaSqft: "",
    houseAge: "",
    conditionRating: "poor",
    budget: "",
    goal: "resale",
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); 
useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/properties", {
        ...formData,
        bhk: Number(formData.bhk),
        areaSqft: Number(formData.areaSqft),
        houseAge: Number(formData.houseAge),
        budget: Number(formData.budget),
      });
      setRecommendations(response.data);
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }
    setLoading(false);
  };

  return (
    <div className="app">
        <div className="navbar">
  <div className="nav-logo">HomeValue+</div>
  <div className="nav-links">
    <a href="#hero">Home</a>
    <a href="#form">Details</a>
    <a href="#results">Recommendations</a>
  </div>
<div className="nav-actions">
  {user ? (
    <>
      <div className="user-box">👤 {user.email}</div>
      <button
        className="nav-btn secondary-nav-btn"
        onClick={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="nav-btn secondary-nav-btn">Login</Link>
      <Link to="/register" className="nav-btn primary-nav-btn">Register</Link>
      <Link to="/admin" className="nav-btn secondary-nav-btn">Admin</Link>
      <Link to="/admin" className="nav-btn secondary-nav-btn">Admin</Link>
    </>
  )}
</div>
</div>
      <div className="hero" id="hero">
        <div className="hero-content">
         <div className="hero-left">
  <h1>
    Transform Your Home, <span>Increase Its Value</span>
  </h1>

  <p>
    Get personalized, data-driven recommendations to enhance your
    property's value with affordable solutions tailored for Indian homes.
  </p>

  {user && (
    <p style={{ marginTop: "10px", color: "#a78bfa" }}>
      Welcome back, {user.name || user.email}
    </p>
  )}
            <div className="hero-buttons">
              <button className="primary-btn">Get Started</button>
              <button className="secondary-btn">Learn More</button>
            </div>
            <div className="stats">
              <div><b>50K+</b><span>Homes Enhanced</span></div>
              <div><b>₹2L+</b><span>Avg. Value Added</span></div>
              <div><b>95%</b><span>Satisfaction</span></div>
            </div>
          </div>

          <div className="hero-right">
            <div className="mock-card">🏠</div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="form-section" id="form">
          <h2>Property Details</h2>
          <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" onChange={handleChange} required />
            <input name="city" placeholder="City" onChange={handleChange} required />
            <input name="location" placeholder="Location" onChange={handleChange} required />
            <input name="propertyType" placeholder="Property Type" onChange={handleChange} required />
            <input name="bhk" type="number" placeholder="BHK" onChange={handleChange} required />
            <input name="areaSqft" type="number" placeholder="Area (sqft)" onChange={handleChange} required />
            <input name="houseAge" type="number" placeholder="House Age" onChange={handleChange} required />

            <select name="conditionRating" onChange={handleChange}>
              <option value="poor">Poor</option>
              <option value="average">Average</option>
              <option value="good">Good</option>
            </select>

            <input name="budget" type="number" placeholder="Budget" onChange={handleChange} required />

            <select name="goal" onChange={handleChange}>
              <option value="resale">Resale</option>
              <option value="appearance">Appearance</option>
            </select>

            <button type="submit">
              {loading ? "Analyzing..." : "Get Recommendations"}
            </button>
          </form>
        </div>

        <div className="results-section" id="results">
          <h2>Recommendations</h2>
          {recommendations.length === 0 ? (
            <p>No recommendations yet</p>
          ) : (
            recommendations.map((rec,index) => (
              <div key={rec.id} className={`card ${index === 0 ? "best-card" : ""}`}>
                <h3>{rec.title}</h3>
                <p>{rec.description}</p>
                <p><b>Cost:</b> ₹{rec.estimatedCost}</p>
                <p><b>Boost:</b> {rec.expectedValueBoost}</p>
                <p><b>Priority:</b> {rec.priority}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;