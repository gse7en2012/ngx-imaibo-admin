import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpDataCountComponent } from './op-data-count.component';

describe('OpDataCountComponent', () => {
  let component: OpDataCountComponent;
  let fixture: ComponentFixture<OpDataCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpDataCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpDataCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
