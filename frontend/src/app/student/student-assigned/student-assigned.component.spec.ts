import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignedComponent } from './student-assigned.component';

describe('StudentAssignedComponent', () => {
  let component: StudentAssignedComponent;
  let fixture: ComponentFixture<StudentAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
