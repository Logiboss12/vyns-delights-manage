<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        'title'       => ['required', 'string', 'max:255'],
        'description' => ['required', 'string'],
        'type'        => ['required', 'in:promo,service,nouveaute'],
        'badge'       => ['nullable', 'string', 'max:50'],
        'date_label'  => ['nullable', 'string', 'max:100'],
        'image_url'   => ['nullable', 'string', 'max:255'],
        'is_active'   => ['sometimes', 'boolean'],
    ];
    }
    public function messages(): array
{
    return [
        'title.required'       => 'Le titre est obligatoire.',
        'description.required' => 'La description est obligatoire.',
        'type.required'        => 'Le type est obligatoire.',
        'type.in'              => 'Type invalide.',
    ];
}
}
