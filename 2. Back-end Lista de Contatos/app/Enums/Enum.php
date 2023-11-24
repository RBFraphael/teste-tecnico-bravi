<?php

namespace App\Enums;

interface Enum {

    /**
     * Get all available cases
     * 
     * @return array 
     */
    static function cases(): array;

    /**
     * Return the label of a case
     * 
     * @param mixed $case mixed
     * @return string 
     */
    static function label($case): string;

}
