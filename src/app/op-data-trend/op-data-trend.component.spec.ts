import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpDataTrendComponent } from './op-data-trend.component';

describe('OpDataTrendComponent', () => {
  let component: OpDataTrendComponent;
  let fixture: ComponentFixture<OpDataTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpDataTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpDataTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
