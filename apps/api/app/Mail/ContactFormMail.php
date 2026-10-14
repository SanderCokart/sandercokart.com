<?php

namespace App\Mail;

use App\Services\MailRenderer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\HtmlString;

class ContactFormMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * @param  array<string, mixed>  $data
     */
    public function __construct(public array $data) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Contact Form Submission',
        );
    }

    public function content(): Content
    {
        $rendered = app(MailRenderer::class)->render('contact-form', $this->data);

        $this->text(new HtmlString($rendered['text']));

        return new Content(
            htmlString: $rendered['html'],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
