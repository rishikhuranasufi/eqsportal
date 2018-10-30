import { Component, OnInit } from '@angular/core';
import {Login} from '../models/login.model';
import {FormsModule, Validators, NgForm } from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';
import {LoginService } from './login.service';
import {User} from '../models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogoutComponent implements OnInit {

 login: Login = new Login();
 user: User = new User();
 isValidFormSubmitted = false;
 validateEmail = true;
 form: NgForm;
 returnUrl: string;
 userLogged: boolean;
 userLoggedrole: string;
 loggedUsername: String;
 displayLoginPopup:boolean;
 error = '';

 resetForm(): void {
  this.login = new Login();
  this.isValidFormSubmitted = true;
  this.form.resetForm();
}
  
  ngOnInit() {

    this.userLogged = false;
    this.userLoggedrole = 'GUEST';
    this.loggedUsername = '';
    this.displayLoginPopup = false;

    if (sessionStorage.getItem('currentUser')) {
      this.userLogged = true;
    }

    if (sessionStorage.getItem('currentUsername')) {
      this.loggedUsername = sessionStorage.getItem('currentUsername');
    }

    if (sessionStorage.getItem('currentUserrole')) {
      this.userLoggedrole = sessionStorage.getItem('currentUserrole');
    }

    this.isValidFormSubmitted = true;
    this.loginService.logout();    
    this.router.navigate(['/home']);
    setTimeout(function(){
        location.reload();
    },1000)

    
  }

  constructor(private router: Router, private loginService: LoginService, private route: ActivatedRoute ) { }
}
