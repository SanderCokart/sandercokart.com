<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
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

        $user = auth()->user();
        $accessToken = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user'         => $user,
            'access_token' => $accessToken
        ]);
    }
}
