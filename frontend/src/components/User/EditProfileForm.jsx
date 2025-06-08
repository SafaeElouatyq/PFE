import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

export default function EditProfileForm({ onBack }) {
  const [form, setForm] = useState({
    nom: "",
    adresse: "",
    telephone: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setForm({
          nom: res.data.nom || "",
          adresse: res.data.adresse || "",
          telephone: res.data.telephone || "",
          image: null,
        });
        setPreview(
          res.data.image
            ? `http://localhost:8000/storage/${res.data.image}`
            : null
        );
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nom", form.nom);
    data.append("adresse", form.adresse);
    data.append("telephone", form.telephone);
    if (form.image) data.append("image", form.image);

    axios
      .post("http://localhost:8000/api/profile", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        if (onBack) onBack();
      });
  };

  return (
    <form onSubmit={handleSubmit} className="profil-form">
      <h3>
        Modifier mes informations
        <FaTimes
          onClick={onBack}
          style={{ float: "right", cursor: "pointer" }}
        />
      </h3>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        style={{ marginBottom: 10 }}
      />
      {preview && (
        <img
          src={preview}
          alt="Aperçu"
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            marginBottom: 10,
          }}
        />
      )}
      <input
        type="text"
        name="nom"
        value={form.nom}
        onChange={handleChange}
        placeholder="Nom"
        className="profil-input"
        required
      />
      <input
        type="text"
        name="adresse"
        value={form.adresse}
        onChange={handleChange}
        placeholder="Adresse"
        className="profil-input"
      />
      <input
        type="text"
        name="telephone"
        value={form.telephone}
        onChange={handleChange}
        placeholder="Téléphone"
        className="profil-input"
      />
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button type="submit" className="profil-edit-btn">
          Enregistrer
        </button>
      </div>
    </form>
  );
}
