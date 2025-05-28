<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/dashboard/address-chart', [DashboardController::class, 'addressChart']);
Route::get('/dashboard/sales-chart', [DashboardController::class, 'salesChart']);
Route::get('/dashboard/items-chart', [DashboardController::class, 'itemsChart']);
Route::post('/items/checkout', [ItemController::class, 'postCheckout'])->name('postCheckout');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::group(['middleware' => 'auth:api'], function () {
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('items', ItemController::class);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


