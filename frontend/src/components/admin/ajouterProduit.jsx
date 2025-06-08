import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../assets/ajouterProduit.css';


import { useNavigate } from "react-router-dom";

function AjouterProduit() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    nom: "",
    description: "",
    prix: "",
    categorie_id: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erreur chargement catégories :", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key]) data.append(key, form[key]);
    });

    axios.post("http://localhost:8000/api/produits", data)
      .then(() => {
        setSuccessMessage(" Produit ajouté avec succès !");
        setErrors({});
        setForm({ nom: "", description: "", prix: "", categorie_id: "", image: null });
      })
      .catch((err) => {
        const responseErrors = err?.response?.data?.errors || { general: ["Erreur inconnue."] };
        setErrors(responseErrors);
      });

    navigate('/produits');   
  };

  return (
    <div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errors.general && <p style={{ color: "red" }}>{errors.general[0]}</p>}
      <div className="formulaire">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        
        <table>
          <tbody>
            <tr>
              <td><label>Nom:</label></td>
              <td>
                <input type="text" name="nom" value={form.nom} onChange={handleChange} />
                {errors.nom && <p style={{ color: "red" }}>{errors.nom[0]}</p>}
              </td>
            </tr>
            <tr>
              <td><label>Description:</label></td>
              <td>
                <textarea name="description" value={form.description} onChange={handleChange} />
                {errors.description && <p style={{ color: "red" }}>{errors.description[0]}</p>}
              </td>
            </tr>
            <tr>
              <td><label>Prix:</label></td>
              <td>
                <input type="number" name="prix" value={form.prix} onChange={handleChange} />
                {errors.prix && <p style={{ color: "red" }}>{errors.prix[0]}</p>}
              </td>
            </tr>
            <tr>
              <td><label>Catégorie:</label></td>
              <td>
                <select name="categorie_id" value={form.categorie_id} onChange={handleChange}>
                  <option value="">-- Choisir --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nom}</option>
                  ))}
                </select>
                {errors.categorie_id && <p style={{ color: "red" }}>{errors.categorie_id[0]}</p>}
              </td>
            </tr>
            <tr>
              <td><label>Image:</label></td>
              <td>
                <input type="file" name="image" onChange={handleChange} />
                {errors.image && <p style={{ color: "red" }}>{errors.image[0]}</p>}
              </td>
            </tr>
            <tr>
              <td></td>
              <td><button type="submit">Ajouter</button></td>
            </tr>
          </tbody>
        </table>
      </form>
      </div>
      
    </div>
  );
}

export default AjouterProduit;
