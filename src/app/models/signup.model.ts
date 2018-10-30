export class Signup {

    username: string;
    user: string;
    email: string;
    password: string;
    success: boolean;
    role: string;
    failure: boolean;
    errorString: string;
    enabled: boolean;

    constructor() {
        this.success =false;
        this.failure =false;
        this.role = 'USER';
        this.enabled = true;
        this.errorString='';

    }
}