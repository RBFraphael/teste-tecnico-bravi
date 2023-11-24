import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILoginCredentials } from '../../interfaces/ilogincredentials';
import { AuthService } from '../../services/auth.service';
import { ILoginResponse } from '../../interfaces/iloginresponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    isLoggingIn: boolean = false;
    isLoginError: boolean = false;
    loginError: string = "";

    form: FormGroup;

    constructor(
        private service: AuthService,
        private router: Router
    ) {
        this.form = new FormGroup({
            email: new FormControl("admin@bravi.com.br", [Validators.required, Validators.email]),
            password: new FormControl("Abcd1234", Validators.required),
        });
    }

    submit = (): void => {
        let data: ILoginCredentials = this.form.value;

        if(this.form.valid){
            this.isLoggingIn = true;

            this.service.login(data).subscribe({
                next: (data) => {
                    let loginData = data as ILoginResponse;
                    this.service.setLoggedInUser(loginData);
                    this.router.navigateByUrl("/dashboard");
                    this.isLoggingIn = false;
                },
                error: (error) => {
                    this.isLoggingIn = false;
                    this.loginError = "Endereço de e-mail e/ou senha inválido(s)";
                    this.isLoginError = true;
                }
            });
        }
    }
}
