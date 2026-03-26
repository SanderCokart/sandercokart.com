<?php

use App\Mail\ContactFormMail;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('mail:test', function () {
    Mail::to('cokart32@gmail.com')->send(new ContactFormMail([
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+1 234 567 8900',
        'website' => 'https://example.com',
        'message' => 'Hello, I am interested in a new website for my business. Please contact me to discuss further.',
    ]));
})->purpose('Send a test email');
