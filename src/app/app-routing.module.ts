import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components app import
import {LoginComponent} from './components/modals/login/login.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
