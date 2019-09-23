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

    login(usuario: User) {
        return this.http.post(this.baseUrl + '/api/login', usuario);
    }

    editar(usuario: User) {
        this.newHeader();
        return this.http.put<User>(this.baseUrl + '/api/profile', usuario, {headers: this.headers});
    }

    registrar(usuario: User) {
        return this.http.post(this.baseUrl + '/api/users', usuario);
    }


    getInfo() {
        this.newHeader();
        return this.http.post<User>(this.baseUrl + `/api/profile`, null, {headers: this.headers});
    }

    getUsers() {
        return this.http.get<User[]>(this.baseUrl + `/api/users`);
    }

    // Usuarios public
    publicUser(id) {
        return this.http.get<User>(this.baseUrl + `/api/users/${id}`);
    }

    editUser(usuario: User) {
        return this.http.put<User>(this.baseUrl + `/api/users/${usuario._id}`, usuario);
    }

    deleteUser(id) {
        return this.http.delete(this.baseUrl + `/api/users/${id}`);
    }
    // recoveryPass(usuario) {
    //     return this.http.put<User>(`/api/passrecovery`, usuario);
    // }
}
