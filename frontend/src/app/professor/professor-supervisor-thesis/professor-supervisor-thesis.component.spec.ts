import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSupervisorThesisComponent } from './professor-supervisor-thesis.component';

describe('ProfessorSupervisorThesisComponent', () => {
  let component: ProfessorSupervisorThesisComponent;
  let fixture: ComponentFixture<ProfessorSupervisorThesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorSupervisorThesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorSupervisorThesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
