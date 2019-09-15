import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    constructor() { }

    decodeToken() {
        const token = localStorage.getItem('token');
        if (token) {
            return jwt_decode(token);
        } else {
            return null;
        }
    }
}
