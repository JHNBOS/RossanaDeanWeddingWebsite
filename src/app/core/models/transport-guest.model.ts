import { Timestamp } from '@angular/fire/firestore';

export interface ITransportGuest {
	id: string;
	name: string;
	repliedAt: Timestamp | null;
}

export class TransportGuest implements ITransportGuest {
	public id: string;
	public name: string;
	public repliedAt: Timestamp | null;

	constructor(name: string) {
		this.id = '';
		this.name = name;
		this.repliedAt = null;
	}
}
