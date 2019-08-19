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
  loading;
  thesisToUpload:File =null;
  message2= ' ';
 completedThesis= null;
 fileLoaded=false;;

  constructor(private studentService:StudentService, 
    private alertService:AlertService,
    private router : Router,
    private route: ActivatedRoute) 
    { }


  ngOnInit() {
    this.loading=true;
    this.getThesis()
    }

  compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.drafts.slice();
    this.drafts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
       switch (sort.active) {
        case 'created_time': return this.compare(a.created_time, b.created_time, isAsc);
        case 'draft': return this.compare(a.title, b.title, isAsc);
        default: return 0;
      }
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  handleThesisInput(files: FileList) {
    this.thesisToUpload = files.item(0);
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

  uploadThesisToActivity() {
    this.message2="loading";
    this.studentService.postCompletedFile(this.thesisToUpload,this.assigned._id)
    .subscribe(
      data => {
        console.log(data)
        this.message2="success";
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
           if(this.assigned.completed) {
            this.getCompletedThesis()
           }
           this.loading=false;
         
      },
      error => {
          this.alertService.error(error);
       });
    }

    getDrafts() {
      this.loading=true;
      this.studentService.getDrafts(this.assigned._id)
      .subscribe(
        (drafts:any) => {
             console.log(drafts)
             this.drafts=drafts
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

    downloadDraft(draft) {
         this.studentService.getDraftById(this.assigned._id,draft._id)
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

      getCompletedThesis() {
         this.studentService.getCompletedFileThesisById(this.assigned._id)
        .subscribe(
          (completedThesis:any) => {
             console.log(completedThesis)
             this.completedThesis=completedThesis[0]
             this.fileLoaded=true;
            },
            error => {
                this.alertService.error(error);
          })
      }

      downloadCompletedThesis() {
              var byteArray = new Uint8Array(this.completedThesis.file_data.data);
              this.createAndDownloadBlobFile(byteArray, this.completedThesis.file_name);
             this.loading=false;
     }
        
    }
 