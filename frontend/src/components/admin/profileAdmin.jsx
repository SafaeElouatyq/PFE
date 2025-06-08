import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCamera, FaEdit, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProfileAdmin({ onEdit, onPassword, onAddAdmin }) {
  const [admin, setAdmin] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/admin/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setAdmin(res.data);
        setPreview(
          res.data.image
            ? `http://localhost:8000/storage/admins/${res.data.image}`
            : null
        );
      });
  }, []);

  const PhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };


  if (!admin) return <div></div>;

  return (
    <div className="profil-card-v2">
      <div className="profil-photo-section">
        <img
          src={preview || "/default-avatar.png"}
          className="profil-avatar-v2"
        />
        <label className="profil-photo-btn">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={PhotoChange}
          />
          <FaCamera className="profil-photo-icon" />
        </label>
      </div>
      <div className="profil-infos-list">
        <div className="profil-info-row">
          <span className="profil-info-label">Nom d'utilisateur</span>
          <span className="profil-info-value">{admin.nom}</span>
        </div>
        <div className="profil-info-row">
          <span className="profil-info-label">Email</span>
          <span className="profil-info-value">{admin.email}</span>
        </div>
        <div className="profil-info-row">
          <span className="profil-info-label">Téléphone</span>
          <span className="profil-info-value">
            {admin.telephone || (
              <span className="profil-missing">Non renseigné</span>
            )}
          </span>
        </div>
        <div className="profil-info-row">
          <span className="profil-info-label">Adresse</span>
          <span className="profil-info-value">
            {admin.adresse || (
              <span className="profil-missing">Non renseignée</span>
            )}
          </span>
        </div>
        <div className="profil-links-row">
          <a
            className="profil-link"
            onClick={onPassword}
            style={{ cursor: "pointer" }}
          >
            <FaEdit style={{ marginRight: "5px" }} />
            Changer le mot de passe
          </a>
          <a
            className="profil-link"
            onClick={onEdit}
            style={{ cursor: "pointer" }}
          >
            <FaEdit style={{ marginRight: "5px" }} />
            Modifier les informations
          </a>
          <a
            className="profil-link"
            onClick={onAddAdmin}
            style={{ cursor: "pointer", color: "#ff5e91" }}
          >
            <FaUserPlus style={{ marginRight: "5px" }} />
            Ajouter un admin
          </a>
        </div>
      </div>

    </div>
  );
}