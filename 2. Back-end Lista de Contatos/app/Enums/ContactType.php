<?php

namespace App\Enums;

class ContactType implements Enum
{
    const PHONE = "phone";
    const CELLPHONE = "cellphone";
    const FAX = "fax";
    const WHATSAPP = "whatsapp";
    const EMAIL = "email";

    public static function cases(): array {
        return [
            static::PHONE,
            static::CELLPHONE,
            static::FAX,
            static::WHATSAPP,
            static::EMAIL,
        ];
    }

    public static function label($case): string {
        switch($case){
            case static::PHONE:
                return __("Phone");
            case static::CELLPHONE:
                return __("Cellphone");
            case static::FAX:
                return __("Fax");
            case static::WHATSAPP:
                return __("Whatsapp");
            case static::EMAIL:
                return __("Email");
            default:
                return $case;
        }
    }
    
}
