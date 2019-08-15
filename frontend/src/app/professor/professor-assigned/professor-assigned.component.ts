import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { ProfessorService } from './../../shared/services/professor.service';
import {Sort} from '@angular/material/sort';


@Component({
  selector: 'app-professor-assigned',
  templateUrl: './professor-assigned.component.html',
  styleUrls: ['./professor-assigned.component.css']
})
export class ProfessorAssignedComponent implements OnInit {
  theses:any=[];
  loading;
  count=0;
  pager:any={}
  sortedData:any=[];
  drafts={};

  constructor(private professorService:ProfessorService, private alertService:AlertService) { }

  ngOnInit() {
    this.loading=true;
   this.getAssignedThesis(1)
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
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'student': return this.compare(a.lastname, b.lastname, isAsc);
        case 'draft': return this.compare(a.title, b.title, isAsc);
        case 'draft_created_time': return this.compare(a.title, b.title, isAsc);

        default: return 0;
      }
    });
  }

  getAssignedThesis(page) {
    this.professorService.getAssigned(page)
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
          this.getDrafts(this.sortedData[i]._id,i)
        }
        
       
     },
    error => {
        this.alertService.error(error);
        this.loading = false;
    });
  }

  getDrafts(assigned_id,index) {
    this.loading=true;
    console.log(assigned_id+" index " + index)
     this.professorService.getDrafts(assigned_id)
    .subscribe(
      (drafts:any) => {
           console.log(drafts)
           this.drafts[index]=drafts
            this.loading=false;
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

  downloadDraft(draft) {
       this.professorService.getDraftById(draft.assigned_thesis,draft._id)
      .subscribe(
        (draft:any) => {
           console.log(draft)
             var byteArray = new Uint8Array(draft[0].data.data);
             this.createAndDownloadBlobFile(byteArray, draft[0].name);
            this.loading=false;
          },
        error => {
            this.alertService.error(error);
         });
    }
      

}