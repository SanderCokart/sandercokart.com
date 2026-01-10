<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Response;

class ContactController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $validatedData = $request->validate([
            'name'                      => 'required|string|min:1|max:255',
            'email'                     => 'required|string|email|max:255',
            'phone'                     => 'nullable|string|max:255',
            'projectName'               => 'required|string|min:1|max:255',
            'projectDescription'        => 'required|string|min:1|max:3000',
            'targetAudience'            => 'nullable|string|max:500',
            'budget'                    => 'nullable|string|max:255',
            'timeline'                  => 'nullable|string|max:255',
            'hasExistingWebsite'        => 'required|boolean',
            'existingWebsiteLink'       => 'exclude_if:hasExistingWebsite,false|nullable|string|max:2048|url',
            'needsInternationalization' => 'required|boolean',
        ]);

        Mail::to('anonymous@example.com')->send(new ContactFormMail($validatedData));

        return response()->noContent();
    }
}
