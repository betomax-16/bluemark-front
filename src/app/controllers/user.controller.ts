import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';


@Injectable()
export class UserController {
    usuario: User[];
    private headers: HttpHeaders;
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = 'http://localhost:3000';
    }

    newHeader() {
        this.headers = new HttpHeaders();
        this.headers = this.headers
                            .set('Content-Type', 'application/json; charset=utf-8')
                            .set('Authorization', localStorage.getItem('token'));
    }

    signup(usuario: User) {
        return this.http.post(this.baseUrl + '/api/signup', usuario);
    }

    login(usuario: User) {
        return this.http.post(this.baseUrl + '/api/login', usuario);
    }

    editar(usuario: User) {
        this.newHeader();
        return this.http.put<User>(this.baseUrl + '/api/profile', usuario, {headers: this.headers});
    }

    registrar(usuario: User) {
        return this.http.post<User>(this.baseUrl + '/api/users', usuario);
    }


    getInfo() {
        this.newHeader();
        return this.http.post<User>(this.baseUrl + `/api/profile`, null, {headers: this.headers});
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

    editUser(usuario: User) {
        this.newHeader();
        return this.http.put<User>(this.baseUrl + `/api/users/${usuario._id}`, usuario, {headers: this.headers});
    }

    deleteUser(id) {
        this.newHeader();
        return this.http.delete(this.baseUrl + `/api/users/${id}`, {headers: this.headers});
    }
    // recoveryPass(usuario) {
    //     return this.http.put<User>(`/api/passrecovery`, usuario);
    // }
}
