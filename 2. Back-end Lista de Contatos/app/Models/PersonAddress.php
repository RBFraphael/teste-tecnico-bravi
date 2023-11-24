<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonAddress extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        "person_id",
        "address_id"
    ];
}
