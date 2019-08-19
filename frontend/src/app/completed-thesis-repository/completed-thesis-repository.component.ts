import { AlertService } from './../shared/services/alert.service';
import { SharedService } from './../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-completed-thesis-repository',
  templateUrl: './completed-thesis-repository.component.html',
  styleUrls: ['./completed-thesis-repository.component.css']
})
export class CompletedThesisRepositoryComponent implements OnInit {
  loading=false;
  count=0;
  pager:any={}
  sortedData:any=[];
  files = [];
  isLoaded=false;
  fileLoaded=[];

  constructor(private sharedService:SharedService, 
              private alertService:AlertService) {
    }

  ngOnInit() {
    this.loading=true;
   this.getThesis(1)
   }

  compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  
  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      console.log(a.title)
      switch (sort.active) {
        case 'created_time': return this.compare(a.created_time, b.created_time, isAsc);
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'assigned': return this.compare(a.assigned, b.assigned, isAsc);
        default: return 0;
      }
    });
  }

  getThesis(page) {
    this.sharedService.getCompletedThesis(page)
    .subscribe(
    (data:any) => {
           //this.alertService.success('Get user information successful', true);
        this.sortedData=data.docs;
        this.count=data.count;
        this.pager.count=data.count;
        this.pager.pages= data.pages;
        this.pager.currentPage=page;
        this.loading=false;
        for(let i=0;i<this.count;i++) {
          this.getFiles(this.sortedData[i]._id,i)
        }
        this.isLoaded=true;
     },
    error => {
        this.alertService.error(error);
        this.loading = false;
    });
  }

  getFiles(thesisId,index) {
     this.loading=true;
     this.sharedService.getCompletedFileThesis(thesisId)
    .subscribe(
      (files:any) => {
             if(files.length>0) {
           this.files[index]=files
            this.loading=false;
            this.fileLoaded[index]=true;
           }
           
        },
      error => {
          console.log(error)
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
        this.sharedService.getCompletedFileThesisData(file._id)
      .subscribe(
        (result:any) => {
           console.log(result)
             var byteArray = new Uint8Array(result[0].file_data.data);
             this.createAndDownloadBlobFile(byteArray, file.file_name);
            this.loading=false;
          },
        error => {
            this.alertService.error(error);
         });
    }


}