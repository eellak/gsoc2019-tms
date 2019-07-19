import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisDetailsComponent } from './thesis-details.component';

describe('ThesisDetailsComponent', () => {
  let component: ThesisDetailsComponent;
  let fixture: ComponentFixture<ThesisDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesisDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
