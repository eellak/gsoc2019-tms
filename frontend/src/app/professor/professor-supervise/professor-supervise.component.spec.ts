import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSuperviseComponent } from './professor-supervise.component';

describe('ProfessorSuperviseComponent', () => {
  let component: ProfessorSuperviseComponent;
  let fixture: ComponentFixture<ProfessorSuperviseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorSuperviseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorSuperviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
