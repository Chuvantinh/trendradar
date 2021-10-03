import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendDetailComponent } from './trend-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {ToastrModule} from "ngx-toastr";
import {GraphQLModule} from "../../graphql.module";
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "../../store/app.states";

describe('TrendDetailComponent', () => {
  let component: TrendDetailComponent;
  let fixture: ComponentFixture<TrendDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        GraphQLModule,
        StoreModule.forRoot(reducers, {metaReducers}),
      ],
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
