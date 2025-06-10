import React from "react";
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaUserCircle,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../../assets/sideBar.css";
import Logo from "../../assets/images/S-M.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div
        className="sidebar-header"
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        <img
          src={Logo}
          alt="Logo"
        />
      </div>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink to="/admin" end className="nav-link">
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/produits" className="nav-link">
            <FaBox /> Produits
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/utilisateurs" className="nav-link">
            <FaUsers /> Utilisateurs
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/commandes" className="nav-link">
            <FaShoppingCart /> Commandes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/profile" className="nav-link">
            <FaUserCircle /> Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <button
            className="nav-link logout-btn"
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaSignOutAlt style={{ marginRight: "8px" }} /> Déconnexion
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
