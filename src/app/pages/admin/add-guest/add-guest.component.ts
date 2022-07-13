import { ISimpleGuest, ISimpleGuestCollection } from './../../../core/models/guest.model';
import { GuestService } from './../../../core/services/guest.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-add-guest',
	templateUrl: './add-guest.component.html',
	styleUrls: ['./add-guest.component.scss']
})
export class AddGuestComponent implements OnInit {
	public coupleNames: string = '';
	public firstPerson: string = '';
	public secondPerson: string = '';
	public thirdPerson: string = '';

	private guestCollection: ISimpleGuestCollection = {
		id: '',
		name: '',
		persons: []
	};

	constructor(public service: GuestService) {}

	ngOnInit(): void {}

	public async save(): Promise<void> {
		this.guestCollection.name = this.coupleNames;
		this.guestCollection.persons.push({
			id: '1',
			name: this.firstPerson
		} as ISimpleGuest);

		if (this.secondPerson.length > 0) {
			this.guestCollection.persons.push({
				id: '2',
				name: this.secondPerson
			});
		}

		if (this.thirdPerson.length > 0) {
			this.guestCollection.persons.push({
				id: '3',
				name: this.thirdPerson
			});
		}

		await this.service.add(this.guestCollection);

		this.guestCollection = {
			id: '',
			name: '',
			persons: []
		};

		this.coupleNames = '';
		this.firstPerson = '';
		this.secondPerson = '';
		this.thirdPerson = '';
	}
}
