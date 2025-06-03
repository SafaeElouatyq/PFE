<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    public function index()
    {
        $produits = Produit::with('category')->get();
        return response()->json($produits);
    }

   
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric',
            'categorie_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('produits', 'public');
        }

        $produit = Produit::create([
            'nom' => $request->nom,
            'prix' => $request->prix,
            'description' => $request->description,
            'image' => $imagePath,
            'categorie_id' => $request->categorie_id
        ]);
        return response()->json([
            'message' => 'Produit ajouté avec succès.',
            'produit' => $produit
        ], 201);
    }

    public function show($id)
    {
        $produit = Produit::with('category')->findOrFail($id);
        return response()->json($produit);
    }

  
    public function update(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);

        $formFields = $request->validate([
            'nom' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:png,jpg,jpeg|max:10240',
            'categorie_id' => 'required|exists:categories,id'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('produits', 'public');
            $formFields['image'] = $imagePath;
        }

        $produit->update($formFields);

        return response()->json([
            'message' => 'Le produit a été mis à jour',
            'produit' => $produit
        ]);
    }

    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->delete();

        return response()->json([
            'message' => 'Produit supprimé.'
        ]);
    }
}
