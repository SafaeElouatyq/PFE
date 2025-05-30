import React, { useState } from "react";
import LoginForm from "./LoginForm"; // Import login form
import axios from "axios";

export default function RegisterForm() {
  const [user, setUser] = useState({
    nom: "",
    email: "",
    mot_de_passe: "",
  });
  const [showLogin, setShowLogin] = useState(false);

  const getValue = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const add = (e) => {
    e.preventDefault();
    if (
      user.nom !== "" &&
      user.email !== "" &&
      user.mot_de_passe !== ""
    ) {
      axios.post("http://127.0.0.1:8000/api/register", user).then((m) => {
        console.log("Register success", user);
        setUser({ nom: "", email: "", mot_de_passe: "" });
      });
    }
  };

  if (showLogin) return <LoginForm />;

  return (
    <div className="body">
      <div className="login-container">
      <div className="login-box">
        <h2>Créer un compte</h2>
        <p className="subtitle">Inscrivez-vous pour rejoindre le monde sucré</p>

        <input
          type="text"
          name="nom"
          placeholder="Nom complet"
          onChange={getValue}
          value={user.nom}
          required
        />
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
          value={user.mot_de_passe}
          required
        />
        <button type="submit" onClick={add} value="Sign up">S'inscrire</button>

        <p className="mt-4 text-center">
          Vous avez déjà un compte ?{" "}
          <span
            className="text-pink-600 cursor-pointer underline"
            onClick={() => setShowLogin(true)}
          >
            Se connecter
          </span>
        </p>
      </div>
    </div>
    </div>
    
  );
}
