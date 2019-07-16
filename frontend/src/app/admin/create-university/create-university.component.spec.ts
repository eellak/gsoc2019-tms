import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUniversityComponent } from './create-university.component';

describe('CreateUniversityComponent', () => {
  let component: CreateUniversityComponent;
  let fixture: ComponentFixture<CreateUniversityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUniversityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
