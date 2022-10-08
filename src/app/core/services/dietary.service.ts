import { IDietaryForm } from './../models/dietary.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { doc, Firestore, collection, CollectionReference, collectionData } from '@angular/fire/firestore';
import { addDoc, deleteDoc, getDocs } from 'firebase/firestore';

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
		return snapshot.docs.map((doc) => {
			const data = doc.data() as IDietaryForm;
			data.id = doc.id;

			return data;
		});
	}

	public async add(diet: IDietaryForm): Promise<IDietaryForm> {
		const _diet = { ...diet };
		const docReference = await addDoc(this.collection, _diet);

		return _diet as IDietaryForm;
	}

	public async delete(id: string): Promise<void> {
		const docRef = doc(this.firestore, this.dbPath, id);
		await deleteDoc(docRef);
	}
}
