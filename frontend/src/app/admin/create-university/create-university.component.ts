import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../../shared/services/alert.service';
import {AuthenticationService} from '../../shared/services/authentication.service';
import { AdminService } from './../../shared/services/admin.service';

@Component({
  selector: 'app-create-university',
  templateUrl: './create-university.component.html',
  styleUrls: ['./create-university.component.css']
})
export class CreateUniversityComponent implements OnInit {
  CreateUniversityForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  message

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private adminService: AdminService
     )  { }

  ngOnInit() {
    this.CreateUniversityForm = this.formBuilder.group({
        name: ['', Validators.required]
    });
            
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

   }

   get f() { return this.CreateUniversityForm.controls; }

   
   onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.CreateUniversityForm.invalid) {
        return;
    }
    this.loading = true;
    this.adminService.createUniversity(this.f.name.value)
        .subscribe(
            (data:any) => {
                this.message=data;
                setTimeout(() =>  {
                    this.router.navigate(['../university'], { relativeTo: this.route})
                }
                ,1500);
            },
            error => {
              console.log(error)
                this.alertService.error(error);
                this.loading = false;
            });
}

}
