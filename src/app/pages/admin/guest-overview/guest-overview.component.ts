import { GuestService } from './../../../core/services/guest.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IGuest } from 'src/app/core/models/guest.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
	selector: 'app-guest-overview',
	templateUrl: './guest-overview.component.html',
	styleUrls: ['./guest-overview.component.scss']
})
export class GuestOverviewComponent implements OnInit, AfterViewInit {
	public readonly displayedColumns: string[] = ['position', 'name', 'status', 'repliedAt'];

	public guests: Array<IGuest> = [];
	public dataSource!: MatTableDataSource<IGuest>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private service: GuestService) {}

	async ngOnInit(): Promise<void> {
		const guestCollections = await this.service.list();
		this.guests = guestCollections.flatMap((collection) => collection.persons);

		this.dataSource = new MatTableDataSource(this.guests);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	ngAfterViewInit() {}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
}
