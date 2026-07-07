<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ImageUploadController extends Controller
{
    // POST /api/upload/image — réservé à l'admin
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,jpg,png,webp', 'max:2048'], // max 2 Mo
        ], [
            'image.required' => 'Aucune image fournie.',
            'image.image'    => 'Le fichier doit être une image.',
            'image.mimes'    => 'Formats acceptés : jpeg, jpg, png, webp.',
            'image.max'      => "L'image ne doit pas dépasser 2 Mo.",
        ]);

        // Stocke dans storage/app/public/products, renvoie le chemin relatif
        $path = $request->file('image')->store('products', 'public');

        // URL complète accessible depuis le navigateur
        $url = asset('storage/' . $path);

        return response()->json([
            'message' => 'Image téléversée avec succès.',
            'path'    => $path,
            'url'     => $url,
        ], 201);
    }
}
