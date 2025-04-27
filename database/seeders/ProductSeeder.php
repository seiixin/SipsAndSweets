<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            // Combos
            [
                'name' => 'Sweetheart Combo',
                'description' => 'A delightful pairing of a chocolate donut and a strawberry milkshake.',
                'price' => 199.00,
                'category' => 'Combo',
                'featured' => true,
                'image_url' => 'images/sweetheartcombo.jpg',  // Image path
            ],
            [
                'name' => 'Brunch Bliss',
                'description' => 'Croissant sandwich with ham, cheese, and a refreshing iced latte.',
                'price' => 249.00,
                'category' => 'Combo',
                'featured' => false,
                'image_url' => 'images/brunchbliss.jpg',  // Image path
            ],
            [
                'name' => 'Midnight Treat',
                'description' => 'Double fudge brownie and hot caramel macchiato combo.',
                'price' => 179.00,
                'category' => 'Combo',
                'featured' => true,
                'image_url' => 'images/midnighttreat.jpg',  // Image path
            ],

            // Desserts
            [
                'name' => 'Classic Chocolate Cake',
                'description' => 'Rich and moist chocolate cake slice topped with ganache.',
                'price' => 120.00,
                'category' => 'Dessert',
                'featured' => true,
                'image_url' => 'images/classicchocolatecake.png',  // Image path
            ],
            [
                'name' => 'Strawberry Dream',
                'description' => 'Light vanilla sponge cake layered with fresh strawberries and cream.',
                'price' => 130.00,
                'category' => 'Dessert',
                'featured' => false,
                'image_url' => 'images/strawberrydream.png',  // Image path
            ],
            [
                'name' => 'Mango Cheesecake',
                'description' => 'Creamy cheesecake topped with luscious mango glaze.',
                'price' => 150.00,
                'category' => 'Dessert',
                'featured' => true,
                'image_url' => 'images/mangocheesecake.png',  // Image path
            ],

            // Drinks
            [
                'name' => 'Pink Lemonade',
                'description' => 'Freshly squeezed lemonade with a pink twist.',
                'price' => 85.00,
                'category' => 'Drink',
                'featured' => false,
                'image_url' => 'images/pinklemonade.jpg',  // Image path
            ],
            [
                'name' => 'Caramel Frappe',
                'description' => 'Blended iced coffee with rich caramel syrup and whipped cream.',
                'price' => 120.00,
                'category' => 'Drink',
                'featured' => true,
                'image_url' => 'images/caramelfrappe.jpg',  // Image path
            ],
            [
                'name' => 'Berry Iced Tea',
                'description' => 'Refreshing iced tea infused with mixed berries.',
                'price' => 90.00,
                'category' => 'Drink',
                'featured' => false,
                'image_url' => 'images/berryicedtea.jpg',  // Image path
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
