import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
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
  sortedData:any=[];
  message;

  constructor( private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private adminService: AdminService,
    private route: ActivatedRoute) {}


  ngOnInit() {
    this.loading=true;
    this.getExternals(1);
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
        case 'email': return this.compare(a.email, b.email, isAsc);
        case 'active': return this.compare(a.active, b.active, isAsc);
         default: return 0;
      }
    });
  }

   getExternals(page) {
    this.adminService.getExternals(page)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
         this.users=data.docs;
         this.sortedData=this.users.slice();
         console.log(this.users)
         this.pager.count=data.count;
         this.pager.pages= data.pages;
         this.pager.currentPage=page;
         this.loading=false;
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
          this.message=" "
          this.getExternals(this.pager.currentPage)
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
        this.getExternals(this.pager.currentPage)
      },
     error => {
         this.alertService.error(error);
         this.loading = false;
     });
   }




 
  }

