import { Component, OnInit } from '@angular/core';
import { UrlSegment, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from './../shared/services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private location: Location, private router : Router
              ,private authenticationService: AuthenticationService,
            ) { }

  ngOnInit() {
      const url=this.router.url;
      if(url.startsWith("/#access_token")) {
         const token=url.slice(15); 
        localStorage.setItem('currentUser', token);
      }
  }



}
