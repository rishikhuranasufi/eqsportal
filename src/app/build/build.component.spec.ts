/* tslint:disable:no-unused-variable */

import {TestBed, async } from '@angular/core/testing';
import {BuildComponent } from './build.component';
import {Router} from '@angular/router';
import {BuildService} from './build.service';

describe('Component: Build', () => {

  it('should create an instance', () => {
    const component = new BuildComponent(this.router, this.buildServic);
    expect(component).toBeTruthy();
  });
});
