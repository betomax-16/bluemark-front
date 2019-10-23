
import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';


@Injectable()
export class CredentialController {
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

    getRol(id: string) {
        this.newHeader();
        return this.http.post<any>(this.baseUrl + `/api/rol/${id}`, null, {headers: this.headers});
    }
}
