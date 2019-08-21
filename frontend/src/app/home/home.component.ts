import { map, startWith } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { UrlSegment, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SharedService } from './../shared/services/shared.service';
import { AlertService } from './../shared/services/alert.service';
import { FormControl } from '@angular/forms';
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

  @Input() selectedProfessor: any;


  professorsLoaded;
  universitiesLoaded;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private alertService: AlertService,
    private location: Location) { }

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

  displayProfessor(professor) {
    if (professor) {
      return professor.name + " " + professor.lastname;
    }
    else return undefined;
  }


  private _filterProfessor(value) {
    console.log(value)
    var filterValue;
    if (typeof value === 'object') {
      filterValue = value.lastname.toLowerCase()
    }
    else {
      filterValue = value.toLowerCase();
    }
    return this.professors.filter(option => {
      const optionString = option.name.toString().toLowerCase() +" "+ option.lastname.toString().toLowerCase();
      return optionString.includes(filterValue);
    });
  }

  private _filterUniversity(value): string[] {
    console.log(value)
    const filterValue = value.toLowerCase();

    return this.universities.filter(option => option.name.toString().toLowerCase().includes(filterValue));
  }

  getUniversities() {
    this.sharedService.getUniversitiesNoPages()
      .subscribe((result: any) => {
        console.log(result)
        this.universities = result
        this.universitiesLoaded = true;
      })
  }


  getProfessors() {
    this.sharedService.getProfessors()
      .subscribe((result: any) => {
        this.professors = result
        this.professorsLoaded = true;
      })
  }
}



