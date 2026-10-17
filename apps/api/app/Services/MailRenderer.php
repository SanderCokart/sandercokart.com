<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class MailRenderer
{
    /**
     * @param  array<string, mixed>  $props
     * @return array{html: string, text: string}
     */
    public function render(string $template, array $props): array
    {
        /** @var array{html?: mixed, text?: mixed} $payload */
        $payload = Http::baseUrl((string) config('services.mail_renderer.url'))
            ->acceptJson()
            ->asJson()
            ->timeout(30)
            ->post('/render', [
                'template' => $template,
                'props' => $props,
            ])
            ->throw()
            ->json();

        if (! is_string($payload['html'] ?? null) || ! is_string($payload['text'] ?? null)) {
            throw new RuntimeException('Mail renderer returned an invalid payload.');
        }

        return [
            'html' => $payload['html'],
            'text' => $payload['text'],
        ];
    }
}
