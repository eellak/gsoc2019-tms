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
 files;
 

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
        console.log(data)
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
     },
    error => {
        this.alertService.error(error);
        this.loading = false;
    });
  }

  getFiles(thesisId,index) {
    console.log(thesisId)
    this.loading=true;
     this.sharedService.getFilesThesis(thesisId)
    .subscribe(
      (files:any) => {
           console.log(files)
           if(files.length>0) {
           this.files[index]=files
            this.loading=false;
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
       this.sharedService.getFile(file._id)
      .subscribe(
        (file:any) => {
           console.log(file)
             var byteArray = new Uint8Array(file[0].data.data);
             this.createAndDownloadBlobFile(byteArray, file[0].name);
            this.loading=false;
          },
        error => {
            this.alertService.error(error);
         });
    }


}