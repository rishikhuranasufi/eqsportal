import {Injectable} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LogoutService {
    constructor(private router: Router){
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUserrole');
        sessionStorage.removeItem('currentUsername');
        sessionStorage.removeItem('currentName');
        sessionStorage.removeItem('currentUser');    
        this.router.navigate(['/login']);
        setTimeout(function(){
            location.reload();
        },500)
        //Hard coded reload required to hide left pannel links.
    }
}