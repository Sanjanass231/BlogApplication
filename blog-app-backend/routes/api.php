<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('store',[BlogController::class,'store']);
Route::get('index',[BlogController::class,'index']);
Route::get('show/{id}',[BlogController::class,'show']);
Route::put('update/{id}',[BlogController::class,'update']);
Route::delete('delete/{id}',[BlogController::class,'destroy']);
