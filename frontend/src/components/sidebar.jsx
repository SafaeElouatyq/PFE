import React from 'react';
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaUserCircle,
  FaHome
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../assets/sideBar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="nav nav-pills">
         <li className="nav-item">
          <NavLink to="/admin" className="nav-link">
            <FaHome /> Acceuil
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin" className="nav-link">
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
      </ul>
    </div>
  );
};

export default Sidebar;
