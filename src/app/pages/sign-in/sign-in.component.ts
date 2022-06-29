import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
	public hidePassword: boolean = true;
	public password: string = '';
	public error: string = '';

	constructor(public router: Router, private authenticationService: AuthenticationService) {}

	ngOnInit(): void {}

	public async signIn(): Promise<void> {
		this.error = '';

		const isSignedIn = await this.authenticationService.signIn(this.password);
		if (isSignedIn) {
			this.router.navigate(['/']);
			return;
		}
    this.password = '';
		this.error = 'The password you have entered is incorrect.';
	}
}
