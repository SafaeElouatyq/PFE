<?php


use App\Http\Controllers\AuthController;

use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CommandeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\UtController;

Route::get('/dashboard', [DashboardController::class, 'dash']);

Route::get('/produits', [ProduitController::class, 'index']);        
Route::get('/produits/{id}', [ProduitController::class, 'show']);    
Route::post('/produits', [ProduitController::class, 'store']);       
Route::put('/produits/{id}', [ProduitController::class, 'update']);  
Route::delete('/produits/{id}', [ProduitController::class, 'destroy']);

Route::get('/categories', [CategorieController::class, 'index']);

Route::get('/utilisateurs',[UtController::class,'index']);
Route::post('/utilisateurs/{id}',[UtController::class,'destroy']);

Route::get('/commandes',[CommandeController::class,'index']);
Route::put('/commandes/{id}', [CommandeController::class, 'update']);


