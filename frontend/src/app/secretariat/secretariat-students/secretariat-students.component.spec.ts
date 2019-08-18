import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariatStudentsComponent } from './secretariat-students.component';

describe('SecretariatStudentsComponent', () => {
  let component: SecretariatStudentsComponent;
  let fixture: ComponentFixture<SecretariatStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretariatStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretariatStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
