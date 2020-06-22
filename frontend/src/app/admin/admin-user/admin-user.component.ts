import { Router, ActivatedRoute } from '@angular/router';
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

  roles = [
    'Guest',
    'Professor',
    'Secretariat',
    'Student'
  ]
  ischanged = false;
  newRole;

  constructor( private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private adminService: AdminService) {}

  ngOnInit() {
    this.loading=true;
    this.getUsers(1);
  }

  onChange(newRole) {
    console.log(' and the change is: ' + newRole);
    this.ischanged = true;
    this.newRole = newRole;
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

   updateUser(user){
    if(confirm("You are about to change the role of the user with email: " + user.email + " from " + user.role + " to " + this.newRole + ".          Are you sure?")){ 
    console.log(user._id + ' andd ' + user.role );
    user.role = this.newRole;
    console.log('The new role is: ' + user.role);
    this.adminService.putUser(user._id, user.role)
    .subscribe(
      (data:any) => {
        console.log(data)
        // this.message=data;
        setTimeout(() =>  {
          this.router.navigate(['../../'], { relativeTo: this.route})
        }
        ,1500);

      },
      error => {
        this.alertService.error(error);
      }
    )
   }
  }
 
  }



