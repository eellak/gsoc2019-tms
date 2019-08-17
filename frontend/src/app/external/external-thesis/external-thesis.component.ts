import { ExternalService } from './../../shared/services/external.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { ProfessorService } from './../../shared/services/professor.service';
import {Sort} from '@angular/material/sort';
import { StudentService } from './../../shared/services/student.service';


@Component({
  selector: 'app-external-thesis',
  templateUrl: './external-thesis.component.html',
  styleUrls: ['./external-thesis.component.css']
})
export class ExternalThesisComponent implements OnInit {
  theses:any=[];
  loading=false;
  count=0;
  acceptedCount=0;
  pager:any={}
  sortedData:any=[];
  sortedAcceptedData:any=[];
  message=' ';

  constructor(private externalService:ExternalService, 
              private alertService:AlertService,
              private router : Router,
              private route: ActivatedRoute) 
              { }

  ngOnInit() {
    this.loading=true;
    this.getPendingThesis(1);
    this.getAcceptedPendings();
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
        case 'pending': return this.compare(a.title, b.title, isAsc);
        case 'student': return this.compare(a.student.lastname, b.student.lastname, isAsc);
        case 'apply': return this.compare(a.applied, b.applied, isAsc);
        default: return 0;
      }
    });
  }
  getPendingThesis(page) {
    this.loading=true;
    this.externalService.getPendings(page)
    .subscribe(
    (data:any) => {
      console.log(data)
         this.sortedData=data.docs;
        this.count=data.count;
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


  getAcceptedPendings() {
    this.externalService.getAcceptedPendings()
    .subscribe(
    (data:any) => {
        console.log(data)
        this.acceptedCount=data.length
         this.sortedAcceptedData=data;
    },
    error => {
        this.alertService.error(error);
        this.loading = false;
    });    
  }
  
  sortAcceptedData(sort: Sort) {
    const data = this.sortedAcceptedData.slice();
    this.sortedAcceptedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
       switch (sort.active) {
        case 'created_time': return this.compare(a.created_time, b.created_time, isAsc);
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'student': return this.compare(a.student.lastname, b.student.lastname, isAsc);
        case 'apply': return this.compare(a.applied, b.applied, isAsc);
        default: return 0;
      }
    });
  }

  deletePending(thesis) {
    if(confirm("Are you sure to delete thesis: "+thesis.title)) {
      this.externalService.deletePending(thesis)
      .subscribe(
        (data:any) => {
          console.log(data)
          this.getPendingThesis(1);
          this.getAcceptedPendings();
        },
        error => {
          this.alertService.error(error)
          this.loading=false
        }

      )
    }
  }

  confirm(pending) {
    if(confirm("Are you sure you want to comfirm this thesis: "+pending.thesis.title+" to professor:"+pending.professor.name+" "+ pending.professor.lastname+"? All others requests of professors to this thesis will be lost and professor "+pending.professor.name+" "+pending.professor.lastname+" will be assigned to this thesis.")) 
    {
      this.externalService.postAcceptedPending(pending._id)
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
}