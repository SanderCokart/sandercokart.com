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
            'variant' => 'detailed',
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
            ->assertJsonValidationErrors(['variant', 'message']);
    });

    it('validates existing website URL when provided', function () {
        $data = [
            'variant' => 'detailed',
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
            'variant' => 'detailed',
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

    it('validates simple variant requires exactly one contact method', function () {
        Mail::fake();

        $response = $this->postJson(route('v1.contact'), [
            'variant' => 'simple',
            'message' => 'Hello!',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'phone']);
    });

    it('sends simple variant email with phone only', function () {
        Mail::fake();

        $data = [
            'variant' => 'simple',
            'phone' => '+31 6 12345678',
            'message' => 'Hello!',
        ];

        $response = $this->postJson(route('v1.contact'), $data);
        $response->assertStatus(204);

        Mail::assertSent(\App\Mail\ContactFormMail::class, function ($mail) use ($data) {
            return $mail->data === $data;
        });
    });

    it('sends detailed variant with optional specifications', function () {
        Mail::fake();

        $data = [
            'variant' => 'detailed',
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'message' => 'Hello!',
            'specifications' => [
                'internationalization',
                'contact form',
            ],
        ];

        $response = $this->postJson(route('v1.contact'), $data);
        $response->assertStatus(204);
    });

    it('validates detailed variant specifications contents', function () {
        Mail::fake();

        $response = $this->postJson(route('v1.contact'), [
            'variant' => 'detailed',
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'message' => 'Hello!',
            'specifications' => [''],
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['specifications.0']);
    });
});
