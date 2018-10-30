import { Component, OnInit } from '@angular/core';
import {FormsModule, Validators, NgForm } from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';
import {Signup} from '../models/signup.model';
import {SignupService } from './signup.service';
import {User} from '../models/user.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup: Signup = new Signup();
  user: User = new User();
  isValidFormSubmitted = false;
  validateEmail = true;
  form: NgForm;
  returnUrl: string;
  error = '';
  displaySignUpPopup:boolean;
  displayLoginPopup:boolean;
  userLogged: boolean;
  userLoggedrole: string;
  loggedUsername: String;

  constructor(private router: Router, private signupService: SignupService, private route: ActivatedRoute, private location: Location ) { }


  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  this.displayLoginPopup=false;
  this.displaySignUpPopup=true;

  this.userLogged = false;
  this.userLoggedrole= 'GUEST';
  this.loggedUsername='';

  if (sessionStorage.getItem('currentUser')) {
    this.userLogged =true;
    this.displayLoginPopup=false;
    this.displaySignUpPopup=false;
  }

  if (sessionStorage.getItem('currentUsername')) {
    this.loggedUsername = sessionStorage.getItem('currentUsername');
  }

  if (sessionStorage.getItem('currentUserrole')) {
    this.userLoggedrole =  sessionStorage.getItem('currentUserrole');
  }
  }

  createUser(form: NgForm): void {

    this.isValidFormSubmitted = false;

    if (form.invalid) {
       return;
    }

    this.isValidFormSubmitted = true;

    this.signupService.signup(this.signup)
      .subscribe(data => {
        this.user = data;        
        this.router.navigate(['/home']);
        setTimeout(function(){
          location.reload();
        },1000)
      },
        error => {
        this.signup.failure = true;
        this.signup.errorString = error;
      }
    );
  }

  resetForm(){
    this.signup = new Signup();
    this.isValidFormSubmitted = true;
    this.form.resetForm();
  }
}
