import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { IPerson } from '../../interfaces/iperson';
import Swal from 'sweetalert2';
import { IconDefinition, faEye, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent implements OnInit {

    people: IPerson[] = [];
    isLoading: boolean = false;

    addPersonIcon: IconDefinition = faPlus;
    viewPersonIcon: IconDefinition = faEye;
    editPersonIcon: IconDefinition = faPencil;
    deletePersonIcon: IconDefinition = faTrash;

    constructor(
        private peopleService: PeopleService
    ){ 
        this.loadPersons();
    }

    ngOnInit = () => {
        
    }

    loadPersons = () => {
        this.isLoading = true;

        this.peopleService.list("with=addresses,contacts").subscribe({
            next: (data) => {
                this.people = data as IPerson[];
                this.isLoading = false;
            },
            error: (error) => {
                console.log(error);
                this.isLoading = false;
            }
        });
    };

    deletePerson = (person: IPerson) => {
        Swal.fire({
            icon: "question",
            title: "Tem certeza?",
            text: `Tem certeza que deseja excluir a pessoa ${person.first_name} ${person.last_name}?`,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Não",
            confirmButtonText: "Sim"
        }).then((res) => {
            if(res.isConfirmed){
                this.peopleService.delete(person.id!).subscribe({
                    next: (data) => {
                        Swal.fire({
                            icon: "success",
                            title: "Sucesso",
                            text: `A pessoa ${person.first_name} ${person.last_name} foi excluída com sucesso.`,
                        }).then(() => {
                            this.loadPersons();
                        })
                    },
                    error: (error) => {
                        console.log(error);
                        this.isLoading = false;
                    }
                });
            }
        });
    };
}
