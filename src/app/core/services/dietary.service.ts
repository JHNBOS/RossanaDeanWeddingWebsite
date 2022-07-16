import { IDietaryForm } from './../models/dietary.model';
import { map, Observable } from 'rxjs';
import { Guest, IGuest, IGuestCollection, ISimpleGuest, ISimpleGuestCollection } from '../models/guest.model';
import { ISimpleValidationModel, ValidationModel } from '../models/validation.model';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { doc, Firestore, collection, CollectionReference, getDoc, collectionData, updateDoc, DocumentReference } from '@angular/fire/firestore';
import { IValidationModel } from '../models/validation.model';
import * as moment from 'moment';
import { addDoc, deleteDoc, getDocs, setDoc } from 'firebase/firestore';

@Injectable({
	providedIn: 'root'
})
export class DietaryService {
	private dbPath = '/dietary';

	private collection: CollectionReference<IDietaryForm>;
	private diets: Observable<Array<IDietaryForm>>;

	constructor(public router: Router, public ngZone: NgZone, private firestore: Firestore) {
		this.collection = collection(this.firestore, this.dbPath) as CollectionReference<IDietaryForm>;
		this.diets = collectionData(this.collection);
	}

	public async list(): Promise<Array<IDietaryForm>> {
		const snapshot = await getDocs(this.collection);
		return snapshot.docs.map((doc) => doc.data() as IDietaryForm);
	}

	public async add(diet: IDietaryForm): Promise<IDietaryForm> {
		const _diet = { ...diet };
		const docReference = await addDoc(this.collection, _diet);

		return _diet as IDietaryForm;
	}
}
