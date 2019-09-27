import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserController } from '../../../controllers/user.controller';
import { ShareLoginService } from '../../../services/shareLogin.service';
import { User } from 'src/app/models/user';
import { AuthService } from '../../../services/auth.service';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  constructor(private httpClient: HttpClient,
              private router: Router,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<LoginComponent>,
              public controller: UserController,
              public shareLoginService: ShareLoginService,
              public notificacionSnackBar: MatSnackBar,
              public authService: AuthService,
              @Inject( MAT_DIALOG_DATA ) public data: any) { }

  ngOnInit() {
  }

  async login() {
    this.controller.login(this.user).subscribe(res => {
      const r: any = res;
      const user: User = res;
      this.showMessage('Login exitoso.', 2000);
      this.dialogRef.close(user);
      localStorage.setItem('token', r.token);
      const rol: string = this.authService.getRol();
      this.shareLoginService.sendLogin(true);
      this.shareLoginService.sendUser(rol);
      this.router.navigate(['user/profile']);
    }, error => {
      if (error.error.errors) {
        error.error.errors.forEach(err => {
          this.showMessage(err.message, 5000);
        });
      } else {
        this.showMessage(error.error.message, 5000);
      }
    });
  }

  showMessage(message: string, duration: number) {
    this.notificacionSnackBar.open( message, '', {
      duration,
    } );
  }
}
