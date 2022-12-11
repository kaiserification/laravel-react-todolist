<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request) 
    {
        if(! auth()->attempt($request->validated())) {
            throw ValidationException::withMessages([
                'email' => 'Identifiants incorrects',
            ]);
        }

        $user = auth()->user();

        return $this->sendAuthDetails($user);
    }

    public function register(RegisterRequest $request) 
    {
        $user = User::create($request->validated());
        
        return response([
            'user'  => UserResource::make($user),
            'token' => $user->newToken(),
        ], 201);

        return $this->sendAuthDetails($user, 201);
    }

    public function me(Request $request) 
    {
        return $request->user();
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        $user->logout();

        return response('', 204);
    }

    private function sendAuthDetails($user, $statusCode = 200) 
    {
        return response([
            'user'  => UserResource::make($user),
            'token' => $user->newToken(),
        ], $statusCode);
    }
}
