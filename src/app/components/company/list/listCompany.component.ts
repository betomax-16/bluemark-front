import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyController } from 'src/app/controllers/company.controller';
import { MatSnackBar } from '@angular/material';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-listCompany',
  templateUrl: './listCompany.component.html',
  styleUrls: ['./listCompany.component.css']
})
export class ListCompanyComponent implements OnInit {

  companies: Company[];
  imageUrl: string;

  constructor(private router: Router,
              public controller: CompanyController,
              public notificacionSnackBar: MatSnackBar) {

  }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.imageUrl = 'https://images.vexels.com/media/users/3/137047/isolated/preview/5831a17a290077c646a48c4db78a81bb-perfil-de-usuario-blue-icon-by-vexels.png';
    this.controller.getCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }

  showCompany(company: Company) {
    this.router.navigate(['user/' + company._id]);
  }

  delete(company: Company) {
    if (confirm('¿Desea eliminar la compañia ' + company.name)) {
      this.controller.deleteCompany(company._id).subscribe(res => {
        // tslint:disable-next-line:no-shadowed-variable
        for (let index = 0; index < this.companies.length; index++) {
          if (this.companies[index]._id === company._id) {
            this.companies.splice(index, 1);
          }
        }
        this.showMessage('Compañia eliminada exitosamente.', 3000);
      });
    }
  }

  newCompany() {
    this.router.navigate(['admin/company/new']);
  }

  showMessage(message: string, duration: number) {
    this.notificacionSnackBar.open( message, '', {
      duration,
    } );
  }

}
