import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Title }     from '@angular/platform-browser';

import {User} from './shared/models/user.model';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private titleService: Title
) {}

 ngOnInit() {
  this.titleService.setTitle( "Thesis Management System");
 }

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
 
}

