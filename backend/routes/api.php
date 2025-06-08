<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\UtController;
use App\Http\Controllers\FavorisController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/index', [AuthController::class, 'index']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/dashboard', [DashboardController::class, 'dash']);

Route::get('/produits', [ProduitController::class, 'index']);        
Route::get('/produits/{id}', [ProduitController::class, 'show']);    
Route::post('/produits', [ProduitController::class, 'store']);       
Route::put('/produits/{id}', [ProduitController::class, 'update']);  
Route::delete('/produits/{id}', [ProduitController::class, 'destroy']);

Route::post('/categories', [CategorieController::class, 'store']);
Route::get('/categories', [CategorieController::class, 'index']);
Route::put('/categories/{id}', [CategorieController::class, 'update']);

Route::get('/utilisateurs', [UtController::class, 'index']);
Route::post('/utilisateurs/{id}', [UtController::class, 'destroy']);
Route::delete('/utilisateurs/{id}', [UtController::class, 'destroy']);

Route::get('/commandes', [CommandeController::class, 'index']);
Route::put('/commandes/{id}', [CommandeController::class, 'update']);
Route::delete('/commandes/{id}', [CommandeController::class, 'destroy']);
Route::get('/commandes/{id}', [CommandeController::class, 'show']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/panier/ajouter', [PanierController::class, 'ajouterAuPanier']);
    Route::get('/favoris', [FavorisController::class, 'index']);
    Route::post('/favoris', [FavorisController::class, 'store']);
    Route::delete('/favoris/{produit_id}', [FavorisController::class, 'destroy']);
    
    Route::get('/panier', [PanierController::class, 'afficherPanier']);
    Route::post('/panier', [PanierController::class, 'ajouterAuPanier']);
    Route::delete('/panier/{id}', [PanierController::class, 'supprimerDuPanier']);
    Route::patch('/panier/{id}', [PanierController::class, 'modifierQuantite']);

    Route::get('/profile', [ProfileController::class, 'show']);
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/password', [ProfileController::class, 'changePassword']);
    Route::get('/profile/commandes', [ProfileController::class, 'commandes']);
});

use App\Http\Controllers\PersonnaliseController;

Route::middleware('auth:sanctum')->post('/personnalise', [PersonnaliseController::class, 'store']);

Route::middleware('auth:sanctum')->post('/ajouter-au-panier', [ProduitController::class, 'ajouterAuPanier']);
Route::post('/coupon/check', [CouponController::class, 'check']);
Route::middleware('auth:sanctum')->post('/commandes', [CommandeController::class, 'store']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/profile', [AdminProfileController::class, 'show']);
    Route::post('/admin/profile', [AdminProfileController::class, 'update']);
    Route::post('/admin/password', [AdminProfileController::class, 'changePassword']);
    Route::post('/admins', [AdminProfileController::class, 'store']); // Ajouter un admin
});

Route::middleware(['auth:admin'])->prefix('admin')->group(function () {
    Route::get('/profile', [AdminProfileController::class, 'profile']);
    Route::post('/profile', [AdminProfileController::class, 'updateProfile']);
    Route::post('/password', [AdminProfileController::class, 'changePassword']);
    Route::post('/admins', [AdminProfileController::class, 'addAdmin']);
});

Route::post('/admin/login', [AuthController::class, 'adminLogin']);


