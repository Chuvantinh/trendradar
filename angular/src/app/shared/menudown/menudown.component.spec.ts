import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenudownComponent } from './menudown.component';

describe('MenudownComponent', () => {
  let component: MenudownComponent;
  let fixture: ComponentFixture<MenudownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenudownComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenudownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
