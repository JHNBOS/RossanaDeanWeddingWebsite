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

	constructor( public router: Router, public authenticationService: AuthenticationService, public translate: TranslateService )
  {
		this.initializeLanguage();
		this.authenticationService.saveSecret();
	}

	ngOnInit(): void
  {
		this.isLoggedIn = this.authenticationService.isLoggedIn;

		this.router.events.subscribe( async () => {
			this.isLoggedIn = this.authenticationService.isLoggedIn;
      this.initializeLanguage();
		} );
	}

	private initializeLanguage(): void
  {
		this.translate.addLangs( [ 'en', 'nl', 'pt' ] );
		this.translate.setDefaultLang( 'en' );

		let language = 'en';
		const browserLanguage = window.navigator.language;

		if ( browserLanguage.includes( '-' ) === false ) language = browserLanguage;
		else language = browserLanguage.split( '-' )[0];

    language = this.checkLanguage(language);
    this.translate.use( language );
	}

	private checkLanguage(currentLanguage: string): string
  {
		const savedLanguageCode = localStorage.getItem( 'lang' );
		if ( savedLanguageCode == null ) return currentLanguage;
    return savedLanguageCode;
	}
}
