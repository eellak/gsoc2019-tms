import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { ProfessorService } from './../../shared/services/professor.service';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-professor-pending',
  templateUrl: './professor-pending.component.html',
  styleUrls: ['./professor-pending.component.css']
})
export class ProfessorPendingComponent implements OnInit {
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
    this.getPendingThesis(1);
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
        case 'student': return this.compare(a.student.lastname, b.student.lastname, isAsc);
        default: return 0;
      }
    });
  }
  getPendingThesis(page) {
    this.professorService.getPending(page)
    .subscribe(
    (data:any) => {
         this.sortedData=data.docs;
         for(var i=0;i<this.sortedData.length;i++) {
           this.checkPending(this.sortedData[i])
           
           console.log(this.sortedData[0])
           if('creator_student' in this.sortedData[i]) {
                 this.sortedData[i].creator=this.sortedData[i].creator_student
           }
           else {
             this.sortedData[i].creator=this.sortedData[i].creator_external
           }
         }
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


  checkPending(thesis) {
    var status=0;
    this.professorService.checkPending(thesis._id)
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


  applyPending(thesis) {
    if(confirm("Are you sure want to apply for this pending thesis: "+thesis.title)) {
      this.professorService.postPendingById(thesis._id)
      .subscribe(
        (data:any) => { 
            console.log(data)
            this.message="success";
            setTimeout(() =>  {
              this.message=' ';
            }
            ,2000);
            this.getPendingThesis(this.pager.currentPage);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
      }
  }
}