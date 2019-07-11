
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterExternalComponent } from './register-external/register-external.component';
import { LoginExternalComponent } from './login/login-external/login-external.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login' , component: LoginComponent},
  { path: 'login-external', component: LoginExternalComponent },
  { path: 'register-external', component: RegisterExternalComponent },
  { path: 'profile', component: ProfileComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
