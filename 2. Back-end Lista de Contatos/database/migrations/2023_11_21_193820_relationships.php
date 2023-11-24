<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table("person_addresses", function(Blueprint $table){
            $table->foreign("person_id")->references("id")->on("people")->cascadeOnDelete();
            $table->foreign("address_id")->references("id")->on("addresses")->cascadeOnDelete();
        });

        Schema::table("person_contacts", function(Blueprint $table){
            $table->foreign("person_id")->references("id")->on("people")->cascadeOnDelete();
            $table->foreign("contact_id")->references("id")->on("contacts")->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("person_addresses", function(Blueprint $table){
            $table->dropForeign(["person_id", "address_id"]);
        });

        Schema::table("person_contacts", function(Blueprint $table){
            $table->dropForeign(["person_id", "contact_id"]);
        });
    }
};
