import { Component, OnInit } from '@angular/core';
import {Manage} from '../models/manage.model';
import {User} from "../models/user.model";
import {Router, ActivatedRoute } from '@angular/router';
import {ManageService} from './manage.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  manage: Manage = new Manage()
  users : User[];

  constructor(private router: Router, private manageService: ManageService) { }

  ngOnInit() {
    this.manageService.getUsers()
    .subscribe( data => {
      this.users = data;
      //alert(this.users[0].role)
    });
  }
  
  deleteUser(user: User): void {
    this.manageService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: User): void {
    sessionStorage.removeItem("editUserId");
    sessionStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };


}
