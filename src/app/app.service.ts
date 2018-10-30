import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { error } from 'selenium-webdriver';
import { AppConfigService } from 'src/app/AppConfigService';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AppService {
    obj:object;
    baseUrl: String;    
    
    constructor(private env: AppConfigService,private http: HttpClient) {
        this.baseUrl = env.config.servicesBaseUrl;
      }
    user: User;
    
    changePassword(passwordDetails){        
        this.obj = {
            username: sessionStorage.getItem('currentUsername'),
            oldPassword: passwordDetails.oldPassword,
            newPassword: passwordDetails.newPassword
        }
        return this.http.put<any>(this.baseUrl + '/v1/userPasswordUpdate' +'/'+sessionStorage.getItem('currentUsername')+'/'
        +passwordDetails.oldPassword+'/'+passwordDetails.newPassword, this.obj)
            .pipe(map(user => {                            
                return user;
            }
        ));
    }

  
}
