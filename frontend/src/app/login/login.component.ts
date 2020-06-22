import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute } from '@angular/router' ;
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class LoginComponent implements OnInit {

  value: string;
  viewValue: string;

    constructor(private router: Router,  
       private http: HttpClient
    ) { }

    ngOnInit() {
     }

    login_ldap(){
      this.router.navigate(['/login-ldap']);
    }

    login_external() {
      this.router.navigate(['/login-external']);
    }

    // Geting the value of selected university and  // NOT IMPLEMENTED ----  redirect to the specified Identity Provider !

}
