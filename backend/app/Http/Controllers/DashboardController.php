<?php
namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\Utilisateur;
use App\Models\Commande;

class DashboardController extends Controller
{
    public function dash()
    {
        $nbProduits = Produit::count();
        $nbUtilisateurs = Utilisateur::count();
        $nbCommandes = Commande::count();

        return response()->json([
            'produits' => $nbProduits,
            'utilisateurs' => $nbUtilisateurs,
            'commandes' => $nbCommandes,
        ]);
    }
}
