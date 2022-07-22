import { IGuestCollectionRow } from './../../../core/models/guest.model';
import { GuestService } from './../../../core/services/guest.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IGuestRow } from 'src/app/core/models/guest.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
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
			})
			.sort((a, b) => {
				if (a.repliedAt == null && b.repliedAt == null) return 1;
				return a.repliedAt! < b.repliedAt! ? 1 : -1;
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

	sortData(sort: Sort) {
		const data = this.guests.slice();

		if (!sort.active || sort.direction === '') {
			this.dataSource.data = data;
		} else {
			if (sort.active === 'status') {
				this.dataSource.data = data.sort((a, b) => {
					if (a.repliedAt == null && b.repliedAt == null) return 1;
					return (a.repliedAt! < b.repliedAt! ? 1 : -1) * (sort.direction === 'asc' ? 1 : -1);
				});
			} else {
				this.dataSource.data = data.sort((a, b) => {
					const aValue = (a as any)[sort.active];
					const bValue = (b as any)[sort.active];
					return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
				});
			}
		}
	}

	public editGuests(id: string): void {
		const guests = this.guests.filter((g) => g.collectionId == id)[0];
		if (guests.repliedAt != null) return;

		this.router.navigate(['/guests/', id]);
	}
}
