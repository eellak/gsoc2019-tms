import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map} from 'rxjs/operators';
import {Observable} from 'rxjs';
 


@Injectable({ providedIn: 'root' })
export class SecretariatService {
 
    constructor(private http: HttpClient) {}

    getStudents(page) {
        return this.http.get(environment.apiUrl+`/secretariat/get_students?page=${page}`);
    }

    getStudents_not_assigned() {
        return this.http.get(environment.apiUrl+`/secretariat/get_students_not_assigned`);
    }
    
}