<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    protected $table = 'produits';      
    protected $fillable = [
        'nom',
        'description',
        'prix',
        'image',
        'categorie_id',
        

    ];
    public function articleCommande()
    {
        return $this->hasMany(ArticleCommande::class);
    }

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    public function favoirs()
    {
        return $this->hasMany(Favoir::class);
    }
    public function category()
{
    return $this->belongsTo(Category::class ,'categorie_id');
}

}
