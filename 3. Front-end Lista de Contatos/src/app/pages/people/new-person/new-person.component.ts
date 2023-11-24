import { Component } from '@angular/core';
import { IPerson } from '../../../interfaces/iperson';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PeopleService } from '../../../services/people.service';
import { Router } from '@angular/router';
import { IconDefinition, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { IParam } from '../../../interfaces/iparam';
import { ParamsService } from '../../../services/params.service';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrl: './new-person.component.scss'
})
export class NewPersonComponent {

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
        private router: Router
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

            this.peopleService.new(data).subscribe({
                next: (data) => {
                    this.isSubmitting = false;
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso",
                        text: "Pessoa cadastrada com sucesso na base de dados."
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
                        text: "Ocorreu um erro durante o cadastro da pessoa. Por favor, tente novamente."
                    });
                }
            });
        } else {
            let controls = this.form.controls;
            for(let control in controls){
                if(controls[control].invalid){
                    console.log(`${control} is INVALID`);
                }
            }

            this.addresses.controls.forEach((address, i) => {
                let controls = (address as FormGroup).controls;
                for(let control in controls){
                    if(controls[control].invalid){
                        console.log(`address[${i}] ${control} is INVALID`);
                    }
                }
            });

            this.contacts.controls.forEach((address, i) => {
                let controls = (address as FormGroup).controls;
                for(let control in controls){
                    if(controls[control].invalid){
                        console.log(`address[${i}] ${control} is INVALID`);
                    }
                }
            });
        }
    }

}
