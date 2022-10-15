import { ITransportGuest } from './../../../core/models/transport-guest.model';
import { TransportGuestService } from './../../../core/services/transport-guest.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
	selector: 'app-transport-overview',
	templateUrl: './transport-overview.component.html',
	styleUrls: ['./transport-overview.component.scss']
})
export class TransportOverviewComponent implements OnInit, AfterViewInit {
	public readonly displayedColumns: string[] = ['position', 'name', 'repliedAt', 'actions'];

	public guests: Array<ITransportGuest> = [];
	public dataSource!: MatTableDataSource<ITransportGuest>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(public router: Router, private service: TransportGuestService) {}

	async ngOnInit(): Promise<void> {
		await this.loadData();

		this.dataSource = new MatTableDataSource(this.guests);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	public async loadData(): Promise<void> {
		const collection = await this.service.list();
		this.guests = collection.sort((a, b) => {
			if (a.repliedAt == null && b.repliedAt == null) return 0;
			if (a.repliedAt == null || b.repliedAt == null) {
				const r = a.repliedAt != null ? -0.5 : 0.5;
				return r;
			}

			const r = a.repliedAt! > b.repliedAt! ? 1 : -1;
			return r;
		});
	}

	ngAfterViewInit() {}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	sortData(sort: Sort) {
		const data = this.guests.slice();

		if (!sort.active || sort.direction === '') {
			this.dataSource.data = data;
		} else {
			this.dataSource.data = data.sort((a, b) => {
				const aValue = (a as any)[sort.active];
				const bValue = (b as any)[sort.active];
				return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
			});
		}
	}

	public async delete(guest: ITransportGuest): Promise<void> {
		if (confirm('Are you sure you want to delete this?') === false) return;
		await this.service.delete(guest.id);

		await this.loadData();
		this.dataSource.data = this.guests;
	}
}
