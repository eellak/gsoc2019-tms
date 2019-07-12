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
  message:any;

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
    const role=this.authenticationService.getRole()
    if(role==="External" || role==="Admin") {
      this.authenticationService.logout();
    }
    else {
      this.authenticationService.sso_logout();
    }
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  isAdmin() {    
    if(localStorage.getItem('Role')==="Admin")
      return true;
    else
      return false;
  }
}
