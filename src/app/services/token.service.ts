import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    constructor(@Inject(PLATFORM_ID) private platformId: any) { }

    decodeToken() {
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('token');
            if (token) {
                return jwt_decode(token);
            } else {
                return null;
            }
        }
    }
}
