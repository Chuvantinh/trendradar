import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapComponent } from './roadmap.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {GraphQLModule} from "../../graphql.module";
import {Store, StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "../../store/app.states";
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from "@angular/material/form-field";

import { MatInputModule } from '@angular/material/input';
import {MatFormField} from "@angular/material/form-field";

describe('RoadmapComponent', () => {
  let component: RoadmapComponent;
  let fixture: ComponentFixture<RoadmapComponent>;

  beforeEach(async () => {
    let store: MockStore;
    const initialState = { loggedIn: false };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        GraphQLModule,
        StoreModule.forRoot(reducers, {metaReducers}),
      ],
      declarations: [ RoadmapComponent ],
      providers:[
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
