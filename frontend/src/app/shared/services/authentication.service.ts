import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { map, tap, take, catchError } from 'rxjs/operators';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
  } from '@angular/router';

import { User } from '../models/user.model';
import { getLocaleTimeFormat } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
 
    constructor(private http: HttpClient, private router: Router) {}

     getToken() {
        return localStorage.getItem('Token');
    }

    getRole() {
        return localStorage.getItem('Role');   
    }

    isLoggedIn() {
        if("Token" in localStorage) {
             // check if token has expired 
            var mydate=localStorage.Timestamp;
            var token_length= 3* 60 * 60 * 1000; //3 hours
            mydate= new Date(mydate+token_length);
            if(mydate>=new Date()) {
                // token expired
                localStorage.clear();
                return false;
            }
            return true;
        }
        else { 
            return false;
        }
    }

    login(email: string, password: string) {
        return this.http.post<any>(environment.apiUrl+'/external/login', { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('Token', user.token);
                    localStorage.setItem('Role',user.role);
                    localStorage.setItem('Timestamp',''+new Date());
                }
                 
                return user;
            }));
    }


    isAdmin() {
       return this.http.get(environment.apiUrl+'/admin')
                .pipe(take(1))
    }

    
    
    sso_logout() {
        localStorage.clear();
        window.location.href='https://dev-i5mfll-2.auth0.com/v2/logout?client_id=ISe3r0XrgUoKgchkvExvSPlqGecxhN67&returnTo=http://localhost:4200/sso_logout';    
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.router.navigate(['/login'])
    }

 







}