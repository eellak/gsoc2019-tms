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

    getProfessors(page) {
        return this.http.get(environment.apiUrl+`/secretariat/get_professors?page=${page}`);
    }

    downloadFile(data, filename='data') {
        let csvData = this.ConvertToCSV(data, ['ΟΝΟΜΑΤΕΠΩΝΥΜΟ', 'ΑΜ', 'ΤΙΤΛΟΣ', 'ΗΜΕΡΟΜΗΝΙΑ', 'ΕΠΙΒΛΕΠΩΝ', 'ΜΕΛΟΣ1', 'ΜΕΛΟΣ2']);
        console.log(csvData)
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }

    ConvertToCSV(objArray, headerList) {
         let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
         let str = '';
         let row = 'Α/Α,';

         for (let index in headerList) {
             row += headerList[index] + ',';
         }
         row = row.slice(0, -1);
         str += row + '\r\n';
         for (let i = 0; i < array.length; i++) {
             let line = (i+1)+'';
             for (let index in headerList) {
                let head = headerList[index];

                 line += ',' + array[i][head];
             }
             str += line + '\r\n';
         }
         return str;
     }
    
}