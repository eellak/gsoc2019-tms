import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorThesisComponent } from './professor-thesis.component';

describe('ProfessorThesisComponent', () => {
  let component: ProfessorThesisComponent;
  let fixture: ComponentFixture<ProfessorThesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorThesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorThesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
