import { Component, OnInit,ViewChild } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { ProfessorService } from './../../shared/services/professor.service';
import {Sort} from '@angular/material/sort';
 
@Component({
  selector: 'app-professor-thesis',
  templateUrl: './professor-thesis.component.html',
  styleUrls: ['./professor-thesis.component.css']
})
export class ProfessorThesisComponent implements OnInit {
  loading=false;
  count=0;
  pager:any={}
  sortedData:any=[];

 

  constructor(private professorService:ProfessorService, private alertService:AlertService) {
    }

  ngOnInit() {
    this.loading=true;
   this.getThesis(1)
   }

  compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  
  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      console.log(a.title)
      switch (sort.active) {
        case 'created_time': return this.compare(a.created_time, b.created_time, isAsc);
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'assigned': return this.compare(a.assigned, b.assigned, isAsc);
        default: return 0;
      }
    });
  }

  getThesis(page) {
    this.professorService.getThesis(page)
    .subscribe(
    (data:any) => {
          //this.alertService.success('Get user information successful', true);
        this.count=data.count;
        this.pager.count=data.count;
        this.pager.pages= data.pages;
        this.pager.currentPage=page;
        this.sortedData=data.theses;
        this.loading=false;
     },
    error => {
        this.alertService.error(error);
        this.loading = false;
    });
  }

  deleteThesis(thesis) {
    if(confirm("Are you sure to delete thesis: "+thesis.title)) {
      this.professorService.deleteThesis(thesis)
      .subscribe(
        (data:any) => {
          console.log(data)
          this.getThesis(this.pager.currentPage)
        },
        error => {
          this.alertService.error(error)
          this.loading=false
        }

      )
    }
  }
}