<?php

namespace App\Enums;

class PersonGender implements Enum
{
    const MALE = "male";
    const FEMALE = "female";
    const OTHER = "other";

    public static function cases(): array {
        return [
            static::MALE,
            static::FEMALE,
            static::OTHER
        ];
    }

    public static function label($case): string {
        switch($case){
            case static::MALE:
                return __("Male");
            case static::FEMALE:
                return __("Female");
            case static::OTHER:
                return __("Other");
            default:
                return $case;
        }
    }

}
