 
import { Observable } from 'rxjs';
import { map, tap, take, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class StudentGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot ,
               router: RouterStateSnapshot) 
       :Observable<any>|boolean {
            if(localStorage.getItem('Role')==="Student")
                return true; 
            else {
                    console.log("not auth");
                    this.router.navigate(['/'])
                    return false;
                }
            
        // not logged in so redirect to login page with the return url
    }
}