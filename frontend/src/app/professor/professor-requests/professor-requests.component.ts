import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { ProfessorService } from './../../shared/services/professor.service';
import {Sort} from '@angular/material/sort';


@Component({
  selector: 'app-professor-requests',
  templateUrl: './professor-requests.component.html',
  styleUrls: ['./professor-requests.component.css']
})
export class ProfessorRequestsComponent implements OnInit {
  theses:any=[];
  loading=false;
  count=0;
  pager:any={}
  sortedData:any=[];
  message=' ';

  constructor(private professorService:ProfessorService, 
              private alertService:AlertService,
              private router : Router,
              private route: ActivatedRoute) 
              { }

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
        case 'title': return this.compare(a.thesis.title, b.thesis.title, isAsc);
        case 'student': return this.compare(a.student.lastname, b.student.lastname, isAsc);
        case 'apply': return this.compare(a.applied, b.applied, isAsc);
        default: return 0;
      }
    });
  }
  getRequests(page) {
    this.professorService.getRequests(page)
    .subscribe(
    (data:any) => {

      console.log(data)
        this.sortedData=data.docs;
        this.count=data.count;
        this.pager.count=data.count;
        this.pager.pages= data.pages;
        this.pager.currentPage=page;
    },
    error => {
        this.alertService.error(error);
        this.loading = false;
    });
  }


 

  acceptRequest(request) {
    if(confirm("Are you sure want to apply for this pending thesis: "+request.thesis.title)) {
      this.professorService.postPendingById(request.thesis._id)
      .subscribe(
        (data:any) => { 
            console.log(data)
            this.message="success";
            setTimeout(() =>  {
              this.message=' ';
            }
            ,2000);
            this.getRequests(this.pager.currentPage);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
      }
  }
}