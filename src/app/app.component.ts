import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {ViewChild, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { LoginComponent } from './components/modals/login/login.component';
import { SignupComponent } from './components/modals/signup/signup.component';
import { ShareLoginService } from './services/shareLogin.service';
import { AuthService } from './services/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  logged: boolean;
  rol: string;
  mobileQuery: MediaQueryList;
  searchText: string;
  @ViewChild('snav', {static: false}) snav: MatSidenav;

  private MobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private router: Router,
              public dialog: MatDialog,
              public authService: AuthService,
              public shareLoginService: ShareLoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.MobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.MobileQueryListener);
  }

  ngOnInit(): void {
    const token: string = localStorage.getItem('token');
    // tslint:disable-next-line: triple-equals
    if (token != '') {
      this.shareLoginService.sendLogin(this.authService.isAuthenticated());
      this.shareLoginService.sendUser(this.authService.getRol());
    }
    this.shareLoginService.loggedSource.subscribe(logged => {
      this.logged = this.authService.isAuthenticated();
    });
    this.shareLoginService.rolSource.subscribe(rol => {
      this.rol = rol;
    });
  }

  logout() {
    localStorage.clear();
    this.shareLoginService.sendLogin(false);
    this.shareLoginService.sendUser('');
    this.snav.close();
    this.router.navigate(['/']);
  }

  login() {
    const dialogRef = this.dialog.open( LoginComponent,
      {
          panelClass: 'modalLogin'
      });

    dialogRef.afterClosed()
      .subscribe( result => {
          console.log(result);
      });
  }

  signup() {
    const dialogRef = this.dialog.open( SignupComponent,
      {
          panelClass: 'modalSignup'
      });

    dialogRef.afterClosed()
      .subscribe( result => {
          console.log(result);
      });
  }

  search() {
    // this.router.navigate(['search'], { queryParams: { q: this.searchText } });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.MobileQueryListener);
  }
}
