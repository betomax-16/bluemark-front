import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as jwt from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor() {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
        return !this.isTokenExpired(token);
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
      const token = localStorage.getItem('token');
      const payload: any = jwt(token);
      return payload.rol;
    } catch (e) {
      return null;
    }
  }
}
