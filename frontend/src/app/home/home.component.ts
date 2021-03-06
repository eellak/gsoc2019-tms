import { map, startWith } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SharedService } from './../shared/services/shared.service';
import { AlertService } from './../shared/services/alert.service';
import { AuthenticationService } from './../shared/services/authentication.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myControlProfessor = new FormControl();
  myControlUniversity = new FormControl();

  filteredProfessorOptions: Observable<string[]>;
  filteredUniversityOptions: Observable<string[]>;

  theses: any = [];
  loading = false;
  pager: any = {}
  sortedData: any = [];

  professors;
  universities;

  selectedProfessor: any;


  professorsLoaded;
  universitiesLoaded;

  isloggedin = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private location: Location) { 
      this.isloggedin = this.authenticationService.isLoggedIn();
    }

  ngOnInit() {
    const url = this.router.url;
    if (url.startsWith("/?access_token")) {
      localStorage.setItem('Token', this.route.snapshot.queryParams["access_token"]);
      localStorage.setItem('Role', this.route.snapshot.queryParams["role"]);
      localStorage.setItem('Timestamp', '' + new Date());
      localStorage.setItem('University', this.route.snapshot.queryParams["university"]);
    };
    this.loading = true;

    this.filteredProfessorOptions = this.myControlProfessor.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterProfessor(value))
      );
    this.filteredUniversityOptions = this.myControlUniversity.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterUniversity(value))
      );
    this.professorsLoaded = false;
    this.getProfessors();
    this.getUniversities();
    this.location.replaceState('/');

  }

  login(){
    this.router.navigate(['/login']);
  }

  displayProfessor(professor) {
    if (professor) {
      return professor.name + " " + professor.lastname;
    }
    else return undefined;
  }

  displayUniversity(university) {
    if (university) {
      return university.name
    }
    else return undefined;
  }


  private _filterProfessor(value) {
    var filterValue;
    if (typeof value === 'object') {
      filterValue = value.lastname.toLowerCase()
    }
    else {
      filterValue = value.toLowerCase();
    }
    return this.professors.filter(option => {
      const optionString = option.name.toString().toLowerCase() + " " + option.lastname.toString().toLowerCase();
      return optionString.includes(filterValue);
    });
  }

  private _filterUniversity(value) {
    var filterValue;
    if (typeof value === 'object') {
      filterValue = value.name.toLowerCase()
    }
    else {
      filterValue = value.toLowerCase();
    }
    return this.universities.filter(option => option.name.toString().toLowerCase().includes(filterValue));
  }

  getUniversities() {
    this.sharedService.getUniversitiesNoPages()
      .subscribe((result: any) => {
        this.universities = result
        this.universitiesLoaded = true;
      },
        error => {
          console.log(error)
          this.alertService.error(error);
        });
  }


  getProfessors() {
    this.sharedService.getProfessors()
      .subscribe((result: any) => {
        this.professors = result
        this.professorsLoaded = true;
      },
        error => {
          console.log(error)
          this.alertService.error(error);
        });
  }


  onSubmit(formControl: FormControl) {
    console.log("submit" + formControl)
    if(formControl.value.name) {
      this.sharedService.changeQuery(formControl.value)
      this.router.navigate(['./search'], { relativeTo: this.route })
    }
    else {
        alert("Wrong university or professor. Please try again!")
    }
  }

}



