<?php

namespace App\Http\Controllers;

use App\Models\Favoir;
use Illuminate\Http\Request;

class FavorisController extends Controller
{
    public function index(Request $request)
    {
        return Favoir::with('produit')->where('utilisateur_id', $request->user()->id)->get();
    }

    public function store(Request $request)
    {
        $request->validate(['produit_id' => 'required|exists:produits,id']);
        return Favoir::firstOrCreate([
            'utilisateur_id' => $request->user()->id,
            'produit_id' => $request->produit_id,
        ]);
    }

    public function destroy(Request $request, $produit_id)
    {
        Favoir::where('utilisateur_id', $request->user()->id)
            ->where('produit_id', $produit_id)
            ->delete();
        return response()->noContent();
    }
}
