import { Timestamp } from '@angular/fire/firestore';

export interface IGuestCollection {
	id: string;
	name: string;
	persons: Array<IGuest>;
}

export interface IGuest {
	id: string;
	name: string;
	isAttending: boolean;
	repliedAt: Timestamp;
}

export class Guest implements IGuest {
	public id: string;
	public name: string;
	public isAttending: boolean;
	public repliedAt: Timestamp;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
		this.isAttending = true;
		this.repliedAt = Timestamp.fromDate(new Date(1970, 1, 1));
	}
}
