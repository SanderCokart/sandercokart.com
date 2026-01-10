<?php

use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;

describe('ContactController', function () {
    it('sends contact form email with valid data', function () {
        Mail::fake();

        $data = [
            'projectName' => 'Test Project',
            'projectDescription' => 'This is a test project description.',
            'targetAudience' => 'Developers',
            'budget' => '$5000',
            'timeline' => '3 months',
            'hasExistingWebsite' => false,
            'needsInternationalization' => true,
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
            ->assertJsonValidationErrors(['projectName', 'projectDescription', 'hasExistingWebsite', 'needsInternationalization']);
    });

    it('validates existing website link when hasExistingWebsite is true', function () {
        $data = [
            'projectName' => 'Test Project',
            'projectDescription' => 'Description',
            'hasExistingWebsite' => true,
            'existingWebsiteLink' => 'invalid-url',
            'needsInternationalization' => false,
        ];

        $response = $this->postJson(route('v1.contact'), $data);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['existingWebsiteLink']);
    });
});
