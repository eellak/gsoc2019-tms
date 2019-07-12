import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExternalComponent } from './create-external.component';

describe('CreateExternalComponent', () => {
  let component: CreateExternalComponent;
  let fixture: ComponentFixture<CreateExternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
