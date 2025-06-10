import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AddAdminForm({ onBack }) {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    mot_de_passe: "",
    mot_de_passe_confirmation: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("");
    axios
      .post("http://localhost:8000/api/admins", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setMsg("Nouvel admin ajouté !");
        setForm({
          nom: "",
          email: "",
          mot_de_passe: "",
          mot_de_passe_confirmation: "",
        });
      })
      .catch(() => setMsg("Erreur lors de l'ajout de l'admin"));
  };

  return (
    <form onSubmit={handleSubmit} className="profil-form">
      <h3>
        Ajouter un autre admin
        {onBack && (
          <FaTimes
            onClick={onBack}
            style={{ float: "right", cursor: "pointer" }}
          />
        )}
      </h3>
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={form.nom}
        onChange={handleChange}
        required
        className="profil-input"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="profil-input"
      />
      <input
        type="password"
        name="mot_de_passe"
        placeholder="Mot de passe"
        value={form.mot_de_passe}
        onChange={handleChange}
        required
        className="profil-input"
      />
      <input
        type="password"
        name="mot_de_passe_confirmation"
        placeholder="Confirmer le mot de passe"
        value={form.mot_de_passe_confirmation}
        onChange={handleChange}
        required
        className="profil-input"
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="submit"
          className="profil-edit-btn"
          style={{ marginTop: 8 }}
        >
          Ajouter
        </button>
        <button
          type="button"
          className="profil-edit-btn"
          style={{ marginTop: 8, background: "#ccc", color: "#333" }}
          onClick={onBack}
        >
          Annuler
        </button>
      </div>
      {msg && <div style={{ color: "#e14c7b", marginTop: 8 }}>{msg}</div>}
    </form>
  );
}
