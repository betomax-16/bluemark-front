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
import { NgxQRCodeModule } from 'ngx-qrcode2';

// Controllers
import { UserController } from './controllers/user.controller';
import { CredentialController } from './controllers/credential.controller';
import { CompanyController } from './controllers/company.controller';
import { AdminController } from './controllers/admin.controller';
import { PromotionController } from './controllers/promotion.controller';
import { CouponController } from './controllers/coupon.controller';
import { SignupComponent } from './components/modals/signup/signup.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ListComponent } from './components/user/list/list.component';
import { ListCompanyComponent } from './components/company/list/listCompany.component';
import { CreateComponent } from './components/company/create/create.component';
import { PromotionsListComponent } from './components/promotion/promotions-list/promotions-list.component';
import { PromotionRegisterComponent } from './components/promotion/promotion-register/promotion-register.component';
import { CouponListComponent } from './components/coupon/coupon-list/coupon-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ListComponent,
    ListCompanyComponent,
    CreateComponent,
    PromotionsListComponent,
    PromotionRegisterComponent,
    CouponListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgxQRCodeModule
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
    UserController,
    CredentialController,
    CompanyController,
    AdminController,
    PromotionController,
    CouponController
  ],
  entryComponents: [
    LoginComponent,
    SignupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
