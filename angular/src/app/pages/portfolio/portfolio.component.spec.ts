import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioComponent } from './portfolio.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {GraphQLModule} from "../../graphql.module";
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import {ApolloTestingModule, ApolloTestingController} from "apollo-angular/testing";

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  let controller: ApolloTestingController;

  beforeEach(async () => {
    let store: MockStore;
    const initialState = { isAuthenticated: true };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        // GraphQLModule,
        ApolloTestingModule,
      ],
      declarations: [ PortfolioComponent ],
      providers:[
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);

    controller = TestBed.inject(ApolloTestingController);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
