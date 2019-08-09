import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCreatePendingComponent } from './student-create-pending.component';

describe('StudentCreatePendingComponent', () => {
  let component: StudentCreatePendingComponent;
  let fixture: ComponentFixture<StudentCreatePendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCreatePendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCreatePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
