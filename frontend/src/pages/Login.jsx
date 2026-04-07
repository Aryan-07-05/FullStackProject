import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", formData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert("Login successful");
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="app">
      <div className="container" style={{ gridTemplateColumns: "1fr", maxWidth: "500px", margin: "50px auto" }}>
        <div className="form-section">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
          </form>
          <p style={{ marginTop: "14px" }}>
            New user? <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;