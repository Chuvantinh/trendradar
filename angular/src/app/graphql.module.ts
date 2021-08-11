/**
 * This file define get token from AuthenService and inject to apollo client with the purpose of user's authentication
 * and this class will be inject in the AppModule via imports[]
 * document at: https://apollo-angular.com/docs/recipes/authentication#header
 */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache,ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import {AuthService} from "./services/auth";

const uri = 'http://localhost:4000/';
let token = '';
export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext((operation, context) => {

    // console.log('token in graphqlmodule: ' + token);

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  }
}

@NgModule({
  exports: [
    HttpClientModule,
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink]
  }]
})
export class GraphQLModule {
  constructor(
    public authenService: AuthService
  ){
    token = this.authenService.getTokenforRoot();
  }
}
