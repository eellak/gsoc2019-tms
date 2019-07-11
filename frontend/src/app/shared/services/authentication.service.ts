import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
 

    constructor(private http: HttpClient) {}

     getToken() {
        return localStorage.getItem('currentUser');
    }

    isLoggedIn() {
        if(localStorage.getItem('currentUser')!=null) 
            return true;
        else return false;
    }

    login(email: string, password: string) {
        return this.http.post<any>(environment.apiUrl+'/external/login', { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                 
                return user;
            }));
    }

    
    
    sso_logout() {
        localStorage.removeItem('currentUser');
        window.location.href='https://dev-i5mfll-2.auth0.com/v2/logout?client_id=ISe3r0XrgUoKgchkvExvSPlqGecxhN67&returnTo=http://localhost:4200/sso_logout';    
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}