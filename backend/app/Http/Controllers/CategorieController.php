<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

use App\Models\Category;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $path = $request->file('image')->store('categories', 'public');

        $category = Category::create([
            'nom' => $validated['nom'],
            'image' => $path,
        ]);

        return response()->json($category, 201);
    }

   public function update(Request $request, $id)
{
    $category = Category::findOrFail($id);

    if ($request->hasFile('image')) {
        Storage::disk('public')->delete($category->image);
        $path = $request->file('image')->store('categories', 'public');
        $category->image = $path;
    }

    if ($request->has('nom')) {
        $request->validate([
            'nom' => 'required|string|max:255',
        ]);
        $category->nom = $request->nom;
    }

    $category->save();

    return response()->json($category);
}

}
