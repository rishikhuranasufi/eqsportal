import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule, Validators, NgForm } from '@angular/forms';
import {Build } from '../models/build.model';
import {BuildService} from './build.service';
import {browser } from 'protractor';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})

export class BuildComponent implements OnInit {

  build: Build = new Build();
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
    this.build = new Build();
    this.ObjToSend = [];
    //this.form.resetForm();
  }

  downloadJenkinsFile(): void {
    location.href = this.build.jenkinsfilePath;
  }

  downloadJenkinsEnvFile(): void {
    location.href = this.build.jenkinsEnvFile;
  }

  constructor(private router: Router, private buildService: BuildService) {
  }

  ngOnInit() {
  }

  createPipeline(form: NgForm): void {

    this.isValidFormSubmitted = false;
    if (form.invalid) {
       return;
    }
    this.isValidFormSubmitted = true;
    this.build.testdetails = this.ObjToSend;

    this.buildService.createPipeline(this.build)
      .subscribe(data => {
        this.build = data;        
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
      this.build['devTest'] = false;
    } else if (data === 'SQI') {
      this.build['sqiTest'] = false;
    }

    this.ObjToSend = this.ObjToSend.filter(function( obj ) {
      return obj['type'] !== data;
    });

    this.displayCustomPopup = false;

    this.showValidationError = false;
    console.log('this.ObjToSend', this.ObjToSend);
  }

  onCursorRelease(popUpValue){
    //alert("test");
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
