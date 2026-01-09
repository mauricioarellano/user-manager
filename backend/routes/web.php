<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return response()->json([
        'message' => 'User Management API',
        'version' => '1.0.0',
        'endpoints' => [
            'POST /api/register' => 'Register a new user',
            'POST /api/login' => 'Login user',
            'POST /api/logout' => 'Logout user (authenticated)',
            'GET /api/me' => 'Get authenticated user',
            'GET /api/users' => 'List all users (authenticated)',
            'GET /api/users/{id}' => 'Get user by ID (authenticated)',
            'POST /api/users' => 'Create user (admin only)',
            'PUT /api/users/{id}' => 'Update user (admin only)',
            'DELETE /api/users/{id}' => 'Delete user (admin only)',
            'GET /api/users/export/csv' => 'Export users to CSV (admin only)',
        ],
    ]);
});

