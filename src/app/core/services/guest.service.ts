import { map, Observable } from 'rxjs';
import { Guest, IGuestCollection } from './../models/guest.model';
import { ISimpleValidationModel, ValidationModel } from './../models/validation.model';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { doc, Firestore, collection, CollectionReference, getDoc, collectionData, updateDoc, DocumentReference } from '@angular/fire/firestore';
import { IValidationModel } from '../models/validation.model';
import * as moment from 'moment';

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

	public list(): Promise<Array<IGuestCollection>> {
		return new Promise((resolve) =>
			this.guests
				.pipe(
					map((guests) =>
						guests.map((g) => {
							const guestCollection = g as IGuestCollection;
							for (const person of guestCollection.persons) {
								const personGuest = new Guest(person.id, person.name);
								const index = guestCollection.persons.indexOf(person);
								guestCollection.persons[index] = personGuest;
							}
              return guestCollection;
						})
					)
				)
				.subscribe((guests) => resolve(guests))
		);
	}

	public listObservable(): Observable<Array<IGuestCollection>> {
		return this.guests;
	}

	public async save(guest: IGuestCollection): Promise<IGuestCollection> {
		const docReference = doc(this.firestore, this.dbPath, `${guest.id}`) as DocumentReference<IGuestCollection>;
		await updateDoc(docReference, { ...guest });
		return guest;
	}
}
