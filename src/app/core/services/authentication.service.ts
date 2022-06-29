import { ISimpleValidationModel, ValidationModel } from './../models/validation.model';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { doc, Firestore, collection, CollectionReference, getDoc } from '@angular/fire/firestore';
import { IValidationModel } from '../models/validation.model';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private dbPath = '/tokens';
	private id = 'secret';

	private collection: CollectionReference<ISimpleValidationModel>;

	constructor(public router: Router, public ngZone: NgZone, private firestore: Firestore) {
		this.collection = collection(this.firestore, this.dbPath) as CollectionReference<ISimpleValidationModel>;
	}

	public async getSecret(): Promise<ValidationModel> {
		const ref = doc(this.firestore, this.dbPath, this.id);
		const secrets = await getDoc(ref);
		return new ValidationModel((secrets.data() as ISimpleValidationModel).token);
	}

	public async signIn(token: string): Promise<boolean> {
		const secretToken = await this.getSecret();
		if (secretToken.token == token) {
			localStorage.setItem(this.id, JSON.stringify(secretToken));
			return true;
		}

		return false;
	}

	public get isLoggedIn(): boolean {
		const token = JSON.parse(localStorage.getItem(this.id)!);
		const secret = token as IValidationModel;

		if (secret == null) return false;

		const validUntill = moment(secret.validUntill);
		const isValid = moment().isBefore(validUntill);

		if (isValid === false) {
			localStorage.removeItem(this.id);
		}

		return isValid;
	}
}
