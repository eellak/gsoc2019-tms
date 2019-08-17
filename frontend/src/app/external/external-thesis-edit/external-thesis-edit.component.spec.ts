import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalThesisEditComponent } from './external-thesis-edit.component';

describe('ExternalThesisEditComponent', () => {
  let component: ExternalThesisEditComponent;
  let fixture: ComponentFixture<ExternalThesisEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalThesisEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalThesisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
