 import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
 import {Sort} from '@angular/material/sort';

import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserService } from '../../shared/services/user.service';
import { AlertService } from '../../shared/services/alert.service';
import { AdminService } from '.././../shared/services/admin.service';
import { SharedService } from './../../shared/services/shared.service';

@Component({
  selector: 'app-admin-university',
  templateUrl: './admin-university.component.html',
  styleUrls: ['./admin-university.component.css']
})
export class AdminUniversityComponent implements OnInit {
 
  sortedData:any=[];
  universities:any=[];
  loading=false;
  pager:any={}

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private adminService: AdminService,
    private sharedService:SharedService
  ) {}

  ngOnInit() {
    this.getUniversities(1);

  }
  
  compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
       switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
          default: return 0;
      }
    });
  }

  getUniversities(page) {
    this.sharedService.getUniversities(page)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
         this.universities=data.docs;
         this.sortedData=this.universities.slice()
         console.log(this.universities)
         this.pager.count=data.count;
         this.pager.pages= data.pages;
         this.pager.currentPage=page;
     },
     error => {
         this.alertService.error(error);
         this.loading = false;
     });
   }

   deleteUniversity(university) {
    this.adminService.deleteUniversity(university)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
        console.log(data.message)
        this.getUniversities(this.pager.currentPage)
      },
     error => {
         this.alertService.error(error);
         this.loading = false;
     });
   }




}
