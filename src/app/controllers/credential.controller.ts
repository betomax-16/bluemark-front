
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';


@Injectable()
export class CredentialController {
    private headers: HttpHeaders;
    private baseUrl: string;

    constructor(private http: HttpClient) {
        // this.baseUrl = 'https://bluemark.azurewebsites.net';
        this.baseUrl = 'http://localhost:3000';
    }

    newHeader() {
        this.headers = new HttpHeaders();
        this.headers = this.headers
                            .set('Content-Type', 'application/json; charset=utf-8')
                            .set('Authorization', localStorage.getItem('token'));
    }

    getRol(id: string) {
        this.newHeader();
        return this.http.post<any>(this.baseUrl + `/api/rol/${id}`, null, {headers: this.headers});
    }
}
