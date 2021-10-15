// https://www.youtube.com/watch?v=BumgayeUC08  learn angular test
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "../../store/app.states";
// for testing with apollo
// import {
//   ApolloTestingModule,
//   ApolloTestingController,
// } from 'apollo-angular/testing';
import {By} from "@angular/platform-browser";
import {AuthService} from "../../services/auth";

import {Component, OnInit, Input} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {shareReplay, pluck} from 'rxjs/operators';
import {NotificationService} from "../../services/notification.service";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  //let backend: ApolloTestingController;

  const toastrService = {
    success: (
      message?: string,
      title?: string,
    ) => {},
    error: (
      message?: string,
      title?: string,
    ) => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(reducers, {metaReducers}),
        // ApolloTestingModule,
      ],
      declarations: [ LoginComponent ],
    })
    .compileComponents();

    //backend = TestBed.get(ApolloTestingController);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
   // backend.verify();
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });

  // click with spyOn
  it('should click login function', fakeAsync(() => {
    spyOn(component, 'login');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.login).toHaveBeenCalled();

  }));

  // https://angular.io/guide/testing-components-basics
  it('should show or hidden password as type = text', function () {
    fixture = TestBed.createComponent(LoginComponent);
    let component_toogle_eyes = fixture.componentInstance;

    expect(component_toogle_eyes.fieldTextType).toBe(false, 'on the first time');
    component_toogle_eyes.toggleFieldTextType();
    expect(component_toogle_eyes.fieldTextType).toBe(true, 'show the password')
  });


  it('should have login button', function () {
    let button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain("Login");
  });

  it('should log in success', function () {
    // const LOGIN = gql`
    //   mutation login($data: UserAuthPayload!) {
    //     login(data: $data)
    //   }
    // `;


  });

});


// describe('Logincomponent with Authservice', () => {
//   let controller: ApolloTestingController;
//
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [ApolloTestingModule],
//     });
//
//     controller = TestBed.inject(ApolloTestingController);
//   });
//
//   afterEach(() => {
//     controller.verify();
//   });

  // https://apollo-angular.com/docs/development-and-testing/testing/
  // it('expect and answer', () => {
  //   //Scaffold the component
  //   TestBed.createComponent(LoginComponent);
  //   component = fixture.componentInstance;
  //
  //   //Call the relevant method
  //
  //   // component.login(1).subscribe((user:any) => {
  //   //   //Make some assertion about the result;
  //   //   expect(user.id).toEqual(0);
  //   //   expect(user.name).toEqual('Mr Apollo');
  //   // });
  //
  //   const LOGIN = gql`
  //     mutation login($data: UserAuthPayload!) {
  //       login(data: $data)
  //     }
  //   `;
  //
  //   // The following `expectOne()` will match the operation's document.
  //   // If no requests or multiple requests matched that document
  //   // `expectOne()` would throw.
  //   const op = controller.expectOne(LOGIN);
  //
  //   // Assert that one of variables is Mr Apollo.
  //   expect(op.operation.variables.name).toEqual('Mr Apollo');
  //
  //   // Respond with mock data, causing Observable to resolve.
  //   op.flush({
  //     data: {
  //       login: {
  //         token: '123',
  //       },
  //     },
  //   });
  //
  //   // Finally, assert that there are no outstanding operations.
  //   controller.verify();
  // });
// });
