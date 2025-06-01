<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
   public function index()
{
    $commandes = Commande::with(['utilisateur', 'articles.produit'])->get();
    return response()->json($commandes);
}



    public function destroy($id)
    {
        $commande = Commande::findOrFail($id);
        $commande->delete();
        return response()->json([
            'message' => 'commande supprime avec succes'
        ]);
    }
    public function update(Request $request, $id)
    {
        $commande = Commande::findOrFail($id);
        $commande->statut = $request->statut;
        $commande->save();

        return response()->json(['message' => 'Statut mis à jour avec succès']);
    }
}
