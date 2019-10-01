import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { NotAuthGuard } from './guards/notAuth-guard';
import { AdminGuard } from './guards/admin-guard';
import { CompanyGuard } from './guards/company-guard';
import { UserGuard } from './guards/user-guard';

// Components app import
import {ProfileComponent} from './components/user/profile/profile.component';
import {ListComponent} from './components/user/list/list.component';
import {ListCompanyComponent} from './components/company/list/listCompany.component';
import {CreateComponent} from './components/company/create/create.component';

const routes: Routes = [
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/:id', component: ProfileComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/user', component: ListComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/company', component: ListCompanyComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/company/new', component: CreateComponent, canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
