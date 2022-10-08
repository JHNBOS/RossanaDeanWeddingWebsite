export interface IDietaryForm {
	id: string;
	name: string;
	restrictions: Array<string>;
	other: string;
}

export class DietaryForm implements IDietaryForm {
	public id: string = '';
	public name: string = '';
	public restrictions: string[] = [];
	public other: string = '';

	constructor() {}
}
