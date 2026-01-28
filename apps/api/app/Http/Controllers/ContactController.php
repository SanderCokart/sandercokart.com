<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $validatedData = $request->validate([
            'name' => 'required|string|min:1|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'nullable|string|max:255',
            'existingWebsite' => 'nullable|string|max:2048|url',
        ]);

        Mail::to(config('mail.to.address'), config('mail.to.name'))->send(new ContactFormMail($validatedData));

        return response()->noContent();
    }
}
