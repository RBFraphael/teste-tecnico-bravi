import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    url = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    list = () => {
        return this.http.get(`${this.url}/users`);
    };

    new = (user: IUser) => {
        return this.http.post(`${this.url}/users`, user);
    };

    get = (userId: number) => {
        return this.http.get(`${this.url}/users/${userId}`);
    };

    update = (userId: number, user: IUser) => {
        return this.http.put(`${this.url}/users/${userId}`, user);
    };

    delete = (userId: number) => {
        return this.http.delete(`${this.url}/users/${userId}`);
    };
}
