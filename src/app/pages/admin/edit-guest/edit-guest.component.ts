import { IGuestCollection } from './../../../core/models/guest.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ISimpleGuest, ISimpleGuestCollection } from 'src/app/core/models/guest.model';
import { GuestService } from 'src/app/core/services/guest.service';

@Component({
	selector: 'app-edit-guest',
	templateUrl: './edit-guest.component.html',
	styleUrls: ['./edit-guest.component.scss']
})
export class EditGuestComponent implements OnInit {
	public id: string = '';

	public coupleNames: string = '';
	public firstPerson: string = '';
	public secondPerson: string = '';
	public thirdPerson: string = '';

	private guestCollection: ISimpleGuestCollection;

	constructor(public router: Router, public route: ActivatedRoute, public service: GuestService) {
		this.route.paramMap.subscribe(async (params) => {
			const idParams = params.get('id');
			if (idParams == null) throw new Error('No valid ID of guest collection');

			this.id = idParams;
		});
	}

	async ngOnInit(): Promise<void> {
		this.guestCollection = (await this.service.findById(this.id)) as ISimpleGuestCollection;
		this.fillFields();
	}

	private fillFields(): void {
		this.coupleNames = this.guestCollection.name;
		this.firstPerson = this.guestCollection.persons[0]?.name ?? '';
		this.secondPerson = this.guestCollection.persons[1]?.name ?? '';
		this.thirdPerson = this.guestCollection.persons[2]?.name ?? '';
	}

	public async save(): Promise<void> {
		this.guestCollection.name = this.coupleNames;

		this.checkPerson(0, this.firstPerson);
		this.checkPerson(1, this.secondPerson);
		this.checkPerson(2, this.thirdPerson);

		await this.service.updateSimple(this.guestCollection);

		this.guestCollection = {
			id: '',
			name: '',
			persons: []
		};

		this.id = '';
		this.coupleNames = '';
		this.firstPerson = '';
		this.secondPerson = '';
		this.thirdPerson = '';

		this.router.navigate(['/admin']);
	}

	public async delete(): Promise<void> {
		await this.service.delete(this.id);

		this.guestCollection = {
			id: '',
			name: '',
			persons: []
		};

		this.id = '';
		this.coupleNames = '';
		this.firstPerson = '';
		this.secondPerson = '';
		this.thirdPerson = '';

		this.router.navigate(['/admin']);
	}

	private checkPerson(index: number, name: string): void {
		if (name.length > 0 && this.guestCollection.persons[index] != null) {
			this.guestCollection.persons[index].name = name;
		}

		if (name.length === 0 && this.guestCollection.persons[index] != null) {
			this.guestCollection.persons = this.guestCollection.persons.splice(index, 1);
		}

		if (name.length > 0 && this.guestCollection.persons[index] == null) {
			this.guestCollection.persons.push({
				id: (index + 1).toString(),
				name: name
			});
		}
	}
}
