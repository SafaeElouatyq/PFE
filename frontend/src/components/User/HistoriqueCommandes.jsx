import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HistoriqueCommandes() {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/profile/commandes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setCommandes(res.data));
  }, []);

  return (
    <div>
      <h2>Historique des commandes</h2>
      {commandes.length === 0 && <div>Aucune commande trouvée.</div>}
      {commandes.map((cmd) => (
        <div className="commande-card" key={cmd.id}>
          <div className="commande-entete">
            <span
              className="commande-statut"
              >
                {cmd.statut}
            </span>
          </div>
          <div className="commande-date">
            
          </div>
          <div className="commande-produits">
            {cmd.articles?.map((art, i) => (
              <div key={i} className="commande-produit">
                <span>
                  {art.item?.nom || "Gateau personnalisé"}
                </span>
                <span className="commande-prix">
                  {art.prix_unitaire} DH x {art.quantite}
                </span>
              </div>
            ))}
          </div>
          <div className="commande-total">
            <span>Total</span>
            <span className="commande-total-prix">{cmd.montant_total} DH</span>
          </div>
        </div>
      ))}
    </div>
  );
}