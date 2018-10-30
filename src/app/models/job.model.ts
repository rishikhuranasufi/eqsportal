export class Job {
  private static DEFAULT_UNCHECK_VALUE = false;
  jenkinsuri: string;
  jenkinsusername: string;
  jenkinspassword: string;
  jobname: string;
  gituri: string;
  credentialsId: string;
  jenkinsJobUrl: string;
  success: boolean;
  failure: boolean;
  errorMessage: string;

constructor() {
  this.success = Job.DEFAULT_UNCHECK_VALUE;
  }

}


