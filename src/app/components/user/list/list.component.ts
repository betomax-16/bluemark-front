import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UserController } from '../../../controllers/user.controller';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { SignupComponent } from '../../modals/signup/signup.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[];
  imageUrl: string;

  constructor(private router: Router,
              public controller: UserController,
              public notificacionSnackBar: MatSnackBar,
              public dialog: MatDialog) {

  }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.imageUrl = 'https://images.vexels.com/media/users/3/137047/isolated/preview/5831a17a290077c646a48c4db78a81bb-perfil-de-usuario-blue-icon-by-vexels.png';
    this.controller.getUsers().subscribe(users => {
      this.controller.getInfo().subscribe(user => {
        const me: User = user;
        this.users = users;
        // tslint:disable-next-line:no-shadowed-variable
        for (let index = 0; index < this.users.length; index++) {
          if (this.users[index]._id === me._id) {
            this.users.splice(index, 1);
          }
        }
      });
    });
  }

  showUser(user: User) {
    this.router.navigate(['user/' + user._id]);
  }

  delete(user: User) {
    if (confirm('¿Desea eliminar al usaurio ' + user.name)) {
      this.controller.deleteUser(user._id).subscribe(res => {
        // tslint:disable-next-line:no-shadowed-variable
        for (let index = 0; index < this.users.length; index++) {
          if (this.users[index]._id === user._id) {
            this.users.splice(index, 1);
          }
        }
        this.showMessage('Usuario eliminado exitosamente.', 3000);
      });
    }
  }

  signup() {
    const dialogRef = this.dialog.open( SignupComponent,
      {
          panelClass: 'modalSignup'
      });

    dialogRef.componentInstance.isAdmin = true;

    dialogRef.afterClosed()
      .subscribe( result => {
        if (result) {
          this.users.push(result);
        }
      });
  }

  showMessage(message: string, duration: number) {
    this.notificacionSnackBar.open( message, '', {
      duration,
    } );
  }
}
