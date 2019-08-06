import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPendingComponent } from './student-pending.component';

describe('StudentPendingComponent', () => {
  let component: StudentPendingComponent;
  let fixture: ComponentFixture<StudentPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
