import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpDataCountSingleComponent } from './op-data-count-single.component';

describe('OpDataCountSingleComponent', () => {
  let component: OpDataCountSingleComponent;
  let fixture: ComponentFixture<OpDataCountSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpDataCountSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpDataCountSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
