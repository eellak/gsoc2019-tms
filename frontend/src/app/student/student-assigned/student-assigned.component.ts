import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { ProfessorService } from './../../shared/services/professor.service';
import {Sort} from '@angular/material/sort';
import { StudentService } from './../../shared/services/student.service';
 

@Component({
  selector: 'app-student-assigned',
  templateUrl: './student-assigned.component.html',
  styleUrls: ['./student-assigned.component.css']
})
export class StudentAssignedComponent implements OnInit {
  assigned:any={};
  count=0;
  isLoaded=false;
  fileToUpload: File = null;
  message=' ';
  drafts;

  constructor(private studentService:StudentService, 
    private alertService:AlertService,
    private router : Router,
    private route: ActivatedRoute) 
    { }


  ngOnInit() {
    this.getThesis()
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.message="loading";
    this.studentService.postDraft(this.fileToUpload,this.assigned._id)
    .subscribe(
      data => {
        console.log(data)
        this.message="success";
       }, 
       error => {
        console.log(error);
      });
  }

  getThesis() {
     this.studentService.getThesis()
    .subscribe(
      (data:any) => {
        this.count=data.length;
           this.assigned=data[0];
           this.isLoaded=true;
           console.log(data)
         
      },
      error => {
          this.alertService.error(error);
       });
    }

    getDrafts() {
      this.studentService.getDrafts(this.assigned._id)
      .subscribe(
        (drafts:any) => {
             console.log(drafts)
             this.drafts=drafts
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

    downloadDraft(draft) {
        console.log(draft.name)
        console.log(draft.data.data)
         this.createAndDownloadBlobFile(draft.data.data, draft.name);
    }
}
