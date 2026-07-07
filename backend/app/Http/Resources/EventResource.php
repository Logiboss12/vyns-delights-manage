<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id'          => $this->id,
        'title'       => $this->title,
        'description' => $this->description,
        'type'        => $this->type,
        'badge'       => $this->badge,
        'date_label'  => $this->date_label,
        'image_url'   => $this->image_url,
        'is_active'   => $this->is_active,
    ];
    }
}
