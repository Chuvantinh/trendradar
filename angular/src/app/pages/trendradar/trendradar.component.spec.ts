import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendradarComponent } from './trendradar.component';

describe('TrendradarComponent', () => {
  let component: TrendradarComponent;
  let fixture: ComponentFixture<TrendradarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendradarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendradarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
