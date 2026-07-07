<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'status'           => $this->status,
            'total_amount'     => $this->total_amount,
            'delivery_address' => $this->delivery_address,
            'created_at'       => $this->created_at,
            'items'            => $this->whenLoaded('items', function () {
                return $this->items->map(function ($item) {
                    return [
                        'id'           => $item->id,
                        'product_name' => $item->product->name ?? 'Produit supprimé',
                        'quantity'     => $item->quantity,
                        'unit_price'   => $item->unit_price,
                        'subtotal'     => $item->quantity * $item->unit_price,
                    ];
                });
            }),
            'client' => $this->whenLoaded('user', fn () => [
                'name'  => $this->user->name,
                'phone' => $this->user->phone,
            ]),
        ];
    }
}
