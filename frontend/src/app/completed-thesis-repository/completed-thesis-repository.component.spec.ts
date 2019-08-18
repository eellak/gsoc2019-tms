import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedThesisRepositoryComponent } from './completed-thesis-repository.component';

describe('CompletedThesisRepositoryComponent', () => {
  let component: CompletedThesisRepositoryComponent;
  let fixture: ComponentFixture<CompletedThesisRepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedThesisRepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedThesisRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
