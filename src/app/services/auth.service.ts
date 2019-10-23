import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import * as moment from 'moment';
import * as jwt from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  public isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
          return !this.isTokenExpired(token);
      }
    }
    return false;
  }

  public isTokenExpired(token: string): boolean {
    try {
        const payload: any = jwt(token);
        return payload.exp <= moment().unix();
      } catch (e) {
        return false;
      }
  }

  public getRol(): string | null {
    try {
      if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('token');
        const payload: any = jwt(token);
        return payload.rol;
      }
    } catch (e) {
      return null;
    }
  }
}
