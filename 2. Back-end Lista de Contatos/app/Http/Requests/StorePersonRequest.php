<?php

namespace App\Http\Requests;

use App\Enums\ContactType;
use App\Enums\PersonGender;
use Illuminate\Foundation\Http\FormRequest;

class StorePersonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $personCases = join(",", PersonGender::cases());
        $contactTypes = join(",", ContactType::cases());

        return [
            'first_name' => "required|string|min:3",
            'last_name' => "required|string|min:3",
            'document' => "required|string|size:11|unique:people,document",
            'birthdate' => "required|string",
            'gender' => "required|string|in:".$personCases,

            'addresses' => "array",
            'addresses.*' => "array",
            'addresses.*.address' => "required|string|min:3",
            // 'addresses.*.complement' => "string",
            'addresses.*.number' => "required|string",
            'addresses.*.neighborhood' => "required|string|min:3",
            'addresses.*.city' => "required|string|min:3",
            'addresses.*.state' => "required|string|size:2",
            'addresses.*.country' => "required|string|size:2",
            'addresses.*.postal_code' => "required|string|size:8",

            'contacts' => "array",
            'contacts.*' => "array",
            'contacts.*.type' => "required|string|in:".$contactTypes,
            'contacts.*.contact' => "required|string|min:3",
        ];
    }
}
