<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;


Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::get('/user', [\App\Http\Controllers\AuthController::class, 'user']);
Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);


Route::apiResource('articles', ArticleController::class);
