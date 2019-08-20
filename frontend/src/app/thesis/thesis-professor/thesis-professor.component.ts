import { Component, OnInit } from '@angular/core';
import { UrlSegment, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../shared/services/authentication.service';
import { SharedService } from '../../shared/services/shared.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-thesis-professor',
  templateUrl: './thesis-professor.component.html',
  styleUrls: ['./thesis-professor.component.css']
})
export class ThesisProfessorComponent implements OnInit {
  
  theses:any=[];
  loading=false;
  pager:any={}
  id;
  isLoaded:boolean;
  private routeSub: Subscription;


  constructor( private router : Router
              ,private authenticationService: AuthenticationService,
               private route: ActivatedRoute,
               private sharedService:SharedService,
               private alertService:AlertService ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id=params['id'];
      this.loading=true;
      this.getThesis(1,this.id);
    })
  }

  getThesis(page,professor_id) {
    this.sharedService.getThesisOfProfessor(page,professor_id)
    .subscribe(
     (data:any) => {
          //this.alertService.success('Get user information successful', true);
         this.theses=data.docs;
         console.log(this.theses)
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
}

