import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
 


@Injectable({ providedIn: 'root' })
export class ExternalService {
 
    constructor(private http: HttpClient) {}


    getPendings(page) {
        return this.http.get(environment.apiUrl+`/external/pending?page=${page}`)
    }

    getPendingById(pendingId) {
        return this.http.get(environment.apiUrl+`/external/pending/${pendingId}`)
    }

    createPending(thesis) {
        return this.http.post(environment.apiUrl+`/external/pending`,{thesis:thesis})
    }

    deletePending(thesis) {
        return this.http.delete(environment.apiUrl+`/external/pending/${thesis._id}`)
   }
   
   //get accepted pending

   getAcceptedPendings() {
           return this.http.get(environment.apiUrl+`/external/pending/accepted`);
   }

   getAcceptedPendingById(id) {
       return this.http.get(environment.apiUrl+`/external/pending/${id}/accepted`);
   }

   postAcceptedPending(id) {
       return this.http.post(environment.apiUrl+`/external/pending/${id}/accepted`,{});
   }

   postPdfThesis(fileToUpload: File, ThesisId): Observable<boolean> {
    const endpoint = environment.apiUrl+`/external/thesis/file/${ThesisId}`;
    const formData: FormData = new FormData();
    formData.append('pdf', fileToUpload, fileToUpload.name);
    return this.http
        .post(endpoint, formData,{responseType:'arraybuffer' as 'json'})
        .pipe(map(() => { return true; }))
    }

    //update  thesis
    putThesis(id,thesis) {
        return this.http.put(environment.apiUrl+`/external/thesis/${id}`,{thesis:thesis});
    }

    deleteFile(thesisId,fileId) {
        return this.http.delete(environment.apiUrl+`/external/file/${thesisId}/${fileId}`)
    }
 


}