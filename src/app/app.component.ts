import { AuthenticationService } from './core/services/authentication.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from './core/services/data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
	public isLoggedIn: boolean = false;

	constructor(public router: Router, public dataService: DataService, public authenticationService: AuthenticationService) {
		this.authenticationService.saveSecret();
	}

	ngOnInit(): void {
		this.isLoggedIn = this.authenticationService.isLoggedIn;

		this.router.events.subscribe(async () => {
			this.isLoggedIn = this.authenticationService.isLoggedIn;
		});
	}

	ngAfterViewInit(): void {}
}
