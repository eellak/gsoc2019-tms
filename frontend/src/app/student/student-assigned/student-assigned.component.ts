import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { ProfessorService } from './../../shared/services/professor.service';
import {Sort} from '@angular/material/sort';
import { StudentService } from './../../shared/services/student.service';

@Component({
  selector: 'app-student-assigned',
  templateUrl: './student-assigned.component.html',
  styleUrls: ['./student-assigned.component.css']
})
export class StudentAssignedComponent implements OnInit {
  assigned:any={};
  count=0;
  isLoaded=false;

  constructor(private studentService:StudentService, 
    private alertService:AlertService,
    private router : Router,
    private route: ActivatedRoute) 
    { }


  ngOnInit() {
    this.getThesis()
  }

  getThesis() {
     this.studentService.getThesis()
    .subscribe(
      (data:any) => {
        this.count=data.length;
           this.assigned=data[0];
           this.isLoaded=true;
           console.log(data)
         
      },
      error => {
          this.alertService.error(error);
       });
    }

}
