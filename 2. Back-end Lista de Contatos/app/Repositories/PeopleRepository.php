<?php

namespace App\Repositories;

class PeopleRepository extends Repository
{
    protected array $searchable = [
        "first_name",
        "last_name",
        "document"
    ];
}
