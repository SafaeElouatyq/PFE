<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\ArticleCommande;
use App\Models\PanierItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommandeController extends Controller
{
   public function index()
{
    $commandes = Commande::with(['utilisateur', 'articles.item'])->get();
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
    
    public function store(Request $request)
{
    $request->validate([
        'montant_total' => 'required|numeric',
        'adresse' => 'required|string',
        'telephone' => 'required|string',
        'articles' => 'required|array',
        'articles.*.item_id' => 'required|integer',
        'articles.*.item_type' => 'required|string',
        'articles.*.quantite' => 'required|integer',
        'articles.*.prix_unitaire' => 'required|numeric',
    ]);

    $commande = Commande::create([
        'utilisateur_id' => Auth::id(),
        'montant_total' => $request->montant_total,
        'statut' => 'en_attente',
        'adresse' => $request->adresse,
        'telephone' => $request->telephone,
    ]);

    foreach ($request->articles as $article) {
        ArticleCommande::create([
            'commande_id' => $commande->id,
            'item_id' => $article['item_id'],
            'item_type' => $article['item_type'],
            'quantite' => $article['quantite'],
            'prix_unitaire' => $article['prix_unitaire'],
        ]);
    }
    PanierItem::where('utilisateur_id', auth()->id())->delete();

    return response()->json(['message' => 'Commande confirmée, le livreur va vous appeler !']);
}

public function show($id)
{
    $commande = Commande::with(['utilisateur', 'articles.item'])->findOrFail($id);
    return response()->json($commande);
}
}
