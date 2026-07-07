<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Administratrice
        User::updateOrCreate(
            ['email' => 'admin@vynsdelights.com'],
            [
                'name'     => 'Administratrice VYN\'S',
                'password' => 'admin1234',
                'phone'    => '690000000',
                'address'  => 'Bertoua',
                'role'     => 'admin',
            ]
        );

        // Client de test 
        User::updateOrCreate(
            ['email' => 'client@test.com'],
            [
                'name'     => 'Test Client',
                'password' => 'motdepasse123',
                'phone'    => '690000000',
                'address'  => 'Quartier Nkolbikok, Bertoua',
                'role'     => 'client',
            ]
        );
    }
}
