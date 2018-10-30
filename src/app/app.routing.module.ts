import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards';


import {BuildComponent } from './build/build.component';
import {BambooComponent } from './bamboo/bamboo.component';
import {JobComponent} from './job/job.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './login/logout.component';
import {SignupComponent} from './signup/signup.component';
import {ManageComponent} from './manage/manage.component';

const routes: Routes = [
  { path: 'build', component: BuildComponent },
  { path: 'home', component: HomeComponent },
  { path: 'job', component: JobComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bamboo', component: BambooComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'manage', component: ManageComponent },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
