import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IPerson } from '../interfaces/iperson';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

    url = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    list = (query: string = "") => {
        return this.http.get(`${this.url}/people${ query.length ? `?${query}` : "" }`);
    };

    new = (person: IPerson) => {
        return this.http.post(`${this.url}/people`, person);
    };

    get = (personId: number, query: string = "") => {
        return this.http.get(`${this.url}/people/${personId}${ query.length ? `?${query}` : "" }`);
    };

    update = (personId: number, person: IPerson) => {
        return this.http.put(`${this.url}/people/${personId}`, person);
    };

    delete = (personId: number) => {
        return this.http.delete(`${this.url}/people/${personId}`);
    };
}
