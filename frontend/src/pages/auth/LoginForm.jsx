import React, { useState } from "react";
import RegisterForm from "./RegisterForm"; 
import '../style/login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "",mot_de_passe: "" });
  const [showRegister, setShowRegister] = useState(false);
  const [error, setError] = useState("");
  
  const getValue = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/api/login", user);
      localStorage.setItem("token", res.data.access_token);
      if (res.data.redirect) {
        navigate(res.data.redirect);
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de la connexion"
      );
    }
  };

  if (showRegister) return <RegisterForm />;

  return (
    <div className="body"> <div className="login-container">
      <div className="login-box">
        <h2>Bienvenue !</h2>
        <p className="subtitle">Connectez-vous à votre compte sucré</p>

        {error && <div className="error-message">{error}</div>}

        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          onChange={getValue}
          value={user.email}
          required
        />
        <input
          type="password"
          name="mot_de_passe"
          placeholder="Mot de passe"
          onChange={getValue}
          value={user.mot_de_passe }
          required
        />

        <button type="submit" onClick={handleSubmit} value="login">Se connecter</button>

        <p className="mt-4 text-center">
          Vous n'avez pas de compte ?
          <span
            className="text-pink-600 cursor-pointer underline"
            onClick={() => setShowRegister(true)}
          >
            S'inscrire
          </span>
        </p>
      </div>
    </div></div>
   
  );
}
