import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { ProfessorService } from './../../shared/services/professor.service';

@Component({
  selector: 'app-professor-thesis',
  templateUrl: './professor-thesis.component.html',
  styleUrls: ['./professor-thesis.component.css']
})
export class ProfessorThesisComponent implements OnInit {
  theses:any=[];
  loading=false;
  count=0;
  pager:any={}

  constructor(private professorService:ProfessorService, private alertService:AlertService) { }

  ngOnInit() {
   this.getThesis(1)
  }

  getThesis(page) {
    this.professorService.getThesis(page)
    .subscribe(
    (data:any) => {
          //this.alertService.success('Get user information successful', true);
        this.theses=data.theses;
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

  deleteThesis(thesis) {
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