<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title', 'description', 'type', 'badge', 'date_label', 'image_url', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
