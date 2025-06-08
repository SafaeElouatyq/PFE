import axios from "axios";
import { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { Link } from "react-router-dom";
import "../../assets/commande.css";
function ListeCommande() {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/commandes")
      .then((res) => {
        setCommandes(res.data);
      })
      .catch((err) => console.error("Erreur :", err));
  }, []);

  const updateStatut = (id, newStatut) => {
    axios
      .put(`http://localhost:8000/api/commandes/${id}`, { statut: newStatut })
      .then(() => {
        setCommandes((prev) =>
          prev.map((cmd) =>
            cmd.id === id ? { ...cmd, statut: newStatut } : cmd
          )
        );
      })
      .catch((err) => console.error("Erreur update statut:", err));
  };

  const Delete = (id) => {
    axios
      .delete(`http://localhost:8000/api/commandes/${id}`)
      .then(() => setCommandes(commandes.filter((c) => c.id !== id)))
      .catch((err) => console.error("Erreur suppression :", err));
  };

  return (
    <div  className="liste-commande">
      <h2 className="mb-4">Gestion des Commandes</h2>
      
      {commandes.map((cmd) => (
        <div key={cmd.id} className="commande-card">
          <h3 className="text-lg font-semibold mb-4">Commande #{cmd.id}</h3>
          <table>
            <tbody>
              <tr>
                <td>Utilisateur:</td>
                <td>{cmd.utilisateur?.nom || "-"}</td>
              </tr>
              <tr>
                <td>Adresse:</td>
                <td>{cmd.adresse || "-"}</td>
              </tr>
              <tr>
                <td>Téléphone:</td>
                <td>{cmd.telephone || "-"}</td>
              </tr>
              <tr>
                <td>Statut:</td>
                <td>
                  <select
                    value={cmd.statut}
                    onChange={(e) => updateStatut(cmd.id, e.target.value)}
                  >
                    <option value="En attente">En attente</option>
                    <option value="Préparée">Préparée</option>
                    <option value="En cours">En cours</option>
                    <option value="Expédiée">Expédiée</option>
                    <option value="Livrée">Livrée</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="font-semibold align-top">Produits:</td>
                <td>
                  <ul>
                    {cmd.articles?.map((art) => (
                      <li key={art.id} className="mb-2">
                        <span className="font-semibold">
                          {art.item?.nom || "gateau personnalisé"}
                        </span>{" "}
                        – {art.quantite} x {art.prix_unitaire} DH
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Montant total:</td>
                <td>{cmd.montant_total} DH</td>
              </tr>
              <tr>
                <td className="text-right">
                  <Link to={`/admin/commandes/${cmd.id}`} className="btn-details">
                    Afficher détails
                  </Link>
                  <a
                    onClick={() => Delete(cmd.id)}
                    className="text-red-600 hover:text-red-800 flex items-center justify-end"
                  >
                    Annuler <GiCancel className="mr-1" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      
    </div>
  );
}

export default ListeCommande;
