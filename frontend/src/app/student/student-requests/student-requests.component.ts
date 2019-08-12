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
  count=0;
  assigned=false;
  
  constructor( private router : Router
    ,private authenticationService: AuthenticationService,
     private route: ActivatedRoute,
     private sharedService:SharedService,
     private alertService:AlertService,
     private studentService:StudentService ) {}

    
  ngOnInit() {
    this.getRequests(1);
    this.checkAssigned();
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
        case 'accepted': return this.compare(a.accepted_fromProfessor, b.accepted_fromProfessor, isAsc);
        default: return 0;
      }
    });
  }

  
  getRequests(page) {
    this.loading=true;
    this.studentService.getRequests(page)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
         this.sortedData=data.docs;
         this.count=data.count;
         console.log(this.sortedData);
         this.pager.count=data.count;
         this.pager.pages= data.pages;
         this.pager.currentPage=page;
         this.loading=false;
     },
     error => {
         this.alertService.error(error);
         this.loading = false;
     });
   
    }

    confirm(request) {
      if(confirm("Are you sure you want to comfirm this thesis: "+request.thesis.title+". All other requests will be deleted and you will be assigned to this thesis. ")) 
      {
        this.studentService.postAcceptedRequest(request._id)
        .subscribe(
          (data:any) => { 
              console.log(data)
              this.message="success";
              setTimeout(() =>  {
                this.message=' ';
              }
              ,2000);
              this.router.navigate(['/my_thesis'])
            },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
        }
    }

    checkAssigned() {
      this.studentService.checkAssigned()
      .subscribe(
        (data:any) => { 
            console.log(data)
            if(data.message=="A thesis has been assigned to student")
            {
              this.assigned=true;
            }
            else this.assigned=false;
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
      }
    }

