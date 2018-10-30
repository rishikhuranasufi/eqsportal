export class Bamboo {
    private static DEFAULT_CHECK_VALUE = true;
    private static DEFAULT_UNCHECK_VALUE = false;
  
    environmentType: string;
    applicationType: string;
    buildType: string;

    githuburi: string;

    bambooUri: string;
    bamboousername: string;
    bamboopassword: string;
    projectName: string;
    projectkey: string;
    planName: string;
    planKey: string;
    projectDescription: string;

    jetpack: boolean;
    sqi: boolean;
    dev: boolean;
    sit: boolean;
    svt: boolean;
    preprod: boolean;
    prod: boolean;

    devTest: boolean;
    sqiTest: boolean;
    sitTest: boolean;
    svtTest: boolean;
    preprodTest: boolean;
    prodTest: boolean;

    success: boolean;
    failure: boolean;
    errorMessage: string;
    testdetails: any;
    bambooPlanUrl: string;


  
    constructor() {

      this.dev = Bamboo.DEFAULT_UNCHECK_VALUE;
      this.sit = Bamboo.DEFAULT_UNCHECK_VALUE;
      this.svt = Bamboo.DEFAULT_UNCHECK_VALUE;
      this.sqi = Bamboo.DEFAULT_UNCHECK_VALUE;
      this.preprod = Bamboo.DEFAULT_UNCHECK_VALUE;
      this.prod = Bamboo.DEFAULT_UNCHECK_VALUE;
      this.jetpack = Bamboo.DEFAULT_UNCHECK_VALUE;
      this.applicationType = 'java';
      this.buildType = 'maven';
      this.environmentType = 'pcf';
      this.success = Bamboo.DEFAULT_UNCHECK_VALUE;
      }
  }
  
  