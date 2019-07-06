import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginExternalComponent } from './login-external.component';

describe('LoginExternalComponent', () => {
  let component: LoginExternalComponent;
  let fixture: ComponentFixture<LoginExternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginExternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
