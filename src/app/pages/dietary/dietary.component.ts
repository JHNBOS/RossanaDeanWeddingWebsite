import { DietaryForm } from './../../core/models/dietary.model';
import { DietaryService } from './../../core/services/dietary.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import moment from 'moment';

@Component({
	selector: 'app-dietary',
	templateUrl: './dietary.component.html',
	styleUrls: ['./dietary.component.scss']
})
export class DietaryComponent implements OnInit {
	public name: string = '';
	public otherRestrictions: string = '';
	public showInput: boolean = false;
	public hasReplied: boolean = false;
	public disableSubmit: boolean = true;

	@ViewChild(MatSelectionList) restrictions: MatSelectionList;
	@ViewChild(MatInput) otherInput: MatInput;

	constructor(private service: DietaryService) {}

	async ngOnInit(): Promise<void> {
		const dietaryKey = localStorage.getItem('dietary');
		this.hasReplied = dietaryKey != null;
	}

	public showHideInput(): void {
		const isSelected = this.restrictions.selectedOptions.selected.filter((option) => option.value === 'other').length > 0;
		this.showInput = isSelected;
	}

	public async sendForm(): Promise<void> {
		const restrictions = this.restrictions.selectedOptions.selected.map((m) => m.value as string);

		localStorage.setItem('dietary', moment().format('DD-MM-YYYY HH:mm'));

		const diet = new DietaryForm();
		diet.name = this.name;
		diet.other = this.otherRestrictions;
		diet.restrictions = restrictions;

		await this.service.add(diet);

		this.restrictions.deselectAll();
		this.showInput = false;
		this.otherRestrictions = '';
		this.name = '';
	}

	public onChange() {
		this.disableSubmit =
			this.restrictions.selectedOptions.selected.length === 0 ||
			this.name.length === 0 ||
			(this.restrictions.selectedOptions.selected.filter((option) => option.value === 'other').length > 0 &&
				this.otherRestrictions.length === 0);
	}
}
