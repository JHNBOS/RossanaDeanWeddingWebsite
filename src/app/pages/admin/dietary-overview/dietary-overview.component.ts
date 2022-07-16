import { IDietaryForm } from './../../../core/models/dietary.model';
import { DietaryService } from './../../../core/services/dietary.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
	selector: 'app-dietary-overview',
	templateUrl: './dietary-overview.component.html',
	styleUrls: ['./dietary-overview.component.scss']
})
export class DietaryOverviewComponent implements OnInit {
	public readonly displayedColumns: string[] = ['position', 'name', 'restrictions'];

	public diets: Array<IDietaryForm> = [];
	public dataSource!: MatTableDataSource<IDietaryForm>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(public router: Router, private service: DietaryService) {}

	async ngOnInit(): Promise<void> {
		const _diets = await this.service.list();
		this.diets = _diets.map((diet) => diet as IDietaryForm);

		this.dataSource = new MatTableDataSource(this.diets);
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
