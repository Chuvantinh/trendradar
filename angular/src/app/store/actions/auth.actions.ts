import { createAction, props} from "@ngrx/store";
import {User} from "../../models/user";

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';
export const LOGIN_OUT = '[auth page] log out';

export const loginStart = createAction(
  LOGIN_START,
  props<{email: string ; password: string}>()
)

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
props<{user: User; redirect: boolean; isAuthenticated: boolean}>()
)

export const loginFail = createAction(LOGIN_FAIL)
export const logOut = createAction(LOGIN_OUT);


export const SIGNUP_START = '[auth page] signup start'
export const SIGNUP_SUCCESS = '[auth page] signup success'
export const SIGNUP_FAIL = '[auth page] signup fail hello'

export const signupStart = createAction(
  SIGNUP_START,
  props<{email: string; password: string}>()
)

export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{user: User; redirect: boolean, isAuthenticated: boolean}>()
)

export const signupFail = createAction(SIGNUP_FAIL)

export const AUTO_LOGIN_ACTION = '[auth page] auto login'
export const AUTO_LOGOUT_ACTION = '[auth page] auto logout'

export const autologin = createAction(AUTO_LOGIN_ACTION)
export const autoLogout = createAction(AUTO_LOGOUT_ACTION)

