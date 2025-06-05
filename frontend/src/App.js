import { Routes, Route, Navigate, useLocation } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import Admin from "./components/admin";
import Dashboard from "./components/dashboard";
import Produits from "./components/Produits";
import ListeProduits from "./components/produitListe";
import AjouterProduit from "./components/ajouterProduit";
import ModifierProduit from "./components/modifierProduit";
import ListeUtilisateurs from "./components/utilisateurs";
import ListeCommande from "./components/commande";
import Home from "./components/Home";
import Nav from "./components/Nav";
import First from "./components/First";
import Personnalise from "./components/pages/personnalise";
import Panier from "./components/pages/panier"; 

export default function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/admin" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" && <Nav />}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/acceuil" element={<First />} />
        <Route path="/personnalise" element={<Personnalise />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="produits" element={<Produits />}>
            <Route index element={<Navigate to="liste-produits" />} />
            <Route path="liste-produits" element={<ListeProduits />} />
            <Route path="ajouter-produit" element={<AjouterProduit />} />
            <Route path="modifier-produit/:id" element={<ModifierProduit />} />
          </Route>
          <Route path="utilisateurs" element={<ListeUtilisateurs />} />
          <Route path="commandes" element={<ListeCommande />} />
          <Route path="favoris" element={<div>Page Favoris</div>} />
          <Route path="profile" element={<div>Page Profile</div>} />
        </Route>
      </Routes>
    </>
  );
}
