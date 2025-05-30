import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import '../assets/produits.css';

function Produits() {
  return (
    <div className="p-4 w-100">
      <h2 className="mb-4">Gestion des Produits</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <NavLink
          to="liste-produits"
          className={({ isActive }) => "tab-button" + (isActive ? " active" : "")}
        >
          Voir les produits
        </NavLink>

        <NavLink
          to="ajouter-produit"
          className={({ isActive }) => "tab-button" + (isActive ? " active" : "")}
        >
          Ajouter un produit
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}

export default Produits;
