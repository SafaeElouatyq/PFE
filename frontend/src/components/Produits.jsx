import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import ListeProduits from "./produitListe";
import AjouterProduit from "./ajouterProduit";
import ModifierProduit from "./modifierProduit";
import '../assets/produits.css';

function Produits() {
  return (
<div className="p-4 w-100">
      <h2 className="mb-4">Gestion des Produits</h2>  
              <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
    <nav>
        <NavLink 
          to="/liste-produits" 
          className={({ isActive }) => "tab-button" + (isActive ? " active" : "")}
        >
          Voir les produit
        </NavLink>

        <NavLink 
          to="/ajouter-produit" 
          className={({ isActive }) => "tab-button" + (isActive ? " active" : "")}
        >
          Ajouter un produit
        </NavLink>
      </nav>
      </div>

      <Routes>
        <Route path="/liste-produits" element={<ListeProduits />} />
        <Route path="/ajouter-produit" element={<AjouterProduit />} />
        <Route path="/modifier-produit/:id" element={<ModifierProduit />} />
      </Routes>
    </div>
  );
}

export default Produits;
