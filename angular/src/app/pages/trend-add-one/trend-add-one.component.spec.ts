import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendAddOneComponent } from './trend-add-one.component';

describe('TrendAddOneComponent', () => {
  let component: TrendAddOneComponent;
  let fixture: ComponentFixture<TrendAddOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendAddOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendAddOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
