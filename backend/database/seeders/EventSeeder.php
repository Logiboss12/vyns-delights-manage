<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            [
                'title' => 'Menu famille -15%', 'type' => 'promo', 'badge' => 'Promo', 'date_label' => 'Ce week-end',
                'description' => 'Commandez un menu famille et profitez de 15% de réduction.',
                'image_url' => 'https://loremflickr.com/600/400/party,food?lock=301',
            ],
            [
                'title' => 'Traiteur & événements', 'type' => 'service', 'badge' => 'Service', 'date_label' => 'Sur réservation',
                'description' => "Mariages, anniversaires, réunions : VYN'S DELIGHTS régale vos invités.",
                'image_url' => 'https://loremflickr.com/600/400/catering?lock=302',
            ],
            [
                'title' => 'Nouveaux desserts', 'type' => 'nouveaute', 'badge' => 'Nouveau', 'date_label' => 'Cette semaine',
                'description' => 'Découvrez nos nouvelles douceurs faites maison.',
                'image_url' => 'https://loremflickr.com/600/400/dessert?lock=303',
            ],
            [
                'title' => "Gâteau d'anniversaire sur commande", 'type' => 'service', 'badge' => 'Sur mesure', 'date_label' => 'Toute l\'année',
                'description' => 'Un anniversaire à fêter ? Commandez votre gâteau personnalisé.',
                'image_url' => 'https://loremflickr.com/600/400/birthday,cake?lock=304',
            ],
        ];

        foreach ($events as $e) {
            Event::create($e);
        }
    }
}
