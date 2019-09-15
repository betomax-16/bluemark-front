import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {ViewChild, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { LoginComponent } from './components/modals/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  logged: boolean;
  mobileQuery: MediaQueryList;
  searchText: string;
  @ViewChild('snav', {static: false}) snav: MatSidenav;

  private MobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.MobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.MobileQueryListener);
    this.logged = true;
  }

  logout() {
    this.snav.close();
    this.logged = false;
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

  }

  search() {
    // this.router.navigate(['search'], { queryParams: { q: this.searchText } });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.MobileQueryListener);
  }
}
