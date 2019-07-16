import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterExternalComponent } from './register-external/register-external.component';
import { LoginExternalComponent } from './login/login-external/login-external.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthenticationService } from './shared/services/authentication.service';
import { LoginGuard } from './shared/guards/login.guard';
import {AuthGuard} from './shared/guards/auth.guard';
import { AdminExternalComponent } from './admin/admin-external/admin-external.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { CreateExternalComponent } from './admin/admin-external/create-external/create-external.component';
import { CreateUserComponent } from './admin/admin-user/create-user/create-user.component';
import { CreateUniversityComponent } from './admin/create-university/create-university.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login' , component: LoginComponent , canActivate: [LoginGuard] },
  { path: 'login-external', component: LoginExternalComponent, canActivate: [LoginGuard] },
  { path: 'register-external', component: RegisterExternalComponent , canActivate: [LoginGuard] },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent , canActivate: [AdminGuard] , 
      children :[ 
        { path:'external' , component:AdminExternalComponent , pathMatch:'full'},
        { path:'external_create', component:CreateExternalComponent , pathMatch:'full'},
        { path:'user' , component:AdminUserComponent , pathMatch:'full' },
        { path:'user_create' , component:CreateUserComponent , pathMatch:'full' },
        { path:'create_university' , component:CreateUniversityComponent , pathMatch:'full' }

      ] 
  },



  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
