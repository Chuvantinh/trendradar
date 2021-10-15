import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';
import {ApolloTestingModule, ApolloTestingController} from "apollo-angular/testing";

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ApolloTestingModule
      ],
      declarations: [ SliderComponent ]
    })
    .compileComponents();

    controller = TestBed.inject(ApolloTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
