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

    getUniversitiesNoPages() {
        return this.http.get(environment.apiUrl+`/university/noPages`);
    }

    getThesis(page) {
        return this.http.get(environment.apiUrl+`/thesis?page=${page}`);
    }

    getCompletedThesis(page) {
        return this.http.get(environment.apiUrl+`/thesis/completed?page=${page}`);
    }

    getCompletedFileThesis(thesisId) {
        return this.http.get(environment.apiUrl+`/thesis/completed/file/${thesisId}`)
    }

    getCompletedFileThesisData(fileId) {
        return this.http.get(environment.apiUrl+`/thesis/completed/data/${fileId}`);
    }

    getThesisOfProfessor(page,id) {
        return this.http.get(environment.apiUrl+`/thesis?page=${page}&professor=${id}`);
    }

    getThesisById(id) {
        return this.http.get(environment.apiUrl+`/thesis/${id}`);
    }
    getCompleted(page) {
        return this.http.get(environment.apiUrl+`/thesis/completed?page=${page}`); //digital repository
    }

    getFilesThesis(ThesisId) {
        return this.http.get(environment.apiUrl+`/thesis/files/${ThesisId}`);
    }
    
    getFile(FileId) {
        return this.http.get(environment.apiUrl+`/thesis/file/${FileId}`);
    }

    getProfessors() {
        return this.http.get(environment.apiUrl+`/thesis/professors`);
    }
 



}