<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function user(Request $request)
    {
        return auth()->user();
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        if (!auth()->attempt($validatedData)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        return response()->noContent();
    }

    public function logout(Request $request)
    {
        auth()->logout();

        return response()->noContent();
    }
}
