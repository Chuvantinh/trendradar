import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, compose} from '@ngrx/store';
import {Store} from "@ngrx/store";
import {concatMap, mergeMap, tap} from 'rxjs/operators';
import {EMPTY, of} from "rxjs";
import {catchError, exhaustMap, map, switchMap} from "rxjs/operators";

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
import {User} from "../../models/user";
import {Observable} from "rxjs";
import {subscribe} from "graphql";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<State>,
    private router: Router,
  ) {
  }

  // effects go here
  /**
   login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap( (action) => {
        return this.authService.login(action.email, action.password).subscribe(({data}) => {

          const user = this.authService.formatUser(action.email, "123", "123", new Date());
          console.log(data);
          return loginSuccess({user, redirect: true});

        }, (error) => {
          console.log('there was an error sending the query', error);
        });
      });
);
});

   */



  login$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap( (action) => {
        return this.authService.login(action.email, action.password).pipe(
          map( data => {

              const user = this.authService.formatUser(action.email, "22" ,"1",  new Date(333333));
              return loginSuccess({user, redirect: true});
            }

          )
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
   }
   */
}
