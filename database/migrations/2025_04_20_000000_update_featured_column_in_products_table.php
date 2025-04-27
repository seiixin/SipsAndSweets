<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->boolean('featured')->default(true)->change();
        });
    }

    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->boolean('featured')->default(false)->change(); // or revert if needed
        });
    }

};
