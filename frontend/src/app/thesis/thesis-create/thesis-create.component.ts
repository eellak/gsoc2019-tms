 import { ProfessorService } from './../../shared/services/professor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
 import { AlertService } from '../../shared/services/alert.service';
 
@Component({
  selector: 'app-thesis-create',
  templateUrl: './thesis-create.component.html',
  styleUrls: ['./thesis-create.component.css']
})
export class ThesisCreateComponent implements OnInit {
  createThesisForm: FormGroup;
  description;
  thesis={};
  message=" ";
  fileToUpload: File = null;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
     private alertService: AlertService,
    private professorService:ProfessorService
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }


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
    this.professorService.postThesis(this.thesis)
    .subscribe(
      (data:any) => {
        this.message="loading"
        console.log(data)
         console.log(data)
         this.professorService.postPdfThesis(this.fileToUpload,data.thesis._id)
         .subscribe(
           (result:any) => {
             console.log(result)
             this.message="success"
              this.router.navigate(['../professor/thesis'], { relativeTo: this.route})
           }
         )
         
      },
      error => {
        console.log(error)
          this.alertService.error(error);
      });
    }

    

}
