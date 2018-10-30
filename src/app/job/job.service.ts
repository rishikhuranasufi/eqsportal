import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../models/job.model';
import { AppConfigService } from 'src/app/AppConfigService';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class JobService {

  constructor(private env: AppConfigService,private http: HttpClient) {
    this.baseUrl = env.config.servicesBaseUrl;
  }
  baseUrl: String;
  

  public createJob(job) {
    return this.http.post<Job>(this.baseUrl + '/v1/create-job', job);
  }

}
