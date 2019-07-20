import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorRequestsComponent } from './professor-requests.component';

describe('ProfessorRequestsComponent', () => {
  let component: ProfessorRequestsComponent;
  let fixture: ComponentFixture<ProfessorRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
