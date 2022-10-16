import { ISimpleGuest, ISimpleGuestCollection, ISimpleGuestEdit, ISimpleGuestEditCollection } from './../../../core/models/guest.model';
import { GuestService } from './../../../core/services/guest.service';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Component({
	selector: 'app-add-guest',
	templateUrl: './add-guest.component.html',
	styleUrls: ['./add-guest.component.scss']
})
export class AddGuestComponent implements OnInit {
	public coupleNames: string = '';

	public guestCollection: ISimpleGuestEditCollection = {
		id: '',
		name: '',
		persons: []
	};

	constructor(public service: GuestService) {}

	ngOnInit(): void {}

	public trackGuest(index: number, guest: ISimpleGuestEdit): any {
		return index;
	}

	public isAttending(guest: ISimpleGuestEdit): boolean {
		const person = this.guestCollection.persons.find((g) => g.id === guest.id || g.name === guest.name);
		if (person != null) {
			return person.isAttending;
		}
		return false;
	}

	public hasRequestedSeat(guest: ISimpleGuestEdit): boolean {
		const person = this.guestCollection.persons.find((g) => g.id === guest.id || g.name === guest.name);
		if (person != null) {
			return person.requestSeatOnBus != null && person.requestSeatOnBus === true;
		}
		return false;
	}

	public addGuest(): void {
		const id = (this.guestCollection.persons.length + 1).toString();
		const name = `Guest #${this.guestCollection.persons.filter((p) => p.isNew).length + 1}`;
		const guest: ISimpleGuestEdit = { id: id, name: name, isNew: true, isAttending: false, requestSeatOnBus: false, repliedAt: null };
		this.guestCollection.persons.push(guest);
	}

	public deleteGuest(guest: ISimpleGuestEdit): void {
		if (confirm('Are you sure you want to delete this guest?') === false) return;

		const index = this.guestCollection.persons.findIndex((g) => g.id === guest.id);
		if (index > -1) {
			this.guestCollection.persons.splice(index, 1);
		}
	}

	public async save(): Promise<void> {
		this.guestCollection.name = this.coupleNames;

		await this.service.add(this.guestCollection);

		this.guestCollection = {
			id: '',
			name: '',
			persons: []
		};

		this.coupleNames = '';
	}

	public setAttending(guest: ISimpleGuestEdit, isAttending: boolean): void {
		const person = this.guestCollection.persons.find((g) => g.id === guest.id);
		if (person != null) {
			person.isAttending = isAttending;

			if (person.isNew || (person.isNew === false && person.repliedAt == null)) {
				person.repliedAt = Timestamp.now();
			}
		}
	}

	public setRequestedSeat(guest: ISimpleGuestEdit, value: boolean): void {
		const person = this.guestCollection.persons.find((g) => g.id === guest.id);
		if (person != null) {
			person.requestSeatOnBus = value;
		}
	}
}
