import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../../shared/services/alert.service';
import {AuthenticationService} from '../../shared/services/authentication.service';


@Component({
  selector: 'app-thesis-create',
  templateUrl: './thesis-create.component.html',
  styleUrls: ['./thesis-create.component.css']
})
export class ThesisCreateComponent implements OnInit {
  createThesisForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.createThesisForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])],
        password: ['', Validators.required]
    });
  }

  get f() { return this.createThesisForm.controls; }

}
