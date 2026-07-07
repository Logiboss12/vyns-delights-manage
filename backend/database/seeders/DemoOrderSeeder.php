<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DemoOrderSeeder extends Seeder
{
    public function run(): void
    {
        $client = User::where('email', 'client@test.com')->first()
            ?? User::where('role', 'client')->first();

        if (! $client) {
            $client = User::create([
                'name' => 'Client Démo', 'email' => 'demo@vynsdelights.com',
                'password' => 'motdepasse123', 'role' => 'client',
                'phone' => '690000000', 'address' => 'Bertoua',
            ]);
        }
        $produits = Product::where('is_available', true)->get();
        if ($produits->count() < 5) return;

        $statutsPondere = [
            'delivered', 'delivered', 'delivered', 'delivered', 'delivered', 'delivered',
            'confirmed', 'confirmed', 'confirmed', 'confirmed',
            'preparing', 'preparing', 'preparing',
            'pending', 'pending', 'pending',
            'cancelled', 'cancelled',
        ];

        $adresses = [
            'Quartier Nkolbikok, Bertoua', 'Quartier Mokolo, Bertoua', 'Quartier Tigaza, Bertoua',
            'Quartier Madagascar, Bertoua', 'Quartier Haoussa, Bertoua', 'Quartier Bonis, Bertoua',
            'Quartier Kano, Bertoua', 'Centre-ville, Bertoua',
        ];

        for ($i = 0; $i < 30; $i++) {
            $date = Carbon::today()
                ->subDays(rand(0, 29))
                ->addHours(rand(8, 20))
                ->addMinutes(rand(0, 59));

            $status  = $statutsPondere[array_rand($statutsPondere)];
            $adresse = $adresses[array_rand($adresses)];

            $order = Order::create([
                'user_id'          => $client->id,
                'status'           => $status,
                'total_amount'     => 0,
                'delivery_address' => $adresse,
                'created_at'       => $date,
                'updated_at'       => $date,
            ]);

            $lignes = $produits->random(rand(1, 4));
            $total = 0;

            foreach ($lignes as $produit) {
                $qte = rand(1, 3);
                $total += $produit->price * $qte;
                $order->items()->create([
                    'product_id' => $produit->id,
                    'quantity'   => $qte,
                    'unit_price' => $produit->price,
                ]);
            }

            $order->update(['total_amount' => $total]);
        }
    }
}
