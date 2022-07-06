import * as moment from 'moment';

export interface ISimpleValidationModel {
	token: string;
}

export interface IValidationModel extends ISimpleValidationModel {
	token: string;
	validatedAt: Date | null;
	validUntill: Date | null;
	setSignIn(token: string): void;
}

export class ValidationModel implements ISimpleValidationModel, IValidationModel {
	public token: string;
	public validatedAt: Date | null;
	public validUntill: Date | null;

	constructor(token: string) {
		this.token = token;
		this.validatedAt = null;
		this.validUntill = null;
	}

	public setSignIn(token: string): void {
		this.token = token;
		this.validatedAt = moment().toDate();
		this.validUntill = moment().add(2, 'hours').toDate();
	}

	public static createFromJson(json: any): ValidationModel {
		const model = new ValidationModel('');
		model.token = json.token;
		model.validatedAt = json.validatedAt;
		model.validUntill = json.validUntill;
		return model;
	}
}
