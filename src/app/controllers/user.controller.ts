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

    // editar(usuario) {
    //     this.newHeader();
    //     return this.http.put('/api/user', usuario, {headers: this.headers});
    // }

    registrar(usuario) {
        return this.http.post(this.baseUrl + '/api/users', usuario);
    }


    getInfo() {
        this.newHeader();
        return this.http.post<User>(this.baseUrl + `/api/profile`, null, {headers: this.headers});
    }

    // // Usuarios public
    // publicUser(id) {
    //     return this.http.get<User>(`/api/user/${id}`);
    // }

    // recoveryPass(usuario) {
    //     return this.http.put<User>(`/api/passrecovery`, usuario);
    // }
}
