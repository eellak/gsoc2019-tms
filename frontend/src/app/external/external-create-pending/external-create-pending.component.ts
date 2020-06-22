import { SharedService } from './../../shared/services/shared.service';
import { ExternalService } from './../../shared/services/external.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';


@Component({
  selector: 'app-external-create-pending',
  templateUrl: './external-create-pending.component.html',
  styleUrls: ['./external-create-pending.component.css']
})
export class ExternalCreatePendingComponent implements OnInit {
  createThesisForm: FormGroup;
  description;
  thesis = {};
  message=" ";
  fileToUpload: File = null;
  universities;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private externalService: ExternalService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.createThesisForm = this.formBuilder.group({
      title: ['', Validators.required],
      prerequisites: ['', Validators.required],
      tags: ['', Validators.required],
      description: ['', Validators.required],
     });
    this.getUniversities();
  }

  get f() { return this.createThesisForm.controls; }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  getUniversities() {
    this.sharedService.getUniversitiesNoPages()
      .subscribe((result: any) => {
          this.universities=result;
      })
  }

  selectUniversity(university) {
    console.log(university)
      this.thesis['university']= university;
  }

  onSubmit() {
    if (this.createThesisForm.invalid) {
      console.log("invalid form")
      return;
    }
    this.thesis['title'] = this.f.title.value;
    this.thesis['description'] = this.f.description.value;
    this.thesis['tags'] = this.f.tags.value;
    this.thesis['prerequisites'] = this.f.prerequisites.value;
    this.thesis['created_time'] = new Date();
    this.thesis['assigned'] = false;
 
    this.externalService.createPending(this.thesis)
      .subscribe(
        (data: any) => {
          this.message = "loading"
          if(this.fileToUpload !== null){
          this.externalService.postPdfThesis(this.fileToUpload, data.thesis._id)
            .subscribe(
              (result: any) => {
                this.message = "success"
                this.router.navigate(['../external/thesis'], { relativeTo: this.route })
              }
            )
          }else{
            this.message = "success"
            this.router.navigate(['../external/thesis'], { relativeTo: this.route })
          }
        },
        error => {
          console.log(error)
          this.alertService.error(error);
        });
  }
}
