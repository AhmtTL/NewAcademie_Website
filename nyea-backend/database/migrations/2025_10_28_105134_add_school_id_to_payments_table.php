<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            // Add school_id column
            $table->unsignedBigInteger('school_id')->nullable()->after('program_id');
            
            // Add training_camp_session_id column (to support training camp payments)
            $table->unsignedBigInteger('training_camp_session_id')->nullable()->after('workshop_session_id');
            
            // Add foreign key constraints
            $table->foreign('school_id')->references('id')->on('schools')->onDelete('set null');
            $table->foreign('training_camp_session_id')->references('id')->on('training_camp_sessions')->onDelete('cascade');
            
            // Add indexes for better query performance
            $table->index('school_id');
            $table->index('training_camp_session_id');
        });

        // Populate school_id for existing payments from workshop sessions
        DB::statement('
            UPDATE payments p
            INNER JOIN workshop_sessions ws ON p.workshop_session_id = ws.id
            SET p.school_id = ws.school_id
            WHERE p.workshop_session_id IS NOT NULL 
            AND ws.school_id IS NOT NULL
        ');

        // Note: training_camp_session_id will be null for existing records since this is a new feature
        // Future training camp payments will populate both training_camp_session_id and school_id
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            // Drop foreign key constraints
            $table->dropForeign(['school_id']);
            $table->dropForeign(['training_camp_session_id']);
            
            // Drop indexes
            $table->dropIndex(['school_id']);
            $table->dropIndex(['training_camp_session_id']);
            
            // Drop columns
            $table->dropColumn('school_id');
            $table->dropColumn('training_camp_session_id');
        });
    }
};
