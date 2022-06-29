import * as moment from 'moment';

export interface ISimpleValidationModel {
	token: string;
}

export interface IValidationModel extends ISimpleValidationModel {
	token: string;
	validatedAt: Date;
	validUntill: Date;
}

export class ValidationModel implements ISimpleValidationModel, IValidationModel {
	public token: string;
	public validatedAt: Date;
	public validUntill: Date;

	constructor(token: string) {
		this.token = token;
		this.validatedAt = moment().toDate();
		this.validUntill = moment().add(12, 'hours').toDate();
	}
}
