import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserGuard implements CanActivate {

    constructor( public auth: AuthService, public router: Router) {

    }

    canActivate(): boolean {
        const rol: string = this.auth.getRol();
        // tslint:disable-next-line: triple-equals
        if (this.auth.isAuthenticated() && (rol == 'ADMIN' || rol == 'COMPANY' || rol == 'USER')) {
            return true;
        } else {
            this.router.navigate( [ '/' ] );
            return false;
        }
    }
}
