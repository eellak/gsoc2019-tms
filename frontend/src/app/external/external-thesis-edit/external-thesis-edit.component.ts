import { SharedService } from './../../shared/services/shared.service';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../shared/services/alert.service';
import { ExternalService } from './../../shared/services/external.service';


@Component({
  selector: 'app-external-thesis-edit',
  templateUrl: './external-thesis-edit.component.html',
  styleUrls: ['./external-thesis-edit.component.css']
})
export class ExternalThesisEditComponent implements OnInit {
  fontsize="16px"  
  private routeSub: Subscription;
  thesis={};
  professor={};
  creator_student;
  creator_external;
  loading=false;
  pager:any={}
  id;
  isLoaded:boolean;
   message;
   files;
   fileToUpload: File = null;

      constructor( 
        private router : Router,
        private route: ActivatedRoute,
        private externalService:ExternalService,
        private alertService:AlertService,
        private sharedService:SharedService ) {}
    
 
  
 

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id=params['id'];
      this.externalService.getPendingById(this.id)
      .subscribe(
       (data:any) => {
            //this.alertService.success('Get user information successful', true);
           this.thesis=data[0];
           this.professor=data[0].professor;
           this.creator_external=data[0].creator_external;
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
  
   handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

   onSave() {
      this.externalService.putThesis(this.id,this.thesis)
      .subscribe(
        (data:any) => {
          console.log(data)
          this.message=data;
          if(this.fileToUpload) {
          this.externalService.postPdfThesis(this.fileToUpload, this.id)
          .subscribe(
            (result: any) => {
              this.message = "success"
              this.router.navigate(['../../thesis'], { relativeTo: this.route })
            },
        error => {
          this.alertService.error(error);
        })
      }
      else {
        setTimeout(() =>  {
          this.router.navigate(['../../thesis'], { relativeTo: this.route })
      }
      ,1500);
      }
      })
   }

   onCancel() {
     this.ngOnInit();
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

    deleteFile(file) {
      this.externalService.deleteFile(this.id,file._id)
      .subscribe( (result:any) => {
            console.log(result)

          }
      )
    }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
