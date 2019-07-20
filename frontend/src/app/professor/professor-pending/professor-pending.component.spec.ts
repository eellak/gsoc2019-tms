import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorPendingComponent } from './professor-pending.component';

describe('ProfessorPendingComponent', () => {
  let component: ProfessorPendingComponent;
  let fixture: ComponentFixture<ProfessorPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
