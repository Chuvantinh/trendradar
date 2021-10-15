import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from "@ngrx/store";
import {catchError, exhaustMap, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import * as storage from "../state/storage";
import {NotificationService} from "../../services/notification.service";

import {
  loginStart,
  loginSuccess,
  loginFail,
  logOut,
  autoLogout,
  autologin,
  signupStart,
  signupSuccess,
  signupFail,
  LOGIN_START
} from "../actions/auth.actions";
import {State} from "../app.states";
import {AuthService} from "../../services/auth";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<State>,
    private router: Router,
    private notificationService: NotificationService,
  ) {
  }

  login$ = createEffect(():any => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data: any) => {
              const user = this.authService.formatUser(action.email, data.data.login);
              return loginSuccess({user, redirect: true, isAuthenticated: true});
            }
          )
        )
      })
    )
  })


  signUp$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data: any) => {
            this.authService.login(action.email, action.password).pipe(
              map((datalogin: any) => {
                let token: string = (datalogin.data.login).toString();
                const user = this.authService.formatUser(action.email, token);
                return signupSuccess({user, redirect: true, isAuthenticated: true})
              })
            )

          }),
          catchError((err) => {
            return err;
          })
        )
      })
    )
  })


  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logOut),
        tap(() => {
          storage.deleteItemByKey('user');
          this.notificationService.showWarning('You are logged out', 'trendradar.com');

          this.router.navigate(['home'])
            .then(() => {
              window.location.reload();
            });

        })
      ),
    {dispatch: false}
  )
}
