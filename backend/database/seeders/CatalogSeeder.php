<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        // === Univers parents ===
        $cuisine = Category::create(['name' => 'Cuisine', 'description' => 'Plats maison et service traiteur']);
        $patisserie = Category::create(['name' => 'Pâtisserie', 'description' => 'Gâteaux et douceurs faites maison']);

        // === Sous-catégories CUISINE ===
        $plats     = Category::create(['name' => 'Plats principaux', 'parent_id' => $cuisine->id, 'description' => 'Nos plats copieux']);
        $entrees   = Category::create(['name' => 'Entrées & accompagnements', 'parent_id' => $cuisine->id, 'description' => 'Pour accompagner']);
        $grillades = Category::create(['name' => 'Grillades & braisés', 'parent_id' => $cuisine->id, 'description' => 'Poissons et viandes braisés']);
        $boissons  = Category::create(['name' => 'Boissons', 'parent_id' => $cuisine->id, 'description' => 'Boissons fraîches et naturelles']);

        // === Sous-catégories PÂTISSERIE ===
        $gateaux   = Category::create(['name' => 'Gâteaux', 'parent_id' => $patisserie->id, 'description' => 'Gâteaux classiques']);
        $viennois  = Category::create(['name' => 'Viennoiseries', 'parent_id' => $patisserie->id, 'description' => 'Beignets et viennoiseries']);
        $entremets = Category::create(['name' => 'Entremets & desserts', 'parent_id' => $patisserie->id, 'description' => 'Douceurs pour terminer']);
        $evenement = Category::create(['name' => 'Gâteaux événementiels', 'parent_id' => $patisserie->id, 'description' => 'Sur commande pour vos événements']);

        // === Produits ===
        $produits = [
            // --- Cuisine : plats principaux ---
            ['category_id' => $plats->id, 'name' => 'Poulet DG', 'description' => 'Poulet sauté aux plantains mûrs et légumes.', 'price' => 3500, 'stock_quantity' => 15, 'image_url' => 'https://loremflickr.com/640/480/chicken,food?lock=101'],
            ['category_id' => $plats->id, 'name' => 'Ndolè aux crevettes', 'description' => 'Feuilles de ndolè mijotées, crevettes et viande.', 'price' => 3000, 'stock_quantity' => 12, 'image_url' => 'https://loremflickr.com/640/480/shrimp,food?lock=102'],
            ['category_id' => $plats->id, 'name' => 'Eru et water fufu', 'description' => 'Eru traditionnel accompagné de water fufu.', 'price' => 2500, 'stock_quantity' => 10, 'image_url' => 'https://loremflickr.com/640/480/soup,food?lock=103'],

            // --- Cuisine : grillades & braisés ---
            ['category_id' => $grillades->id, 'name' => 'Poisson braisé + bâton', 'description' => 'Poisson braisé épicé, servi avec bâton de manioc.', 'price' => 4000, 'stock_quantity' => 8, 'image_url' => 'https://loremflickr.com/640/480/fish,grilled?lock=104'],
            ['category_id' => $grillades->id, 'name' => 'Brochettes de bœuf', 'description' => 'Brochettes de bœuf marinées et grillées.', 'price' => 2000, 'stock_quantity' => 18, 'image_url' => 'https://loremflickr.com/640/480/beef,grilled?lock=109'],

            // --- Cuisine : entrées & accompagnements ---
            ['category_id' => $entrees->id, 'name' => 'Beignets haricots', 'description' => 'Beignets moelleux accompagnés de haricots.', 'price' => 1000, 'stock_quantity' => 20, 'image_url' => 'https://loremflickr.com/640/480/beans,food?lock=105'],
            ['category_id' => $entrees->id, 'name' => 'Plantains frits', 'description' => 'Plantains mûrs frits, croustillants.', 'price' => 800, 'stock_quantity' => 25, 'image_url' => 'https://loremflickr.com/640/480/plantain,food?lock=110'],

            // --- Cuisine : boissons ---
            ['category_id' => $boissons->id, 'name' => 'Jus de gingembre', 'description' => 'Jus de gingembre maison, frais et piquant.', 'price' => 800, 'stock_quantity' => 30, 'image_url' => 'https://loremflickr.com/640/480/juice,drink?lock=107'],
            ['category_id' => $boissons->id, 'name' => 'Jus de bissap', 'description' => "Boisson d'hibiscus rafraîchissante.", 'price' => 800, 'stock_quantity' => 3, 'image_url' => 'https://loremflickr.com/640/480/juice,drink?lock=108'],

            // --- Pâtisserie : gâteaux ---
            ['category_id' => $gateaux->id, 'name' => 'Gâteau au chocolat', 'description' => 'Moelleux au chocolat intense, part individuelle.', 'price' => 1500, 'stock_quantity' => 14, 'image_url' => 'https://loremflickr.com/640/480/chocolate,cake?lock=201'],
            ['category_id' => $gateaux->id, 'name' => 'Gâteau vanille-fraise', 'description' => 'Génoise vanille et fraises fraîches.', 'price' => 1800, 'stock_quantity' => 10, 'image_url' => 'https://loremflickr.com/640/480/strawberry,cake?lock=202'],

            // --- Pâtisserie : viennoiseries ---
            ['category_id' => $viennois->id, 'name' => 'Croissant au beurre', 'description' => 'Croissant feuilleté pur beurre.', 'price' => 500, 'stock_quantity' => 40, 'image_url' => 'https://loremflickr.com/640/480/croissant?lock=203'],
            ['category_id' => $viennois->id, 'name' => 'Beignets sucrés', 'description' => 'Beignets moelleux saupoudrés de sucre.', 'price' => 400, 'stock_quantity' => 50, 'image_url' => 'https://loremflickr.com/640/480/donut?lock=204'],

            // --- Pâtisserie : entremets & desserts ---
            ['category_id' => $entremets->id, 'name' => 'Salade de fruits', 'description' => 'Assortiment de fruits frais de saison.', 'price' => 1500, 'stock_quantity' => 4, 'image_url' => 'https://loremflickr.com/640/480/fruit,salad?lock=106'],
            ['category_id' => $entremets->id, 'name' => 'Mousse au chocolat', 'description' => 'Mousse au chocolat onctueuse.', 'price' => 1200, 'stock_quantity' => 12, 'image_url' => 'https://loremflickr.com/640/480/chocolate,mousse?lock=205'],
            ['category_id' => $entremets->id, 'name' => 'Tarte aux pommes', 'description' => 'Tarte fine aux pommes caramélisées.', 'price' => 1600, 'stock_quantity' => 8, 'image_url' => 'https://loremflickr.com/640/480/apple,tart?lock=206'],

            // --- Pâtisserie : gâteaux événementiels ---
            ['category_id' => $evenement->id, 'name' => "Gâteau d'anniversaire personnalisé", 'description' => 'Gâteau sur commande, décor au choix.', 'price' => 15000, 'stock_quantity' => 5, 'image_url' => 'https://loremflickr.com/640/480/birthday,cake?lock=207'],
            ['category_id' => $evenement->id, 'name' => 'Pièce montée de mariage', 'description' => 'Pièce montée sur mesure pour votre grand jour.', 'price' => 50000, 'stock_quantity' => 3, 'image_url' => 'https://loremflickr.com/640/480/wedding,cake?lock=208'],
        ];

        foreach ($produits as $produit) {
            Product::create($produit);
        }

        // Compléter avec quelques produits générés, répartis dans les sous-catégories
        $sousCategories = [
            $plats->id, $entrees->id, $grillades->id, $boissons->id,
            $gateaux->id, $viennois->id, $entremets->id,
        ];
        for ($i = 0; $i < 30; $i++) {
            Product::factory()->create([
                'category_id' => fake()->randomElement($sousCategories),
            ]);
        }
    }
}
