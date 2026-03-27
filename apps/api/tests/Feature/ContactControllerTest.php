<?php

use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;

describe('ContactController', function () {
    beforeEach(function () {
        Cache::flush();
    });

    it('sends contact form email with valid data', function () {
        Mail::fake();

        $data = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+31 6 12345678',
            'website' => 'https://example.com',
            'message' => 'Hello, I would like a quote for a new website.',
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
            ->assertJsonValidationErrors(['name', 'email', 'message']);
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

    it('returns 429 with rate limit headers after two submissions in the same hour', function () {
        Mail::fake();

        $data = [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'message' => 'Project inquiry.',
        ];

        $first = $this->postJson(route('v1.contact'), $data);
        $first->assertStatus(204)
            ->assertHeader('X-RateLimit-Limit', '2')
            ->assertHeader('X-RateLimit-Remaining', '1');

        $second = $this->postJson(route('v1.contact'), $data);
        $second->assertStatus(204)
            ->assertHeader('X-RateLimit-Limit', '2')
            ->assertHeader('X-RateLimit-Remaining', '0');

        $third = $this->postJson(route('v1.contact'), $data);
        $third->assertStatus(429)
            ->assertHeader('X-RateLimit-Limit', '2')
            ->assertHeader('X-RateLimit-Remaining', '0')
            ->assertHeader('Retry-After');
    });
});
