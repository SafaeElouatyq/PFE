import { Routes, Route, Navigate, useLocation } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import Admin from "./components/admin/admin";
import Dashboard from "./components/admin/dashboard";
import Produits from "./components/admin/Produits";
import ListeProduits from "./components/admin/produitListe";
import AjouterProduit from "./components/admin/ajouterProduit";
import ModifierProduit from "./components/admin/modifierProduit";
import ListeUtilisateurs from "./components/admin/utilisateurs";
import ListeCommande from "./components/admin/commande";
import Home from "./components/Home";
import Nav from "./components/Nav";
import First from "./components/First";
import Personnalise from "./components/User/personnalise";
import Panier from "./components/User/panier";
import ConfirmerCommande from "./components/User/confirmerCommande";
import CommandeDetail from "./components/admin/commandeDetail";
import Favoris from "./components/User/favoris";
import BigProfile from "./components/User/bigProfile";
import ProfileAdmin from "./components/admin/profileAdmin";
import BigProfileAdmin from "./components/admin/bigProfileAdmin";
import ChangePasswordForm from "./components/admin/ChangePasswordFormAdmin";
import EditProfileForm from "./components/admin/EditProfileFormAdmin";
import AddAdminForm from "./components/admin/AddAdminForm";
import AdminLoginForm from "./components/AdminLoginForm";

export default function App() {
  const location = useLocation();

  return (
    <>
      {!location.pathname.startsWith("/admin") &&
        location.pathname !== "/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" && <Nav />}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/acceuil" element={<First />} />
        <Route path="/personnalise" element={<Personnalise />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/profile" element={<BigProfile />} />

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
          <Route path="commandes/:id" element={<CommandeDetail />} />
          <Route path="profile" element={<BigProfileAdmin />}>
            <Route path="password" element={<ChangePasswordForm />} />
            <Route path="edit" element={<EditProfileForm />} />
            <Route path="add-admin" element={<AddAdminForm />} />
          </Route>
          
        </Route>
        <Route path="/confirmer-commande" element={<ConfirmerCommande />} />
        <Route path="/admin-login" element={<AdminLoginForm />} />
      </Routes>
    </>
  );
}
