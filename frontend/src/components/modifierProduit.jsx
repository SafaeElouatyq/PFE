import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../assets/ajouterProduit.css'

function ModifierProduit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produit, setProduit] = useState({
    nom: "",
    description: "",
    prix: "",
    categorie_id: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/produits/${id}`)
      .then((res) => {
        setProduit({
          nom: res.data.nom,
          description: res.data.description,
          prix: res.data.prix,
          categorie_id: res.data.categorie_id,
          image: res.data.image,
        });
      })
      .catch((err) => console.error("Erreur :", err));
  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erreur chargement catégories :", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProduit((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom", produit.nom);
    formData.append("description", produit.description);
    formData.append("prix", produit.prix);
    formData.append("categorie_id", produit.categorie_id);

    if (produit.image instanceof File) {
      formData.append("image", produit.image);
    }

    axios
      .post(`http://localhost:8000/api/produits/${id}?_method=PUT`, formData)
      .then(() => {
        navigate("/liste-produits");
      })
      .catch((err) => console.error("Erreur de modification :", err));
  };

  return (
  <div>
  
    <div className="formulaire">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <table>
          <tbody>
            <tr>
              <td><label>Nom:</label></td>
              <td>
                <input type="text" name="nom" value={produit.nom} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td><label>Description:</label></td>
              <td>
                <textarea name="description" value={produit.description} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td><label>Prix:</label></td>
              <td>
                <input type="number" name="prix" value={produit.prix} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td><label>Catégorie:</label></td>
              <td>
                <select name="categorie_id" value={produit.categorie_id} onChange={handleChange}>
                  <option value="">-- Choisir --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nom}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Changer l'image:</label></td>
              <td>
                <input type="file" name="image" onChange={handleImageChange} />

                {produit.image && !(produit.image instanceof File) && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={`http://localhost:8000/storage/${produit.image}`}
                      alt="Produit"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td><button type="submit" className="Modifier">Enregistrer</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
);

}

export default ModifierProduit;
