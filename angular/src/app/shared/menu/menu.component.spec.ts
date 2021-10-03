import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {GraphQLModule} from "../../graphql.module";
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "../../store/app.states";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        GraphQLModule,
        StoreModule.forRoot(reducers, {metaReducers}),
      ],
      declarations: [ MenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
