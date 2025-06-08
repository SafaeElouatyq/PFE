import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import "../../assets/favoris.css";

function Favoris() {
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/favoris", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then((res) => setFavoris(res.data))
      .catch((err) => console.error("Erreur favoris :", err));
  }, []);

  const removeFavori = (produit_id) => {
    axios
      .delete(`http://localhost:8000/api/favoris/${produit_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(() => setFavoris(favoris.filter(f => f.produit_id !== produit_id)))
      .catch((err) => console.error("Erreur suppression :", err));
  };

  return (
    <div className="favoris-container">
      <h1 className="favoris-title">Mes Favoris</h1>
      <div className="favoris-list">
        {favoris.length === 0 && <div>Aucun favori pour l’instant.</div>}
        {favoris.map((fav) => (
          <div className="productcard" key={fav.id}>
            {fav.produit?.image && (
              <img
                className="productimg"
                src={`http://localhost:8000/storage/${fav.produit.image}`}
                alt={fav.produit.nom}
              />
            )}
            <div className="product-title-row">
              <h3>{fav.produit?.nom || "Produit"}</h3>
              <FaHeart
                className="favori-icon"
                title="Retirer des favoris"
                onClick={() => removeFavori(fav.produit_id)}
              />
            </div>
            <div className="product-description">{fav.produit?.description}</div>
            <div className="product-footer">
              <span className="productprice">{fav.produit?.prix} MAD</span>
              {/* Optionally add add-to-cart button here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favoris;