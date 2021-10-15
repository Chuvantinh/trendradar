import {ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { ListtrendsComponent } from './listtrends.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import { ToastrModule} from "ngx-toastr";
import {GraphQLModule} from "../../graphql.module";
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "../../store/app.states";
import {NgxPaginationModule} from "ngx-pagination";

import {Observable} from 'rxjs';
import {shareReplay, pluck} from 'rxjs/operators';
// import {ApolloError} from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client/core';

import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';
import {gql} from "@apollo/client";

describe('ListtrendsComponent', () => {
  let component: ListtrendsComponent;
  let fixture: ComponentFixture<ListtrendsComponent>;

  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // FormsModule,
        // ReactiveFormsModule,
        // RouterTestingModule,
        // ToastrModule.forRoot(),
        // // GraphQLModule,
        // ApolloError,
        // InMemoryCache,
        // ApolloLink,
        // StoreModule.forRoot(reducers, {metaReducers}),
        // NgxPaginationModule,
        // ApolloTestingModule, // for testing apollo
        // Observable,
        // ApolloClient,

      ],
      declarations: [ ListtrendsComponent ]
    })
    .compileComponents();

    controller = TestBed.inject(ApolloTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    controller.verify();
  });

  /*it('should call api', function () {
    // component.getListTrends("", "title", "asc", null, null);
    // expect(component.listTrends).toBeTruthy();
    const GET_TRENDS_QUERY = gql`
      query GetAllTrends($search_string: String, $orderByField: String, $valueField: String, $start: DateTime, $end: DateTime){
        getTrends(data:{
          search_string: $search_string, orderByField: $orderByField, valueField: $valueField, start: $start, end: $end
        }){
          id,
          title,
          description,
          images,
          videos,
          start,
          end,
          createdAt,
          createdBy{
            id
            name
          }
          status
          source{
            id
            title
            description
            url
            createdAt
          }
          trendEvalution{
            id
            effect
            probability
            during
            createdAt
          }
          comment{
            id
            content
          }
        }
      }
    `;

    // The following `expectOne()` will match the operation's document.
    // If no requests or multiple requests matched that document
    // `expectOne()` would throw.
    const op = controller.expectOne(GET_TRENDS_QUERY);

    // Assert that one of variables is Mr Apollo.
    expect(op.operation.variables.search_string).toEqual('Mr Apollo');

    // Respond with mock data, causing Observable to resolve.
    op.flush({
      data: {
        dog: {
          id: 0,
          name: 'Mr Apollo',
          breed: 'foo',
        },
      },
    });

    // Finally, assert that there are no outstanding operations.
    controller.verify();

  });*/
});
