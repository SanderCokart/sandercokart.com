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
            return $mail->data['email'] === $data['email']
                && $mail->data['name'] === $data['name']
                && $mail->data['phone'] === $data['phone']
                && $mail->data['website'] === $data['website']
                && $mail->data['message'] === $data['message'];
        });
    });

    it('sends contact form email with only required fields', function () {
        Mail::fake();

        $data = [
            'email' => 'jane@example.com',
            'message' => 'Just a short note about my project.',
        ];

        $response = $this->postJson(route('v1.contact'), $data);

        $response->assertStatus(204);

        Mail::assertSent(ContactFormMail::class, function ($mail) use ($data) {
            return $mail->data['email'] === $data['email']
                && $mail->data['message'] === $data['message'];
        });
    });

    it('sends contact form email with phone as preferred contact', function () {
        Mail::fake();

        $data = [
            'phone' => '+31 6 12345678',
            'message' => 'Please call me about a new website.',
        ];

        $response = $this->postJson(route('v1.contact'), $data);

        $response->assertStatus(204);

        Mail::assertSent(ContactFormMail::class, function ($mail) use ($data) {
            return $mail->data['phone'] === $data['phone']
                && $mail->data['message'] === $data['message']
                && empty($mail->data['email']);
        });
    });

    it('validates required fields', function () {
        $response = $this->postJson(route('v1.contact'), []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'phone', 'message']);
    });

    it('requires either email or phone', function () {
        $response = $this->postJson(route('v1.contact'), [
            'message' => 'Hello!',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'phone']);
    });

    it('validates existing website URL when provided', function () {
        $data = [
            'email' => 'john@example.com',
            'message' => 'Hello!',
            'website' => 'invalid-url',
        ];

        $response = $this->postJson(route('v1.contact'), $data);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['website']);
    });

    it('returns 429 with rate limit headers after two submissions in the same hour', function () {
        Mail::fake();

        $data = [
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

    it('sends contact form with optional specifications', function () {
        Mail::fake();

        $data = [
            'email' => 'john@example.com',
            'message' => 'Hello!',
            'specifications' => [
                'internationalization',
                'contact form',
            ],
        ];

        $response = $this->postJson(route('v1.contact'), $data);
        $response->assertStatus(204);

        Mail::assertSent(ContactFormMail::class, function ($mail) use ($data) {
            return $mail->data['specifications'] === $data['specifications'];
        });
    });

    it('validates specifications contents', function () {
        Mail::fake();

        $response = $this->postJson(route('v1.contact'), [
            'email' => 'john@example.com',
            'message' => 'Hello!',
            'specifications' => [''],
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['specifications.0']);
    });
});
