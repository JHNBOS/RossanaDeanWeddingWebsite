import { GuestService } from './../../../core/services/guest.service';
import { IGuest, IGuestCollection } from './../../../core/models/guest.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
	selector: 'app-rsvp-form',
	templateUrl: './rsvp-form.component.html',
	styleUrls: ['./rsvp-form.component.scss']
})
export class RsvpFormComponent implements OnInit {
	public query: string = '';
	public guests: Array<IGuest> = [];

	public formControl = new FormControl('');
	public filteredOptions: Observable<Array<IGuest>> = new Observable<Array<IGuest>>();

	@ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

	constructor(public service: GuestService) {}

	async ngOnInit(): Promise<void> {
		const collection = await this.service.list();

		this.filteredOptions = this.formControl.valueChanges.pipe(
			startWith(''),
			map((value) => this._filter(value || ''))
		);
	}

	private _filter(value: string): IGuest[] {
		const filterValue = value.toLowerCase();
		return this.guests.filter((guest) => guest.name.toLowerCase().includes(filterValue));
	}

	public hideAutocomplete(): void {
		this.autocomplete.autocompleteDisabled = this.query === '' || this.query.length < 1;

		if (this.autocomplete.autocompleteDisabled) this.autocomplete.closePanel();
		else this.autocomplete.openPanel();
	}

	public onBackspace(): void {
		this.hideAutocomplete();
	}
}
