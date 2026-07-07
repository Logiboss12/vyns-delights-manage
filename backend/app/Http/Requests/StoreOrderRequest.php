<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
            'delivery_address'      => ['required', 'string', 'max:255'],
            'items'                 => ['required', 'array', 'min:1'],
            'items.*.product_id'    => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity'      => ['required', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'delivery_address.required' => "L'adresse de livraison est obligatoire.",
            'items.required'            => 'La commande doit contenir au moins un article.',
            'items.min'                 => 'La commande doit contenir au moins un article.',
            'items.*.product_id.exists' => "Un des produits commandés n'existe pas.",
            'items.*.quantity.min'      => 'La quantité doit être au moins 1.',
        ];
    }
}
