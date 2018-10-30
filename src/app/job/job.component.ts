import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule, Validators, NgForm } from '@angular/forms';
import {Job} from '../models/job.model';
import {JobService} from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  job: Job = new Job();
  isValidFormSubmitted = false;
  form: NgForm;

  ngOnInit() {
  }

  resetForm(): void {
    this.job = new Job();
    this.isValidFormSubmitted = true;
    this.form.resetForm();
  }

  constructor(private router: Router, private jobService: JobService) {
  }

  createJob(form: NgForm): void {
    this.isValidFormSubmitted = false;

    if (form.invalid) {
       return;
    }

    this.isValidFormSubmitted = true;

    this.jobService.createJob(this.job)
      .subscribe(data => {
        this.job = data;
      });
  }
}
