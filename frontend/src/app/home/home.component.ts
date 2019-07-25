import { Component, OnInit } from '@angular/core';
import { UrlSegment, Router, ActivatedRoute } from '@angular/router';
import {Sort} from '@angular/material/sort';

import { AuthenticationService } from './../shared/services/authentication.service';
import { SharedService } from './../shared/services/shared.service';
import { AlertService } from './../shared/services/alert.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  theses:any=[];
  loading=false;
  pager:any={}
  sortedData:any=[];

  constructor( private router : Router
              ,private authenticationService: AuthenticationService,
               private route: ActivatedRoute,
               private sharedService:SharedService,
               private alertService:AlertService ) {}

  ngOnInit() {
      const url=this.router.url;
      if(url.startsWith("/?access_token")) {
        this.route.queryParams
        .subscribe(params => {
          localStorage.setItem('Token',params.access_token);
          localStorage.setItem('Role',params.role);
          localStorage.setItem('Timestamp',''+new Date());
        });
    }
    this.getThesis(1);
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
        default: return 0;
      }
    });
  }

  
  getThesis(page) {
    this.sharedService.getThesis(page)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
         this.theses=data.docs;
         this.sortedData=this.theses.slice();
         console.log(this.theses)
         this.pager.count=data.count;
         this.pager.pages= data.pages;
         this.pager.currentPage=page;
     },
     error => {
         this.alertService.error(error);
         this.loading = false;
     });
   }
}



