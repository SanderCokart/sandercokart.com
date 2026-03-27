<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1', 'as' => 'v1.'], function () {
    Route::post('contact', ContactController::class)
        ->middleware('throttle:contact')
        ->name('contact');
});
