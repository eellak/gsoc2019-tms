import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorAssignedComponent } from './professor-assigned.component';

describe('ProfessorAssignedComponent', () => {
  let component: ProfessorAssignedComponent;
  let fixture: ComponentFixture<ProfessorAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
