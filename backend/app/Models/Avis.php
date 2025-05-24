<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    use HasFactory;

    protected $table = 'avis';
    protected $fillable = [
        'id_utilisateur',
        'id_produit',
        'note',
        'commentaire',
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
