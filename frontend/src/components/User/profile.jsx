import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCamera ,FaEdit} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Profile({ onEdit, onPassword }) {
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setUser(res.data);
        setPreview(res.data.image ? `http://localhost:8000/storage/${res.data.image}` : null);
      });
  }, []);

  const PhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));

    }
  };

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return <div></div>;

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
          <span className="profil-info-value">{user.nom}</span>
        </div>
        <div className="profil-info-row">
          <span className="profil-info-label">Email</span>
          <span className="profil-info-value">{user.email}</span>
        </div>
        <div className="profil-info-row">
          <span className="profil-info-label">Téléphone</span>
          <span className="profil-info-value">{user.telephone || <span className="profil-missing">Non renseigné</span>}</span>
        </div>
        
        <div className="profil-info-row">
          <span className="profil-info-label">Adresse</span>
          <span className="profil-info-value">{user.adresse || <span className="profil-missing">Non renseignée</span>}</span>
        </div>

        <div className="profil-links-row">
        <a className="profil-link" onClick={onPassword} style={{cursor: "pointer"}}>
          <FaEdit style={{marginRight:"5px"}} />
          Changer le mot de passe
        </a>

        <a className="profil-link" onClick={onEdit} style={{cursor: "pointer"}}>
          <FaEdit style={{marginRight:"5px"}} />
          Modifier les informations
        </a>        

      </div>
      </div>
      
      <button
        className="profil-logout-btn"
        onClick={Logout}

      >
        Déconnexion
      </button>
    </div>
  );
}