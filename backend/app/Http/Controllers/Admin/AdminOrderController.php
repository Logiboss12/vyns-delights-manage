<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateOrderStatusRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;

class AdminOrderController extends Controller
{
    // GET /api/admin/orders pour  toutes les commandes
    public function index()
    {
        $orders = Order::with(['items.product', 'user'])
            ->latest()
            ->paginate(15);

        return OrderResource::collection($orders);
    }

    // GET /api/admin/orders/{order}
    public function show(Order $order)
    {
        return new OrderResource($order->load('items.product', 'user'));
    }

    // PATCH /api/admin/orders/{order}
    public function updateStatus(UpdateOrderStatusRequest $request, Order $order)
    {
        $order->update(['status' => $request->validated()['status']]);

        return new OrderResource($order->load('items.product', 'user'));
    }
}
