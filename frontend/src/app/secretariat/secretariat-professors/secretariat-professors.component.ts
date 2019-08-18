import { AlertService } from './../../shared/services/alert.service';
import { SecretariatService } from './../../shared/services/secretariat.service';
import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-secretariat-professors',
  templateUrl: './secretariat-professors.component.html',
  styleUrls: ['./secretariat-professors.component.css']
})
export class SecretariatProfessorsComponent implements OnInit {

  loading=false;
  count=0;
  pager:any={}
  sortedData:any=[];
  assigned;
  not_assigned;

  constructor( private secretariatService:SecretariatService,
                private alertService:AlertService
              ) { }

  ngOnInit() {
    this.loading=true;
     this.getProfessors(1);

  }

  compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


sortData(sort: Sort) {
  const data = this.sortedData.slice();
  this.sortedData = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
     switch (sort.active) {
      case 'name': return this.compare(a.name, b.name, isAsc);
      case 'lastname': return this.compare(a.lastname, b.lastname, isAsc);
      case 'email': return this.compare(a.email, b.email, isAsc);
      default: return 0;
    }
  });

}

getProfessors(page) {
  this.secretariatService.getProfessors(page)
  .subscribe(
  (data:any) => {
      console.log(data);
      this.count=data.count;
      this.pager.count=data.count;
      this.pager.pages= data.pages;
      this.pager.currentPage=page;
      this.sortedData=data.docs;
      this.loading=false;
   },
  error => {
      this.alertService.error(error);
      this.loading = false;
  });
}
 

}
