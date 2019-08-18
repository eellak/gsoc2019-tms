import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariatProfessorsComponent } from './secretariat-professors.component';

describe('SecretariatProfessorsComponent', () => {
  let component: SecretariatProfessorsComponent;
  let fixture: ComponentFixture<SecretariatProfessorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretariatProfessorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretariatProfessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
