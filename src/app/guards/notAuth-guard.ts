import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
      if (this.auth.isAuthenticated()) {
        this.router.navigate(['user/profile']);
        console.log('pagina solo para personas no autenticadas');
        return false;
      } else { return true; }
  }
}
