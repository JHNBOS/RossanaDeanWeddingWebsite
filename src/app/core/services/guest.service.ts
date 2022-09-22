import { map, Observable } from 'rxjs';
import { Guest, IGuest, IGuestCollection, ISimpleGuest, ISimpleGuestCollection, ISimpleGuestEditCollection } from './../models/guest.model';
import { ISimpleValidationModel, ValidationModel } from './../models/validation.model';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { doc, Firestore, collection, CollectionReference, getDoc, collectionData, updateDoc, DocumentReference } from '@angular/fire/firestore';
import { IValidationModel } from '../models/validation.model';
import * as moment from 'moment';
import { addDoc, deleteDoc, getDocs, setDoc } from 'firebase/firestore';

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

	public async findById(id: string): Promise<IGuestCollection> {
		const docRef = doc(this.firestore, this.dbPath, id);
		const guestCollection = await getDoc(docRef);
		return guestCollection.data() as IGuestCollection;
	}

	public async delete(id: string): Promise<void> {
		const docRef = doc(this.firestore, this.dbPath, id);
		await deleteDoc(docRef);
	}

	public async list(): Promise<Array<IGuestCollection>> {
		const snapshot = await getDocs(this.collection);
		return snapshot.docs.map((doc) => {
			const data = doc.data();
			const guestCollection = data as IGuestCollection;
			guestCollection.id = doc.id;

			for (const person of guestCollection.persons) {
				const personGuest = new Guest(person.id, person.name);
				personGuest.isAttending = person.isAttending;
				personGuest.repliedAt = person.repliedAt;

				const index = guestCollection.persons.indexOf(person);
				guestCollection.persons[index] = personGuest;
			}
			return guestCollection;
		});
	}

	public listObservable(): Observable<Array<IGuestCollection>> {
		return this.guests;
	}

	public async add(guestCollection: ISimpleGuestCollection | IGuestCollection): Promise<IGuestCollection> {
		const collection = { ...guestCollection };

		let arr = new Array<any>();
		for (const person of guestCollection.persons) {
			arr.push({ ...(person as ISimpleGuest) });
		}

		collection.persons = [];

		const docReference = await addDoc(this.collection, collection);
		await updateDoc(docReference, { persons: arr });

		if (collection.id == null || collection.id.length === 0) {
			await updateDoc(docReference, { id: docReference.id });
		}

		return guestCollection as IGuestCollection;
	}

	public async update(guestCollection: IGuestCollection): Promise<IGuestCollection> {
		const collection = { ...guestCollection };

		let arr = new Array<any>();
		for (const person of guestCollection.persons) {
			arr.push({ ...person });
		}

		collection.persons = arr;

		const docReference = doc(this.firestore, this.dbPath, `${guestCollection.id}`) as DocumentReference<IGuestCollection>;
		await updateDoc(docReference, { persons: arr });
		await updateDoc(docReference, { id: docReference.id });

		return guestCollection;
	}

	public async updateSimple(guestCollection: ISimpleGuestEditCollection): Promise<ISimpleGuestCollection> {
		const collection = { ...guestCollection };

		let arr = new Array<any>();
		for (const person of guestCollection.persons) {
			const toSave = { ...person };
			delete (toSave as any).isNew;
			arr.push(toSave);
		}

		collection.persons = arr;

		const docReference = doc(this.firestore, this.dbPath, `${guestCollection.id}`) as DocumentReference<ISimpleGuestEditCollection>;
		await updateDoc(docReference, {
			name: collection.name,
			persons: arr
		});

		return guestCollection;
	}
}
