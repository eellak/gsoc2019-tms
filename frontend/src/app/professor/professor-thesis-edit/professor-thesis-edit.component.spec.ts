import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorThesisEditComponent } from './professor-thesis-edit.component';

describe('ProfessorThesisEditComponent', () => {
  let component: ProfessorThesisEditComponent;
  let fixture: ComponentFixture<ProfessorThesisEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorThesisEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorThesisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
