import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
	constructor(public authenticationService: AuthenticationService, public router: Router) {}

	canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		if (route.path?.includes('sign-in')) return true;
		return this.authenticationService.isLoggedIn;
	}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		const isLoggedIn = this.authenticationService.isLoggedIn;
		if (isLoggedIn === false) {
			return this.authenticationService.signOut().then(() => {
				this.router.navigate(['sign-in']);
				return false;
			});
		}
		return true;
	}
}
