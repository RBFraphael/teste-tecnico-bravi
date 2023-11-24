import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILoginCredentials } from '../interfaces/ilogincredentials';
import { ILoginResponse } from '../interfaces/iloginresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    url = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    login = (data: ILoginCredentials) => {
        return this.http.post(`${this.url}/auth/login`, data);
    };

    logout = () => {
        return this.http.post(`${this.url}/auth/logout`, {});
    };

    refreshToken = () => {
        return this.http.post(`${this.url}/auth/refresh`, {});
    };

    setLoggedInUser = (data: ILoginResponse) => {
        sessionStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("username", data.user.name);
    };
}
