import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import Admin from './components/admin';
import Dashboard from './components/dashboard';
import Produits from './components/Produits';
import ListeProduits from './components/produitListe';
import AjouterProduit from './components/ajouterProduit';
import ModifierProduit from './components/modifierProduit';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route path="/admin" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="produits" element={<Produits />}>
          <Route index element={<ListeProduits />} />
          <Route path="liste-produits" element={<ListeProduits />} />
          <Route path="ajouter-produit" element={<AjouterProduit />} />
          <Route path="modifier-produit/:id" element={<ModifierProduit />} />
        </Route>
        <Route path="utilisateurs" element={<div>Page Utilisateurs</div>} />
        <Route path="commandes" element={<div>Page Commandes</div>} />
        <Route path="profile" element={<div>Page Profile</div>} />
      </Route>
    </Routes>
  );
}
