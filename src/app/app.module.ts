import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/modals/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

// Providers
import { ShareLoginService } from './services/shareLogin.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { UploadService } from './services/upload.service';
import { AuthGuard } from './guards/auth-guard';
import { NotAuthGuard } from './guards/notAuth-guard';
import { AdminGuard } from './guards/admin-guard';
import { CompanyGuard } from './guards/company-guard';
import { UserGuard } from './guards/user-guard';

// Controllers
import { UserController } from './controllers/user.controller';
import { SignupComponent } from './components/modals/signup/signup.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ListComponent } from './components/user/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    ShareLoginService,
    TokenService,
    AuthService,
    UploadService,
    AuthGuard,
    NotAuthGuard,
    AdminGuard,
    CompanyGuard,
    UserGuard,
    UserController
  ],
  entryComponents: [
    LoginComponent,
    SignupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
