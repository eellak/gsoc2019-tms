import { Component, OnInit } from '@angular/core';
import { UrlSegment, Router, ActivatedRoute } from '@angular/router';
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
              private route: ActivatedRoute
            ) { }

  ngOnInit() {
      const url=this.router.url;
      if(url.startsWith("/?access_token")) {
        this.route.queryParams
        .subscribe(params => {
          localStorage.setItem('Token',params.access_token);
          localStorage.setItem('Role',params.role);
        });
    }
  }
}



