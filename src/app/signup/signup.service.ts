
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Signup} from '../models/signup.model';
import {User} from '../models/user.model';
import { map } from 'rxjs/operators';
import { AppConfigService } from 'src/app/AppConfigService';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class SignupService {

  user: User;
  baseUrl: String;     

    signup(signup) {
      
      return this.http.post<any>(this.baseUrl + '/v1/api/auth/signup', signup)
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.accessToken) {
                  this.user = user;
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  sessionStorage.setItem('currentUserrole', user.role);
                  sessionStorage.setItem('currentUsername', user.name);
                  sessionStorage.setItem('currentName', user.username);
                  sessionStorage.setItem('currentUser', JSON.stringify(user));
              }
  
              return user;
          }));
  }

  constructor(private env: AppConfigService,private http: HttpClient) {
    this.baseUrl = env.config.servicesBaseUrl;
  }
  
}
