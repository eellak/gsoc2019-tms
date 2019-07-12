import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExternalComponent } from './admin-external.component';

describe('AdminExternalComponent', () => {
  let component: AdminExternalComponent;
  let fixture: ComponentFixture<AdminExternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminExternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
