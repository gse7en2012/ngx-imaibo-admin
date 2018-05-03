import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private cookieService:CookieService) { }

    canActivate() {
        if ( this.cookieService.get('ydt_partner_itoken')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
