import axios from "axios";
import React, { useEffect, useState } from "react";

const PageHome = () => {
  const [user, setUser] = useState(null); // null = pas connecté, sinon objet user
  const [showDropdown, setShowDropdown] = useState(false);
  const [produits, setProduits] = useState([]);
 useEffect(() => {
    axios
      .get("http://localhost:8000/api/produits")
      .then((res) => {
        setProduits(res.data);
      })
      .catch((err) => console.error("Erreur :", err));
  }, []);
  const handleLogin = () => {
    // Simuler login
    setUser({ name: "Manal" });
  };

  const handleLogout = () => {
    setUser(null);
    setShowDropdown(false);
  };

  return (
    <>
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logo}>
        <img
          src="https://via.placeholder.com/100x40?text=Logo"
          alt="Logo"
          style={{ height: 40 }}
        />
      </div>

      {/* Menu links */}
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>Accueil</li>
        <li style={styles.navItem}>Personnalise</li>
        <li style={styles.navItem}>Favoris</li>
      </ul>

      {/* Panier */}
      <div style={styles.cartIcon}>
        🛒
      </div>

      {/* Login / Profile */}
      <div style={styles.loginContainer}>
        {!user ? (
          <button onClick={handleLogin} style={styles.loginButton}>
            Login
          </button>
        ) : (
          <div style={{ position: "relative" }}>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              style={styles.profileImg}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div style={styles.dropdown}>
                <div style={styles.dropdownItem}>Profile</div>
                <div style={styles.dropdownItem} onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    

    </nav>
    
    <div style={styles.heroSection}>
 <img
  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587"
  alt="Pâtisseries"
  style={styles.heroImage}
/>
  <div style={styles.heroOverlay}>
    <h1 style={styles.heroText}>Créez, goûtez et savourez des desserts faits juste pour vous</h1>
    <button style={styles.heroButton}>Commander maintenant</button>
  </div>
</div>
<div style={styles.cardsContainer}>
  <div style={styles.card}>
   <img src="https://www.delifrance.com.sg/cdn/shop/articles/Understanding-French-Terms-Difference_Between-Patisserie-Boulangerie-and-Viennoiserie_1000x.jpg?v=1675933632" alt="Viennoiseries" style={styles.cardImage} />

    <a href="#viennoiseries" style={styles.cardLink}>Viennoiseries</a>
  </div>
  <div style={styles.card}>
    <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587" alt="Pâtisseries" style={styles.cardImage} />
    <a href="#patisseries" style={styles.cardLink}>Pâtisseries</a>
  </div>
  <div style={styles.card}>
    <img src="https://images.unsplash.com/photo-1627308595229-7830a5c91f9f" alt="Biscuits" style={styles.cardImage} />
    <a href="#biscuits" style={styles.cardLink}>Biscuits & Petites douceurs</a>
  </div>
  <div style={styles.card}>
    <img src="https://images.unsplash.com/photo-1542623024-00b84b498b51" alt="Gâteaux de cérémonie" style={styles.cardImage} />
    <a href="#gateaux" style={styles.cardLink}>Gâteaux de cérémonie</a>
  </div>
</div>


    </>
  );
};

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "white",
    color: "black",
  },
  logo: {
    flex: "0 0 auto",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "10px",
    margin: 0,
    padding: 0,
    flex: "1 1 auto",
    justifyContent: "lift",
  },
  navItem: {
    cursor: "pointer",
    fontWeight: "small",
  },
  cartIcon: {
    fontSize: 24,
    cursor: "pointer",
    marginRight: 20,
  },
  loginContainer: {
    flex: "0 0 auto",
  },
  loginButton: {
    backgroundColor: "#ff5e91",
    border: "none",
    padding: "8px 12px",
    color: "white",
    cursor: "pointer",
    borderRadius: 4,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "50px",
    right: 0,
    backgroundColor: "#444",
    borderRadius: 4,
    overflow: "hidden",
   
    zIndex: 10,
  },
  dropdownItem: {
    padding: "10px 20px",
    cursor: "pointer",
    borderBottom: "1px solid #555",
  },
  heroSection: {
  position: "relative",
  width: "100%",
  height: "500px",
  overflow: "hidden",
},

heroImage: {
  width: "100%",
  height: "100%",
  objectFit: "cover",
},

heroOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  textAlign: "center",
  padding: "0 20px",
},

heroText: {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "20px",
},

heroButton: {
  backgroundColor: "#ff5e91",
  border: "none",
  padding: "12px 24px",
  fontSize: "1rem",
  color: "white",
  cursor: "pointer",
  borderRadius: "6px",
},
cardsContainer: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  padding: "40px 20px",
  backgroundColor: "#f9f9f9",
},

card: {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  textAlign: "center",
  transition: "transform 0.2s",
},

cardImage: {
  width: "100%",
  height: "160px",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "12px",
},

cardLink: {
  textDecoration: "none",
  color: "#ff5e91",
  fontSize: "18px",
  fontWeight: "bold",
},


};

export default PageHome;




