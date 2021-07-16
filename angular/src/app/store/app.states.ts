import * as fromAuth from "./reducers/auth.reducer"

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { localStorageSync} from "ngrx-store-localstorage";

export interface State {
  user: fromAuth.State
}

export const reducers: ActionReducerMap<State> = {
  user: fromAuth.Authreducer
};


const reducerKeys = ['user'];
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: reducerKeys})(reducer);
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action){
    console.log(state)
    console.log(action)
    return reducer(state, action)
  }
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];
