import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { User } from 'src/app/models/user';
import { UserController } from '../../../controllers/user.controller';
import { UploadService } from '../../../services/upload.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  date = new FormControl();
  idUser: string = null;
  sexs = [
    {name: 'Hombre', value: 'male'},
    {name: 'Mujer', value: 'female'}
  ];
  @ViewChild('inputFile', {static: false}) myDiv: ElementRef;

  // tslint:disable-next-line:max-line-length
  imageUrl = 'https://images.vexels.com/media/users/3/137047/isolated/preview/5831a17a290077c646a48c4db78a81bb-perfil-de-usuario-blue-icon-by-vexels.png';
  mode = 'determinate';
  constructor(private controller: UserController,
              private uploadService: UploadService,
              private route: ActivatedRoute,
              public notificacionSnackBar: MatSnackBar) {
    this.user = new User();
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.idUser = params.id;
        if (this.idUser) {
          this.controller.publicUser(this.idUser).subscribe(user => {
            this.user = user;
            this.user.password = '';
            this.user.sex = this.user.sex ? this.user.sex : 'male';
            this.date = new FormControl(this.user.birthdate);
            this.imageUrl = this.user.imageUrl ? this.user.imageUrl : this.imageUrl;
          });
        } else {
          this.controller.getInfo().subscribe(user => {
            this.user = user;
            this.user.password = '';
            this.user.sex = this.user.sex ? this.user.sex : 'male';
            this.date = new FormControl(this.user.birthdate);
            this.imageUrl = this.user.imageUrl ? this.user.imageUrl : this.imageUrl;
          });
        }
      }
    );
  }

  save() {
    if (this.idUser) {
      this.controller.editUser(this.user).subscribe(userUpdated => {
        this.showMessage('Usuario editado exitosamente.', 3000);
      }, error => this.showMessage(error.message, 3000));
    } else {
      this.controller.editar(this.user).subscribe(userUpdated => {
        this.showMessage('Usuario editado exitosamente.', 3000);
      }, error => this.showMessage(error.message, 3000));
    }
  }

  openFile() {
    const el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    el.click();
  }

  selectDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.user.birthdate = event.value;
  }

  onChangeFile(fileInput) {
    if (fileInput.target.files.length) {
      const file = fileInput.target.files[0];
      if (this.validateImage(file)) {
        this.uploadService.upload(this.user._id, file).subscribe(res => {
          const response: any = res;
          this.imageUrl = response.imageUrl;
        });
      } else {
        this.showMessage('archivo no valido', 3000);
      }
    } else {
      this.showMessage('sin archivos', 3000);
    }
  }

  validateImage(file) {
    const type = file.type;
    const allowedExtensions = /.(gif|jpe?g|png)$/i;
    return allowedExtensions.exec(type);
  }

  showMessage(message: string, duration: number) {
    this.notificacionSnackBar.open( message, '', {
      duration,
    } );
  }
}
