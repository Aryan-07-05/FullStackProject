import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8080/api/auth/register", formData);

    if (response.data.success) {
      alert("Registration successful");
      navigate("/login");
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="app">
      <div className="container" style={{ gridTemplateColumns: "1fr", maxWidth: "500px", margin: "50px auto" }}>
        <div className="form-section">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Create Account</button>
          </form>
          <p style={{ marginTop: "14px" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;