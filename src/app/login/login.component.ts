import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login.model';
import { FormsModule, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  login: Login = new Login();
  user: User = new User();
  isValidFormSubmitted = false;
  validateEmail = true;
  form: NgForm;
  returnUrl: string;
  error = '';
  displayLoginPopup: boolean;
  showValidationError: boolean;
  userLogged: boolean;
  userLoggedrole: string;
  loggedUsername: String;


  resetForm(): void {
    this.login = new Login();
    this.isValidFormSubmitted = true;
    this.form.resetForm();
  }

  ngOnInit() {
    this.returnUrl = '/home';
    this.displayLoginPopup = true;

    this.userLogged = false;
    this.userLoggedrole = 'GUEST';
    this.loggedUsername = '';

    if (sessionStorage.getItem('currentUser')) {
      this.userLogged = true;
      this.displayLoginPopup = false;
    }

    if (sessionStorage.getItem('currentUsername')) {
      this.loggedUsername = sessionStorage.getItem('currentUsername');
    }

    if (sessionStorage.getItem('currentUserrole')) {
      this.userLoggedrole = sessionStorage.getItem('currentUserrole');
    }
  }

  closePopup() {
    this.displayLoginPopup = false;
  }
  constructor(private router: Router, private loginService: LoginService, private route: ActivatedRoute, private location: Location) { }

  loginApp(form: NgForm): void {
    this.isValidFormSubmitted = false;

    if (form.invalid) {
      return;
    }

    this.isValidFormSubmitted = true;

    this.loginService.login(this.login)
      .subscribe(data => {
        this.user = data;
        this.displayLoginPopup = false;
        this.showValidationError = true;        
        this.router.navigate(['/home']);
        setTimeout(function(){
          location.reload();
        },1000)
      });
  }

  logout(form: NgForm) {
    this.isValidFormSubmitted = true;
    this.loginService.logout();
  }

}
