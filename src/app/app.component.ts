import { AuthenticationService } from './core/services/authentication.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from './core/services/data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
	public isLoggedIn: boolean = false;

	constructor(public dataService: DataService, public authenticationService: AuthenticationService) {}

	async ngOnInit(): Promise<void> {
		await this.authenticationService.saveSecret();
		this.isLoggedIn = this.authenticationService.isLoggedIn;
	}

	ngAfterViewInit(): void {}
}
