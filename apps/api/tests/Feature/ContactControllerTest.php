<?php

use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;

describe('ContactController', function () {
    it('sends contact form email with valid data', function () {
        Mail::fake();

        $data = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+31 6 12345678',
            'website' => 'https://example.com',
        ];

        $response = $this->postJson(route('v1.contact'), $data);

        $response->assertStatus(204);

        Mail::assertSent(ContactFormMail::class, function ($mail) use ($data) {
            return $mail->data === $data;
        });
    });

    it('validates required fields', function () {
        $response = $this->postJson(route('v1.contact'), []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email']);
    });

    it('validates existing website URL when provided', function () {
        $data = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'website' => 'invalid-url',
        ];

        $response = $this->postJson(route('v1.contact'), $data);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['website']);
    });
});
