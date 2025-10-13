<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Coupon;
use App\Models\Commande;

class CouponController extends Controller
{
    public function check(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'montant_total' => 'required|numeric',
            'user_id' => 'required|integer'
        ]);

        $code = strtoupper($request->code);
        $montant = $request->montant_total;
        $userId = $request->user_id;

        $coupon = Coupon::where('code', $code)
            ->where(function($q) {
                $q->whereNull('date_expiration')
                  ->orWhere('date_expiration', '>=', now());
            })
            ->first();

        if (!$coupon) {
            return response()->json([
                'message' => 'Code promo invalide ou expiré.'
            ], 404);
        }

        if ($code === 'FIRST50') {
            $hasCommande = Commande::where('utilisateur_id', $userId)->exists();
            if ($hasCommande) {
                return response()->json([
                    'message' => 'Le code FIRST50 est réservé à la première commande.'
                ], 400);
            }
        }
        


        
         

        if ($code === 'BIG25' && $montant < 200) {
            return response()->json([
                'message' => 'Le code BIG25 nécessite un minimum de 200 DH d\'achat.'
            ], 400);
        }
        if ($code === 'SAVE10' && $montant < 100) {
            return response()->json([ 
                'message' => 'Le code SAVE10 nécessite un minimum de 100 DH d\'achat.'
            ], 400);
        }

        return response()->json([
            'remise_percent' => $coupon->remise,
            'message' => "-{$coupon->remise}% appliqué !"
        ]);
    }
}
