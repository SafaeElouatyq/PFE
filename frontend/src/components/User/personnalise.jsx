import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/personnalise.css";
import {
  FaShapes,
  FaBirthdayCake,
  FaIceCream,
  FaLayerGroup,
  FaPalette,
  FaFileImage,
  FaRegComment,
  FaStickyNote,
  FaCookieBite,
  FaEnvelopeOpenText
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const formes = [
  { label: "Rond", value: "rond" },
  { label: "Carré", value: "carre" },
  { label: "Cœur", value: "coeur" },
  { label: "Rectangle", value: "rectangle" },
];

const tailles = [
  { label: "Petit", value: "petit", desc: '6" (8-10 parts)', prix: 20 },
  { label: "Moyen", value: "moyen", desc: '8" (12-15 parts)', prix: 30 },
  { label: "Grand", value: "grand", desc: '10" (18-20 parts)', prix: 40 },
];

const saveurs = [
  { label: "Vanille", value: "vanille", desc: "Génoise vanille", prix: 20 },
  { label: "Chocolat", value: "chocolat", desc: "Génoise chocolat", prix: 25 },
  {
    label: "Red Velvet",
    value: "redvelvet",
    desc: "Génoise red velvet",
    prix: 35,
  },
  {
    label: "Fruits rouges",
    value: "fruitsrouges",
    desc: "Génoise fruits rouges",
    prix: 30,
  },
  { label: "Citron", value: "citron", desc: "Génoise citron", prix: 22 },
  { label: "Caramel", value: "caramel", desc: "Génoise caramel", prix: 28 },
  { label: "Amande", value: "amande", desc: "Génoise amande", prix: 27 },
  { label: "Pistache", value: "pistache", desc: "Génoise pistache", prix: 32 },
  { label: "Noisette", value: "noisette", desc: "Génoise noisette", prix: 30 },
  { label: "Café", value: "cafe", desc: "Génoise café", prix: 26 },
  { label: "Tiramisu", value: "tiramisu", desc: "Génoise tiramisu", prix: 35 },
];

const cremes = [
  { label: "Vanille", value: "vanille" },
  { label: "Chocolat blanc", value: "chocolat_blanc" },
  { label: "Chocolat au lait", value: "chocolat_lait" },
  { label: "Chocolat noir", value: "chocolat_noir" },
  { label: "Cream cheese", value: "cream_cheese" },
  { label: "Framboise", value: "framboise" },
  { label: "Citron", value: "citron" },
  { label: "Fraise", value: "fraise" },
  { label: "Pistache", value: "pistache" },
  { label: "Caramel", value: "caramel" },
];

const styles = [
  {
    label: "Classique",
    value: "classique",
    desc: "Crème au beurre classique",
    prix: 15,
  },
  {
    label: "Moderne",
    value: "moderne",
    desc: "Design épuré et élégant",
    prix: 25,
  },
  {
    label: "Anniversaire",
    value: "anniversaire",
    desc: "Coloré avec des sprinkles",
    prix: 20,
  },
  {
    label: "Mariage",
    value: "mariage",
    desc: "Design fondant élégant",
    prix: 50,
  },
  {
    label: "Thème personnalisé",
    value: "theme",
    desc: "Personnalisé selon vos souhaits",
    prix: 60,
  },
];

export default function Personnalise() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [personnalise, setPersonnalise] = useState({
    forme: "",
    taille: "",
    saveur: "",
    style: "",
    cremeInterieur: "",
    cremeExterieur: "",
    message: "",
    decoration: "",
    imageModele: null,
    notes: "",
    prixEstime: 0,
  });

  const calcPrix = () => {
    const taillePrix =
      tailles.find((t) => t.value === personnalise.taille)?.prix || 0;
    const saveurPrix =
      saveurs.find((s) => s.value === personnalise.saveur)?.prix || 0;
    const stylePrix =
      styles.find((s) => s.value === personnalise.style)?.prix || 0;
    return taillePrix + saveurPrix + stylePrix;
  };

  useEffect(() => {
    const newPrix = calcPrix();
    if (personnalise.prixEstime !== newPrix) {
      setPersonnalise((p) => ({ ...p, prixEstime: newPrix }));
    }
  }, [personnalise.taille, personnalise.saveur, personnalise.style]);

  const handleFileChange = (e) => {
    setPersonnalise({ ...personnalise, imageModele: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté pour personnaliser un gâteau.");
      return;
    }
    const formData = new FormData();

    for (let key in personnalise) {
      if (key === "imageModele" && personnalise[key]) {
        formData.append("image_modele", personnalise[key]);
      } else if (key !== "imageModele") {
        formData.append(key, personnalise[key]);
      }
    }

    try {
      await axios.post("http://localhost:8000/api/personnalise", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      navigate("/panier");
      setPersonnalise({
        forme: "",
        taille: "",
        saveur: "",
        style: "",
        cremeInterieur: "",
        cremeExterieur: "",
        message: "",
        decoration: "",
        imageModele: null,
        notes: "",
        prixEstime: 0,
      });
    } catch (error) {
      alert("Erreur : " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="body">
      <div className="personnalise-container">
        <h1>
          <FaBirthdayCake style={{ marginRight: 8, color: "#ff5e91" }} />
          Personnalisez votre gâteau
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <FaShapes style={{ marginRight: 5, color: "#ff5e91" }} />
              Forme
            </label>
            <select
              required
              value={personnalise.forme}
              onChange={(e) =>
                setPersonnalise({ ...personnalise, forme: e.target.value })
              }
            >
              <option value="">Choisir...</option>
              {formes.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>
              <FaLayerGroup style={{ marginRight: 5, color: "#ff5e91" }} />
              Taille
            </label>
            <select
              required
              value={personnalise.taille}
              onChange={(e) =>
                setPersonnalise({ ...personnalise, taille: e.target.value })
              }
            >
              <option value="">Choisir...</option>
              {tailles.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label} - {t.desc} - {t.prix} MAD
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>
              <FaIceCream style={{ marginRight: 5, color: "#ff5e91" }} />
              Saveur
            </label>
            <select
              required
              value={personnalise.saveur}
              onChange={(e) =>
                setPersonnalise({ ...personnalise, saveur: e.target.value })
              }
            >
              <option value="">Choisir...</option>
              {saveurs.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label} - {s.desc} - {s.prix} MAD
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>
              <FaPalette style={{ marginRight: 5, color: "#ff5e91" }} />
              Style
            </label>
            <select
              required
              value={personnalise.style}
              onChange={(e) =>
                setPersonnalise({ ...personnalise, style: e.target.value })
              }
            >
              <option value="">Choisir...</option>
              {styles.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label} - {s.desc} - {s.prix} MAD
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>
              <FaCookieBite style={{ marginRight: 5, color: "#ff5e91" }} />
              Crème intérieure
            </label>
            <select
              required
              value={personnalise.cremeInterieur}
              onChange={(e) =>
                setPersonnalise({
                  ...personnalise,
                  cremeInterieur: e.target.value,
                })
              }
            >
              <option value="">Choisir...</option>
              {cremes.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>{" "}
          <div className="form-group">
            <label>
              <FaLayerGroup style={{ marginRight: 5, color: "#ff5e91" }} />
              Crème extérieure
            </label>
            <select
              required
              value={personnalise.cremeExterieur}
              onChange={(e) =>
                setPersonnalise({
                  ...personnalise,
                  cremeExterieur: e.target.value,
                })
              }
            >
              <option value="">Choisir...</option>
              {cremes.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>
              <FaEnvelopeOpenText style={{ marginRight: 5, color: "#ff5e91" }} />
              Message
            </label>
            <input
              type="text"
              value={personnalise.message}
                placeholder="Ex: Joyeux anniversaire, Bonne fête, etc."
              onChange={(e) =>
                setPersonnalise({ ...personnalise, message: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>
              <FaRegComment style={{ marginRight: 5, color: "#ff5e91" }} />
              Décoration souhaitée
            </label>
            <textarea
              value={personnalise.decoration}
                placeholder="Décrivez la décoration souhaitée (couleurs, thème, etc.)"

              onChange={(e) =>
                setPersonnalise({ ...personnalise, decoration: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>
              <FaFileImage style={{ marginRight: 5 , color: "#ff5e91"  }} />
              Image modèle
            </label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="form-group">
            <label>
              <FaStickyNote style={{ marginRight: 5 , color: "#ff5e91" }} />
              Notes supplémentaires
            </label>
            <textarea
              value={personnalise.notes}
                placeholder="Notes supplémentaires pour le pâtissier"

              onChange={(e) =>
                setPersonnalise({ ...personnalise, notes: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <strong>Prix estimé : {personnalise.prixEstime} MAD</strong>
          </div>
          <button type="submit">Ajouter au panier</button>
        </form>
      </div>
    </div>
  );
}
