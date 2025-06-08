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
        Schema::table('utilisateurs', function (Blueprint $table) {
            $table->string('image')->nullable();
            $table->string('adresse')->nullable();
            $table->string('telephone')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('utilisateurs', function (Blueprint $table) {
            $table->dropColumn(['image', 'adresse', 'telephone']);
        });
    }
};
