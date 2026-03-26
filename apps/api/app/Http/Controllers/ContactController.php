<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Mail\ContactFormMail;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function __invoke(StoreContactRequest $request): Response
    {
        $validatedData = $request->validated();

        Mail::to(config('mail.to.address'), config('mail.to.name'))->send(new ContactFormMail($validatedData));

        return response()->noContent();
    }
}
