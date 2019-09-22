import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { NotAuthGuard } from './guards/notAuth-guard';

// Components app import
import {ProfileComponent} from './components/user/profile/profile.component';

const routes: Routes = [
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
