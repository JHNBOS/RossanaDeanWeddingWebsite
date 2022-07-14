import { IGuestCollectionRow } from './../../../core/models/guest.model';
import { GuestService } from './../../../core/services/guest.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IGuestRow } from 'src/app/core/models/guest.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
	selector: 'app-guest-overview',
	templateUrl: './guest-overview.component.html',
	styleUrls: ['./guest-overview.component.scss']
})
export class GuestOverviewComponent implements OnInit, AfterViewInit {
	public readonly displayedColumns: string[] = ['position', 'name', 'status', 'repliedAt'];

	public guests: Array<IGuestRow> = [];
	public dataSource!: MatTableDataSource<IGuestRow>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(public router: Router, private service: GuestService) {}

	async ngOnInit(): Promise<void> {
		const guestCollections = await this.service.list();
		this.guests = guestCollections
			.map((collection) => collection as IGuestCollectionRow)
			.flatMap((collection) => {
				for (const person of collection.persons) {
					person.collectionId = collection.id;
				}
				return collection.persons;
			});

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

	public editGuests(id: string): void {
		const guests = this.guests.filter((g) => g.collectionId == id)[0];
		if (guests.repliedAt != null) return;

		this.router.navigate(['/guests/', id]);
	}
}
