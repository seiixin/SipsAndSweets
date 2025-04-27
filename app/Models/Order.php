<?php

// app/Models/Order.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'contact',
        'address',
        'payment_method',
        'total',
        'items',
        'status'
    ];

    protected $casts = [
        'items' => 'array',  // Automatically cast items as an array
    ];
}
