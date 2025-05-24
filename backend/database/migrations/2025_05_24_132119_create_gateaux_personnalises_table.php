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
        Schema::create('gateaux_personnalises', function (Blueprint $table) {
    $table->id();
    $table->foreignId('utilisateur_id')->constrained('utilisateurs')->onDelete('cascade');
    $table->string('forme');
    $table->string('saveur');
    $table->string('taille');
    $table->string('creme_interieur');
    $table->string('creme_exterieur');
    $table->string('message')->nullable();
    $table->string('decoration')->nullable();
    $table->string('image_modele')->nullable();
    $table->float('prix_estime');
    $table->string('statut')->default('en_attente');
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
        Schema::dropIfExists('gateaux_personnalises');
    }
};
