import { Component, OnInit } from '@angular/core';
import { IPerson } from '../../../interfaces/iperson';
import { FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PeopleService } from '../../../services/people.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IconDefinition, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { IParam } from '../../../interfaces/iparam';
import { ParamsService } from '../../../services/params.service';
import { IAddress } from '../../../interfaces/iaddress';
import { IContact } from '../../../interfaces/icontact';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrl: './edit-person.component.scss'
})
export class EditPersonComponent implements OnInit{

    person!: IPerson;
    form: FormGroup;
    isSubmitting: boolean = false;

    addIcon: IconDefinition = faPlus;
    removeIcon: IconDefinition = faTrash;
    saveIcon: IconDefinition = faSave;

    states: IParam[] = [];
    genders: IParam[] = [];
    contactTypes: IParam[] = [];

    constructor(
        private peopleService: PeopleService,
        private paramsService: ParamsService,
        private router: Router,
        private route: ActivatedRoute
    ){
        this.states = this.paramsService.states();
        this.genders = this.paramsService.personGenders();
        this.contactTypes = this.paramsService.contactTypes();

        this.form = new FormGroup({
            first_name: new FormControl("", Validators.required),
            last_name: new FormControl("", Validators.required),
            document: new FormControl("", Validators.required),
            birthdate: new FormControl("", Validators.required),
            gender: new FormControl("", Validators.required),
            addresses: new FormArray([]),
            contacts: new FormArray([]),
        });
    }

    get addresses() {
        return this.form.get("addresses") as FormArray;
    }

    get contacts() {
        return this.form.get("contacts") as FormArray;
    }

    ngOnInit(): void {
        this.loadPerson();
    }

    loadPerson = () => {
        let personId = parseInt(this.route.snapshot.paramMap.get("person_id")!);

        this.peopleService.get(personId, "with=addresses,contacts").subscribe({
            next: (data) => {
                let personData = data as IPerson;
                this.person = personData;
                this.form.patchValue(personData);

                personData.addresses?.forEach((address: IAddress) => {
                    this.addresses.push(new FormGroup({
                        id: new FormControl(address.id, Validators.required),
                        address: new FormControl(address.address, Validators.required),
                        number: new FormControl(address.number, Validators.required),
                        complement: new FormControl(address.complement),
                        neighborhood: new FormControl(address.neighborhood, Validators.required),
                        city: new FormControl(address.city, Validators.required),
                        state: new FormControl(address.state, Validators.required),
                        country: new FormControl(address.country, Validators.required),
                        postal_code: new FormControl(address.postal_code, Validators.required)
                    }));
                });

                personData.contacts?.forEach((contact: IContact) => {
                    this.contacts.push(new FormGroup({
                        id: new FormControl(contact.id, Validators.required),
                        type: new FormControl(contact.type, Validators.required),
                        contact: new FormControl(contact.contact, Validators.required),
                    }));
                });
            },
            error: (error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Ocorreu um erro durante o carregamento dos dados da pessoa. Por favor, tente novamente."
                }).then(() => {
                    this.router.navigateByUrl("/people");
                });
            }
        })
    }

    addAddress = () => {
        this.addresses.push(new FormGroup({
            address: new FormControl("", Validators.required),
            number: new FormControl("", Validators.required),
            complement: new FormControl(""),
            neighborhood: new FormControl("", Validators.required),
            city: new FormControl("", Validators.required),
            state: new FormControl("", Validators.required),
            country: new FormControl("BR", Validators.required),
            postal_code: new FormControl("", Validators.required)
        }));
    }

    removeAddress = (index: number) => {
        this.addresses.removeAt(index);
    }

    addContact = () => {
        this.contacts.push(new FormGroup({
            type: new FormControl("", Validators.required),
            contact: new FormControl("", Validators.required),
        }));
    }

    removeContact = (index: number) => {
        this.contacts.removeAt(index);
    }

    submit = () => {
        let data: IPerson = this.form.value;

        if(this.form.valid){
            this.isSubmitting = true;

            this.peopleService.update(this.person.id!, data).subscribe({
                next: (data) => {
                    this.isSubmitting = false;
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso",
                        text: "Os dados da pessoa foram atualizados com sucesso na base de dados."
                    }).then(() => {
                        this.router.navigateByUrl("/people");
                    });
                },
                error: (error) => {
                    this.isSubmitting = false;
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Ocorreu um erro durante a atualização dos dados da pessoa. Por favor, tente novamente."
                    });
                }
            });
        }
    }

}
