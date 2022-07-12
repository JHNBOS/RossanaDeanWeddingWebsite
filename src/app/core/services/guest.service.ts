import { map, Observable } from 'rxjs';
import { Guest, IGuest, IGuestCollection } from './../models/guest.model';
import { ISimpleValidationModel, ValidationModel } from './../models/validation.model';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { doc, Firestore, collection, CollectionReference, getDoc, collectionData, updateDoc, DocumentReference } from '@angular/fire/firestore';
import { IValidationModel } from '../models/validation.model';
import * as moment from 'moment';
import { getDocs, setDoc } from 'firebase/firestore';

@Injectable({
	providedIn: 'root'
})
export class GuestService {
	private dbPath = '/guests';

	private collection: CollectionReference<IGuestCollection>;
	private guests: Observable<Array<IGuestCollection>>;

	constructor(public router: Router, public ngZone: NgZone, private firestore: Firestore) {
		this.collection = collection(this.firestore, this.dbPath) as CollectionReference<IGuestCollection>;
		this.guests = collectionData(this.collection);
	}

	public async list(): Promise<Array<IGuestCollection>> {
		const snapshot = await getDocs(this.collection);
		return snapshot.docs.map((doc) => {
			const data = doc.data();
			const guestCollection = data as IGuestCollection;
			guestCollection.id = doc.id;

			for (const person of guestCollection.persons) {
				const personGuest = new Guest(person.id, person.name);
				const index = guestCollection.persons.indexOf(person);
				guestCollection.persons[index] = personGuest;
			}
			return guestCollection;
		});
	}

	public listObservable(): Observable<Array<IGuestCollection>> {
		return this.guests;
	}

	public async save(guest: IGuestCollection): Promise<IGuestCollection> {
		const collection = { ...guest };

		let arr = new Array<any>();
		for (const person of guest.persons) {
			arr.push({ ...person });
		}

		collection.persons = arr;

		const docReference = doc(this.firestore, this.dbPath, `${guest.id}`) as DocumentReference<IGuestCollection>;
		await updateDoc(docReference, { persons: arr });

		return guest;
	}
}
