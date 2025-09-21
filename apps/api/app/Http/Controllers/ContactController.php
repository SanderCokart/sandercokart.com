<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{

    public function index()
    {
        return response()->json([
            'message' => 'Contact form'
        ]);
    }
    public function __invoke(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'projectName'               => 'required|string|min:1|max:255',
            'projectDescription'        => 'required|string|min:1|max:3000',
            'targetAudience'            => 'nullable|string|max:500',
            'desiredFeatures'           => 'nullable|string|max:1000',
            'budget'                    => 'nullable|string|max:255',
            'timeline'                  => 'nullable|string|max:255',
            'hasExistingWebsite'        => 'required|boolean',
            'existingWebsiteLink'       => 'exclude_if:hasExistingWebsite,false|nullable|string|max:2048|url',
            'needsInternationalization' => 'required|boolean',
        ]);

        Mail::to('cokart32@gmail.com')->send(new ContactFormMail($validatedData));

        return response()->json([
            'message' => 'Email sent successfully'
        ]);
    }
}
