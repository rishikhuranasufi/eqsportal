import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from 'src/app/AppConfigService';
import { Bamboo } from 'src/app/models/bamboo.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BambooService {
  baseUrl: String;

  constructor(private env: AppConfigService,private http: HttpClient) {
    this.baseUrl = env.config.servicesBaseUrl;
  }

  public createBambooPlan(bamboo) {
    return this.http.post<Bamboo>(this.baseUrl + '/v1/bamboo-plan', bamboo);
  }
}
