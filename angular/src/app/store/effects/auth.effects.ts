import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {Store} from "@ngrx/store";
import {concatMap, mergeMap, tap} from 'rxjs/operators';
import { of} from "rxjs";
import {catchError, exhaustMap, map} from "rxjs/operators";

import {
  loginStart,
  loginSuccess,
  loginFail,
  autoLogout,
  autologin,
  signupStart,
  signupSuccess,
  signupFail,
  LOGIN_START
} from "../actions/auth.actions";
import {State} from "../app.states";
import {AuthService} from "../../services/auth";
import {__await} from "tslib";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<State>,
    private router: Router,
  ) {}

  // effects go here

  login$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            console.log('in effects: ' + data);

            const token = data ? data.login: 'a';
            console.log('token in effects :' + token);

            let date: Date = new Date("2019-01-16");
            const user = this.authService.formatUser(action.email, token, '1', date);
            // return loginSuccess({data, redirect: true})
          }),
          catchError((err): any => {
            return err;
          })
        )
      })
    )
  })

  /**
  signUp$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data);
            return signupSuccess({user, redirect: true})
          }),
          catchError( (err) => {
            return err;
          })
        )
      })
    )
  })
   */

}
