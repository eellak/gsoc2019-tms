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


@Injectable({ providedIn: 'root' })
export class SharedService {
 
    constructor(private http: HttpClient) {}
        
    
    getUniversities(page) {
        return this.http.get(environment.apiUrl+`/university?page=${page}`);
    }




}