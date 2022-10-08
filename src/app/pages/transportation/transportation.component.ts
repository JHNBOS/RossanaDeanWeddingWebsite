import { TransportGuest } from './../../core/models/transport-guest.model';
import { TransportGuestService } from './../../core/services/transport-guest.service';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Component({
	selector: 'app-transportation',
	templateUrl: './transportation.component.html',
	styleUrls: ['./transportation.component.scss']
})
export class TransportationComponent implements OnInit {
	public names: Array<string> = [];
	public disableSubmit: boolean = true;

	constructor(public service: TransportGuestService) {}

	async ngOnInit(): Promise<void> {
		this.addGuest();

		const list = await this.service.list();
	}

	public addGuest(): void {
		this.names.push('');
		this.checkState();
	}

	public trackGuest(index: number, name: string): any {
		return index;
	}

	public checkState(): void {
		this.disableSubmit = this.names.filter((name) => name.length === 0).length > 0;
	}

	public deleteGuest(index: number): void {
		this.names.splice(index, 1);
		this.checkState();
	}

	public async sendForm(): Promise<void> {
		for (const name of this.names) {
			const guest = new TransportGuest(name);
			guest.repliedAt = Timestamp.now();

			await this.service.add(guest);
		}

		this.names = [''];
	}
}
