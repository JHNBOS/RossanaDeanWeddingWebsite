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

	public async loadSecret(): Promise<ValidationModel> {
		const ref = doc(this.firestore, this.dbPath, this.id);
		const secrets = await getDoc(ref);
		return new ValidationModel((secrets.data() as ISimpleValidationModel).token);
	}

	public async saveSecret(): Promise<void> {
		const secret = await this.loadSecret();
		this.setSecret(secret);
	}

	public async signIn(token: string): Promise<boolean> {
		const secretToken = this.getSecret();
		if (secretToken == null) return false;

		if (secretToken.token == token) {
			secretToken.setSignIn(token);
			this.setSecret(secretToken);
			return true;
		}

		return false;
	}

	public get isLoggedIn(): boolean {
		const secretToken = this.getSecret();
		if (secretToken == null) return false;

		if (secretToken.validUntill == null) return false;

		const validUntill = moment(secretToken.validUntill);
		const isValid = moment().isBefore(validUntill);

		return isValid;
	}

	public getSecret(): ValidationModel {
		const json = JSON.parse(localStorage.getItem(this.id)!);
		return ValidationModel.createFromJson(json);
	}

	public setSecret(secret: IValidationModel): void {
		localStorage.setItem(this.id, JSON.stringify(secret));
	}

	public removeSecret(): void {
		localStorage.removeItem(this.id);
	}
}
