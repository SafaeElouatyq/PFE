import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";


function ListeUtilisateurs() {
  const [Uts, setUts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/utilisateurs")
      .then((res) => {
        setUts(res.data);
      })
      .catch((err) => console.error("erreur :", err));
  }, []);
  const Delete = (id) => {
    axios
      .delete(`http://localhost:8000/api/utilisateurs/${id}`) 
      .then(() => setUts(Uts.filter((u) => u.id !== id)))
      .catch((err) => console.error("Erreur suppression :", err));
  };

  return (
      <div className="p-4 w-100">
      <h2 className="mb-4">Gestion des Utilisateurs</h2>
      <table className="table-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Date de création </th>
            <th>Date de mise à jour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Uts.map((ut) => {
            return (
              <tr key={ut.id}>
                <td>{ut.id}</td>
                <td>{ut.nom}</td>
                <td>{ut.email}</td>
                <td>{ut.created_at}</td>
                <td>{ut.updated_at}</td>
                <td>
                  <button
                    onClick={() => Delete(ut.id)}
                    className="action-button delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ListeUtilisateurs;
