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
            'variant' => ['required', 'string', 'in:simple,detailed'],

            // Shared
            'message' => ['required', 'string', 'min:1', 'max:10000'],

            // Simple variant: require exactly one of email/phone (email OR phone, not both)
            'email' => [
                'nullable',
                'string',
                'email',
                'max:255',
                'required_if:phone,null',
                'prohibited_unless:variant,simple',
            ],
            'phone' => [
                'nullable',
                'string',
                'max:255',
                'required_if:email,null',
                'prohibited_unless:variant,simple',
            ],

            // Detailed variant: preserve existing requirements
            'name' => ['required_if:variant,detailed', 'nullable', 'string', 'min:1', 'max:255'],
            'website' => ['nullable', 'string', 'max:2048', 'url'],

            // Optional for both; only used for detailed, ignored by backend for simple.
            'specifications' => ['nullable', 'array', 'prohibited_unless:variant,detailed'],
            'specifications.*' => ['nullable', 'string', 'min:1', 'max:255'],
        ];
    }
}
