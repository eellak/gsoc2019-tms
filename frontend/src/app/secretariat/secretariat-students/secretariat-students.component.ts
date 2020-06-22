import { AlertService } from './../../shared/services/alert.service';
import { SecretariatService } from './../../shared/services/secretariat.service';
import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

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
  exp_data;
  start_date = new Date(2020, 0, 1);
  end_date;
  from_date;
  to_date;

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
      console.log(data);
     this.exp_data=data.export_data;
     this.assigned=data.assigned;
     console.log("export data: " + this.exp_data);
     console.log("export data date format: " + this.exp_data[0].date);
     this.not_assigned=data.not_assigned;
     this.count=data.count;
     this.loading=false;
    }
  )
}

export_data(){
  console.log('Export data BEFORE filtering' + this.exp_data);
  if(this.start_date && this.end_date){
    var self_from = this.from_date;
    var self_to = this.to_date;
    this.exp_data = this.exp_data.filter(function(result){
      console.log('filtering date.. ' + result.date);
      return result.date >= self_from && result.date <= self_to;
    });
    console.log('Export data AFTER filtering' + this.exp_data);
    this.secretariatService.downloadFile(this.exp_data, 'Theses_assignments');
  }else{
    console.log('Export data AFTER filtering' + this.exp_data);
    this.secretariatService.downloadFile(this.exp_data, 'Theses_assignments');
  }
}

onDateChange(event: MatDatepickerInputEvent<Date>) {
  this.start_date = event.value;
  this.from_date = this.start_date.getTime();
  console.log('Start date is set to: ' + this.from_date);
}

onDateChange2(event: MatDatepickerInputEvent<Date>) {
  this.end_date = event.value;
  this.to_date = this.end_date.getTime();
  console.log('End date is set to: ' + this.to_date);
}

}
