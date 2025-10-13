<?php
namespace App\Http\Controllers;

use App\Models\Utilisateur;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index(Request $request){
        $data='ana';
        return view('index' ,compact('data'));
    }
    
    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|unique:utilisateurs',
            'mot_de_passe' => 'required|string|min:6',
        ]);

        $user = Utilisateur::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
        ]);

        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'role' => 'utilisateur',
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'mot_de_passe' => 'required',
        ]);

        $user = Utilisateur::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->mot_de_passe, $user->mot_de_passe)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('user-token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'role' => 'utilisateur',
            'user' => $user,
            'redirect' => '/acceuil'
        ]);
    }
    public function adminLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'mot_de_passe' => 'required',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->mot_de_passe, $admin->mot_de_passe)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'role' => 'admin',
            'admin' => $admin,
            'redirect' => '/admin'
        ]);
    }
}

