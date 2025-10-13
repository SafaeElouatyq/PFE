import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/Panier.css";

const Panier = () => {
  const [items, setItems] = useState([]);
  const [promo, setPromo] = useState("");
  const [promoInfo, setPromoInfo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/panier", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setItems(res.data));

    axios
      .get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUserId(res.data.id))
      .catch(() => {});
  }, []);

  const supprimer = (id) => {
    axios
      .delete(`http://localhost:8000/api/panier/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => setItems(items.filter((item) => item.id !== id)));
  };

  const changerQuantite = (id, quantite) => {
    if (quantite < 1) return;
    axios
      .patch(
        `http://localhost:8000/api/panier/${id}`,
        { quantite },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        setItems(
          items.map((item) => (item.id === id ? { ...item, quantite } : item))
        );
      });
  };

  const appliquerPromo = () => {
    setPromoError("");
    setPromoInfo(null);
    const total = items.reduce(
      (sum, item) => sum + item.prix * item.quantite,
      0
    );
    if (!userId) {
      setPromoError("Utilisateur non identifié.");
      return;
    }
    axios
      .post("http://localhost:8000/api/coupon/check", {
        code: promo,
        montant_total: total,
        user_id: userId,
      })
      .then((res) =>
        setPromoInfo({
          ...res.data,
          remise: Math.round(((res.data.remise_percent || 0) * total) / 100),
        })
      )
      .catch((err) => setPromoError(err.response?.data?.message || "Erreur"));
  };

  let total = items.reduce((sum, item) => sum + item.prix * item.quantite, 0);
  let reduction = promoInfo ? promoInfo.remise : 0;
  let totalFinal = Math.max(0, total - reduction);

  return (
    <div className="panier-main">
      <h1 className="panier-title">Mon Panier</h1>
      <div className="panier-flex">
        <div className="panier-items">
          {items.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>
              Votre panier est vide.
            </p>
          ) : (
            <table className="panier-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="panier-product-cell">
                      <img
                        src={
                          item.item?.image
                            ? `http://localhost:8000/storage/${item.item.image}`
                            : item.item?.image_modele
                            ? `http://localhost:8000/storage/${item.item.image_modele}`
                            : "default-image.jpg"
                        }
                        alt={item.item?.nom || "Produit"}
                        className="panier-product-img"
                      />
                      <div>
                        <div className="panier-product-name">
                          {item.item?.nom || "Gâteau Personnalisé"}
                        </div>
                      </div>
                    </td>
                    <td>{item.prix} MAD</td>
                    <td>
                      <div className="panier-qty-box">
                        <button
                          onClick={() =>
                            changerQuantite(item.id, item.quantite - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantite}</span>
                        <button
                          onClick={() =>
                            changerQuantite(item.id, item.quantite + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{item.prix * item.quantite} MAD</td>
                    <td>
                      <button
                        className="panier-remove-btn"
                        onClick={() => supprimer(item.id)}
                      >
                        x
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="panier-summary">
          <h3>Résumé de la commande</h3>
          <div className="panier-summary-row">
            <input
              type="text"
              placeholder="Code promo"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              style={{ flex: 1, marginRight: 8 }}
            />
            <button onClick={appliquerPromo} className="panier-promo-btn">
              Appliquer
            </button>
          </div>
          {promoError && (
            <div style={{ color: "red", fontSize: "0.95rem" }}>
              {promoError}
            </div>
          )}
          {promoInfo && (
            <div style={{ color: "green", fontSize: "0.95rem" }}>
              {promoInfo.message} (-{reduction} MAD)
            </div>
          )}
          <div className="panier-summary-row">
            <span>Sous-total</span>
            <span>{total} MAD</span>
          </div>
          {promoInfo && (
            <div className="panier-summary-row">
              <span>Réduction</span>
              <span>-{reduction} MAD</span>
            </div>
          )}
          <div className="panier-summary-total">
            <span>Total</span>
            <span>{totalFinal} MAD</span>
          </div>
          <button
            className="panier-checkout-btn"
            onClick={() =>
              navigate("/confirmer-commande", { state: { items, totalFinal } })
            }
          >
            Valider la commande
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panier;
