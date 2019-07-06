import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterExternalComponent } from './register-external.component';

describe('RegisterExternalComponent', () => {
  let component: RegisterExternalComponent;
  let fixture: ComponentFixture<RegisterExternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterExternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
