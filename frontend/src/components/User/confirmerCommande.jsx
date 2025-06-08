import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/confirmer.css";

const ConfirmerCommande = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/commandes", {
      montant_total: state.totalFinal,
      adresse,
      telephone,
      articles: state.items.map(item => ({
        item_id: item.item.id,
        item_type: item.item_type,
        quantite: item.quantite,
        prix_unitaire: item.prix
      }))
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => {
      alert("Le livreur va vous appeler !");
      navigate("/acceuil");
    });
  };

  return (
    <div className="confirmer-commande-container">
      <h2 className="confirmer-title">Confirmer la commande</h2>
      <div className="confirmer-flex">
        <form className="confirmer-form" onSubmit={handleSubmit}>
          <label>
            Adresse
            <input
              type="text"
              placeholder="Adresse"
              value={adresse}
              onChange={e => setAdresse(e.target.value)}
              required
            />
          </label>
          <label>
            Téléphone
            <input
              type="text"
              placeholder="Téléphone"
              value={telephone}
              onChange={e => setTelephone(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="confirmer-btn">Confirmer</button>
          {message && <div className="confirmer-message">{message}</div>}
        </form>
        <div className="confirmer-summary">
          <h3>Résumé du panier</h3>
          <ul>
            {state.items.map(item => (
              <li key={item.id}>
                <span className="confirmer-product">{item.item?.nom || "Gâteau personnalisé"}</span>
                <span className="confirmer-qty">x {item.quantite}</span>
                <span className="confirmer-price">{item.prix * item.quantite} MAD</span>
              </li>
            ))}
          </ul>
          <div className="confirmer-total">
            <span>Total :</span>
            <span>{state.totalFinal} MAD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmerCommande;