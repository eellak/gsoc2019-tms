import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { UrlSegment, Router, ActivatedRoute } from '@angular/router';
 
import { AuthenticationService } from './../shared/services/authentication.service';
import { SharedService } from './../shared/services/shared.service';
import { AlertService } from './../shared/services/alert.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit , DoCheck {


   role;

  constructor( private router : Router
    ,private authenticationService: AuthenticationService,
     private route: ActivatedRoute,
     private sharedService:SharedService,
     private alertService:AlertService ) {}
 
 
 
     ngOnInit() {
      this.role=localStorage.getItem('Role');
      console.log(this.role)
      this.router.events.subscribe((val) => {
        this.role=localStorage.getItem('Role');
      })

    }


    ngDoCheck() {
      this.role=localStorage.getItem('Role');
    }
  }

    