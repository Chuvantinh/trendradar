import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtrendsComponent } from './listtrends.component';

describe('ListtrendsComponent', () => {
  let component: ListtrendsComponent;
  let fixture: ComponentFixture<ListtrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListtrendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
