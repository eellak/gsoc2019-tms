import { Component, OnInit } from '@angular/core';
import { UrlSegment, Router, ActivatedRoute } from '@angular/router';
 
import { AuthenticationService } from './../shared/services/authentication.service';
import { SharedService } from './../shared/services/shared.service';
import { AlertService } from './../shared/services/alert.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor( private router : Router
    ,private authenticationService: AuthenticationService,
     private route: ActivatedRoute,
     private sharedService:SharedService,
     private alertService:AlertService ) {}
  ngOnInit() {
  }

  isAdmin() {    
    if(localStorage.getItem('Role')==="Admin")
      return true;
    else
      return false;
  }

  isProfessor() {
  if(localStorage.getItem('Role')==="Professor")
    return true;
  else
    return false;
  }

  isStudent() {
    if(localStorage.getItem('Role')==="Student")
      return true;
    else
      return false;
    }

}
