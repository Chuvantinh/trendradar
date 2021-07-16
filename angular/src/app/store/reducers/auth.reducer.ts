import {
  loginSuccess,
  loginStart,
  loginFail,
  autoLogout,
  signupStart,
  signupSuccess,
  signupFail, logOut
} from "../actions/auth.actions";
import { createReducer, on} from "@ngrx/store";
import {User} from "../../models/user";
// storage of state in localstorage
import * as storage from "../state/storage"

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

const userLogin: State = storage.getItem('user');

//  export const initialState: State = {
//    userLogin
//  };

const _authReducer = createReducer(
  userLogin,
  on(loginStart, (state, action) => {
    return {
      ...state,
      user: null,
    }
  }),
  on(loginSuccess, (state: any, action: any) => {
    let userInfor = {
      user: action.user,
      isAuthenticated: action.isAuthenticated,
      errorMessage: null
    }
    storage.saveItem('user', userInfor);

    return {
      ...state,
      user: action.user,
      isAuthenticated: action.isAuthenticated,
      errorMessage: null
    }
  }),
  on(loginFail, (state : any, action: any) => {
    return {
      ...state,
      user: null
    }
  }),
  on(logOut, (state : any, action: any) => {
    return {
      ...state,
      isAuthenticated: false,
      user: {
        email: null,
        token: null
      },
      errorMessage: null
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
    const storageValue = localStorage.getItem("state");
    if (storageValue) {
      try {
        return JSON.parse(storageValue);
      } catch {
        localStorage.removeItem("state");
      }
    }
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

export function Authreducer (state: any, action: any): any{
  const nextState = _authReducer(state, action);
  return nextState;
}
