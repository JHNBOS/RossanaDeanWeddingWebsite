import { Component, OnInit } from '@angular/core';

@Component( {
	selector: 'app-rsvp',
	templateUrl: './rsvp.component.html',
	styleUrls: [ './rsvp.component.scss' ]
} )
export class RsvpComponent implements OnInit {
	public hasReplied = false;

	constructor() {}

	ngOnInit(): void {
		this.hasReplied = localStorage.getItem( 'rsvp' ) != null ? true : false;
	}
}
