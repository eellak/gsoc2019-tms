import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared/services/shared.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../../shared/services/alert.service';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-login-ldap',
  templateUrl: './login-ldap.component.html',
  styleUrls: ['./login-ldap.component.css']
})
export class LoginLdapComponent implements OnInit {
  universities;
  value: string;
  viewValue: string;
  selectedUniversity;
  universitiesLoaded;

  ldapLoginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private sharedService:SharedService,
    private alertService: AlertService
  ) { 
    // redirect to home if already logged in
    if (this.authenticationService.isLoggedIn()) { 
      this.router.navigate(['/']);
  }
  }

  ngOnInit() {
    this.ldapLoginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])],
      password: ['', Validators.required],
      university: ['']
  });

  this.getUniversities();
        
  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getUniversities() {
    this.sharedService.getUniversitiesNoPages()
    .subscribe(
      (result:any) => {
      console.log(result)
      this.universities=result
      this.universitiesLoaded = true;
     },
    error => {
        console.log(error)
        this.alertService.error(error);
     });
  }

  changeUniversity(university) {
     this.selectedUniversity=university;
  }

  // convenience getter for easy access to form fields
  get f() { return this.ldapLoginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.ldapLoginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.ldap_login(this.f.email.value, this.f.password.value, this.f.university.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
                  console.log('Redirected at: ' + this.returnUrl);
              },
              error => {
                  console.log('Dem error now is: ' + error)
                  this.alertService.error('Auth failed, Wrong email or password');
                  this.loading = false;
              });
  }
}
