import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './../../core/services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: [ './sign-in.component.scss' ]
} )
export class SignInComponent {
	public hidePassword = true;
	public password = '';
	public error = '';

	constructor( public router: Router, private authenticationService: AuthenticationService, private translate: TranslateService ) {}

	public async signIn(): Promise<void> {
		this.error = '';

		const isSignedIn = await this.authenticationService.signIn( this.password );
		if ( isSignedIn ) {
			this.router.navigate( [ '/' ] );
			return;
		}

		this.password = '';
		this.error = 'The password you have entered is incorrect.';
		if ( this.translate.currentLang === 'nl' ) this.error = 'Het door u ingevoerde wachtwoord is onjuist.';
		if ( this.translate.currentLang === 'pt' ) this.error = 'A senha que você digitou está incorreta.';
	}
}
