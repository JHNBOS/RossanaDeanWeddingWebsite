import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component( {
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
} )
export class HeaderComponent implements OnInit {
	public isRsvpForm = false;
	public clickCount = 0;

	constructor( public router: Router, public translate: TranslateService ) {}

	ngOnInit(): void
  {
		this.isRsvpForm = this.router.url.includes( 'rsvp' );
	}

	public enterAdminMenu(): void
  {
		this.clickCount++;

		if ( this.clickCount < 5 ) return;

		this.clickCount = 0;
		this.router.navigate( [ 'admin' ] );
	}

	public translateWebsite( langCode: string ): void
  {
		this.translate.use( langCode );
		localStorage.setItem( 'lang', langCode );
	}
}
