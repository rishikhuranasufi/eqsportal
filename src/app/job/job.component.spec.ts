/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { JobComponent } from './job.component';
import { JobService } from './job.service';
import { Router } from '@angular/router';

describe('Component: Job', () => {
  it('should create an instance', () => {
    const component = new JobComponent(this.router, this.jobService );
    expect(component).toBeTruthy();
  });
});
