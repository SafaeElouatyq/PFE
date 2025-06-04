<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GateauPersonnalise;
use App\Models\PanierItem;
use App\Models\Panier;

class PersonnaliseController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'forme' => 'required|string',
            'taille' => 'required|string',
            'saveur' => 'required|string',
            'style' => 'required|string',
            'cremeInterieur' => 'required|string',
            'cremeExterieur' => 'required|string',
            'message' => 'nullable|string',
            'decoration' => 'nullable|string',
            'notes' => 'nullable|string',
            'prixEstime' => 'required|integer',
        ]);

        $validated['creme_interieur'] = $validated['cremeInterieur'];
        $validated['creme_exterieur'] = $validated['cremeExterieur'];
        $validated['prix_estime'] = $validated['prixEstime'];
        $validated['utilisateur_id'] = auth()->id();

        unset($validated['cremeInterieur'], $validated['cremeExterieur'], $validated['prixEstime']);

        if ($request->hasFile('image_modele')) {
            $path = $request->file('image_modele')->store('images', 'public');
            $validated['image_modele'] = $path;
        }

        $gateau = GateauPersonnalise::create($validated);
        $panier = auth()->user()->panier()->firstOrCreate([]);
        PanierItem::create([
            'utilisateur_id' => auth()->id(),
            'panier_id' => $panier->id,
            'item_id' => $gateau->id,
            'item_type' => GateauPersonnalise::class,
            'quantite' => 1,
            'prix' => $gateau->prix_estime,
        ]);

        return response()->json(['success' => true]);
    }
}
