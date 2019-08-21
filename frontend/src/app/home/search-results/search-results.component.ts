import { map, startWith } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Sort} from '@angular/material/sort';

import { SharedService } from '../../shared/services/shared.service';
import { AlertService } from '../../shared/services/alert.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  private subscription: Subscription;

  sortedData
  theses;
  pager: any = {}
  message;
loading;
  searchQuery;
  professor_id;
  university_id;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private location: Location,
    private sharedService: SharedService) { }


  ngOnInit() {
    this.subscription = this.sharedService.currentQuery.
      subscribe((searchQuery: any) => {
        this.searchQuery = searchQuery;        ////////check if searchquery is for professor or university
        if (this.searchQuery.lastname) {
          this.professor_id = this.searchQuery._id
        }
        else {
          this.university_id = this.searchQuery._id;
        }
        this.getTheses(1)
      })
  }

  compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
       switch (sort.active) {
        case 'created_time': return this.compare(a.created_time, b.created_time, isAsc);
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'professor': return this.compare(a.professor.lastname, b.professor.lastname, isAsc);
        case 'university': return this.compare(a.university.name, b.university.name, isAsc);
        default: return 0;
      }
    });
  }

  
  getTheses(page) {
    this.loading=true;
    this.sharedService.getThesis(page, this.university_id, this.professor_id)
      .subscribe((result: any) => {
        console.log(result)
        this.sortedData = result.docs;
        this.pager.count = result.count;
        this.pager.pages = result.pages;
        this.pager.currentPage = page;
        this.loading=false;
      },
      error => {
          this.alertService.error(error);
          this.loading = false;
      });
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
