import { Component, OnInit, OnDestroy } from '@angular/core';
import { UrlSegment, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { SharedService } from '../../shared/services/shared.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-thesis-details',
  templateUrl: './thesis-details.component.html',
  styleUrls: ['./thesis-details.component.css']
})
export class ThesisDetailsComponent implements OnInit , OnDestroy{
  
  private routeSub: Subscription;
  thesis={};
  professor={};
  creator_student;
  creator_external;
  loading=false;
  pager:any={}
  id;
  isLoaded:boolean;

  constructor( 
              private router : Router,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private sharedService:SharedService,
              private alertService:AlertService ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id=params['id'];
      this.sharedService.getThesisById(this.id)
      .subscribe(
       (data:any) => {
         console.log(data)
            //this.alertService.success('Get user information successful', true);
           this.thesis=data;
           this.professor=data.professor;
           this.creator_external=data.creator_external;
           this.creator_student=data.creator_student;
           console.log(this.thesis)
           this.isLoaded=true;
       },
       error => {
           this.alertService.error(error);
           this.loading = false;
       });
    });
   }
  

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }


}


   




