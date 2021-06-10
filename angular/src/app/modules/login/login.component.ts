import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Constants} from "../../services/constants";
import {Store} from "@ngrx/store";
import {State} from "../../store/app.states";
import {loginStart, signupStart} from "../../store/actions/auth.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  fieldTextType: boolean = false;
  fieldTextTypeRegisterPassword: boolean = false;
  fieldTextTypeRepeatRegisterPassword: boolean = false;
  form: FormGroup = this.formBuilder.group({});
  formRegister: FormGroup = this.formBuilder.group({});
  constructor(private apollo: Apollo,
              private notification: NotificationService,
              private router: Router,
              private formBuilder: FormBuilder,
              private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['wifi@gmail.com',
          [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.pattern(Constants.REGEX.EMAIL_FORMAT)
        ]],
        password: ['wifiA123!', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(Constants.REGEX.PASSWORD)
        ]]
      }
    )

    this.formRegister = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.pattern(Constants.REGEX.EMAIL_FORMAT)]
        ],
      name: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(Constants.REGEX.NAME_FORMAT)
        ]],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(Constants.REGEX.PASSWORD)
        ]
      ],
      repeatPassword: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(Constants.REGEX.PASSWORD)]
        ],
    })
  }
  // show or hidden eye on login form
  toggleFieldTextType(){
    this.fieldTextType = !this.fieldTextType ;
  }

  // show or hidden eye on register form
  toggleFieldTextTypeRegisterPassword(){
    this.fieldTextTypeRegisterPassword = !this.fieldTextTypeRegisterPassword ;
  }

  // show or hidden eye on register form
  toggleFieldTextTypeRepeatRegisterPassword(){
    this.fieldTextTypeRepeatRegisterPassword = !this.fieldTextTypeRepeatRegisterPassword ;
  }

  // form login
  get email() { return this.form.get('email'); }
  get pasword() { return this.form.get('password'); }

  // form register
  get registerEmail(){ return this.formRegister.get('email')}
  get registerName(){ return this.formRegister.get('name')}
  get registerPassword(){ return this.formRegister.get('password')}
  get registerRepeatPassword(){ return this.formRegister.get('repeatPassword')}


  /**
   * If the user has an account they can log in the system and see the trend radar and road map
   * each User has a role in the system
   */
  login(valueInput: any){
    if(this.form.invalid){
     this.notification.showWarning("Pls fill the input text", "trendradar.com")
      return;
    }
    let email: string = valueInput.email;
    let password: string = valueInput.password;
    this.store.dispatch(loginStart({email, password}));
  }

  /**
   * Create new user with email and password
   * then ridrecct logged immediatly
   */
  register(formData: any): any{
    if(formData.password !== formData.repeatPassword){
      this.notification.showWarning('Password and repeater password must equals', 'trendradar.com')
      return false;
    }

    if(this.formRegister.invalid){
      this.notification.showWarning('Please check this form again. Somethings happpend wrong', 'trendradar.com')
      return;
    }
    let email: string = formData.email;
    let password: string = formData.password;
    //this.store.dispatch(signupStart({email, password}));


  }
}
