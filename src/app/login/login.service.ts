import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Login} from '../models/login.model';
import {User} from '../models/user.model';
import { map } from 'rxjs/operators';
import { AppConfigService } from 'src/app/AppConfigService';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class LoginService {

    user: User;
    baseUrl: String;
  
  constructor(private env: AppConfigService,private http: HttpClient) {
    this.baseUrl = env.config.servicesBaseUrl;
  }

  login(login) {
    return this.http.post<any>(this.baseUrl + '/v1/api/auth/signin', login)
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.accessToken) {
                this.user = user;
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('currentUserrole', user.role);
                sessionStorage.setItem('currentName', user.name);
                sessionStorage.setItem('currentUsername', user.username);
                sessionStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        }
    ));
}

logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUserrole');
    sessionStorage.removeItem('currentUsername');
    sessionStorage.removeItem('currentName');
    sessionStorage.removeItem('currentUser');
}
  
}
