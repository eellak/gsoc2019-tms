import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { User } from '../shared/models/user.model';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
}

  ngOnInit() {
  }

  logout() {
    //this.authenticationService.logout();
    //this.router.navigate(['/login']);
    this.authenticationService.sso_logout();

  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
}
