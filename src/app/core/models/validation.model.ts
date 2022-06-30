import * as moment from 'moment';

export interface ISimpleValidationModel {
	token: string;
}

export interface IValidationModel extends ISimpleValidationModel {
	token: string;
	validatedAt: Date | null;
	validUntill: Date | null;
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

	public setSignIn(token: string) {
		this.token = token;
		this.validatedAt = moment().toDate();
		this.validUntill = moment().add(12, 'hours').toDate();
	}
}
