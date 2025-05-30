import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../assets/listProduit.css";

function ListeProduits() {
  const [produits, setProduits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/produits")
      .then((res) => {
        setProduits(res.data);
      })
      .catch((err) => console.error("Erreur :", err));
  }, []);

  const Delete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      axios
        .delete(`http://localhost:8000/api/produits/${id}`)
        .then(() => setProduits(produits.filter((p) => p.id !== id)))
        .catch((err) => console.error("Erreur suppression :", err));
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Liste des Produits</h2>
      <table className="table-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit) => (
            <tr key={produit.id}>
              <td>{produit.id}</td>
              <td>
                <img
                  src={`http://localhost:8000/storage/${produit.image}`}
                  alt={produit.nom}
                  className="table-img"
                />
              </td>
              <td>{produit.nom}</td>
              <td>{produit.description}</td>
              <td>{produit.prix} MAD</td>
              <td>{produit.category?.nom}</td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => navigate(`/admin/produits/modifier-produit/${produit.id}`)} 
                    className="action-button edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => Delete(produit.id)}
                    className="action-button delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListeProduits;
