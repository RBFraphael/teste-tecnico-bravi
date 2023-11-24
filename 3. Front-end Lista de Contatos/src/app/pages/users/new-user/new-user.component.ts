import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconDefinition, faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../interfaces/iuser';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent {
    form: FormGroup;
    isSubmitting: boolean = false;

    saveIcon: IconDefinition = faSave;

    constructor(
        private usersService: UsersService,
        private router: Router
    ){
        this.form = new FormGroup({
            name: new FormControl("", Validators.required),
            email: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required),
        });
    }

    submit = () => {
        let data: IUser = this.form.value;

        if(this.form.valid){
            this.isSubmitting = true;

            this.usersService.new(data).subscribe({
                next: (data) => {
                    this.isSubmitting = false;
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso",
                        text: "Usuário cadastrado com sucesso na base de dados."
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
                        text: "Ocorreu um erro durante o cadastro do usuário. Por favor, tente novamente."
                    });
                }
            });
        }
    }
}
