import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpDataComponent } from './op-data.component';

describe('OpDataComponent', () => {
  let component: OpDataComponent;
  let fixture: ComponentFixture<OpDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
