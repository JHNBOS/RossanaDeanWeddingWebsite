import { Timestamp } from '@angular/fire/firestore';

export interface IGuestCollection {
	id: string;
	name: string;
	persons: Array<IGuest>;
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
}

export interface ISimpleGuest {
	id: string;
	name: string;
}

export class Guest implements IGuest {
	public id: string;
	public name: string;
	public isAttending: boolean;
	public repliedAt: Timestamp | null;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
		this.isAttending = true;
		this.repliedAt = null;
	}
}
