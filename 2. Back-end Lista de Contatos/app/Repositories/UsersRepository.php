<?php

namespace App\Repositories;

class UsersRepository extends Repository
{
    protected array $searchable = [
        "name",
        "email"
    ];
}
