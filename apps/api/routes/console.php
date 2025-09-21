<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


Artisan::command('mail:test', function () {
    Mail::to('cokart32@gmail.com')->send(new ContactFormMail([
        'projectName' => 'Test Project',
        'projectDescription' => 'This is a test project',
    ]));
})->purpose('Send a test email');