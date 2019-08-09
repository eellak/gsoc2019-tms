import { StudentService } from './../../shared/services/student.service';
import { ProfessorService } from './../../shared/services/professor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../../shared/services/alert.service';
import {AuthenticationService} from '../../shared/services/authentication.service';


@Component({
  selector: 'app-student-create-pending',
  templateUrl: './student-create-pending.component.html',
  styleUrls: ['./student-create-pending.component.css']
})
export class StudentCreatePendingComponent implements OnInit {
  createThesisForm: FormGroup;
  description;
  thesis={};
  message;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private studentService:StudentService
  ) { }

  ngOnInit() {
    this.createThesisForm = this.formBuilder.group({
        title: ['', Validators.required],
        prerequisites: ['', Validators.required],
        tags: ['', Validators.required],
        description: ['', Validators.required]


    });
  }

  get f() { return this.createThesisForm.controls; }

  onSubmit() {
    if (this.createThesisForm.invalid) {
      console.log("invalid form")
      return;
    }
    this.thesis['title']=this.f.title.value;
    this.thesis['description']=this.f.description.value;
    this.thesis['tags']=this.f.tags.value;
    this.thesis['prerequisites']=this.f.prerequisites.value;
    this.thesis['created_time']=new Date();
    this.thesis['assigned']=false;
    this.thesis['university']=localStorage.getItem('University');
    this.studentService.createPending(this.thesis)
    .subscribe(
      (data:any) => {
        console.log(data)
         this.message=data.message
          setTimeout(() =>  {
              this.router.navigate(['/student/pending'])
          }
          ,1500);
      },
      error => {
        console.log(error)
          this.alertService.error(error);
      });
    }

}
