import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';

import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserService } from '../../shared/services/user.service';
import { AlertService } from '../../shared/services/alert.service';
import { AdminService } from '.././../shared/services/admin.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  users:any=[];
  loading=false;
  pager:any={}
  sortedData:any=[];

  constructor( private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private adminService: AdminService) {}

  ngOnInit() {
    this.loading=true;
    this.getUsers(1);
  }

  
  compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
       switch (sort.active) {
        case 'lastname': return this.compare(a.lastname, b.lastname, isAsc);
        case 'role': return this.compare(a.role, b.role, isAsc);
        case 'name': return this.compare(a.role, b.role, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);
         default: return 0;
      }
    });
  }


  getUsers(page) {
    this.adminService.getUsers(page)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
         this.users=data.docs;
         this.sortedData=this.users.slice();
         this.pager.count=data.count;
         this.pager.pages= data.pages;
         this.pager.currentPage=page;
         this.loading=false;
         console.log(this.users);
     },
     error => {
         this.alertService.error(error);
         this.loading = false;
     });
   }

   deleteUser(user) {
    this.adminService.deleteUser(user)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
        console.log(data.message)
        this.getUsers(this.pager.currentPage)
      },
     error => {
         this.alertService.error(error);
         this.loading = false;
     });
   }

 
  }



