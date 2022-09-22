import { IGuestCollection, ISimpleGuestEdit, ISimpleGuestEditCollection } from './../../../core/models/guest.model';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GuestService } from 'src/app/core/services/guest.service';
import { Timestamp } from 'firebase/firestore';

@Component({
	selector: 'app-edit-guest',
	templateUrl: './edit-guest.component.html',
	styleUrls: ['./edit-guest.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class EditGuestComponent implements OnInit {
	public id: string = '';
	public coupleNames: string = '';

	public guests: IGuestCollection;
	public guestCollection: ISimpleGuestEditCollection = {
		id: '',
		name: '',
		persons: []
	};

	constructor(public router: Router, public route: ActivatedRoute, public service: GuestService) {
		this.route.paramMap.subscribe(async (params) => {
			const idParams = params.get('id');
			if (idParams == null) throw new Error('No valid ID of guest collection');

			this.id = idParams;
		});
	}

	async ngOnInit(): Promise<void> {
		this.guests = await this.service.findById(this.id);
		this.guestCollection = {
			id: this.guests.id,
			name: this.guests.name,
			persons: this.guests.persons.map((p, index) => {
				return {
					id: p.id != null && p.id.length > 0 ? p.id : (index + 1).toString(),
					name: p.name,
					isAttending: p.isAttending ?? false,
					repliedAt: p.repliedAt ?? null,
					isNew: false
				};
			})
		};
		this.fillFields();
	}

	private fillFields(): void {
		this.coupleNames = this.guestCollection.name;
	}

	public trackGuest(index: number, guest: ISimpleGuestEdit): any {
		return guest.id;
	}

	public isAttending(guest: ISimpleGuestEdit): boolean {
		const person = this.guestCollection.persons.find((g) => g.id === guest.id || g.name === guest.name);
		if (person != null) {
			return person.isAttending;
		}
		return false;
	}

	public addGuest(): void {
		const id = (this.guestCollection.persons.length + 1).toString();
		const name = `Guest #${this.guestCollection.persons.filter((p) => p.isNew).length + 1}`;
		const guest: ISimpleGuestEdit = { id: id, name: name, isNew: true, isAttending: false, repliedAt: null };
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

		await this.service.updateSimple(this.guestCollection);

		this.guestCollection = {
			id: '',
			name: '',
			persons: []
		};

		this.id = '';
		this.coupleNames = '';

		this.router.navigate(['/admin']);
	}

	public async delete(): Promise<void> {
		if (confirm('Are you sure you want to delete all the guests?') === false) return;

		await this.service.delete(this.id);

		this.guestCollection = {
			id: '',
			name: '',
			persons: []
		};

		this.id = '';
		this.coupleNames = '';

		this.router.navigate(['/admin']);
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
}
