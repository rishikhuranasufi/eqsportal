import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

import { Build } from '../models/build.model';
import { AppConfigService } from 'src/app/AppConfigService';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BuildService {
  baseUrl: String;

  constructor(private env: AppConfigService,private http: HttpClient) {
    this.baseUrl = env.config.servicesBaseUrl;
  }

  public createPipeline(build) {
    return this.http.post<Build>(this.baseUrl + '/v1/create-pipeline', build);
  }
}
