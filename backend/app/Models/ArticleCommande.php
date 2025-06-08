<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleCommande extends Model
{
    use HasFactory;
    protected $table='articles_commande';
    protected $fillable = [
        'commande_id',
        'item_id',
        'item_type',
        'quantite',
        'prix_unitaire',

    ];

       public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function item()
{
    return $this->morphTo();
}

}
