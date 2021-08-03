import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendDetailComponent } from './trend-detail.component';

describe('TrendDetailComponent', () => {
  let component: TrendDetailComponent;
  let fixture: ComponentFixture<TrendDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
