import { Component, OnInit } from '@angular/core';
import { IPerson } from '../../../interfaces/iperson';
import { PeopleService } from '../../../services/people.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
  styleUrl: './view-person.component.scss'
})
export class ViewPersonComponent implements OnInit {
    person!: IPerson;

    constructor(
        private peopleService: PeopleService,
        private router: Router,
        private route: ActivatedRoute
    ){
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
}
