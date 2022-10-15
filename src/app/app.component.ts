import { AuthenticationService } from './core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
	public isLoggedIn = false;

	constructor( public router: Router, public authenticationService: AuthenticationService, public translate: TranslateService ) {
		translate.addLangs(
			[ 'en', 'nl', 'pt' ] );
		translate.setDefaultLang( 'en' );
		translate.use( 'en' );

		this.authenticationService.saveSecret();
	}

	ngOnInit(): void {
		this.isLoggedIn = this.authenticationService.isLoggedIn;

		this.router.events.subscribe( async () => {
			this.isLoggedIn = this.authenticationService.isLoggedIn;
		} );
	}
}
