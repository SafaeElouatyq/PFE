<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favoir extends Model
{
    use HasFactory;
    protected $table='favoris';
    protected $fillable = [
        'utilisateur_id',
        'produit_id',
        ];
    

      public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
}
