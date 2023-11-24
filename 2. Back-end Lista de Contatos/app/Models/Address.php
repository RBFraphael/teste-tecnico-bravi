<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        "address",
        "complement",
        "number",
        "neighborhood",
        "city",
        "state",
        "country",
        "postal_code"
    ];
}
