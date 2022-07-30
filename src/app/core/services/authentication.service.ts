import { ISimpleValidationModel, ValidationModel } from './../models/validation.model';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { doc, Firestore, collection, CollectionReference, getDoc, setDoc } from '@angular/fire/firestore';
import { IValidationModel } from '../models/validation.model';
import * as moment from 'moment';
import { Auth, signInAnonymously, User } from '@angular/fire/auth';
import { signOut, User as FireUser, UserCredential } from 'firebase/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private dbPath = '/tokens';
	private secretKey = 'aaTGGHGhvbgcYRYUH1235I9Eadxcvbio';
	private id = 'secret';

	private collection: CollectionReference<ISimpleValidationModel>;
	public userData: User | null = null;

	constructor(public router: Router, public ngZone: NgZone, private firestore: Firestore, public fireAuth: Auth) {
		this.collection = collection(this.firestore, this.dbPath) as CollectionReference<ISimpleValidationModel>;

		this.fireAuth.onAuthStateChanged((user: User | null) => {
			if (user == null) {
				this.userData = null;
				localStorage.setItem('user', 'null');
				JSON.parse(localStorage.getItem('user')!);
				return;
			}

			this.userData = user;
			localStorage.setItem('user', JSON.stringify(this.userData));
			JSON.parse(localStorage.getItem('user')!);
		});
	}

	public async signOut(): Promise<void> {
		await signOut(this.fireAuth);

    this.removeSecret();
		localStorage.removeItem('user');
		this.router.navigate(['sign-in']);
	}

	public async loadSecret(): Promise<ValidationModel> {
		const ref = doc(this.firestore, this.dbPath, this.id);
		const secrets = await getDoc(ref);
		return new ValidationModel((secrets.data() as ISimpleValidationModel).token);
	}

	public async saveSecret(): Promise<void> {
		const secret = await this.loadSecret();
		this.setSecretKey(secret);
	}

	public async signIn(token: string): Promise<boolean> {
		const secretToken = this.getSecretKey();
		if (secretToken == null) return false;

		const model = new ValidationModel(secretToken);

		if (secretToken == token) {
			this.setSecret(model);

			const userData = await signInAnonymously(this.fireAuth);
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

	public getSecret(): ValidationModel | null {
		const json = JSON.parse(localStorage.getItem(this.id)!);
		if (json == null) return null;
		return ValidationModel.createFromJson(json);
	}

	public setSecret(secret: IValidationModel): void {
		secret.setSignIn(secret.token);
		localStorage.setItem(this.id, JSON.stringify(secret));
	}

	public getSecretKey(): string | null {
		const key = localStorage.getItem(this.secretKey);
		return key;
	}

	public setSecretKey(secret: IValidationModel): void {
		localStorage.setItem(this.secretKey, secret.token);
	}

	public removeSecret(): void {
		localStorage.removeItem(this.id);
	}
}
