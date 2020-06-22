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
            if(this.tokenExpired())
             {
                // token expired
                const role=this.getRole()
                if(role==="External" || role==="Admin") {
                  this.logout();
                }
                else {
                  this.sso_logout();
                }
                return false;
            }
            return true;
        }
        else { 
            return false;
        }
    }

    tokenExpired() {
        var expired_date=new Date(localStorage.Timestamp)
        var token_length= 3* 60 * 60 * 1000; //3 hours
        expired_date= new Date(expired_date.getTime()+token_length);
        if(expired_date<=new Date()) {
            return true;
        }
        else return false;
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

    ldap_login(email: string, password: string, university: number){
        console.log('Next step is to pass email and pass to backend in /ldap/login URL and university id: '+university);
        return this.http.post<any>(environment.apiUrl+'/ldap/login', { email, password, university })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('Token', user.token);
                    localStorage.setItem('Role',user.role);
                    localStorage.setItem('University',user.university);
                    localStorage.setItem('Timestamp',''+new Date());
                }
                console.log(user);
                // console.log(localStorage);
                return user;
            }));
    }

    isAdmin() {
       return this.http.get(environment.apiUrl+'/admin')
                .pipe(take(1))
    }

   
    
    sso_logout() {
        localStorage.clear();
        this.router.navigate(['/login'])
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.router.navigate(['/login'])
    }

 







}