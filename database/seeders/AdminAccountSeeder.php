<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Admin::create([
            'username' => 'sidney',
            'email' => 'sidneypagdanganan@gmail.com',
            'password' => Hash::make('112803Ss'), // Use Hash::make for secure passwords
        ]);
    }
}
