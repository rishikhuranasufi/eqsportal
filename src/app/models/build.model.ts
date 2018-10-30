export class Build {
  private static DEFAULT_CHECK_VALUE = true;
  private static DEFAULT_UNCHECK_VALUE = false;

  githuburi: string;
  githubcredentialid: string;
  email: string;
  verify: boolean;
  clair: boolean;
  coverity: boolean;
  sourceclear: boolean;
  checkmarx: boolean;
  sonar: boolean;
  sqi: boolean;
  dev: boolean;
  sit: boolean;
  svt: boolean;
  preprod: boolean;
  prod: boolean;
  jenkinsfilePath: string;
  jenkinsEnvFile: string;
  success: boolean;
  failure: boolean;
  applicationType: string;
  buildType: string;
  environmentType: string;
  coverityCheckmarx: string;
  errorMessage: string;
  docker: boolean;
  nexus: boolean;
  projectFilePath: string;
  testdetails: any;
  devTest: boolean;
  sqiTest: boolean;
  sitTest: boolean;
  svtTest: boolean;
  preprodTest: boolean;
  prodTest: boolean;

  constructor() {
    this.verify = Build.DEFAULT_CHECK_VALUE;
    this.sonar = Build.DEFAULT_CHECK_VALUE;
    this.sourceclear = Build.DEFAULT_CHECK_VALUE;
    this.docker = Build.DEFAULT_UNCHECK_VALUE;
    this.nexus = Build.DEFAULT_CHECK_VALUE;
    this.clair = Build.DEFAULT_UNCHECK_VALUE;
    this.coverity = Build.DEFAULT_UNCHECK_VALUE;
    this.checkmarx = Build.DEFAULT_UNCHECK_VALUE;
    this.dev = Build.DEFAULT_UNCHECK_VALUE;
    this.sit = Build.DEFAULT_UNCHECK_VALUE;
    this.svt = Build.DEFAULT_UNCHECK_VALUE;
    this.sqi = Build.DEFAULT_UNCHECK_VALUE;
    this.preprod = Build.DEFAULT_UNCHECK_VALUE;
    this.prod = Build.DEFAULT_UNCHECK_VALUE;
    this.applicationType = 'java';
    this.buildType = 'maven';
    this.environmentType = 'pcf';
    this.coverityCheckmarx = 'coverity';
    this.success = Build.DEFAULT_UNCHECK_VALUE;
    }
}

