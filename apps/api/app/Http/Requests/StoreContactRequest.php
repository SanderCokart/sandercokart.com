<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'email' => ['required_without:phone', 'nullable', 'string', 'email', 'max:255'],
            'phone' => ['required_without:email', 'nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'min:1', 'max:10000'],
            'name' => ['nullable', 'string', 'max:255'],
            'website' => ['nullable', 'string', 'max:2048', 'url'],
            'specifications' => ['nullable', 'array'],
            'specifications.*' => ['required', 'string', 'min:1', 'max:255'],
        ];
    }
}
