<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PanierItem;
use Illuminate\Support\Facades\Auth;

class PanierController extends Controller
{
    public function ajouterAuPanier(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'item_id' => 'required|integer',
            'item_type' => 'required|string',
            'quantite' => 'nullable|integer|min:1',
        ]);

        $itemClass = $request->item_type;
        $item = $itemClass::findOrFail($request->item_id);

        $quantite = $request->quantite ?? 1;

        PanierItem::create([
            'utilisateur_id' => $user->id,
            'item_id' => $item->id,
            'item_type' => $itemClass,
            'quantite' => $quantite,
            'prix' => $item->prix_estime ?? $item->prix,
        ]);

        return response()->json(['message' => 'tddcfjccgc']);
    }

    public function afficherPanier()
    {
        $user = Auth::user();
        $items = PanierItem::with('item')->where('utilisateur_id', $user->id)->get();

        return response()->json($items);
    }

    public function supprimerDuPanier($id)
    {
        $user = Auth::user();

        $item = PanierItem::where('utilisateur_id', $user->id)->where('id', $id)->firstOrFail();

        $item->delete();

        return response()->json(['message' => 'تم حذف العنصر من الكارت']);
    }
}
