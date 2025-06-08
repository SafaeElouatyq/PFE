<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'image' => 'nullable|image|max:2048',
            'adresse' => 'nullable|string|max:255',
            'telephone' => 'nullable|string|max:30',
            'email' => 'sometimes|email|max:255|unique:utilisateurs,email,' . $user->id,
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('profiles', 'public');
            $data['image'] = $path;
        }

        $user->update($data);

        return response()->json($user);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->mot_de_passe)) {
            return response()->json(['message' => 'Mot de passe actuel incorrect'], 422);
        }

        $user->mot_de_passe = bcrypt($request->new_password);
        $user->save();

        return response()->json(['message' => 'Mot de passe modifié avec succès']);
    }

    public function commandes(Request $request)
    {
        return $request->user()
            ->commandes() 
            ->with(['articles.item'])
            ->orderBy('created_at', 'desc')
            ->get();
    }
}