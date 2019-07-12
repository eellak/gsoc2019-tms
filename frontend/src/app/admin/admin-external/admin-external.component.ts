import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserService } from '../../shared/services/user.service';
import { AlertService } from '../../shared/services/alert.service';
import { AdminService } from '.././../shared/services/admin.service';


@Component({
  selector: 'app-admin-external',
  templateUrl: './admin-external.component.html',
  styleUrls: ['./admin-external.component.css']
})
export class AdminExternalComponent implements OnInit {

  users:any=[];
  loading=false;
  pager:any={}
 

  constructor( private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private adminService: AdminService) {}


  ngOnInit() {
    this.getExternals(1);
   }
 

   getExternals(page) {
    this.adminService.getExternals(page)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
         this.users=data.docs;
         console.log(this.users)
         this.pager.count=data.count;
         this.pager.pages= data.pages;
         this.pager.currentPage=page;
         console.log(this.users);
     },
     error => {
         this.alertService.error(error);
         this.loading = false;
     });
   }

 
  }

