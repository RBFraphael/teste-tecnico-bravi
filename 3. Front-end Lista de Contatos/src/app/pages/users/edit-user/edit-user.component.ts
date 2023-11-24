import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition, faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../interfaces/iuser';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit{
    user!: IUser;
    form: FormGroup;
    isSubmitting: boolean = false;

    saveIcon: IconDefinition = faSave;

    constructor(
        private usersService: UsersService,
        private router: Router,
        private route: ActivatedRoute
    ){
        this.form = new FormGroup({
            name: new FormControl("", Validators.required),
            email: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required),
        });
    }

    ngOnInit(): void {
        this.loadUser();
    }

    loadUser = () => {
        let userId = parseInt(this.route.snapshot.paramMap.get("user_id")!);

        this.usersService.get(userId).subscribe({
            next: (data) => {
                let userData = data as IUser;
                this.user = userData;
                this.form.patchValue(userData);
            },
            error: (error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Ocorreu um erro durante o carregamento dos dados do usuário. Por favor, tente novamente."
                }).then(() => {
                    this.router.navigateByUrl("/users");
                });
            }
        })
    }

    submit = () => {
        let data: IUser = this.form.value;

        if(this.form.valid){
            this.isSubmitting = true;

            this.usersService.update(this.user.id!, data).subscribe({
                next: (data) => {
                    this.isSubmitting = false;
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso",
                        text: "Os dados do usuário foram atualizados com sucesso na base de dados."
                    }).then(() => {
                        this.router.navigateByUrl("/users");
                    });
                },
                error: (error) => {
                    this.isSubmitting = false;
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Ocorreu um erro durante a atualização dos dados do usuário. Por favor, tente novamente."
                    });
                }
            });
        }
    }
}
