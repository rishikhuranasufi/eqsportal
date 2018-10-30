import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule, Validators, NgForm } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLogged: boolean;
  userLoggedrole: string;
  loggedUsername: String;

  constructor(private router: Router, private location: Location) {
  }
  
  ngOnInit() {
    this.userLogged = false;
    this.userLoggedrole= 'GUEST';
    this.loggedUsername='';

    if (sessionStorage.getItem('currentUser')) {
      this.userLogged =true;
    }

    if (sessionStorage.getItem('currentUsername')) {
      this.loggedUsername = sessionStorage.getItem('currentUsername');
    }

    if (sessionStorage.getItem('currentUserrole')) {
      this.userLoggedrole =  sessionStorage.getItem('currentUserrole');
    }
  }
}
