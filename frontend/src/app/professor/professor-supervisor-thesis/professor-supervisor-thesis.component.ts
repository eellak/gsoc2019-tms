import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../shared/services/alert.service';
import { ProfessorService } from './../../shared/services/professor.service';
import { Sort } from '@angular/material/sort';


@Component({
  selector: 'app-professor-supervisor-thesis',
  templateUrl: './professor-supervisor-thesis.component.html',
  styleUrls: ['./professor-supervisor-thesis.component.css']
})
export class ProfessorSupervisorThesisComponent implements OnInit {
  theses;
  loading;
  count;
  drafts=[];
  draftLoaded;

  constructor(private professorService: ProfessorService, private alertService: AlertService) { }

  ngOnInit() {
    this.loading = true;
    this.getThesisSupervise();
  }



  getThesisSupervise() {
    this.professorService.getThesisSupervise()
      .subscribe((result: any) => {
        console.log(result)
        this.theses = result
        this.count = result.length;
        this.loading = false;
        for (let i = 0; i < this.count; i++) {
          this.getDrafts(this.theses[i]._id, i)
        }
      },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  getDrafts(assigned_id, index) {
    this.draftLoaded = false;
    this.professorService.getDrafts(assigned_id)
      .subscribe(
        (drafts: any) => {
          console.log(drafts)
          if (drafts.length > 0) {
            this.drafts[index] = drafts
            this.draftLoaded = true;
          }
        },
        error => {
          console.log(error)
          this.alertService.error(error);
        });
  }

  createAndDownloadBlobFile(body, filename) {
    const blob = new Blob([body], { type: "application/pdf" });
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
    this.professorService.getDraftById(draft.assigned_thesis, draft._id)
      .subscribe(
        (draft: any) => {
           var byteArray = new Uint8Array(draft[0].data.data);
          this.createAndDownloadBlobFile(byteArray, draft[0].name);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
        });
  }
}
