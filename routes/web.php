<?php

// routes/web.php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

// Admin Routes (Direct Laravel web views)
Route::get('/admin/orders', [AdminController::class, 'showOrders']);  // Show orders for admin
Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);  // Admin Dashboard

// Catch-all for SPA (frontend React)
Route::get('/{any?}', function () {
    return view('app');  // This will render your SPA (React frontend)
})->where('any', '^(?!api).*$');  // Regex to make sure the routes don't interfere with API calls

// Admin API Routes - Protected with API Authentication
Route::prefix('admin')->middleware('auth:api')->group(function () {
    // API route to fetch all orders (React will call this API)
    Route::get('orders', [AdminController::class, 'showOrdersApi']);
});
