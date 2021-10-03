import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendradarComponent } from './trendradar.component';
import { ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {GraphQLModule} from "../../graphql.module";
import { StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "../../store/app.states";

describe('TrendradarComponent', () => {
  let component: TrendradarComponent;
  let fixture: ComponentFixture<TrendradarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastrModule.forRoot(),
        GraphQLModule,
        StoreModule.forRoot(reducers, {metaReducers}),
      ],
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
