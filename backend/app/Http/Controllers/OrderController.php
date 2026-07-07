<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    // GET /api/orders client connecté
    public function index()
    {
        $orders = Order::with('items.product')
            ->where('user_id', request()->user()->id)
            ->latest()
            ->get();

        return OrderResource::collection($orders);
    }

    // GET /api/orders/{order}
    public function show(Order $order)
    {
        //  un client ne voit que ses propres commandes
        if ($order->user_id !== request()->user()->id && ! request()->user()->isAdmin()) {
            return response()->json(['message' => 'Accès non autorisé.'], 403);
        }

        return new OrderResource($order->load('items.product', 'user'));
    }

    // POST /api/orders  création d'une commande
    public function store(StoreOrderRequest $request)
    {
        $validated = $request->validated();
        $userId = $request->user()->id;
        $order = DB::transaction(function () use ($validated , $userId) {

            $totalAmount = 0;
            $lignes = [];

            foreach ($validated['items'] as $item) {

                $product = Product::lockForUpdate()->find($item['product_id']);

                // Vérification du stock
                if ($product->stock_quantity < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'items' => ["Stock insuffisant pour « {$product->name} » (disponible : {$product->stock_quantity})."],
                    ]);
                }

                // Décrément du stock
                $product->decrement('stock_quantity', $item['quantity']);

                // Calcul du sous-total avec le prix ACTUEL du produit
                $totalAmount += $product->price * $item['quantity'];


                $lignes[] = [
                    'product_id' => $product->id,
                    'quantity'   => $item['quantity'],
                    'unit_price' => $product->price,
                ];
            }

            // Création de la commande
            $order = Order::create([
                'user_id'          => $userId,
                'status'           => 'pending',
                'total_amount'     => $totalAmount,
                'delivery_address' => $validated['delivery_address'],
            ]);


            $order->items()->createMany($lignes);

            return $order;
        });

        return new OrderResource($order->load('items.product'));
    }
}
