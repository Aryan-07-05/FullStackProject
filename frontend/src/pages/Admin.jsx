import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function Admin() {
  const [recommendations, setRecommendations] = useState([]);
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
    try {
      await axios.post("http://localhost:8080/api/recommendations", {
        ...formData,
        minBudget: Number(formData.minBudget),
        maxBudget: Number(formData.maxBudget),
        estimatedCost: Number(formData.estimatedCost),
      });

      alert("Recommendation added");
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
    }
  };

  return (
    <div className="app">
      <div className="navbar">
        <div className="nav-logo">Admin Panel</div>
      </div>

      <div className="container">
        <div className="form-section">
          <h2>Add Recommendation</h2>
          <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input name="minBudget" type="number" placeholder="Min Budget" value={formData.minBudget} onChange={handleChange} required />
            <input name="maxBudget" type="number" placeholder="Max Budget" value={formData.maxBudget} onChange={handleChange} required />

            <select name="targetCondition" value={formData.targetCondition} onChange={handleChange}>
              <option value="poor">Poor</option>
              <option value="average">Average</option>
              <option value="good">Good</option>
            </select>

            <select name="targetGoal" value={formData.targetGoal} onChange={handleChange}>
              <option value="resale">Resale</option>
              <option value="appearance">Appearance</option>
            </select>

            <input name="estimatedCost" type="number" placeholder="Estimated Cost" value={formData.estimatedCost} onChange={handleChange} required />
            <input name="expectedValueBoost" placeholder="Expected Value Boost" value={formData.expectedValueBoost} onChange={handleChange} required />

            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>

            <button type="submit">Add Recommendation</button>
          </form>
        </div>

        <div className="results-section">
          <h2>All Recommendations</h2>
          {recommendations.map((rec) => (
            <div key={rec.id} className="card">
              <h3>{rec.title}</h3>
              <p>{rec.description}</p>
              <p><b>Budget:</b> ₹{rec.minBudget} - ₹{rec.maxBudget}</p>
              <p><b>Condition:</b> {rec.targetCondition}</p>
              <p><b>Goal:</b> {rec.targetGoal}</p>
              <p><b>Estimated Cost:</b> ₹{rec.estimatedCost}</p>
              <p><b>Boost:</b> {rec.expectedValueBoost}</p>
              <p><b>Priority:</b> {rec.priority}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;