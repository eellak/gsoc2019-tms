 
import { Observable } from 'rxjs';
import { map, tap, take, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

 

@Injectable({ providedIn: 'root' })
export class SecretariatGuard implements CanActivate {
    constructor(
        private router: Router,
     ) {}

    canActivate(route: ActivatedRouteSnapshot ,
        router: RouterStateSnapshot) 
:Observable<any>|boolean {
     if(localStorage.getItem('Role')==="Secretariat")
         return true; 
     else {
             console.log("not auth");
             this.router.navigate(['/'])
             return false;
         }
     
 // not logged in so redirect to login page with the return url
}
}