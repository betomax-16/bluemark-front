import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';


@Injectable()
export class UserController {
    usuario: User[];
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {

    }

    newHeader() {
        this.headers = new HttpHeaders();
        this.headers = this.headers
                            .set('Content-Type', 'application/json; charset=utf-8')
                            .set('Authorization', localStorage.getItem('token'));
    }

    login(usuario) {
        return this.http.post('/api/login', usuario);
    }

    // editar(usuario) {
    //     this.newHeader();
    //     return this.http.put('/api/user', usuario, {headers: this.headers});
    // }

    // registrar(usuario) {
    //     return this.http.post('/api/signup', usuario);
    // }


    // getInfo() {
    //     this.newHeader();
    //     return this.http.get<User>(`/api/user`, {headers: this.headers});
    // }

    // // Usuarios public
    // publicUser(id) {
    //     return this.http.get<User>(`/api/user/${id}`);
    // }

    // recoveryPass(usuario) {
    //     return this.http.put<User>(`/api/passrecovery`, usuario);
    // }
}
