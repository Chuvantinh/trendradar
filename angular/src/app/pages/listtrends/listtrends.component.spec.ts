import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtrendsComponent } from './listtrends.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import { ToastrModule} from "ngx-toastr";
import {GraphQLModule} from "../../graphql.module";
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "../../store/app.states";
import {NgxPaginationModule} from "ngx-pagination";

describe('ListtrendsComponent', () => {
  let component: ListtrendsComponent;
  let fixture: ComponentFixture<ListtrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        GraphQLModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        NgxPaginationModule
      ],
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
