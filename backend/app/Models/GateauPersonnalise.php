<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GateauPersonnalise extends Model
{
    use HasFactory;
    protected $fillable = [
        'utilisateur_id',
        'form',
        'saveur',
        'taille',
        'creme_interieur',
        'creme_exterieur',
        'message',
        'decoration',
        'image_modele',
        'prix_estime',
        'statut'

    ];
     protected $table = 'gateaux_personnalises';

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }
}
