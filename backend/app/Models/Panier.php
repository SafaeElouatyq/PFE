<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    protected $table = 'paniers';
    protected $fillable = [
        'utilisateur_id',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function items()
    {
        return $this->hasMany(PanierItem::class);
    }

}
