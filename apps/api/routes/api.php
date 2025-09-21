<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1', 'as' => 'v1.'], function () {
    Route::post('contact', \App\Http\Controllers\ContactController::class)->name('contact');
});