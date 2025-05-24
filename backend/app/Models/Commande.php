<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;
    protected $fillable = [
        'utilisateur_id',
        'montant_totale',
        'statut'];
        protected $table = 'commandes';

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function articles()
    {
        return $this->hasMany(ArticleCommande::class);
    }    


}
