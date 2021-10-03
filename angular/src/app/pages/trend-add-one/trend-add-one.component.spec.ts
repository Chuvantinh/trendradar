import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendAddOneComponent } from './trend-add-one.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import { ToastrModule} from "ngx-toastr";
import {GraphQLModule} from "../../graphql.module";
import { StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "../../store/app.states";

describe('TrendAddOneComponent', () => {
  let component: TrendAddOneComponent;
  let fixture: ComponentFixture<TrendAddOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        GraphQLModule,
        StoreModule.forRoot(reducers, {metaReducers}),
      ],
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
