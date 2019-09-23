import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
    private baseUrl: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.baseUrl = 'http://localhost:3000';
    }

    newHeader() {
        this.headers = new HttpHeaders();
        this.headers = this.headers
                            .set('Authorization', localStorage.getItem('token'));
    }

    upload(id: string, image: File) {
        this.newHeader();
        const uploadData = new FormData();
        const ext = image.name.split('.').pop();
        uploadData.append('photo', image, id + '.' + ext);
        uploadData.append('id', id);
        return this.http.post(this.baseUrl + '/api/imageprofile', uploadData, {headers: this.headers});
    }
}
