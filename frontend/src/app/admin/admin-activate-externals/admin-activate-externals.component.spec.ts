import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActivateExternalsComponent } from './admin-activate-externals.component';

describe('AdminActivateExternalsComponent', () => {
  let component: AdminActivateExternalsComponent;
  let fixture: ComponentFixture<AdminActivateExternalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActivateExternalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActivateExternalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
