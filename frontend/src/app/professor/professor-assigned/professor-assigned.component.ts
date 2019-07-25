import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { ProfessorService } from './../../shared/services/professor.service';
import {Sort} from '@angular/material/sort';


@Component({
  selector: 'app-professor-assigned',
  templateUrl: './professor-assigned.component.html',
  styleUrls: ['./professor-assigned.component.css']
})
export class ProfessorAssignedComponent implements OnInit {
  theses:any=[];
  loading=false;
  count=0;
  pager:any={}
  sortedData:any=[];

  constructor(private professorService:ProfessorService, private alertService:AlertService) { }

  ngOnInit() {
   this.getAssignedThesis(1)
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

  getAssignedThesis(page) {
    this.professorService.getAssigned(page)
    .subscribe(
    (data:any) => {
        console.log(data)
          //this.alertService.success('Get user information successful', true);
        this.theses=data.docs;
        this.sortedData=this.theses.slice();
        this.count=data.count;
        this.pager.count=data.count;
        this.pager.pages= data.pages;
        this.pager.currentPage=page;
        console.log(this.theses)
    },
    error => {
        this.alertService.error(error);
        this.loading = false;
    });
  }

}