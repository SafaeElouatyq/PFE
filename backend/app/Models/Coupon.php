<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'remise',
        'date_expiration'
    ];

     protected $table = 'coupons';

    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }
}
