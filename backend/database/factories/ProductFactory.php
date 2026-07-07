<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $plats = [
            'Riz sauté', 'Poulet braisé', 'Porc au four', 'Sauce arachide',
            'Koki', 'Okok', 'Taro sauce jaune', 'Mbongo tchobi', 'Sanga',
            'Kondrè', 'Poisson pané', 'Brochettes de bœuf', 'Achu',
            'Haricots rouges', 'Plantains frits', 'Attiéké poisson',
            'Soya', 'Miondo', 'Bobolo', 'Pain de manioc',
        ];

        return [
            'name'           => $this->faker->randomElement($plats) . ' ' . $this->faker->numberBetween(1, 999),
            'description'    => $this->faker->sentence(10),
            'price'          => $this->faker->numberBetween(5, 80),
            'stock_quantity' => $this->faker->numberBetween(0, 40),
            'is_available'   => true,
            'image_url' =>  'https://loremflickr.com/640/480/food,dish?lock=' . $this->faker->numberBetween(1, 99999),
        ];
    }
}
