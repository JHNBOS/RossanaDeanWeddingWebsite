import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public isRsvpForm: boolean = false;

	constructor(public router: Router) {}

	ngOnInit(): void {
		this.isRsvpForm = this.router.url.includes('rsvp');
	}
}
