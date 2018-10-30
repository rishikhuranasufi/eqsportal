import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule, Validators, NgForm } from '@angular/forms';
import {Bamboo } from '../models/bamboo.model';
import {BambooService} from './bamboo.service';
import {browser } from 'protractor';

@Component({
  selector: 'app-bamboo',
  templateUrl: './bamboo.component.html',
  styleUrls: ['./bamboo.component.css']
})
export class BambooComponent implements OnInit {

  bamboo: Bamboo = new Bamboo();
  isValidFormSubmitted = false;
  validateEmail = true;
  form: NgForm;

  popUpValue = {
     testGitURI: '',
     testCaseExecVia: '',
     testCaseCommand: '',
     type: '',
     status: false
  }

  showValidationError:boolean;

  displayCustomPopup: Boolean = false;

  ObjToSend: Array<Object> = [];


  javaBuildType = [
    {id: 'maven', name: 'maven'},
    {id: 'gradle', name: 'gradle'}
  ];

  javascriptBuildType = [
    {id: 'npm', name: 'npm'},
    {id: 'yarn', name: 'yarn'}
  ];

  testCaseToBeExecuteIn = [
    {id: 'maven', name: 'maven'},
    {id: 'gradle', name: 'gradle'},
    {id: 'npm', name: 'npm'},
    {id: 'yarn', name: 'yarn'}
  ];

  resetForm(): void {
    this.isValidFormSubmitted = true;
    this.validateEmail = false;
    this.bamboo = new Bamboo();
    this.ObjToSend = [];
  }



  constructor(private router: Router, private bambooService: BambooService) {
  }

  ngOnInit() {
  }

  createBambooPlan(form: NgForm): void {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
       return;
    }
    this.isValidFormSubmitted = true;
    this.bamboo.testdetails = this.ObjToSend;

    this.bambooService.createBambooPlan(this.bamboo)
      .subscribe(data => {
        this.bamboo = data;        
      })
    ;

  }


  onClickofTestCasesCheckbox(data, status){
    if (!status){
      this.displayCustomPopup = false;
    console.log('data', data);
    this.ObjToSend = this.ObjToSend.filter(function( obj ) {
      return obj['type'] !== data;
    });
    console.log('this.ObjToSend', this.ObjToSend);
    return;
    }

    this.popUpValue = {
      testGitURI: '',
      testCaseExecVia: '',
      testCaseCommand: '',
      type: '',
      status: false
    }


    console.log('data', data);
    console.log('status', status);
    this.popUpValue.type = data;
    this.popUpValue.status = status;
    this.ObjToSend.push(Object.assign({}, this.popUpValue));
    this.displayCustomPopup = true;
    console.log('this.ObjToSend', this.ObjToSend);
  }

  closeDownloadPopUp(close:boolean){    
    this.resetForm()
  }

  closePopup(data) {
    console.log('data', data);
    if (data === 'DEV') {
      this.bamboo['devTest'] = false;
    } else if (data === 'SQI') {
      this.bamboo['sqiTest'] = false;
    }

    this.ObjToSend = this.ObjToSend.filter(function( obj ) {
      return obj['type'] !== data;
    });

    this.displayCustomPopup = false;

    this.showValidationError = false;
    console.log('this.ObjToSend', this.ObjToSend);
  }

  onCursorRelease(popUpValue){
    if(this.showValidationError && 
      (popUpValue.testGitURI == '' || popUpValue.testCaseCommand == ''  || popUpValue.testCaseExecVia == '') ){
      this.showValidationError = true;
      return;
    }else{
      this.showValidationError = false;
    } 
  }

  saveTestDetails(popUpValue) {
    console.log('Test ', popUpValue);

    if(popUpValue.testGitURI == '' || popUpValue.testCaseCommand == ''  || popUpValue.testCaseExecVia == '' ){
      this.showValidationError = true;
      return;
    } 


    this.ObjToSend.forEach(val => {
      if (val['type'] === popUpValue.type){
        val['testGitURI'] = popUpValue.testGitURI;
        val['testCaseExecVia'] = popUpValue.testCaseExecVia;
        val['testCaseCommand'] = popUpValue.testCaseCommand;
      }
    });
    console.log('this.ObjToSend', this.ObjToSend);
    this.displayCustomPopup = false;
  }

}
