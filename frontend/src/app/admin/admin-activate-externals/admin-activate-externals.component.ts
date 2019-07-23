import { Router, Route, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserService } from '../../shared/services/user.service';
import { AlertService } from '../../shared/services/alert.service';
import { AdminService } from '.././../shared/services/admin.service';

@Component({
  selector: 'app-admin-activate-externals',
  templateUrl: './admin-activate-externals.component.html',
  styleUrls: ['./admin-activate-externals.component.css']
})
export class AdminActivateExternalsComponent implements OnInit {

  users:any=[];
  loading=false;
  pager:any={}
  message;
  length=-1;

  constructor( private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private adminService: AdminService,
    private route: ActivatedRoute) {}


  ngOnInit() {
    this.getNotActiveExternals(1);
   }
 

   getNotActiveExternals(page) {
    this.adminService.getNotActiveExternals(page)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
         this.users=data.docs;
         console.log(this.users)
         this.pager.count=data.count;
         this.pager.pages= data.pages;
         this.pager.currentPage=page;
     },
     error => {
         this.alertService.error(error);
         this.loading = false;
     });
   }

   onActivate(id) {
      this.adminService.activateExternal(id)
      .subscribe(
        (data:any) =>{
          console.log(data)
          this.message="success"
          setTimeout(() =>  {
            this.router.navigate(['../external'], { relativeTo: this.route})
        }
        ,2000);
        },
        error => {
        console.log(error)
        });
      }



   deleteExternal(user) {
    this.adminService.deleteExternal(user)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
        console.log(data.message)
       },
     error => {
         this.alertService.error(error);
         this.loading = false;
     });
   }




 
  }

