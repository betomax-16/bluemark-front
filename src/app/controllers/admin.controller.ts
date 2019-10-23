import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Admin} from '../models/admin';
import { isPlatformBrowser } from '@angular/common';


@Injectable()
export class AdminController {
    admins: Admin[];
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

    getAdmins() {
        this.newHeader();
        return this.http.get<Admin[]>(this.baseUrl + `/api/admins`, {headers: this.headers});
    }

    getAdmin(id: string) {
        this.newHeader();
        return this.http.get<Admin>(this.baseUrl + `/api/admins/${id}`, {headers: this.headers});
    }

    createAdmin(admin: Admin) {
        return this.http.post<Admin>(this.baseUrl + '/api/admins', admin);
    }

    editAdmin(admin: Admin) {
        this.newHeader();
        return this.http.put<Admin>(this.baseUrl + `/api/admins/${admin._id}`, admin, {headers: this.headers});
    }

    deleteAdmin(id: string) {
        this.newHeader();
        return this.http.delete(this.baseUrl + `/api/admins/${id}`, {headers: this.headers});
    }
}
