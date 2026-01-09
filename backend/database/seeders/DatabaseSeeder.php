<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'phone' => '+1234567890',
            'role' => 'admin',
        ]);

        // Create standard user
        User::create([
            'name' => 'Standard User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'phone' => '+0987654321',
            'role' => 'user',
        ]);

        // Create additional test users
        for ($i = 1; $i <= 20; $i++) {
            User::create([
                'name' => "Test User {$i}",
                'email' => "testuser{$i}@example.com",
                'password' => Hash::make('password'),
                'phone' => '+1' . str_pad($i, 10, '0', STR_PAD_LEFT),
                'role' => $i % 3 === 0 ? 'admin' : 'user',
            ]);
        }
    }
}

