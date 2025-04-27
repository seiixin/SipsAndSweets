<?php

// database/migrations/{timestamp}_create_orders_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('contact');
            $table->text('address');
            $table->string('payment_method');
            $table->decimal('total', 10, 2);
            $table->json('items');  // Store the ordered products as JSON
            $table->string('status')->default('pending');  // Pending or Delivered
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
