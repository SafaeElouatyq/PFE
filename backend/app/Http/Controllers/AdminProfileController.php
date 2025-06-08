<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AdminProfileController extends Controller
{
    public function profile(Request $request)
    {
        $admin = Auth::guard('admin')->user();
        return response()->json($admin);
    }

    public function updateProfile(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        $admin->nom = $request->nom;
        $admin->adresse = $request->adresse;
        $admin->telephone = $request->telephone;

        if ($request->hasFile('image')) {
            if ($admin->image) {
                Storage::delete('public/admins/' . $admin->image);
            }
            $file = $request->file('image');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/admins', $filename);
            $admin->image = $filename;
        }

        $admin->save();

        return response()->json(['message' => 'Profil mis à jour', 'admin' => $admin]);
    }

    public function changePassword(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        if (!Hash::check($request->current_password, $admin->mot_de_passe)) {
            return response()->json(['message' => 'Mot de passe actuel incorrect'], 400);
        }

        $request->validate([
            'new_password' => 'required|min:6|confirmed',
        ]);

        $admin->mot_de_passe = Hash::make($request->new_password);
        $admin->save();

        return response()->json(['message' => 'Mot de passe changé avec succès']);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email',
            'mot_de_passe' => 'required|min:6|confirmed',
        ]);

        $admin = Admin::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
        ]);

        return response()->json(['message' => 'Nouvel admin ajouté', 'admin' => $admin]);
    }
}
