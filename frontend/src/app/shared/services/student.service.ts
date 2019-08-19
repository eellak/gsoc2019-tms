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
export class StudentService {
 
    constructor(private http: HttpClient) {}
        
//get all requests 

    getTheses(page,university) {
        return this.http.get(environment.apiUrl+`/thesis?page=${page}&university=${university}`)
    }

    checkApplied(thesisId) {
        return this.http.get(environment.apiUrl+`/student/check/${thesisId}`)
    }

    applyThesis(thesisId,text) {
        return this.http.post(environment.apiUrl+`/student/request/${thesisId}`,{text:text})
    }

    getRequests(page) {
        return this.http.get(environment.apiUrl+`/student/request?page=${page}`);
    }

    deleteRequest(id) {
        return this.http.get(environment.apiUrl+`/student/request/${id}`);
    }

    getAcceptedRequests() {
        return this.http.get(environment.apiUrl+`/student/request/accepted`);
    }

    getAcceptedRequestById(id) {
        return this.http.get(environment.apiUrl+`/student/request/${id}/accepted`);
    }

   postAcceptedRequest(id) {
    return this.http.post(environment.apiUrl+`/student/request/${id}/accepted`,{});
   }



   //pending
    
//get all assigned thesis to students
    getAssigned(page) {
        return this.http.get(environment.apiUrl+`/professor/assigned?page=${page}`);
    }

    getAssignedById(id) {
        return this.http.get(environment.apiUrl+`/professor/assigned/${id}`);
    }

    
// this functions are for thesis proposed from externals or students
    getPendings(page) {
        return this.http.get(environment.apiUrl+`/student/pending?page=${page}`);
    }

    getPendingById(id) {
        return this.http.get(environment.apiUrl+`/student/pending/${id}`);
    }

    createPending(thesis) {
        return this.http.post(environment.apiUrl+`/student/pending`,{thesis:thesis})
    }

    deletePending(thesis) {
         return this.http.delete(environment.apiUrl+`/student/pending/${thesis._id}`)
    }
    
    //get accepted pending

    getAcceptedPendings() {
            return this.http.get(environment.apiUrl+`/student/pending/accepted`);
    }

    getAcceptedPendingById(id) {
        return this.http.get(environment.apiUrl+`/student/pending/${id}/accepted`);
    }

    postAcceptedPending(id) {
        return this.http.post(environment.apiUrl+`/student/pending/${id}/accepted`,{});
    }


    checkAssigned() {
        return this.http.get(environment.apiUrl+`/student/check_assigned`);
    }

    getDrafts(assignedThesisId) {
        return this.http.get(environment.apiUrl+`/student/draft/${assignedThesisId}`)
    }

    getDraftById(assignedThesisId,draftId) {
        return this.http.get(environment.apiUrl+`/student/draft/${assignedThesisId}/${draftId}`)
    }
     
    postDraft(fileToUpload: File, assigendThesisId): Observable<boolean> {
        const endpoint = environment.apiUrl+`/student/draft/${assigendThesisId}`;
        const formData: FormData = new FormData();
        formData.append('draft', fileToUpload, fileToUpload.name);
        return this.http
            .post(endpoint, formData,{responseType:'arraybuffer' as 'json'})
            .pipe(map(() => { return true; }))
    }

    postCompletedFile(fileToUpload: File, assigendThesisId): Observable<boolean> {
        const endpoint = environment.apiUrl+`/student/completed/${assigendThesisId}`;
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http
            .post(endpoint, formData,{responseType:'arraybuffer' as 'json'})
            .pipe(map(() => { return true; }))
    }

    getCompletedFileThesisById(assignedThesisId) {
        return this.http.get(environment.apiUrl+`/student/completed/${assignedThesisId}`)
    }

// get thesis he owns
    getThesis() {
        return this.http.get(environment.apiUrl+`/student/thesis`);
    }

}