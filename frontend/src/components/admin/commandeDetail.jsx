import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/commandeDetail.css";

function CommandeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commande, setCommande] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/commandes/${id}`)
      .then(res => setCommande(res.data))
      .catch(() => navigate("/admin/commandes"));
  }, [id, navigate]);

  if (!commande) return <div>Chargement...</div>;

  return (
    <div className="commande-detail">
      <h2>Détails de la commande #{commande.id}</h2>
      <div>Utilisateur: {commande.utilisateur?.nom}</div>
      <div>Adresse: {commande.adresse}</div>
      <div>Téléphone: {commande.telephone}</div>
      <div>Statut: {commande.statut}</div>
      <div>Montant total: {commande.montant_total} DH</div>
      <h3>Produits:</h3>
      <ul>
        {commande.articles?.map(art => (
          <li key={art.id}>
            <div>
              <strong>{art.item?.nom || "Gâteau personnalisé"}</strong>
              <span> – {art.quantite} x {art.prix_unitaire} DH</span>
            </div>
            {art.item?.image && (
              <img
                src={`http://localhost:8000/storage/${art.item.image}`}
                alt={art.item?.nom}
                style={{ width: 120, borderRadius: 8, margin: "8px 0" }}
              />
            )}
            {art.item_type === "App\\Models\\GateauPersonnalise" && (
              <div className="gateau-details">
                <div>Forme : {art.item?.forme}</div>
                <div>Saveur : {art.item?.saveur}</div>
                <div>Taille : {art.item?.taille}</div>
                <div>Crème intérieur : {art.item?.creme_interieur}</div>
                <div>Crème extérieur : {art.item?.creme_exterieur}</div>
                <div>Message : {art.item?.message}</div>
                <div>Décoration : {art.item?.decoration}</div>
                <div>Prix estimé : {art.item?.prix_estime} DH</div>
                {art.item?.image_modele && (
                  <img
                    src={`http://localhost:8000/storage/${art.item.image_modele}`}
                    alt="Modèle"
                    style={{ width: 120, borderRadius: 8, margin: "8px 0" }}
                  />
                )}
              </div>
            )}
            {art.item_type === "App\\Models\\Produit" && (
              <div>
                <div>Description: {art.item?.description}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)}>Retour</button>
    </div>
  );
}

export default CommandeDetail;