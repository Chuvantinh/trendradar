import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlesterComponent } from './newlester.component';

describe('NewlesterComponent', () => {
  let component: NewlesterComponent;
  let fixture: ComponentFixture<NewlesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewlesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
