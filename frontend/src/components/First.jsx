import React, { useEffect, useState } from "react";
import axios from "axios";
import home1 from "../assets/images/home1.jpeg";
import "../assets/First.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const First = () => {
  const Navigate = useNavigate();

  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [favoris, setFavoris] = useState([]);

  const coupons = [
    { code: "BIG25", description: "-25% pour 200 DH d'achat ou plus !" },
    { code: "SAVE10", description: "-10% pour 100 DH d'achat ou plus !" },
    { code: "FIRST50", description: "-50% sur votre première commande !" }
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/produits")
      .then((res) => {
        setProduits(res.data);
        if (res.data.length > 0) {
          const max = Math.max(...res.data.map((p) => p.prix));
          setMaxPrice(max);
          setPrice(max);
        }
      })
      .catch((err) => console.error(err));
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
    axios
      .get("http://localhost:8000/api/favoris", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setFavoris(res.data.map((fav) => fav.produit_id)))
      .catch(() => {});
  }, []);

  const filteredProduits = produits
    .filter((prod) =>
      selectedCategory ? prod.categorie_id === selectedCategory : true
    )
    .filter((prod) =>
      search ? prod.nom.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((prod) => prod.prix <= price);

  const toggleFavori = (prodId) => {
    if (favoris.includes(prodId)) {
      axios
        .delete(`http://localhost:8000/api/favoris/${prodId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(() => setFavoris(favoris.filter((id) => id !== prodId)));
    } else {
      axios
        .post(
          "http://localhost:8000/api/favoris",
          { produit_id: prodId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => setFavoris([...favoris, prodId]));
    }
  };

  const ajouterAuPanier = (prod) => {
    axios
      .post(
        "http://localhost:8000/api/ajouter-au-panier",
        {
          produit_id: prod.id,
          quantite: 1,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => Navigate("/panier"))
      .catch((err) => {
        alert(
          "Erreur lors de l'ajout au panier: " +
            (err.response?.data?.message || err.message)
        );
      });
  };

  return (
    <div>
      <div className="home-section">
        <img src={home1} alt="home" className="home-img" />
      </div>

      <section className="coupons-section">
        <h2 className="section-title"> Coupons et Promotions</h2>
        <div className="coupons-list">
          {coupons.map((coupon) => (
            <div className="coupon-card" key={coupon.code}>
              <div className="coupon-code">{coupon.code}</div>
              <div className="coupon-desc">{coupon.description}</div>
              <button
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(coupon.code);
                  alert(`Code ${coupon.code} copié dans le presse-papiers !`);
                }}
              >
                Copier
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2 className="section-title">  Nos spécialités</h2>
        <div className="categories-list">
          {categories.map((cat) => (
            <div
              className={`category-card${
                selectedCategory === cat.id ? " selected" : ""
              }`}
              key={cat.id}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
              }
            >
              <img
                src={
                  cat.image
                    ? `http://localhost:8000/storage/${cat.image}`
                    : home1
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
        <h2 className="section-title" style={{ textAlign: "center" }}>
          Découvrez nos délices{" "}
        </h2>
        <div className="filters-bar">
          <input
            type="text"
            placeholder="Rechercher par nom"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <label className="price-label">
            Prix max: {price} MAD
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="products-list">
          {filteredProduits.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#888",
                marginTop: 40,
              }}
            >
              Aucun produit trouvé.
            </div>
          ) : (
            filteredProduits.map((prod) => (
              <div className="productcard" key={prod.id}>
                <img
                  src={
                    prod.image
                      ? `http://localhost:8000/storage/${prod.image}`
                      : home1
                  }
                  alt={prod.nom}
                  className="productimg"
                />
                <div className="product-title-row">
                  <h3>{prod.nom}</h3>
                  <span
                    className={`favori-icon ${
                      favoris.includes(prod.id) ? "active" : "inactive"
                    }`}
                    onClick={() => toggleFavori(prod.id)}
                    title={
                      favoris.includes(prod.id)
                        ? "Retirer des favoris"
                        : "Ajouter aux favoris"
                    }
                  >
                    {favoris.includes(prod.id) ? <FaHeart /> : <FaRegHeart />}
                  </span>
                </div>
                <small className="product-description">
                  {prod.description}
                </small>
                <div className="product-footer">
                  <span className="productprice">{prod.prix} MAD</span>
                  <button
                    className="addtocart"
                    onClick={() => ajouterAuPanier(prod)}
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default First;
