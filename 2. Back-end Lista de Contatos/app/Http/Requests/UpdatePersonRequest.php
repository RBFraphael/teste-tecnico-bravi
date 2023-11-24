<?php

namespace App\Http\Requests;

use App\Enums\ContactType;
use App\Enums\PersonGender;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePersonRequest extends FormRequest
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
        $person = request()->route("person");

        $personCases = join(",", PersonGender::cases());
        $contactTypes = join(",", ContactType::cases());

        return [
            'first_name' => "string|min:3",
            'last_name' => "string|min:3",
            'document' => "string|size:11|unique:people,document,".$person->id,
            'birthdate' => "string",
            'gender' => "string|in:".$personCases,

            'addresses' => "array",
            'addresses.*' => "array",
            'addresses.*.id' => "numeric|exists:addresses,id",
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
            'contacts.*.id' => "numeric|exists:contacts,id",
            'contacts.*.type' => "required|string|in:".$contactTypes,
            'contacts.*.contact' => "required|string|min:3",
        ];
    }
}
