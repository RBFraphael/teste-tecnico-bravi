import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { IconDefinition, faEye, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '../../interfaces/iuser';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

    users: IUser[] = [];
    isLoading: boolean = false;

    addUserIcon: IconDefinition = faPlus;
    viewUserIcon: IconDefinition = faEye;
    editUserIcon: IconDefinition = faPencil;
    deleteUserIcon: IconDefinition = faTrash;

    constructor(
        private usersService: UsersService
    ){ 
        this.loadUsers();
    }

    loadUsers = () => {
        this.isLoading = true;

        this.usersService.list().subscribe({
            next: (data) => {
                this.users = data as IUser[];
                this.isLoading = false;
            },
            error: (error) => {
                console.log(error);
                this.isLoading = false;
            }
        });
    };

    deleteUser = (user: IUser) => {
        Swal.fire({
            icon: "question",
            title: "Tem certeza?",
            text: `Tem certeza que deseja excluir o usuário ${user.name}?`,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Não",
            confirmButtonText: "Sim"
        }).then((res) => {
            if(res.isConfirmed){
                this.usersService.delete(user.id!).subscribe({
                    next: (data) => {
                        Swal.fire({
                            icon: "success",
                            title: "Sucesso",
                            text: `O usuário ${user.name} foi excluído com sucesso.`,
                        }).then(() => {
                            this.loadUsers();
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
