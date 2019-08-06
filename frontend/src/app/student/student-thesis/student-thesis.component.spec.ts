import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentThesisComponent } from './student-thesis.component';

describe('StudentThesisComponent', () => {
  let component: StudentThesisComponent;
  let fixture: ComponentFixture<StudentThesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentThesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentThesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
