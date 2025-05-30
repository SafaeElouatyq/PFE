<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
   public function index()
    {
        return response()->json(Category::all());
    } 
}
  