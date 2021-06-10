import {
  loginSuccess,
  loginStart,
  loginFail,
  autoLogout,
  signupStart,
  signupSuccess,
  signupFail
} from "../actions/auth.actions";
import { createReducer, on} from "@ngrx/store";
import { initialState} from "../app.states";

const _authReducer = createReducer(
  initialState,
  on(loginStart, (state, action) => {
    return {
      ...state,
      user: null
    }
  }),
  on(loginSuccess, (state: any, action: any) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(loginFail, (state : any, action: any) => {
    return {
      ...state,
      user: null
    }
  }),

  on(autoLogout, (state : any, action: any) => {
    return {
      ...state,
      user: null
    }
  }),

  on(signupStart, (state : any, action: any) => {
    return {
      ...state,
      user: null
    }
  }),

  on(signupSuccess, (state : any, action: any) => {
    return {
      ...state,
      user: action.user
    }
  }),

  on(signupFail, (state : any, action: any) => {
    return {
      ...state,
      user: null
    }
  }),
)

export function Authreducer (state: any, action: any){
  return _authReducer(state, action);
}
