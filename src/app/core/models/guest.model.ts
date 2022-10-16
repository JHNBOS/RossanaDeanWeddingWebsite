import { Timestamp } from '@angular/fire/firestore';

export interface IGuestCollection {
	id: string;
	name: string;
	persons: Array<IGuest>;
}

export interface ISimpleGuestEditCollection {
	id: string;
	name: string;
	persons: Array<ISimpleGuestEdit>;
}

export interface ISimpleGuestCollection {
	id: string;
	name: string;
	persons: Array<ISimpleGuest>;
}

export interface IGuest {
	id: string;
	name: string;
	isAttending: boolean;
	repliedAt: Timestamp | null;
	requestSeatOnBus: boolean | null;
}

export interface IGuestCollectionRow {
	id: string;
	name: string;
	persons: Array<IGuestRow>;
}

export interface IGuestRow {
	id: string;
	collectionId: string;
	name: string;
	isAttending: boolean;
	areAllAttending: boolean;
	repliedAt: Timestamp | null;
	requestSeatOnBus: boolean | null;
}

export interface ISimpleGuest {
	id: string;
	name: string;
}

export interface ISimpleGuestEdit extends IGuest {
	isNew: boolean;
}

export class Guest implements IGuest {
	public id: string;
	public name: string;
	public isAttending: boolean;
	public repliedAt: Timestamp | null;
	public requestSeatOnBus: boolean | null;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
		this.isAttending = true;
		this.requestSeatOnBus = null;
		this.repliedAt = null;
	}
}
