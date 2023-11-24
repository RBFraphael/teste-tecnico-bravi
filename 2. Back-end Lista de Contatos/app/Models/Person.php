<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $fillable = [
        "first_name",
        "last_name",
        "document",
        "birthdate",
        "gender"
    ];

    protected static function booted()
    {
        static::deleted(function(Person $person){
            $person->addresses()->delete();
            $person->contacts()->delete();
        });
    }

    public function addresses()
    {
        return $this->hasManyThrough(Address::class, PersonAddress::class, "person_id", "id", "id", "address_id");
    }

    public function contacts()
    {
        return $this->hasManyThrough(Contact::class, PersonContact::class, "person_id", "id", "id", "contact_id");
    }
}
