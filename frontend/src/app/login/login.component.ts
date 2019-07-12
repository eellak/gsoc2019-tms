import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import Auth from 'auth0-sso-login';
import {Router, ActivatedRoute } from '@angular/router' ;

import { AuthenticationService } from './../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    auth: Auth
    result
    constructor(private router: Router,  
      private route: ActivatedRoute,
      private http: HttpClient,
      private authenticationService: AuthenticationService,
    ) { }

    ngOnInit() {

    }

    login_sso() {
      this.http.post(environment.apiUrl+'/SSO/login/callback2',{ } )
      .subscribe(user => {
          console.log(user)
    })
  }

    login_external() {
        this.router.navigate(['/login-external']);
    }

}
