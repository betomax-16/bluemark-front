import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Company } from 'src/app/models/company';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { CompanyController } from 'src/app/controllers/company.controller';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  myRol: string;
  company: Company;
  idUser: string = null;
  @ViewChild('inputFile', {static: false}) myDiv: ElementRef;

  // tslint:disable-next-line:max-line-length
  imageUrl = 'https://images.vexels.com/media/users/3/137047/isolated/preview/5831a17a290077c646a48c4db78a81bb-perfil-de-usuario-blue-icon-by-vexels.png';
  mode = 'determinate';
  constructor(private companyController: CompanyController,
              private uploadService: UploadService,
              private router: Router,
              private authService: AuthService,
              public notificacionSnackBar: MatSnackBar) {
    this.company = new Company();
  }

  ngOnInit() {
    this.myRol = this.authService.getRol();
  }

  save() {
    this.companyController.createCompany(this.company).subscribe(company => {
      this.showMessage('Empresa creada exitosamente.', 3000);
      this.router.navigate(['admin/company']);
    }, error => this.showMessage(error.message, 3000));
  }

  openFile() {
    const el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    el.click();
  }

  onChangeFile(fileInput) {
    if (fileInput.target.files.length) {
      const file = fileInput.target.files[0];
      if (this.validateImage(file)) {
        this.uploadService.upload(this.company._id, file).subscribe(res => {
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
