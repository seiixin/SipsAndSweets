<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'admins';

    // Define the fillable fields for mass assignment
    protected $fillable = [
        'username',
        'email',
        'password',
    ];

    // You can also define hidden fields (like password) to keep it safe
    protected $hidden = [
        'password',
    ];
}
