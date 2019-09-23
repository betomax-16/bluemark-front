import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { NotAuthGuard } from './guards/notAuth-guard';

// Components app import
import {ProfileComponent} from './components/user/profile/profile.component';
import {ListComponent} from './components/user/list/list.component';

const routes: Routes = [
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin/user', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
