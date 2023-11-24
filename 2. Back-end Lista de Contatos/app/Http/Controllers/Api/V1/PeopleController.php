<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePersonRequest;
use App\Http\Requests\UpdatePersonRequest;
use App\Models\Address;
use App\Models\Contact;
use App\Models\Person;
use App\Models\PersonAddress;
use App\Models\PersonContact;
use App\Repositories\PeopleRepository;
use Illuminate\Database\Eloquent\Model;

class PeopleController extends Controller
{
    protected Model $model;

    public function __construct(Person $model)
    {
        $this->model = $model;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $repository = new PeopleRepository($this->model);

        if($filter = request("filter")){ $repository->filter($filter); }
        if($search = request("search")){ $repository->search($search); }
        if($with = request("with")){ $repository->related($with); }

        $people = $repository->get();

        return $people;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePersonRequest $request)
    {
        $person = Person::create(request([
            "first_name", "last_name", "document", "birthdate", "gender"
        ]));

        $addresses = request("addresses", []);
        foreach($addresses as $address){
            $newAddress = Address::create([
                'address' => $address['address'],
                'complement' => isset($address['complement']) ? $address['complement'] : "",
                'number' => $address['number'],
                'neighborhood' => $address['neighborhood'],
                'city' => $address['city'],
                'state' => $address['state'],
                'country' => $address['country'],
                'postal_code' => $address['postal_code'],
            ]);

            PersonAddress::create([
                'person_id' => $person->id,
                'address_id' => $newAddress->id
            ]);
        }

        $contacts = request("contacts", []);
        foreach($contacts as $contact){
            $newContact = Contact::create([
                'type' => $contact['type'],
                'contact' => $contact['contact'],
            ]);

            PersonContact::create([
                'person_id' => $person->id,
                'contact_id' => $newContact->id
            ]);
        }

        $person->load(["addresses", "contacts"]);

        return $person;
    }

    /**
     * Display the specified resource.
     */
    public function show(Person $person)
    {
        if($with = request("with")){
            $person->load(explode(",", $with));
        }

        return $person;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePersonRequest $request, Person $person)
    {
        $person->update(request([
            "first_name", "last_name", "document", "birthdate", "gender"
        ]));

        $addresses = request("addresses", null);
        if($addresses !== null){
            $addressesIds = [];
            foreach($addresses as $address){
                if(isset($address['id'])){
                    $addressesIds[] = $address['id'];

                    Address::where("id", $address['id'])->update([
                        'address' => $address['address'],
                        'complement' => isset($address['complement']) ? $address['complement'] : "",
                        'number' => $address['number'],
                        'neighborhood' => $address['neighborhood'],
                        'city' => $address['city'],
                        'state' => $address['state'],
                        'country' => $address['country'],
                        'postal_code' => $address['postal_code'],
                    ]);
                } else {
                    $newAddress = Address::create([
                        'address' => $address['address'],
                        'complement' => isset($address['complement']) ? $address['complement'] : "",
                        'number' => $address['number'],
                        'neighborhood' => $address['neighborhood'],
                        'city' => $address['city'],
                        'state' => $address['state'],
                        'country' => $address['country'],
                        'postal_code' => $address['postal_code'],
                    ]);

                    PersonAddress::create([
                        'person_id' => $person->id,
                        'address_id' => $newAddress->id
                    ]);

                    $addressesIds[] = $newAddress->id;
                }
            }
            foreach($person->addresses as $personAddress){
                if(!in_array($personAddress->id, $addressesIds)){
                    $personAddress->delete();
                }
            }
        }

        $contacts = request("contacts", null);
        if($contacts !== null){
            $contactsIds = [];
            foreach($contacts as $contact){
                if(isset($contact['id'])){
                    $contactsIds[] = $contact['id'];

                    Contact::where("id", $contact['id'])->update([
                        'type' => $contact['type'],
                        'contact' => $contact['contact'],
                    ]);
                } else {
                    $newContact = Contact::create([
                        'type' => $contact['type'],
                        'contact' => $contact['contact'],
                    ]);

                    PersonContact::create([
                        'person_id' => $person->id,
                        'contact_id' => $newContact->id
                    ]);

                    $contactsIds[] = $newContact->id;
                }
            }
            foreach($person->contacts as $personContact){
                if(!in_array($personContact->id, $contactsIds)){
                    $personContact->delete();
                }
            }
        }

        $person->load(["addresses", "contacts"]);

        return $person;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Person $person)
    {
        $person->delete();

        return response()->json([
            'message' => __("Successfully deleted person")
        ], 204);
    }
}
