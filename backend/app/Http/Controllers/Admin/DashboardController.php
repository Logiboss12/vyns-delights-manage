<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class DashboardController extends Controller
{
    // GET /api/admin/dashboard/stats
    public function stats(): JsonResponse
    {
        $commandesEnAttente = Order::where('status', 'pending')->count();

        $produitsStockBas = Product::where('stock_quantity', '<=', Product::SEUIL_STOCK_BAS)
            ->orderBy('stock_quantity')
            ->get(['id', 'name', 'stock_quantity']);

        return response()->json([
            'commandes_en_attente'   => $commandesEnAttente,
            'total_commandes'        => Order::count(),
            'total_produits'         => Product::count(),
            'produits_stock_bas'     => $produitsStockBas,
            'nb_produits_stock_bas'  => $produitsStockBas->count(),
        ]);
    }

    // GET pour les graphiques du dashboard
public function charts(): JsonResponse
{

    $topProduits = OrderItem::select('product_id', DB::raw('SUM(quantity) as total_vendu'))
        ->with('product:id,name')
        ->groupBy('product_id')
        ->orderByDesc('total_vendu')
        ->limit(5)
        ->get()
        ->map(fn ($item) => [
            'name'  => $item->product->name ?? 'Produit supprimé',
            'total' => (int) $item->total_vendu,
        ]);


    $parStatut = Order::select('status', DB::raw('COUNT(*) as total'))
        ->groupBy('status')
        ->get()
        ->pluck('total', 'status');

    //  Chiffre d'affaires des 7 derniers jours
    $ca = [];
    for ($i = 6; $i >= 0; $i--) {
        $jour = Carbon::today()->subDays($i);
        $montant = Order::whereDate('created_at', $jour)
            ->where('status', '!=', 'cancelled')
            ->sum('total_amount');
        $ca[] = [
            'jour'    => $jour->translatedFormat('D d/m'),
            'montant' => (float) $montant,
        ];
    }

    return response()->json([
        'top_produits' => $topProduits,
        'par_statut'   => $parStatut,
        'ca_7_jours'   => $ca,
    ]);
}
}
