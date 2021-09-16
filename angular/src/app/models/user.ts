/**
 * Defind the model for user
 * In order to store the state of user with NgRx Store
 */

export class User {
  public email:string;
  public token: string;
  constructor(email: string, token: string) {
    this.email = email;
    this.token = token;
  }
}
