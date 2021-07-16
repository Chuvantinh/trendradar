import { Injectable } from '@angular/core';
import {NotificationService} from "./notification.service";
import {Apollo, gql} from 'apollo-angular';
import {Router} from "@angular/router";
import {User} from "../models/user";
import { from, of } from 'rxjs';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "../store/app.states";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apollo: Apollo,
    private notification: NotificationService,
    private router: Router,
    private storeChunk: Store<State>,
  ) { }
  login(email: string, password: string){

    const LOGIN = gql`
      mutation login($data: UserAuthPayload!) {
        login(data: $data)
      }
    `;

    this.notification.showSuccess('Login success', 'trendradar.com');
    // this.router.navigateByUrl('home'); // redirect to home
    setTimeout(() => {
      this.router.navigate(['home'])
        .then(() => {
          window.location.reload();
        });
    }, 3000);


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

  signUp(email: string, password: string): any {
    const REGISTER = gql`
      mutation signupUser($data: UserCreateInput!) {
        signupUser(data: $data){
          id
          name
        }
      }
    `;

    return this.apollo.mutate({
      mutation: REGISTER,
      variables: {
        data: {
          email: email,
          name: email,
          password: password,
        }
      }
    });
  }

  /**
  .subscribe(({data}) => {
      console.log(data);
      this.notification.showSuccess('Login success', 'trendradar.com');
      this.router.navigateByUrl('home'); // redirect to home
      return {data}
    }, (error) => {
      this.notification.showError('Something gone wrong', 'trendradar.com');
    });
  }
       */

  formatUser(email: string, token: any ): User{
    return new User(email,token);
  }

  getIsAuthenticated(){
    let isAuthenticatedState: boolean = false;
    this.storeChunk.select('user').subscribe((data) =>{
      isAuthenticatedState = data.isAuthenticated;
    });
    // console.log(isAuthenticatedState);
    return isAuthenticatedState;
  }

  getEmail(){
    let emailUser: any = '';
    this.storeChunk.select('user').subscribe((data) =>{
      emailUser = data.user?.email;
    });
    console.log(emailUser);
    return emailUser;
  }
}
