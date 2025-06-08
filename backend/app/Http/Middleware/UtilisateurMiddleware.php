<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UtilisateurMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Only allow if authenticated as utilisateur (default guard)
        if (Auth::guard('web')->check()) {
            return $next($request);
        }
        // If admin or not authenticated, deny access
        return response()->json(['message' => 'Unauthorized.'], 403);
    }
}
