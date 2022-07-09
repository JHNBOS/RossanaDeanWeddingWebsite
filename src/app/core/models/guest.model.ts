import { Timestamp } from '@angular/fire/firestore';

export interface IGuestCollection {
	id: string;
	guests: Array<IGuest>;
}

export interface IGuest {
	id: string;
	name: string;
	isAttending: boolean;
	repliedAt: Timestamp | null;
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
