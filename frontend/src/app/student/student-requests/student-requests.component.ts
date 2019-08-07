import { Component, OnInit } from '@angular/core';
import { UrlSegment, Router, ActivatedRoute } from '@angular/router';
import {Sort} from '@angular/material/sort';

import { AuthenticationService } from '../../shared/services/authentication.service';
import { SharedService } from '../../shared/services/shared.service';
import { AlertService } from '../../shared/services/alert.service';
import { StudentService } from './../../shared/services/student.service';


@Component({
  selector: 'app-student-requests',
  templateUrl: './student-requests.component.html',
  styleUrls: ['./student-requests.component.css']
})
export class StudentRequestsComponent implements OnInit {

  requests:any=[];
  loading=false;
  pager:any={}
  sortedData:any=[];
  message=' ';

  
  constructor( private router : Router
    ,private authenticationService: AuthenticationService,
     private route: ActivatedRoute,
     private sharedService:SharedService,
     private alertService:AlertService,
     private studentService:StudentService ) {}

    
  ngOnInit() {
    this.getRequests(1);
  }

  compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
 
  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
       switch (sort.active) {
        case 'created_time': return this.compare(a.created_time, b.created_time, isAsc);
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'professor': return this.compare(a.professor.lastname, b.professor.lastname, isAsc);
        case 'university': return this.compare(a.university.name, b.university.name, isAsc);
        default: return 0;
      }
    });
  }

  
  getRequests(page) {
    this.studentService.getRequests(page)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
         this.sortedData=data.docs;
         console.log(this.sortedData);
         this.pager.count=data.count;
         this.pager.pages= data.pages;
         this.pager.currentPage=page;
     },
     error => {
         this.alertService.error(error);
         this.loading = false;
     });
   }

   checkApplied(thesis) {
    var status=0;
    this.studentService.checkApplied(thesis._id)
    .subscribe(
      (data:any) => {
         if(data.message=="Success")
          thesis.applied=0;
        else
          thesis.applied=1;
      },
      error => {
        thesis.applied=1;
  
      });
    }


}
