import { Component, OnInit } from '@angular/core';
import { UrlSegment, Router, ActivatedRoute } from '@angular/router';
 
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
  
  getThesis(page) {
    this.sharedService.getThesis(page)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
         this.theses=data.docs;
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



