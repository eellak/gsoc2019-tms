import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map} from 'rxjs/operators';
import {Observable} from 'rxjs';
 


@Injectable({ providedIn: 'root' })
export class ProfessorService {
 
    constructor(private http: HttpClient) {}
        
//get all requests 
    getRequests(page) {
        return this.http.get(environment.apiUrl+`/professor/request?page=${page}`);
    }

    getRequestById(id) {
        return this.http.get(environment.apiUrl+`/professor/request/${id}`);
    }

    deleteRequestById(id) {
        return this.http.delete(environment.apiUrl+`/professor/request/${id}`);
    }
    postRequestById(id) {
        return this.http.post(environment.apiUrl+`/professor/request/${id}`,{});
    }
    
//get all assigned thesis to students
    getAssigned(page) {
        return this.http.get(environment.apiUrl+`/professor/assigned?page=${page}`);
    }

    getAssignedById(id) {
        return this.http.get(environment.apiUrl+`/professor/assigned/${id}`);
    }

    
// this functions are for thesis proposed from externals or students
    getPending(page) {
        return this.http.get(environment.apiUrl+`/professor/pending?page=${page}`);
    }

    getPendingById(id) {
        return this.http.get(environment.apiUrl+`/professor/pending/${id}`);
    }

    checkPending(id) {
        return this.http.get(environment.apiUrl+`/professor/pending/check/${id}`)
    }
    
    postPendingById(id) {
            return this.http.post(environment.apiUrl+`/professor/pending/${id}`,{});
    }

// get all thesis he owns
    getThesis(page) {
        return this.http.get(environment.apiUrl+`/professor/thesis?page=${page}`);
    }

// get thesis he owns by id
    getThesisById(ThesisId) {
        return this.http.get(environment.apiUrl+`/professor/thesis/${ThesisId}`);
    }

 // create thesis
    postThesis(thesis) {
        return this.http.post(environment.apiUrl+`/professor/thesis/`,{thesis:thesis});
    }

    postPdfThesis(fileToUpload: File, ThesisId): Observable<boolean> {
        const endpoint = environment.apiUrl+`/professor/thesis/pdf/${ThesisId}`;
        const formData: FormData = new FormData();
        formData.append('pdf', fileToUpload, fileToUpload.name);
        return this.http
            .post(endpoint, formData,{responseType:'arraybuffer' as 'json'})
            .pipe(map(() => { return true; }))
    }

  

    //update current thesis
    putThesis(id,thesis) {
        return this.http.put(environment.apiUrl+`/professor/thesis/${id}`,{thesis:thesis});
    }

    //delete thesis he owns
    deleteThesis(thesis) {
            return this.http.delete(environment.apiUrl+`/professor/thesis/${thesis._id}`);
        }

    // get all professors from the same university
    getProfessorsFromUniversity() {
        return this.http.get(environment.apiUrl+`/professor/university`);
    }

    // get all external professors 
    getExternalProfessors() {
        return this.http.get(environment.apiUrl+`/professor/external_professors`);
    }


    // draft routes

    getDrafts(assignedThesisId) {
        return this.http.get(environment.apiUrl+`/professor/draft/${assignedThesisId}`)
    }

    getDraftById(assignedThesisId,draftId) {
        return this.http.get(environment.apiUrl+`/professor/draft/${assignedThesisId}/${draftId}`)
    }

// routes for professor to be supervisor

    //get all the supervise request from other professors to userId 
    getSupervisePending() {
        return this.http.get(environment.apiUrl+`/professor/supervise_pending`);
    }

     //get the supervise request  from other professors to userId 
    getSupervisePendingById(id) {
        return this.http.get(environment.apiUrl+`/professor/supervise_pending/${id}`);
    }

    // accept request for supervision
    acceptSuperviceRequest(id) {
        return this.http.post(environment.apiUrl+`/professor/supervise_pending/${id}`,{});
    }

    deleteSuperviceRequest(id) {
        return this.http.delete(environment.apiUrl+`/professor/supervise_pending/${id}`);
    }

//routes for professor to propose another supervisor
    //propose another professor to supervise a thesis
    proposeProfessor(supervisor_id,thesis_id,text) {
        return this.http.post(environment.apiUrl+`/professor/propose_supervisor/${supervisor_id}/${thesis_id}`,{text:text});
    }
    
    // get accepted supervisors before confirm
    getAcceptedSupervisors() {
        return this.http.get(environment.apiUrl+`/professor/accept_supervisor`);
    }
    
    // get accepted supervisors before confirm
    getAcceptedSupervisorById(id) {
        return this.http.get(environment.apiUrl+`/professor/accept_supervisor/${id}`);
    }

    
    getThesisSupervise() {
        return this.http.get(environment.apiUrl+`/professor/supervisor/thesis`)
    }



}