import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { ProfessorService } from './../../shared/services/professor.service';


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

  constructor(private professorService:ProfessorService, private alertService:AlertService) { }

  ngOnInit() {
   this.getAssignedThesis(1)
  }

  getAssignedThesis(page) {
    this.professorService.getAssigned(page)
    .subscribe(
    (data:any) => {
        console.log(data)
          //this.alertService.success('Get user information successful', true);
        this.theses=data.docs;
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