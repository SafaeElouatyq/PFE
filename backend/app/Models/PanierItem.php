<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PanierItem extends Model
{
    protected $fillable = [
        'utilisateur_id',

        'panier_id',
        'item_id',
        'item_type',
        'quantite',
        'prix',
    ];

    public function panier()
    {
        return $this->belongsTo(Panier::class);
    }

    public function item()
    {
        return $this->morphTo();
    }
}
