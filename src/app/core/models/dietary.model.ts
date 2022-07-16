export interface IDietaryForm {
	name: string;
	restrictions: Array<string>;
	other: string;
}

export class DietaryForm implements IDietaryForm {
	public name: string = '';
	public restrictions: string[] = [];
	public other: string = '';

	constructor() {}
}
