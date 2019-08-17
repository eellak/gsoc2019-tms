import { Component, OnInit, OnDestroy } from '@angular/core';
import { UrlSegment, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { SharedService } from '../../shared/services/shared.service';
import { AlertService } from '../../shared/services/alert.service';
import { MatDividerModule, MatCardModule, MatProgressBarModule } from '@angular/material';
import { ProfessorService } from '../../shared/services/professor.service';
import {Sort} from '@angular/material/sort';


@Component({
  selector: 'app-thesis-details',
  templateUrl: './thesis-details.component.html',
  styleUrls: ['./thesis-details.component.css']
})
export class ThesisDetailsComponent implements OnInit , OnDestroy{
  
  private routeSub: Subscription;
  thesis={};
  professor={};
  creator_student;
  creator_external;
  loading=false;
  pager:any={}
  id;
  isLoaded:boolean;
  files;

  constructor( 
              private router : Router,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private sharedService:SharedService,
              private alertService:AlertService,
              private professorService:ProfessorService
             ) {}

  ngOnInit() {
    this.loading=true;
    this.routeSub = this.route.params.subscribe(params => {
      this.id=params['id'];
      this.sharedService.getThesisById(this.id)
      .subscribe(
       (data:any) => {
            //this.alertService.success('Get user information successful', true);
           this.thesis=data;
           this.professor=data.professor;
           this.creator_external=data.creator_external;
           this.creator_student=data.creator_student;
           console.log(this.thesis)
           this.isLoaded=true;
           this.getFiles()
       },
       error => {
           this.alertService.error(error);
           this.loading = false;
       });
    });
   }

   compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.files.slice();
    this.files= data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
       switch (sort.active) {
         case 'file': return this.compare(a.title, b.title, isAsc);
        default: return 0;
      }
    });
  }

   getFiles() {
    this.loading=true;
    this.sharedService.getFilesThesis(this.id)
    .subscribe(
      (files:any) => {
           console.log(files)
           this.files=files
          this.loading=false;
        },
      error => {
          this.alertService.error(error);
       });
  }


  createAndDownloadBlobFile(body, filename) {
    const blob = new Blob([body],{type: "application/pdf"});
    const fileName = `${filename}`;
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  downloadDraft(file) {
      this.loading=true;
       this.sharedService.getFile(file._id)
      .subscribe(
        (file:any) => {
           console.log("Returned file"+file.file_name)
             var byteArray = new Uint8Array(file.file_data.data);
             this.createAndDownloadBlobFile(byteArray, file.file_name);
            this.loading=false;
          },
        error => {
            this.alertService.error(error);
         });
    }
      

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }


}


   




