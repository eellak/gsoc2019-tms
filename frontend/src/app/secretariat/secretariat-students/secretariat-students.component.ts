import { AlertService } from './../../shared/services/alert.service';
import { SecretariatService } from './../../shared/services/secretariat.service';
import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-secretariat-students',
  templateUrl: './secretariat-students.component.html',
  styleUrls: ['./secretariat-students.component.css']
})
export class SecretariatStudentsComponent implements OnInit {

  loading=false;
  count=0;
  pager:any={}
  sortedData:any=[];
  assigned;
  not_assigned;

  constructor( private secretariatService:SecretariatService,
                private alertService:AlertService
              ) { }

  ngOnInit() {
    this.loading=true;
     this.getStudents_not_assigned();

  }
 

getStudents(page) {
  this.secretariatService.getStudents(page)
  .subscribe(
  (data:any) => {
      console.log(data);
      this.count=data.count;
      this.pager.count=data.count;
      this.pager.pages= data.pages;
      this.pager.currentPage=page;
      this.sortedData=data.docs;
      this.loading=false;
   },
  error => {
      this.alertService.error(error);
      this.loading = false;
  });
}

getStudents_not_assigned() {
  this.secretariatService.getStudents_not_assigned()
  .subscribe(
    (data:any) => {
      console.log(data)
     this.assigned=data.assigned
     this.not_assigned=data.not_assigned
     this.count=data.count;
     this.loading=false;
    }
  )
}

}
