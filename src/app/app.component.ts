import { Component ,OnInit} from '@angular/core';
import {User} from './models/user.model';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { error } from 'util';
import {Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  user: User;
  returnUrl: string;
  userLogged: boolean;
  userLoggedrole: string;
  loggedUsername: String;
  loggedName: String;
  displayChangePasswordPopup: boolean;
  passwordDetails: Object = {
    oldPassword:"",
    newPassword:"",
    newPasswordConfirm:""
  }
  showValidationError:boolean;
  showValidationErrorMatch:boolean;

  obj:object;

  ngOnInit() {
    this.returnUrl = '/home';
    this.userLogged = false;
    this.showValidationError = false;
    this.userLoggedrole= 'GUEST';
    this.loggedUsername='';
    this.loggedName=''
    this.displayChangePasswordPopup=false;

    if (sessionStorage.getItem('currentUser')) {
      this.userLogged =true;
    }

    if (sessionStorage.getItem('currentUsername')) {
      this.loggedUsername = sessionStorage.getItem('currentUsername');
    }

    if (sessionStorage.getItem('currentName')) {
      this.loggedName = sessionStorage.getItem('currentName');
    }

    if (sessionStorage.getItem('currentUserrole')) {
      this.userLoggedrole =  sessionStorage.getItem('currentUserrole');
    }
  }

  openChangePasswordPopup(){
    this.displayChangePasswordPopup= true;
  }

  closePopup(){
    this.displayChangePasswordPopup= false;
  }

  constructor(private loginService:LoginService, private appService:AppService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  
  
  updatePasswordDetails(passwordDetails){    
    if (passwordDetails.newPassword != passwordDetails.newPasswordConfirm){
        this.showValidationErrorMatch=true;
        this.showValidationError=false;
        return;
    }
    if(this.showValidationErrorMatch){
      this.showValidationErrorMatch=false;
    }

    if(passwordDetails.newPassword == '' || passwordDetails.newPasswordConfirm == '' ||
     passwordDetails.oldPassword == ''){
       this.showValidationError=true;
       return;
     }

     if(this.showValidationError){
      this.showValidationError=false;
    }
      
    this.appService.changePassword(passwordDetails)
    .subscribe(data => {      
      alert("Password updated successfully, please login Again with new Password !!")          
      this.loginService.logout();
      this.displayChangePasswordPopup=false;
      this.returnUrl ='/home';      
      this.router.navigate([this.returnUrl]);
      setTimeout(function(){
        location.reload();
      },500)


    },error => {
      alert(error);
    });


  }

  

}