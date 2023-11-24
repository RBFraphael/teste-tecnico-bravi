import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminPanelComponent } from './layouts/admin-panel/admin-panel.component';
import { apiInterceptor } from './interceptors/api.interceptor';
import { PeopleComponent } from './pages/people/people.component';
import { UsersComponent } from './pages/users/users.component';
import { NewPersonComponent } from './pages/people/new-person/new-person.component';
import { EditPersonComponent } from './pages/people/edit-person/edit-person.component';
import { ViewPersonComponent } from './pages/people/view-person/view-person.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { ViewUserComponent } from './pages/users/view-user/view-user.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdminPanelComponent,
    PeopleComponent,
    UsersComponent,
    NewPersonComponent,
    EditPersonComponent,
    ViewPersonComponent,
    NewUserComponent,
    ViewUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    provideHttpClient(
        withInterceptors([
            apiInterceptor 
        ])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
