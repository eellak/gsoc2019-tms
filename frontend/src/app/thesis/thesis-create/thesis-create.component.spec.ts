import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisCreateComponent } from './thesis-create.component';

describe('ThesisCreateComponent', () => {
  let component: ThesisCreateComponent;
  let fixture: ComponentFixture<ThesisCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesisCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesisCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
