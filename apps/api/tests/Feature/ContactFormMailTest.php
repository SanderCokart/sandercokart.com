<?php

use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Http;

describe('ContactFormMail', function () {
    it('renders html and text from the mail renderer', function () {
        Http::fake([
            config('services.mail_renderer.url').'/render' => Http::response([
                'html' => '<p>Rendered HTML</p>',
                'text' => 'Rendered text',
            ]),
        ]);

        $data = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'message' => 'Hello, I would like a quote.',
        ];

        $html = (new ContactFormMail($data))->render();

        expect($html)->toContain('Rendered HTML');

        Http::assertSent(function ($request) use ($data) {
            return $request->url() === config('services.mail_renderer.url').'/render'
                && $request['template'] === 'contact-form'
                && $request['props']['email'] === $data['email']
                && $request['props']['name'] === $data['name']
                && $request['props']['message'] === $data['message'];
        });
    });
});
