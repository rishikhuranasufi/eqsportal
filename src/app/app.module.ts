import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ,APP_INITIALIZER} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/index';
import {BuildComponent, BuildService} from './build/index';
import {BambooComponent, BambooService} from './bamboo/index';
import {ManageComponent, ManageService} from './manage/index';
import {LoginComponent, LoginService, LogoutService} from './login/index';
import {LogoutComponent} from './login/index';
import {SignupComponent, SignupService} from './signup/index';
import {JobComponent, JobService} from './job/index';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AppRoutingModule} from './app.routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppService } from 'src/app/app.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppConfigService } from 'src/app/AppConfigService';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {      
      return appConfig.loadAppConfig();
  }
};


@NgModule({
  declarations: [
    AppComponent,
    BuildComponent,
    BambooComponent,
    JobComponent,
    HomeComponent,
    ManageComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [BuildService, JobService, BambooService, ManageService, LoginService, LogoutService, SignupService, AppService, AppConfigService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },   
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: APP_INITIALIZER, useFactory: appInitializerFn ,multi: true, deps: [AppConfigService]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
