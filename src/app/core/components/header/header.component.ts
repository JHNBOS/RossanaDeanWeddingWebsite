import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public isRsvpForm: boolean = false;
	public clickCount: number = 0;

	constructor(public router: Router) {}

	ngOnInit(): void {
		this.isRsvpForm = this.router.url.includes('rsvp');
	}

	public enterAdminMenu(): void {
		this.clickCount++;

		if (this.clickCount < 5) return;

		this.clickCount = 0;
		this.router.navigate(['admin']);
	}
}
