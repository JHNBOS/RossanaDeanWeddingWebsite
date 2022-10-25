import { TranslateService } from '@ngx-translate/core';
import { GuestService } from './../../../core/services/guest.service';
import { IGuest, IGuestCollection } from './../../../core/models/guest.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import moment from 'moment';
import { Timestamp } from 'firebase/firestore';
import { Router } from '@angular/router';

@Component({
	selector: 'app-rsvp-form',
	templateUrl: './rsvp-form.component.html',
	styleUrls: ['./rsvp-form.component.scss']
})
export class RsvpFormComponent implements OnInit {
	public query: string = '';
	public guests: Array<IGuestCollection> = [];
	public selectedCollection: IGuestCollection | null = null;

	public formControl = new FormControl('');
	public filteredOptions: Observable<Array<IGuestCollection>> = new Observable<Array<IGuestCollection>>();

	@ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

	constructor(public router: Router, public service: GuestService, public translateService: TranslateService) {}

  public get isPortugese(): boolean { return this.translateService.currentLang === 'pt';}

	async ngOnInit(): Promise<void> {
		const collection = await this.service.list();
		this.guests = collection;

		this.filteredOptions = this.formControl.valueChanges.pipe(
			startWith(''),
			map((value) => {
				this.query = value ?? '';
				return this._filter(value || '');
			})
		);
	}

	public selectOption(event: MatAutocompleteSelectedEvent): void {
		const option = event.option;
		this.selectedCollection = option.value;
	}

	public setAttending(person: IGuest, isAttending: boolean): void {
		person.isAttending = isAttending;
	}

	public setRequestedSeatOnBus(person: IGuest, value: boolean): void {
		person.requestSeatOnBus = value;
	}

	public async sendForm(): Promise<void> {
		localStorage.setItem('rsvp', moment().format('DD-MM-YYYY HH:mm'));

		for (const guest of this.selectedCollection!.persons) {
			guest.repliedAt = Timestamp.now();
		}

		await this.service.update(this.selectedCollection!);

		this.router.navigate(['/rsvp']);
	}

	public displayGuests(option: IGuestCollection): string {
		return option.name;
	}

	private _filter(value: any): Array<IGuestCollection> {
		if (value == null) value = '';
		if (value.name) return [value];
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
