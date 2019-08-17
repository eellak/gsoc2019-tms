import { AlertService } from './../shared/services/alert.service';
import { SharedService } from './../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
 import Auth from 'auth0-sso-login';
import {Router, ActivatedRoute } from '@angular/router' ;
import { AuthenticationService } from './../shared/services/authentication.service';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class LoginComponent implements OnInit {

    auth: Auth
    result;
    universities;
    sso=false;
    value: string;
     viewValue: string;

    constructor(private router: Router,  
       private http: HttpClient,
       private sharedService:SharedService,
      private alertService:AlertService
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

    getUniversities() {
      this.sharedService.getUniversitiesNoPages()
      .subscribe(
        (result:any) => {
        console.log(result)
        this.universities=result
        this.sso=true;
       },
      error => {
          console.log(error)
          this.alertService.error(error);
       });
    }

    // NOT IMPLEMENTED ---- Geting the value of selected university and redirect to the specified Identity Provider !

}
