<?php

use App\Http\Controllers\CategorieController;
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

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProduitController;

Route::get('/dashboard', [DashboardController::class, 'dash']);

Route::get('/produits', [ProduitController::class, 'index']);        
Route::get('/produits/{id}', [ProduitController::class, 'show']);    
Route::post('/produits', [ProduitController::class, 'store']);       
Route::put('/produits/{id}', [ProduitController::class, 'update']);  
Route::delete('/produits/{id}', [ProduitController::class, 'destroy']);

Route::get('/categories', [CategorieController::class, 'index']);
