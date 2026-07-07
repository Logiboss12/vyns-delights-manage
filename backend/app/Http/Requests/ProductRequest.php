<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'category_id'    => ['required', 'exists:categories,id'],
        'name'           => ['required', 'string', 'max:255'],
        'description'    => ['required', 'string'],
        'price'          => ['required', 'numeric', 'min:0'],
        'stock_quantity' => ['required', 'integer', 'min:0'],
        'is_available'   => ['sometimes', 'boolean'],
        'image_url'      => ['nullable', 'string', 'max:255'],
        ];
    }
    public function messages(): array
{
    return [
        'category_id.required' => 'La catégorie est obligatoire.',
        'category_id.exists'   => "Cette catégorie n'existe pas.",
        'name.required'        => 'Le nom du produit est obligatoire.',
        'description.required' => 'La description est obligatoire.',
        'price.required'       => 'Le prix est obligatoire.',
        'price.numeric'        => 'Le prix doit être un nombre.',
        'price.min'            => 'Le prix ne peut pas être négatif.',
        'stock_quantity.required' => 'La quantité en stock est obligatoire.',
        'stock_quantity.integer'  => 'La quantité doit être un nombre entier.',
    ];
}
}
