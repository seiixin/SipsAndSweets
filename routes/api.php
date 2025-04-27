<?php

// routes/api.php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route; // Make sure this is included

// Product Routes
Route::get('/products', [ProductController::class, 'index']); // Lists all products
Route::get('/products/featured', [ProductController::class, 'featured']); // Fetch featured products
Route::get('/products/category/{category}', [ProductController::class, 'byCategory']); // Filter products by category
Route::get('/products/{id}', [ProductController::class, 'show']); // Show single product details
Route::post('/products', [ProductController::class, 'store']); // Create a new product
Route::put('/products/{id}', [ProductController::class, 'update']); // Update product details
Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Delete product

// Contact Message Routes
Route::get('/contact', [ContactMessageController::class, 'index']); // Get all contact messages
Route::post('/contact', [ContactMessageController::class, 'store']); // Store a new contact message
Route::get('/contact/{id}', [ContactMessageController::class, 'show']); // Show specific contact message
Route::delete('/contact/{id}', [ContactMessageController::class, 'destroy']); // Delete a contact

// Menu Routes
Route::get('/menu', [ProductController::class, 'index']);

// Orders Routes
Route::post('/orders', [OrderController::class, 'store']); // Create a new order
Route::get('/orders', [OrderController::class, 'index']); // ✅ Fetch all orders (ADDED)
Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

// Admin API Routes - Protected with API Authentication
Route::prefix('admin')->middleware('auth:api')->group(function () {
    // API route to fetch all orders (for admin dashboard)
    Route::get('/orders', [OrderController::class, 'getOrders']);
});



