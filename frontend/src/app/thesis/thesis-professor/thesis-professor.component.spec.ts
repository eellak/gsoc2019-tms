import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisProfessorComponent } from './thesis-professor.component';

describe('ThesisProfessorComponent', () => {
  let component: ThesisProfessorComponent;
  let fixture: ComponentFixture<ThesisProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesisProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesisProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
