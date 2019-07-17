import { LoginGuard } from './shared/guards/login.guard';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginExternalComponent } from './login/login-external/login-external.component';
import { RegisterExternalComponent } from './register-external/register-external.component';
import { AlertComponent } from './alert/alert.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminExternalComponent } from './admin/admin-external/admin-external.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { CreateExternalComponent } from './admin/admin-external/create-external/create-external.component';
import { CreateUserComponent } from './admin/admin-user/create-user/create-user.component';
import { CreateUniversityComponent } from './admin/create-university/create-university.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AdminUniversityComponent } from './admin/admin-university/admin-university.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginExternalComponent,
    RegisterExternalComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    AdminComponent,
    AdminExternalComponent,
    AdminUserComponent,
    CreateExternalComponent,
    CreateUserComponent,
    CreateUniversityComponent,
    SidenavComponent,
    AdminUniversityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } ,
               {provide:HTTP_INTERCEPTORS, useClass:HttpErrorInterceptor,multi:true}
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
