import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import { isPlatformBrowser } from '@angular/common';


@Injectable()
export class UserController {
    usuario: User[];
    private headers: HttpHeaders;
    private baseUrl: string;

    constructor(private http: HttpClient,
                @Inject(PLATFORM_ID) private platformId: any) {
        this.baseUrl = 'https://bluemark.azurewebsites.net';
    }

    newHeader() {
        if (isPlatformBrowser(this.platformId)) {
            this.headers = new HttpHeaders();
            this.headers = this.headers
                                .set('Content-Type', 'application/json; charset=utf-8')
                                .set('Authorization', localStorage.getItem('token'));
        }
    }

    signup(usuario: User) {
        return this.http.post(this.baseUrl + '/api/signup', usuario);
    }

    login(usuario: User) {
        return this.http.post(this.baseUrl + '/api/login', usuario);
    }

    editar(usuario: any) {
        this.newHeader();
        return this.http.put(this.baseUrl + '/api/profile', usuario, {headers: this.headers});
    }

    registrar(usuario: User) {
        return this.http.post<User>(this.baseUrl + '/api/users', usuario);
    }

    getInfo() {
        this.newHeader();
        return this.http.post(this.baseUrl + `/api/profile`, null, {headers: this.headers});
    }

    getUsers() {
        this.newHeader();
        return this.http.get<User[]>(this.baseUrl + `/api/users`, {headers: this.headers});
    }

    // Usuarios public
    publicUser(id) {
        this.newHeader();
        return this.http.get<User>(this.baseUrl + `/api/users/${id}`, {headers: this.headers});
    }

    editUser(usuario: any) {
        this.newHeader();
        return this.http.put<any>(this.baseUrl + `/api/users/${usuario._id}`, usuario, {headers: this.headers});
    }

    deleteUser(id) {
        this.newHeader();
        return this.http.delete(this.baseUrl + `/api/users/${id}`, {headers: this.headers});
    }
    // recoveryPass(usuario) {
    //     return this.http.put<User>(`/api/passrecovery`, usuario);
    // }
}
