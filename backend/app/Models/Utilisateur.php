<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table = 'utilisateurs';
    protected $fillable = [
        'nom',
        'email',
        'mot_de_passe'
    ];

    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }

    public function favoirs()
    {
        return $this->hasMany(Favoir::class);
    }

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    public function gateauxPersonnalises()
    {
        return $this->hasMany(GateauPersonnalise::class);
    }

    public function panier()
    {
        return $this->hasOne(Panier::class, 'utilisateur_id');
    }

    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }
}
