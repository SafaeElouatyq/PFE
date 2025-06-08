import React, { useState } from "react";
import '../pages/style/login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLoginForm() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ email: "", mot_de_passe: "" });
  const [error, setError] = useState("");

  const getValue = (e) => {
    setAdmin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/api/admin/login", admin);
      localStorage.setItem("token", res.data.access_token);
      if (res.data.redirect) {
        navigate(res.data.redirect);
      } else {
        navigate("/admin");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de la connexion"
      );
    }
  };

  return (
    <div className="body">
      <div className="login-container">
        <div className="login-box">
          <h2>Admin Login</h2>
          <p className="subtitle">Connectez-vous à votre espace admin</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Adresse e-mail"
              onChange={getValue}
              value={admin.email}
              required
            />
            <input
              type="password"
              name="mot_de_passe"
              placeholder="Mot de passe"
              onChange={getValue}
              value={admin.mot_de_passe}
              required
            />
            <button type="submit" value="login">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
}