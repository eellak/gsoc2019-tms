import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginGuard } from './shared/guards/login.guard';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatSortModule, MatDividerModule, MatCardModule, MatProgressBarModule, MatAutocompleteModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginExternalComponent } from './login/login-external/login-external.component';
import { RegisterExternalComponent } from './register-external/register-external.component';
import { AlertComponent } from './alert/alert.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminExternalComponent } from './admin/admin-external/admin-external.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
 import { CreateUserComponent } from './admin/admin-user/create-user/create-user.component';
import { CreateUniversityComponent } from './admin/create-university/create-university.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AdminUniversityComponent } from './admin/admin-university/admin-university.component';
import { ThesisDetailsComponent } from './thesis/thesis-details/thesis-details.component';
import { ThesisProfessorComponent } from './thesis/thesis-professor/thesis-professor.component';
import { ProfessorComponent } from './professor/professor.component';
import { ProfessorAssignedComponent } from './professor/professor-assigned/professor-assigned.component';
import { ProfessorPendingComponent } from './professor/professor-pending/professor-pending.component';
import { ProfessorRequestsComponent } from './professor/professor-requests/professor-requests.component';
import { ProfessorThesisComponent } from './professor/professor-thesis/professor-thesis.component';
import { ProfessorThesisEditComponent } from './professor/professor-thesis-edit/professor-thesis-edit.component';
import { ThesisCreateComponent } from './thesis/thesis-create/thesis-create.component';
import {MatSelectModule} from '@angular/material';
import {AutosizeModule} from 'ngx-autosize';
import { AdminActivateExternalsComponent } from './admin/admin-activate-externals/admin-activate-externals.component';
import { StudentComponent } from './student/student.component';
import { StudentThesisComponent } from './student/student-thesis/student-thesis.component';
import { StudentAssignedComponent } from './student/student-assigned/student-assigned.component';
import { StudentRequestsComponent } from './student/student-requests/student-requests.component';
import { StudentPendingComponent } from './student/student-pending/student-pending.component';
import { StudentCreatePendingComponent } from './student/student-create-pending/student-create-pending.component';
import { ExternalComponent } from './external/external.component';
import { ExternalThesisComponent } from './external/external-thesis/external-thesis.component';
import { ExternalCreatePendingComponent } from './external/external-create-pending/external-create-pending.component';
import { ExternalThesisEditComponent } from './external/external-thesis-edit/external-thesis-edit.component';
import { SecretariatComponent } from './secretariat/secretariat.component';
import { SecretariatStudentsComponent } from './secretariat/secretariat-students/secretariat-students.component';
import { SecretariatProfessorsComponent } from './secretariat/secretariat-professors/secretariat-professors.component';
import { CompletedThesisRepositoryComponent } from './completed-thesis-repository/completed-thesis-repository.component';
import { ProfessorSuperviseComponent } from './professor/professor-supervise/professor-supervise.component';
import { ProfessorSupervisorThesisComponent } from './professor/professor-supervisor-thesis/professor-supervisor-thesis.component';
import { SearchResultsComponent } from './home/search-results/search-results.component';
import { LoginLdapComponent } from './login/login-ldap/login-ldap.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginExternalComponent,
    RegisterExternalComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    AdminComponent,
    AdminExternalComponent,
    AdminUserComponent,
    CreateUserComponent,
    CreateUniversityComponent,
    SidenavComponent,
    AdminUniversityComponent,
    ThesisDetailsComponent,
    ThesisProfessorComponent,
    ProfessorComponent,
    ProfessorAssignedComponent,
    ProfessorPendingComponent,
    ProfessorRequestsComponent,
    ProfessorThesisComponent,
    ProfessorThesisEditComponent,
    ThesisCreateComponent,
    AdminActivateExternalsComponent,
    StudentComponent,
    StudentThesisComponent,
    StudentAssignedComponent,
    StudentRequestsComponent,
    StudentPendingComponent,
    StudentCreatePendingComponent,
    ExternalComponent,
    ExternalThesisComponent,
    ExternalCreatePendingComponent,
    ExternalThesisEditComponent,
    SecretariatComponent,
    SecretariatStudentsComponent,
    SecretariatProfessorsComponent,
    CompletedThesisRepositoryComponent,
    ProfessorSuperviseComponent,
    ProfessorSupervisorThesisComponent,
    SearchResultsComponent,
    LoginLdapComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    AutosizeModule,
    MatSortModule,
    MatDividerModule,
    MatCardModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } ,
               {provide:HTTP_INTERCEPTORS, useClass:HttpErrorInterceptor,multi:true},
               Title
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
