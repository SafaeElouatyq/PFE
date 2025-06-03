import React, { useEffect, useState } from "react";
import axios from "axios";
import home1 from "../assets/images/home1.jpeg";

import "../assets/First.css";


const First = () => {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/produits")
      .then((res) => setProduits(res.data))
      .catch((err) => console.error(err));
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProduits = selectedCategory
    ? produits.filter((prod) => prod.categorie_id === selectedCategory)
    : produits;

  return (
    <div>
      <div className="home-section">
        <img src={home1} alt="home" className="home-img" />
      </div>

      <section className="categories-section">
        <h2 className="section-title"> Categories</h2>
        <div className="categories-list">
          {categories.map((cat) => (
            <div
              className={`category-card${
                selectedCategory === cat.id ? " selected" : ""
              }`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <img
                src={
                  cat.image
                    ? `http://localhost:8000/storage/${cat.image}`
                    : 'no immaaaaaaage'
                    
                }
                alt={cat.nom}
                className="category-img"
              />

              <span>{cat.nom}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-title">Nous Produits</h2>
        
          
      </section>
    </div>
  );
};

export default First;
