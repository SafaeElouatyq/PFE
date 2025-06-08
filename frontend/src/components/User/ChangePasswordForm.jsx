import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

export default function ChangePasswordForm({ onBack }) {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [msg, setMsg] = useState("");

  const get = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    setMsg("");
    axios
      .post("http://localhost:8000/api/profile/password", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setMsg(res.data.message);
        setForm({
          current_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
      })
      .catch((err) =>
        setMsg(
          err.response?.data?.message || "Erreur lors du changement du mot de passe"
        )
      );
  };

  return (
    <form onSubmit={submit} className="profil-form">
      <h3>
        Changer le mot de passe
        <FaTimes onClick={onBack} style={{ float: "right", cursor: "pointer" }} />
      </h3>
      <input
        type="password"
        name="current_password"
        placeholder="Mot de passe actuel"
        value={form.current_password}
        onChange={get}
        required
        className="profil-input"
      />
      <input
        type="password"
        name="new_password"
        placeholder="Nouveau mot de passe"
        value={form.new_password}
        onChange={get}
        required
        className="profil-input"
      />
      <input
        type="password"
        name="new_password_confirmation"
        placeholder="Confirmer le nouveau mot de passe"
        value={form.new_password_confirmation}
        onChange={get}
        required
        className="profil-input"
      />
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button type="submit" className="profil-edit-btn">Changer</button>
      </div>
      {msg && <div style={{ color: "#e14c7b", marginTop: 8 }}>{msg}</div>}
    </form>
  );
}