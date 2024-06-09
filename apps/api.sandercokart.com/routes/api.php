<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;


Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);


Route::apiResource('articles', ArticleController::class);
