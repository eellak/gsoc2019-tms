import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariatComponent } from './secretariat.component';

describe('SecretariatComponent', () => {
  let component: SecretariatComponent;
  let fixture: ComponentFixture<SecretariatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretariatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretariatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
