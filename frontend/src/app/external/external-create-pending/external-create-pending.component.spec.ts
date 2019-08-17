import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalCreatePendingComponent } from './external-create-pending.component';

describe('ExternalCreatePendingComponent', () => {
  let component: ExternalCreatePendingComponent;
  let fixture: ComponentFixture<ExternalCreatePendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalCreatePendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalCreatePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
