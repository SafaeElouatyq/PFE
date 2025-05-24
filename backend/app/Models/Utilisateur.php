<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    use HasFactory;


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

}
