import { Observable } from 'rxjs';
import { ITransportGuest, TransportGuest } from './../models/transport-guest.model';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { doc, Firestore, collection, CollectionReference, getDoc, collectionData, updateDoc, DocumentReference } from '@angular/fire/firestore';
import { addDoc, deleteDoc, getDocs } from 'firebase/firestore';

@Injectable({
	providedIn: 'root'
})
export class TransportGuestService {
	private dbPath = '/transportation';

	private collection: CollectionReference<ITransportGuest>;
	private guests: Observable<Array<ITransportGuest>>;

	constructor(public router: Router, public ngZone: NgZone, private firestore: Firestore) {
		this.collection = collection(this.firestore, this.dbPath) as CollectionReference<ITransportGuest>;
		this.guests = collectionData(this.collection);
	}

	public async findById(id: string): Promise<ITransportGuest> {
		const docRef = doc(this.firestore, this.dbPath, id);
		const guest = await getDoc(docRef);
		return guest.data() as ITransportGuest;
	}

	public async delete(id: string): Promise<void> {
		const docRef = doc(this.firestore, this.dbPath, id);
		await deleteDoc(docRef);
	}

	public async list(): Promise<Array<ITransportGuest>> {
		const snapshot = await getDocs(this.collection);

		return snapshot.docs.map((doc) => {
			const data = doc.data() as ITransportGuest;
			data.id = doc.id;
			return data;
		});
	}

	public listObservable(): Observable<Array<ITransportGuest>> {
		return this.guests;
	}

	public async add(guest: ITransportGuest): Promise<ITransportGuest> {
		const guestFlat = { ...guest };

		const docReference = await addDoc(this.collection, guestFlat);

		if (guestFlat.id == null || guestFlat.id.length === 0) {
			await updateDoc(docReference, { id: docReference.id });
		}

		return guest as ITransportGuest;
	}

	public async update(guest: ITransportGuest): Promise<ITransportGuest> {
		const collection = { ...guest };

		const docReference = doc(this.firestore, this.dbPath, `${guest.id}`) as DocumentReference<ITransportGuest>;
		await updateDoc(docReference, { id: docReference.id });

		return guest;
	}
}
