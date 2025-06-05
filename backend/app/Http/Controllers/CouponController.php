<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function check(Request $request)
    {
        $request->validate([
            'code' => 'required|string'
        ]);

        $coupon = \App\Models\Coupon::where('code', $request->code)
            ->where(function($q) {
                $q->whereNull('date_expiration')
                  ->orWhere('date_expiration', '>=', now());
            })
            ->first();

        if (!$coupon) {
            return response()->json(['message' => 'Code promo invalide ou expiré.'], 404);
        }

        return response()->json([
            'remise' => $coupon->remise, // e.g. 10 for 10 MAD
            'message' => 'Code promo appliqué !'
        ]);
    }
}
