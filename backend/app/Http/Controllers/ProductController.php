<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductController extends Controller
{
    // get/api/products
    public function index(Request $request)
{
    $query = Product::with('category');

    if ($request->filled('category_id')) {
        $query->where('category_id', $request->category_id);
    }

    $products = $query->orderBy('name')->paginate(10);  

    return ProductResource::collection($products);
}

    // post/api/products
    public function store(ProductRequest $request)
    {
        $product = Product::create($request->validated());

        return new ProductResource($product->load('category'));
    }
    // put/api/products/{id}
    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->validated());

        return new ProductResource($product->load('category'));
    }
    // delete/api/products/{id}
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'produit supprimé.'], 200);
    }
    public function show(Product $product)
{
    return new ProductResource($product->load('category'));
}

}
