import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendAddOneComponent } from './trend-add-one.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import { ToastrModule} from "ngx-toastr";
import {GraphQLModule} from "../../graphql.module";
import { StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "../../store/app.states";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireStorageModule} from "@angular/fire/storage";

describe('TrendAddOneComponent', () => {
  let component: TrendAddOneComponent;
  let fixture: ComponentFixture<TrendAddOneComponent>;

  beforeEach(async () => {
    let store: MockStore;
    const initialState = { isAuthenticated: true };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        GraphQLModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
      ],
      declarations: [ TrendAddOneComponent ],
      providers:[
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);

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
