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

    constructor(private router: Router,  
      private route: ActivatedRoute,
      private http: HttpClient,
      private authenticationService: AuthenticationService,
    ) { }

    ngOnInit() {

    }

   async login_sso_config() {
      let config = environment.config;
      console.log(config);
      let auth = new Auth(config);
      let defaultConfiguration = {
        enabledHostedLogin: true,  // if Auth0's SSO fails, use the hosted login screen
        forceTokenRefresh: false, // force refresh even if there is a valid token available
        redirectUri: window.location.href // specify an override
      };
      try {
        let result = await auth.ensureLoggedIn(defaultConfiguration)
        let token= auth.getIdToken();
        console.log(token);
        localStorage.setItem('token', token);
        console.log('user is logged in, if a previous redirect was saved direct the user to the redirect location');
        // The redirect saved in the configuration passed in will not be correct, as it was generated in "this" session instead of the session which created the correct redirect.
        if (result.redirectUri) {
          window.location.replace(result.redirectUri);
          
        }
      } catch (error) {
          console.error('an unexpected error occurred while logging in');
          // perform application specific steps to handle this situation
          // this should happen only rarely, since the user will either
          // be logged in automatically through Auth0's SSO feature, or
          // the Universal Hosted Login page, and only succeed after the
          // user successfully logged in.  In the case of the redirect,
          // the redirectUri will be loaded
      };
    }

    

    login_external() {
        this.router.navigate(['/login-external']);
    }

}
