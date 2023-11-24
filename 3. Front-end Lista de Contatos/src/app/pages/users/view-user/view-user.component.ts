import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../interfaces/iuser';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent implements OnInit {
    user!: IUser;

    constructor(
        private usersService: UsersService,
        private router: Router,
        private route: ActivatedRoute
    ){
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
}
