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

const routes: Routes = [
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'admin/user', component: ListComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'user/:id', component: ProfileComponent, canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
