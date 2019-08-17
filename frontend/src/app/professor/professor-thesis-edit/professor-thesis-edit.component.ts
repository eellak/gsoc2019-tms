import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
 
import { AlertService } from '../../shared/services/alert.service';
import { ProfessorService } from './../../shared/services/professor.service';
 

@Component({
  selector: 'app-professor-thesis-edit',
  templateUrl: './professor-thesis-edit.component.html',
  styleUrls: ['./professor-thesis-edit.component.css']
})
export class ProfessorThesisEditComponent implements OnInit {
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
   message
  constructor( 
     private router : Router,
     private route: ActivatedRoute,
     private professorService:ProfessorService,
    private alertService:AlertService ) {}
    
 
  
 

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id=params['id'];
      this.professorService.getThesisById(this.id)
      .subscribe(
       (data:any) => {
            //this.alertService.success('Get user information successful', true);
           this.thesis=data;
           this.professor=data.professor;
           this.creator_external=data.creator_external;
           this.creator_student=data.creator_student;
           console.log(this.thesis)
           this.isLoaded=true;
       },
       error => {
           this.alertService.error(error);
           this.loading = false;
       });
    });
   }
  
   

   onSave() {
      this.professorService.putThesis(this.id,this.thesis)
      .subscribe(
        (data:any) => {
          console.log(data)
          this.message=data;
          setTimeout(() =>  {
            this.router.navigate(['../../thesis'], { relativeTo: this.route})
          }
          ,1500);

        },
        error => {
          this.alertService.error(error);
        }
      )
   }

   onCancel() {

   }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
