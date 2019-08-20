import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { ProfessorService } from './../../shared/services/professor.service';
import { Sort } from '@angular/material/sort';



@Component({
  selector: 'app-professor-supervise',
  templateUrl: './professor-supervise.component.html',
  styleUrls: ['./professor-supervise.component.css']
})
export class ProfessorSuperviseComponent implements OnInit {
  sortedData: any = [];
  messageReject;
  message;
  loading;
  count;

  constructor(private professorService: ProfessorService) { }

  ngOnInit() {
    this.loading = true;
    this.getSupervisePending()
  }


  compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'created_time': return this.compare(a.created_time, b.created_time, isAsc);
        case 'title': return this.compare(a.thesis.title, b.thesis.title, isAsc);
        case 'student': return this.compare(a.student.lastname, b.student.lastname, isAsc);
        case 'apply': return this.compare(a.applied, b.applied, isAsc);
        default: return 0;
      }
    });
  }


  getSupervisePending() {
    this.professorService.getSupervisePending()
      .subscribe((result: any) => {
        this.sortedData = result;
        this.count = result.length
        this.loading = false;
        console.log(result)
      })
  }

  acceptRequest(request) {
    this.professorService.acceptSuperviceRequest(request._id)
      .subscribe((result: any) => {
        console.log(result)
        this.message = "success"
        setTimeout(() =>  {
          this.message=""
          this.getSupervisePending()
        }
        ,2000);
      })
  }

  rejectRequest(request) {
    this.professorService.deleteSuperviceRequest(request._id)
      .subscribe((result: any) => {
        console.log(result)
        this.messageReject = "success"
        setTimeout(() =>  {
          this.messageReject=""
          this.getSupervisePending()
        }
        ,2000);
    })
  }

}
