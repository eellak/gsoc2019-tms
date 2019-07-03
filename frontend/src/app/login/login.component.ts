import { Component, OnInit } from '@angular/core';
import {External} from '../shared/models/external.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:External = new External("some@gmail.com");

  ngOnInit() {
    this.user.email="new@gmail.com";
    this.user.password="123456";

  }
  tryLogin() {

    console.log("inside try login");
  }
}
