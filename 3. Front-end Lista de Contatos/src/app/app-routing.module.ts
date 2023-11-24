import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PeopleComponent } from './pages/people/people.component';
import { UsersComponent } from './pages/users/users.component';
import { NewPersonComponent } from './pages/people/new-person/new-person.component';
import { EditPersonComponent } from './pages/people/edit-person/edit-person.component';
import { ViewPersonComponent } from './pages/people/view-person/view-person.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { ViewUserComponent } from './pages/users/view-user/view-user.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "login",
    },

    {
        path: "login",
        component: LoginComponent,
        canActivate: [authGuard]
    },

    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [authGuard]
    },

    {
        path: "people",
        component: PeopleComponent,
        canActivate: [authGuard]
    },
    {
        path: "people/new",
        component: NewPersonComponent,
        canActivate: [authGuard]
    },
    {
        path: "people/:person_id",
        component: ViewPersonComponent,
        canActivate: [authGuard]
    },
    {
        path: "people/:person_id/edit",
        component: EditPersonComponent,
        canActivate: [authGuard]
    },

    {
        path: "users",
        component: UsersComponent,
        canActivate: [authGuard]
    },
    {
        path: "users/new",
        component: NewUserComponent,
        canActivate: [authGuard]
    },
    {
        path: "users/:user_id",
        component: ViewUserComponent,
        canActivate: [authGuard]
    },
    {
        path: "users/:user_id/edit",
        component: EditUserComponent,
        canActivate: [authGuard]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
