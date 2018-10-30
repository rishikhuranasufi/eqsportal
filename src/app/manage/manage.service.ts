import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../models/user.model';
import { AppConfigService } from 'src/app/AppConfigService';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ManageService {
    baseUrl: String;
    
    constructor(private env: AppConfigService,private http: HttpClient) {
      this.baseUrl = env.config.servicesBaseUrl;
    }

  getUsers(){
    return this.http.get<User[]>(this.baseUrl + '/v1/users');
  }


  getUserById(id: string) {
    return this.http.get<User>(this.baseUrl + '/v1/user' + '/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl + '/v1/user', user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/v1/user' + '/' + user.id, user);
  }

  deleteUser(id: String) {
    return this.http.delete(this.baseUrl + '/v1/user' + '/' + id);
  }
  
}
