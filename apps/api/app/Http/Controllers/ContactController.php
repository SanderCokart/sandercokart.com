<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'name'    => 'required|string|min:1|max:255',
            'email'   => 'required|email|max:255',
            'subject' => 'required|string|min:1|max:255',
            'message' => 'required|string|min:1|max:1000',
        ]);

        Mail::to('cokart32@gmail.com')->send(new ContactFormMail($validatedData));

        return response()->json([
            'message' => 'Email sent successfully'
        ]);
    }
}
