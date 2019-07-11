import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';


import { AuthenticationService } from '../shared/services/authentication.service';
import { UserService } from '../shared/services/user.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    user:any={};
    loading=false;

  constructor( private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loading=true;
    this.userService.getUser()
    .subscribe(
        (data:any) => {
            //this.alertService.success('Get user information successful', true);
            this.user=data.userData;
            console.log(this.user);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });

      }
}


