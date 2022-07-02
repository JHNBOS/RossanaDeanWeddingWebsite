import { SignInComponent } from './../../pages/sign-in/sign-in.component';
import { DataService } from './../services/data.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
	constructor(public authenticationService: AuthenticationService, public router: Router, public dataService: DataService) {}

	canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		if (environment.production == false) return true;

		if (route.path?.includes('sign-in')) return true;
		return this.authenticationService.isLoggedIn;
	}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (environment.production == false) return true;

		if (this.authenticationService.isLoggedIn === false || state.url.includes('sign-in')) {
			this.router.navigate(['sign-in']);
			return false;
		}
		return true;
	}
}
