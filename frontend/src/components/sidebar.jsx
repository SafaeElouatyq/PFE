import React from 'react';
import {
  FaHome,
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaUserCircle
} from "react-icons/fa";

const Sidebar = ({ setPage }) => {
  return (
    <div
      className="d-flex flex-column p-3"
      style={{
        width: '250px',
        height: '90vh',
        background: 'white',
        borderRadius: '15px',
        position: 'fixed',
        top: 0,
        left: 0,
        marginLeft: '10px',
        marginTop: '5px',
        boxShadow: '2px 0 10px rgba(0,0,0,0.3)'
      }}
    >
      <ul className="nav nav-pills flex-column">
        <li className="nav-item mb-2">
          <a
            href="#"
            onClick={() => setPage('Acceuil')}
            className="nav-link d-flex align-items-center gap-2 text-dark"
          >
            <FaHome /> Acceuil
          </a>
        </li>
        <li className="nav-item mb-2">
          <a
            href="#"
            onClick={() => setPage('dashboard')}
            className="nav-link d-flex align-items-center gap-2 text-dark"
          >
            <FaTachometerAlt /> Dashboard
          </a>
        </li>
        <li className="nav-item mb-2">
          <a
            href="#"
            onClick={() => setPage('produits')}
            className="nav-link d-flex align-items-center gap-2 text-dark"
          >
            <FaBox /> Produits
          </a>
        </li>
        <li className="nav-item mb-2">
          <a
            href="#"
            onClick={() => setPage('utilisateurs')}
            className="nav-link d-flex align-items-center gap-2 text-dark"
          >
            <FaUsers /> Utilisateurs
          </a>
        </li>
        <li className="nav-item mb-2">
          <a
            href="#"
            onClick={() => setPage('commandes')}
            className="nav-link d-flex align-items-center gap-2 text-dark"
          >
            <FaShoppingCart /> Commandes
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            onClick={() => setPage('profile')}
            className="nav-link d-flex align-items-center gap-2 text-dark"
          >
            <FaUserCircle /> Profile
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
