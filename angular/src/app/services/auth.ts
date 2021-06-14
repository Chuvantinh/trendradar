import { Injectable } from '@angular/core';
import {NotificationService} from "./notification.service";
import {Apollo, gql} from 'apollo-angular';
import {Router} from "@angular/router";
import {User} from "../models/user";
import { from, of } from 'rxjs';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenObj: any = '';

  constructor(
    private apollo: Apollo,
    private notification: NotificationService,
    private router: Router,
  ) { }
  login(email: string, password: string){

    const LOGIN = gql`
      mutation login($data: UserAuthPayload!) {
        login(data: $data)
      }
    `;

    this.notification.showSuccess('Login success', 'trendradar.com');
    this.router.navigateByUrl('home'); // redirect to home

    return  this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        data: {
          email: email,
          password: password,
        }
      }
    });

      /**
      .subscribe(({data}) => {
      this.notification.showSuccess('Login success', 'trendradar.com');
      this.router.navigateByUrl('home'); // redirect to home
      this.tokenObj = data;
    }, (error) => {
      this.notification.showError('Something gone wrong', 'trendradar.com');
    });
    return of(data);
       */
    //let date: Date = new Date("2019-01-16");
  }

  signUp(email: string, password: string): any{
    const REGISTER = gql`
      mutation signupUser($data: UserCreateInput!) {
        signupUser(data: $data){
          id
          name
        }
      }
    `;

    this.apollo.mutate({
      mutation: REGISTER,
      variables: {
        data: {
          email: email,
          name: email,
          password: password,
        }
      }
    }).subscribe(({data}) => {
      console.log(data);
      this.notification.showSuccess('Login success', 'trendradar.com');
      this.router.navigateByUrl('home'); // redirect to home
      return {data}
    }, (error) => {
      this.notification.showError('Something gone wrong', 'trendradar.com');
    });
  }

  formatUser(email: string, token: string, localId: string, expriration: Date ): User{
    return new User(email,token, localId, expriration);
  }
}
