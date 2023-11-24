<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:api", [
            'except' => [
                "login",
                "refresh"
            ]
        ]);
    }

    public function login(Request $request)
    {
        $auth = request(['name', 'email', 'password']);

        if(!$token = auth()->attempt($auth)){
            return response()->json([
                'message' => __("Invalid credentials")
            ], 401);
        }

        return $this->respondWithToken($token);
    }

    public function refresh(Request $request)
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function me(Request $request)
    {
        $user = auth()->user();

        return response()->json($user);
    }

    public function logout(Request $request)
    {
        auth()->logout();

        return response()->json([
            'message' => __("Successfully logged out")
        ]);
    }

    private function respondWithToken($token)
    {
        $user = auth()->user();

        return response()->json([
            'access_token' => $token,
            'token_type' => "bearer",
            'user' => $user,
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
