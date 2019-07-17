 import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';

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


  getUniversities(page) {
    this.sharedService.getUniversities(page)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
         this.universities=data.docs;
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
