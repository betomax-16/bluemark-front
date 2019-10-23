import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { User } from '../../../models/user';
import { UserController } from '../../../controllers/user.controller';
import { ShareLoginService } from '../../../services/shareLogin.service';
import { FormControl } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isAdmin = false;
  date = new FormControl(new Date());
  user: User;

  constructor(public dialogRef: MatDialogRef<SignupComponent>,
              public shareLoginService: ShareLoginService,
              public controller: UserController,
              public notificacionSnackBar: MatSnackBar,
              private router: Router,
              @Inject( MAT_DIALOG_DATA, ) public data: any,
              @Inject(PLATFORM_ID) private platformId: any) {
                this.user = new User();
               }

  ngOnInit() {}

  save() {
    this.user.birthdate = this.date.value;
    if (!this.isAdmin) {
      this.controller.signup(this.user).subscribe(res => {
        const r: any = res;
        this.dialogRef.close(res);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', r.token);
        }
        this.shareLoginService.sendLogin(true);
        this.shareLoginService.sendUser(r.user);
        this.router.navigate(['user/profile']);
        this.showMessage('Registro exitoso.', 2000);
      }, error => {
        error.error.errors.forEach(err => {
          this.showMessage(err.message, 5000);
        });
      });
    } else {
      this.controller.registrar(this.user).subscribe(res => {
        this.dialogRef.close(res);
        this.showMessage('Registro exitoso.', 2000);
      }, error => {
        error.error.errors.forEach(err => {
          this.showMessage(err.message, 5000);
        });
      });
    }
  }

  showMessage(message: string, duration: number) {
    this.notificacionSnackBar.open( message, '', {
      duration,
    } );
  }
}
