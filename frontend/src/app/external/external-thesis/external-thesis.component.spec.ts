import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalThesisComponent } from './external-thesis.component';

describe('ExternalThesisComponent', () => {
  let component: ExternalThesisComponent;
  let fixture: ComponentFixture<ExternalThesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalThesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalThesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
