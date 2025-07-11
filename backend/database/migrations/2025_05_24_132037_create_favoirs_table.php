<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    Schema::create('favoris', function (Blueprint $table) {
    $table->id();
    $table->foreignId('utilisateur_id')->constrained('utilisateurs')->onDelete('cascade');
    $table->foreignId('produit_id')->constrained('produits')->onDelete('cascade');
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('favoris');
    }
};
