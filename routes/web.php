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

// Route::get('/', function () {
//     return view('welcome');
// });
Route::view('/customers', 'customer.index');
Route::view('/items', 'item.index');
Route::view('/dashboard', 'dashboard.index');
Route::view('/shop', 'shop.index');
Route::view('/login', 'user.login');
Route::view('/', 'home');
Route::view('/cart', 'shop.cart');
